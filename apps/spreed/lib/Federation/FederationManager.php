<?php

declare(strict_types=1);
/**
 * @copyright Copyright (c) 2021 Gary Kim <gary@garykim.dev>
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

namespace OCA\Talk\Federation;

use OCA\Talk\AppInfo\Application;
use OCA\Talk\Exceptions\CannotReachRemoteException;
use OCA\Talk\Exceptions\RoomNotFoundException;
use OCA\Talk\Exceptions\UnauthorizedException;
use OCA\Talk\Manager;
use OCA\Talk\Model\Attendee;
use OCA\Talk\Model\Invitation;
use OCA\Talk\Model\InvitationMapper;
use OCA\Talk\Room;
use OCA\Talk\Service\ParticipantService;
use OCP\AppFramework\Db\DoesNotExistException;
use OCP\AppFramework\Db\MultipleObjectsReturnedException;
use OCP\DB\Exception as DBException;
use OCP\IConfig;
use OCP\IUser;

/**
 * Class FederationManager
 *
 * @package OCA\Talk\Federation
 *
 * FederationManager handles incoming federated rooms
 */
class FederationManager {
	public const TALK_ROOM_RESOURCE = 'talk-room';
	public const TALK_PROTOCOL_NAME = 'nctalk';
	public const TOKEN_LENGTH = 15;

	private IConfig $config;

	private Manager $manager;

	private ParticipantService $participantService;

	private InvitationMapper $invitationMapper;

	private Notifications $notifications;

	public function __construct(
		IConfig $config,
		Manager $manager,
		ParticipantService $participantService,
		InvitationMapper $invitationMapper,
		Notifications $notifications
	) {
		$this->config = $config;
		$this->manager = $manager;
		$this->participantService = $participantService;
		$this->invitationMapper = $invitationMapper;
		$this->notifications = $notifications;
	}

	/**
	 * Determine if Talk federation is enabled on this instance
	 * @return bool
	 * @deprecated use \OCA\Talk\Config::isFederationEnabled()
	 */
	public function isEnabled(): bool {
		// TODO: Set to default true once implementation is complete
		return $this->config->getAppValue(Application::APP_ID, 'federation_enabled', 'no') === 'yes';
	}

	/**
	 * @param IUser $user
	 * @param string $remoteId
	 * @param int $roomType
	 * @param string $roomName
	 * @param string $roomToken
	 * @param string $remoteUrl
	 * @param string $sharedSecret
	 * @return int share id for this specific remote room share
	 * @throws DBException
	 */
	public function addRemoteRoom(IUser $user, string $remoteId, int $roomType, string $roomName, string $roomToken, string $remoteUrl, string $sharedSecret): int {
		try {
			$room = $this->manager->getRoomByToken($roomToken, null, $remoteUrl);
		} catch (RoomNotFoundException $ex) {
			$room = $this->manager->createRemoteRoom($roomType, $roomName, $roomToken, $remoteUrl);
		}
		$invitation = new Invitation();
		$invitation->setUserId($user->getUID());
		$invitation->setRoomId($room->getId());
		$invitation->setAccessToken($sharedSecret);
		$invitation->setRemoteId($remoteId);
		$invitation = $this->invitationMapper->insert($invitation);

		return $invitation->getId();
	}

	/**
	 * @throws DBException
	 * @throws UnauthorizedException
	 * @throws MultipleObjectsReturnedException
	 * @throws DoesNotExistException
	 * @throws CannotReachRemoteException
	 */
	public function acceptRemoteRoomShare(IUser $user, int $shareId): void {
		$invitation = $this->invitationMapper->getInvitationById($shareId);
		if ($invitation->getUserId() !== $user->getUID()) {
			throw new UnauthorizedException('invitation is for a different user');
		}

		// Add user to the room
		$room = $this->manager->getRoomById($invitation->getRoomId());
		if (
			!$this->notifications->sendShareAccepted($room->getRemoteServer(), $invitation->getRemoteId(), $invitation->getAccessToken())
		) {
			throw new CannotReachRemoteException();
		}


		$participant = [
			[
				'actorType' => Attendee::ACTOR_USERS,
				'actorId' => $user->getUID(),
				'displayName' => $user->getDisplayName(),
				'accessToken' => $invitation->getAccessToken(),
				'remoteId' => $invitation->getRemoteId(), // FIXME this seems unnecessary
			]
		];
		$this->participantService->addUsers($room, $participant, $user);

		$this->invitationMapper->delete($invitation);
	}

	/**
	 * @throws DBException
	 * @throws UnauthorizedException
	 * @throws MultipleObjectsReturnedException
	 * @throws DoesNotExistException
	 */
	public function rejectRemoteRoomShare(IUser $user, int $shareId): void {
		$invitation = $this->invitationMapper->getInvitationById($shareId);
		if ($invitation->getUserId() !== $user->getUID()) {
			throw new UnauthorizedException('invitation is for a different user');
		}

		$room = $this->manager->getRoomById($invitation->getRoomId());

		$this->invitationMapper->delete($invitation);

		$this->notifications->sendShareDeclined($room->getRemoteServer(), $invitation->getRemoteId(), $invitation->getAccessToken());
	}

	/**
	 * @param IUser $user
	 * @return Invitation[]
	 * @throws DBException
	 */
	public function getRemoteRoomShares(IUser $user): array {
		return $this->invitationMapper->getInvitationsForUser($user);
	}

	/**
	 * @throws DBException
	 */
	public function getNumberOfInvitations(Room $room): int {
		return $this->invitationMapper->countInvitationsForRoom($room);
	}
}
