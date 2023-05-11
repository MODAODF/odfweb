<?php
/**
 * @copyright Copyright (c) 2016 Julius Härtl <jus@bitgrid.net>
 *
 * @author Julius Härtl <jus@bitgrid.net>
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
 *  along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 */

namespace OCA\Deck\Controller;

use OCA\Deck\AppInfo\Application;
use OCA\Deck\Service\ConfigService;
use OCA\Deck\Service\PermissionService;
use OCA\Files\Event\LoadSidebar;
use OCA\Viewer\Event\LoadViewer;
use OCP\AppFramework\Http\ContentSecurityPolicy;
use OCP\EventDispatcher\IEventDispatcher;
use OCP\IInitialStateService;
use OCP\IRequest;
use OCP\AppFramework\Http\TemplateResponse;
use OCP\AppFramework\Controller;
use OCA\Deck\Db\CardMapper;
use OCP\IURLGenerator;
use \OCP\AppFramework\Http\RedirectResponse;
use OCA\Deck\Db\Acl;
use OCA\Deck\Service\CardService;

class PageController extends Controller {
	private $permissionService;
	private $initialState;
	private $configService;
	private $eventDispatcher;
	private $cardMapper;
	private $urlGenerator;
	private $cardService;

	public function __construct(
		$AppName,
		IRequest $request,
		PermissionService $permissionService,
		IInitialStateService $initialStateService,
		ConfigService $configService,
		IEventDispatcher $eventDispatcher,
		CardMapper $cardMapper,
		IURLGenerator $urlGenerator,
		CardService $cardService
		) {
		parent::__construct($AppName, $request);

		$this->permissionService = $permissionService;
		$this->initialState = $initialStateService;
		$this->configService = $configService;
		$this->eventDispatcher = $eventDispatcher;
		$this->cardMapper = $cardMapper;
		$this->urlGenerator = $urlGenerator;
		$this->cardService = $cardService;
	}

	/**
	 * Handle main html view from templates/main.php
	 * This will return the main angular application
	 *
	 * @NoAdminRequired
	 * @NoCSRFRequired
	 */
	public function index() {
		$this->initialState->provideInitialState(Application::APP_ID, 'maxUploadSize', (int)\OCP\Util::uploadLimit());
		$this->initialState->provideInitialState(Application::APP_ID, 'canCreate', $this->permissionService->canCreate());
		$this->initialState->provideInitialState(Application::APP_ID, 'config', $this->configService->getAll());

		$this->eventDispatcher->dispatchTyped(new LoadSidebar());
		if (class_exists(LoadViewer::class)) {
			$this->eventDispatcher->dispatchTyped(new LoadViewer());
		}

		$response = new TemplateResponse('deck', 'main');

		if (\OC::$server->getConfig()->getSystemValueBool('debug', false)) {
			$csp = new ContentSecurityPolicy();
			$csp->addAllowedConnectDomain('*');
			$csp->addAllowedScriptDomain('*');
			$response->setContentSecurityPolicy($csp);
		}

		return $response;
	}

	/**
	 * @NoAdminRequired
	 * @NoCSRFRequired
	 */
	public function redirectToCard($cardId): RedirectResponse {
		try {
			$this->permissionService->checkPermission($this->cardMapper, $cardId, Acl::PERMISSION_READ);
			return new RedirectResponse($this->cardService->getCardUrl($cardId));
		} catch (\Exception $e) {
			return new RedirectResponse($this->urlGenerator->linkToRouteAbsolute('deck.page.index'));
		}
	}
}
