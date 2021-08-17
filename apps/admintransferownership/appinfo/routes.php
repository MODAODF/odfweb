<?php
return [
	'routes' => [
		[ 'name' => 'transfer#index', 'url' => '/admintransfer', 'verb' => 'POST' ],
		[ 'name' => 'transfer#adminAccept', 'url' => '/accept/{id}', 'verb' => 'GET' ],
		[ 'name' => 'transfer#adminReject', 'url' => '/reject/{id}', 'verb' => 'GET' ],

		[ 'name' => 'log#getPendingList', 'url' => '/log/pendinglist', 'verb' => 'GET' ],
		[ 'name' => 'log#getJobsList',    'url' => '/log/joblist', 'verb' => 'GET' ],
		[ 'name' => 'log#getClosedList',  'url' => '/log/closedlist', 'verb' => 'GET' ],

		// 取得最新的count筆資料
		// ['name' => 'log#get', 'url' => '/get/{count}', 'verb' => 'GET'],
		// 找關鍵字
		// ['name' => 'log#search', 'url' => '/search', 'verb' => 'GET'],
	],
];
