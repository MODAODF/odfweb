<?php
/**
 * ownCloud - registration
 *
 * This file is licensed under the Affero General Public License version 3 or
 * later. See the COPYING file.
 *
 * @author Pellaeon Lin <pellaeon@hs.ntnu.edu.tw>
 * @author Julius Härtl <jus@bitgrid.net>
 * @copyright Pellaeon Lin 2014
 */

namespace OCA\NdcRegistration\Controller;

use OCA\NdcRegistration\Db\Registration;
use OCA\NdcRegistration\Service\MailService;
use OCA\NdcRegistration\Service\RegistrationException;
use OCA\NdcRegistration\Service\RegistrationService;
use \OCP\IRequest;
use \OCP\AppFramework\Http\ContentSecurityPolicy;
use \OCP\AppFramework\Http\TemplateResponse;
use \OCP\AppFramework\Http\RedirectResponse;
use \OCP\AppFramework\Controller;
use \OCP\IURLGenerator;
use \OCP\IL10N;

class RegisterController extends Controller {

	/** @var IL10N */
	private $l10n;
	/** @var IURLGenerator */
	private $urlgenerator;
	/** @var RegistrationService */
	private $registrationService;
	/** @var MailService */
	private $mailService;


	public function __construct(
		$appName,
		IRequest $request,
		IL10N $l10n,
		IURLGenerator $urlgenerator,
		RegistrationService $registrationService,
		MailService $mailService
	) {
		parent::__construct($appName, $request);
		$this->l10n = $l10n;
		$this->urlgenerator = $urlgenerator;
		$this->registrationService = $registrationService;
		$this->mailService = $mailService;
	}

	/**
	 * @NoCSRFRequired
	 * @PublicPage
	 *
	 * @param $errormsg
	 * @param $entered
	 * @return TemplateResponse
	 */
	public function askEmail($errormsg, $entered) {
		$params = [
			'errormsg' => $errormsg ? $errormsg : $this->request->getParam('errormsg'),
			'entered' => $entered ? $entered : $this->request->getParam('entered')
		];
		$response = new TemplateResponse('ndcregistration', 'register', $params, 'guest');
		$policy = new ContentSecurityPolicy();
		$policy->allowInlineStyle(false);
		$response->setContentSecurityPolicy($policy);
		return $response;
	}

	/**
	 * User POST email, if email is valid and not duplicate, we send token by mail
	 * @PublicPage
	 * @AnonRateThrottle(limit=5, period=1)
	 *
	 * @param string $email
	 * @param string $captcha
	 * @return TemplateResponse
	 */
	public function validateEmail($email, $captcha) {//TODO rename to receiveUserEmail
		if (!$this->registrationService->checkAllowedDomains($email)) {//TODO Duplicate code with Service
			return new TemplateResponse('ndcregistration', 'domains', [
				'domains' => $this->registrationService->getAllowedDomains()
			], 'guest');
		}

		// 檢查驗證碼是否符合
		if (!$this->registrationService->validateCaptcha($captcha)) {
			return $this->askEmail($this->l10n->t('Incorrect verification code!'), true);
		}

		try {
			$reg = $this->registrationService->validateEmail($email);
			if ($reg === true) {
				$registration = $this->registrationService->createRegistration($email);
				$this->mailService->sendTokenByMail($registration);
			} else {
				$this->registrationService->generateNewToken($reg);
				$this->mailService->sendTokenByMail($reg);
				return new TemplateResponse('ndcregistration', 'message', ['msg' =>
					$this->l10n->t('There is already a pending registration with this email, a new verification email has been sent to the address.')
				], 'guest');
			}
		} catch (RegistrationException $e) {
			return new TemplateResponse('ndcregistration', 'message', ['msg' =>
				$e->getMessage().'<br/>'.$e->getHint()
			], 'guest');
		}


		return new TemplateResponse('ndcregistration', 'message', ['msg' =>
			$this->l10n->t('Verification email successfully sent.')
		], 'guest');
	}

	/**
	 * @NoCSRFRequired
	 * @PublicPage
	 *
	 * @param $token
	 * @return TemplateResponse
	 */
	public function verifyToken($token) {
		try {
			/** @var Registration $registration */
			$registration = $this->registrationService->verifyToken($token);
			$this->registrationService->confirmEmail($registration);

			// create account without form if username/password are already stored
			$username = $registration->getUsername();
			$password = trim($registration->getPassword());
			if ($username !== null && $password != null) {
				$this->registrationService->createAccount($registration);
				return new TemplateResponse('ndcregistration', 'message',
					['msg' => $this->l10n->t('Your account has been successfully created, you can <a href="%s">log in now</a>.', [$this->urlgenerator->getAbsoluteURL('/')])],
					'guest'
				);
			}

			return new TemplateResponse('ndcregistration', 'form',
				['email' => $registration->getEmail(),
				'entered_data' => [
					'user' => $username
				],
				'lock_username' => !empty($username),
				'token' => $registration->getToken()
				], 'guest');
		} catch (RegistrationException $exception) {
			return $this->renderError($exception->getMessage(), $exception->getHint());
		}
	}

	/**
	 * @PublicPage
	 * @UseSession
	 *
	 * @param $token
	 * @return RedirectResponse|TemplateResponse
	 */
	public function createAccount($token) {
		$registration = $this->registrationService->getRegistrationForToken($token);
		// 如果註冊申請已經有帳號名稱了，就用該帳號
		if (!empty($registration->getUsername())) {
			$lockUser = true;
			$username = $registration->getUsername();
		// 否則就是 post 過來的資料
		} else {
			$lockUser = false;
			$username = $this->request->getParam('username');
		}
		$password = $this->request->getParam('password');
		$confpassword = $this->request->getParam('confpassword');

		try {
			if ($password !== $confpassword) {
				throw new \Exception($this->l10n->t('Passwords do not match'));
			}
			$user = $this->registrationService->createAccount($registration, $username, $password);
		} catch (\Exception $exception) {
			// Render form with previously sent values
			return new TemplateResponse('ndcregistration', 'form',
				[
					'email' => $registration->getEmail(),
					'entered_data' => ['user' => $username],
					'lock_username' => $lockUser,
					'errormsgs' => [$exception->getMessage()],
					'token' => $token
				], 'guest');
		}

		if ($user->isEnabled()) {
			// log the user
			return $this->registrationService->loginUser($user->getUID(), $username, $password, false);
		} else {
			// warn the user their account needs admin validation
			return new TemplateResponse(
				'ndcregistration',
				'message',
				['msg' => $this->l10n->t("Your account has been successfully created, but it still needs approval from an administrator.")],
				'guest');
		}
	}

	private function renderError($error, $hint="") {
		return new TemplateResponse('', 'error', [
			'errors' => [[
				'error' => $error,
				'hint' => $hint
			]]
		], 'error');
	}
}
