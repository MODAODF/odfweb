<?php

namespace OCA\FileSubscription\Model;

use OCP\AppFramework\Db\Entity;

class Subscription extends Entity {

	/** @var int */
	protected $shareId;

	/** @var string */
	protected $shareLabel;

	/** @var int */
	protected $fileId;

	/** @var string */
	protected $fileName;

	/** @var string */
	protected $ownerUid;

	/** @var string */
	protected $emails;

	/** @var string */
	protected $message;

	/** @var int */
	protected $lastMessageTime;

	/** @var int */
	protected $lastEmailTime;

	/** @var int */
	protected $lastCancelTime;

	/** @var int */
	protected $enabled;

	public function __construct() {
		$this->addType('shareId', 'int');
		$this->addType('shareLabel', 'string');
		$this->addType('fileId', 'int');
		$this->addType('fileName', 'string');
		$this->addType('ownerUid', 'string');
		$this->addType('emails', 'string');
		$this->addType('message', 'string');
		$this->addType('lastMessageTime', 'int');
		$this->addType('lastEmailTime', 'int');
		$this->addType('lastCancelTime', 'int');
		$this->addType('enabled', 'int');
	}

	public function getParsedMessage(): string {
		return str_replace(['<', '>', "\n"], ['&lt;', '&gt;', '<br />'], parent::getMessage());
	}
}
