<?php

namespace OCA\ServerInfo\Command;

use OC\Core\Command\Base;
use OCP\AppFramework\Utility\ITimeFactory;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Output\ConsoleOutput;
use Symfony\Component\Console\Output\OutputInterface;

use OCP\IConfig;
use OCA\ServerInfo\SessionStatistics;
use OCA\ServerInfo\StorageStatistics;
use OCA\ServerInfo\ShareStatistics;

class ServerData extends Base {

	/** @var ITimeFactory */
	protected $timeFactory;

	/** @var IConfig */
	protected $config;

	/** @var StorageStatistics */
	private $storageStatistics;

	/** @var ShareStatistics */
	private $shareStatistics;

	/** @var SessionStatistics */
	private $sessionStatistics;

	/**
	 * @param ITimeFactory $timeFactory
	 * @param IConfig $config
	 * @param StorageStatistics $storageStatistics
	 * @param ShareStatistics $shareStatistics
	 * @param SessionStatistics $sessionStatistics
	 */
	public function __construct(
		ITimeFactory $timeFactory,
		IConfig $config,
		StorageStatistics $storageStatistics,
		ShareStatistics $shareStatistics,
		SessionStatistics $sessionStatistics) {
		parent::__construct();
		$this->storageStatistics  = $storageStatistics;
		$this->shareStatistics    = $shareStatistics;
		$this->sessionStatistics  = $sessionStatistics;

		$this->timeFactory  = $timeFactory;
		$this->time = date('Y-m-d H:i:s', $this->timeFactory->getTime());

		$this->dataDir = $config->getSystemValue('datadirectory', \OC::$SERVERROOT.'/data');
		$this->dirname = $this->dataDir . '/__serverinfologs';
		$this->filename = $this->dirname.'/Server-' . date('Y-m', $this->timeFactory->getTime()) . '.log';
	}

	protected function configure() {
		$this
			->setName('serverinfo:server')
			->setDescription('Record the server data.')
			// ->addOption('log', null, InputOption::VALUE_NONE, 'Display the current log without the execution.')
			// ->addOption('reset', null, InputOption::VALUE_NONE, 'The current log content will be cleared.')
			;
	}

	/**
	 * @param InputInterface $input
	 * @param OutputInterface $output
	 * @return int
	 */
	protected function execute(InputInterface $input, OutputInterface $output) {
		// if ($input->getOption('log')) {
		// 	$output->writeln($this->getLogContent('json'));
		// 	return ;
		// }
		// if ($input->getOption('reset')) {
		// 	file_put_contents($this->filename, "[]");
		// 	$output->writeln("重置紀錄");
		// 	return ;
		// }

		// 確認資料夾
		if (!is_dir($this->dirname)) {
			mkdir($this->dirname);
		}

		$newLine = $this->wirteLog();
		$output->writeln($newLine);
		return ;
	}

	// /**
	//  * 讀取紀錄
	//  */
	// private function getLogContent(String $type = 'array') {
	// 	$json = file_get_contents($this->filename);
	// 	if ($type === 'json') {
	// 		return $json;
	// 	}
	// 	return json_decode($json);
	// }

	/**
	 * 寫入資料
	 */
	private function wirteLog() {
		$storage = $this->storageStatistics->getStorageStatistics();
		$activeUsers = $this->sessionStatistics->getSessionStatistics();
		$shares = $this->shareStatistics->getShareStatistics();
		$datas = [
			'timestamp' => $this->time,
			'disk_total_space' => @disk_total_space($this->dataDir),
			'disk_free_space' => @disk_free_space($this->dataDir),
			'num_files' => $storage['num_files'],
			'num_users' => $storage['num_users'],
			'hour_active_users' => $activeUsers['last1hour'],
			'hour_load_average' => $this->getLoadAvg(),
			'num_shares_user' => $shares['num_shares_user'],
			'num_shares_groups' => $shares['num_shares_groups'],
			'num_shares_link' => $shares['num_shares_link'],
		];

		// 測試用 data
		// $datas = [
		// 	'timestamp' => $this->time,
		// 	'disk_size' => '27283947.52', // 26.02GB 單位要固定
		// 	'disk_available' => '495616', // 484.00 M
		// 	'disk_used' => '99%',
		// 	'files_num' => '88',
		// 	'users_num' => '12',
		// 	'hour_active_users' => '2',
		// 	'hour_load_average' => '[0.2,1.5,1.2,0]',
		// ];

		$json = json_encode($datas);
		file_put_contents($this->filename, $json.PHP_EOL, FILE_APPEND);
		return $json;
	}

	/**
	 * 存取負載紀錄
	 */
	private function getLoadAvg() {
		$filename = $this->dirname.'/LoadAverage.log';
		$json = file_get_contents($filename);
		$data = json_decode($json);
		if (count($data) === 4) {
			return json_encode($data);
		}
		//  else if(count($data) === 3) {
			// 資料只有三個，重新取得
			// array_push($data, $this->getCurrentLoadAvg());
			// return json_encode($data);
		// }
		return null;
	}

	/**
	 * 取得目前負載
	 */
	// private function getCurrentLoadAvg() {
	// 	$loadavg = sys_getloadavg();
	// 	if (!(is_array($loadavg) && count($loadavg) === 3)) {
	// 		return 'N/A';
	// 	}
	// 	return $loadavg[2];
	// }

}
