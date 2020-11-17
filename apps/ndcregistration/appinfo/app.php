<?php
/**
 */

\OC_App::registerLogIn([
	'name' => \OC::$server->getL10N('ndcregistration')->t('Register'),
	'href' => \OC::$server->getURLGenerator()->linkToRoute('ndcregistration.register.askEmail')
]);
