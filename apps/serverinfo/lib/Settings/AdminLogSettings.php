<?php
namespace OCA\ServerInfo\Settings;

use OCP\IL10N;
use OCP\Defaults;
use OCP\Settings\ISettings;
use OCP\AppFramework\Http\TemplateResponse;
use OCP\AppFramework\Http\DataResponse;

use OCA\ServerInfo\LogsData;

class AdminLogSettings implements ISettings {

	/** @var IL10N */
	private $l;

	/** @var Defaults */
	private $defaults;

	/** @var LogsData */
	private $logsData;

	/**
	 * @param IL10N $l
	 * @param LogsData $logsData
	 * @param Defaults $defaults
	 */
	public function __construct(IL10N $l, LogsData $logsData, Defaults $defaults) {
		$this->l = $l;
		$this->defaults = $defaults;
		$this->logs = $logsData;
	}

	/**
	 * 預設：載入後台時的初始資料
	 *
	 * @return TemplateResponse
	 *
	 */
	public function getForm() {
		try {
			$data = $this->logs->getDaysData();

			// server名稱與odfweb版號
			$version = file_get_contents(\OC::$SERVERROOT.'/version-odfweb.txt') ?? OC_Util::getHumanVersion();
			$data['server_overview'] = $this->defaults->getTitle() . " 版本" . trim($version);

		} catch (\Exception $e) {
			$data['error'] = $e->getMessage();
		}

		return new TemplateResponse("serverinfo", "admin-log", $data);
	}

	/**
	 * @return string the section ID, e.g. "sharing"
	 */
	public function getSection() {
		return "serverinfo";
	}

	public function getPriority() {
		return 0;
	}
}
