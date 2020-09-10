<?php

namespace OCA\TemplateRepo\Migration;

use OCP\DB\ISchemaWrapper;
use OCP\IDBConnection;
use OCP\Migration\SimpleMigrationStep;
use OCP\Migration\IOutput;

class Version103000Date20180806161724 extends SimpleMigrationStep {
	/** @var IDBConnection */
	private $connection;

	private $applicableData = [];

	public function __construct(IDBConnection $connection) {
		$this->connection = $connection;
	}

	public function preSchemaChange(IOutput $output, \Closure $schemaClosure, array $options) {
		/** @var ISchemaWrapper $schema */
		$schema = $schemaClosure();

		// copy data
		if ($schema->hasTable('template_repo_applicable')) {
			$query = $this->connection->getQueryBuilder();
			$query->select(['folder_id', 'permissions', 'group_id'])
				->from('template_repo_applicable');
			$result = $query->execute();
			$this->applicableData = $result->fetchAll(\PDO::FETCH_ASSOC);
		}
	}

	public function changeSchema(IOutput $output, \Closure $schemaClosure, array $options) {
		/** @var ISchemaWrapper $schema */
		$schema = $schemaClosure();

		if (!$schema->hasTable('template_repo_groups')) {
			$table = $schema->createTable('template_repo_groups');
			$table->addColumn('applicable_id', 'bigint', [
				'autoincrement' => true,
				'notnull' => true,
				'length' => 6,
			]);
			$table->addColumn('folder_id', 'bigint', [
				'notnull' => true,
				'length' => 6,
			]);
			$table->addColumn('permissions', 'integer', [
				'notnull' => true,
				'length' => 4,
			]);
			$table->addColumn('group_id', 'string', [
				'notnull' => false,
				'length' => 64,
			]);
			$table->setPrimaryKey(['applicable_id']);
			$table->addIndex(['folder_id'], 'templates_repo');
			$table->addIndex(['group_id'], 'templates_repo_value');
			$table->addUniqueIndex(['folder_id', 'group_id'], 'templates_repo_group');
		}

		if ($schema->hasTable('template_repo_applicable')) {
			$schema->dropTable('template_repo_applicable');
		}

		return $schema;
	}

	public function postSchemaChange(IOutput $output, \Closure $schemaClosure, array $options) {
		if (count($this->applicableData)) {
			$query = $this->connection->getQueryBuilder();
			$query->insert('template_repo_groups')
				->values([
					'folder_id' => $query->createParameter('folder'),
					'group_id' => $query->createParameter('group'),
					'permissions' => $query->createParameter('permissions')
				]);

			foreach ($this->applicableData as $data) {
				$query->setParameter('folder', $data['folder_id']);
				$query->setParameter('group', $data['group_id']);
				$query->setParameter('permissions', $data['permissions']);

				$query->execute();
			}
		}
	}
}
