<?php

declare(strict_types=1);
/**
 * @copyright Copyright (c) 2021, Gary Kim <gary@garykim.dev>
 *
 * @author Gary Kim <gary@garykim.dev>
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

namespace OCA\Talk\Controller;

use OCA\Talk\AppInfo\Application;
use OCA\Talk\Exceptions\RoomNotFoundException;
use OCA\Talk\Exceptions\UnauthorizedException;
use OCA\Talk\Federation\FederationManager;
use OCA\Talk\Manager;
use OCA\Talk\Model\Invitation;
use OCP\AppFramework\Db\MultipleObjectsReturnedException;
use OCP\AppFramework\Http\DataResponse;
use OCP\AppFramework\OCSController;
use OCP\DB\Exception as DBException;
use OCP\IRequest;
use OCP\IUser;
use OCP\IUserSession;

class FederationController extends OCSController {
	private FederationManager $federationManager;

	private Manager $talkManager;

	private IUserSession $userSession;

	public function __construct(IRequest $request,
								FederationManager $federationManager,
								Manager $talkManager,
								IUserSession $userSession) {
		parent::__construct(Application::APP_ID, $request);
		$this->federationManager = $federationManager;
		$this->talkManager = $talkManager;
		$this->userSession = $userSession;
	}

	/**
	 * @NoAdminRequired
	 *
	 * @param int $id
	 * @return DataResponse
	 * @throws UnauthorizedException
	 * @throws DBException
	 * @throws MultipleObjectsReturnedException
	 */
	public function acceptShare(int $id): DataResponse {
		$user = $this->userSession->getUser();
		if (!$user instanceof IUser) {
			throw new UnauthorizedException();
		}
		$this->federationManager->acceptRemoteRoomShare($user, $id);
		return new DataResponse();
	}

	/**
	 * @NoAdminRequired
	 *
	 * @param int $id
	 * @return DataResponse
	 * @throws UnauthorizedException
	 * @throws DBException
	 * @throws MultipleObjectsReturnedException
	 */
	public function rejectShare(int $id): DataResponse {
		$user = $this->userSession->getUser();
		if (!$user instanceof IUser) {
			throw new UnauthorizedException();
		}
		$this->federationManager->rejectRemoteRoomShare($user, $id);
		return new DataResponse();
	}

	/**
	 * @NoAdminRequired
	 *
	 * @return DataResponse
	 */
	public function getShares(): DataResponse {
		$user = $this->userSession->getUser();
		if (!$user instanceof IUser) {
			throw new UnauthorizedException();
		}
		$invitations = $this->federationManager->getRemoteRoomShares($user);
		return new DataResponse(array_map(function (Invitation $invitation) {
			$data = $invitation->asArray();

			try {
				$room = $this->talkManager->getRoomById($invitation->getRoomId());
				$data['remote_token'] = $room->getRemoteToken();
				$data['remote_server'] = $room->getRemoteServer();
			} catch (RoomNotFoundException $exception) {
			}

			return $data;
		}, $invitations));
	}
}
