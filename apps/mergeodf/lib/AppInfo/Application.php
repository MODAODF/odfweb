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

namespace OCA\MergeODF\AppInfo;

use OC\Group\Manager;
use OCA\MergeODF\ACL\ACLManagerFactory;
use OCA\MergeODF\ACL\RuleManager;
use OCA\MergeODF\ACL\UserMapping\IUserMappingManager;
use OCA\MergeODF\ACL\UserMapping\UserMappingManager;
use OCA\MergeODF\CacheListener;
use OCA\MergeODF\Command\ExpireGroupVersions;
use OCA\MergeODF\Command\ExpireGroupVersionsPlaceholder;
use OCA\MergeODF\Folder\FolderManager;
use OCA\MergeODF\Helper\LazyFolder;
use OCA\MergeODF\Mount\MountProvider;
use OCA\MergeODF\Trash\TrashBackend;
use OCA\MergeODF\Trash\TrashManager;
use OCA\MergeODF\Versions\GroupVersionsExpireManager;
use OCA\MergeODF\Versions\VersionsBackend;
use OCA\MergeODF\Notification\Notifier;
use OCP\AppFramework\App;
use OCP\AppFramework\IAppContainer;
use OCP\AppFramework\Utility\ITimeFactory;
use OCP\Files\NotFoundException;
use OCP\IGroup;
use OCP\IGroupManager;
use OCP\IRequest;
use OCP\ISession;
use OCP\IUserSession;
use OCP\EventDispatcher\IEventDispatcher;
use OCA\MergeODF\Event\LoadSelfSidebar;
use OCA\MergeODF\Listener\LoadSelfSidebarListener;

use OCP\Util;
use OCP\Files\Node;
use OC\Files\Filesystem;


class Application extends App
{
	public function __construct(array $urlParams = [])
	{
		parent::__construct('mergeodf', $urlParams);

		$container = $this->getContainer();

		$container->registerAlias('GroupAppFolder', LazyFolder::class);

		$container->registerService(MountProvider::class, function (IAppContainer $c) {
			$rootProvider = function () use ($c) {
				return $c->query('GroupAppFolder');
			};

			return new MountProvider(
				$c->getServer()->getGroupManager(),
				$c->query(FolderManager::class),
				$rootProvider,
				$c->query(ACLManagerFactory::class),
				$c->query(IUserSession::class),
				$c->query(IRequest::class),
				$c->query(ISession::class)
			);
		});

		$container->registerService(TrashBackend::class, function (IAppContainer $c) {
			return new TrashBackend(
				$c->query(FolderManager::class),
				$c->query(TrashManager::class),
				$c->query('GroupAppFolder'),
				$c->query(MountProvider::class),
				$c->query(ACLManagerFactory::class)
			);
		});

		$container->registerService(VersionsBackend::class, function (IAppContainer $c) {
			return new VersionsBackend(
				$c->query('GroupAppFolder'),
				$c->query(MountProvider::class),
				$c->query(ITimeFactory::class)
			);
		});

		$container->registerService(ExpireGroupVersions::class, function (IAppContainer $c) {
			if (interface_exists('OCA\Files_Versions\Versions\IVersionBackend')) {
				return new ExpireGroupVersions(
					$c->query(GroupVersionsExpireManager::class)
				);
			} else {
				return new ExpireGroupVersionsPlaceholder();
			}
		});

		$container->registerService(\OCA\MergeODF\BackgroundJob\ExpireGroupVersions::class, function (IAppContainer $c) {
			if (interface_exists('OCA\Files_Versions\Versions\IVersionBackend')) {
				return new \OCA\MergeODF\BackgroundJob\ExpireGroupVersions(
					$c->query(GroupVersionsExpireManager::class)
				);
			} else {
				return new \OCA\MergeODF\BackgroundJob\ExpireGroupVersionsPlaceholder();
			}
		});

		$container->registerService(ACLManagerFactory::class, function (IAppContainer $c) {
			$rootFolderProvider = function () use ($c) {
				return $c->getServer()->getRootFolder();
			};
			return new ACLManagerFactory(
				$c->query(RuleManager::class),
				$rootFolderProvider
			);
		});

		/** @var IEventDispatcher $dispatcher */
		$dispatcher = $container->query(IEventDispatcher::class);
		$dispatcher->addServiceListener(LoadSelfSidebar::class, LoadSelfSidebarListener::class);
		
		$container->registerAlias(IUserMappingManager::class, UserMappingManager::class);
	}

	public function register()
	{
		$container = $this->getContainer();

		$container->getServer()->getMountProviderCollection()->registerProvider($this->getMountProvider());

		/** @var IGroupManager|Manager $groupManager */
		$groupManager = $this->getContainer()->getServer()->getGroupManager();
		$groupManager->listen('\OC\Group', 'postDelete', function (IGroup $group) {
			$this->getFolderManager()->deleteGroup($group->getGID());
		});

		/** @var CacheListener $cacheListener */
		$cacheListener = $container->query(CacheListener::class);
		$cacheListener->listen();
		/** @var IGroupManager|Manager $groupManager */
		/** ???????????? upload ?????? */
		$rootfolder = $this->getContainer()->getServer()->getRootFolder();

		/** ???????????????????????????????????? */
		$rootfolder->listen('\OC\Files', 'preCreate', function ($k) {
			$method = \OC::$server->getRequest()->getMethod();
			$mount_type = $k->getParent()->getFileInfo()->getMountPoint()->getMountType();
			if ($method == "MKCOL" && $mount_type == "mergeodf") {
				throw new \OC\ServerNotAvailableException;
			}

			$ext = strtolower(pathinfo($k->getPath(), PATHINFO_EXTENSION));
			if ($mount_type == "mergeodf" && ($ext != "ott" && $ext != "ots" && $ext != "otp")) {
				throw new \OC\ServerNotAvailableException;
			}
		});

		/** ???????????????????????????????????? */
		$rootfolder->listen('\OC\Files', 'preCopy', function ($k) {
			$method = \OC::$server->getRequest()->getMethod();
			$mount_type = $k->getParent()->getFileInfo()->getMountPoint()->getMountType();
			if ($method == "COPY" && $mount_type == "mergeodf") {
				// Create a sabre server instance to get the information for the request
				$tmpuri = "/remote.php/dav";
				$request = \OC::$server->getRequest();
				$tmps = new \OCA\DAV\Server($request, $tmpuri);
				$path = $tmps->server->httpRequest->getPath();
				$path = str_replace("remote.php/dav", "", $path);
				$node = $tmps->server->tree->getNodeForPath($path);
				if ($node->getFileInfo()->getType() == "dir") {
					throw new \OC\ServerNotAvailableException;
				}
			}
		});

		/** ???????????????????????????????????? */
		$rootfolder->listen('\OC\Files', 'preRename', function ($k) {
			$method = \OC::$server->getRequest()->getMethod();
			$tmpuri = "/remote.php/dav";
			$request = \OC::$server->getRequest();
			$tmps = new \OCA\DAV\Server($request, $tmpuri);
			$dest = $tmps->server->getCopyAndMoveInfo($tmps->server->httpRequest);
			$destPath = $dest['destination'];
			$destDir = dirname($destPath);
			$mount_type = $tmps->server->tree->getNodeForPath($destDir)->getFileInfo()->getMountPoint()->getMountType();
			if ($method == "MOVE" && $mount_type == "mergeodf") {
				// Create a sabre server instance to get the information for the request
				if ($k->getFileInfo()->getType() == "dir") {
					throw new \OC\ServerNotAvailableException;
				}
			}
		});


		/** ???????????? upload ?????? */
		$rootfolder->listen('\OC\Files', 'postCreate', function ($k) {
			$fileInfo = $k->getFileInfo();
			if (
				$fileInfo->getMountPoint()->getMountType() == "mergeodf" &&
				$fileInfo->getData()->getData()['type'] == "file"
			) {
				$this->uploadFile($fileInfo);
			}
		});

		/** ???????????? delete ?????? */
		$rootfolder->listen('\OC\Files', 'postDelete', function ($k) {
			$fileInfo = $k->getFileInfo();
			if (
				$fileInfo->getMountPoint()->getMountType() == "mergeodf" &&
				$fileInfo->getData()->getData()['type'] == "file"
			) {
				$this->deleteFile($fileInfo);
			}
		});

		/*	Update ??????????????? Hook (?????????????????? Hook, ???????????????)
				OC_Filesystem:
					pre_create
					pre_update
					pre_write
					post_create
					post_update
					post_write
				Sabre/DAV/Server/Hook:
					beforeWriteContent
					afterWriteContent

			**???????????? post_update**
		*/
		Util::connectHook('OC_Filesystem', 'post_update', $this, 'postUpdate');

		/** ???????????? update ?????? */
		$rootfolder->listen('\OC\Files', 'postUpdate', function ($k) {
			$fileInfo = $k;
			if (
				$fileInfo->getMountPoint()->getMountType() == "mergeodf"
			) {
				$this->updateFile($fileInfo);
			}
		});

		// ????????????????????????
		$notifyManager = $this->getContainer()->getServer()->getNotificationManager();
		$notifyManager->registerNotifierService(
			Notifier::class
		);
	}

	/**
	 * @return MountProvider
	 */
	public function getMountProvider()
	{
		return $this->getContainer()->query(MountProvider::class);
	}

	/**
	 * @return FolderManager
	 */
	public function getFolderManager()
	{
		return $this->getContainer()->query(FolderManager::class);
	}

	public function postUpdate($arguments)
	{
		$info = Filesystem::getView()->getFileInfo($arguments['path']);
		$this->getContainer()->getServer()->getRootFolder()->emit('\OC\Files', 'postUpdate', [$info]);
	}

	private function uploadFile(\OC\Files\FileInfo $fileInfo)
	{
		$filePath = $fileInfo->getInternalPath();
		$fileType = $fileInfo->getMimetype();
		$fileName = $fileInfo->getName();
		$fileExt = $fileInfo->getExtension();
		$folderId = $fileInfo->getMountPoint()->getFolderId(); // getFolderId is in MergeODF's GroupMounPoint
		$file_content = $fileInfo->getStorage()->file_get_contents($filePath);
		$api_server = $this->getFolderManager()->getAPIServer($folderId);
		$path_hash  = $fileInfo->getData()->getData()['path_hash'];
		$mtime  = $fileInfo->getData()->getData()['mtime'];
		$cid = $fileInfo->getMountPoint()->getMountPoint();
		$cid = explode("/", $cid)[3];
		$baseName = str_replace("." . $fileExt, "", $fileName);

		$url = $api_server . "/lool/mergeodf/upload";
		$tmph = tmpfile();
		fwrite($tmph, $file_content);
		$tmpf = stream_get_meta_data($tmph)['uri'];
		$fields = array(
			'endpt' => $path_hash,
			'filename' => curl_file_create($tmpf, $fileType, $fileName),
			'extname' => $fileExt,
			'cname' => $cid,
			'docname' => $baseName,
			'uptime' => date("Y-m-d H:i:s", $mtime)
		);
		$curl = curl_init();
		curl_setopt($curl, CURLOPT_POST, true);
		curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
		curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
		curl_setopt($curl, CURLOPT_URL, $url);
		curl_setopt($curl, CURLOPT_POSTFIELDS, $fields);
		curl_setopt($curl, CURLOPT_CONNECTTIMEOUT, 10);
		curl_setopt($curl, CURLOPT_TIMEOUT, 10);
		$response = curl_exec($curl);
		$httpCode = curl_getinfo($curl, CURLINFO_HTTP_CODE);
		$mount_point = $this->getFolderManager()->getMountPointById($folderId);
		if ($httpCode != 200) {
			$this->notify("upload-fail", $mount_point, $api_server, $fileName);
		} else {
			$this->notify("upload-success", $mount_point, $api_server, $fileName);
		}
		curl_close($curl);
	}

	private function deleteFile(\OC\Files\FileInfo $fileInfo)
	{
		$fileExt = $fileInfo->getExtension();
		$folderId = $fileInfo->getMountPoint()->getFolderId(); // getFolderId is in MergeODF's GroupMounPoint
		$fileName = $fileInfo->getName();
		$api_server = $this->getFolderManager()->getAPIServer($folderId);
		$path_hash  = $fileInfo->getData()->getData()['path_hash'];

		$url = $api_server . "/lool/mergeodf/delete";
		$fields = array(
			'endpt' => $path_hash,
			'extname' => $fileExt,
		);
		$curl = curl_init();
		curl_setopt($curl, CURLOPT_POST, true);
		curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
		curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
		curl_setopt($curl, CURLOPT_URL, $url);
		curl_setopt($curl, CURLOPT_POSTFIELDS, $fields);
		curl_setopt($curl, CURLOPT_CONNECTTIMEOUT, 10);
		curl_setopt($curl, CURLOPT_TIMEOUT, 10);
		$response = curl_exec($curl);
		$httpCode = curl_getinfo($curl, CURLINFO_HTTP_CODE);
		$mount_point = $this->getFolderManager()->getMountPointById($folderId);
		if ($httpCode != 200) {
			$this->notify("upload-fail", $mount_point, $api_server, $fileName);
		} else {
			$this->notify("upload-success", $mount_point, $api_server, $fileName);
		}
		curl_close($curl);
	}

	private function updateFile(\OC\Files\FileInfo $fileInfo)
	{
		$filePath = $fileInfo->getInternalPath();
		$fileType = $fileInfo->getMimetype();
		$fileName = $fileInfo->getName();
		$fileExt = $fileInfo->getExtension();
		$folderId = $fileInfo->getMountPoint()->getFolderId(); // getFolderId is in MergeODF's GroupMounPoint
		$file_content = $fileInfo->getStorage()->file_get_contents($filePath);
		$api_server = $this->getFolderManager()->getAPIServer($folderId);
		$path_hash  = $fileInfo->getData()->getData()['path_hash'];
		$mtime  = $fileInfo->getData()->getData()['mtime'];
		$cid = $fileInfo->getMountPoint()->getMountPoint();
		$cid = explode("/", $cid)[3];

		$url = $api_server . "/lool/mergeodf/update";
		$tmph = tmpfile();
		fwrite($tmph, $file_content);
		$tmpf = stream_get_meta_data($tmph)['uri'];
		$fields = array(
			'endpt' => $path_hash,
			'filename' => curl_file_create($tmpf, $fileType, $fileName),
			'extname' => $fileExt,
			'cid' => $cid,
			'uptime' => date("Y-m-d H:i:s", $mtime)
		);
		$curl = curl_init();
		curl_setopt($curl, CURLOPT_POST, true);
		curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
		curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
		curl_setopt($curl, CURLOPT_URL, $url);
		curl_setopt($curl, CURLOPT_POSTFIELDS, $fields);
		curl_setopt($curl, CURLOPT_CONNECTTIMEOUT, 10);
		curl_setopt($curl, CURLOPT_TIMEOUT, 10);
		$response = curl_exec($curl);
		$httpCode = curl_getinfo($curl, CURLINFO_HTTP_CODE);
		$mount_point = $this->getFolderManager()->getMountPointById($folderId);
		if ($httpCode != 200) {
			$this->notify("upload-fail", $mount_point, $api_server, $fileName);
		} else {
			$this->notify("upload-success", $mount_point, $api_server, $fileName);
		}
		curl_close($curl);
	}

	private function notify(string $type, string $mount_point, string $api_server, string $filename)
	{
		$user = $this->getContainer()->getServer()->getSession()->get('user_id');
		$manager = $this->getContainer()->getServer()->getNotificationManager();
		$notification = $manager->createNotification();
		$notification->setApp('mergeodf')
			->setUser($user)
			->setDateTime(new \DateTime())
			->setObject('mergeodf', '1') // $type and $id
			->setSubject($type, [
				'filename' => $filename,
				'user' => $user,
				'api_server' => $api_server,
				'mount_point' => $mount_point
			]);
		$manager->notify($notification);
	}
}
