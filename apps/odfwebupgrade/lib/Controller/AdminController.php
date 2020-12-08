<?php
namespace OCA\OdfwebUpgrade\Controller;

use OCA\OdfwebUpgrade\ResetTokenBackgroundJob;
use OCP\AppFramework\Controller;
use OCP\AppFramework\Http\DataResponse;
use OCP\AppFramework\Utility\ITimeFactory;
use OCP\BackgroundJob\IJobList;
use OCP\IConfig;
use OCP\IL10N;
use OCP\IRequest;
use OCP\Security\ISecureRandom;
use OCP\Files\IRootFolder;

class AdminController extends Controller {
	/** @var IJobList */
	private $jobList;
	/** @var ISecureRandom */
	private $secureRandom;
	/** @var IConfig */
	private $config;
	/** @var ITimeFactory */
	private $timeFactory;
	/** @var IRootFolder */
	private $rootFolder;
	/** @var IL10N */
	private $l10n;

	/**
	 * @param string $appName
	 * @param IRequest $request
	 * @param IJobList $jobList
	 * @param ISecureRandom $secureRandom
	 * @param IConfig $config
	 * @param ITimeFactory $timeFactory
	 * @param IRootFolder $rootFolder
	 * @param IL10N $l10n
	 */
	public function __construct($appName,
								IRequest $request,
								IJobList $jobList,
								ISecureRandom $secureRandom,
								IConfig $config,
								ITimeFactory $timeFactory,
								IRootFolder $rootFolder,
								IL10N $l10n) {
		parent::__construct($appName, $request);
		$this->jobList = $jobList;
		$this->secureRandom = $secureRandom;
		$this->config = $config;
		$this->timeFactory = $timeFactory;
		$this->rootFolder = $rootFolder;
		$this->l10n = $l10n;
	}

	private function writeConfig() {
		// 把目前使用的 odfweb 版號資訊寫入 config.php
		$txtContent = file_get_contents(\OC::$SERVERROOT.'/version-odfweb.txt');
		$currentVersion_odfweb = $txtContent ? trim($txtContent) : '0.1';
		\OC::$server->getSystemConfig()->setValue('versionOdfweb', $currentVersion_odfweb);
	}

	/**
	 * @return DataResponse
	 */
	public function createCredentials(): DataResponse {
		// Create a new job and store the creation date
		$this->jobList->add(ResetTokenBackgroundJob::class);
		$this->config->setAppValue('core', 'updater.secret.created', $this->timeFactory->getTime());

		// Create a new token
		$newToken = $this->secureRandom->generate(64);
		$this->config->setSystemValue('updater.secret', password_hash($newToken, PASSWORD_DEFAULT));

		return new DataResponse($newToken);
	}

	/**
	 * @return DataResponse
	 */
	public function uploadZip(): DataResponse {
		$folderTmp = '/updaterTmp-' . $this->config->getSystemValue('instanceid');
		try {
			// Check zip
			$zipFile = $this->request->getUploadedFile('uploadZip');
			if (!$zipFile) {
				throw new \Exception('No uploaded file.');
			}

			if ($zipFile['error'] > 0) {
				$errorMsg = $this->l10n->t('Unable to upload file(%s).', [$zipFile['error']]);
				if ($zipFile['error'] === 1) {
					$stmt = 'The uploaded file exceeds the maximum upload size [%s] of your server.';
					$errorMsg .= $this->l10n->t($stmt, [ini_get('upload_max_filesize')]);
				}
				throw new \Exception($errorMsg);
			}

			if (mime_content_type($zipFile['tmp_name']) !== "application/zip") {
				throw new \Exception('Please upload a zip file.');
			}
			if ($zipFile['size'] === 0)  {
				throw new \Exception('File too small.');
			}

			// rm old tmp dir
			if ($this->rootFolder->nodeExists($folderTmp)) {
				$this->rootFolder->get($folderTmp)->delete();
			}

			// create Tmp folder
			$statNewFolder = $this->rootFolder->newFolder($folderTmp);
			if (!$statNewFolder) {
				throw new \Exception('Unable to create tmp folder.');
			}

			// Move upload file into data/updaterTmp/
			$filePath = 'data/' . $folderTmp . '/' . $zipFile['name'];
			$statMove = move_uploaded_file($zipFile['tmp_name'], $filePath);
			if(!$statMove) {
				throw new \Exception('Unable to move uploaded file into data.');
			}

			// Compare version
			$txtContent = file_get_contents(\OC::$SERVERROOT.'/version-odfweb.txt');
			$currentVersion = $txtContent ? trim($txtContent) : '0.1';

			$zipTxtContent = file_get_contents('zip://' . \OC::$SERVERROOT . '/' . $filePath .'#odfweb/version-odfweb.txt');
			$updateZipVersion = trim($zipTxtContent);
			if (!$updateZipVersion) {
				throw new \Exception('Unable to read odfweb version.');
			}
			if (version_compare($currentVersion, $updateZipVersion, '>')) {
				throw new \Exception('Downgrade is unsupported.');
			}

			// if (version_compare($currentVersion, $updateZipVersion, '=')) {
			// 	throw new \Exception('已經是最新版本'); // 版號相同
			// }

			// 檢查 config.php odfweb 版號
			$this->writeConfig();
			$version = \OC::$server->getSystemConfig()->getValue('versionOdfweb', '0.1');
			if (!$version) {
				throw new \Exception('Unable to write odfweb version into config.');
			}

		} catch (\Exception $th) {

			// delete updaterTmp/
			if ($this->rootFolder->nodeExists($folderTmp)) {
				$this->rootFolder->get($folderTmp)->delete();
			}

			return new DataResponse([
				'data' => [ 'message' => $this->l10n->t($th->getMessage())],
				'result' => false,
			]);
		}

		// 檢查需不需要刪除 step
		$stepFile = \OC::$SERVERROOT . '/data/updaterOdfweb-' . $this->config->getSystemValue('instanceid') . '/.step';
		if(file_exists($stepFile)) {

			try {
				// 如果 step 已經是 12-end -> 刪除
				$state = file_get_contents($stepFile);
				if ($state === false) throw new \Exception('Could not read from .step');

				$jsonData = json_decode($state, true);
				if (!is_array($jsonData)) throw new \Exception('Cannot decode .step JSON data.');
				$stepState = $jsonData['state'];
				$stepNumber = $jsonData['step'];

				if ($stepNumber === 12 && $stepState === "end") {
					if(unlink($stepFile) === false) {
						throw new \Exception('Could not rmdir .step');
					}
				}
			} catch (\Exception $th) {
				return new DataResponse([
					'data' => [ 'message' => $this->l10n->t($th->getMessage())],
					'result' => false,
				]);
			}
		}

		return new DataResponse([
			'data' => [
				'message' => $this->l10n->t('Zip uploaded !'),
				'zipname' => $zipFile['name']
			],
			'result' => true,
		]);
	}

}
