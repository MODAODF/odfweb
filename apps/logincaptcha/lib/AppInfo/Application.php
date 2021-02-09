<?php
namespace OCA\LoginCaptcha\AppInfo;

use OCP\AppFramework\App;
use OCP\ISession;
use OCP\IRequest;
use OCP\IURLGenerator;
use OCP\User\Events\BeforeUserLoggedInEvent;

class Application extends App {

	const APPNAME = 'logincaptcha';
	const CAPTCHA_NAME = 'login_captcha_code';
	const CAPTCHA_FAILED_NAME = 'login_cpatcha_failed';

	public function __construct() {
		parent::__construct(self::APPNAME);
		$this->session = \OC::$server->getSession();
		$this->request = \OC::$server->getRequest();
		$this->urlGenerator = \OC::$server->getURLGenerator();
	}

	public function registerListener() {
		$eventDispatcher = \OC::$server->getEventDispatcher();
		$eventDispatcher->addListener(BeforeUserLoggedInEvent::class, function($event) {
			try {
				$this->validate();
			} catch (\Exception $e) {
				header('Location:' . $this->getRedirectUrl($event->getUsername()));
				exit;
			}

		});
	}

	/**
	 * 取得驗證結果
	 */
	public function showErrorMsg() {
		return $this->session->get(self::CAPTCHA_FAILED_NAME);
	}

	/**
	 * 移除驗證結果
	 */
	public function removeSession() {
		$this->session->remove(self::CAPTCHA_FAILED_NAME);
	}

	/**
	 * 檢查驗證碼
	 *
	 * @NoCSRFRequired
	 * @PublicPage
     * @UseSession
	 *
	 * @throws \Exception
	 */
	private function validate() {
		$captcha = $this->request->getParam('captcha', '');
		$savedCaptcha = $this->session->get(self::CAPTCHA_NAME);
		$isOK = (strtolower($savedCaptcha) == strtolower(trim($captcha)));
		if (!$isOK) {
			$this->session->set(self::CAPTCHA_FAILED_NAME, true);
			throw new \Exception('captcha');
		}
	}

	/**
	 * 驗證無效，重新導向登入頁面
	 *
	 * @NoCSRFRequired
	 * @PublicPage
     * @UseSession
	 *
	 * @param string $username
	 * @return string
	 */
	private function getRedirectUrl($username) {
		$args = $username !== null ? ['user' => $username] : [];
		$redirectUrl .= $this->request->getServerProtocol() . '://';
		$redirectUrl .= $this->request->getServerHost();
		$redirectUrl .= $this->urlGenerator->linkToRoute('core.login.showLoginForm', $args);
		return $redirectUrl;
	}

}
