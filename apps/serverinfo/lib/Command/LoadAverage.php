<?php

/**
 * 紀錄一小時中 每15分鐘的平均負載
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

class LoadAverage extends Base {

	/** @var ITimeFactory */
	protected $timeFactory;

	/** @var IConfig */
	protected $config;

	/**
	 * @param ITimeFactory $timeFactory
	 * @param IGroupManager $groupManager
	 */
	public function __construct(
		ITimeFactory $timeFactory,
		IConfig $config) {
		parent::__construct();
		$this->time = $timeFactory->getDateTime();
		$dataDir = $config->getSystemValue('datadirectory', \OC::$SERVERROOT.'/data');
		$this->dirname = $dataDir . '/__serverinfologs';
		$this->filename = $this->dirname.'/LoadAverage.log';
	}

	protected function configure() {
		$this
			->setName('serverinfo:loadaverage')
			->setDescription('Record the values of 15 minute load average.')
			->addOption('log', null, InputOption::VALUE_NONE, 'Display the current log without the execution.')
			->addOption('reset', null, InputOption::VALUE_NONE, 'The current log content will be cleared.')
			;
	}

	/**
	 * @param InputInterface $input
	 * @param OutputInterface $output
	 * @return int
	 */
	protected function execute(InputInterface $input, OutputInterface $output) {

		if ($input->getOption('log')) {
			$output->writeln($this->getLogContent('json'));
			return ;
		}
		if ($input->getOption('reset')) {
			file_put_contents($this->filename, "[]");
			$output->writeln("重置紀錄");
			return ;
		}

		// 確認資料夾
		if (!is_dir($this->dirname)) {
			mkdir($this->dirname);
		}

		$this->wirteLog();
		$output->writeln($this->getLogContent('json'));
		return ;
	}

	/**
	 * 取得目前負載
	 */
	private function getLoadAvg() {
		$loadavg = sys_getloadavg();
		if (!(is_array($loadavg) && count($loadavg) === 3)) {
			return 'N/A';
		}
		return $loadavg[2];
	}

	/**
	 * 讀取紀錄
	 */
	private function getLogContent(String $type = 'array') {
		$json = file_get_contents($this->filename);
		if ($type === 'json') {
			return $json;
		}
		return json_decode($json, 1);
	}

	/**
	 * 寫入資料
	 */
	private function wirteLog() {
		$loadavg = $this->getLoadAvg();
		$data = [$loadavg];
		if (file_exists($this->filename)) {
			$logData = $this->getLogContent() ?? [];

			$minutes = $this->time->format("i");
			$minutes = (int)$minutes;

			if ($minutes >= 0  && $minutes < 15) {
				$data = array_pad($logData, 4, null);
				$data[3] = $loadavg;
			} else if($minutes >= 15 && $minutes < 30) {
				$data = [$loadavg];
			} else if($minutes >= 30 && $minutes < 45) {
				$data = array_pad($logData, 2, null);
				$data[1] = $loadavg;
			} else if($minutes >= 45) {
				$data = array_pad($logData, 3, null);
				$data[2] = $loadavg;
			}
		}
		file_put_contents($this->filename, json_encode($data,1));
	}
}
