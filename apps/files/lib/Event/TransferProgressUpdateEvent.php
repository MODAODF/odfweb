<?php

declare(strict_types=1);

namespace OCA\Files\Event;

use OCP\EventDispatcher\Event;

use OCP\IUser;
use OCP\IUserSession;
use OCA\Files\Db\TransferOwnership;

class TransferProgressUpdateEvent extends Event {

	/** @var TransferOwnership */
	private $transfer;

	public const REPLY_TYPE_REJECT = 'reject';
	public const REPLY_TYPE_ACCEPT = 'accept';
	public const EXECUTED_RESULT_SUCCESS = 'success';
	public const EXECUTED_RESULT_FAILED = 'failed';

    public function __construct(TransferOwnership $transfer, string $replyType, $executeResult = null) {
        parent::__construct();
		$this->transfer = $transfer;
		$this->replyType = $replyType;
		$this->executeResult = $executeResult;
		$this->userSession = \OC::$server->query(IUserSession::class);
    }

    public function getTransfer() {
		return $this->transfer;
	}

	public function getReplyUser() {
		return $this->userSession->getUser()->getUID();;
	}

	public function getReplyType() {
		return $this->replyType;
	}

	public function getExecuteResult() {
		return $this->executeResult;
	}

	public function isEndOfProcess() {
		return $this->replyType === self::REPLY_TYPE_REJECT || !is_null($this->executeResult);
	}

}
