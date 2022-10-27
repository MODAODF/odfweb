<?php
/**
 * @copyright Copyright (c) 2021 Jonas Rittershofer <jotoeri@users.noreply.github.com>
 *
 * @author Jonas Rittershofer <jotoeri@users.noreply.github.com>
 *
 * @license AGPL-3.0-or-later
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
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 *
 */

namespace OCA\Forms\Activity\Settings;

use OCP\Activity\ActivitySettings;
use OCP\IL10N;

abstract class FormsActivitySettings extends ActivitySettings {
	protected $appName;

	/** @var IL10N */
	protected $l10n;

	public function __construct(string $appName,
								IL10N $l10n) {
		$this->appName = $appName;
		$this->l10n = $l10n;
	}

	/**
	 * Settings Group ID
	 * @return string
	 */
	public function getGroupIdentifier(): string {
		return $this->appName;
	}

	/**
	 * Human Readable Group Title
	 * @return string
	 */
	public function getGroupName(): string {
		return $this->l10n->t('Forms');
	}

	/**
	 * Priority of the Setting (0-100)
	 * Using this as Forms-Basepriority
	 * @return int
	 */
	public function getPriority(): int {
		return 60;
	}

	/**
	 * User can change Notification
	 * @return bool
	 */
	public function canChangeNotification(): bool {
		return true;
	}

	/**
	 * Notification enabled by default
	 */
	public function isDefaultEnabledNotification(): bool {
		return true;
	}

	/**
	 * User can change Mail
	 * @return bool
	 */
	public function canChangeMail(): bool {
		return true;
	}

	/**
	 * Mail disabled by default
	 * @return bool
	 */
	public function isDefaultEnabledMail(): bool {
		return false;
	}
}
