<?php

namespace OCA\FileSubscription\Model;

use OCP\AppFramework\Db\DoesNotExistException;

class SubscriptionDoesNotExistException extends DoesNotExistException {
	public function __construct() {
		parent::__construct('Subscription does not exist');
	}
}
