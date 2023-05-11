<?php
/**
 * @copyright Copyright (c) 2021 Vitor Mattos <vitor@php.rio>
 *
 * @author Vitor Mattos <vitor@php.rio>
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
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 *
 */

namespace OCA\Deck\Controller;

use OCA\Deck\Service\Importer\BoardImportService;
use OCP\AppFramework\Http;
use OCP\AppFramework\Http\DataResponse;
use OCP\AppFramework\OCSController;
use OCP\IRequest;

class BoardImportApiController extends OCSController {
	/** @var BoardImportService */
	private $boardImportService;
	/** @var string */
	private $userId;

	public function __construct(
		string $appName,
		IRequest $request,
		BoardImportService $boardImportService,
		string $userId
	) {
		parent::__construct($appName, $request);
		$this->boardImportService = $boardImportService;
		$this->userId = $userId;
	}

	/**
	 * @NoAdminRequired
	 * @CORS
	 * @NoCSRFRequired
	 */
	public function import(string $system, array $config, array $data): DataResponse {
		$this->boardImportService->setSystem($system);
		$config = json_decode(json_encode($config));
		$config->owner = $this->userId;
		$this->boardImportService->setConfigInstance($config);
		$this->boardImportService->setData(json_decode(json_encode($data)));
		$this->boardImportService->import();
		return new DataResponse($this->boardImportService->getBoard(), Http::STATUS_OK);
	}

	/**
	 * @NoAdminRequired
	 * @CORS
	 * @NoCSRFRequired
	 */
	public function getAllowedSystems(): DataResponse {
		$allowedSystems = $this->boardImportService->getAllowedImportSystems();
		return new DataResponse($allowedSystems, Http::STATUS_OK);
	}

	/**
	 * @NoAdminRequired
	 * @CORS
	 * @NoCSRFRequired
	 */
	public function getConfigSchema(string $name): DataResponse {
		$this->boardImportService->setSystem($name);
		$this->boardImportService->validateSystem();
		$jsonSchemaPath = json_decode(file_get_contents($this->boardImportService->getJsonSchemaPath()));
		return new DataResponse($jsonSchemaPath, Http::STATUS_OK);
	}
}
