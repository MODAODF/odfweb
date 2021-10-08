<?php

/**
 * 建立 測試用的歷史記錄
 *
 * 資料夾名稱： __serverinfologs.tmp/
 * 指令：php odfweb/occ serverinfo:createtmpdata 2022-07
 *
 */

namespace OCA\ServerInfo\Command;

use OC\Core\Command\Base;
use OCP\AppFramework\Utility\ITimeFactory;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Output\ConsoleOutput;
use Symfony\Component\Console\Output\OutputInterface;

use OCP\IConfig;

class CreateTmpData extends Base {

	/** @var ITimeFactory */
	protected $timeFactory;

	/** @var IConfig */
	protected $config;

	const Disk_Total_Space = 29457682432;

	// 上個月最後一筆資料
	const InitData = [
		"disk_free_space"   => 28079621266,
		"num_files"         => 88,
		"num_users"         => 69,
		"num_shares_user"   => 1,
		"num_shares_groups" => 1,
		"num_shares_link"   => 0,
	];

	/**
	 * @param ITimeFactory $timeFactory
	 * @param IGroupManager $groupManager
	 */
	public function __construct(
		ITimeFactory $timeFactory,
		IConfig $config) {
		parent::__construct();
		$this->timeFactory  = $timeFactory;
		$this->config = $config;

		$this->time = date('Y-m-d H:i:s', $this->timeFactory->getTime());

		$dataDir = $this->config->getSystemValue('datadirectory', \OC::$SERVERROOT.'/data');
		$this->dirname = $dataDir . '/__serverinfologs.tmp';
		$this->filename = null;
		$this->yymm = null;

		$this->lastRow = [
			"timestamp" => null,
			"disk_total_space" => null,
			"disk_free_space" => null,
			"num_files" => null,
			"num_users" => null,
			"hour_active_users" => null,
			"hour_load_average" => null,
			"num_shares_user" => null,
			"num_shares_groups" => null,
			"num_shares_link" => null
		];
	}

	protected function configure() {
		$this
			->setName('serverinfo:createtmpdata')
			->setDescription('建立測試用的資料')
			->addArgument('yymm', InputArgument::REQUIRED, '年份-月份');
	}

	/**
	 * @param InputInterface $input
	 * @param OutputInterface $output
	 */
	protected function execute(InputInterface $input, OutputInterface $output) {
		$this->yymm = $input->getArgument('yymm');
		$this->filename = $this->dirname."/Server-" . $this->yymm . ".log";
		if(is_null($this->yymm) || is_null($this->filename)) {
			$output->writeln('設定值不完整');
			return;
		}

		// 確認資料夾
		if (!is_dir($this->dirname)) mkdir($this->dirname);

		// 開始建立此月份資料
		$begin = new \DateTime($this->yymm.'-01');
		$end = (new \DateTime($this->yymm))->modify('last day of this month');
		$end->setTime(0,0,1); // foreach(DatePeriod) 預設會缺少最後一天
		$interval = \DateInterval::createFromDateString('1 day');
		$period = new \DatePeriod($begin, $interval, $end);
		foreach ($period as $dt) {
			// 單日日期
			$date = $dt->format("Y-m-d");
			$this->wirte24Hour($date);
		}
		$output->writeln('完成建立此月份資料');
		return;
	}

	private function wirte24Hour($date) {
		$hours = ['00','01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23'];
		foreach ($hours as $hour) {
			if ($hour=='10' || $hour=='20') {
				$a = 0;
			}
			$oneHourData = $this->createOneHour($date, $hour);
			$json = json_encode($oneHourData);
			file_put_contents($this->filename, $json.PHP_EOL, FILE_APPEND);
			$this->lastRow = $oneHourData;
		}
	}

	private function createOneHour(String $date, String $hour): Array {
		$row = [
			"timestamp" => "$date $hour:01:00",
			"disk_total_space"  => self::Disk_Total_Space,
		];
		$row["num_files"]         = $this->getNumFiles();
		$row["disk_free_space"]   = self::Disk_Total_Space - $this->getUsedByte($row["num_files"]);
		$row["num_users"]         = $this->getNumUsers();
		$row["hour_active_users"] = $this->getHourUsers($row["num_users"]);
		$row["hour_load_average"] = $this->getLoadAvg();
		$row["num_shares_user"]   = $this->getShare('num_shares_user', $row["num_files"]);
		$row["num_shares_groups"] = $this->getShare('num_shares_groups', $row["num_files"]);
		$row["num_shares_link"]   = $this->getShare('num_shares_link', $row["num_files"]);
		return $row;
	}

	private function getShare($name, $fileNum) {
		$currentNum = $this->lastRow[$name] ?? self::InitData[$name];
		do {
			$res = $this->getRandInArr([0, $currentNum, mt_rand(0, floor($fileNum/4))]);
		} while ($res > floor($fileNum/2) || $res < 0);
		return $res;
	}

	// 產生 hour_active_users
	private function getHourUsers(int $maxUser) {
		$currentNum = $this->lastRow['hour_active_users'] ?? 0;
		if ($currentNum < 10) {
			$res = $this->getRandInArr([0, mt_rand(0, $maxUser-2)]);
		} else {
			do {
				$change = $this->getRandInArr([0, mt_rand(-$currentNum, $currentNum)]);
				$res = $currentNum + $change;
			} while ($res > $maxUser-1 || $res < 0);
		}
		return abs($res);
	}

	// 產生user總數
	private function getNumUsers() {
		$initNum = self::InitData['num_users'];
		$currentNum = $this->lastRow['num_users'] ?? $initNum;
		do {
		   $base = $currentNum ?? $initNum;
		   $change = $this->getRandInArr([0, 0, 0, mt_rand(-5,5)]);
		   $res = $change + $base;
		} while ($res < 20);
		return abs($res);
	}

	// 產生files總數
	private function getNumFiles() {
		$currentNum = $this->lastRow['num_files'] ?? self::InitData['num_files'];
		do {
			if ($currentNum < 100) {
				$change = mt_rand(-5,8);
			} else if ($currentNum > 150) {
				$change = mt_rand(-10,5);
			} else {
				$change = $this->getRandInArr([0, mt_rand(-5,5)]);
			}
			$res = $currentNum + $change;
		} while ($res < 80);
		if ($res > 300) {
			$res = mt_rand(95, 200);
		}
		return abs($res);
	}

	// 隨機從陣列中選一個值
	private function getRandInArr(Array $array) {
		shuffle($array);
		return $array[0];
	}

	// 產生n個檔案總容量
	private function getUsedByte(int $fileNum) {
		$total = 0;
		for ($i=0; $i < $fileNum; $i++) {
			$byte = mt_rand(30720, 31457280); // 10KB-30MB
			$total += $byte;
		}
		return $total;
	}

	// 隨機產生 1小時的負載
	private function getLoadAvg() {
        $loadavg = [];
		for ($i=0; $i < 4; $i++) {
			$a = mt_rand(0,2);
			$b = mt_rand(0,9);
			$c = mt_rand(1,9);
			$load = $a.'.'.$b.$c;
			array_push($loadavg, (float)$load);
		}
		return json_encode($loadavg);
	}
}
