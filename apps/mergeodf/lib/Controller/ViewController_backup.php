<?php

namespace OCA\MergeODF\Controller;

use OCP\AppFramework\Controller;
use OCP\AppFramework\Http\ContentSecurityPolicy;
use OCP\AppFramework\Http\NotFoundResponse;
use OCP\AppFramework\Http\RedirectResponse;
use OCP\AppFramework\Http\Response;
use OCP\AppFramework\Http\TemplateResponse;
use OCP\App\IAppManager;
use OCP\Files\Folder;
use OCP\Files\IRootFolder;
use OCP\Files\NotFoundException;
use OCP\IConfig;
use OCP\IL10N;
use OCP\IRequest;
use OCP\IURLGenerator;
use OCP\IUserSession;
use Symfony\Component\EventDispatcher\EventDispatcherInterface;
use Symfony\Component\EventDispatcher\GenericEvent;

/**
 * Class ViewController
 *
 * @package OCA\Files\Controller
 */
class ViewController extends Controller {
	/** @var string */
	protected $appName;
	/** @var IRequest */
	protected $request;
	/** @var IURLGenerator */
	protected $urlGenerator;
	/** @var IL10N */
	protected $l10n;
	/** @var IConfig */
	protected $config;
	/** @var EventDispatcherInterface */
	protected $eventDispatcher;
	/** @var IUserSession */
	protected $userSession;
	/** @var IAppManager */
	protected $appManager;
	/** @var IRootFolder */
	protected $rootFolder;

	public function __construct(string $appName,
		IRequest $request,
		IURLGenerator $urlGenerator,
		IL10N $l10n,
		IConfig $config,
		EventDispatcherInterface $eventDispatcherInterface,
		IUserSession $userSession,
		IAppManager $appManager,
		IRootFolder $rootFolder
	) {
		parent::__construct($appName, $request);
		$this->appName         = $appName;
		$this->request         = $request;
		$this->urlGenerator    = $urlGenerator;
		$this->l10n            = $l10n;
		$this->config          = $config;
		$this->eventDispatcher = $eventDispatcherInterface;
		$this->userSession     = $userSession;
		$this->appManager      = $appManager;
		$this->rootFolder      = $rootFolder;
	}

	/**
	 * @param string $appName
	 * @param string $scriptName
	 * @return string
	 */
	protected function renderScript($appName, $scriptName) {
		$content    = '';
		$appPath    = \OC_App::getAppPath($appName);
		$scriptPath = $appPath . '/' . $scriptName;
		if (file_exists($scriptPath)) {
			// TODO: sanitize path / script name ?
			ob_start();
			include $scriptPath;
			$content = ob_get_contents();
			@ob_end_clean();
		}

		return $content;
	}

	/**
	 * FIXME: Replace with non static code
	 *
	 * @return array
	 * @throws \OCP\Files\NotFoundException
	 */
	protected function getStorageInfo() {
		$dirInfo = \OC\Files\Filesystem::getFileInfo('/', false);

		return \OC_Helper::getStorageInfo('/', $dirInfo);
	}

	/**
	 * @NoCSRFRequired
	 * @NoAdminRequired
	 *
	 * @param string $fileid
	 * @return TemplateResponse|RedirectResponse
	 */
	public function showFile(string $fileid = null): Response {
		// This is the entry point from the `/f/{fileid}` URL which is hardcoded in the server.
		try {
			return $this->redirectToFile($fileid);
		} catch (NotFoundException $e) {
			return new RedirectResponse($this->urlGenerator->linkToRoute('files.view.index', ['fileNotFound' => true]));
		}
	}

	/**
	 * @NoCSRFRequired
	 * @NoAdminRequired
	 *
	 * @param string $dir
	 * @param string $view
	 * @param string $fileid
	 * @return TemplateResponse|RedirectResponse
	 */
	public function index($dir = '', $view = '', $fileid = null, $fileNotFound = false) {
		if ($fileid !== null) {
			try {
				return $this->redirectToFile($fileid);
			} catch (NotFoundException $e) {
				return new RedirectResponse($this->urlGenerator->linkToRoute($this->appName.'.view.app_index', ['fileNotFound' => true]));
			}
		}

		$nav = new \OCP\Template($this->appName, 'appnavigation', '');

		// Load the files we need
		\OCP\Util::addStyle('files', 'merged');
		\OCP\Util::addScript('files', 'merged-index');

		// mostly for the home storage's free space
		// FIXME: Make non static
		$storageInfo = $this->getStorageInfo();

		$user = $this->userSession->getUser()->getUID();


		$collapseClasses = '';

		$favoritesSublistArray = Array();

		$navBarPositionPosition = 6;
		$currentCount           = 0;

		$navItems = \OCA\MergeODF\App::getNavigationManager()->getAll();

		// parse every menu and add the expandedState user value
		foreach ($navItems as $key => $item) {
			if (isset($item['expandedState'])) {
				$navItems[$key]['defaultExpandedState'] = $this->config->getUserValue($this->userSession->getUser()->getUID(), 'files', $item['expandedState'], '0') === '1';
			}
		}

		$nav->assign('navigationItems', $navItems);

		$contentItems = [];

		// render the container content for every navigation item
		foreach ($navItems as $item) {
			$content = '';
			if (isset($item['script'])) {
				$content = $this->renderScript($item['appname'], $item['script']);
			}
			// parse submenus
			if (isset($item['sublist'])) {
				foreach ($item['sublist'] as $subitem) {
					$subcontent = '';
					if (isset($subitem['script'])) {
						$subcontent = $this->renderScript($subitem['appname'], $subitem['script']);
					}
					$contentItems[$subitem['id']] = [
						'id'      => $subitem['id'],
						'content' => $subcontent
					];
				}
			}
			$contentItems[$item['id']] = [
				'id'      => $item['id'],
				'content' => $content
			];
		}

		$event = new GenericEvent(null, ['hiddenFields' => []]);
		$this->eventDispatcher->dispatch('OCA\Files::loadAdditionalScripts', $event);

		$params                                = [];
		$params['owner']                       = $storageInfo['owner'] ?? '';
		$params['ownerDisplayName']            = $storageInfo['ownerDisplayName'] ?? '';
		$params['isPublic']                    = false;
		$params['allowShareWithLink']          = $this->config->getAppValue('core', 'shareapi_allow_links', 'yes');
		$params['defaultFileSorting']          = $this->config->getUserValue($user, 'files', 'file_sorting', 'name');
		$params['defaultFileSortingDirection'] = $this->config->getUserValue($user, 'files', 'file_sorting_direction', 'asc');
		$params['showgridview']				   = $this->config->getUserValue($user, 'files', 'show_grid', false);
		$params['isIE']						   = \OCP\Util::isIE();
		$showHidden                            = (bool) $this->config->getUserValue($this->userSession->getUser()->getUID(), 'files', 'show_hidden', false);
		$params['showHiddenFiles']             = $showHidden ? 1 : 0;
		$params['fileNotFound']                = $fileNotFound ? 1 : 0;
		$params['appNavigation']               = $nav;
		$params['appContents']                 = $contentItems;
		$params['hiddenFields']                = $event->getArgument('hiddenFields');

		$response = new TemplateResponse(
			$this->appName,
			'app_index',
			$params
		);
		$policy = new ContentSecurityPolicy();
		$policy->addAllowedFrameDomain('\'self\'');
		$response->setContentSecurityPolicy($policy);

		return $response;
	}

	/**
	 * Redirects to the file list and highlight the given file id
	 *
	 * @param string $fileId file id to show
	 * @return RedirectResponse redirect response or not found response
	 * @throws \OCP\Files\NotFoundException
	 */
	private function redirectToFile($fileId) {
		$uid        = $this->userSession->getUser()->getUID();
		$baseFolder = $this->rootFolder->getUserFolder($uid);
		$files      = $baseFolder->getById($fileId);
		$params     = [];

		if (empty($files) && $this->appManager->isEnabledForUser('files_trashbin')) {
			$baseFolder     = $this->rootFolder->get($uid . '/files_trashbin/files/');
			$files          = $baseFolder->getById($fileId);
			$params['view'] = 'trashbin';
		}

		if (!empty($files)) {
			$file = current($files);
			if ($file instanceof Folder) {
				// set the full path to enter the folder
				$params['dir'] = $baseFolder->getRelativePath($file->getPath());
			} else {
				// set parent path as dir
				$params['dir'] = $baseFolder->getRelativePath($file->getParent()->getPath());
				// and scroll to the entry
				$params['scrollto'] = $file->getName();
			}

			return new RedirectResponse($this->urlGenerator->linkToRoute($this->appName.'.view.index', $params));
		}
		throw new \OCP\Files\NotFoundException();
	}
}
