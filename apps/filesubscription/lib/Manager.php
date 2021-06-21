<?php

namespace OCA\FileSubscription;

use OCA\FileSubscription\Model\Subscription;
use OCA\FileSubscription\Model\SubscriptionLog;
use OCA\FileSubscription\Model\SubscriptionMapper;
use OCA\FileSubscription\Model\SubscriptionLogMapper as LogMapper;
use OCA\FileSubscription\Model\SubscriptionDoesNotExistException;
use OCP\AppFramework\Utility\ITimeFactory;
use OCP\AppFramework\Db\DoesNotExistException;
use OCP\IConfig;
use OCP\IUser;
use OCP\IUserSession;

class Manager {

	/** @var IConfig */
	protected $config;

	/** @var SubscriptionMapper */
	protected $subscriptionMapper;

	/** @var LogMapper */
	protected $logMapper;

	/** @var ITimeFactory */
	protected $timeFactory;

	public function __construct(IConfig $config, SubscriptionMapper $subscriptionMapper, LogMapper $logMapper, ITimeFactory $timeFactory) {
		$this->config = $config;
		$this->subscriptionMapper = $subscriptionMapper;
		$this->logMapper = $logMapper;
		$this->timeFactory = $timeFactory;

		$shareApi = 'OCA\Files_Sharing\Controller\ShareAPIController';
		if (class_exists($shareApi)) {
			$this->shareApi = \OC::$server->query($shareApi);
		}
	}

	/**
	 * 設定訂閱資訊
	 * @param int $shareId
	 * @param array $setVal
	 * @return Subscription
	 * @throws SubscriptionDoesNotExistException
	 */
	public function setSubscription(int $shareId, $setVal): Subscription {

		try {
			$subscription = $this->subscriptionMapper->getByShareId($shareId);
		} catch (DoesNotExistException $e) {
			throw new SubscriptionDoesNotExistException();
		}

		if ($val_enabled = $setVal['enabled']) {
			$subscription->setEnabled( $val_enabled === 'true' ? 1:0 );
		}

		if (isset($setVal['message'])) {
			$val_message = trim($setVal['message']);
			$subscription->setMessage( empty($val_message) ? null : $val_message );
		}

		if (isset($setVal['emails']) && $setVal['emails'] === 'cancel') {
			$subscription->setEmails(null); // 取消訂閱
		}

		if ($setVal['updateMessageTime']) {
			$subscription->setLastMessageTime($this->timeFactory->getTime());
		}

		if ($setVal['updateEmailTime']) {
			$subscription->setLastEmailTime($this->timeFactory->getTime());
		}

		if ($setVal['cancelTime']) {
			$subscription->setLastCancelTime($this->timeFactory->getTime());
		}

		if ($setVal['fileName']) {
			$subscription->setFileName($setVal['fileName']);
		}

		if (isset($setVal['shareLabel'])) {
			$subscription->setShareLabel($setVal['shareLabel']);
		}

		if ($subscription instanceof Subscription) {
			$this->subscriptionMapper->update($subscription);
		}
		return $subscription;
	}

	/**
	 * 取得單一訂閱資訊
	 * @param int $shareId
	 * @return Subscription
	 * @throws SubscriptionDoesNotExistException
	 */
	public function getSubscrByShareId(int $shareId): Subscription {
		try {
			$subscription = $this->subscriptionMapper->getByShareId($shareId);
		} catch (DoesNotExistException $e) {
			throw new SubscriptionDoesNotExistException();
		}
		return $subscription;
	}

	/**
	 * @param int $fileId
	 * @return array
	 * @throws SubscriptionDoesNotExistException
	 */
	public function getSubscrByFileId(int $fileId) {
		try {
			$subscriptions = $this->subscriptionMapper->getByFileId($fileId);
		} catch (DoesNotExistException $e) {
			throw new SubscriptionDoesNotExistException();
		}
		return $subscriptions;
	}

	/**
	 * 取得多筆訂閱資訊
	 * @param string $uid
	 * @param int $fileid
	 * @return array
	 * @throws SubscriptionDoesNotExistException
	 */
	public function getSubscriptions(string $uid, int $fileid = null) {
		try {
			$subscription = $this->subscriptionMapper->getSubscriptionsByUid($uid, $fileid);
		} catch (DoesNotExistException $e) {
			throw new SubscriptionDoesNotExistException();
		}
		return $subscription;
	}

	/**
	 * 取得單一分享連結 是否啟用
	 * @param int $shareId
	 */
	public function getEnabled(int $shareId) {
		try {
			$subscription = $this->subscriptionMapper->getByShareId($shareId);
			$isEnabled = $subscription->getEnabled();
		} catch (DoesNotExistException $e) {
			$isEnabled = ture;
		}
		return $isEnabled;
	}

	/**
	 * 加入新的訂閱者
	 * @param int $shareId
	 * @param string $mailAddr
	 * @return Subscription
	 * @throws \Exception
	 */
	public function addIntoEmails(int $shareId, string $mailAddr): Subscription {
		$mailAddr = trim($mailAddr);
		$mailer = \OC::$server->getMailer();
		$validMail = $mailer->validateMailAddress($mailAddr);
		if (!empty($mailAddr) && !$validMail) {
			throw new \Exception('Invalid mail address');
		}

		try {
			$subscription = $this->subscriptionMapper->getByShareId($shareId);
		} catch (DoesNotExistException $e) {
			throw new SubscriptionDoesNotExistException();
		}

		if ($subscription instanceof Subscription) {
			$db_emailsStr = $subscription->getEmails();
			$db_emailsArr = \json_decode($db_emailsStr) ?? array();
			if (!in_array($mailAddr, $db_emailsArr)) {
				array_push($db_emailsArr, $mailAddr);
				$subscription->setEmails(\json_encode(array_values($db_emailsArr)));
				$this->subscriptionMapper->update($subscription);
			}
		}
		return $subscription;
	}

	/**
	 * 取消訂閱者
	 * @param int $shareId
	 * @param string $mailAddr
	 * @throws \Exception
	 */
	public function rmFromEmails(int $shareId, string $mailAddr) {
		$mailAddr = trim($mailAddr);
		$mailer = \OC::$server->getMailer();
		$validMail = $mailer->validateMailAddress($mailAddr);
		if (!empty($mailAddr) && !$validMail) {
			throw new \Exception('Invalid mail address');
		}

		try {
			$subscription = $this->subscriptionMapper->getByShareId($shareId);
		} catch (DoesNotExistException $e) {
			return true;
		}

		$mailAddr = trim($mailAddr);
		if ($subscription instanceof Subscription) {
			$db_emailsStr = $subscription->getEmails();
			$db_emailsArr = \json_decode($db_emailsStr) ?? array();
			if (in_array($mailAddr, $db_emailsArr)) {
				if (($key = array_search($mailAddr, $db_emailsArr)) !== false) {
					unset($db_emailsArr[$key]);
				}
				$subscription->setEmails(\json_encode(array_values($db_emailsArr)));
				$this->subscriptionMapper->update($subscription);
			}
		}
	}

	/**
	 * 建立訂閱資料
	 * @param int $shareId
	 * @param int $fileId
	 * @param string $ownerUid
	 */
	public function createSubscription(int $shareId, int $fileId, string $ownerUid) {
		$subscription = new Subscription();
		$subscription->setShareId($shareId);
		$subscription->setFileId($fileId);
		$subscription->setOwnerUid($ownerUid);

		if($this->shareApi) {
			$share = $this->shareApi->getShare($shareId);
			$subscription->setFileName($share->getData()[0]['file_target']);
			$subscription->setShareLabel($share->getData()[0]['label']);
		};

		$this->subscriptionMapper->insert($subscription);
		return $subscription;
	}

	/**
	 * 寫入一筆訂閱說明紀錄
	 * @param Subscription $subscr
	 */
	public function writeSubscrLog(Subscription $subscr) {
		$log = new SubscriptionLog();
		$log->setSubscrId($subscr->getId());
		$log->setSubscrMsg($subscr->getMessage());
		$log->setSubscrTime($subscr->getLastMessageTime());
		$this->logMapper->insert($log);
		return $log;
	}

	/**
	 * 刪除訂閱和紀錄
	 * @param int $subscrId
	 */
	public function deleteBySubscrId(int $subscrId) {
		$this->subscriptionMapper->deleteById($subscrId);
		$this->logMapper->deleteBySubscrId($subscrId);
	}

	/**
	 * 取得訂閱紀錄
	 * @param int $subscrId
	 */
	public function getLogsBySubscrId(int $subscrId) {
		try {
			$logs = $this->logMapper->getBySubscrId($subscrId);
		} catch (DoesNotExistException $e) {
			throw new SubscriptionDoesNotExistException();
		}
		return $logs;
	}
}
