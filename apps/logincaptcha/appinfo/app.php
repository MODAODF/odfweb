<?php
use OCA\LoginCaptcha\AppInfo\Application;

const APP_NAME = 'logincaptcha';

$request = \OC::$server->getRequest();
if (isset($request->server['REQUEST_URI'])) {
	$url = $request->server['REQUEST_URI'];
	if (preg_match('%/login(\?.+)?$%m', $url)) {

		\OCP\Util::addScript(APP_NAME, 'main');
		\OCP\Util::addStyle(APP_NAME, 'main');

		$app = \OC::$server->query(Application::class);
		if ($app->showErrorMsg()) \OCP\Util::addScript(APP_NAME, 'error');
		$app->removeSession();
		$app->registerListener();
	}
}
