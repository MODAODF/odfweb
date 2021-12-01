<?php
/**
 * @copyright Copyright (c) 2016-2017 Lukas Reschke <lukas@statuscode.ch>
 * @copyright Copyright (c) 2016 Morris Jobke <hey@morrisjobke.de>
 * @copyright Copyright (c) 2018 Jonas Sulzer <jonas@violoncello.ch>
 *
 * @license GNU AGPL version 3 or any later version
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 */

class UpdateException extends \Exception {
	protected $data;

	public function __construct($data) {
		$this->data = $data;
	}

	public function getData() {
		return $this->data;
	}
}

class LogException extends \Exception {
}

class RecursiveDirectoryIteratorWithoutData extends \RecursiveFilterIterator {
	public function accept() {
		/** @var \DirectoryIterator $this */
		$excludes = [
			'.rnd',
			'.well-known',
			'data',
			'..',
		];
		return !(in_array($this->getFilename(), $excludes, true) || $this->isDir());
	}
}

class Auth {
	/** @var Updater */
	private $updater;
	/** @var string */
	private $password;

	/**
	 * @param Updater $updater
	 * @param string $password
	 */
	public function __construct(Updater $updater,
								$password) {
		$this->updater = $updater;
		$this->password = $password;
	}
	/**
	 * Compares two strings.
	 *
	 * This method implements a constant-time algorithm to compare strings.
	 * Regardless of the used implementation, it will leak length information.
	 *
	 * @param string $knownString The string of known length to compare against
	 * @param string $userInput   The string that the user can control
	 *
	 * @return bool true if the two strings are the same, false otherwise
	 * @license MIT
	 * @source https://github.com/symfony/security-core/blob/56721d5f5f63da7e08d05aa7668a5a9ef2367e1e/Util/StringUtils.php
	 */
	private static function equals($knownString, $userInput) {
		// Avoid making unnecessary duplications of secret data
		if (!is_string($knownString)) {
			$knownString = (string) $knownString;
		}
		if (!is_string($userInput)) {
			$userInput = (string) $userInput;
		}
		if (function_exists('hash_equals')) {
			return hash_equals($knownString, $userInput);
		}
		$knownLen = self::safeStrlen($knownString);
		$userLen = self::safeStrlen($userInput);
		if ($userLen !== $knownLen) {
			return false;
		}
		$result = 0;
		for ($i = 0; $i < $knownLen; ++$i) {
			$result |= (ord($knownString[$i]) ^ ord($userInput[$i]));
		}
		// They are only identical strings if $result is exactly 0...
		return 0 === $result;
	}
	/**
	 * Returns the number of bytes in a string.
	 *
	 * @param string $string The string whose length we wish to obtain
	 *
	 * @return int
	 * @license MIT
	 * @source https://github.com/symfony/security-core/blob/56721d5f5f63da7e08d05aa7668a5a9ef2367e1e/Util/StringUtils.php
	 */
	private static function safeStrlen($string) {
		// Premature optimization
		// Since this cannot be changed at runtime, we can cache it
		static $funcExists = null;
		if (null === $funcExists) {
			$funcExists = function_exists('mb_strlen');
		}
		if ($funcExists) {
			return mb_strlen($string, '8bit');
		}
		return strlen($string);
	}

	/**
	 * Whether the current user is authenticated
	 *
	 * @return bool
	 */
	public function isAuthenticated() {
		$storedHash = $this->updater->getConfigOption('updater.secret');

		// As a sanity check the stored hash or the sent password can never be empty
		if($storedHash === '' || $storedHash === null || $this->password === null) {
			return false;
		}

		// As we still support PHP 5.4 we have to use some magic involving "crypt"
		return $this->equals($storedHash, crypt($this->password, $storedHash));
	}
}

class Updater {
	/** @var string */
	private $baseDir;
	/** @var array */
	private $configValues = [];
	/** @var string */
	private $currentVersion = 'unknown';
	/** @var string */
	private $buildTime;
	/** @var bool */
	private $updateAvailable = false;
	/** @var string */
	private $requestID = null;

	/**
	 * Updater constructor
	 * @param $baseDir string the absolute path to the /updater/ directory in the Nextcloud root
	 * @throws \Exception
	 */
	public function __construct($baseDir) {
		$this->baseDir = $baseDir;

		if($dir = getenv('NEXTCLOUD_CONFIG_DIR')) {
			$configFileName = rtrim($dir, '/') . '/config.php';
		} else {
			$configFileName = $this->baseDir . '/../config/config.php';
		}
		if (!file_exists($configFileName)) {
			throw new \Exception('找不到 config.php，該文件是否位於 odfweb 的 config 子資料夾中？');
		}

		/** @var array $CONFIG */
		require_once $configFileName;
		$this->configValues = $CONFIG;

		$dataDir = $this->getDataDirectoryLocation();
		if(empty($dataDir) || !is_string($dataDir)) {
			throw new \Exception('無法讀取 config.php 中所設定的 data 目錄。');
		}

		$versionFileName = $this->baseDir . '/../version.php';
		if (!file_exists($versionFileName)) {
			// fallback to version in config.php
			$version = $this->getConfigOption('version');
			$buildTime = '';
		} else {
			/** @var string $OC_VersionString */
			/** @var string $OC_Build */
			require_once $versionFileName;
			$version = $OC_VersionString;
			$buildTime = $OC_Build;
		}

		if($version === null) {
			return;
		}
		if($buildTime === null) {
			return;
		}

		// normalize version to 3 digits
		$splittedVersion = explode('.', $version);
		if(sizeof($splittedVersion) >= 3) {
			$splittedVersion = array_slice($splittedVersion, 0, 3);
		}

		$this->currentVersion = implode('.', $splittedVersion);
		$this->buildTime = $buildTime;

		// Get current odfweb version
		$this->currentVersionOdfweb = $this->getConfigOption('versionOdfweb');
	}

	/**
	 * Returns current Nextcloud version or "unknown" if this could not be determined.
	 *
	 * @return string
	 */
	public function getCurrentVersion() {
		return $this->currentVersion;
	}

	/**
	 * Returns current version or "0.1" if this could not be determined.
	 *
	 * @return string
	 */
	public function getCurrentVersion_odfweb() {
		return $this->currentVersionOdfweb;
	}

	/**
	 * check update file(zip) exist
	 * @return string
	 * @throws \Exception
	 */
	public function checkForUpdate() {
		$this->silentLog('[info] checkForUpdate()');
		$this->updateAvailable = false;

		$tmpFolderLocation = $this->getDataDirectoryLocation() . '/updaterTmp-'.$this->getConfigOption('instanceid') .'/';
		$tmpZipLocation = $tmpFolderLocation . $_POST['zipname'];
		if(file_exists($tmpZipLocation)) {
			$this->silentLog('[info] tmp zip exists');
			$checkReslt = '將以 ' . $_POST['zipname'] . ' 更新';
			$this->updateAvailable = true;
		} else {
			$this->silentLog('[info] tmp zip not exists');
			$checkReslt = '找不到暫存的 Zip 更新檔，請返回並重新上傳。';
			throw new \Exception('找不到暫存的 Zip 更新檔，請返回並重新上傳。');
		}

		$this->silentLog('[info] end of checkForUpdate() ' . $checkReslt);
		return $checkReslt;
	}

	/**
	 * Returns bool whether update is available or not
	 *
	 * @return bool
	 */
	public function updateAvailable() {
		return $this->updateAvailable;
	}

	/**
	 * Returns the specified config options
	 *
	 * @param string $key
	 * @return mixed|null Null if the entry is not found
	 */
	public function getConfigOption($key) {
		return isset($this->configValues[$key]) ? $this->configValues[$key] : null;
	}

	/**
	 * Gets the data directory location on the local filesystem
	 *
	 * @return string
	 */
	private function getDataDirectoryLocation() {
		return $this->configValues['datadirectory'];
	}

	/**
	 * Returns the expected files and folders as array
	 *
	 * @return array
	 */
	private function getExpectedElementsList() {
		$expected = [
			// odfweb extra files and folders
			'國發會ODF文件Web應用元件伺服器佈署說明書.pdf',
			'TSCSSO.php',
			'asetup.sh',
			'ssotest.php',
			'inital.sh',
			'.gitignore',
			'version-odfweb.txt',
			'updaterOdfweb',
			// Generic
			'.',
			'..',
			// Folders
			'.well-known',
			'3rdparty',
			'apps',
			'config',
			'core',
			'data',
			'l10n',
			'lib',
			'ocs',
			'ocs-provider',
			'ocm-provider',
			'resources',
			'settings',
			'themes',
			'updater',
			// Files
			'.rnd',
			'index.html',
			'indie.json',
			'.user.ini',
			'console.php',
			'cron.php',
			'index.php',
			'public.php',
			'remote.php',
			'status.php',
			'version.php',
			'robots.txt',
			'.htaccess',
			'AUTHORS',
			'CHANGELOG.md',
			'COPYING',
			'COPYING-AGPL',
			'occ',
			'db_structure.xml',
		];
		return array_merge($expected, $this->getAppDirectories());
	}

	/**
	 * Returns app directories specified in config.php
	 *
	 * @return array
	 */
	private function getAppDirectories() {
		$expected = [];
		if($appsPaths = $this->getConfigOption('apps_paths')) {
			foreach ($appsPaths as $appsPath) {
				$parentDir = realpath($this->baseDir . '/../');
				$appDir = basename($appsPath['path']);
				if(strpos($appsPath['path'], $parentDir) === 0 && $appDir !== 'apps') {
					$expected[] = $appDir;
				}
			}
		}
		return $expected;
	}

	/**
	 * Gets the recursive directory iterator over the Nextcloud folder
	 *
	 * @param string $folder
	 * @return \RecursiveIteratorIterator
	 */
	private function getRecursiveDirectoryIterator($folder = null) {
		if ($folder === null) {
			$folder = $this->baseDir . '/../';
		}
		return new \RecursiveIteratorIterator(
			new \RecursiveDirectoryIterator($folder, \RecursiveDirectoryIterator::SKIP_DOTS),
			\RecursiveIteratorIterator::CHILD_FIRST
		);
	}

	/**
	 * Checks for files that are unexpected.
	 */
	public function checkForExpectedFilesAndFolders() {
		$this->silentLog('[info] checkForExpectedFilesAndFolders()');

		$expectedElements = $this->getExpectedElementsList();
		$unexpectedElements = [];
		foreach (new \DirectoryIterator($this->baseDir . '/../') as $fileInfo) {
			if(array_search($fileInfo->getFilename(), $expectedElements) === false) {
				$unexpectedElements[] = $fileInfo->getFilename();
			}
		}

		if (count($unexpectedElements) !== 0) {
			throw new UpdateException($unexpectedElements);
		}
		$this->silentLog('[info] end of checkForExpectedFilesAndFolders()');
	}

	/**
	 * Checks for files that are not writable
	 */
	public function checkWritePermissions() {
		$this->silentLog('[info] checkWritePermissions()');

		$notWritablePaths = array();
		$dir = new \RecursiveDirectoryIterator($this->baseDir . '/../');
		$filter = new RecursiveDirectoryIteratorWithoutData($dir);
		$it = new \RecursiveIteratorIterator($filter);

		foreach ($it as $path => $dir) {
			if(!is_writable($path)) {
				$notWritablePaths[] = $path;
			}
		}
		if(count($notWritablePaths) > 0) {
			throw new UpdateException($notWritablePaths);
		}

		$this->silentLog('[info] end of checkWritePermissions()');
	}

	/**
	 * Sets the maintenance mode to the defined value
	 *
	 * @param bool $state
	 * @throws \Exception when config.php can't be written
	 */
	public function setMaintenanceMode($state) {
		$this->silentLog('[info] setMaintenanceMode("' . ($state ? 'true' : 'false') .  '")');

		if($dir = getenv('NEXTCLOUD_CONFIG_DIR')) {
			$configFileName = rtrim($dir, '/') . '/config.php';
		} else {
			$configFileName = $this->baseDir . '/../config/config.php';
		}
		$this->silentLog('[info] configFileName ' . $configFileName);

		// usually is already tested in the constructor but just to be on the safe side
		if (!file_exists($configFileName)) {
			throw new \Exception('找不到config.php檔。');
		}
		/** @var array $CONFIG */
		require $configFileName;
		$CONFIG['maintenance'] = $state;
		$content = "<?php\n";
		$content .= '$CONFIG = ';
		$content .= var_export($CONFIG, true);
		$content .= ";\n";
		$state = file_put_contents($configFileName, $content);
		if ($state === false) {
			throw new \Exception('無法寫入 config.php');
		}
		$this->silentLog('[info] end of setMaintenanceMode()');
	}

	/**
	 * Creates a backup of all files and moves it into data/updaterOdfweb-$instanceid/backups/odfweb-X-Y-Z/
	 *
	 * @throws \Exception
	 */
	public function createBackup() {
		$this->silentLog('[info] createBackup()');

		$excludedElements = [
			'.rnd',
			'.well-known',
			'data',
		];

		// Create new folder for the backup
		$backupFolderLocation = $this->getDataDirectoryLocation() . '/updaterOdfweb-'.$this->getConfigOption('instanceid').'/backups/odfweb-'.$this->currentVersionOdfweb . '/';
		if(file_exists($backupFolderLocation)) {
			$this->silentLog('[info] backup folder location exists');

			$this->recursiveDelete($backupFolderLocation);
		}
		$state = mkdir($backupFolderLocation, 0750, true);
		if($state === false) {
			throw new \Exception('無法建立備份資料夾');
		}

		// Copy the backup files
		$currentDir = $this->baseDir . '/../';

		/**
		 * @var string $path
		 * @var \SplFileInfo $fileInfo
		 */
		foreach ($this->getRecursiveDirectoryIterator($currentDir) as $path => $fileInfo) {
			$fileName = explode($currentDir, $path)[1];
			$folderStructure = explode('/', $fileName, -1);

			// Exclude the exclusions
			if(isset($folderStructure[0])) {
				if(array_search($folderStructure[0], $excludedElements) !== false) {
					continue;
				}
			} else {
				if(array_search($fileName, $excludedElements) !== false) {
					continue;
				}
			}

			// Create folder if it doesn't exist
			if(!file_exists($backupFolderLocation . '/' . dirname($fileName))) {
				$state = mkdir($backupFolderLocation . '/' . dirname($fileName), 0750, true);
				if($state === false) {
					throw new \Exception('無法建立資料夾: '.$backupFolderLocation.'/'.dirname($fileName));
				}
			}

			// If it is a file copy it
			if($fileInfo->isFile()) {
				$state = copy($fileInfo->getRealPath(), $backupFolderLocation . $fileName);
				if($state === false) {
					$message = sprintf(
						'Could not copy "%s" to "%s"',
						$fileInfo->getRealPath(),
						$backupFolderLocation . $fileName
					);

					if(is_readable($fileInfo->getRealPath()) === false) {
						$message = sprintf(
							'%s. Source %s is not readable',
							$message,
							$fileInfo->getRealPath()
						);
					}

					if(is_writable($backupFolderLocation . $fileName) === false) {
						$message = sprintf(
							'%s. Destination %s is not writable',
							$message,
							$backupFolderLocation . $fileName
						);
					}

					throw new \Exception($message);
				}
			}
		}
		$this->silentLog('[info] end of createBackup()');
	}

	/**
	 * move data/updaterTmp-$instanceid/.zip to data/updaterOdfweb-$instanceid/downloads/
	 *
	 * @throws \Exception
	 */
	public function moveTmpFile() {
		$this->silentLog('[info] moveTmpFile()');

		// Create updaterOdfweb-$instanceid/downloads/ Folder
		$storageLocation = $this->getDataDirectoryLocation() . '/updaterOdfweb-'.$this->getConfigOption('instanceid') . '/downloads/';
		if(file_exists($storageLocation)) {
			$this->silentLog('[info] storage location exists');
			$this->recursiveDelete($storageLocation);
		}
		$state = mkdir($storageLocation, 0750, true);
		if($state === false) {
			// throw new \Exception('Could not mkdir storage location');
			throw new \Exception('無法建立更新資料夾');
		}

		$tmpZip = $this->getTmpFilePathAndName();
		$zipOldPath = $tmpZip['path'];
		$zipNewPath = $storageLocation . $tmpZip['name'];

		// Move file
		if(rename($zipOldPath, $zipNewPath)) {
			$this->removeTmpFile();
		} else {
			// throw new \Exception('Could not move zip from updateTmp- to updaterOdfweb-');
			throw new \Exception('無法將 zip 從 updateTmp- 移至 updaterOdfweb-');
		}

		$this->silentLog('[info] end of moveTmpFile()');
	}

	/**
	 * @return string
	 * @throws \Exception
	 */
	private function getTmpFilePathAndName() {
		$storageLocation = $this->getDataDirectoryLocation() . '/updaterTmp-'.$this->getConfigOption('instanceid');
		$this->silentLog('[info] Tmp folder location: ' . $storageLocation);

		$files = scandir($storageLocation);
		// ., .. and zip archive
		if(count($files) !== 3) {
			// throw new \Exception('Not exact 3 files existent in folder');
			throw new \Exception('資料夾中不存在明確的三個檔案');
		}

		$data['name'] = $files[2];
		$data['path'] = $storageLocation . '/' . $files[2];
		return $data;
	}

	/**
	 * @return string
	 * @throws \Exception
	 */
	private function removeTmpFile() {
		$storageLocation = $this->getDataDirectoryLocation() . '/updaterTmp-'.$this->getConfigOption('instanceid');
		$stat = $this->recursiveDelete($storageLocation);
		$this->silentLog('[info] remove Tmp folder : ' . $stat);
	}


	/**
	 * @return string
	 * @throws \Exception
	 */
	private function getDownloadedFilePath() {
		$storageLocation = $this->getDataDirectoryLocation() . '/updaterOdfweb-'.$this->getConfigOption('instanceid') . '/downloads/';
		$this->silentLog('[info] storage location: ' . $storageLocation);

		$files = scandir($storageLocation);
		// ., .. and downloaded zip archive
		if(count($files) !== 3) {
			// throw new \Exception('Not exact 3 files existent in folder');
			throw new \Exception('資料夾中不存在明確的三個檔案');
		}
		return $storageLocation . '/' . $files[2];
	}

	/**
	 * Verifies the integrity of the downloaded file
	 *
	 * @throws \Exception
	 */
	public function verifyIntegrity() {
		$this->silentLog('[info] skip verifyIntegrity()');
	}

	/**
	 * Gets the version as declared in $versionFile
	 *
	 * @param string $versionFile
	 * @return string
	 * @throws \Exception If $OC_Version is not defined in $versionFile
	 */
	private function getVersionByVersionFile($versionFile) {
		require $versionFile;

		if(isset($OC_Version)) {
			/** @var array $OC_Version */
			return implode('.', $OC_Version);
		}

		throw new \Exception(" $versionFile 中找不到 OC_Version");
	}

	/**
	 * Extracts the download
	 *
	 * @throws \Exception
	 */
	public function extractDownload() {
		$this->silentLog('[info] extractDownload()');
		$downloadedFilePath = $this->getDownloadedFilePath();

		$zip = new \ZipArchive;
		$zipState = $zip->open($downloadedFilePath);
		if ($zipState === true) {
			$extraction = $zip->extractTo(dirname($downloadedFilePath));
			if($extraction === false) {
				throw new \Exception('解壓縮 zip 時出錯: '.($zip->getStatusString()));
			}
			$zip->close();
			$state = unlink($downloadedFilePath);
			if($state === false) {
				throw new \Exception("無法刪除檔案: ". $downloadedFilePath);
			}
		} else {
			throw new \Exception("無法處理 zip 檔，錯誤代碼為：".$zipState);
		}

		// Ensure that the downloaded version is not lower
		$downloadedVersion = $this->getVersionByVersionFile(dirname($downloadedFilePath) . '/odfweb/version.php');
		$currentVersion = $this->getVersionByVersionFile($this->baseDir . '/../version.php');

		$txtInDownload = file_get_contents(dirname($downloadedFilePath) . '/odfweb/version-odfweb.txt');
		$downloadedVersion_odfweb = $txtInDownload ? trim($txtInDownload) : '0.1';
		$txtInRootDir = file_get_contents('../version-odfweb.txt');
		$currentVersion_odfweb = $txtInRootDir ? trim($txtInRootDir) : '0.1';
		$isLowerOdfweb = $downloadedVersion_odfweb < $currentVersion_odfweb;

		if(version_compare($downloadedVersion, $currentVersion, '<') || $isLowerOdfweb) {
			throw new \Exception('更新版本低於安裝版本');
		}

		$this->silentLog('[info] end of extractDownload()');
	}

	/**
	 * Replaces the entry point files with files that only return a 503
	 *
	 * @throws \Exception
	 */
	public function replaceEntryPoints() {
		$this->silentLog('[info] replaceEntryPoints()');

		$filesToReplace = [
			'index.php',
			'status.php',
			'remote.php',
			'public.php',
			'ocs/v1.php',
			'ocs/v2.php',
		];

		$content = "<?php\nhttp_response_code(503);\ndie('Update in process.');";
		foreach($filesToReplace as $file) {
			$this->silentLog('[info] replace ' . $file);
			$parentDir = dirname($this->baseDir . '/../' . $file);
			if(!file_exists($parentDir)) {
				$r = mkdir($parentDir);
				if($r !== true) {
					throw new \Exception('無法為 entry point 建立父目錄 ' . $file);
				}
			}
			$state = file_put_contents($this->baseDir  . '/../' . $file, $content);
			if($state === false) {
				throw new \Exception('無法更換 entry point: '.$file);
			}
		}

		$this->silentLog('[info] end of replaceEntryPoints()');
	}

	/**
	 * Recursively deletes the specified folder from the system
	 *
	 * @param string $folder
	 * @throws \Exception
	 */
	private function recursiveDelete($folder) {
		if(!file_exists($folder)) {
			return;
		}
		$iterator = new \RecursiveIteratorIterator(
			new \RecursiveDirectoryIterator($folder, \RecursiveDirectoryIterator::SKIP_DOTS),
			\RecursiveIteratorIterator::CHILD_FIRST
		);

		$directories = array();
		$files = array();
		foreach ($iterator as $fileInfo) {
			if ($fileInfo->isDir()) {
				$directories[] = $fileInfo->getRealPath();
			} else {
				if ($fileInfo->isLink()) {
					$files[] = $fileInfo->getPathName();
				} else {
					$files[] = $fileInfo->getRealPath();
				}
			}
		}

		foreach ($files as $file) {
			unlink($file);
		}
		foreach ($directories as $dir) {
			rmdir($dir);
		}

		$state = rmdir($folder);
		if($state === false) {
			throw new \Exception('無法移除資料夾 ' . $folder);
		}
	}

	/**
	 * Delete old files from the system as much as possible
	 *
	 * @throws \Exception
	 */
	public function deleteOldFiles() {
		$this->silentLog('[info] deleteOldFiles()');

		$shippedAppsFile = $this->baseDir . '/../core/shipped.json';
		if(!file_exists($shippedAppsFile)) {
			throw new \Exception('core/shipped.json 無法使用');
		}
		// Delete shipped apps
		$shippedApps = json_decode(file_get_contents($shippedAppsFile), true);
		foreach($shippedApps['shippedApps'] as $app) {
			$this->recursiveDelete($this->baseDir . '/../apps/' . $app);
		}

		$configSampleFile = $this->baseDir . '/../config/config.sample.php';
		if(file_exists($configSampleFile)) {
			$this->silentLog('[info] config sample exists');

			// Delete example config
			$state = unlink($configSampleFile);
			if ($state === false) {
				throw new \Exception('無法刪除 config.sample.php');
			}
		}

		$themesReadme = $this->baseDir . '/../themes/README';
		if(file_exists($themesReadme)) {
			$this->silentLog('[info] themes README exists');

			// Delete themes
			$state = unlink($themesReadme);
			if ($state === false) {
				throw new \Exception('無法刪除 themes README');
			}
		}
		$this->recursiveDelete($this->baseDir . '/../themes/example/');

		// Delete the rest
		$excludedElements = [
			'.well-known',
			'data',
			'index.php',
			'status.php',
			'remote.php',
			'public.php',
			'ocs/v1.php',
			'ocs/v2.php',
			'config',
			'themes',
			'apps',
			'updater',
			'updaterOdfweb',
		];
		$excludedElements = array_merge($excludedElements, $this->getAppDirectories());
		/**
		 * @var string $path
		 * @var \SplFileInfo $fileInfo
		 */
		foreach ($this->getRecursiveDirectoryIterator() as $path => $fileInfo) {
			$currentDir = $this->baseDir . '/../';
			$fileName = explode($currentDir, $path)[1];
			$folderStructure = explode('/', $fileName, -1);
			// Exclude the exclusions
			if(isset($folderStructure[0])) {
				if(array_search($folderStructure[0], $excludedElements) !== false) {
					continue;
				}
			} else {
				if(array_search($fileName, $excludedElements) !== false) {
					continue;
				}
			}
			if($fileInfo->isFile() || $fileInfo->isLink()) {
				$state = unlink($path);
				if($state === false) {
					throw new \Exception('無法刪除: '.$path);
				}
			} elseif($fileInfo->isDir()) {
				$state = rmdir($path);
				if($state === false) {
					throw new \Exception('無法移除資料夾: '.$path);
				}
			}
		}

		$this->silentLog('[info] end of deleteOldFiles()');
	}

	/**
	 * Moves the specified filed except the excluded elements to the correct position
	 *
	 * @param string $dataLocation
	 * @param array $excludedElements
	 * @throws \Exception
	 */
	private function moveWithExclusions($dataLocation, array $excludedElements) {
		/**
		 * @var \SplFileInfo $fileInfo
		 */
		foreach ($this->getRecursiveDirectoryIterator($dataLocation) as $path => $fileInfo) {
			$fileName = explode($dataLocation, $path)[1];
			$folderStructure = explode('/', $fileName, -1);

			// Exclude the exclusions
			if (isset($folderStructure[0])) {
				if (array_search($folderStructure[0], $excludedElements) !== false) {
					continue;
				}
			} else {
				if (array_search($fileName, $excludedElements) !== false) {
					continue;
				}
			}

			if($fileInfo->isFile()) {
				if(!file_exists($this->baseDir . '/../' . dirname($fileName))) {
					$state = mkdir($this->baseDir . '/../' . dirname($fileName), 0755, true);
					if($state === false) {
						throw new \Exception('Could not mkdir ' . $this->baseDir  . '/../' . dirname($fileName));
					}
				}
				$state = rename($path, $this->baseDir  . '/../' . $fileName);
				if($state === false) {
					throw new \Exception(
						sprintf(
							'Could not rename %s to %s',
							$path,
							$this->baseDir . '/../' . $fileName
						)
					);
				}
			}
			if($fileInfo->isDir()) {
				$state = rmdir($path);
				if($state === false) {
					throw new \Exception('無法移除資料夾 ' . $path);
				}
			}
		}
	}

	/**
	 * Moves the newly downloaded files into place
	 *
	 * @throws \Exception
	 */
	public function moveNewVersionInPlace() {
		$this->silentLog('[info] moveNewVersionInPlace()');

		// Rename everything else except the entry and updater files
		$excludedElements = [
			'updater',
			'updaterOdfweb',
			'index.php',
			'status.php',
			'remote.php',
			'public.php',
			'ocs/v1.php',
			'ocs/v2.php',
		];
		$storageLocation = $this->getDataDirectoryLocation() . '/updaterOdfweb-'.$this->getConfigOption('instanceid') . '/downloads/odfweb/';
		$this->silentLog('[info] storage location: ' . $storageLocation);
		$this->moveWithExclusions($storageLocation, $excludedElements);

		// Rename everything except the updater files
		$this->moveWithExclusions($storageLocation, ['updater']);

		$this->silentLog('[info] end of moveNewVersionInPlace()');
	}

	/**
	 * Finalize and cleanup the updater by finally replacing the updater script
	 */
	public function finalize() {
		$this->silentLog('[info] finalize()');

		$storageLocation = $this->getDataDirectoryLocation() . '/updaterOdfweb-'.$this->getConfigOption('instanceid') . '/downloads/odfweb/';
		$this->silentLog('[info] storage location: ' . $storageLocation);
		$this->moveWithExclusions($storageLocation, []);
		$state = rmdir($storageLocation);
		if($state === false) {
			throw new \Exception('無法移除資料夾' . $storageLocation);
		}
		$state = unlink($this->getDataDirectoryLocation() . '/updaterOdfweb-'.$this->getConfigOption('instanceid') . '/.step');
		if($state === false) {
			throw new \Exception('無法刪除 .step');
		}

		if (function_exists('opcache_reset')) {
			$this->silentLog('[info] call opcache_reset()');
			opcache_reset();
		}

		$this->silentLog('[info] end of finalize()');
	}

	/**
	 * @param string $state
	 * @param int $step
	 * @throws \Exception
	 */
	private function writeStep($state, $step) {
		$updaterDir = $this->getDataDirectoryLocation() . '/updaterOdfweb-'.$this->getConfigOption('instanceid');
		if(!file_exists($updaterDir . '/.step')) {
			if(!file_exists($updaterDir)) {
				$result = mkdir($updaterDir);
				if ($result === false) {
					throw new \Exception('無法建立 ' . $updaterDir);
				}
			}
			$result = touch($updaterDir . '/.step');
			if($result === false) {
				throw new \Exception('無法建立 .step');
			}
		}

		$result = file_put_contents($updaterDir . '/.step', json_encode(['state' => $state, 'step' => $step]));
		if($result === false) {
			throw new \Exception('無法寫入 .step');
		}
	}

	/**
	 * @param int $step
	 * @throws \Exception
	 */
	public function startStep($step) {
		$this->silentLog('[info] startStep("' . $step . '")');
		$this->writeStep('start', $step);
	}

	/**
	 * @param int $step
	 * @throws \Exception
	 */
	public function endStep($step) {
		$this->silentLog('[info] endStep("' . $step . '")');
		$this->writeStep('end', $step);
	}

	/**
	 * @return string
	 * @throws \Exception
	 */
	public function currentStep() {
		$this->silentLog('[info] currentStep()');

		$updaterDir = $this->getDataDirectoryLocation() . '/updaterOdfweb-'.$this->getConfigOption('instanceid');
		$jsonData = [];
		if(file_exists($updaterDir. '/.step')) {
			$state = file_get_contents($updaterDir . '/.step');
			if ($state === false) {
				throw new \Exception('無法讀取 .step');
			}

			$jsonData = json_decode($state, true);
			if (!is_array($jsonData)) {
				throw new \Exception('無法解碼 .step 中的 JSON 資料');
			}
		}
		return $jsonData;
	}

	/**
	 * Rollback the changes if $step has failed
	 *
	 * @param int $step
	 * @throws \Exception
	 */
	public function rollbackChanges($step) {
		$this->silentLog('[info] rollbackChanges("' . $step . '")');

		$updaterDir = $this->getDataDirectoryLocation() . '/updaterOdfweb-'.$this->getConfigOption('instanceid');
		if(file_exists($updaterDir . '/.step')) {
			$this->silentLog('[info] unlink .step');
			$state = unlink($updaterDir . '/.step');
			if ($state === false) {
				throw new \Exception('無法刪除 .step');
			}
		}

		if($step >= 7) {
			$this->silentLog('[info] rollbackChanges - step >= 7');
			// TODO: If it fails after step 7: Rollback
		}
		$this->silentLog('[info] end of  rollbackChanges()');
	}

	/**
	 * Logs an exception with current datetime prepended to updaterOdfweb.log
	 *
	 * @param \Exception $e
	 * @throws LogException
	 */
	public function logException(\Exception $e) {
		$message = '[error] ';

		$message .= 'Exception: ' . get_class($e) . PHP_EOL;
		$message .= 'Message: ' . $e->getMessage() . PHP_EOL;
		$message .= 'Code:' . $e->getCode() . PHP_EOL;
		$message .= 'Trace:' . PHP_EOL . $e->getTraceAsString() . PHP_EOL;
		$message .= 'File:' . $e->getFile() . PHP_EOL;
		$message .= 'Line:' . $e->getLine() . PHP_EOL;
		if($e instanceof UpdateException) {
			$message .= 'Data:' . PHP_EOL . print_r($e->getData(), true) . PHP_EOL;
		}
		$this->log($message);
	}

	/**
	 * Logs a message with current datetime prepended to updaterOdfweb.log
	 *
	 * @param string $message
	 * @throws LogException
	 */
	public function log($message) {
		$updaterLogPath = $this->getDataDirectoryLocation() . '/updaterOdfweb.log';

		$fh = fopen($updaterLogPath, 'a');
		if($fh === false) {
			throw new LogException('無法開啟 updaterOdfweb.log');
		}

		if($this->requestID === null) {
			$characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
			$charactersLength = strlen($characters);
			$randomString = '';
			for ($i = 0; $i < 10; $i++) {
				$randomString .= $characters[rand(0, $charactersLength - 1)];
			}
			$this->requestID = $randomString;
		}

		$logLine = date(\DateTime::ISO8601) . ' ' . $this->requestID . ' ' . $message . PHP_EOL;

		$result = fwrite($fh, $logLine);
		if($result === false) {
			throw new LogException('無法寫入 updaterOdfweb.log');
		}

		fclose($fh);
	}


	/**
	 * Logs a message with current datetime prepended to updaterOdfweb.log but drops possible LogException
	 *
	 * @param string $message
	 */
	public function silentLog($message) {
		try {
			$this->log($message);
		} catch (LogException $logE) {
			/* ignore log exception here (already detected later anyways) */
		}
	}


	/**
	 * Logs current version
	 *
	 */
	public function logVersion() {
		$this->silentLog('[info] current version: ' . $this->currentVersion . ' build time: ' . $this->buildTime);
	}
}

ini_set('display_errors', '0');
ini_set('log_errors', '1');

// Check if the config.php is at the expected place
try {
	$updater = new Updater(__DIR__);
} catch (\Exception $e) {
	// logging here is not possible because we don't know the data directory
	die($e->getMessage());
}

// Check if the updaterOdfweb.log can be written to
try {
	$updater->log('[info] request to updater');
} catch (\Exception $e) {
	if(isset($_POST['step'])) {
		// mark step as failed
		http_response_code(500);
		echo(json_encode(['proceed' => false, 'response' => $e->getMessage()]));
		die();
	}
	// show logging error to user
	die($e->getMessage());
}

// Check for authentication
$password = isset($_SERVER['HTTP_X_UPDATER_AUTH']) ? $_SERVER['HTTP_X_UPDATER_AUTH'] : (isset($_POST['updater-secret-input']) ? $_POST['updater-secret-input'] : '');
$auth = new Auth($updater, $password);

// Check if already a step is in process
$currentStep = $updater->currentStep();
$stepNumber = 0;
if($currentStep !== []) {
	$stepState = $currentStep['state'];
	$stepNumber = $currentStep['step'];
	$updater->log('[info] Step ' . $stepNumber . ' is in state "' . $stepState . '".');

	if($stepState === 'start') {
		die(
		sprintf(
			'Step %s is currently in process. Please reload this page later.',
			$stepNumber
			)
		);
	}
}

if(isset($_POST['step'])) {
	$updater->log('[info] POST request for step "' . $_POST['step'] . '"');
	set_time_limit(0);
	try {
		if(!$auth->isAuthenticated()) {
			throw new \Exception('未認證');
		}

		$step = (int)$_POST['step'];
		if($step > 12 || $step < 1) {
			throw new \Exception('無效的步驟');
		}

		$updater->startStep($step);
		switch ($step) {
			case 1:
				$updater->checkForExpectedFilesAndFolders();
				break;
			case 2:
				$updater->checkWritePermissions();
				break;
			case 3:
				$updater->createBackup();
				break;
			case 4:
				$updater->moveTmpFile();
				break;
			case 5:
				$updater->verifyIntegrity();
				break;
			case 6:
				$updater->extractDownload();
				break;
			case 7:
				$updater->setMaintenanceMode(true);
				break;
			case 8:
				$updater->replaceEntryPoints();
				break;
			case 9:
				$updater->deleteOldFiles();
				break;
			case 10:
				$updater->moveNewVersionInPlace();
				break;
			case 11:
				$updater->setMaintenanceMode(false);
				break;
			case 12:
				$updater->finalize();
				break;
		}
		$updater->endStep($step);
		echo(json_encode(['proceed' => true]));
	} catch (UpdateException $e) {
		$message = $e->getData();

		try {
			$updater->log('[error] POST request failed with UpdateException');
			$updater->logException($e);
		} catch (LogException $logE) {
			$message .= ' (and writing to log failed also with: ' . $logE->getMessage() . ')';
		}

		if(isset($step)) {
			$updater->rollbackChanges($step);
		}
		http_response_code(500);
		echo(json_encode(['proceed' => false, 'response' => $message]));
	} catch (\Exception $e) {
		$message = $e->getMessage();

		try {
			$updater->log('[error] POST request failed with other exception');
			$updater->logException($e);
		} catch (LogException $logE) {
			$message .= ' (and writing to log failed also with: ' . $logE->getMessage() . ')';
		}

		if(isset($step)) {
			$updater->rollbackChanges($step);
		}
		http_response_code(500);
		echo(json_encode(['proceed' => false, 'response' => $message]));
	}

	die();
}

$updater->log('[info] show HTML page');
$updater->logVersion();
$updaterUrl = explode('?', $_SERVER['REQUEST_URI'], 2)[0];
if(strpos($updaterUrl, 'index.php') === false) {
	$updaterUrl = rtrim($updaterUrl, '/') . '/index.php';
}
?>

<html>
<head>
	<style>
		html, body, div, span, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr, acronym, address, code, del, dfn, em, img, q, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table, caption, tbody, tfoot, thead, tr, th, td, article, aside, dialog, figure, footer, header, nav, section {
			margin: 0;
			padding: 0;
			border: 0;
			outline: 0;
			font-weight: inherit;
			font-size: 100%;
			font-family: inherit;
			vertical-align: baseline;
			cursor: default;
		}
		body {
			font-family: 'Open Sans', Frutiger, Calibri, 'Myriad Pro', Myriad, sans-serif;
			background-color: #ffffff;
			font-weight: 400;
			font-size: .8em;
			line-height: 1.6em;
			color: #000;
			height: auto;
		}
		a {
			border: 0;
			color: #000;
			text-decoration: none;
			cursor: pointer;
		}
		.external_link {
			text-decoration: underline;
		}
		ul {
			list-style: none;
		}
		.output ul {
			list-style: initial;
			padding: 0 30px;
		}
		#header {
			position: fixed;
			top: 0;
			left: 0;
			right: 0;
			height: 45px;
			line-height: 2.5em;
			background-color: #ECECFF;
			box-sizing: border-box;
		}
		.header-appname {
			color: #fff;
			font-size: 20px;
			font-weight: 300;
			line-height: 45px;
			padding: 0;
			margin: 0;
			display: inline-block;
			position: absolute;
			margin-left: 5px;
		}
		#header svg {
			margin: 5px;
		}

		#content-wrapper {
			position: absolute;
			height: 100%;
			width: 100%;
			overflow-x: hidden;
			padding-top: 45px;
			box-sizing: border-box;
		}

		#content {
			position: relative;
			height: 100%;
			margin: 0 auto;
		}
		#app-navigation {
			width: 250px;
			height: 100%;
			float: left;
			box-sizing: border-box;
			background-color: #fff;
			padding-bottom: 44px;
			-webkit-user-select: none;
			-moz-user-select: none;
			-ms-user-select: none;
			user-select: none;
			border-right: 1px solid #eee;
		}
		#app-navigation > ul {
			position: relative;
			height: 100%;
			width: inherit;
			overflow: auto;
			box-sizing: border-box;
		}
		#app-navigation li {
			position: relative;
			width: 100%;
			box-sizing: border-box;
		}
		#app-navigation li > a {
			display: block;
			width: 100%;
			line-height: 44px;
			min-height: 44px;
			padding: 0 12px;
			overflow: hidden;
			box-sizing: border-box;
			white-space: nowrap;
			text-overflow: ellipsis;
			color: #000;
			opacity: .57;
		}
		#app-navigation li:hover > a, #app-navigation li:focus > a {
			opacity: 1;
		}

		#app-content {
			position: relative;
			height: 100%;
			overflow-y: auto;
		}
		#progress {
			width: 600px;
		}
		.section {
			padding: 25px 30px;
		}
		.hidden {
			display: none;
		}

		li.step, .light {
			-ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=57)";
			opacity: .57;
		}

		li.step h2 {
			padding: 5px 2px 5px 30px;
			margin-top: 12px;
			margin-bottom: 0;
			-ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=57)";
			opacity: .57;
			background-position:8px 50%;
			background-repeat: no-repeat;
		}

		li.current-step, li.passed-step, li.failed-step, li.waiting-step {
			-ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=100)";
			opacity: 1;
		}

		.current-step {
			background-repeat: no-repeat;
			background-position: center;
			min-width: 16px;
			min-height: 16px;
			position: relative;
		}
		.current-step:after {
			z-index: 2;
			content: '';
			height: 12px;
			width: 12px;
			margin: -8px 0 0 -8px;
			position: absolute;
			top: 14px;
			left: 16px;
			border-radius: 100%;
			-webkit-animation: rotate .8s infinite linear;
			animation: rotate .8s infinite linear;
			-webkit-transform-origin: center;
			-ms-transform-origin: center;
			transform-origin: center;
			border: 2px solid rgba(150, 150, 150, 0.5);
			border-top-color: #969696;
		}

		@keyframes rotate {
			from {
				transform: rotate(0deg);
			}
			to {
				transform: rotate(360deg);
			}
		}

		li.current-step h2, li.passed-step h2, li.failed-step h2, li.waiting-step h2 {
			-ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=100)";
			opacity: 1;
		}

		li.passed-step h2 {
			background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iMTYiIHdpZHRoPSIxNiIgdmVyc2lvbj0iMS4xIiB2aWV3Qm94PSIwIDAgMTYgMTYiPjxwYXRoIGQ9Im0yLjM1IDcuMyA0IDRsNy4zLTcuMyIgc3Ryb2tlPSIjNDZiYTYxIiBzdHJva2Utd2lkdGg9IjIiIGZpbGw9Im5vbmUiLz48L3N2Zz4NCg==);
		}

		li.failed-step {
			background-color: #ffd4d4;
			border-radius: 3px;
		}
		li.failed-step h2 {
			color: #000;
			background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iMTYiIHdpZHRoPSIxNiIgdmVyc2lvbj0iMS4xIiB2aWV3Ym94PSIwIDAgMTYgMTYiPjxwYXRoIGQ9Im0xNCAxMi4zLTEuNyAxLjctNC4zLTQuMy00LjMgNC4zLTEuNy0xLjcgNC4zLTQuMy00LjMtNC4zIDEuNy0xLjcgNC4zIDQuMyA0LjMtNC4zIDEuNyAxLjctNC4zIDQuM3oiIGZpbGw9IiNkNDAwMDAiLz48L3N2Zz4NCg==);
		}

		li.step .output {
			position: relative;
			padding: 5px 5px 5px 32px;
		}

		h2 {
			font-size: 20px;
			font-weight: 300;
			margin-bottom: 12px;
			color: #555;
		}

		button, a.button {
			font-family: 'Open Sans', Frutiger, Calibri, 'Myriad Pro', Myriad, sans-serif;
			font-size: 13px;
			font-weight: 600;
			color: #545454;
			margin: 3px 3px 3px 0;
			padding: 6px 12px;
			background-color: #f7f7f7;
			border-radius: 3px;
			border: 1px solid #dbdbdb;
			cursor: pointer;
			outline: none;
			min-height: 34px;
			box-sizing: border-box;
		}

		button:hover, button:focus, a.button:hover, a.button:focus {
			border-color: #ECECFF;
		}

		code {
			font-family: monospace;
			font-size: 1.2em;
			background-color: #eee;
			border-radius: 2px;
			padding: 2px 6px 2px 4px;
		}

		#login code {
			display: block;
			border-radius: 3px;
		}

		#login form {
			margin-top: 5px;
		}

		#login input {
			border-radius: 3px;
			border: 1px solid rgba(240,240,240,.9);
			margin: 3px 3px 3px 0;
			padding: 9px 6px;
			font-size: 13px;
			outline: none;
			cursor: text;
		}

		.section {
			max-width: 600px;
			margin: 0 auto;
		}

	</style>
</head>
<body>
<div id="header">
	<svg xmlns="http://www.w3.org/2000/svg" version="1.1" xml:space="preserve" height="34" width="62" enable-background="new 0 0 196.6 72" y="0px" x="0px" viewBox="0 0 62.000002 34"><path style="color-rendering:auto;text-decoration-color:#000000;color:#000000;isolation:auto;mix-blend-mode:normal;shape-rendering:auto;solid-color:#000000;block-progression:tb;text-decoration-line:none;image-rendering:auto;white-space:normal;text-indent:0;enable-background:accumulate;text-transform:none;text-decoration-style:solid" fill="#fff" d="m31.6 4.0001c-5.95 0.0006-10.947 4.0745-12.473 9.5549-1.333-2.931-4.266-5.0088-7.674-5.0092-4.6384 0.0005-8.4524 3.8142-8.453 8.4532-0.0008321 4.6397 3.8137 8.4544 8.4534 8.455 3.4081-0.000409 6.3392-2.0792 7.6716-5.011 1.5261 5.4817 6.5242 9.5569 12.475 9.5569 5.918 0.000457 10.89-4.0302 12.448-9.4649 1.3541 2.8776 4.242 4.9184 7.6106 4.9188 4.6406 0.000828 8.4558-3.8144 8.4551-8.455-0.000457-4.6397-3.8154-8.454-8.4551-8.4533-3.3687 0.0008566-6.2587 2.0412-7.6123 4.9188-1.559-5.4338-6.528-9.4644-12.446-9.464zm0 4.9623c4.4687-0.000297 8.0384 3.5683 8.0389 8.0371 0.000228 4.4693-3.5696 8.0391-8.0389 8.0388-4.4687-0.000438-8.0375-3.5701-8.0372-8.0388 0.000457-4.4682 3.5689-8.0366 8.0372-8.0371zm-20.147 4.5456c1.9576 0.000226 3.4908 1.5334 3.4911 3.491 0.000343 1.958-1.533 3.4925-3.4911 3.4927-1.958-0.000228-3.4913-1.5347-3.4911-3.4927 0.0002284-1.9575 1.5334-3.4907 3.4911-3.491zm40.205 0c1.9579-0.000343 3.4925 1.533 3.4927 3.491 0.000457 1.9584-1.5343 3.493-3.4927 3.4927-1.958-0.000228-3.4914-1.5347-3.4911-3.4927 0.000221-1.9575 1.5335-3.4907 3.4911-3.491z"/></svg>
	<h1 class="header-appname">更新</h1>
</div>
<input type="hidden" id="updater-access-key" value="<?php echo htmlentities($password) ?>"/>
<input type="hidden" id="updater-endpoint" value="<?php echo htmlentities($updaterUrl) ?>"/>
<input type="hidden" id="updater-step-start" value="<?php echo $stepNumber ?>" />
<div id="content-wrapper">
	<div id="content">

		<div id="app-content">
		<?php if($auth->isAuthenticated()): ?>
			<ul id="progress" class="section">
				<li id="step-init" class="step icon-loading passed-step">
					<h2>初始化</h2>
					<div class="output">
						目前的 ODFWEB 版本是 <?php echo($updater->getCurrentVersion_odfweb()); ?>
						(基於 <?php echo($updater->getCurrentVersion()); ?>)<br>

						<?php echo($updater->checkForUpdate()); ?><br>

						<?php
						if ($updater->updateAvailable() || $stepNumber > 0) {
							$buttonText = '開始更新';
							if($stepNumber > 0) {
								$buttonText = '繼續更新';
							}
							?>
							<button id="startUpdateButton"><?php echo $buttonText ?></button>
							<?php
						}
						?>
						<button id="retryUpdateButton" class="hidden">重新更新</button>
					</div>
				</li>
				<li id="step-check-files" class="step <?php if($stepNumber >= 1) { echo 'passed-step'; }?>">
					<h2>檢查所需檔案</h2>
					<div class="output hidden"></div>
				</li>
				<li id="step-check-permissions" class="step <?php if($stepNumber >= 2) { echo 'passed-step'; }?>">
					<h2>檢查存取權限</h2>
					<div class="output hidden"></div>
				</li>
				<li id="step-backup" class="step <?php if($stepNumber >= 3) { echo 'passed-step'; }?>">
					<h2>建立備份</h2>
					<div class="output hidden"></div>
				</li>
				<li id="step-tmpfile" class="step <?php if($stepNumber >= 4) { echo 'passed-step'; }?>">
					<h2>檢查更新檔案</h2>
					<div class="output hidden"></div>
				</li>
				<li id="step-verify-integrity" class="hidden step <?php if($stepNumber >= 5) { echo 'passed-step'; }?> ">
					<h2>(Skip) Verifying integrity</h2>
					<div class="output hidden"></div>
				</li>
				<li id="step-extract" class="step <?php if($stepNumber >= 6) { echo 'passed-step'; }?>">
					<h2>解壓更新檔</h2>
					<div class="output hidden"></div>
				</li>
				<li id="step-enable-maintenance" class="step <?php if($stepNumber >= 7) { echo 'passed-step'; }?>">
					<h2>開啟維護模式</h2>
					<div class="output hidden"></div>
				</li>
				<li id="step-entrypoints" class="step <?php if($stepNumber >= 8) { echo 'passed-step'; }?>">
					<h2>更新 entry points</h2>
					<div class="output hidden"></div>
				</li>
				<li id="step-delete" class="step <?php if($stepNumber >= 9) { echo 'passed-step'; }?>">
					<h2>刪除舊檔案</h2>
					<div class="output hidden"></div>
				</li>
				<li id="step-move" class="step <?php if($stepNumber >= 10) { echo 'passed-step'; }?>">
					<h2>移動更新檔</h2>
					<div class="output hidden"></div>
				</li>
				<li id="step-maintenance-mode" class="step <?php if($stepNumber >= 11) { echo 'passed-step'; }?>">
					<!-- <h2>Keep maintenance mode active?</h2> -->
					<h2>關閉維護模式</h2>
					<div class="output hidden">
						<!-- <button id="maintenance-enable">Yes (for usage with command line tool)</button> -->
						<!-- <button id="maintenance-disable">No (for usage of the web based updater)</button> -->
						<button id="maintenance-disable">確認</button>
					</div>
				</li>
				<li id="step-done" class="step <?php if($stepNumber >= 12) { echo 'passed-step'; }?>">
					<h2>完成</h2>
					<div class="output hidden">
						<a class="button" href="<?php echo htmlspecialchars(str_replace('/index.php', '/../', $updaterUrl), ENT_QUOTES); ?>">返回 Odfweb 完成更新流程</a>
					</div>
				</li>
			</ul>
		<?php else: ?>
			<div id="login" class="section">
				<h2>Authentication</h2>
				<p>To login you need to provide the unhashed value of "updater.secret" in your config file.</p>
				<p>If you don't know that value, you can access this updater directly via the Odfweb admin screen or generate
				your own secret:</p>
				<code>php -r '$password = trim(shell_exec("openssl rand -base64 48"));if(strlen($password) === 64) {$hash = password_hash($password, PASSWORD_DEFAULT) . "\n"; echo "Insert as \"updater.secret\": ".$hash; echo "The plaintext value is: ".$password."\n";}else{echo "Could not execute OpenSSL.\n";};'</code>
				<form method="post" name="login">
					<fieldset>
						<input type="password" name="updater-secret-input" value=""
							   placeholder="Secret"
							   autocomplete="on" required>
						<button id="updater-secret-submit">Login</button>
					</fieldset>
				</form>
				<?php if(isset($_POST['updater-secret-input']) && !$auth->isAuthenticated()): ?>
				<p>Invalid password</p>
				<?php endif; ?>
			</div>
		<?php endif; ?>
		</div>
	</div>
</div>

</body>
<?php if($auth->isAuthenticated()): ?>
	<script>
		function escapeHTML(s) {
			return s.toString().split('&').join('&amp;').split('<').join('&lt;').split('>').join('&gt;').split('"').join('&quot;').split('\'').join('&#039;');
		}

		var done = false;
		var started = false;
		var updaterStepStart = parseInt(document.getElementById('updater-step-start').value);
		var elementId =false;
		function addStepText(id, text) {
			var el = document.getElementById(id);
			var output = el.getElementsByClassName('output')[0];
			if(typeof text === 'object') {
				text = JSON.stringify(text);
			}
			output.innerHTML = output.innerHTML + text;
			output.classList.remove('hidden');
		}
		function removeStepText(id) {
			var el = document.getElementById(id);
			var output = el.getElementsByClassName('output')[0];
			output.innerHTML = '';
			output.classList.add('hidden');
		}

		function currentStep(id) {
			var el = document.getElementById(id);
			el.classList.remove('failed-step');
			el.classList.remove('passed-step');
			el.classList.remove('waiting-step');
			el.classList.add('current-step');
		}

		function errorStep(id, numericId) {
			var el = document.getElementById(id);
			el.classList.remove('passed-step');
			el.classList.remove('current-step');
			el.classList.remove('waiting-step');
			el.classList.add('failed-step');

			// set start step to previous one
			updaterStepStart = numericId - 1;
			elementId = id;

			// show restart button
			var button = document.getElementById('retryUpdateButton');
			button.classList.remove('hidden');
		}

		function successStep(id) {
			var el = document.getElementById(id);
			el.classList.remove('failed-step');
			el.classList.remove('current-step');
			el.classList.remove('waiting-step');
			el.classList.add('passed-step');
		}

		function waitingStep(id) {
			var el = document.getElementById(id);
			el.classList.remove('failed-step');
			el.classList.remove('current-step');
			el.classList.remove('passed-step');
			el.classList.add('waiting-step');
		}

		function performStep(number, callback) {
			started = true;
			var httpRequest = new XMLHttpRequest();
			httpRequest.open('POST', document.getElementById('updater-endpoint').value);
			httpRequest.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
			httpRequest.setRequestHeader('X-Updater-Auth', document.getElementById('updater-access-key').value);
			httpRequest.onreadystatechange = function () {
				if (httpRequest.readyState != 4) { // 4 - request done
					return;
				}

				if (httpRequest.status != 200) {
					// failure
				}

				if(httpRequest.responseText.substr(0,1) !== '{') {
					// it seems that this is not a JSON object
					var response = {
						processed: false,
						response: 'Parsing response failed. ' + httpRequest.responseText
					};
					callback(response);
				} else {
					// parse JSON
					callback(JSON.parse(httpRequest.responseText));
				}

			};
			httpRequest.send("step="+number);
		}


		var performStepCallbacks = {
			0: function() { // placeholder that is called on start of the updater
				currentStep('step-check-files');
				performStep(1, performStepCallbacks[1]);
			},
			1: function(response) {
				if(response.proceed === true) {
					successStep('step-check-files');
					currentStep('step-check-permissions');
					performStep(2, performStepCallbacks[2]);
				} else {
					errorStep('step-check-files', 1);

					var text = '';
					if (typeof response['response'] === 'string') {
						text = escapeHTML(response['response']);
					} else {
						text = '找到以下額外的檔案：<ul>';
						response['response'].forEach(function(file) {
							text += '<li>' + escapeHTML(file) + '</li>';
						});
						text += '</ul>';
					}
					addStepText('step-check-files', text);
				}
			},
			2: function(response) {
				if(response.proceed === true) {
					successStep('step-check-permissions');
					currentStep('step-backup');
					performStep(3, performStepCallbacks[3]);
				} else {
					errorStep('step-check-permissions', 2);

					var text = '';
					if (typeof response['response'] === 'string') {
						text = escapeHTML(response['response']);
					} else {
						// text = 'The following places can not be written to:<ul>';
						text = '下列位置無寫入權限:<ul>';
						response['response'].forEach(function(file) {
							text += '<li>' + escapeHTML(file) + '</li>';
						});
						text += '</ul>';
					}
					addStepText('step-check-permissions', text);
				}
			},
			3: function (response) {
				if (response.proceed === true) {
					successStep('step-backup');
					currentStep('step-tmpfile');
					performStep(4, performStepCallbacks[4]);
				} else {
					errorStep('step-backup', 3);

					if(response.response) {
						addStepText('step-backup', escapeHTML(response.response));
					}
				}
			},
			4: function (response) {
				if (response.proceed === true) {
					successStep('step-tmpfile');
					currentStep('step-verify-integrity');
					performStep(5, performStepCallbacks[5]);
				} else {
					errorStep('step-tmpfile', 4);

					if(response.response) {
						addStepText('step-tmpfile', escapeHTML(response.response));
					}
				}
			},
			5: function (response) {
				if (response.proceed === true) {
					successStep('step-verify-integrity');
					currentStep('step-extract');
					performStep(6, performStepCallbacks[6]);
				} else {
					errorStep('step-verify-integrity', 5);

					if(response.response) {
						addStepText('step-verify-integrity', escapeHTML(response.response));
					}
				}
			},
			6: function (response) {
				if (response.proceed === true) {
					successStep('step-extract');
					currentStep('step-enable-maintenance');
					performStep(7, performStepCallbacks[7]);
				} else {
					errorStep('step-extract', 6);

					if(response.response) {
						addStepText('step-extract', escapeHTML(response.response));
					}
				}
			},
			7: function (response) {
				if (response.proceed === true) {
					successStep('step-enable-maintenance');
					currentStep('step-entrypoints');
					performStep(8, performStepCallbacks[8]);
				} else {
					errorStep('step-enable-maintenance', 7);

					if(response.response) {
						addStepText('step-enable-maintenance', escapeHTML(response.response));
					}
				}
			},
			8: function (response) {
				if (response.proceed === true) {
					successStep('step-entrypoints');
					currentStep('step-delete');
					performStep(9, performStepCallbacks[9]);
				} else {
					errorStep('step-entrypoints', 8);

					if(response.response) {
						addStepText('step-entrypoints', escapeHTML(response.response));
					}
				}
			},
			9: function (response) {
				if (response.proceed === true) {
					successStep('step-delete');
					currentStep('step-move');
					performStep(10, performStepCallbacks[10]);
				} else {
					errorStep('step-delete', 9);

					if(response.response) {
						addStepText('step-delete', escapeHTML(response.response));
					}
				}
			},
			10: function (response) {
				if (response.proceed === true) {
					successStep('step-move');

					waitingStep('step-maintenance-mode');
					// show buttons to decide on maintenance mode
					var el = document.getElementById('step-maintenance-mode')
						.getElementsByClassName('output')[0];
					el.classList.remove('hidden');
				} else {
					errorStep('step-move', 10);

					if(response.response) {
						addStepText('step-move', escapeHTML(response.response));
					}
				}
			},
			11: function (response) {
				if (response.proceed === true) {
					successStep('step-maintenance-mode');
					currentStep('step-done');
					performStep(12, performStepCallbacks[12]);
				} else {
					errorStep('step-maintenance-mode', 11);

					if(response.response) {
						addStepText('step-maintenance-mode', escapeHTML(response.response));
					}
				}
			},
			12: function (response) {
				if (response.proceed === true) {
					successStep('step-done');

					// show button to get to the web based migration steps
					var el = document.getElementById('step-done')
						.getElementsByClassName('output')[0];
					el.classList.remove('hidden');
				} else {
					errorStep('step-done', 11);
				}
				done = true;
			},
		};

		function startUpdate() {
			performStepCallbacks[updaterStepStart]({
				proceed: true
			});
		}

		function retryUpdate() {
			//remove failed log
			if (elementId !== false) {
				var el = document.getElementById(elementId);
				el.classList.remove('passed-step');
				el.classList.remove('current-step');
				el.classList.remove('waiting-step');
				el.classList.remove('failed-step');

				removeStepText(elementId);

				elementId = false;
			}

			// hide restart button
			var button = document.getElementById('retryUpdateButton');
			button.classList.add('hidden');

			startUpdate();
		}

		function askForMaintenance(keepActive) {
			var el = document.getElementById('step-maintenance-mode')
				.getElementsByClassName('output')[0];
			if (keepActive) {
				el.innerHTML = 'Maintenance mode will kept active.<br>Now trigger the migration via command line: <code>./occ upgrade</code><br>';
				successStep('step-maintenance-mode');
				currentStep('step-done');
				performStep(12, performStepCallbacks[12]);
			} else {
				el.innerHTML = '已關閉維護模式。<br>';
				currentStep('step-maintenance-mode');
				performStep(11, performStepCallbacks[11]);
			}
		}

		if(document.getElementById('startUpdateButton')) {
			document.getElementById('startUpdateButton').onclick = function (e) {
				e.preventDefault();
				this.classList.add('hidden');
				startUpdate();
			};
		}
		if(document.getElementById('retryUpdateButton')) {
			document.getElementById('retryUpdateButton').onclick = function (e) {
				e.preventDefault();
				retryUpdate();
			};
		}
		if(document.getElementById('maintenance-enable')) {
			document.getElementById('maintenance-enable').onclick = function (e) {
				e.preventDefault();
				askForMaintenance(true);
			};
		}
		if(document.getElementById('maintenance-disable')) {
			document.getElementById('maintenance-disable').onclick = function (e) {
				e.preventDefault();
				askForMaintenance(false);
			};
		}

		// Show a popup when user tries to close page
		window.onbeforeunload = confirmExit;
		function confirmExit() {
			if (done === false && started === true) {
				return '正在進行更新，確定要關閉嗎？';
			}
		}
	</script>
<?php endif; ?>

</html>
