<?php

namespace OCA\FileSubscription\Model;

use OCP\AppFramework\Db\Entity;

class SubscriptionLog extends Entity {

	/** @var int */
	protected $subscrId;

	/** @var string */
	protected $subscrMsg;

	/** @var int */
	protected $subscrTime;

	public function __construct() {
		$this->addType('subscrId', 'int');
		$this->addType('subscrMsg', 'string');
		$this->addType('subscrTime', 'int');
	}

	public function getParsedSubscrMsg(): string {
		return str_replace(['<', '>', "\n"], ['&lt;', '&gt;', '<br />'], parent::getSubscrMsg());
	}
}
