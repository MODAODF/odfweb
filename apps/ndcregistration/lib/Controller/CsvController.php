<?php
namespace OCA\NdcRegistration\Controller;

use OCA\NdcRegistration\Db\Registration;
use OCA\NdcRegistration\Service\MailService;
use OCA\NdcRegistration\Service\RegistrationException;
use OCA\NdcRegistration\Service\RegistrationService;
use OCP\IRequest;
use OCP\AppFramework\Http\DataResponse;
use OCP\AppFramework\Controller;
use OCP\IUserManager;
use OCP\IGroupManager;
use OCP\IL10N;
use OCP\IConfig;

class CsvController extends Controller {

	// CSV file pointer
	private $csvHandle = null;
	// CVS ID(帳號) 欄位所在位置
	const ID_NAME = 'ID';
	private $idPos = null;
	private $ids = []; // 紀錄帳號是否重複
	// CVS email(電子郵件) 欄位所在位置
	const EMAIL_NAME = 'email';
	private $emailPos = null;
	private $emails = []; // 紀錄 email 是否重複
	// CVS group(群組)欄位所在位置
	const GROUP_NAME = 'group';
	private $groupPos = null;
	private $groups = [];

	/** @var IGroupManager */
	private $groupManager;

	/** @var IUserManager */
	private $userManager;

	/** @var RegistrationService */
	private $registrationService;
	/** @var MailService */
	private $mailService;
	/** @var IL10N */
	private $l10n;
	/** @var IConfig */
	private $config;

	public function __construct(
		$AppName,
		IRequest $request ,
		RegistrationService $registrationService,
		MailService $mailService,
		IL10N $l10n,
		IConfig $config
	) {
		parent::__construct($AppName, $request);

		$this->groupManager = \OC::$server->getGroupManager();
		$this->userManager = \OC::$server->getUserManager();
		$this->registrationService = $registrationService;
		$this->mailService = $mailService;
		$this->l10n = $l10n;
		$this->config = $config;

		// CSV -> array
		$this->csvArr = null;

		// 準備新增的 users 資料
		$this->usersData = [];

		// user 新增狀態
		$this->userStatus = null;

		$this->startTime = 0;
		$this->endTime = 0;
	}

	/**
	 * @NoCSRFRequired
	 *
	 * 檢查上傳的 CSV 檔案、轉成 Array
	 *
	 * @return DataResponse
	 */
	public function uploadFile() {

		// 檢查並開啟檔案
		try {
			$csvFile = $this->request->getUploadedFile('csvFile');
			if (!$csvFile) {
				throw new \Exception('沒有上傳檔案');
			}

			$fileName = $csvFile['tmp_name'];
			// 必須是純文字格式
			if (mime_content_type($fileName) != 'text/plain') {
				throw new \Exception('檔案不是 CSV 格式');
			}

			// 開啟檔案
			$this->csvHandle = @fopen($fileName, 'rb');
			if (!$this->csvHandle) {
				throw new \Exception('CSV 檔開啟錯誤');
			}

			// 檢查欄位及紀錄位置
			$fieldNames = fgetcsv($this->csvHandle, 1000, ',', '"');
			$fieldCount = count($fieldNames);
			for ($i = 0; $i < $fieldCount; $i++) {
				switch (strtolower($fieldNames[$i])) {
					case strtolower(SELF::ID_NAME):
						$this->idPos = $i; // 帳號欄位置
						break;
					case strtolower(SELF::EMAIL_NAME):
						$this->emailPos = $i; // 電子郵件欄位置
						break;
					case strtolower(SELF::GROUP_NAME):
						$this->groupPos = $i; // 群組欄位置
						break;
					default:
						// 其他欄位不理會
						break;
				}
			}
			$lack = [];
			if (is_null($this->idPos)) {
				array_push($lack, SELF::ID_NAME);
			}
			if (is_null($this->emailPos)) {
				array_push($lack, SELF::EMAIL_NAME);
			}
			if (is_null($this->groupPos)) {
				array_push($lack, SELF::GROUP_NAME);
			}
			if (count($lack) !== 0) {
				throw new \Exception('短少以下欄位 : '.implode( ',', $lack));
			}
		} catch (\Exception $e) {
			if ($this->csvHandle) {
				fclose($this->csvHandle); // 關閉檔案
			}
			return new DataResponse([
					'data' => [ 'message' => $e->getMessage() ],
					'result' => false,
			]);
		}

		// 依序讀取每一行
		$lineNo = 1;
		$userLists = [];
		$groupLists = [];
		$invalidMsg = [];

		while (($row = fgetcsv($this->csvHandle, 1000, ',', '"')) !== FALSE) {
			$lineNo ++;
			$rowCount = count($row);
			$msg = [];
			// 欄位數必須與表頭一致
			if ($rowCount === $fieldCount) {
				$id = $row[$this->idPos];
				$email = $row[$this->emailPos];
				$group = $row[$this->groupPos];
				// 1.檢查帳號
				try {
					$this->registrationService->validateUsername($id);
				} catch (\Exception $e) {
					$msg[] = '#'.$lineNo.' ('.$id.') : '.$e->getMessage();
				}

				// 2.檢查 email
				try {
					if ($this->registrationService->validateEmail($email) !== true) {
						throw new RegistrationException('此Email已註冊');
					}
					// 檢查 CSV 重複Email
					if ($this->config->getAppValue($this->appName, 'allow_duplicate_email', "yes") === 'no' && in_array($email, $this->emails, true)) {
						throw new RegistrationException('CSV含重複的Email');
					}
					$this->emails[] = $email;
				} catch (\Exception $e) {
					$msg[] = '#'.$lineNo.' ('.$email.') : '.$e->getMessage();
				}

				// 3. 檢查 group
				if ($group === '') {
					$msg[] = '#'.$lineNo.' : 群組空白！';
				} else {
					// 檢查群組陣列格式
					if ($groupArr = str_getcsv($group, ',', '"')) {
						foreach ($groupArr as $g) {
							if ($g != trim($g)) {
								$msg[] = '#'.$lineNo.' ('.$g.') : '.'The group name cannot start or end with space.';
							} else if(strpos(trim($g), "\n") !== FALSE) {
								$msg[] = '#'.$lineNo.' : 群組格式錯誤(雙引號)';
							} else {  // 紀錄所有群組
								// 沒有被紀錄過
								if (!array_key_exists($g, $groupLists)) {
									// 紀錄該群組是否已存在系統中
									$groupLists[$g] = $this->groupManager->groupExists($g);
								}
							}
						}
					} else {
						$msg[] = '#'.$lineNo.' : 群組格式錯誤';
					}
				}
			} else if ($rowCount > 0) {
				$msg[] = '#'.$lineNo.' : 欄位數與表頭不一致 -> '.implode(',', $row);
			} else {
				// 讀到空行
			}

			// 該筆資料無錯誤，紀錄在 $userLists 中
			if (count($msg) === 0) {
				$userLists[] = [
					SELF::ID_NAME => $id,
					SELF::EMAIL_NAME => $email,
					SELF::GROUP_NAME => $group,
				];
			// 否則把錯誤訊息放入訊息陣列中
			} else {
				for ($i = 0; $i < count($msg); $i++) {
					$invalidMsg[] = $msg[$i];
				}
			}
		}

		// 如果訊息陣列有資料，表示有錯誤發生，傳回錯誤訊息後結束
		if (!empty($invalidMsg)) {
			return new DataResponse([
				'data' => [
					'message' => $this->l10n->t('The following error occurred, please check before uploading'),
					'reason' => $invalidMsg
				],
				'result' => false,
			]);
		}

		// 開始真正匯入資料
		$result = true;
		$resultMsg = $this->l10n->t('Batch import of accounts is complete');
		$this->startTime = time();
		foreach ($userLists as $user) {
			$email = $user[SELF::EMAIL_NAME];
			$username = $user[SELF::ID_NAME];
			$group = $user[SELF::GROUP_NAME];
			try {
				// 建立註冊資料
				$registration = $this->registrationService->createRegistration($email, $username, $group, true);
				$this->mailService->sendTokenByMail($registration);
			} catch (\Exception $e) {
				// TODO: 例外處理
				$resultMsg = $this->l10n->t('The account import is abnormal. The mail server may be set incorrectly.')."\n".$e->getMessage();
				$result = false;
				break;
			}
		}
		$this->endTime = time();

		// 匯入過程若發生錯誤，需將匯入的資料刪除
		if (!$result) {
			foreach ($userLists as $user) {
				$email = $user[SELF::EMAIL_NAME];
				$username = $user[SELF::ID_NAME];
				$this->registrationService->deleteByEmailAndUsername($email, $username);
			}
		}

		return new DataResponse([
				'data' => [
					'message' => $resultMsg,
				],
				'result' => $result,
				'duration' => $this->endTime - $this->startTime,
			]);
	}
}
