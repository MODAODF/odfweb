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

namespace OCA\Talk\Model;

use OCA\Talk\Room;
use OCP\AppFramework\Db\DoesNotExistException;
use OCP\AppFramework\Db\MultipleObjectsReturnedException;
use OCP\AppFramework\Db\QBMapper;
use OCP\DB\Exception as DBException;
use OCP\DB\QueryBuilder\IQueryBuilder;
use OCP\IDBConnection;
use OCP\IUser;

/**
 * Class InvitationMapper
 *
 * @package OCA\Talk\Model
 *
 * @method Invitation mapRowToEntity(array $row)
 * @method Invitation findEntity(IQueryBuilder $query)
 * @method Invitation[] findEntities(IQueryBuilder $query)
 */
class InvitationMapper extends QBMapper {
	public function __construct(IDBConnection $db) {
		parent::__construct($db, 'talk_invitations', Invitation::class);
	}

	/**
	 * @throws DBException
	 * @throws MultipleObjectsReturnedException
	 * @throws DoesNotExistException
	 */
	public function getInvitationById(int $id): Invitation {
		$qb = $this->db->getQueryBuilder();

		$qb->select('*')
			->from($this->getTableName())
			->where($qb->expr()->eq('id', $qb->createNamedParameter($id)));

		return $this->findEntity($qb);
	}

	/**
	 * @param Room $room
	 * @return Invitation[]
	 * @throws DBException
	 */
	public function getInvitationsForRoom(Room $room): array {
		$qb = $this->db->getQueryBuilder();

		$qb->select('*')
			->from($this->getTableName())
			->where($qb->expr()->eq('room_id', $qb->createNamedParameter($room->getId())));

		return $this->findEntities($qb);
	}

	/**
	 * @param IUser $user
	 * @return Invitation[]
	 * @throws DBException
	 */
	public function getInvitationsForUser(IUser $user): array {
		$qb = $this->db->getQueryBuilder();

		$qb->select('*')
			->from($this->getTableName())
			->where($qb->expr()->eq('user_id', $qb->createNamedParameter($user->getUID())));

		return $this->findEntities($qb);
	}

	/**
	 * @throws DBException
	 */
	public function countInvitationsForRoom(Room $room): int {
		$qb = $this->db->getQueryBuilder();

		$qb->select($qb->func()->count('*', 'num_invitations'))
			->from($this->getTableName())
			->where($qb->expr()->eq('room_id', $qb->createNamedParameter($room->getId())));

		$result = $qb->executeQuery();
		$row = $result->fetch();
		$result->closeCursor();

		return (int) ($row['num_invitations' ?? 0]);
	}

	public function createInvitationFromRow(array $row): Invitation {
		return $this->mapRowToEntity([
			'id' => $row['id'],
			'room_id' => (int) $row['room_id'],
			'user_id' => (string) $row['user_id'],
			'access_token' => (string) $row['access_token'],
			'remote_id' => (string) $row['remote_id'],
		]);
	}
}
