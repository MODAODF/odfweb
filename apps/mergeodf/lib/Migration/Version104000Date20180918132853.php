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
class Version104000Date20180918132853 extends SimpleMigrationStep {
	public function name(): string {
		return 'Add merge_odf_trash table';
	}

	public function description(): string {
		return 'Adds table to store trashbin information for mergeodf';
	}

	public function changeSchema(IOutput $output, Closure $schemaClosure, array $options) {
		/** @var ISchemaWrapper $schema */
		$schema = $schemaClosure();

		if (!$schema->hasTable('merge_odf_trash')) {
			$table = $schema->createTable('merge_odf_trash');
			$table->addColumn('trash_id', 'bigint', [
				'autoincrement' => true,
				'notnull' => true,
				'length' => 6,
			]);
			$table->addColumn('name', 'string', [
				'notnull' => true,
				'length' => 250,
			]);
			$table->addColumn('original_location', 'string', [
				'notnull' => true,
				'length' => 4000,
			]);
			$table->addColumn('deleted_time', 'bigint', [
				'notnull' => true,
				'length' => 6,
			]);
			$table->addColumn('folder_id', 'bigint', [
				'notnull' => true,
				'length' => 6,
			]);
			$table->setPrimaryKey(['trash_id']);
			if (!$table->hasIndex('merge_odf_trash_folder')) {
				$table->addIndex(['folder_id'], 'merge_odf_trash_folder');
			}
			if (!$table->hasIndex('merge_odf_name')) {
				$table->addIndex(['folder_id', 'name'], 'merge_odf_name');
			}
			if (!$table->hasIndex('merge_odf_trash_unique')) {
				$table->addUniqueIndex(['folder_id', 'name', 'deleted_time'], 'merge_odf_trash_unique');
			}
		}

		return $schema;
	}
}
