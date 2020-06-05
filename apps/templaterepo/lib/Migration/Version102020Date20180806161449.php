<?php
namespace OCA\TemplateRepo\Migration;

use OCP\DB\ISchemaWrapper;
use OCP\Migration\SimpleMigrationStep;
use OCP\Migration\IOutput;

class Version102020Date20180806161449 extends SimpleMigrationStep {
	/**
	 * @param IOutput $output
	 * @param \Closure $schemaClosure The `\Closure` returns a `ISchemaWrapper`
	 * @param array $options
	 * @return null|ISchemaWrapper
	 * @since 13.0.0
	 */
	public function changeSchema(IOutput $output, \Closure $schemaClosure, array $options) {
		/** @var ISchemaWrapper $schema */
		$schema = $schemaClosure();

		if (!$schema->hasTable('template_repo')) {
			$table = $schema->createTable('template_repo');
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
			$table->addIndex(['folder_id'], 'group_folder');
			$table->addIndex(['group_id'], 'group_folder_value');
			$table->addUniqueIndex(['folder_id', 'group_id'], 'templates_repo_group');
		}
		return $schema;
	}
}
