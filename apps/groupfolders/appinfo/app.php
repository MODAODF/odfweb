<?php

use OCA\GroupFolders\AppInfo\Application;

$app = new Application();
$app->register();
$l = \OC::$server->getL10N('groupfolders');

$eventDispatcher = \OC::$server->getEventDispatcher();
$eventDispatcher->addListener(
	'OCA\Files::loadAdditionalScripts',
	function () {
		\OCP\Util::addScript('groupfolders', '../build/files');
	}
);

$eventDispatcher->addListener('OCA\Files_Sharing::loadAdditionalScripts', function () {
	\OCP\Util::addScript('groupfolders', '../build/files');

});

\OCA\Files\App::getNavigationManager()->add([
	'id' => 'groupfolderslist',
	'appname' => 'groupfolders',
	'script' => 'list.php',
	'order' => 25,
	'name' => "群組資料夾",
	'icon' => "groupfolders"
]);
