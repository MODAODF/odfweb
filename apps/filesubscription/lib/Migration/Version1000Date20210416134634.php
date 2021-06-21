<?php

namespace OCA\FileSubscription\Migration;

use Closure;
use Doctrine\DBAL\Types\Types;
use OCP\DB\ISchemaWrapper;
use OCP\Migration\IOutput;
use OCP\Migration\SimpleMigrationStep;

/**
 * Auto-generated migration step: Please modify to your needs!
 */
class Version1000Date20210416134634 extends SimpleMigrationStep {

	// /**
	//  * @param IOutput $output
	//  * @param Closure $schemaClosure The `\Closure` returns a `ISchemaWrapper`
	//  * @param array $options
	//  */
	// public function preSchemaChange(IOutput $output, Closure $schemaClosure, array $options) {
	// }

	/**
	 * @param IOutput $output
	 * @param Closure $schemaClosure The `\Closure` returns a `ISchemaWrapper`
	 * @param array $options
	 * @return null|ISchemaWrapper
	 */
	public function changeSchema(IOutput $output, Closure $schemaClosure, array $options) {
		/** @var ISchemaWrapper $schema */
		$schema = $schemaClosure();

		if (!$schema->hasTable('filesubscription')) {
			$table = $schema->createTable('filesubscription');
			$table->addColumn('id', Types::INTEGER, [
				'autoincrement' => true,
				'notnull' => true,
				'length' => 4,
			]);
			$table->addColumn('share_id', Types::INTEGER, [
				'notnull' => true,
				'length' => 4,
			]);
			$table->addColumn('share_label', Types::TEXT, [
				'notnull' => false,
				'length' => 255,
			]);
			$table->addColumn('file_id', Types::INTEGER, [
				'notnull' => true,
				'length' => 4,
			]);
			$table->addColumn('file_name', Types::TEXT, [
				'notnull' => false,
				'length' => 512,
			]);
			$table->addColumn('owner_uid', Types::STRING, [
				'notnull' => true,
				'length' => 64,
			]);
			$table->addColumn('emails', Types::TEXT, [
				'notnull' => false,
				'default' => '',
			]);
			$table->addColumn('message', Types::TEXT, [
				'notnull' => false,
				'default' => '',
			]);
			$table->addColumn('last_message_time', Types::INTEGER, [
				'notnull' => false,
				'length' => 4,
			]);
			$table->addColumn('last_email_time', Types::INTEGER, [
				'notnull' => false,
				'length' => 4,
			]);
			$table->addColumn('last_cancel_time', Types::INTEGER, [
				'notnull' => false,
				'length' => 4,
			]);
			$table->addColumn('enabled', Types::SMALLINT, [
				'notnull' => true,
				'length' => 1,
				'default' => 1
			]);

			$table->setPrimaryKey(['id']);
			$table->addUniqueIndex(['share_id'], 'subscription_shareid_idx');

		}

		if (!$schema->hasTable('filesubscription_log')) {
			$table = $schema->createTable('filesubscription_log');
			$table->addColumn('id', Types::INTEGER, [
				'autoincrement' => true,
				'notnull' => true,
				'length' => 4,
			]);
			$table->addColumn('subscr_id', Types::INTEGER, [
				'notnull' => true,
				'length' => 4,
			]);
			$table->addColumn('subscr_msg', Types::TEXT, [
				'notnull' => false,
				'default' => '',
			]);
			$table->addColumn('subscr_time', Types::INTEGER, [
				'notnull' => true,
				'length' => 4,
			]);
			$table->setPrimaryKey(['id']);
		}
		return $schema;
	}

	// /**
	//  * @param IOutput $output
	//  * @param Closure $schemaClosure The `\Closure` returns a `ISchemaWrapper`
	//  * @param array $options
	//  */
	// public function postSchemaChange(IOutput $output, Closure $schemaClosure, array $options) {
	// }
}
