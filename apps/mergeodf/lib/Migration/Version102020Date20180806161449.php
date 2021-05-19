<?php

namespace OCA\MergeODF\Migration;

use OCP\DB\ISchemaWrapper;
use OCP\Migration\SimpleMigrationStep;
use OCP\Migration\IOutput;

class Version102020Date20180806161449 extends SimpleMigrationStep
{
	/**
	 * @param IOutput $output
	 * @param \Closure $schemaClosure The `\Closure` returns a `ISchemaWrapper`
	 * @param array $options
	 * @return null|ISchemaWrapper
	 * @since 13.0.0
	 */
	public function changeSchema(IOutput $output, \Closure $schemaClosure, array $options)
	{
		/** @var ISchemaWrapper $schema */
		$schema = $schemaClosure();

		if (!$schema->hasTable('merge_odf')) {
			$table = $schema->createTable('merge_odf');
			$table->addColumn('folder_id', 'bigint', [
				'autoincrement' => true,
				'notnull' => true,
				'length' => 6,
			]);
			$table->addColumn('mount_point', 'string', [
				'notnull' => true,
				'length' => 128,
			]);
			$table->addColumn('quota', 'bigint', [
				'notnull' => true,
				'length' => 6,
				'default' => -3,
			]);
			$table->addColumn('api_server', 'string', [
				'notnull' => false,
				'length'  => 128,
				'default' => "127.0.0.1"
			]);
			$table->setPrimaryKey(['folder_id']);
		}

		if (!$schema->hasTable('merge_odf_groups')) {
			$table = $schema->createTable('merge_odf_groups');
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
			if (!$table->hasIndex('merge_odf_group')) {
				$table->addIndex(['folder_id'], 'merge_odf_group');
			}
			if (!$table->hasIndex('merge_odf_group_value')) {
				$table->addIndex(['group_id'], 'merge_odf_group_value');
			}
			if (!$table->hasIndex('merge_odf_group')) {
				$table->addUniqueIndex(['folder_id', 'group_id'], 'merge_odf_group');
			}
		}
		return $schema;
	}
}
