<?php

/**
 * @copyright Copyright (c) 2017 Robin Appelman <robin@icewind.nl>
 *
 * @license GNU AGPL version 3 or any later version
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 */

namespace OCA\TemplateRepo\Folder;

use ClassesWithParents\D;
use OC\Files\Cache\Cache;
use OCA\TemplateRepo\Mount\TemplateRepoStorage;
use OCP\Constants;
use OCP\DB\QueryBuilder\IQueryBuilder;
use OCP\Files\IMimeTypeLoader;
use OCP\IDBConnection;
use OCP\IGroupManager;
use OCP\IUser;

class FolderManager
{
	/** @var IDBConnection */
	private $connection;

	/** @var IGroupManager */
	private $groupManager;

	/** @var IMimeTypeLoader */
	private $mimeTypeLoader;

	public function __construct(IDBConnection $connection, IGroupManager $groupManager = null, IMimeTypeLoader $mimeTypeLoader = null)
	{
		$this->connection = $connection;

		// files_fulltextsearch compatibility
		if (!$groupManager) {
			$groupManager = \OC::$server->getGroupManager();
		}
		if (!$mimeTypeLoader) {
			$mimeTypeLoader = \OC::$server->getMimeTypeLoader();
		}
		$this->groupManager = $groupManager;
		$this->mimeTypeLoader = $mimeTypeLoader;
	}

	public function getAllFolders()
	{
		$applicableMap = $this->getAllApplicable();

		$query = $this->connection->getQueryBuilder();

		$query->select('folder_id', 'mount_point', 'quota', 'acl')
			->from('template_repo', 'f');

		$rows = $query->execute()->fetchAll();

		$folderMap = [];
		foreach ($rows as $row) {
			$id = (int) $row['folder_id'];
			$folderMap[$id] = [
				'id' => $id,
				'mount_point' => $row['mount_point'],
				'groups' => isset($applicableMap[$id]) ? $applicableMap[$id] : [],
				'quota' => $row['quota'],
				'size' => 0,
				'acl' => (bool) $row['acl']
			];
		}

		return $folderMap;
	}

	private function getGroupfolderRootId(int $rootStorageId): int
	{
		$query = $this->connection->getQueryBuilder();

		$query->select('fileid')
			->from('filecache')
			->where($query->expr()->eq('storage', $query->createNamedParameter($rootStorageId)))
			->andWhere($query->expr()->eq('path_hash', $query->createNamedParameter(md5('__templaterepo'))));

		return (int) $query->execute()->fetchColumn();
	}

	private function joinQueryWithFileCache(IQueryBuilder $query, $rootStorageId): IQueryBuilder
	{
		return $query->leftJoin('f', 'filecache', 'c', $query->expr()->andX(
			// concat with empty string to work around missing cast to string
			$query->expr()->eq('name', $query->func()->concat('f.folder_id', $query->expr()->literal(""))),
			$query->expr()->eq('parent', $query->createNamedParameter($this->getGroupfolderRootId($rootStorageId)))
		));
	}

	public function getAllFoldersWithSize($rootStorageId)
	{
		$applicableMap = $this->getAllApplicable();
		$applicableUserMap = $this->getAllApplicableUser();

		$query = $this->connection->getQueryBuilder();

		$query->select('folder_id', 'mount_point', 'quota', 'size', 'acl', 'api_server')
			->from('template_repo', 'f');
		$this->joinQueryWithFileCache($query, $rootStorageId);

		$rows = $query->execute()->fetchAll();

		$folderMap = [];
		foreach ($rows as $row) {
			$id = (int) $row['folder_id'];
			$folderMap[$id] = [
				'id' => $id,
				'mount_point' => $row['mount_point'],
				'groups' => isset($applicableMap[$id]) ? $applicableMap[$id] : [],
				'users' => isset($applicableUserMap[$id]) ? $applicableUserMap[$id] : [],
				'quota' => $row['quota'],
				'size' => $row['size'] ? $row['size'] : 0,
				'acl' => (bool) $row['acl'],
				'manage' => $this->getManageAcl($id),
				'api_server' => $row['api_server']
			];
		}

		return $folderMap;
	}

	private function getManageAcl($folderId)
	{
		$query = $this->connection->getQueryBuilder();
		$query->select('*')
			->from('template_repo_manage')
			->where($query->expr()->eq('folder_id', $query->createNamedParameter($folderId)));
		$result =  $query->execute()->fetchAll();
		return array_filter(array_map(function ($entry) {
			if ($entry['mapping_type'] === 'user') {
				$user = \OC::$server->getUserManager()->get($entry['mapping_id']);
				if ($user === null) {
					return null;
				}
				return [
					'type' => 'user',
					'id' => $user->getUID(),
					'displayname' => $user->getDisplayName()
				];
			}
			$group = \OC::$server->getGroupManager()->get($entry['mapping_id']);
			if ($group === null) {
				return [];
			}
			return [
				'type' => 'group',
				'id' => $group->getGID(),
				'displayname' => $group->getDisplayName()
			];
		}, $result), function ($element) {
			return $element !== null;
		});
	}

	public function getFolder($id, $rootStorageId)
	{
		$applicableMap = $this->getAllApplicable();

		$query = $this->connection->getQueryBuilder();

		$query->select('folder_id', 'mount_point', 'quota', 'size', 'acl')
			->from('template_repo', 'f')
			->where($query->expr()->eq('folder_id', $query->createNamedParameter($id, IQueryBuilder::PARAM_INT)));
		$this->joinQueryWithFileCache($query, $rootStorageId);

		$row = $query->execute()->fetch();

		return $row ? [
			'id' => $id,
			'mount_point' => $row['mount_point'],
			'groups' => isset($applicableMap[$id]) ? $applicableMap[$id] : [],
			'quota' => $row['quota'],
			'size' => $row['size'] ? $row['size'] : 0,
			'acl' => (bool) $row['acl']
		] : false;
	}

	public function getFolderByPath($path)
	{
		$node = \OC::$server->getRootFolder()->get($path);
		/** @var TemplateRepoStorage $mountpoint */
		$mountpoint = $node->getMountPoint();
		return $mountpoint->getFolderId();
	}

	private function getAllApplicable(bool $permissionOnly = true)
	{
		$query = $this->connection->getQueryBuilder();

		$query->select('folder_id', 'group_id', 'permissions')
			->from('template_repo_groups');

		$rows = $query->execute()->fetchAll();

		$applicableMap = [];
		foreach ($rows as $row) {
			$id = (int) $row['folder_id'];
			if (!isset($applicableMap[$id])) {
				$applicableMap[$id] = [];
			}
			$applicableMap[$id][$row['group_id']] = (int) $row['permissions'];
		}

		return $applicableMap;
	}

	private function getAllApplicableUser(bool $permissionOnly = true)
	{
		$query = $this->connection->getQueryBuilder();

		$query->select('folder_id', 'user_id', 'permissions')
			->from('template_repo_users');

		$rows = $query->execute()->fetchAll();

		$applicableMap = [];
		foreach ($rows as $row) {
			$id = (int) $row['folder_id'];
			if (!isset($applicableMap[$id])) {
				$applicableMap[$id] = [];
			}
			$applicableMap[$id][$row['user_id']] = (int) $row['permissions'];
		}

		return $applicableMap;
	}

	private function getGroups($id): array
	{
		$groups = $this->getAllApplicable()[$id];
		return array_map(function ($gid) {
			$group = $this->groupManager->get($gid);
			return [
				'gid' => $group->getGID(),
				'displayname' => $group->getDisplayName()
			];
		}, array_keys($groups));
	}

	public function canManageACL($folderId, $userId): bool
	{
		if ($this->groupManager->isAdmin($userId)) {
			return true;
		}

		$query = $this->connection->getQueryBuilder();
		$query->select('*')
			->from('template_repo_manage')
			->where($query->expr()->eq('folder_id', $query->createNamedParameter($folderId)))
			->andWhere($query->expr()->eq('mapping_type', $query->createNamedParameter('user')))
			->andWhere($query->expr()->eq('mapping_id', $query->createNamedParameter($userId)));
		if ($query->execute()->rowCount() === 1) {
			return true;
		}

		$query = $this->connection->getQueryBuilder();
		$query->select('*')
			->from('template_repo_manage')
			->where($query->expr()->eq('folder_id', $query->createNamedParameter($folderId)))
			->andWhere($query->expr()->eq('mapping_type', $query->createNamedParameter('group')));
		$groups = $query->execute()->fetchAll();
		foreach ($groups as $manageRule) {
			if ($this->groupManager->isInGroup($userId, $manageRule['mapping_id'])) {
				return true;
			}
		}
		return false;
	}

	public function searchGroups($id, $search = ''): array
	{
		$groups = $this->getGroups($id);
		if ($search === '') {
			return $groups;
		}
		return array_filter($groups, function ($group) use ($search) {
			return (stripos($group['gid'], $search) !== false) || (stripos($group['displayname'], $search) !== false);
		});
	}

	public function searchUsers($id, $search = '', $limit = 10, $offset = 0): array
	{
		$groups = $this->getGroups($id);
		$users = [[]];
		foreach ($groups as $groupArray) {
			$group = $this->groupManager->get($groupArray['gid']);
			if ($group) {
				$foundUsers = $this->groupManager->displayNamesInGroup($group->getGID(), $search, $limit, $offset);
				$users[] = array_map(function ($uid, $displayname) {
					return [
						'uid' => $uid,
						'displayname' => $displayname
					];
				}, array_keys($foundUsers), $foundUsers);
			}
		}
		return array_merge(...$users);
	}

	/**
	 * 取出具備這個使用者管理的資料夾
	 * @param string $groupId
	 * @param int $rootStorageId
	 * @return array[]
	 */
	public function getFoldersByUser($userId, $rootStorageId = 0)
	{
		$query = $this->connection->getQueryBuilder();

		$query->select(
			'f.folder_id',
			'mount_point',
			'quota',
			'acl',
			'fileid',
			'storage',
			'path',
			'name',
			'mimetype',
			'mimepart',
			'size',
			'mtime',
			'storage_mtime',
			'etag',
			'encrypted',
			'parent'
		)
			->selectAlias('a.permissions', 'user_permissions')
			->selectAlias('c.permissions', 'permissions')
			->from('template_repo', 'f')
			->innerJoin(
				'f',
				'template_repo_users',
				'a',
				$query->expr()->eq('f.folder_id', 'a.folder_id')
			)
			->where($query->expr()->eq('a.user_id', $query->createNamedParameter($userId)));
		$this->joinQueryWithFileCache($query, $rootStorageId);

		$result = $query->execute()->fetchAll();
		return array_map(function ($folder) {
			return [
				'folder_id' => (int) $folder['folder_id'],
				'mount_point' => $folder['mount_point'],
				'permissions' => (int) $folder['user_permissions'],
				'quota' => (int) $folder['quota'],
				'acl' => (bool) $folder['acl'],
				'rootCacheEntry' => (isset($folder['fileid'])) ? Cache::cacheEntryFromData($folder, $this->mimeTypeLoader) : null
			];
		}, $result);
	}

	/**
	 * @param string $groupId
	 * @param int $rootStorageId
	 * @return array[]
	 */
	public function getFoldersForGroup($groupId, $rootStorageId = 0)
	{
		$query = $this->connection->getQueryBuilder();

		$query->select(
			'f.folder_id',
			'mount_point',
			'quota',
			'acl',
			'fileid',
			'storage',
			'path',
			'name',
			'mimetype',
			'mimepart',
			'size',
			'mtime',
			'storage_mtime',
			'etag',
			'encrypted',
			'parent'
		)
			->selectAlias('a.permissions', 'group_permissions')
			->selectAlias('c.permissions', 'permissions')
			->from('template_repo', 'f')
			->innerJoin(
				'f',
				'template_repo_groups',
				'a',
				$query->expr()->eq('f.folder_id', 'a.folder_id')
			)
			->where($query->expr()->eq('a.group_id', $query->createNamedParameter($groupId)));
		$this->joinQueryWithFileCache($query, $rootStorageId);

		$result = $query->execute()->fetchAll();
		return array_map(function ($folder) {
			return [
				'folder_id' => (int) $folder['folder_id'],
				'mount_point' => $folder['mount_point'],
				'permissions' => (int) $folder['group_permissions'],
				'quota' => (int) $folder['quota'],
				'acl' => (bool) $folder['acl'],
				'rootCacheEntry' => (isset($folder['fileid'])) ? Cache::cacheEntryFromData($folder, $this->mimeTypeLoader) : null
			];
		}, $result);
	}

	public function createFolder($mountPoint)
	{
		$query = $this->connection->getQueryBuilder();

		$query->insert('template_repo')
			->values([
				'mount_point' => $query->createNamedParameter($mountPoint)
			]);
		$query->execute();

		return $this->connection->lastInsertId('template_repo');
	}

	public function setMountPoint($folderId, $mountPoint)
	{
		$query = $this->connection->getQueryBuilder();

		$query->update('template_repo')
			->set('mount_point', $query->createNamedParameter($mountPoint))
			->where($query->expr()->eq('folder_id', $query->createNamedParameter($folderId, IQueryBuilder::PARAM_INT)));
		$query->execute();
	}

	public function addApplicableGroup($folderId, $groupId)
	{
		$query = $this->connection->getQueryBuilder();

		$query->insert('template_repo_groups')
			->values([
				'folder_id' => $query->createNamedParameter($folderId, IQueryBuilder::PARAM_INT),
				'group_id' => $query->createNamedParameter($groupId),
				'permissions' => $query->createNamedParameter(Constants::PERMISSION_ALL ^ Constants::PERMISSION_SHARE)
			]);
		$query->execute();
	}

	public function removeApplicableGroup($folderId, $groupId)
	{
		$query = $this->connection->getQueryBuilder();

		$query->delete('template_repo_groups')
			->where($query->expr()->eq('folder_id', $query->createNamedParameter($folderId, IQueryBuilder::PARAM_INT)))
			->andWhere($query->expr()->eq('group_id', $query->createNamedParameter($groupId)));
		$query->execute();
	}

	public function addApplicableUser($folderId, $userId)
	{
		$query = $this->connection->getQueryBuilder();

		$query->insert('template_repo_users')
			->values([
				'folder_id' => $query->createNamedParameter($folderId, IQueryBuilder::PARAM_INT),
				'user_id' => $query->createNamedParameter($userId),
				'permissions' => $query->createNamedParameter(Constants::PERMISSION_ALL ^ Constants::PERMISSION_SHARE)
			]);
		$query->execute();
	}

	public function removeApplicableUser($folderId, $userId)
	{
		$query = $this->connection->getQueryBuilder();

		$query->delete('template_repo_users')
			->where($query->expr()->eq('folder_id', $query->createNamedParameter($folderId, IQueryBuilder::PARAM_INT)))
			->andWhere($query->expr()->eq('user_id', $query->createNamedParameter($userId)));
		$query->execute();
	}

	public function setGroupPermissions($folderId, $groupId, $permissions)
	{
		$query = $this->connection->getQueryBuilder();

		$query->update('template_repo_groups')
			->set('permissions', $query->createNamedParameter($permissions, IQueryBuilder::PARAM_INT))
			->where($query->expr()->eq('folder_id', $query->createNamedParameter($folderId, IQueryBuilder::PARAM_INT)))
			->andWhere($query->expr()->eq('group_id', $query->createNamedParameter($groupId)));

		$query->execute();
	}

	public function setUserPermissions($folderId, $userId, $permissions)
	{
		$query = $this->connection->getQueryBuilder();

		$query->update('template_repo_users')
			->set('permissions', $query->createNamedParameter($permissions, IQueryBuilder::PARAM_INT))
			->where($query->expr()->eq('folder_id', $query->createNamedParameter($folderId, IQueryBuilder::PARAM_INT)))
			->andWhere($query->expr()->eq('user_id', $query->createNamedParameter($userId)));

		$query->execute();
	}

	public function setManageACL($folderId, $type, $id, $manageAcl)
	{
		$query = $this->connection->getQueryBuilder();
		if ($manageAcl === true) {
			$query->insert('template_repo_manage')
				->values([
					'folder_id' => $query->createNamedParameter($folderId),
					'mapping_type' => $query->createNamedParameter($type),
					'mapping_id' => $query->createNamedParameter($id)
				]);
		} else {
			$query->delete('template_repo_manage')
				->where($query->expr()->eq('folder_id', $query->createNamedParameter($folderId)))
				->andWhere($query->expr()->eq('mapping_type', $query->createNamedParameter($type)))
				->andWhere($query->expr()->eq('mapping_id', $query->createNamedParameter($id)));
		}
		$query->execute();
	}

	public function removeFolder($folderId)
	{
		$query = $this->connection->getQueryBuilder();

		$query->delete('template_repo')
			->where($query->expr()->eq('folder_id', $query->createNamedParameter($folderId, IQueryBuilder::PARAM_INT)));
		$query->execute();
	}

	public function setFolderQuota($folderId, $quota)
	{
		$query = $this->connection->getQueryBuilder();

		$query->update('template_repo')
			->set('quota', $query->createNamedParameter($quota))
			->where($query->expr()->eq('folder_id', $query->createNamedParameter($folderId)));
		$query->execute();
	}

	public function renameFolder($folderId, $newMountPoint)
	{
		$query = $this->connection->getQueryBuilder();

		$query->update('template_repo')
			->set('mount_point', $query->createNamedParameter($newMountPoint))
			->where($query->expr()->eq('folder_id', $query->createNamedParameter($folderId, IQueryBuilder::PARAM_INT)));
		$query->execute();
	}

	public function deleteGroup($groupId)
	{
		$query = $this->connection->getQueryBuilder();

		$query->delete('template_repo_groups')
			->where($query->expr()->eq('group_id', $query->createNamedParameter($groupId)));
		$query->execute();
	}

	public function setFolderACL($folderId, bool $acl)
	{
		$query = $this->connection->getQueryBuilder();

		$query->update('template_repo')
			->set('acl', $query->createNamedParameter((int) $acl, IQueryBuilder::PARAM_INT))
			->where($query->expr()->eq('folder_id', $query->createNamedParameter($folderId)));
		$query->execute();

		if ($acl === false) {
			$query = $this->connection->getQueryBuilder();
			$query->delete('template_repo_manage')
				->where($query->expr()->eq('folder_id', $query->createNamedParameter($folderId)));
			$query->execute();
		}
	}

	/**
	 * @param IUser $user
	 * @param int $rootStorageId
	 * @return array[]
	 */
	public function getFoldersForUser(IUser $user, $rootStorageId = 0)
	{

		$groups = $this->groupManager->getUserGroupIds($user);
		$folders = array_reduce($groups, function ($folders, $groupId) use ($rootStorageId) {
			return array_merge($folders, $this->getFoldersForGroup($groupId, $rootStorageId));
		}, []);

		$mergedFolders = [];
		foreach ($folders as $folder) {
			$id = (int)$folder['folder_id'];
			if (isset($mergedFolders[$id])) {
				$mergedFolders[$id]['permissions'] |= $folder['permissions'];
			} else {
				$mergedFolders[$id] = $folder;
			}
		}

		#$mergedFolders = [];
		// Show manager directory only for User
		$folders = $this->getFoldersByUSer($user->getUID(), $rootStorageId);
		foreach ($folders as $folder) {
			$id = (int) $folder['folder_id'];
			if (isset($mergedFolders[$id])) {
				$mergedFolders[$id]['permissions'] |= $folder['permissions'];
			} else {
				$mergedFolders[$id] = $folder;
			}
		}

		return array_values($mergedFolders);
	}

	/**
	 * @param string $folderId
	 * @param string $apiServer
	 */
	public function setAPIServer($folderId, $apiServer)
	{
		$query = $this->connection->getQueryBuilder();

		$query->update('template_repo')
			->set('api_server', $query->createNamedParameter($apiServer))
			->where($query->expr()->eq('folder_id', $query->createNamedParameter($folderId, IQueryBuilder::PARAM_INT)));
		$query->execute();
	}

	public function getAPIServer($folderId)
	{
		$query = $this->connection->getQueryBuilder();
		$query->select('api_server')
			->from('template_repo')
			->where($query->expr()->eq('folder_id', $query->createNamedParameter($folderId, IQueryBuilder::PARAM_INT)));

		$rows = $query->execute()->fetchAll();

		$api_server = "";
		foreach ($rows as $row) {
			$api_server = $row['api_server'];
		}

		return $api_server;
	}

	public function getMountPointById($folderId)
	{
		$query = $this->connection->getQueryBuilder();
		$query->select('mount_point')
			->from('template_repo')
			->where($query->expr()->eq('folder_id', $query->createNamedParameter($folderId, IQueryBuilder::PARAM_INT)));

		$rows = $query->execute()->fetchAll();

		$mount_point = "";
		foreach ($rows as $row) {
			$mount_point = $row['mount_point'];
		}

		return $mount_point;
	}
}
