<?php

declare(strict_types=1);

namespace OCA\TemplateRepo\Migration;

use Closure;
use OCP\DB\ISchemaWrapper;
use OCP\Migration\SimpleMigrationStep;
use OCP\Migration\IOutput;

/**
 * Auto-generated migration step: Please modify to your needs!
 */
class Version201000Date20190212150323 extends SimpleMigrationStep {

	public function changeSchema(IOutput $output, Closure $schemaClosure, array $options) {
		/** @var ISchemaWrapper $schema */
		$schema = $schemaClosure();

		$table = $schema->getTable('template_repo');
		if (!$table->hasColumn('acl')) {
			$table->addColumn('acl', 'integer', [
				'notnull' => true,
				'length' => 4,
				'default' => 0
			]);
		}

		return $schema;
	}
}
