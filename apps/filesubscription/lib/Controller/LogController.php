<?php
namespace OCA\FileSubscription\Controller;

use OCP\IRequest;
use OCP\Defaults;
use OCP\IConfig;
use OCP\IUser;
use OCP\IL10N;
use OCP\IURLGenerator;
use OCP\AppFramework\Controller;
use OCP\AppFramework\Http;
use OCP\AppFramework\Http\JSONResponse;
use OCP\AppFramework\Http\DataResponse;
use OCP\AppFramework\Http\NotFoundResponse;
use OCP\AppFramework\Http\StreamResponse;
use OCP\AppFramework\OCS\OCSNotFoundException;
use OCP\AppFramework\Db\DoesNotExistException;
use OCP\AppFramework\Utility\ITimeFactory;
use OCA\FileSubscription\Manager;
use OCA\FileSubscription\Model\Subscription;
use OCA\FileSubscription\Model\SubscriptionDoesNotExistException;

class LogController extends Controller {

	/** @var IConfig */
	private $config;

	/** @var Manager */
	private $manager;

	/** @var IURLGenerator */
	private $url;

	/** @var IL10N */
	private $l;

	public function __construct($AppName,
								IConfig $config,
								IRequest $request,
								Manager $manager,
								IURLGenerator $url,
								IL10N $l) {
		parent::__construct($AppName, $request);
		$this->appName = $AppName;
		$this->config = $config;
		$this->manager = $manager;
		$this->url = $url;
		$this->l = $l;
		$this->logFileDir = dirname(__DIR__, 2) . '/logFiles';
	}

	/**
	 * 刪除訂閱和紀錄
	 * @param int $shareId
	 * @NoAdminRequired
	 */
	public function deleteAll(int $shareId) {
		try {
			$subscription = $this->manager->getSubscrByShareId($shareId);
		} catch (SubscriptionDoesNotExistException $e) {
			return new DataResponse([], Http::STATUS_BAD_REQUEST);
		}
		$subscrId = $subscription->getId();
		$deleted = $this->manager->deleteBySubscrId($subscrId);
		$logFilePath = $this->logFileDir . '/' . $subscrId . '.txt';
		if (file_exists($logFilePath)) unlink($logFilePath);
		return new DataResponse([], Http::STATUS_OK);
	}

	/**
	 * @param int $shareId
	 * @NoCSRFRequired
	 */
	public function getLog(int $shareId) {
		try {
			$subscr = $this->manager->getSubscrByShareId($shareId);
			$subscrId = $subscr->getId();
			$logs = $this->manager->getLogsBySubscrId($subscrId);
		}  catch (SubscriptionDoesNotExistException $e) {
			return new DataResponse([], Http::STATUS_BAD_REQUEST);
		}
		if (!$subscr || count($logs) < 1) {
			return new DataResponse(['message' => $this->l->t('No subscription log')], Http::STATUS_BAD_REQUEST);
		}

		$this->createLogFile($subscr, $logs);
		$filePath = $this->logFileDir . '/' . $subscrId . '.txt';
		if (file_exists($filePath)) {
			$url = $this->url->linkToRouteAbsolute($this->appName.'.log.downloadFile', [
				'subscrId' => $subscrId
			]);
			return new DataResponse(['data' => ['path' => $url]]);
		}
	}

	/**
	 * 產生紀錄檔
	 * @param Subscription $subscr
	 * @param array $logs
	 */
	private function createLogFile(Subscription $subscr, array $logs) {
		if (!is_dir($this->logFileDir)) {
			mkdir($this->logFileDir , 0777, true);
		}

		$filePath = $this->logFileDir  . '/' . $subscr->getId() . '.txt';
		if (file_exists($filePath)) {
			$tmpFile = file_get_contents($filePath);
			if(strlen($tmpFile) < 100) {
				unlink($filePath);
			} else {
				return;
			}
		}

		$txt_fileName = $this->l->t('Filename') . '：' . trim($subscr->getFileName(), '/');
		file_put_contents($filePath, $txt_fileName.PHP_EOL.PHP_EOL, FILE_APPEND);
		if ($label = $subscr->getShareLabel()) {
			$txt_shareLabel = $this->l->t('Share Label') . '：' . $label;
			file_put_contents($filePath, $txt_shareLabel.PHP_EOL.PHP_EOL, FILE_APPEND);
		}
		$txt_subscrLog = $this->l->t('Subscription log') . '：' . PHP_EOL.PHP_EOL;
		foreach($logs as $log) {
			$formatTime = date('Y-m-d H:i', $log->getSubscrTime());
			$log_time = '['. $formatTime .']';
			$txt_subscrLog .= $log_time.PHP_EOL;
			$txt_subscrLog .= $log->getParsedSubscrMsg().PHP_EOL.PHP_EOL;
		}
		file_put_contents($filePath, $txt_subscrLog, FILE_APPEND);
	}

	/**
	 * 下載紀錄檔
	 * @param int $subscrId
	 * @return StreamResponse
	 * @NoCSRFRequired
	 */
	public function downloadFile(int $subscrId) {
		$path = $this->logFileDir . '/' . $subscrId . '.txt';
		if (file_exists($path)) {
			$filename = $this->l->t('SubscriptionLog').$subscrId.'.txt';
			$resp = new StreamResponse($path);
			$resp->addHeader('Content-Type', 'application/octet-stream');
			$resp->addHeader('Content-Disposition', 'attachment; filename="'.$filename.'"');
			return $resp;
		}
	}
}
