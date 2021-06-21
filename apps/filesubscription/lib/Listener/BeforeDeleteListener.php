<?php
declare(strict_types=1);

namespace OCA\FileSubscription\Listener;

use OCA\FileSubscription\AppInfo\Application;
// use OC\HintException;
use OCP\EventDispatcher\Event;
use OCP\EventDispatcher\IEventListener;
use OCP\Files\Events\Node\BeforeNodeDeletedEvent;
use OCA\FileSubscription\Manager;

class BeforeDeleteListener implements IEventListener {

	/**
	 * 刪除檔案前，檢查有沒有訂閱者
	 */
	public function handle(Event $event): void {
		if (!($event instanceof BeforeNodeDeletedEvent)) {
			return;
		}

		$fileId = $event->getNode()->getId();

		$manager = \OC::$server->query(Manager::class);
		$subscriptions = $manager->getSubscrByFileId($fileId);
		foreach ($subscriptions as $subscr) {
			$emails= $subscr->getEmails();
			if (count($emails) > 0) {
				throw new \OC\ServerNotAvailableException;
				break;
			}
		}
	}
}
