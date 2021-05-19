<?php

namespace OCA\MergeODF;

class App {
	/**
	 * @var \OCP\INavigationManager
	 */
	private static $navigationManager;

	/**
	 * Returns the app's navigation manager
	 *
	 * @return \OCP\INavigationManager
	 */
	public static function getNavigationManager() {
		// TODO: move this into a service in the Application class
		if (self::$navigationManager === null) {
			self::$navigationManager = new \OC\NavigationManager(
				\OC::$server->getAppManager(),
				\OC::$server->getURLGenerator(),
				\OC::$server->getL10NFactory(),
				\OC::$server->getUserSession(),
				\OC::$server->getGroupManager(),
				\OC::$server->getConfig()
			);
			self::$navigationManager->clear(false);
		}
		return self::$navigationManager;
	}

	public static function extendJsConfig($settings) {
		$appConfig = json_decode($settings['array']['oc_appconfig'], true);

		$maxChunkSize = (int)\OC::$server->getConfig()->getAppValue('files', 'max_chunk_size', 10 * 1024 * 1024);
		$appConfig['files'] = [
			'max_chunk_size' => $maxChunkSize
		];

		$settings['array']['oc_appconfig'] = json_encode($appConfig);
	}
}
