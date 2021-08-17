<?php
namespace OCA\FileSubscription\Controller;

use OCP\IRequest;
use OCP\Defaults;
use OCP\IConfig;
use OCP\IUser;
use OCP\IL10N;
use OCP\AppFramework\Controller;
use OCP\AppFramework\Http;
use OCP\AppFramework\Http\JSONResponse;
use OCP\AppFramework\Http\DataResponse;
use OCP\AppFramework\Http\NotFoundResponse;
use OCP\AppFramework\OCS\OCSNotFoundException;
use OCP\AppFramework\Db\DoesNotExistException;
use OCP\AppFramework\Utility\ITimeFactory;
use OCA\FileSubscription\Manager;
use OCA\FileSubscription\Model\Subscription;
use OCP\Share\IShare;
use OCP\Share\IManager as ShareManager;
use OCP\Share\Exceptions\ShareNotFound;
use OC\Files\Filesystem;

class SubscribeController extends Controller {

	/** @var IConfig */
	private $config;

	/** @var IL10N */
	private $l;

	/** @var Manager */
	private $manager;

	/** @var ITimeFactory */
	protected $timeFactory;

	/** @var ShareManager */
	protected $shareManager;

	public function __construct($AppName,
								IConfig $config,
								IL10N $l,
								IRequest $request,
								Manager $manager,
								ITimeFactory $timeFactory,
								ShareManager $shareManager) {
		parent::__construct($AppName, $request);
		$this->appName = $AppName;
		$this->config = $config;
		$this->l = $l;
		$this->manager = $manager;
		$this->timeFactory = $timeFactory;
		$this->shareManager = $shareManager;

		$shareApiClass = 'OCA\Files_Sharing\Controller\ShareAPIController';
		if (class_exists($shareApiClass)) {
			$this->shareApi = \OC::$server->query($shareApiClass);
		}
	}

	/**
	 * 取得 分享連結和訂閱資訊（側邊攔初始化資料）
	 * @param int $fileId
	 * @param string $path
	 * @NoAdminRequired
	 */
	public function index(int $fileId, string $path) {
		$uid = \OC::$server->getUserSession()->getUser()->getUID();

		// 確認是否為檔案擁有者
		$fileinfo = Filesystem::getFileInfo(json_decode($path));
		if ($fileinfo->getOwner()->getuid() !== $uid) {
			return new DataResponse(['result' => false, 'message' => $this->l->t('Not file owner')]);
		}

		if(!$this->shareApi) return new NotFoundResponse();
		$this->refresh($uid, $fileId, json_decode($path));

		// 取得 user 在這個檔案建立的訂閱
		$subscriptions = $this->manager->getSubscriptions($uid, $fileId);
		if(count($subscriptions) < 1) {
			return new DataResponse([]);
		}

		foreach($subscriptions as $idx => $subscr) {
			$respData[$idx]['subscription'] = $this->formatDataForFE($subscr);
			try {
				$share = $this->shareApi->getShare((string)$subscr->getShareId()); // DataResponse
				$respData[$idx]['sharing'] = $share->getData()[0];
			} catch (OCSNotFoundException $e) {
				$subscrLog = $this->manager->getLogsBySubscrId($subscr->getId());
				$respData[$idx]['hasSubscrLog'] = count($subscrLog) > 0 ? true : false;
			}
		}
		return new DataResponse($respData);
	}

	/**
	 * 重整訂閱資料
	 * @param string $uid
	 * @param int $fileId
	 * @param string $path
	 */
	private function refresh(string $uid, int $fileId, string $path) {
		$shares = $this->shareApi->getShares('', '', '', $path, ''); // DataResponse
		foreach ($shares->getData() as $share) {
			if ((int)$share['share_type'] === IShare::TYPE_LINK) {
				try {
					$subscription = $this->manager->getSubscrByShareId($share['id']);
				} catch (DoesNotExistException $e) {
					$this->manager->createSubscription($share['id'], $fileId, $uid);
				}
			}
		}
	}

	/**
	 * 更新訂閱資訊
	 * @param int $shareId
	 * @param array $setVal
	 * @NoAdminRequired
	 */
	public function update(int $shareId, $setVal) {
		$subscription = $this->manager->setSubscription($shareId, $setVal);
		$result  = $this->formatDataForFE($subscription);
		return new DataResponse($result);
	}

	/**
	 * 取消訂閱
	 * @param int $shareId
	 * @return DataResponse
	 * @NoAdminRequired
	 */
	public function cancel(int $shareId) {
		$subscription = $this->manager->getSubscrByShareId($shareId);
		if(count(\json_decode($subscription->getEmails())) < 1) {
			return new DataResponse(['message' => $this->l->t('No subscribers')]);
		};

		// 取得分享連結 -> 確認操作者的身份
		$uid = \OC::$server->getUserSession()->getUser()->getUID();
		$share = $this->shareApi->getShare((string) $shareId); // DataResponse
		$shareData = $share->getData();
		$canAccess = $shareData[0]['uid_owner'] === $uid || $shareData[0]['uid_initiator'] === $uid;
		if (!$canAccess) {
			return new DataResponse(
				['message' => $this->l->t('Not authorized to cancel this subscription')],
				Http::STATUS_FORBIDDEN
			);
		}

		// 寄信給所有訂閱者
		$mailController = \OC::$server->query('OCA\FileSubscription\Controller\MailController');
		$mail_dataResp = $mailController->cancelMail($shareId); //DataResponse

		// DB 刪除eamils、更新cancelTime
		$setVal['emails'] = 'cancel';
		$setVal['cancelTime']= true;
		$subscription = $this->manager->setSubscription($shareId, $setVal);

		$result = $this->formatDataForFE($subscription);
		return new DataResponse($result);
	}

	/**
	 * 取得單一分享連結的訂閱啟用值
	 * @param string $token
	 * @NoAdminRequired
	 * @PublicPage
	 */
	public function getState(string $token) {
		try {
			$share = $this->shareManager->getShareByToken($token);
			$isOwnerCreate = $share->getSharedBy() === $share->getShareOwner();
			$shareId = $share->getId();
		} catch (ShareNotFound $e) {
			return new DataResponse([], Http::STATUS_NOT_FOUND);
		}
		if ($isOwnerCreate) {
			$status = $this->manager->getEnabled($shareId);
			return new DataResponse($status);
		}
		return new DataResponse(false);
	}

	/**
	 * 加入訂閱者 Email
	 * @param string $token
	 * @param string $mailAddr
	 * @NoAdminRequired
	 * @NoCSRFRequired
	 * @PublicPage
	 */
	public function addSubscriber(string $token, string $mailAddr) {
		if (trim($mailAddr) === "") {
			return new DataResponse(
				['message' => $this->l->t('Please enter Email')], Http::STATUS_INTERNAL_SERVER_ERROR
			);
		}
		try {
			$shareId = $this->shareManager->getShareByToken($token)->getId();
		} catch (ShareNotFound $e) {
			return new DataResponse([$e->getMessage()], Http::STATUS_NOT_FOUND);
		}
		try {
			$subscription = $this->manager->addIntoEMails($shareId, $mailAddr);
		} catch (\Exception $e) {
			return new DataResponse([$e->getMessage()], Http::STATUS_INTERNAL_SERVER_ERROR);
		}
	}

	/**
	 * 取消訂閱者 Email
	 * @param string $token
	 * @param string $mailAddr
	 * @NoAdminRequired
	 * @NoCSRFRequired
	 * @PublicPage
	 */
	public function removeSubscriber(string $token, string $mailAddr) {
		if (trim($mailAddr) === "") {
			return new DataResponse(
				['message' => $this->l->t('Please enter Email')], Http::STATUS_INTERNAL_SERVER_ERROR
			);
		}
		try {
			$shareId = $this->shareManager->getShareByToken($token)->getId();
		} catch (ShareNotFound $e) {
			return new DataResponse([$e->getMessage()], Http::STATUS_NOT_FOUND);
		}
		try {
			$subscription = $this->manager->rmFromEmails($shareId, $mailAddr);
		} catch (\Exception $e) {
			return new DataResponse([$e->getMessage()], Http::STATUS_INTERNAL_SERVER_ERROR);
		}
	}

	/**
	 * 前端需要的資訊
	 * @param Subscription $subscription
	 * @return array
	 */
	protected function formatDataForFE(Subscription $subscription): array {
		$result = [
			'share_id'	    => $subscription->getShareId(),
			'share_label'   => $subscription->getShareLabel(),
			'enabled'       => $subscription->getEnabled(),
			'message'	    => $subscription->getMessage(), // $subscription->getParsedMessage()
			'subscriberNum' => 0,
		];
		if ($emails = $subscription->getEmails()) {
			$emailsArr = json_decode($emails, true) ?? array();
			$result['subscriberNum'] = count($emailsArr);
		}
		if ($lastMessageTime = $subscription->getLastMessageTime()) {
			$result['last_message_time'] = date('Y-m-d H:i', $lastMessageTime);
		}
		if ($lastEmailTime = $subscription->getLastEmailTime()) {
			$result['last_email_time'] = date('Y-m-d H:i', $lastEmailTime);
		}
		if ($lastCancelTime = $subscription->getLastCancelTime()) {
			$result['last_cancel_time'] = date('Y-m-d H:i', $lastCancelTime);
		}
		return $result;
	}
}
