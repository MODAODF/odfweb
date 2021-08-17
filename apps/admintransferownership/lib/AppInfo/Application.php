<?php
namespace OCA\AdminTransferownership\AppInfo;

use OCP\AppFramework\App;

use OCP\AppFramework\Bootstrap\IBootContext;
use OCP\AppFramework\Bootstrap\IBootstrap;
use OCP\AppFramework\Bootstrap\IRegistrationContext;
use Symfony\Component\EventDispatcher\EventDispatcherInterface;

use OCA\Files\Event\TransferProgressUpdateEvent;
use OCA\AdminTransferownership\Listener\TransferProgressUpdateEventListener;

class Application extends App implements IBootstrap {

	const APPNAME = 'admintransferownership';
	public function __construct() {
		parent::__construct(self::APPNAME);
	}

	public function register(IRegistrationContext $context): void {
		$context->registerEventListener(TransferProgressUpdateEvent::class, TransferProgressUpdateEventListener::class);
	}

	public function boot(IBootContext $context): void {
	}
}
