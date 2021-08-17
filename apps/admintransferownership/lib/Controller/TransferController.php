<?php

namespace OCA\AdminTransferownership\Controller;

use OCP\AppFramework\Controller;
use OCP\AppFramework\Http;
use OCP\AppFramework\Http\DataResponse;
use OCP\AppFramework\Utility\ITimeFactory;
use OCP\AppFramework\Db\DoesNotExistException;

use OCA\Files\BackgroundJob\TransferOwnership;
use OCA\Files\Db\TransferOwnership as TransferOwnershipEntity;
use OCA\Files\Db\TransferOwnershipMapper;
use OCP\Files\Folder;
use OCP\Files\IRootFolder;
use OCP\Files\NotFoundException;

use OCP\IConfig;
use OCP\IL10N;
use OCP\IRequest;
use OCP\IUserManager;
use OCP\Notification\IManager as NotificationManager;
use OCP\BackgroundJob\IJobList;

use OCA\Files\Event\TransferProgressUpdateEvent as TransferEvent;
use OCP\EventDispatcher\IEventDispatcher;

class TransferController extends Controller {
	/** @var string */
	protected $appName;
	/** @var IRequest */
	protected $request;
	/** @var IL10N */
	protected $l10n;
	/** @var IConfig */
	protected $config;

	/** @var IRootFolder */
	protected $rootFolder;
	/** @var IUserManager */
	private $userManager;

	/** @var TransferOwnershipMapper */
	private $mapper;
	/** @var NotificationManager */
	private $notificationManager;
	/** @var ITimeFactory */
	private $timeFactory;
	/** @var IJobList */
	private $jobList;

	/** @var IEventDispatcher */
	private $eventDispatcher;

	public function __construct(string $appName,
		IRequest $request,
		IL10N $l10n,
		IConfig $config,
		IUserManager $userManager,
		IRootFolder $rootFolder,
		TransferOwnershipMapper $mapper,
		NotificationManager $notificationManager,
		ITimeFactory $timeFactory,
		IJobList $jobList,
		IEventDispatcher $eventDispatcher
	) {
		parent::__construct($appName, $request);
		$this->appName         = $appName;
		$this->request         = $request;
		$this->l10n            = $l10n;
		$this->config          = $config;
		$this->userManager     = $userManager;
		$this->rootFolder      = $rootFolder;
		$this->mapper          = $mapper;
		$this->notificationManager = $notificationManager;
		$this->timeFactory     = $timeFactory;
		$this->jobList         = $jobList;
		$this->eventDispatcher = $eventDispatcher;
	}

	/**
	 * @AdminRequired
	 *
	 * admin 建立移交
	 *
	 * @param string $path 預設移交所有資料（根目錄）
	 * @param string $sourceUID   舊擁有者
	 * @param string $targetUID   新擁有者
	 * @param bool   $needConfirm 需要新擁有者確認
	 */
	public function index($path = '/', string $sourceUID, string $targetUID, $needConfirm = ture) {
		try {
			$pendingEvents = $this->mapper->getBySourceUser($sourceUID);
		} catch (DoesNotExistException $e) {
			// $noPendingEvent = true;
		} catch (\Throwable $th) {
			// $ignorePendingEvent = true; // 找不到 getBySourceUser() 忽略檢查
		}

		// 檢查 sourceUID 現有的移交資訊
		if (count($pendingEvents) > 0) {
			$msg = $sourceUID . " 已有待接收的轉移資料，無法建立新的轉移資料";
			return new DataResponse(['message' => $msg], Http::STATUS_BAD_REQUEST);
		}

		// 確認人員身份
		if ($sourceUID === $targetUID) {
			$msg = "Ownership can't be transferred when Source and Destination users are the same user.";
			return new DataResponse(['message' => $msg], Http::STATUS_BAD_REQUEST);
		}
		$sourceUser = $this->userManager->get($sourceUID);
		$targetUser = $this->userManager->get($targetUID);
		if ($sourceUser === null || $targetUser === null) {
			if ($sourceUser === null) $unknown[] = $sourceUID;
			if ($targetUser === null) $unknown[] = $targetUID;
			$msg = "Unknown user: " . implode(",", $unknown);;
			return new DataResponse(['message' => $msg], Http::STATUS_BAD_REQUEST);
		}

		// 確認 $sourceUID 的資料夾
		$sourceRootFolder= $this->rootFolder->getUserFolder($sourceUID);
		try {
			$node = $sourceRootFolder->get($path);
		} catch (\Exception $e) {
			return new DataResponse(['message' => '沒有要轉移的資料'], Http::STATUS_BAD_REQUEST);
		}

		// 建立移交資料
		$transferOwnership = new TransferOwnershipEntity();
		$transferOwnership->setSourceUser($sourceUID);
		$transferOwnership->setTargetUser($targetUID);
		$transferOwnership->setFileId($node->getId());
		$transferOwnership->setNodeName($node->getName());
		$transferOwnership = $this->mapper->insert($transferOwnership);

		if ($needConfirm) {
			// 通知 targetUID
			$notification = $this->notificationManager->createNotification();
			$notification->setUser($targetUID)
				->setApp('files')
				->setDateTime($this->timeFactory->getDateTime())
				->setSubject('transferownershipRequest', [
					'sourceUser' => $sourceUID,
					'targetUser' => $targetUID,
					'nodeName' => $node->getName(),
				])
				->setObject('transfer', (string)$transferOwnership->getId());
			$this->notificationManager->notify($notification);
			return new DataResponse([]);
		}

		// 不通知 直接移交->排入backgroundjob
		$this->jobList->add(TransferOwnership::class, [
			'id' => $transferOwnership->getId(),
		]);
		$this->eventDispatcher->dispatchTyped(new TransferEvent($transferOwnership, TransferEvent::REPLY_TYPE_ACCEPT));
		return new DataResponse([]);
	}

	/**
	 * @AdminRequired
	 * @CSRFRequired
	 *
	 * admin 強制接收
	 */
	public function adminAccept(string $id) {
		try {
			$transferOwnership = $this->mapper->getById($id);
		} catch (DoesNotExistException $e) {
			return new DataResponse(['message' => '沒有這移交筆紀錄或已回覆'], Http::STATUS_NOT_FOUND);
		}

		$notification = $this->notificationManager->createNotification();
		$notification->setApp('files')
			->setObject('transfer', (string)$id);
		$this->notificationManager->markProcessed($notification);

		$newTransferOwnership = new TransferOwnershipEntity();
		$newTransferOwnership->setNodeName($transferOwnership->getNodeName());
		$newTransferOwnership->setFileId($transferOwnership->getFileId());
		$newTransferOwnership->setSourceUser($transferOwnership->getSourceUser());
		$newTransferOwnership->setTargetUser($transferOwnership->getTargetUser());
		$this->mapper->insert($newTransferOwnership);

		$this->jobList->add(TransferOwnership::class, [
			'id' => $newTransferOwnership->getId(),
		]);
		$this->eventDispatcher->dispatchTyped(new TransferEvent($newTransferOwnership, TransferEvent::REPLY_TYPE_ACCEPT));
		return new DataResponse(['message' => '已強制接收'], Http::STATUS_OK);
	}

	/**
	 * @AdminRequired
	 * @CSRFRequired
	 *
	 * admin 強制拒絕
	 */
	public function adminReject($id) {
		try {
			$transferOwnership = $this->mapper->getById($id);
		} catch (DoesNotExistException $e) {
			return new DataResponse(['message' => '沒有這移交筆紀錄或已回覆'], Http::STATUS_NOT_FOUND);
		}

		// 移除原本給newOwner的通知
		$notification = $this->notificationManager->createNotification();
		$notification->setApp('files')
			->setObject('transfer', (string)$id);
		$this->notificationManager->markProcessed($notification);

		$this->mapper->delete($transferOwnership);
		$this->eventDispatcher->dispatchTyped(new TransferEvent($transferOwnership, TransferEvent::REPLY_TYPE_REJECT));
		return new DataResponse(['message' => '已強制拒絕'], Http::STATUS_OK);
	}
}
