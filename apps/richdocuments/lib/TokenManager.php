<?php
/**
 * @copyright Copyright (c) 2016 Lukas Reschke <lukas@statuscode.ch>
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

namespace OCA\Richdocuments;

use OC\Share\Constants;
use OCA\Richdocuments\Db\WopiMapper;
use OCA\Richdocuments\Helper;
use OCA\Richdocuments\Db\Wopi;
use OCA\Richdocuments\WOPI\Parser;
use OCP\Files\File;
use OCP\Files\IRootFolder;
use OCP\Files\Node;
use OCP\IGroupManager;
use OCP\IURLGenerator;
use OCP\IUserManager;
use OCP\Security\ISecureRandom;
use OCP\Share\IManager;
use OCP\IL10N;
use OCP\Util;

class TokenManager {
	/** @var IRootFolder */
	private $rootFolder;
	/** @var IManager */
	private $shareManager;
	/** @var IURLGenerator */
	private $urlGenerator;
	/** @var Parser */
	private $wopiParser;
	/** @var AppConfig */
	private $appConfig;
	/** @var string */
	private $userId;
	/** @var WopiMapper */
	private $wopiMapper;
	/** @var IL10N */
	private $trans;
	/** @var IUserManager */
	private $userManager;
	/** @var IGroupManager */
	private $groupManager;

	/**
	 * @param IRootFolder $rootFolder
	 * @param IManager $shareManager
	 * @param IURLGenerator $urlGenerator
	 * @param Parser $wopiParser
	 * @param AppConfig $appConfig
	 * @param string $UserId
	 * @param WopiMapper $wopiMapper
	 * @param IL10N $trans
	 */
	public function __construct(IRootFolder $rootFolder,
								IManager $shareManager,
								IURLGenerator $urlGenerator,
								Parser $wopiParser,
								AppConfig $appConfig,
								$UserId,
								WopiMapper $wopiMapper,
								IL10N $trans,
								IUserManager $userManager,
								IGroupManager $groupManager) {
		$this->rootFolder = $rootFolder;
		$this->shareManager = $shareManager;
		$this->urlGenerator = $urlGenerator;
		$this->wopiParser = $wopiParser;
		$this->appConfig = $appConfig;
		$this->trans = $trans;
		$this->userId = $UserId;
		$this->wopiMapper = $wopiMapper;
		$this->userManager = $userManager;
		$this->groupManager = $groupManager;
	}

	/**
	 * @param string $fileId
	 * @param string $shareToken
	 * @param string $editoruid
	 * @return array
	 * @throws \Exception
	 */
	public function getToken($fileId, $shareToken = null, $editoruid = null, $direct = false, $isRemoteToken = false) {
		list($fileId,, $version) = Helper::parseFileId($fileId);
		$owneruid = null;
		$hideDownload = false;
		// if the user is not logged-in do use the sharers storage
		if($shareToken !== null) {
			/** @var File $file */
			$rootFolder = $this->rootFolder;
			$share = $this->shareManager->getShareByToken($shareToken);
			$updatable = (bool)($share->getPermissions() & \OCP\Constants::PERMISSION_UPDATE);
			$hideDownload = $share->getHideDownload();
			$owneruid = $share->getShareOwner();
		} else if ($this->userId !== null) {
			try {
				$editoruid = $this->userId;
				$rootFolder = $this->rootFolder->getUserFolder($editoruid);

				$files = $rootFolder->getById((int)$fileId);
				$updatable = false;
				foreach ($files as $file) {
					if ($file->isUpdateable()) {
						$updatable = true;
						break;
					}
				}

				// Check if the editor (user who is accessing) is in editable group
				// UserCanWrite only if
				// 1. No edit groups are set or
				// 2. if they are set, it is in one of the edit groups
				$editGroups = array_filter(explode('|', $this->appConfig->getAppValue('edit_groups')));
				$editorUser = $this->userManager->get($editoruid);
				if ($updatable && count($editGroups) > 0 && $editorUser) {
					$updatable = false;
					foreach($editGroups as $editGroup) {
						 $editorGroup = $this->groupManager->get($editGroup);
						 if ($editorGroup !== null && $editorGroup->inGroup($editorUser)) {
							$updatable = true;
							break;
						 }
					}
				}
			} catch (\Exception $e) {
				throw $e;
			}
		} else {
			$rootFolder = $this->rootFolder;
			// no active user login while generating the token
			// this is required during WopiPutRelativeFile
			if (is_null($editoruid)) {
				\OC::$server->getLogger()->warning('Generating token for SaveAs without editoruid');
			} else {
				// Make sure we use the user folder if available since fetching all files by id from the root might be expensive
				$rootFolder = $this->rootFolder->getUserFolder($editoruid);
			}
			$updatable = true;
		}
		/** @var File $file */
		$file = $rootFolder->getById($fileId)[0];
		// If its a public share, use the owner from the share, otherwise check the file object
		if (is_null($owneruid)) {
			$owner = $file->getOwner();
			if (is_null($owner)) {
				// Editor UID instead of owner UID in case owner is null e.g. group folders
				$owneruid = $editoruid;
			} else {
				$owneruid = $owner->getUID();
			}
		}
		$serverHost = $this->urlGenerator->getAbsoluteURL('/');//$this->request->getServerProtocol() . '://' . $this->request->getServerHost();

		if ($this->userId === null && isset($_COOKIE['guestUser']) && $_COOKIE['guestUser'] !== '') {
			$guest_name = $this->trans->t('%s (Guest)', Util::sanitizeHTML($_COOKIE['guestUser']));
		} else {
			$guest_name = NULL;
		}

		$wopi = $this->wopiMapper->generateFileToken($fileId, $owneruid, $editoruid, $version, (int)$updatable, $serverHost, $guest_name, 0, $hideDownload, $direct, $isRemoteToken);

		try {

			return [
				$this->wopiParser->getUrlSrc($file->getMimeType())['urlsrc'],
				$wopi->getToken(),
				$wopi
			];
		} catch (\Exception $e){
			throw $e;
		}
	}

	public function updateToRemoteToken(Wopi $wopi, $shareToken, $remoteServer, $remoteServerToken, $remoteWopi) {
		$uid = $remoteWopi['editorUid'] . '@' . $remoteServer;
		$wopi->setEditorUid($shareToken);
		$wopi->setCanwrite($wopi->getCanwrite() && $remoteWopi['canwrite']);
		$wopi->setRemoteServer($remoteServer);
		$wopi->setRemoteServerToken($remoteServerToken);
		$wopi->setGuestDisplayname($uid);
		$this->wopiMapper->update($wopi);
		return $wopi;
	}

	public function getTokenForTemplate(File $file, $userId, $templateDestination, $direct = false) {
		$owneruid = $userId;
		$editoruid = $userId;
		$updatable = $file->isUpdateable();
		// Check if the editor (user who is accessing) is in editable group
		// UserCanWrite only if
		// 1. No edit groups are set or
		// 2. if they are set, it is in one of the edit groups
		$editGroups = array_filter(explode('|', $this->appConfig->getAppValue('edit_groups')));
		$editorUser = $this->userManager->get($editoruid);
		if ($updatable && count($editGroups) > 0 && $editorUser) {
			$updatable = false;
			foreach($editGroups as $editGroup) {
				$editorGroup = $this->groupManager->get($editGroup);
				if ($editorGroup !== null && $editorGroup->inGroup($editorUser)) {
					$updatable = true;
					break;
				}
			}
		}

		$serverHost = $this->urlGenerator->getAbsoluteURL('/');

		$wopi = $this->wopiMapper->generateFileToken($file->getId(), $owneruid, $editoruid, 0, (int)$updatable, $serverHost, null, $templateDestination, $direct);

		return [
			$this->wopiParser->getUrlSrc($file->getMimeType())['urlsrc'],
			$wopi->getToken(),
		];
	}

	/**
	 * @param Node $node
	 * @return Wopi
	 */
	public function getRemoteToken(Node $node) {
		list($urlSrc, $token, $wopi) = $this->getToken($node->getId(), null, null, false, true);
		$wopi->setIsRemoteToken(true);
		$wopi->setRemoteServer($node->getStorage()->getRemote());

		$this->wopiMapper->update($wopi);
		return $wopi;
	}

	/**
	 * @param Node $node
	 * @return Wopi
	 */
	public function getRemoteTokenFromDirect(Node $node, $editorUid) {
		list($urlSrc, $token, $wopi) = $this->getToken($node->getId(), null, $editorUid, true, true);
		$wopi->setIsRemoteToken(true);
		$wopi->setRemoteServer($node->getStorage()->getRemote());

		$this->wopiMapper->update($wopi);
		return $wopi;
	}


}
