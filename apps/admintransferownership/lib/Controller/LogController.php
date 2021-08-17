<?php

namespace OCA\AdminTransferownership\Controller;

use OCP\AppFramework\Controller;
use OCP\AppFramework\Http;
use OCP\AppFramework\Http\DataResponse;
use OCP\AppFramework\Utility\ITimeFactory;

use OCA\Files\BackgroundJob\TransferOwnership;
use OCA\Files\Db\TransferOwnership as TransferOwnershipEntity;
use OCA\Files\Db\TransferOwnershipMapper;
use OCP\Files\NotFoundException;

use OCP\IConfig;
use OCP\IL10N;
use OCP\IRequest;
use OCP\IUserManager;

use OCA\AdminTransferownership\Db\PendingTransferMapper;
use OCA\AdminTransferownership\Db\UserTransferLog as LogEntity;
use OCA\AdminTransferownership\Db\UserTransferLogMapper as LogMapper;

class LogController extends Controller {
	/** @var string */
	protected $appName;
	/** @var IRequest */
	protected $request;
	/** @var IL10N */
	protected $l10n;
	/** @var IConfig */
	protected $config;
	/** @var IUserManager */
	private $userManager;

	/** @var TransferOwnershipMapper */
	private $mapper;
	/** @var ITimeFactory */
	private $timeFactory;
	/** @var PendingTransferMapper */
	private $pendingTransferMapper;
	/** @var LogMapper */
	private $logMapper;

	public function __construct(
		string $appName,
		IRequest $request,
		IL10N $l10n,
		IConfig $config,
		IUserManager $userManager,
		TransferOwnershipMapper $mapper,
		ITimeFactory $timeFactory,
		PendingTransferMapper $pendingTransferMapper,
		LogMapper $logMapper
	) {
		parent::__construct($appName, $request);
		$this->appName         = $appName;
		$this->request         = $request;
		$this->l10n            = $l10n;
		$this->config          = $config;
		$this->userManager     = $userManager;
		$this->mapper          = $mapper;
		$this->timeFactory     = $timeFactory;
		$this->pendingTransferMapper = $pendingTransferMapper;
		$this->logMapper = $logMapper;
	}

	/**
	 * @NoCSRFRequired
	 * @AdminRequired
	 */
	public function getPendingList() {
		try {
			$entities = $this->pendingTransferMapper->getPending();
		} catch (\Throwable $th) {
			return new DataResponse(['message' => '無法取得資料'], HTTP::STATUS_BAD_REQUEST);
		}
		if (count($entities) < 1) {
			return new DataResponse(['message' => '沒有移交項目'], HTTP::STATUS_NOT_FOUND);
		}
		foreach( $entities as $transfer) {
			$data[] = $this->formatData($transfer);
		}
		return new DataResponse($data);
	}

	public function getJobsList() {
		try {
			$entities = $this->logMapper->getNotClosed();
		} catch (\Throwable $th) {
			return new DataResponse(['message' => '無法取得資料'], HTTP::STATUS_BAD_REQUEST);
		}
		if (count($entities) < 1) {
			return new DataResponse(['message' => '沒有移交項目'], HTTP::STATUS_NOT_FOUND);
		}
		foreach( $entities as $transfer) {
			$data[] = $this->formatData($transfer);
		}
		return new DataResponse($data);
	}

	public function getClosedList() {
		try {
			$entities = $this->logMapper->getClosed();
		} catch (\Throwable $th) {
			return new DataResponse(['message' => '無法取得資料'], HTTP::STATUS_BAD_REQUEST);
		}
		if (count($entities) < 1) {
			return new DataResponse(['message' => '沒有移交項目'], HTTP::STATUS_NOT_FOUND);
		}
		foreach( $entities as $transfer) {
			$data[] = $this->formatData($transfer);
		}
		return new DataResponse($data);
	}

	private function formatData($transfer): array {
		$formatted = [
			"id" => $transfer->getId(),
			"sourceUser" => $this->getName($transfer->getSourceUser()),
			"targetUser" => $this->getName($transfer->getTargetUser()),
			"fileId"     => $transfer->getFileId(),
			"nodeName"   => $transfer->getNodeName(),
		];
		if (($transfer instanceof LogEntity)) {
			$formatted['replyType'] = $this->l10n->t($transfer->getReplyType());
			$formatted['replyUser'] = $this->getName($transfer->getReplyUser());
			$formatted['replyAt'] = date('Y-m-d H:i', $transfer->getReplyAt());
			if( !is_null($exeRes = $transfer->getExecuteResult()) ) {
				$formatted['executeResult'] = $this->l10n->t($exeRes);
			}
			if( !is_null($exeAt = $transfer->getExecuteAt()) ) {
				$formatted['executeAt'] = date('Y-m-d H:i', $exeAt);
			}
		}
		return $formatted;
	}

	private function getName($uid): string {
		$user = $this->userManager->get($uid);
		if ($name = $user->getDisplayName()) {
			return $name;
		}
		return $uid;
	}
}
