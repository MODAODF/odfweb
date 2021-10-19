<?php
/**
 */

return [
	'routes' => [
		['name' => 'settings#admin', 'url' => '/settings', 'verb' => 'POST'],
		['name' => 'settings#status', 'url' => '/settings/status', 'verb' => 'POST'],

		['name' => 'captcha#imageCode', 'url' => '/captcha', 'verb' => 'GET'],
		['name' => 'register#askEmail', 'url' => '/', 'verb' => 'GET'],
		['name' => 'register#validateEmail', 'url' => '/', 'verb' => 'POST'],
		['name' => 'register#verifyToken', 'url' => '/verify/{token}', 'verb' => 'GET'],
		['name' => 'register#createAccount', 'url' => '/verify/{token}', 'verb' => 'POST'],
        ['name' => 'csv#uploadFile', 'url' => '/uploadFile', 'verb' => 'POST'],
	],
	'ocs' => [
		['root' => '/ndcregistration', 'name' => 'api#validate', 'url' => '/v1/validate', 'verb' => 'POST'],
		['root' => '/ndcregistration', 'name' => 'api#status', 'url' => '/v1/status', 'verb' => 'POST'],
		['root' => '/ndcregistration', 'name' => 'api#register', 'url' => '/v1/register', 'verb' => 'POST']
	]
];
