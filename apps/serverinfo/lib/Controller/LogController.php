<?php
namespace OCA\ServerInfo\Controller;

use OCA\ServerInfo\LogsData;
use OCP\AppFramework\Http;
use OCP\AppFramework\Http\DataResponse;
use OCP\AppFramework\Controller;
use OCP\IRequest;

class LogController extends Controller {

	/** @var LogsData */
	protected $logsData;

	/**
	 * @param string $appName
	 * @param IRequest $request
	 * @param LogsData $logsData
	 */
	public function __construct($appName, IRequest $request, LogsData $logsData) {
		parent::__construct($appName, $request);
		$this->logs = $logsData;
	}

	/**
	 * @param int $days
	 * @return DataResponse
	 */
	public function get(int $days) {
		try {
			if($days < 1 || $days > 90) {
				throw new \Exception("有效查詢天數為 1-90 天");
			}
			$data = $this->logs->getDaysData($days);
		} catch (\Exception $e) {
			return new DataResponse(['message' => $e->getMessage()], HTTP::STATUS_BAD_REQUEST);
		}
		return new DataResponse($data);
	}
}
