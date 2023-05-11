<?php
/**
 * @copyright Copyright (c) 2016 Julius Härtl <jus@bitgrid.net>
 *
 * @author Julius Härtl <jus@bitgrid.net>
 * @author Maxence Lange <maxence@artificial-owl.com>
 *
 * @license GNU AGPL version 3 or any later version
 *
 *  This program is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU Affero General Public License as
 *  published by the Free Software Foundation, either version 3 of the
 *  License, or (at your option) any later version.
 *
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU Affero General Public License for more details.
 *
 *  You should have received a copy of the GNU Affero General Public License
 *  along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 */

namespace OCA\Deck\Service;

use Doctrine\DBAL\Exception\UniqueConstraintViolationException;
use OCA\Deck\Activity\ActivityManager;
use OCA\Deck\Activity\ChangeSet;
use OCA\Deck\AppInfo\Application;
use OCA\Deck\Db\Acl;
use OCA\Deck\Db\AclMapper;
use OCA\Deck\Db\AssignmentMapper;
use OCA\Deck\Db\CardMapper;
use OCA\Deck\Db\ChangeHelper;
use OCA\Deck\Db\IPermissionMapper;
use OCA\Deck\Db\Label;
use OCA\Deck\Db\Stack;
use OCA\Deck\Db\StackMapper;
use OCA\Deck\Event\AclCreatedEvent;
use OCA\Deck\Event\AclDeletedEvent;
use OCA\Deck\Event\AclUpdatedEvent;
use OCA\Deck\NoPermissionException;
use OCA\Deck\Notification\NotificationHelper;
use OCP\AppFramework\Db\DoesNotExistException;
use OCP\EventDispatcher\IEventDispatcher;
use OCP\IConfig;
use OCP\IGroupManager;
use OCP\IL10N;
use OCA\Deck\Db\Board;
use OCA\Deck\Db\BoardMapper;
use OCA\Deck\Db\LabelMapper;
use OCP\IUserManager;
use OCA\Deck\BadRequestException;
use OCA\Deck\Validators\BoardServiceValidator;
use OCP\IURLGenerator;

class BoardService {
	private $boardMapper;
	private $stackMapper;
	private $labelMapper;
	private $aclMapper;
	/** @var IConfig */
	private $config;
	private $l10n;
	private $permissionService;
	private $notificationHelper;
	private $assignedUsersMapper;
	private $userManager;
	private $groupManager;
	private $userId;
	private $activityManager;
	private $eventDispatcher;
	private $changeHelper;
	private $cardMapper;

	private $boardsCache = null;
	private $urlGenerator;
	private $boardServiceValidator;


	public function __construct(
		BoardMapper $boardMapper,
		StackMapper $stackMapper,
		IConfig $config,
		IL10N $l10n,
		LabelMapper $labelMapper,
		AclMapper $aclMapper,
		PermissionService $permissionService,
		NotificationHelper $notificationHelper,
		AssignmentMapper $assignedUsersMapper,
		CardMapper $cardMapper,
		IUserManager $userManager,
		IGroupManager $groupManager,
		ActivityManager $activityManager,
		IEventDispatcher $eventDispatcher,
		ChangeHelper $changeHelper,
		IURLGenerator $urlGenerator,
		BoardServiceValidator $boardServiceValidator,
		$userId
	) {
		$this->boardMapper = $boardMapper;
		$this->stackMapper = $stackMapper;
		$this->labelMapper = $labelMapper;
		$this->config = $config;
		$this->aclMapper = $aclMapper;
		$this->l10n = $l10n;
		$this->permissionService = $permissionService;
		$this->notificationHelper = $notificationHelper;
		$this->assignedUsersMapper = $assignedUsersMapper;
		$this->userManager = $userManager;
		$this->groupManager = $groupManager;
		$this->activityManager = $activityManager;
		$this->eventDispatcher = $eventDispatcher;
		$this->changeHelper = $changeHelper;
		$this->userId = $userId;
		$this->urlGenerator = $urlGenerator;
		$this->cardMapper = $cardMapper;
		$this->boardServiceValidator = $boardServiceValidator;
	}

	/**
	 * Set a different user than the current one, e.g. when no user is available in occ
	 *
	 * @param string $userId
	 */
	public function setUserId(string $userId): void {
		$this->userId = $userId;
	}

	/**
	 * Get all boards that are shared with a user, their groups or circles
	 */
	public function getUserBoards(?int $since = null, bool $includeArchived = true, ?int $before = null,
								  ?string $term = null): array {
		return $this->boardMapper->findAllForUser($this->userId, $since, $includeArchived, $before, $term);
	}

	/**
	 * @return array
	 */
	public function findAll($since = -1, $details = null, $includeArchived = true) {
		if ($this->boardsCache) {
			return $this->boardsCache;
		}
		$complete = $this->getUserBoards($since, $includeArchived);
		$result = [];
		/** @var Board $item */
		foreach ($complete as &$item) {
			$this->boardMapper->mapOwner($item);
			if ($item->getAcl() !== null) {
				foreach ($item->getAcl() as &$acl) {
					$this->boardMapper->mapAcl($acl);
				}
			}
			if ($details !== null) {
				$this->enrichWithStacks($item);
				$this->enrichWithLabels($item);
				$this->enrichWithUsers($item);
			}
			$permissions = $this->permissionService->matchPermissions($item);
			$item->setPermissions([
				'PERMISSION_READ' => $permissions[Acl::PERMISSION_READ] ?? false,
				'PERMISSION_EDIT' => $permissions[Acl::PERMISSION_EDIT] ?? false,
				'PERMISSION_MANAGE' => $permissions[Acl::PERMISSION_MANAGE] ?? false,
				'PERMISSION_SHARE' => $permissions[Acl::PERMISSION_SHARE] ?? false
			]);
			$this->enrichWithBoardSettings($item);
			$result[$item->getId()] = $item;
		}
		$this->boardsCache = $result;
		return array_values($result);
	}

	/**
	 * @param $boardId
	 * @return Board
	 * @throws DoesNotExistException
	 * @throws \OCA\Deck\NoPermissionException
	 * @throws \OCP\AppFramework\Db\MultipleObjectsReturnedException
	 * @throws BadRequestException
	 */
	public function find($boardId) {
		$this->boardServiceValidator->check(compact('boardId'));
		if ($this->boardsCache && isset($this->boardsCache[$boardId])) {
			return $this->boardsCache[$boardId];
		}
		if (is_numeric($boardId) === false) {
			throw new BadRequestException('board id must be a number');
		}

		$this->permissionService->checkPermission($this->boardMapper, $boardId, Acl::PERMISSION_READ);
		/** @var Board $board */
		$board = $this->boardMapper->find($boardId, true, true);
		$this->boardMapper->mapOwner($board);
		if ($board->getAcl() !== null) {
			foreach ($board->getAcl() as $acl) {
				if ($acl !== null) {
					$this->boardMapper->mapAcl($acl);
				}
			}
		}
		$permissions = $this->permissionService->matchPermissions($board);
		$board->setPermissions([
			'PERMISSION_READ' => $permissions[Acl::PERMISSION_READ] ?? false,
			'PERMISSION_EDIT' => $permissions[Acl::PERMISSION_EDIT] ?? false,
			'PERMISSION_MANAGE' => $permissions[Acl::PERMISSION_MANAGE] ?? false,
			'PERMISSION_SHARE' => $permissions[Acl::PERMISSION_SHARE] ?? false
		]);
		$this->enrichWithUsers($board);
		$this->enrichWithBoardSettings($board);
		$this->boardsCache[$board->getId()] = $board;
		return $board;
	}

	/**
	 * @return array
	 */
	private function getBoardPrerequisites() {
		$groups = $this->groupManager->getUserGroupIds(
			$this->userManager->get($this->userId)
		);
		return [
			'user' => $this->userId,
			'groups' => $groups
		];
	}

	/**
	 * @param $mapper
	 * @param $id
	 * @return bool
	 * @throws DoesNotExistException
	 * @throws \OCA\Deck\NoPermissionException
	 * @throws \OCP\AppFramework\Db\MultipleObjectsReturnedException
	 * @throws BadRequestException
	 */
	public function isArchived($mapper, $id) {
		$this->boardServiceValidator->check(compact('id'));

		try {
			$boardId = $id;
			if ($mapper instanceof IPermissionMapper) {
				$boardId = $mapper->findBoardId($id);
			}
			if ($boardId === null) {
				return false;
			}
		} catch (DoesNotExistException $exception) {
			return false;
		}
		$board = $this->find($boardId);
		return $board->getArchived();
	}

	/**
	 * @param $mapper
	 * @param $id
	 * @return bool
	 * @throws DoesNotExistException
	 * @throws \OCA\Deck\NoPermissionException
	 * @throws \OCP\AppFramework\Db\MultipleObjectsReturnedException
	 * @throws BadRequestException
	 */
	public function isDeleted($mapper, $id) {
		$this->boardServiceValidator->check(compact('mapper', 'id'));

		try {
			$boardId = $id;
			if ($mapper instanceof IPermissionMapper) {
				$boardId = $mapper->findBoardId($id);
			}
			if ($boardId === null) {
				return false;
			}
		} catch (DoesNotExistException $exception) {
			return false;
		}
		$board = $this->find($boardId);
		return $board->getDeletedAt() > 0;
	}


	/**
	 * @param $title
	 * @param $userId
	 * @param $color
	 * @return \OCP\AppFramework\Db\Entity
	 * @throws BadRequestException
	 */
	public function create($title, $userId, $color) {
		$this->boardServiceValidator->check(compact('title', 'userId', 'color'));

		if (!$this->permissionService->canCreate()) {
			throw new NoPermissionException('Creating boards has been disabled for your account.');
		}

		$board = new Board();
		$board->setTitle($title);
		$board->setOwner($userId);
		$board->setColor($color);
		$new_board = $this->boardMapper->insert($board);

		// create new labels
		$default_labels = [
			'31CC7C' => $this->l10n->t('Finished'),
			'317CCC' => $this->l10n->t('To review'),
			'FF7A66' => $this->l10n->t('Action needed'),
			'F1DB50' => $this->l10n->t('Later')
		];
		$labels = [];
		foreach ($default_labels as $labelColor => $labelTitle) {
			$label = new Label();
			$label->setColor($labelColor);
			$label->setTitle($labelTitle);
			$label->setBoardId($new_board->getId());
			$labels[] = $this->labelMapper->insert($label);
		}
		$new_board->setLabels($labels);
		$this->boardMapper->mapOwner($new_board);
		$permissions = $this->permissionService->matchPermissions($new_board);
		$new_board->setPermissions([
			'PERMISSION_READ' => $permissions[Acl::PERMISSION_READ] ?? false,
			'PERMISSION_EDIT' => $permissions[Acl::PERMISSION_EDIT] ?? false,
			'PERMISSION_MANAGE' => $permissions[Acl::PERMISSION_MANAGE] ?? false,
			'PERMISSION_SHARE' => $permissions[Acl::PERMISSION_SHARE] ?? false
		]);
		$this->activityManager->triggerEvent(ActivityManager::DECK_OBJECT_BOARD, $new_board, ActivityManager::SUBJECT_BOARD_CREATE, [], $userId);
		$this->changeHelper->boardChanged($new_board->getId());

		return $new_board;
	}

	/**
	 * @param $id
	 * @return Board
	 * @throws DoesNotExistException
	 * @throws \OCA\Deck\NoPermissionException
	 * @throws \OCP\AppFramework\Db\MultipleObjectsReturnedException
	 * @throws BadRequestException
	 */
	public function delete($id) {
		$this->boardServiceValidator->check(compact('id'));

		$this->permissionService->checkPermission($this->boardMapper, $id, Acl::PERMISSION_MANAGE);
		$board = $this->find($id);
		if ($board->getDeletedAt() > 0) {
			throw new BadRequestException('This board has already been deleted');
		}
		$board->setDeletedAt(time());
		$board = $this->boardMapper->update($board);
		$this->activityManager->triggerEvent(ActivityManager::DECK_OBJECT_BOARD, $board, ActivityManager::SUBJECT_BOARD_DELETE);
		$this->changeHelper->boardChanged($board->getId());

		return $board;
	}

	/**
	 * @param $id
	 * @return \OCP\AppFramework\Db\Entity
	 * @throws DoesNotExistException
	 * @throws \OCA\Deck\NoPermissionException
	 * @throws \OCP\AppFramework\Db\MultipleObjectsReturnedException
	 */
	public function deleteUndo($id) {
		$this->boardServiceValidator->check(compact('id'));

		$this->permissionService->checkPermission($this->boardMapper, $id, Acl::PERMISSION_MANAGE);
		$board = $this->find($id);
		$board->setDeletedAt(0);
		$board = $this->boardMapper->update($board);
		$this->activityManager->triggerEvent(ActivityManager::DECK_OBJECT_BOARD, $board, ActivityManager::SUBJECT_BOARD_RESTORE);
		$this->changeHelper->boardChanged($board->getId());

		return $board;
	}

	/**
	 * @param $id
	 * @return \OCP\AppFramework\Db\Entity
	 * @throws DoesNotExistException
	 * @throws \OCA\Deck\NoPermissionException
	 * @throws \OCP\AppFramework\Db\MultipleObjectsReturnedException
	 * @throws BadRequestException
	 */
	public function deleteForce($id) {
		$this->boardServiceValidator->check(compact('id'));

		$this->permissionService->checkPermission($this->boardMapper, $id, Acl::PERMISSION_MANAGE);
		$board = $this->find($id);
		$delete = $this->boardMapper->delete($board);

		return $delete;
	}

	/**
	 * @param $id
	 * @param $title
	 * @param $color
	 * @param $archived
	 * @return \OCP\AppFramework\Db\Entity
	 * @throws DoesNotExistException
	 * @throws \OCA\Deck\NoPermissionException
	 * @throws \OCP\AppFramework\Db\MultipleObjectsReturnedException
	 * @throws BadRequestException
	 */
	public function update($id, $title, $color, $archived) {
		$this->boardServiceValidator->check(compact('id', 'title', 'color', 'archived'));

		$this->permissionService->checkPermission($this->boardMapper, $id, Acl::PERMISSION_MANAGE);
		$board = $this->find($id);
		$changes = new ChangeSet($board);
		$board->setTitle($title);
		$board->setColor($color);
		$board->setArchived($archived);
		$changes->setAfter($board);
		$this->boardMapper->update($board); // operate on clone so we can check for updated fields
		$this->boardMapper->mapOwner($board);
		$this->activityManager->triggerUpdateEvents(ActivityManager::DECK_OBJECT_BOARD, $changes, ActivityManager::SUBJECT_BOARD_UPDATE);
		$this->changeHelper->boardChanged($board->getId());

		return $board;
	}

	private function applyPermissions($boardId, $edit, $share, $manage) {
		try {
			$this->permissionService->checkPermission($this->boardMapper, $boardId, Acl::PERMISSION_MANAGE);
		} catch (NoPermissionException $e) {
			$acls = $this->aclMapper->findAll($boardId);
			$edit = $this->permissionService->userCan($acls, Acl::PERMISSION_EDIT, $this->userId) && $edit;
			$share = $this->permissionService->userCan($acls, Acl::PERMISSION_SHARE, $this->userId) && $share;
			$manage = $this->permissionService->userCan($acls, Acl::PERMISSION_MANAGE, $this->userId) && $manage;
		}
		return [$edit, $share, $manage];
	}

	public function enrichWithBoardSettings(Board $board) {
		$globalCalendarConfig = (bool)$this->config->getUserValue($this->userId, Application::APP_ID, 'calendar', true);
		$settings = [
			'notify-due' => $this->config->getUserValue($this->userId, Application::APP_ID, 'board:' . $board->getId() . ':notify-due', ConfigService::SETTING_BOARD_NOTIFICATION_DUE_ASSIGNED),
			'calendar' => $this->config->getUserValue($this->userId, Application::APP_ID, 'board:' . $board->getId() . ':calendar', $globalCalendarConfig),
		];
		$board->setSettings($settings);
	}

	/**
	 * @param $boardId
	 * @param $type
	 * @param $participant
	 * @param $edit
	 * @param $share
	 * @param $manage
	 * @return \OCP\AppFramework\Db\Entity
	 * @throws BadRequestException
	 * @throws \OCA\Deck\NoPermissionException
	 */
	public function addAcl($boardId, $type, $participant, $edit, $share, $manage) {
		$this->boardServiceValidator->check(compact('boardId', 'type', 'participant', 'edit', 'share', 'manage'));

		$this->permissionService->checkPermission($this->boardMapper, $boardId, Acl::PERMISSION_SHARE);
		[$edit, $share, $manage] = $this->applyPermissions($boardId, $edit, $share, $manage);

		$acl = new Acl();
		$acl->setBoardId($boardId);
		$acl->setType($type);
		$acl->setParticipant($participant);
		$acl->setPermissionEdit($edit);
		$acl->setPermissionShare($share);
		$acl->setPermissionManage($manage);
		$newAcl = $this->aclMapper->insert($acl);

		$this->activityManager->triggerEvent(ActivityManager::DECK_OBJECT_BOARD, $newAcl, ActivityManager::SUBJECT_BOARD_SHARE, [], $this->userId);
		$this->notificationHelper->sendBoardShared((int)$boardId, $acl);
		$this->boardMapper->mapAcl($newAcl);
		$this->changeHelper->boardChanged($boardId);

		$board = $this->boardMapper->find($boardId);
		$this->clearBoardFromCache($board);

		// TODO: use the dispatched event for this
		try {
			$resourceProvider = \OC::$server->query(\OCA\Deck\Collaboration\Resources\ResourceProvider::class);
			$resourceProvider->invalidateAccessCache($boardId);
		} catch (\Exception $e) {
		}

		$this->eventDispatcher->dispatchTyped(new AclCreatedEvent($acl));

		return $newAcl;
	}

	/**
	 * @param $id
	 * @param $edit
	 * @param $share
	 * @param $manage
	 * @return \OCP\AppFramework\Db\Entity
	 * @throws DoesNotExistException
	 * @throws \OCA\Deck\NoPermissionException
	 * @throws \OCP\AppFramework\Db\MultipleObjectsReturnedException
	 * @throws BadRequestException
	 */
	public function updateAcl($id, $edit, $share, $manage) {
		$this->boardServiceValidator->check(compact('id', 'edit', 'share', 'manage'));

		$this->permissionService->checkPermission($this->aclMapper, $id, Acl::PERMISSION_SHARE);

		/** @var Acl $acl */
		$acl = $this->aclMapper->find($id);
		[$edit, $share, $manage] = $this->applyPermissions($acl->getBoardId(), $edit, $share, $manage);
		$acl->setPermissionEdit($edit);
		$acl->setPermissionShare($share);
		$acl->setPermissionManage($manage);
		$this->boardMapper->mapAcl($acl);
		$board = $this->aclMapper->update($acl);
		$this->changeHelper->boardChanged($acl->getBoardId());

		$this->eventDispatcher->dispatchTyped(new AclUpdatedEvent($acl));

		return $board;
	}

	/**
	 * @param $id
	 * @return \OCP\AppFramework\Db\Entity
	 * @throws DoesNotExistException
	 * @throws \OCA\Deck\NoPermissionException
	 * @throws \OCP\AppFramework\Db\MultipleObjectsReturnedException
	 * @throws BadRequestException
	 */
	public function deleteAcl($id) {
		if (is_numeric($id) === false) {
			throw new BadRequestException('id must be a number');
		}

		$this->permissionService->checkPermission($this->aclMapper, $id, Acl::PERMISSION_SHARE);
		/** @var Acl $acl */
		$acl = $this->aclMapper->find($id);
		$this->boardMapper->mapAcl($acl);
		if ($acl->getType() === Acl::PERMISSION_TYPE_USER) {
			$assignements = $this->assignedUsersMapper->findByParticipant($acl->getParticipant());
			foreach ($assignements as $assignement) {
				$this->assignedUsersMapper->delete($assignement);
			}
		}

		$this->activityManager->triggerEvent(ActivityManager::DECK_OBJECT_BOARD, $acl, ActivityManager::SUBJECT_BOARD_UNSHARE);
		$this->notificationHelper->sendBoardShared($acl->getBoardId(), $acl, true);
		$this->changeHelper->boardChanged($acl->getBoardId());

		$version = \OCP\Util::getVersion()[0];
		if ($version >= 16) {
			try {
				$resourceProvider = \OC::$server->query(\OCA\Deck\Collaboration\Resources\ResourceProvider::class);
				$resourceProvider->invalidateAccessCache($acl->getBoardId());
			} catch (\Exception $e) {
			}
		}
		$delete = $this->aclMapper->delete($acl);

		$this->eventDispatcher->dispatchTyped(new AclDeletedEvent($acl));

		return $delete;
	}

	/**
	 * @param $id
	 * @param $userId
	 * @return Board
	 * @throws DoesNotExistException
	 * @throws \OCA\Deck\NoPermissionException
	 * @throws \OCP\AppFramework\Db\MultipleObjectsReturnedException
	 * @throws BadRequestException
	 */
	public function clone($id, $userId) {
		$this->boardServiceValidator->check(compact('id', 'userId'));

		$this->permissionService->checkPermission($this->boardMapper, $id, Acl::PERMISSION_READ);

		$board = $this->boardMapper->find($id);
		$newBoard = new Board();
		$newBoard->setTitle($board->getTitle() . ' (' . $this->l10n->t('copy') . ')');
		$newBoard->setOwner($userId);
		$newBoard->setColor($board->getColor());
		$permissions = $this->permissionService->matchPermissions($board);
		$newBoard->setPermissions([
			'PERMISSION_READ' => $permissions[Acl::PERMISSION_READ] ?? false,
			'PERMISSION_EDIT' => $permissions[Acl::PERMISSION_EDIT] ?? false,
			'PERMISSION_MANAGE' => $permissions[Acl::PERMISSION_MANAGE] ?? false,
			'PERMISSION_SHARE' => $permissions[Acl::PERMISSION_SHARE] ?? false
		]);
		$this->boardMapper->insert($newBoard);

		$labels = $this->labelMapper->findAll($id);
		foreach ($labels as $label) {
			$newLabel = new Label();
			$newLabel->setTitle($label->getTitle());
			$newLabel->setColor($label->getColor());
			$newLabel->setBoardId($newBoard->getId());
			$this->labelMapper->insert($newLabel);
		}

		$stacks = $this->stackMapper->findAll($id);
		foreach ($stacks as $stack) {
			$newStack = new Stack();
			$newStack->setTitle($stack->getTitle());
			$newStack->setBoardId($newBoard->getId());
			$this->stackMapper->insert($newStack);
		}

		return $this->find($newBoard->getId());
	}

	public function transferBoardOwnership(int $boardId, string $newOwner, bool $changeContent = false): Board {
		\OC::$server->getDatabaseConnection()->beginTransaction();
		try {
			$board = $this->boardMapper->find($boardId);
			$previousOwner = $board->getOwner();
			$this->clearBoardFromCache($board);
			$this->aclMapper->deleteParticipantFromBoard($boardId, Acl::PERMISSION_TYPE_USER, $newOwner);
			if (!$changeContent) {
				try {
					$this->addAcl($boardId, Acl::PERMISSION_TYPE_USER, $previousOwner, true, true, true);
				} catch (UniqueConstraintViolationException $e) {
				}
			}
			$this->boardMapper->transferOwnership($previousOwner, $newOwner, $boardId);

			// Optionally also change user assignments and card owner information
			if ($changeContent) {
				$this->assignedUsersMapper->remapAssignedUser($boardId, $previousOwner, $newOwner);
				$this->cardMapper->remapCardOwner($boardId, $previousOwner, $newOwner);
			}
			\OC::$server->getDatabaseConnection()->commit();
			return $this->boardMapper->find($boardId);
		} catch (\Throwable $e) {
			\OC::$server->getDatabaseConnection()->rollBack();
			throw $e;
		}
	}

	public function transferOwnership(string $owner, string $newOwner, bool $changeContent = false): \Generator {
		$boards = $this->boardMapper->findAllByUser($owner);
		foreach ($boards as $board) {
			if ($board->getOwner() === $owner) {
				yield $this->transferBoardOwnership($board->getId(), $newOwner, $changeContent);
			}
		}
	}

	private function enrichWithStacks($board, $since = -1) {
		$stacks = $this->stackMapper->findAll($board->getId(), null, null, $since);

		if (\count($stacks) === 0) {
			return;
		}

		$board->setStacks($stacks);
	}

	private function enrichWithLabels($board, $since = -1) {
		$labels = $this->labelMapper->findAll($board->getId(), null, null, $since);

		if (\count($labels) === 0) {
			return;
		}

		$board->setLabels($labels);
	}

	private function enrichWithUsers($board, $since = -1) {
		$boardUsers = $this->permissionService->findUsers($board->getId());
		if (\count($boardUsers) === 0) {
			return;
		}
		$board->setUsers(array_values($boardUsers));
	}

	public function getBoardUrl($endpoint) {
		return $this->urlGenerator->linkToRouteAbsolute('deck.page.index') . '#' . $endpoint;
	}

	private function clearBoardsCache() {
		$this->boardsCache = null;
	}

	/**
	 * Clean a given board data from the Cache
	 */
	private function clearBoardFromCache(Board $board) {
		$boardId = $board->getId();
		$boardOwnerId = $board->getOwner();

		$this->boardMapper->flushCache($boardId, $boardOwnerId);
		unset($this->boardsCache[$boardId]);
	}
}
