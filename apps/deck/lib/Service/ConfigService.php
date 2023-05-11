<?php
/**
 * @copyright Copyright (c) 2020 Julius Härtl <jus@bitgrid.net>
 *
 * @author Julius Härtl <jus@bitgrid.net>
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
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 *
 */

declare(strict_types=1);


namespace OCA\Deck\Service;

use OCA\Deck\AppInfo\Application;
use OCA\Deck\BadRequestException;
use OCA\Deck\NoPermissionException;
use OCP\IConfig;
use OCP\IGroup;
use OCP\IGroupManager;
use OCP\IUserSession;

class ConfigService {
	public const SETTING_BOARD_NOTIFICATION_DUE_OFF = 'off';
	public const SETTING_BOARD_NOTIFICATION_DUE_ASSIGNED = 'assigned';
	public const SETTING_BOARD_NOTIFICATION_DUE_ALL = 'all';
	public const SETTING_BOARD_NOTIFICATION_DUE_DEFAULT = self::SETTING_BOARD_NOTIFICATION_DUE_ASSIGNED;

	private $config;
	private $userId;
	private $groupManager;

	public function __construct(
		IConfig $config,
		IGroupManager $groupManager
	) {
		$this->groupManager = $groupManager;
		$this->config = $config;
	}

	public function getUserId() {
		if (!$this->userId) {
			$user = \OC::$server->get(IUserSession::class)->getUser();
			$this->userId = $user ? $user->getUID() : null;
		}
		return $this->userId;
	}

	public function getAll(): array {
		if ($this->getUserId() === null) {
			return [];
		}

		$data = [
			'calendar' => $this->isCalendarEnabled(),
			'cardDetailsInModal' => $this->isCardDetailsInModal(),
		];
		if ($this->groupManager->isAdmin($this->getUserId())) {
			$data['groupLimit'] = $this->get('groupLimit');
		}
		return $data;
	}

	public function get($key) {
		$result = null;
		[$scope] = explode(':', $key, 2);
		switch ($scope) {
			case 'groupLimit':
				if ($this->getUserId() === null || !$this->groupManager->isAdmin($this->getUserId())) {
					throw new NoPermissionException('You must be admin to get the group limit');
				}
				return $this->getGroupLimit();
			case 'calendar':
				if ($this->getUserId() === null) {
					return false;
				}
				return (bool)$this->config->getUserValue($this->getUserId(), Application::APP_ID, 'calendar', true);
			case 'cardDetailsInModal':
			  if ($this->getUserId() === null) {
			  	return false;
			  }
				return (bool)$this->config->getUserValue($this->getUserId(), Application::APP_ID, 'cardDetailsInModal', true);
		}
	}

	public function isCalendarEnabled(int $boardId = null): bool {
		if ($this->getUserId() === null) {
			return false;
		}

		$appConfigState = $this->config->getAppValue(Application::APP_ID, 'calendar', 'yes') === 'yes';
		$defaultState = (bool)$this->config->getUserValue($this->getUserId(), Application::APP_ID, 'calendar', $appConfigState);
		if ($boardId === null) {
			return $defaultState;
		}

		return (bool)$this->config->getUserValue($this->getUserId(), Application::APP_ID, 'board:' . $boardId . ':calendar', $defaultState);
	}

	public function isCardDetailsInModal(int $boardId = null): bool {
		if ($this->getUserId() === null) {
			return false;
		}

		$defaultState = (bool)$this->config->getUserValue($this->getUserId(), Application::APP_ID, 'cardDetailsInModal', true);
		if ($boardId === null) {
			return $defaultState;
		}

		return (bool)$this->config->getUserValue($this->getUserId(), Application::APP_ID, 'board:' . $boardId . ':cardDetailsInModal', $defaultState);
	}

	public function set($key, $value) {
		if ($this->getUserId() === null) {
			throw new NoPermissionException('Must be logged in to set user config');
		}

		$result = null;
		[$scope] = explode(':', $key, 2);
		switch ($scope) {
			case 'groupLimit':
				if (!$this->groupManager->isAdmin($this->getUserId())) {
					throw new NoPermissionException('You must be admin to set the group limit');
				}
				$result = $this->setGroupLimit($value);
				break;
			case 'calendar':
				$this->config->setUserValue($this->getUserId(), Application::APP_ID, 'calendar', (string)$value);
				$result = $value;
				break;
			case 'cardDetailsInModal':
				$this->config->setUserValue($this->getUserId(), Application::APP_ID, 'cardDetailsInModal', (string)$value);
				$result = $value;
				break;
			case 'board':
				[$boardId, $boardConfigKey] = explode(':', $key);
				if ($boardConfigKey === 'notify-due' && !in_array($value, [self::SETTING_BOARD_NOTIFICATION_DUE_ALL, self::SETTING_BOARD_NOTIFICATION_DUE_ASSIGNED, self::SETTING_BOARD_NOTIFICATION_DUE_OFF], true)) {
					throw new BadRequestException('Board notification option must be one of: off, assigned, all');
				}
				$this->config->setUserValue($this->getUserId(), Application::APP_ID, $key, (string)$value);
				$result = $value;
		}
		return $result;
	}

	private function setGroupLimit($value) {
		$groups = [];
		foreach ($value as $group) {
			$groups[] = $group['id'];
		}
		$data = implode(',', $groups);
		$this->config->setAppValue(Application::APP_ID, 'groupLimit', $data);
		return $groups;
	}

	private function getGroupLimitList() {
		$value = $this->config->getAppValue(Application::APP_ID, 'groupLimit', '');
		$groups = explode(',', $value);
		if ($value === '') {
			return [];
		}
		return $groups;
	}

	private function getGroupLimit() {
		$groups = $this->getGroupLimitList();
		$groups = array_map(function ($groupId) {
			/** @var IGroup $groups */
			$group = $this->groupManager->get($groupId);
			if ($group === null) {
				return null;
			}
			return [
				'id' => $group->getGID(),
				'displayname' => $group->getDisplayName(),
			];
		}, $groups);
		return array_filter($groups);
	}

	public function getAttachmentFolder(string $userId = null): string {
		if ($userId === null && $this->getUserId() === null) {
			throw new NoPermissionException('Must be logged in get the attachment folder');
		}

		return $this->config->getUserValue($userId ?? $this->getUserId(), 'deck', 'attachment_folder', '/Deck');
	}
}
