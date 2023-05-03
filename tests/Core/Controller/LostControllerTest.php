<?php
/**
 * @author Lukas Reschke <lukas@owncloud.com>
 *
 * @copyright Copyright (c) 2015, ownCloud, Inc.
 * @license AGPL-3.0
 *
 * This code is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License, version 3,
 * as published by the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License, version 3,
 * along with this program.  If not, see <http://www.gnu.org/licenses/>
 *
 */

namespace Tests\Core\Controller;

use OC\Authentication\TwoFactorAuth\Manager;
use OC\Core\Controller\LostController;
use OC\Mail\Message;
use OC\Security\RateLimiting\Limiter;
use OCP\AppFramework\Http\JSONResponse;
use OCP\AppFramework\Http\TemplateResponse;
use OCP\Defaults;
use OCP\Encryption\IEncryptionModule;
use OCP\Encryption\IManager;
use OCP\IConfig;
use OCP\IInitialStateService;
use OCP\IL10N;
use OCP\ILogger;
use OCP\IRequest;
use OCP\IURLGenerator;
use OCP\IUser;
use OCP\IUserManager;
use OCP\Mail\IEMailTemplate;
use OCP\Mail\IMailer;
use OCP\Security\VerificationToken\InvalidTokenException;
use OCP\Security\VerificationToken\IVerificationToken;
use PHPUnit\Framework\MockObject\MockObject;

/**
 * Class LostControllerTest
 *
 * @package OC\Core\Controller
 */
class LostControllerTest extends \Test\TestCase {
	/** @var LostController */
	private $lostController;
	/** @var IUser */
	private $existingUser;
	/** @var IURLGenerator | \PHPUnit\Framework\MockObject\MockObject */
	private $urlGenerator;
	/** @var IL10N */
	private $l10n;
	/** @var IUserManager | \PHPUnit\Framework\MockObject\MockObject */
	private $userManager;
	/** @var Defaults */
	private $defaults;
	/** @var IConfig | \PHPUnit\Framework\MockObject\MockObject */
	private $config;
	/** @var IMailer | \PHPUnit\Framework\MockObject\MockObject */
	private $mailer;
	/** @var IManager|\PHPUnit\Framework\MockObject\MockObject */
	private $encryptionManager;
	/** @var IRequest|\PHPUnit\Framework\MockObject\MockObject */
	private $request;
	/** @var ILogger|\PHPUnit\Framework\MockObject\MockObject */
	private $logger;
	/** @var Manager|\PHPUnit\Framework\MockObject\MockObject */
	private $twofactorManager;
	/** @var IInitialStateService|\PHPUnit\Framework\MockObject\MockObject */
	private $initialStateService;
	/** @var IVerificationToken|\PHPUnit\Framework\MockObject\MockObject */
	private $verificationToken;
	/** @var Limiter|MockObject */
	private $limiter;

	protected function setUp(): void {
		parent::setUp();

		$this->existingUser = $this->createMock(IUser::class);
		$this->existingUser->expects($this->any())
			->method('getEMailAddress')
			->willReturn('test@example.com');
		$this->existingUser->expects($this->any())
			->method('getUID')
			->willReturn('ExistingUser');
		$this->existingUser->expects($this->any())
			->method('getDisplayName')
			->willReturn('Existing User');
		$this->existingUser->expects($this->any())
			->method('isEnabled')
			->willReturn(true);

		$this->config = $this->createMock(IConfig::class);
		$this->config->expects($this->any())
			->method('getSystemValue')
			->willReturnMap([
				['secret', null, 'SECRET'],
				['secret', '', 'SECRET'],
				['lost_password_link', '', ''],
			]);
		$this->l10n = $this->createMock(IL10N::class);
		$this->l10n
			->expects($this->any())
			->method('t')
			->willReturnCallback(function ($text, $parameters = []) {
				return vsprintf($text, $parameters);
			});
		$this->defaults = $this->getMockBuilder('\OCP\Defaults')
			->disableOriginalConstructor()->getMock();
		$this->userManager = $this->getMockBuilder(IUserManager::class)
			->disableOriginalConstructor()->getMock();
		$this->urlGenerator = $this->getMockBuilder(IURLGenerator::class)
			->disableOriginalConstructor()->getMock();
		$this->mailer = $this->getMockBuilder('\OCP\Mail\IMailer')
			->disableOriginalConstructor()->getMock();
		$this->request = $this->getMockBuilder(IRequest::class)
			->disableOriginalConstructor()->getMock();
		$this->encryptionManager = $this->getMockBuilder(IManager::class)
			->disableOriginalConstructor()->getMock();
		$this->encryptionManager->expects($this->any())
			->method('isEnabled')
			->willReturn(true);
		$this->logger = $this->createMock(ILogger::class);
		$this->twofactorManager = $this->createMock(Manager::class);
		$this->initialStateService = $this->createMock(IInitialStateService::class);
		$this->verificationToken = $this->createMock(IVerificationToken::class);
		$this->limiter = $this->createMock(Limiter::class);
		$this->lostController = new LostController(
			'Core',
			$this->request,
			$this->urlGenerator,
			$this->userManager,
			$this->defaults,
			$this->l10n,
			$this->config,
			'lostpassword-noreply@localhost',
			$this->encryptionManager,
			$this->mailer,
			$this->logger,
			$this->twofactorManager,
			$this->initialStateService,
			$this->verificationToken,
			$this->limiter
		);
	}

	public function testResetFormTokenError() {
		$this->userManager->method('get')
			->with('ValidTokenUser')
			->willReturn($this->existingUser);
		$this->verificationToken->expects($this->once())
			->method('check')
			->with('12345:MySecretToken', $this->existingUser, 'lostpassword', 'test@example.com')
			->willThrowException(new InvalidTokenException(InvalidTokenException::TOKEN_DECRYPTION_ERROR));

		$response = $this->lostController->resetform('12345:MySecretToken', 'ValidTokenUser');
		$expectedResponse = new TemplateResponse('core',
			'error',
			[
				'errors' => [
					['error' => 'Could not reset password because the token is invalid'],
				]
			],
			'guest');
		$this->assertEquals($expectedResponse, $response);
	}

	public function testResetFormValidToken() {
		$this->userManager->method('get')
			->with('ValidTokenUser')
			->willReturn($this->existingUser);
		$this->verificationToken->expects($this->once())
			->method('check')
			->with('MySecretToken', $this->existingUser, 'lostpassword', 'test@example.com');

		$response = $this->lostController->resetform('MySecretToken', 'ValidTokenUser');
		$expectedResponse = new TemplateResponse('core',
			'login',
			[],
			'guest');
		$this->assertEquals($expectedResponse, $response);
	}

	public function testEmailUnsuccessful() {
		$existingUser = 'ExistingUser';
		$nonExistingUser = 'NonExistingUser';
		$this->userManager
			->expects($this->any())
			->method('userExists')
			->willReturnMap([
				[true, $existingUser],
				[false, $nonExistingUser]
			]);

		$this->logger->expects($this->exactly(0))
			->method('logException');
		$this->logger->expects($this->exactly(2))
			->method('warning');

		$this->userManager
			->method('getByEmail')
			->willReturn([]);

		// With a non existing user
		$response = $this->lostController->email($nonExistingUser);
		$expectedResponse = new JSONResponse([
			'status' => 'success',
		]);
		$expectedResponse->throttle();
		$this->assertEquals($expectedResponse, $response);

		// With no mail address
		$this->config
			->expects($this->any())
			->method('getUserValue')
			->with($existingUser, 'settings', 'email')
			->willReturn(null);
		$response = $this->lostController->email($existingUser);
		$expectedResponse = new JSONResponse([
			'status' => 'success',
		]);
		$expectedResponse->throttle();
		$this->assertEquals($expectedResponse, $response);
	}

	public function testEmailSuccessful() {
		$this->userManager
				->expects($this->any())
				->method('get')
				->with('ExistingUser')
				->willReturn($this->existingUser);
		$this->verificationToken->expects($this->once())
			->method('create')
			->willReturn('ThisIsMaybeANotSoSecretToken!');
		$this->urlGenerator
			->expects($this->once())
			->method('linkToRouteAbsolute')
			->with('core.lost.resetform', ['userId' => 'ExistingUser', 'token' => 'ThisIsMaybeANotSoSecretToken!'])
			->willReturn('https://example.tld/index.php/lostpassword/');
		$message = $this->getMockBuilder('\OC\Mail\Message')
			->disableOriginalConstructor()->getMock();
		$message
			->expects($this->at(0))
			->method('setTo')
			->with(['test@example.com' => 'Existing User']);
		$message
			->expects($this->at(1))
			->method('setFrom')
			->with(['lostpassword-noreply@localhost' => null]);

		$emailTemplate = $this->createMock(IEMailTemplate::class);
		$emailTemplate->expects($this->any())
			->method('renderHtml')
			->willReturn('HTML body');
		$emailTemplate->expects($this->any())
			->method('renderText')
			->willReturn('text body');

		$message
			->expects($this->at(2))
			->method('useTemplate')
			->with($emailTemplate);

		$this->mailer
			->expects($this->at(0))
			->method('createEMailTemplate')
			->willReturn($emailTemplate);
		$this->mailer
			->expects($this->at(1))
			->method('createMessage')
			->willReturn($message);
		$this->mailer
			->expects($this->at(2))
			->method('send')
			->with($message);

		$response = $this->lostController->email('ExistingUser');
		$expectedResponse = new JSONResponse(['status' => 'success']);
		$expectedResponse->throttle();
		$this->assertEquals($expectedResponse, $response);
	}

	public function testEmailWithMailSuccessful() {
		$this->userManager
				->expects($this->any())
				->method('get')
				->with('test@example.com')
				->willReturn(null);
		$this->userManager
				->expects($this->any())
				->method('getByEmail')
				->with('test@example.com')
				->willReturn([$this->existingUser]);
		$this->verificationToken->expects($this->once())
			->method('create')
			->willReturn('ThisIsMaybeANotSoSecretToken!');
		$this->urlGenerator
			->expects($this->once())
			->method('linkToRouteAbsolute')
			->with('core.lost.resetform', ['userId' => 'ExistingUser', 'token' => 'ThisIsMaybeANotSoSecretToken!'])
			->willReturn('https://example.tld/index.php/lostpassword/');
		$message = $this->getMockBuilder('\OC\Mail\Message')
			->disableOriginalConstructor()->getMock();
		$message
			->expects($this->at(0))
			->method('setTo')
			->with(['test@example.com' => 'Existing User']);
		$message
			->expects($this->at(1))
			->method('setFrom')
			->with(['lostpassword-noreply@localhost' => null]);

		$emailTemplate = $this->createMock(IEMailTemplate::class);
		$emailTemplate->expects($this->any())
			->method('renderHtml')
			->willReturn('HTML body');
		$emailTemplate->expects($this->any())
			->method('renderText')
			->willReturn('text body');

		$message
			->expects($this->at(2))
			->method('useTemplate')
			->with($emailTemplate);

		$this->mailer
			->expects($this->at(0))
			->method('createEMailTemplate')
			->willReturn($emailTemplate);
		$this->mailer
			->expects($this->at(1))
			->method('createMessage')
			->willReturn($message);
		$this->mailer
			->expects($this->at(2))
			->method('send')
			->with($message);

		$response = $this->lostController->email('test@example.com');
		$expectedResponse = new JSONResponse(['status' => 'success']);
		$expectedResponse->throttle();
		$this->assertEquals($expectedResponse, $response);
	}

	public function testEmailCantSendException() {
		$this->userManager
				->expects($this->any())
				->method('get')
				->with('ExistingUser')
				->willReturn($this->existingUser);
		$this->verificationToken->expects($this->once())
			->method('create')
			->willReturn('ThisIsMaybeANotSoSecretToken!');
		$this->urlGenerator
			->expects($this->once())
			->method('linkToRouteAbsolute')
			->with('core.lost.resetform', ['userId' => 'ExistingUser', 'token' => 'ThisIsMaybeANotSoSecretToken!'])
			->willReturn('https://example.tld/index.php/lostpassword/');
		$message = $this->createMock(Message::class);
		$message
			->expects($this->at(0))
			->method('setTo')
			->with(['test@example.com' => 'Existing User']);
		$message
			->expects($this->at(1))
			->method('setFrom')
			->with(['lostpassword-noreply@localhost' => null]);

		$emailTemplate = $this->createMock(IEMailTemplate::class);
		$emailTemplate->expects($this->any())
			->method('renderHtml')
			->willReturn('HTML body');
		$emailTemplate->expects($this->any())
			->method('renderText')
			->willReturn('text body');

		$message
			->expects($this->at(2))
			->method('useTemplate')
			->with($emailTemplate);

		$this->mailer
			->expects($this->at(0))
			->method('createEMailTemplate')
			->willReturn($emailTemplate);
		$this->mailer
			->expects($this->at(1))
			->method('createMessage')
			->willReturn($message);
		$this->mailer
			->expects($this->at(2))
			->method('send')
			->with($message)
			->will($this->throwException(new \Exception()));

		$this->logger->expects($this->exactly(1))
			->method('logException');

		$response = $this->lostController->email('ExistingUser');
		$expectedResponse = new JSONResponse(['status' => 'success']);
		$expectedResponse->throttle();
		$this->assertEquals($expectedResponse, $response);
	}

	public function testSetPasswordUnsuccessful() {
		$this->config->method('getUserValue')
			->with('ValidTokenUser', 'core', 'lostpassword', null)
			->willReturn('encryptedData');
		$this->existingUser->method('getLastLogin')
			->willReturn(12344);
		$this->existingUser->expects($this->once())
			->method('setPassword')
			->with('NewPassword')
			->willReturn(false);
		$this->userManager->method('get')
			->with('ValidTokenUser')
			->willReturn($this->existingUser);
		$this->config->expects($this->never())
			->method('deleteUserValue');

		$response = $this->lostController->setPassword('TheOnlyAndOnlyOneTokenToResetThePassword', 'ValidTokenUser', 'NewPassword', true);
		$expectedResponse = ['status' => 'error', 'msg' => ''];
		$this->assertSame($expectedResponse, $response);
	}

	public function testSetPasswordSuccessful() {
		$this->config->method('getUserValue')
			->with('ValidTokenUser', 'core', 'lostpassword', null)
			->willReturn('encryptedData');
		$this->existingUser->method('getLastLogin')
			->willReturn(12344);
		$this->existingUser->expects($this->once())
			->method('setPassword')
			->with('NewPassword')
			->willReturn(true);
		$this->userManager->method('get')
			->with('ValidTokenUser')
			->willReturn($this->existingUser);
		$this->config->expects($this->once())
			->method('deleteUserValue')
			->with('ValidTokenUser', 'core', 'lostpassword');

		$response = $this->lostController->setPassword('TheOnlyAndOnlyOneTokenToResetThePassword', 'ValidTokenUser', 'NewPassword', true);
		$expectedResponse = ['user' => 'ValidTokenUser', 'status' => 'success'];
		$this->assertSame($expectedResponse, $response);
	}

	public function testSetPasswordExpiredToken() {
		$this->config->method('getUserValue')
			->with('ValidTokenUser', 'core', 'lostpassword', null)
			->willReturn('encryptedData');
		$this->userManager->method('get')
			->with('ValidTokenUser')
			->willReturn($this->existingUser);
		$this->verificationToken->expects($this->atLeastOnce())
			->method('check')
			->willThrowException(new InvalidTokenException(InvalidTokenException::TOKEN_EXPIRED));

		$response = $this->lostController->setPassword('TheOnlyAndOnlyOneTokenToResetThePassword', 'ValidTokenUser', 'NewPassword', true);
		$expectedResponse = [
			'status' => 'error',
			'msg' => 'Could not reset password because the token is expired',
		];
		$this->assertSame($expectedResponse, $response);
	}

	public function testSetPasswordInvalidDataInDb() {
		$this->config->method('getUserValue')
			->with('ValidTokenUser', 'core', 'lostpassword', null)
			->willReturn('invalidEncryptedData');
		$this->userManager
			->method('get')
			->with('ValidTokenUser')
			->willReturn($this->existingUser);
		$this->verificationToken->expects($this->atLeastOnce())
			->method('check')
			->willThrowException(new InvalidTokenException(InvalidTokenException::TOKEN_INVALID_FORMAT));

		$response = $this->lostController->setPassword('TheOnlyAndOnlyOneTokenToResetThePassword', 'ValidTokenUser', 'NewPassword', true);
		$expectedResponse = [
			'status' => 'error',
			'msg' => 'Could not reset password because the token is invalid',
		];
		$this->assertSame($expectedResponse, $response);
	}

	public function testIsSetPasswordWithoutTokenFailing() {
		$this->config->method('getUserValue')
			->with('ValidTokenUser', 'core', 'lostpassword', null)
			->willReturn('aValidtoken');
		$this->userManager->method('get')
			->with('ValidTokenUser')
			->willReturn($this->existingUser);
		$this->verificationToken->expects($this->atLeastOnce())
			->method('check')
			->willThrowException(new InvalidTokenException(InvalidTokenException::TOKEN_MISMATCH));

		$response = $this->lostController->setPassword('', 'ValidTokenUser', 'NewPassword', true);
		$expectedResponse = [
			'status' => 'error',
			'msg' => 'Could not reset password because the token is invalid'
		];
		$this->assertSame($expectedResponse, $response);
	}

	public function testSetPasswordForDisabledUser() {
		$user = $this->createMock(IUser::class);
		$user->expects($this->any())
			->method('isEnabled')
			->willReturn(false);
		$user->expects($this->never())
			->method('setPassword');
		$user->expects($this->any())
			->method('getEMailAddress')
			->willReturn('random@example.org');

		$this->config->method('getUserValue')
			->with('ValidTokenUser', 'core', 'lostpassword', null)
			->willReturn('encryptedData');
		$this->userManager->method('get')
			->with('DisabledUser')
			->willReturn($user);

		$this->verificationToken->expects($this->atLeastOnce())
			->method('check')
			->willThrowException(new InvalidTokenException(InvalidTokenException::USER_UNKNOWN));

		$response = $this->lostController->setPassword('TheOnlyAndOnlyOneTokenToResetThePassword', 'DisabledUser', 'NewPassword', true);
		$expectedResponse = [
			'status' => 'error',
			'msg' => 'Could not reset password because the token is invalid'
		];
		$this->assertSame($expectedResponse, $response);
	}

	public function testSendEmailNoEmail() {
		$user = $this->createMock(IUser::class);
		$user->expects($this->any())
			->method('isEnabled')
			->willReturn(true);
		$this->userManager->method('userExists')
			->with('ExistingUser')
			->willReturn(true);
		$this->userManager->method('get')
			->with('ExistingUser')
			->willReturn($user);

		$this->logger->expects($this->exactly(0))
			->method('logException');
		$this->logger->expects($this->once())
			->method('warning');

		$response = $this->lostController->email('ExistingUser');
		$expectedResponse = new JSONResponse(['status' => 'success']);
		$expectedResponse->throttle();
		$this->assertEquals($expectedResponse, $response);
	}

	public function testSetPasswordEncryptionDontProceedPerUserKey() {
		/** @var IEncryptionModule|\PHPUnit\Framework\MockObject\MockObject $encryptionModule */
		$encryptionModule = $this->createMock(IEncryptionModule::class);
		$encryptionModule->expects($this->once())->method('needDetailedAccessList')->willReturn(true);
		$this->encryptionManager->expects($this->once())->method('getEncryptionModules')
			->willReturn([0 => ['callback' => function () use ($encryptionModule) {
				return $encryptionModule;
			}]]);
		$response = $this->lostController->setPassword('myToken', 'user', 'newpass', false);
		$expectedResponse = ['status' => 'error', 'msg' => '', 'encryption' => true];
		$this->assertSame($expectedResponse, $response);
	}

	public function testSetPasswordDontProceedMasterKey() {
		$encryptionModule = $this->createMock(IEncryptionModule::class);
		$encryptionModule->expects($this->once())->method('needDetailedAccessList')->willReturn(false);
		$this->encryptionManager->expects($this->once())->method('getEncryptionModules')
			->willReturn([0 => ['callback' => function () use ($encryptionModule) {
				return $encryptionModule;
			}]]);
		$this->config->method('getUserValue')
			->with('ValidTokenUser', 'core', 'lostpassword', null)
			->willReturn('encryptedData');
		$this->existingUser->method('getLastLogin')
			->willReturn(12344);
		$this->existingUser->expects($this->once())
			->method('setPassword')
			->with('NewPassword')
			->willReturn(true);
		$this->userManager->method('get')
			->with('ValidTokenUser')
			->willReturn($this->existingUser);
		$this->config->expects($this->once())
			->method('deleteUserValue')
			->with('ValidTokenUser', 'core', 'lostpassword');

		$response = $this->lostController->setPassword('TheOnlyAndOnlyOneTokenToResetThePassword', 'ValidTokenUser', 'NewPassword', false);
		$expectedResponse = ['user' => 'ValidTokenUser', 'status' => 'success'];
		$this->assertSame($expectedResponse, $response);
	}

	public function testTwoUsersWithSameEmail() {
		$user1 = $this->createMock(IUser::class);
		$user1->expects($this->any())
			->method('getEMailAddress')
			->willReturn('test@example.com');
		$user1->expects($this->any())
			->method('getUID')
			->willReturn('User1');
		$user1->expects($this->any())
			->method('isEnabled')
			->willReturn(true);

		$user2 = $this->createMock(IUser::class);
		$user2->expects($this->any())
			->method('getEMailAddress')
			->willReturn('test@example.com');
		$user2->expects($this->any())
			->method('getUID')
			->willReturn('User2');
		$user2->expects($this->any())
			->method('isEnabled')
			->willReturn(true);

		$this->userManager
			->method('get')
			->willReturn(null);

		$this->userManager
			->method('getByEmail')
			->willReturn([$user1, $user2]);

		$this->logger->expects($this->exactly(0))
			->method('logException');
		$this->logger->expects($this->once())
			->method('warning');

		// request password reset for test@example.com
		$response = $this->lostController->email('test@example.com');

		$expectedResponse = new JSONResponse([
			'status' => 'success'
		]);
		$expectedResponse->throttle();

		$this->assertEquals($expectedResponse, $response);
	}


	/**
	 * @return array
	 */
	public function dataTwoUserswithSameEmailOneDisabled(): array {
		return [
			['user1' => true, 'user2' => false],
			['user1' => false, 'user2' => true]
		];
	}

	/**
	 * @dataProvider dataTwoUserswithSameEmailOneDisabled
	 * @param bool $userEnabled1
	 * @param bool $userEnabled2
	 */
	public function testTwoUsersWithSameEmailOneDisabled(bool $userEnabled1, bool $userEnabled2): void {
		$user1 = $this->createMock(IUser::class);
		$user1->method('getEMailAddress')
			->willReturn('test@example.com');
		$user1->method('getUID')
			->willReturn('User1');
		$user1->method('isEnabled')
			->willReturn($userEnabled1);

		$user2 = $this->createMock(IUser::class);
		$user2->method('getEMailAddress')
			->willReturn('test@example.com');
		$user2->method('getUID')
			->willReturn('User2');
		$user2->method('isEnabled')
			->willReturn($userEnabled2);

		$this->userManager
			->method('get')
			->willReturn(null);

		$this->userManager
			->method('getByEmail')
			->willReturn([$user1, $user2]);

		$result = self::invokePrivate($this->lostController, 'findUserByIdOrMail', ['test@example.com']);
		$this->assertInstanceOf(IUser::class, $result);
	}
}
