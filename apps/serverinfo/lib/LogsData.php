<?php
namespace OCA\ServerInfo;

use OCP\IConfig;
use OCP\AppFramework\Utility\ITimeFactory;

class LogsData {

	/** @var IConfig */
	protected $config;
	/** @var ITimeFactory */
	protected $timeFactory;

	// 測試模式
	const DEV_MODE = false;
	const DEV_TODAY = '2021-09-20';

	const SERVERLOG_DIR_NAME = "__serverinfologs";
	const DEFAULT_DAYS_INTERVAL = 10;

	/**
	 * @param IConfig $config
	 * @param ITimeFactory $timeFactory
	 */
	public function __construct(ITimeFactory $timeFactory, IConfig $config) {
		$this->timeFactory  = $timeFactory;

		// Log檔位置
		$dataDir = $config->getSystemValue('datadirectory', \OC::$SERVERROOT.'/data');
		$this->dirname = $dataDir . '/' . self::SERVERLOG_DIR_NAME;
		if (self::DEV_MODE) $this->dirname .= '.tmp';

		// 查詢區間
		$this->days = null;
		// 查詢結果
		$this->daysLabels = null;
		$this->daysData = null;
	}

	/**
	 * 取得日期區間內的所有資料
	 * @param int $days 資料區間
	 * @throws \Exception
	 * @return array
	 */
	public function getDaysData(int $days = self::DEFAULT_DAYS_INTERVAL) {
		if(!file_exists($this->dirname)) {
			throw new \Exception("目前沒有歷史記錄");
		}
		$this->days = $days;
		$this->daysData = $this->readLogs();
		if (is_null($this->daysData) || count($this->daysData) < 1) {
			throw new \Exception("查無歷史記錄");
		}

		$dtNow = $this->timeFactory->getDateTime();
		$chartData = [
			"create_at" => $dtNow->format("Y-m-d H:i") . ' ' . $dtNow->getTimeZone()->getName(),
			"days_interval" => count($this->daysLabels),
			"disk_space" => $this->getDiskSpace(),
			"cpu_load"   => $this->getCpuLoad(),
			"files_num"  => $this->getFileNum(),
			"users_num"  => $this->getUserNum(),
		];

		$share = $this->getShareNum();
		$chartData["share_user_num"]  = $share["user"];
		$chartData["share_group_num"] = $share["group"];
		$chartData["share_link_num"]  = $share["link"];
		return $chartData;
	}

	/**
	 * 取得n天的log資料
	 */
	private function readLogs() {
		$todayYmd = self::DEV_MODE ? self::DEV_TODAY : "";

		// 計算日期、建立日期標籤(daysLabels)
		$beginDT = (new \DateTime($todayYmd))->modify("-$this->days day")->setTime(0,0,1);
		$endDT = (new \DateTime($todayYmd))->setTime(0,0,1);

		$interval = \DateInterval::createFromDateString('1 day');
		$period = new \DatePeriod($beginDT, $interval, $endDT);

		$ignoreMonth = [];
		$logFileDates = [];
		foreach ($period as $dt) {
			$yymm = $dt->format("Y-m");
			if (in_array($yymm, $ignoreMonth, true)) continue;
			if (file_exists($this->dirname."/Server-" . $yymm . ".log")) {
				// 該月份的檔案存在
				$this->daysLabels[] = $dt->format("Y-m-d");
				if (!in_array($yymm, $logFileDates, true)) {
					array_push($logFileDates, $yymm);
				}
			} else {
				array_push($ignoreMonth, $yymm);
			}
		}
		if (count($logFileDates) < 1 || is_null($this->daysLabels) || count($this->daysLabels) < 1) {
			return null;
		}

		// 取得區間內log資料
		$datas = null;
		foreach ($logFileDates as $yymm) {
			$filePath = $this->dirname."/Server-" . $yymm . ".log";

			// 該月份log
			$file = new \SplFileObject($filePath);
			$file->setFlags(\SplFileObject::SKIP_EMPTY);

			// 逐行存取
			while (!$file->eof()) {
				$rowJson = $file->fgets();
				if($rowJson === "") continue;
				try {
					$rowArr = json_decode($rowJson, 1);
					if(!array_key_exists('timestamp', $rowArr)) continue;
				} catch (\Exception $e) {
					continue;
				}
				$timestamp = $rowArr['timestamp'];
				$rowDT = new \DateTime($timestamp);

				// 比較資料日期 是否在查詢區間內
				if ($rowDT > $endDT) break;
				if ($beginDT < $rowDT && $rowDT < $endDT) {
					$dt = date("Y-m-d H:i", strtotime($timestamp));
					$datas[$dt]= $rowArr;
				}
			}
		}
		return $datas;
	}

	/**
	 * 硬碟空間
	 *  "disk_total_space" => 29457682432,
	 *  "disk_free_space" => 28128787351,
	 */
	private function getDiskSpace() {
		$data = null;
		$dtLabels = array_keys($this->daysData);
		foreach($dtLabels as $dt) {
			$data[$dt]["totalSpace"] = $this->daysData[$dt]['disk_total_space'];
			$data[$dt]["freeSpace"] = $this->daysData[$dt]['disk_free_space'];
		}
		return $data;
	}

	/**
	 * 負載
	 *  "hour_load_average" => "[0.31,1.82,1.11,0.97]" // 每15分鐘
	 */
	private function getCpuLoad() {
		$data = null;
		$dtLabels = array_keys($this->daysData);
		foreach($dtLabels as $dt) {
			$str = $this->daysData[$dt]['hour_load_average'] ?? "";
			$hourLoadArr = json_decode($str, 1);
			$dt = date("Y-m-d H:", strtotime($dt));
			$data[$dt.'00'] = $hourLoadArr[0];
			$data[$dt.'15'] = $hourLoadArr[1];
			$data[$dt.'30'] = $hourLoadArr[2];
			$data[$dt.'45'] = $hourLoadArr[3];
		}
		return $data;
	}

	/**
	 * 檔案總數
	 *  "num_files" => 88, // 這1小時的檔案總數
	 */
	private function getFileNum() {
		$data = null;
		$dtLabels = array_keys($this->daysData);
		foreach($dtLabels as $dt) {
			$data[$dt] = $this->daysData[$dt]['num_files'];
		}
		return $data;
	}

	/**
	 * 總人數 與 1小時上限人數
	 *      "num_users" => 69, // 這1小時的總人數
	 *      "hour_active_users" => 40,
	 */
	private function getUserNum() {
		$data = null;
		$dtLabels = array_keys($this->daysData);
		foreach($dtLabels as $dt) {
			$data[$dt]["totalUser"] = $this->daysData[$dt]['num_users'];
			$data[$dt]["hourActiveUser"] = $this->daysData[$dt]['hour_active_users'];
		}
		return $data;
	}

	/**
	 * 各分享
	 * "num_shares_user" => 2;
	 * "num_shares_groups" => 5;
	 * "num_shares_link" => 0;
	 */
	private function getShareNum() {
		$data = null;
		$dtLabels = array_keys($this->daysData);
		foreach($dtLabels as $dt) {
			$data["user"][$dt] = $this->daysData[$dt]['num_shares_user'];
			$data["group"][$dt] = $this->daysData[$dt]['num_shares_groups'];
			$data["link"][$dt] = $this->daysData[$dt]['num_shares_link'];
		}
		return $data;
	}
}
