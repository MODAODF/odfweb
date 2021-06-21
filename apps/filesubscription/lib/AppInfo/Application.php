<?php

namespace OCA\FileSubscription\AppInfo;

use OCP\AppFramework\App;
use OCP\AppFramework\Bootstrap\IBootContext;
use OCP\AppFramework\Bootstrap\IBootstrap;
use OCP\AppFramework\Bootstrap\IRegistrationContext;
use OCP\Util;
use OCA\Files\Event\LoadSidebar;
use OCP\Files\Events\Node\BeforeNodeDeletedEvent;
use OCA\FileSubscription\Listener\LoadSidebarScripts;
use OCP\EventDispatcher\IEventDispatcher;
// use OCA\Files\Event\LoadAdditionalScriptsEvent;
use OCA\FileSubscription\ShareHooks;
use OCA\FileSubscription\Listener\BeforeDeleteListener;

class Application extends App implements IBootstrap {
	public const APP_ID = 'filesubscription';

	public function __construct() {
		parent::__construct(self::APP_ID);
	}

	public function register(IRegistrationContext $context): void {

		// 檔案側邊欄 載入訂閱功能
		$context->registerEventListener(LoadSidebar::class, LoadSidebarScripts::class);

		// 分享檔案 導覽列載入訂閱欄位
		$dispatcher = $this->getContainer()->query(IEventDispatcher::class);
		$dispatcher->addListener('OCA\Files_Sharing::loadAdditionalScripts', function() {
			\OCP\Util::addScript(self::APP_ID, 'dist/sharedfile');
			\OCP\Util::addScript(self::APP_ID, 'templates');
		});

		// 分享連結hook
		$dispatcher->addListener('OCP\Share::postShare', [ShareHooks::class, 'postShare']);
		$dispatcher->addListener('OCP\Share::preUnshare', [ShareHooks::class, 'preUnshare']);
		$dispatcher->addListener('OCP\Share::postUnshare', [ShareHooks::class, 'postUnshare']);

		// 刪除檔案前檢查
		$dispatcher->addServiceListener(BeforeNodeDeletedEvent::class, BeforeDeleteListener::class);
	}

	public function boot(IBootContext $context): void {
	}

}
