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
	const DEFAULT_DAYS_NUMBER = 10;

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
		$this->dayFirst = null;
		$this->dayLast = null;

		// 查詢結果
		$this->daysData = null;
	}

	/**
	 * 取得日期區間內的所有資料
	 * @param int $days 資料區間
	 * @throws \Exception
	 * @return array
	 */
	public function getDaysData(int $days = self::DEFAULT_DAYS_NUMBER) {
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
			"disk_space" => $this->getDiskSpace(),
			"cpu_load"   => $this->getCpuLoad(),
			"files_num"  => $this->getFileNum(),
			"users_num"  => $this->getUserNum(),
		];

		$share = $this->getShareNum();
		$chartData["share_user_num"]  = $share["user"];
		$chartData["share_group_num"] = $share["group"];
		$chartData["share_link_num"]  = $share["link"];

		$start = date("Y年m月d日", strtotime($this->dayFirst));
		$end = date("Y年m月d日", strtotime($this->dayLast));
		$chartData["days_duration"] = ($start === $end) ? $start : $start . ' - ' . $end;
		$chartData["days_number"] = (new \DateTime($this->dayFirst))->diff(new \DateTime($this->dayLast))->days + 1;
		return $chartData;
	}

	/**
	 * 取得n天的log資料
	 */
	private function readLogs() {
		$todayYmd = self::DEV_MODE ? self::DEV_TODAY : "";

		// 計算日期、建立日期標籤(daysLabels)
		$beginDT = (new \DateTime($todayYmd))->modify("-$this->days day"); // ->setTime(0,0,1);
		$endDT = new \DateTime($todayYmd); // (new \DateTime($todayYmd))->setTime(0,0,1);

		$interval = \DateInterval::createFromDateString('1 day');
		$period = new \DatePeriod($beginDT, $interval, $endDT);

		$logFileDates = [];
		$dataWithLabels = [];
		foreach ($period as $dt) {
			$yymm = $dt->format("Y-m");
			if (file_exists($this->dirname."/Server-" . $yymm . ".log") &&  !in_array($yymm, $logFileDates, true)) {
				array_push($logFileDates, $yymm);
			}

			// 建立每小時標籤
			for ($H = 0; $H < 24; $H++) {
				$key = $dt->setTime($H,0,0)->format("Y-m-d H"); // :i
				$dataWithLabels[$key] = null;
			}
		}
		if (is_null($dataWithLabels) || count($dataWithLabels) < 1) return null;

		reset($dataWithLabels);
		$this->dayFirst = key($dataWithLabels).':00';
		end($dataWithLabels);
		$this->dayLast = key($dataWithLabels).':00';

		// 取得區間內log資料
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

				$dtKeys = array_keys($dataWithLabels);
				$key = date("Y-m-d H", strtotime($timestamp));
				if ($beginDT < $rowDT && $rowDT < $endDT && in_array($key, $dtKeys, true)) {
					$dataWithLabels[$key] = $rowArr;
				}
			}
		}
		return $dataWithLabels;
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
			$data[$dt.':00']["totalSpace"] = $this->daysData[$dt]['disk_total_space'];
			$data[$dt.':00']["freeSpace"] = $this->daysData[$dt]['disk_free_space'];
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
			$dt = date("Y-m-d H", strtotime($dt.':00'));
			$data[$dt.':00'] = $hourLoadArr[0];
			$data[$dt.':15'] = $hourLoadArr[1];
			$data[$dt.':30'] = $hourLoadArr[2];
			$data[$dt.':45'] = $hourLoadArr[3];
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
			$data[$dt.':00'] = $this->daysData[$dt]['num_files'];
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
			$data[$dt.':00']["totalUser"] = $this->daysData[$dt]['num_users'];
			$data[$dt.':00']["hourActiveUser"] = $this->daysData[$dt]['hour_active_users'];
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
			$data["user"][$dt.':00'] = $this->daysData[$dt]['num_shares_user'];
			$data["group"][$dt.':00'] = $this->daysData[$dt]['num_shares_groups'];
			$data["link"][$dt.':00'] = $this->daysData[$dt]['num_shares_link'];
		}
		return $data;
	}
}
