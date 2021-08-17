<?php
declare(strict_types=1);

namespace OCA\AdminTransferownership\Db;

use OCP\AppFramework\Db\Entity;

class UserTransferLog extends Entity {
	/** @var integer */
	protected $originId;

	/** @var string */
	protected $sourceUser;

	/** @var string */
	protected $targetUser;

	/** @var integer */
	protected $fileId;

	/** @var string */
	protected $nodeName;

	/** @var string */
	protected $replyType;

	/** @var string */
	protected $replyUser;

	/** @var integer */
	protected $replyAt;

	/** @var string */
	protected $executeResult;

	/** @var integer */
	protected $executeAt;

	public function __construct() {
		$this->addType('originId', 'integer');
		$this->addType('sourceUser', 'string');
		$this->addType('targetUser', 'string');
		$this->addType('fileId', 'integer');
		$this->addType('nodeName', 'string');
		$this->addType('replyType', 'string');
		$this->addType('replyUser', 'string');
		$this->addType('replyAt', 'integer');
		$this->addType('executeResult', 'string');
		$this->addType('executeAt', 'integer');
	}
}
