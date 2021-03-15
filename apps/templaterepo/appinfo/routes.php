<?php

return ['routes' => [
	[
		'name' => 'Folder#getFolders',
		'url' => '/folders',
		'verb' => 'GET'
	],
	[
		'name' => 'Folder#getFolder',
		'url' => '/folders/{id}',
		'verb' => 'GET'
	],
	[
		'name' => 'Folder#addFolder',
		'url' => '/folders',
		'verb' => 'POST'
	],
	[
		'name' => 'Folder#removeFolder',
		'url' => '/folders/{id}',
		'verb' => 'DELETE'
	],
	[
		'name' => 'Folder#setMountPoint',
		'url' => '/folders/{id}',
		'verb' => 'PUT'
	],
	[
		'name' => 'Folder#addGroup',
		'url' => '/folders/{id}/groups',
		'verb' => 'POST'
	],
	[
		'name' => 'Folder#removeGroup',
		'url' => '/folders/{id}/groups/{group}',
		'verb' => 'DELETE',
		'requirements' => ['group' => '.+']
	],
	[
		'name' => 'Folder#addUser',
		'url' => '/folders/{id}/users',
		'verb' => 'POST'
	],
	[
		'name' => 'Folder#removeUser',
		'url' => '/folders/{id}/users/{user}',
		'verb' => 'DELETE'
	],
	[
		'name' => 'Folder#setPermissions',
		'url' => '/folders/{id}/groups/{group}',
		'verb' => 'POST',
		'requirements' => ['group' => '.+']
	],
	[
		'name' => 'Folder#setPermissionsForUser',
		'url' => '/folders/{id}/users/{user}',
		'verb' => 'POST'
	],
	[
		'name' => 'Folder#getFolderList',
		'url' => '/folderlist',
	],
	[
		'name' => 'Folder#setManageACL',
		'url' => '/folders/{id}/manageACL',
		'verb' => 'POST'
	],
	[
		'name' => 'Folder#setQuota',
		'url' => '/folders/{id}/quota',
		'verb' => 'POST'
	],
	[
		'name' => 'Folder#setACL',
		'url' => '/folders/{id}/acl',
		'verb' => 'POST'
	],
	[
		'name' => 'Folder#renameFolder',
		'url' => '/folders/{id}/mountpoint',
		'verb' => 'POST'
	],
	[
		'name' => 'Folder#aclMappingSearch',
		'url' => '/folders/{id}/search',
		'verb' => 'GET'
	],
	[
		'name' => 'Folder#setAPIServer',
		'url' => '/folders/{id}/apiserver',
		'verb' => 'POST'
	],
	[
		'name' => 'Folder#getFolderList',
		'url' => '/folderlist',
		'verb' => 'GET'
	],
	[
		'name' => 'Folder#syncFolder',
		'url' => '/syncfolder/{id}',
		'verb' => 'GET'
	],
	[
		'name' => 'Folder#renameFolder',
		'url' => '/folders/{id}/mountpoint',
		'verb' => 'POST'
	],
]];
