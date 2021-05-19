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
class Version201000Date20190111132839 extends SimpleMigrationStep {
	public function name(): string {
		return 'Add mergeODF_acl table';
	}

	public function description(): string {
		return 'Adds table to store ACL information for mergeodf';
	}

	public function changeSchema(IOutput $output, Closure $schemaClosure, array $options) {
		/** @var ISchemaWrapper $schema */
		$schema = $schemaClosure();

		if (!$schema->hasTable('merge_odf_acl')) {
			$table = $schema->createTable('merge_odf_acl');
			$table->addColumn('acl_id', 'bigint', [
				'autoincrement' => true,
				'notnull' => true,
				'length' => 6,
			]);
			$table->addColumn('fileid', 'bigint', [
				'notnull' => true,
			]);
			$table->addColumn('mapping_type', 'string', [
				'notnull' => true,
				'length' => 16,
			]);
			$table->addColumn('mapping_id', 'string', [
				'notnull' => true,
				'length' => 64,
			]);
			$table->addColumn('mask', 'smallint', [
				'notnull' => true,
			]);
			$table->addColumn('permissions', 'smallint', [
				'notnull' => true,
			]);
			$table->setPrimaryKey(['acl_id']);
			if (!$table->hasIndex('merge_odf_acl_file')) {
				$table->addIndex(['fileid'], 'merge_odf_acl_file');
			}
			if (!$table->hasIndex('merge_odf_acl_mapping')) {
				$table->addIndex(['mapping_type', 'mapping_id'], 'merge_odf_acl_mapping');
			}
			if (!$table->hasIndex('merge_odf_acl_unique')) {
				$table->addUniqueIndex(['fileid', 'mapping_type', 'mapping_id'], 'merge_odf_acl_unique');
			}
		}

		return $schema;
	}
}
