<?php

use OCA\TemplateRepo\AppInfo\Application;
$app = new Application();
$app->register();
$l = \OC::$server->getL10N('templaterepo');


$eventDispatcher = \OC::$server->getEventDispatcher();
$eventDispatcher->addListener(
	'OCA\Files::loadAdditionalScripts',
	function () {
		\OCP\Util::addScript('templaterepo', '../build/files');
	}
);

$eventDispatcher->addListener('OCA\Files_Sharing::loadAdditionalScripts', function () {
	\OCP\Util::addScript('templaterepo', '../build/files');

});

\OCA\Files\App::getNavigationManager()->add([
		'id' => 'templaterepolist',
		'appname' => 'templaterepo',
		'script' => 'list.php',
		'order' => 25,
		'name' => "範本中心",
		'icon' => "templaterepo"
]);
