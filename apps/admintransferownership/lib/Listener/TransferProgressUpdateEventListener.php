<?php

declare(strict_types=1);

namespace OCA\AdminTransferownership\Listener;

use OCA\Files\AppInfo\Application;
use OCA\Files\Event\TransferProgressUpdateEvent;

use OCP\EventDispatcher\Event;
use OCP\EventDispatcher\IEventListener;
use OCP\Util;

use OCA\AdminTransferownership\Db\UserTransferLog;
use OCA\AdminTransferownership\Db\UserTransferLogMapper as LogMapper;
use OCP\AppFramework\Utility\ITimeFactory;

class TransferProgressUpdateEventListener implements IEventListener {

	/** @var IRequest */
	protected $request;
	/** @var IL10N */
	protected $l10n;
	/** @var IConfig */
	protected $config;
	/** @var IUserSession */
    protected $userSession;
	/** @var LogMapper */
	protected $logMapper;
	/** @var ITimeFactory */
	private $timeFactory;

	public function __construct(LogMapper $logMapper, ITimeFactory $timeFactory) {
		$this->logMapper = $logMapper;
		$this->timeFactory = $timeFactory;
	}

	public function handle(Event $event): void {
		if (!($event instanceof TransferProgressUpdateEvent)) {
			return;
		}

		$this->event = $event;
		$this->transfer = $event->getTransfer();
		try {
			if (!is_null($event->getExecuteResult())) {
				$this->updateExecute();
			} else {
				$this->writeLog(); // 新的一筆移交紀錄
			}
		} catch (\Throwable $th) { }
	}

	/**
	 * @NoAdminRequired
	 */
	private function updateExecute() {
		$adminLog = $this->logMapper->getByOriginId($this->transfer->getId());
		$adminLog->setOriginId(NULL);
		$adminLog->setExecuteResult($this->event->getExecuteResult());
		$adminLog->setExecuteAt($this->timeFactory->getTime());
		$this->logMapper->update($adminLog);
	}

	/**
	 * @NoAdminRequired
	 */
	private function writeLog() {
        $adminLog = new UserTransferLog();
		$adminLog->setSourceUser($this->transfer->getSourceUser());
        $adminLog->setTargetUser($this->transfer->getTargetUser());
        $adminLog->setFileId($this->transfer->getFileId());
		$adminLog->setNodeName($this->transfer->getNodeName());
		$adminLog->setReplyType($this->event->getReplyType());
		$adminLog->setReplyUser($this->event->getReplyUser());
		$adminLog->setReplyAt($this->timeFactory->getTime());
		if (!$this->event->isEndOfProcess()) {
			$adminLog->setOriginId($this->transfer->getId());
		}
        $this->logMapper->insert($adminLog);
	}
}
