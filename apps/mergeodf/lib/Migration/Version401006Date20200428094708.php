<?php

declare(strict_types=1);

namespace OCA\MergeODF\Migration;

use Closure;
use OCP\DB\ISchemaWrapper;
use OCP\Migration\SimpleMigrationStep;
use OCP\Migration\IOutput;

/**
 * Auto-generated migration step: Please modify to your needs!
 */
class Version401006Date20200428094708 extends SimpleMigrationStep {

	/**
	 * @param IOutput $output
	 * @param Closure $schemaClosure The `\Closure` returns a `ISchemaWrapper`
	 * @param array $options
	 */
	public function preSchemaChange(IOutput $output, Closure $schemaClosure, array $options) {
	}

	/**
	 * @param IOutput $output
	 * @param Closure $schemaClosure The `\Closure` returns a `ISchemaWrapper`
	 * @param array $options
	 * @return null|ISchemaWrapper
	 */
	public function changeSchema(IOutput $output, Closure $schemaClosure, array $options) {
		$schema = $schemaClosure();
		
		if (!$schema->hasTable('merge_odf_users')) {
			$table = $schema->createTable('merge_odf_users');
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
			$table->addColumn('user_id', 'string', [
				'notnull' => false,
				'length' => 64,
			]);
			$table->setPrimaryKey(['applicable_id']);
			if (!$table->hasIndex('merge_odf')) {
				$table->addIndex(['folder_id'], 'merge_odf');
			}
			if (!$table->hasIndex('merge_odf_user_value')) {
				$table->addIndex(['user_id'], 'merge_odf_user_value');
			}
			if (!$table->hasIndex('merge_odf_user')) {
				$table->addUniqueIndex(['folder_id', 'user_id'], 'merge_odf_user');
			}
		}
		return $schema;
	}

	/**
	 * @param IOutput $output
	 * @param Closure $schemaClosure The `\Closure` returns a `ISchemaWrapper`
	 * @param array $options
	 */
	public function postSchemaChange(IOutput $output, Closure $schemaClosure, array $options) {
	}
}
