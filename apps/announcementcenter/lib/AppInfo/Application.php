<?php

declare(strict_types=1);
/**
 * @copyright Copyright (c) 2016, Joas Schilling <coding@schilljs.com>
 *
 * @author Joas Schilling <coding@schilljs.com>
 *
 * @license GNU AGPL version 3 or any later version
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 */

namespace OCA\AnnouncementCenter\AppInfo;

use OCA\AnnouncementCenter\Dashboard\Widget;
use OCA\AnnouncementCenter\Manager;
use OCA\AnnouncementCenter\Model\AnnouncementDoesNotExistException;
use OCA\AnnouncementCenter\Notification\Notifier;
use OCP\AppFramework\App;
use OCP\AppFramework\Bootstrap\IBootContext;
use OCP\AppFramework\Bootstrap\IBootstrap;
use OCP\AppFramework\Bootstrap\IRegistrationContext;
use OCP\Comments\CommentsEntityEvent;
use OCP\Notification\IManager;
use Symfony\Component\EventDispatcher\EventDispatcherInterface;

class Application extends App implements IBootstrap {
	public const APP_ID = 'announcementcenter';

	public function __construct() {
		parent::__construct(self::APP_ID);
	}

	public function register(IRegistrationContext $context): void {
		$context->registerDashboardWidget(Widget::class);
		$this->registerAdditionalScripts();
	}

	public function boot(IBootContext $context): void {
		$context->injectFn([$this, 'registerNotificationNotifier']);
		$context->injectFn([$this, 'registerCommentsEntity']);
	}

	public function registerCommentsEntity(EventDispatcherInterface $eventDispatcher, Manager $manager): void {
		$eventDispatcher->addListener(CommentsEntityEvent::EVENT_ENTITY, static function (CommentsEntityEvent $event) use ($manager) {
			$event->addEntityCollection('announcement', static function ($name) use ($manager) {
				try {
					$announcement = $manager->getAnnouncement((int) $name);
				} catch (AnnouncementDoesNotExistException $e) {
					return false;
				}
				return (bool) $announcement->getAllowComments();
			});
		});
	}

	public function registerNotificationNotifier(IManager $notificationManager): void {
		$notificationManager->registerNotifierService(Notifier::class);
	}

	/**
	 * 載入 newannouncement.js
	 */
	public function registerAdditionalScripts() {
		$eventDispatcher = \OC::$server->getEventDispatcher();
		$cb = function() {
			\OCP\Util::addScript(self::APP_ID, 'newannouncement');
		};
		$eventDispatcher->addListener('OCA\Files::loadAdditionalScripts', $cb);
		$eventDispatcher->addListener('OCA\Activity::loadAdditionalScripts', $cb);
		$eventDispatcher->addListener('OCA\Files_Sharing::loadAdditionalScripts', $cb);
	}

}
