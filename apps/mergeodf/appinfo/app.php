<?php

use OCA\MergeODF\AppInfo\Application;
use OCP\Util;

$app = \OC::$server->query(Application::class);
$app->register();
$l = \OC::$server->getL10N('mergeodf');
$user = \OC::$server->getUserSession()->getUser();
if ($user instanceof \OC\User\User){
	$folders = $app->getFolderManager()->getFoldersForUserHidden($user);
	foreach($folders as $folder) {
		\OCA\MergeODF\App::getNavigationManager()->add([
			'id' => 'mergeodflist-'.$folder['folder_id'],
			'appname' => 'mergeodf',
			'script' => 'app_list.php',
			'order' => 5,
			'name' => $folder['mount_point'],
			'icon' => "mergeodf"
		]);
	}
}


$eventDispatcher = \OC::$server->getEventDispatcher();
$eventDispatcher->addListener(
	'OCA\Files::loadAdditionalScripts',
	function () {
		\OCP\Util::addScript('mergeodf', '../build/files');
	}
);

$eventDispatcher->addListener('OCA\Files_Sharing::loadAdditionalScripts', function () {
	\OCP\Util::addScript('mergeodf', '../build/files');

});




/*
\OCA\MergeODF\App::getNavigationManager()->add([
	'id'      => 'files',
	'appname' => 'files',
	'script'  => 'list.php',
	'order'   => 0,
	'name'    => $l->t('All files')
]);
*/
/**
 * Menu entry
 */
$c = $app->getContainer();
$appName = $c->query('AppName');
$c->query('OCP\INavigationManager')
  ->add(
	  function () use ($c, $appName) {
		  $urlGenerator = $c->query('OCP\IURLGenerator');
		  $l10n = $c->query('OCP\IL10N');

		  return [
			  'id'    => $appName,

			  // Sorting weight for the navigation. The higher the number, the higher
			  // will it be listed in the navigation
			  'order' => 5,

			  // The route that will be shown on startup when called from within the GUI
			  // Public links are using another route, see appinfo/routes.php
			  'href'  => $urlGenerator->linkToRoute($appName . '.view.index'),

			  // The icon that will be shown in the navigation
			  // This file needs to exist in img/
			  'icon'  => $urlGenerator->imagePath($appName, 'app-dark.svg'),

			  // The title of the application. This will be used in the
			  // navigation or on the settings page
			  'name'  => $l10n->t('MergeODF')
		  ];
	  }
  );

/**
 * Loading translations
 *
 * The string has to match the app's folder name
 */
Util::addTranslations($appName);