<?php

namespace OCA\FileSubscription\Model;

use OCP\AppFramework\Db\DoesNotExistException;
use OCP\AppFramework\Db\Entity;
use OCP\AppFramework\Db\QBMapper;
use OCP\DB\QueryBuilder\IQueryBuilder;
use OCP\IDBConnection;

class SubscriptionMapper extends QBMapper {
	public function __construct(IDBConnection $db) {
		parent::__construct($db, 'filesubscription', Subscription::class);
	}

	/**
	 * @param int $shareId
	 * @return Subscription
	 * @throws DoesNotExistException
	 */
	public function getByShareId(int $shareId): Subscription {
		$query = $this->db->getQueryBuilder();
		$query->select('*')
			->from($this->getTableName())
			->where(
				$query->expr()->eq('share_id', $query->createNamedParameter($shareId))
			);
		return $this->findEntity($query);
	}

	/**
	 * @param int $fileId
	 * @throws DoesNotExistException
	 */
	public function getByFileId(int $fileId) {
		$query = $this->db->getQueryBuilder();
		$query->select('*')
			->from($this->getTableName())
			->where(
				$query->expr()->eq('file_id', $query->createNamedParameter($fileId))
			);
		return $this->findEntities($query);
	}

	/**
	 * @param string $uid
	 * @param int $fileid
	 * @return Subscription
	 * @throws DoesNotExistException
	 */
	public function getSubscriptionsByUid(string $uid, int $fileid) {
		$query = $this->db->getQueryBuilder();
		$query->select('*')->from($this->getTableName());
		$query->where($query->expr()->eq('owner_uid', $query->createNamedParameter($uid)));
		if (!is_null($fileid)) {
			$query->andWhere($query->expr()->eq('file_id', $query->createNamedParameter($fileid)));
		}
		return $this->findEntities($query);
	}

	/**
	 * 刪除訂閱資料
	 * @param string $subscrId
	 */
	public function deleteById(string $subscrId) {
		$query = $this->db->getQueryBuilder();
		$query->delete($this->tableName)
			->where(
				$query->expr()->eq('id', $query->createNamedParameter($subscrId))
			);
		return $query->execute();
	}

}
