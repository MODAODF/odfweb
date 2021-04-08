<?php
/**
 * @copyright Copyright (c) 2018, Roeland Jago Douma <roeland@famdouma.nl>
 *
 * @author Roeland Jago Douma <roeland@famdouma.nl>
 * @author John Molakvoæ <skjnldsv@protonmail.com>
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
namespace OCA\Richdocuments\Controller;

use OCA\Richdocuments\Db\DirectMapper;
use OCA\Richdocuments\Service\FederationService;
use OCA\Richdocuments\TemplateManager;
use OCP\AppFramework\Http\DataResponse;
use OCP\AppFramework\OCS\OCSBadRequestException;
use OCP\AppFramework\OCS\OCSNotFoundException;
use OCP\Files\File;
use OCP\Files\Folder;
use OCP\Files\IRootFolder;
use OCP\Files\NotFoundException;
use OCP\IRequest;
use OCP\IURLGenerator;

class OCSController extends \OCP\AppFramework\OCSController {

	/** @var IRootFolder */
	private $rootFolder;

	/** @var string */
	private $userId;

	/** @var DirectMapper */
	private $directMapper;

	/** @var IURLGenerator */
	private $urlGenerator;

	/** @var TemplateManager */
	private $manager;

	/** @var FederationService */
	private $federationService;

	/**
	 * OCS controller
	 *
	 * @param string $appName
	 * @param IRequest $request
	 * @param IRootFolder $rootFolder
	 * @param string $userId
	 * @param DirectMapper $directMapper
	 * @param IURLGenerator $urlGenerator
	 * @param TemplateManager $manager
	 */
	public function __construct(string $appName,
		IRequest $request,
		IRootFolder $rootFolder,
		$userId,
		DirectMapper $directMapper,
		IURLGenerator $urlGenerator,
		TemplateManager $manager,
		FederationService $federationService
	) {
		parent::__construct($appName, $request);

		$this->rootFolder   = $rootFolder;
		$this->userId       = $userId;
		$this->directMapper = $directMapper;
		$this->urlGenerator = $urlGenerator;
		$this->manager      = $manager;
		$this->federationService = $federationService;
	}

	/**
	 * @NoAdminRequired
	 *
	 * Init an editing session
	 *
	 * @param int $fileId
	 * @return DataResponse
	 * @throws OCSNotFoundException|OCSBadRequestException
	 */
	public function create($fileId) {
		try {
			$userFolder = $this->rootFolder->getUserFolder($this->userId);
			$nodes      = $userFolder->getById($fileId);

			if ($nodes === []) {
				throw new OCSNotFoundException();
			}

			$node = $nodes[0];
			if ($node instanceof Folder) {
				throw new OCSBadRequestException('Cannot view folder');
			}

			$direct = $this->directMapper->newDirect($this->userId, $fileId);

			return new DataResponse([
				'url' => $this->urlGenerator->linkToRouteAbsolute('richdocuments.directView.show', [
					'token' => $direct->getToken()
				])
			]);
		} catch (NotFoundException $e) {
			throw new OCSNotFoundException();
		}
	}

	/**
	 * @NoAdminRequired
	 *
	 * @param string $type The template type
	 * @return DataResponse
	 * @throws OCSBadRequestException
	 */
	public function getTemplates($type) {
		if (array_key_exists($type, TemplateManager::$tplTypes)) {
			$templates = $this->manager->getAllFormatted($type);
			return new DataResponse($templates);
		}
		throw new OCSBadRequestException('Wrong type');
	}

	/**
	 * @NoAdminRequired
	 *
	 * @param string $path Where to create the document
	 * @param int $template The template id
	 */
	public function createFromTemplate($path, $template) {
		if ($path === null || $template === null) {
			throw new OCSBadRequestException('path and template must be set');
		}

		if (!$this->manager->isTemplate($template)) {
			throw new OCSBadRequestException('Invalid template provided');
		}

		$info = $this->mb_pathinfo($path);

		$userFolder = $this->rootFolder->getUserFolder($this->userId);
		$folder = $userFolder->get($info['dirname']);
		$name = $folder->getNonExistingName($info['basename']);
		$file = $folder->newFile($name);

		try {
			$direct = $this->directMapper->newDirect($this->userId, $template, $file->getId());

			return new DataResponse([
				'url' => $this->urlGenerator->linkToRouteAbsolute('richdocuments.directView.show', [
					'token' => $direct->getToken()
				])
			]);
		} catch (NotFoundException $e) {
			throw new OCSNotFoundException();
		}
	}

	private function mb_pathinfo($filepath) {
		$result = [];
		preg_match('%^(.*?)[\\\\/]*(([^/\\\\]*?)(\.([^\.\\\\/]+?)|))[\\\\/\.]*$%im', ltrim('/' . $filepath), $matches);
		if($matches[1]) {
			$result['dirname'] = $matches[1];
		}
		if($matches[2]) {
			$result['basename'] = $matches[2];
		}
		if($matches[5]) {
			$result['extension'] = $matches[5];
		}
		if($matches[3]) {
			$result['filename'] = $matches[3];
		}
		return $result;
	}
}
