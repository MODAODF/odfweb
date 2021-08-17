<?php
declare(strict_types=1);

/**
 * 存取 oc_user_transfer_log 資料表
 */

namespace OCA\AdminTransferownership\Db;

use OCP\AppFramework\Db\QBMapper;
use OCP\IDBConnection;

class UserTransferLogMapper extends QBMapper {
	public function __construct(IDBConnection $db) {
		parent::__construct($db, 'user_transfer_log', UserTransferLog::class);
	}

	public function getById(int $id): UserTransferLog {
		$qb = $this->db->getQueryBuilder();
		$qb->select('*')
			->from($this->getTableName())
			->where(
				$qb->expr()->eq('id', $qb->createNamedParameter($id))
			);

		return $this->findEntity($qb);
	}

	public function getByOriginId(int $id): UserTransferLog {
		$qb = $this->db->getQueryBuilder();
		$qb->select('*')
			->from($this->getTableName())
			->where(
				$qb->expr()->eq('origin_id', $qb->createNamedParameter($id))
			);

		return $this->findEntity($qb);
	}

	public function getClosed(): array {
		$qb = $this->db->getQueryBuilder();
		$qb->select('*')
			->from($this->getTableName())
			->where($qb->expr()->isNull('origin_id'));
		return $this->findEntities($qb);
	}

	public function getNotClosed(): array {
		$qb = $this->db->getQueryBuilder();
		$qb->select('*')
			->from($this->getTableName())
			->where($qb->expr()->isNotNull('origin_id'));
		return $this->findEntities($qb);
	}

	/** background-jobs 還沒執行 */
	public function getNotNullOriginIds():array {
		$qb = $this->db->getQueryBuilder();
		$qb->select('origin_id')
			->from($this->getTableName())
			->where($qb->expr()->isNotNull('origin_id'));
		$result = $qb->execute();
		$rows = $result->fetchAll(\PDO::FETCH_COLUMN);
		$result->closeCursor();
		return $rows;
	}
}
