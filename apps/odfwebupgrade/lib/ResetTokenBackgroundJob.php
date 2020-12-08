<?php
namespace OCA\OdfwebUpgrade;

use OC\BackgroundJob\TimedJob;
use OCP\AppFramework\Utility\ITimeFactory;
use OCP\IConfig;

/**
 * Class ResetTokenBackgroundJob deletes any configured token all 24 hours for
 *
 * @package OCA\OdfwebUpgrade
 */
class ResetTokenBackgroundJob extends TimedJob {
	/** @var IConfig */
	private $config;
	/** @var ITimeFactory */
	private $timeFactory;

	/**
	 * @param IConfig $config
	 * @param ITimeFactory $timeFactory
	 */
	public function __construct(IConfig $config,
								ITimeFactory $timeFactory) {
		// Run all 10 minutes
		$this->setInterval(60 * 10);
		$this->config = $config;
		$this->timeFactory = $timeFactory;
	}

	/**
	 * @param $argument
	 */
	protected function run($argument) {
		// Delete old tokens after 2 days
		if($this->timeFactory->getTime() - $this->config->getAppValue('core', 'updater.secret.created', $this->timeFactory->getTime()) >= 172800) {
			$this->config->deleteSystemValue('updater.secret');
		}
	}

}
