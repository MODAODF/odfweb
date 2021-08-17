<?php

declare(strict_types=1);

namespace OCA\AdminTransferownership\Migration;

use Closure;
use OCP\DB\ISchemaWrapper;
use OCP\Migration\IOutput;
use OCP\Migration\SimpleMigrationStep;

/**
 * Auto-generated migration step: Please modify to your needs!
 */
class Version1000Date20210730143700 extends SimpleMigrationStep {

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
		/** @var ISchemaWrapper $schema */
		$schema = $schemaClosure();

		$table = $schema->createTable('user_transfer_log');
		$table->addColumn('id', 'bigint', [
			'autoincrement' => true,
			'notnull' => true,
			'length' => 20,
			'unsigned' => true,
		]);

		// 避免同一個 user_transfer_owner 資料 重複記錄
		$table->addColumn('origin_id', 'bigint', [
			'notnull' => false,
			'length' => 20,
			'default' => null,
		]);

		$table->addColumn('source_user', 'string', [
			'notnull' => true,
			'length' => 64,
		]);
		$table->addColumn('target_user', 'string', [
			'notnull' => true,
			'length' => 64,
		]);
		$table->addColumn('file_id', 'bigint', [
			'notnull' => true,
			'length' => 20,
		]);
		$table->addColumn('node_name', 'string', [
			'notnull' => true,
			'length' => 255,
		]);

		// 回覆者 admin 或 target_user
		$table->addColumn('reply_type', 'string', [
			'notnull' => true,
			'length' => 64,
		]);

		// 回覆類型 如 接受、取消
		$table->addColumn('reply_user', 'string', [
			'notnull' => true,
			'length' => 64,
		]);

		$table->addColumn('reply_at', 'bigint', [
			'notnull' => true,
			'length' => 20,
		]);

		// backgroundjob 執行移交
		$table->addColumn('execute_result', 'string', [
			'notnull' => false,
			'length' => 64,
			'default' => null,
		]);

		$table->addColumn('execute_at', 'bigint', [
			'notnull' => false,
			'length' => 20,
			'default' => null,
		]);

		$table->setPrimaryKey(['id']);
		$table->addUniqueIndex(['origin_id'], 'transfer_origin_id');

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
