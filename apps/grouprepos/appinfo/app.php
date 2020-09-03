<?php

use OCA\GroupRepos\AppInfo\Application;

$app = new Application();
$app->register();
$l = \OC::$server->getL10N('grouprepos');

$eventDispatcher = \OC::$server->getEventDispatcher();
$eventDispatcher->addListener(
	'OCA\Files::loadAdditionalScripts',
	function () {
		\OCP\Util::addScript('grouprepos', '../build/files');
	}
);

$eventDispatcher->addListener('OCA\Files_Sharing::loadAdditionalScripts', function () {
	\OCP\Util::addScript('grouprepos', '../build/files');

});

\OCA\Files\App::getNavigationManager()->add([
	'id' => 'groupreposslist',
	'appname' => 'grouprepos',
	'script' => 'list.php',
	'order' => 25,
	'name' => "群組資料夾",
	'icon' => "grouprepos"
]);
