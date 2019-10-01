<?php
/**
 * @copyright Copyright (c) 2019 Arthur Schiwon <blizzz@arthur-schiwon.de>
 *
 * @author Arthur Schiwon <blizzz@arthur-schiwon.de>
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

namespace OCA\User_LDAP\Handler;

use OCA\Files_External\Config\IConfigHandler;
use OCA\Files_External\Config\SimpleSubstitutionTrait;
use OCA\User_LDAP\User_Proxy;
use OCP\IUserSession;

class ExtStorageConfigHandler implements IConfigHandler {
	use SimpleSubstitutionTrait;

	/** @var IUserSession */
	private $session;

	public function __construct(IUserSession $session) {
		$this->placeholder = 'home';
		$this->session = $session;
	}

	/**
	 * @param mixed $optionValue
	 * @return mixed the same type as $optionValue
	 * @since 16.0.0
	 * @throws \Exception
	 */
	public function handle($optionValue) {
		$user = $this->session->getUser();
		if($user === null) {
			return $optionValue;
		}

		$backend = $user->getBackend();
		if(!$backend instanceof User_Proxy) {
			return $optionValue;
		}

		$access = $backend->getLDAPAccess($user->getUID());
		if(!$access) {
			return $optionValue;
		}

		$attribute = $access->connection->ldapExtStorageHomeAttribute;
		if(empty($attribute)) {
			return $optionValue;
		}

		$ldapUser = $access->userManager->get($user->getUID());
		$extHome = $ldapUser->getExtStorageHome();

		return $this->processInput($optionValue, $extHome);
	}
}
