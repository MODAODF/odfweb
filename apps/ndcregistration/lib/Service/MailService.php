<?php
/**
 * @copyright Copyright (c) 2017 Julius Härtl <jus@bitgrid.net>
 * @copyright Copyright (c) 2017 Pellaeon Lin <pellaeon@hs.ntnu.edu.tw>
 *
 * @author Julius Härtl <jus@bitgrid.net>
 * @author Pellaeon Lin <pellaeon@hs.ntnu.edu.tw>
 *
 * @license GNU AGPL version 3 or any later version
 *
 *  This program is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU Affero General Public License as
 *  published by the Free Software Foundation, either version 3 of the
 *  License, or (at your option) any later version.
 *
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU Affero General Public License for more details.
 *
 *  You should have received a copy of the GNU Affero General Public License
 *  along with this program. If not, see <http://www.gnu.org/licenses/>.
 *
 */

namespace OCA\NdcRegistration\Service;

use OCA\NdcRegistration\Db\Registration;
use OCP\AppFramework\Http\TemplateResponse;
use OCP\Defaults;
use OCP\IConfig;
use OCP\IGroupManager;
use OCP\IL10N;
use OCP\L10N\IFactory;
use OCP\ILogger;
use OCP\IURLGenerator;
use OCP\Mail\IMailer;
use OCP\Util;

class MailService {

	/** @var IURLGenerator */
	private $urlGenerator;
	/** @var IMailer */
	private $mailer;
	/** @var Defaults */
	private $defaults;
	/** @var IL10N */
	private $l10n;
	/** @var IFactory */
	private $l10nFactory;
	/** @var IConfig */
	private $config;
	/** @var IGroupManager */
	private $groupManager;
	/** @var ILogger */
	private $logger;

	public function __construct(IURLGenerator $urlGenerator, IMailer $mailer, Defaults $defaults, IL10N $l10n, IFactory $l10nFactory, IConfig $config, IGroupManager $groupManager, ILogger $logger) {
		$this->urlGenerator = $urlGenerator;
		$this->mailer = $mailer;
		$this->defaults = $defaults;
		$this->l10n = $l10n;
		$this->l10nFactory = $l10nFactory;
		$this->config = $config;
		$this->groupManager = $groupManager;
		$this->logger = $logger;
	}

	/**
	 * @param string $email
	 * @throws RegistrationException
	 */
	public function validateEmail($email) {
		if (!$this->mailer->validateMailAddress($email)) {
			throw new RegistrationException($this->l10n->t('The email address you entered is not valid'));
		}
	}

	/**
	 * @param Registration $registration
	 * @return bool
	 * @throws RegistrationException
	 */
	public function sendTokenByMail(Registration $registration) {

		// 設定密碼連結
		$link = $this->urlGenerator->linkToRoute('ndcregistration.register.verifyToken', ['token' => $registration->getToken()]);
		$link = $this->urlGenerator->getAbsoluteURL($link);

		$emailTemplate = $this->generateTemplate($link, $registration->getUsername());

		$from = Util::getDefaultEmailAddress('register');
		$message = $this->mailer->createMessage();
		$message->setTo([$registration->getEmail()]);
		$message->setFrom([$from => $this->defaults->getName()]);
		$message->useTemplate($emailTemplate);

		$failed_recipients = $this->mailer->send($message);
		if (!empty($failed_recipients)) {
			throw new RegistrationException($this->l10n->t('A problem occurred sending email, please contact your administrator.'));
		}
	}

	/**
	 * Nextcloud Mail 模板 或 welcomemailtemplate 客製化模板
	 * @param string $link
	 * @param string $registerName
	 * @return IEMailTemplate
	 */
	private function generateTemplate($link, $registerName = null) {

		// 信件語系：config預設值 或 admin目前語系
		$userLang = $this->l10nFactory->getUserLanguage(\OC::$server->getUserSession()->getUser());
		$lang = $this->config->getSystemValue('default_language', $userLang);
		$l10n = $this->l10nFactory->get('settings', $lang);

		$emailTemplate = $this->mailer->createEMailTemplate('ndcregistration.registration', []);

		// 預設內容
		$Subject  = $l10n->t('Your %s account was created', [$this->defaults->getName()]);
		$Heading  = $l10n->t('Welcome aboard');// $l10n->t('Welcome aboard %s', [$displayName])
		$BodyText = $l10n->t('Welcome to your %s account, you can add, protect, and share your data.', [$this->defaults->getName()]);
		$Footer   = $this->defaults->getName();

		// 客製化內容 (WelcomeMailTemplate)
		if ($this->config->getSystemValue('mail_template', 0)) {

			// 主旨不可以是空值
			$customSubject = $this->config->getSystemValue('mail_subject', '');
			$Subject = empty(trim($customSubject)) ? $Subject : $customSubject;

			// 其他設定值可以為空字串
			$Heading  = $this->config->getSystemValue('mail_heading', NULL) ?? $Heading;
			$BodyText = $this->config->getSystemValue('mail_bodytext', NULL) ?? $BodyText;
			$Footer   = $this->config->getSystemValue('mail_footer', NULL) ?? $Footer;
		}

		$emailTemplate->setSubject($Subject);
		$emailTemplate->addHeader();
		if(!empty($Heading)) $emailTemplate->addHeading($Heading);
		if(!empty($BodyText)) $emailTemplate->addBodyText($BodyText);
		if(!empty($registerName) && $registerName) $emailTemplate->addBodyText($l10n->t('Your username is: %s', [$registerName]));
		$emailTemplate->addBodyButton($l10n->t('Set your password'), $link);
		if(!empty($Footer)) $emailTemplate->addFooter($Footer);

		return $emailTemplate;
	}

	/**
	 * @param string $userId
	 * @param array $userGroupId
	 * @param bool $userIsEnabled
	 */
	public function notifyAdmins($userId, $userIsEnabled, $userGroupId = []) {
		// Notify admin
		$admin_users = $this->groupManager->get('admin')->getUsers();

		// if the user is disabled and belongs to a group
		// add subadmins of this group to notification list
		if (!$userIsEnabled and count($userGroupId) > 0) {
			foreach ($userGroupId as $gid) {
				// 取得群組子管理員
				$group = $this->groupManager->get($gid);
				$subadmin_users = $this->groupManager->getSubAdmin()->getGroupsSubAdmins($group);
				// 子管理員加入admin通知列表
				foreach ($subadmin_users as $user) {
					if (!in_array($user, $admin_users)) {
						$admin_users[] = $user;
					}
				}
			}
		}

		$to_arr = [];
		foreach ($admin_users as $au) {
			$au_email = $au->getEMailAddress();
			if ($au_email && $au->isEnabled()) {
				$to_arr[$au_email] = $au->getDisplayName();
			}
		}
		try {
			$this->sendNewUserNotifEmail($to_arr, $userId, $userIsEnabled);
		} catch (\Exception $e) {
			$this->logger->error('Sending admin notification email failed: '. $e->getMessage());
		}
	}

	/**
	 * Sends new user notification email to admin
	 * @param array $to
	 * @param string $username the new user
	 * @param bool $userIsEnabled the new user account is enabled
	 * @throws \Exception
	 */
	private function sendNewUserNotifEmail(array $to, $username, $userIsEnabled) {
		if ($this->config->getAppValue('core', 'vendor', '') === 'nextcloud') {
			$link = $this->urlGenerator->linkToRouteAbsolute('settings.Users.usersList');
		} else {
			$link = $this->urlGenerator->linkToRouteAbsolute('user_management.users');
		}
		$template_var = [
			'user' => $username,
			'sitename' => $this->defaults->getName(),
			'link' => $link,
		];

		// handle user enableness
		if ($userIsEnabled) {
			$html_template_file = 'email.newuser_html';
			$plaintext_template_file = 'email.newuser_plaintext';
		} else {
			$html_template_file = 'email.newuser.disabled_html';
			$plaintext_template_file = 'email.newuser.disabled_plaintext';
		}

		$html_template = new TemplateResponse('ndcregistration', $html_template_file, $template_var, 'blank');
		$html_part = $html_template->render();
		$plaintext_template = new TemplateResponse('ndcregistration', $plaintext_template_file, $template_var, 'blank');
		$plaintext_part = $plaintext_template->render();
		$subject = $this->l10n->t('A new user "%s" has created an account on %s', [$username, $this->defaults->getName()]);

		$from = Util::getDefaultEmailAddress('register');
		$message = $this->mailer->createMessage();
		$message->setFrom([$from => $this->defaults->getName()]);
		$message->setTo([]);
		$message->setBcc($to);
		$message->setSubject($subject);
		$message->setPlainBody($plaintext_part);
		$message->setHtmlBody($html_part);
		$failed_recipients = $this->mailer->send($message);
		if (!empty($failed_recipients)) {
			throw new RegistrationException('Failed recipients: '.print_r($failed_recipients, true));
		}
	}
}
