<?php
/**
 * @copyright Copyright (c) 2020 Julius Härtl <jus@bitgrid.net>
 *
 * @author Julius Härtl <jus@bitgrid.net>
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
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 *
 */

declare(strict_types=1);


namespace OCA\Deck\Service;

use OCA\Circles\CirclesManager;
use OCA\Circles\Model\Circle;
use OCA\Circles\Model\Member;
use OCA\Circles\Model\Probes\CircleProbe;
use OCP\App\IAppManager;
use Throwable;

/**
 * Wrapper around circles app API since it is not in a public namespace so we need to make sure that
 * having the app disabled is properly handled
 */
class CirclesService {
	private $circlesEnabled;

	private $userCircleCache = [];

	public function __construct(IAppManager $appManager) {
		$this->circlesEnabled = $appManager->isEnabledForUser('circles');
	}

	public function isCirclesEnabled(): bool {
		return $this->circlesEnabled;
	}

	public function getCircle(string $circleId): ?Circle {
		if (!$this->circlesEnabled) {
			return null;
		}

		try {

			// Enforce current user condition since we always want the full list of members
			/** @var CirclesManager $circlesManager */
			$circlesManager = \OC::$server->get(CirclesManager::class);
			$circlesManager->startSuperSession();
			return $circlesManager->getCircle($circleId);
		} catch (Throwable $e) {
		}
		return null;
	}

	public function isUserInCircle(string $circleId, string $userId): bool {
		if (!$this->circlesEnabled) {
			return false;
		}

		if (isset($this->userCircleCache[$circleId][$userId])) {
			return $this->userCircleCache[$circleId][$userId];
		}

		try {
			/** @var CirclesManager $circlesManager */
			$circlesManager = \OC::$server->get(CirclesManager::class);
			$federatedUser = $circlesManager->getFederatedUser($userId, Member::TYPE_USER);
			$circlesManager->startSession($federatedUser);
			$circle = $circlesManager->getCircle($circleId);
			$member = $circle->getInitiator();
			$isUserInCircle = $member !== null && $member->getLevel() >= Member::LEVEL_MEMBER;

			if (!isset($this->userCircleCache[$circleId])) {
				$this->userCircleCache[$circleId] = [];
			}
			$this->userCircleCache[$circleId][$userId] = $isUserInCircle;

			return $isUserInCircle;
		} catch (Throwable $e) {
		}
		return false;
	}

	/**
	 * @param string $userId
	 * @return string[] circle single ids
	 */
	public function getUserCircles(string $userId): array {
		if (!$this->circlesEnabled) {
			return [];
		}

		try {
			/** @var CirclesManager $circlesManager */
			$circlesManager = \OC::$server->get(CirclesManager::class);
			$federatedUser = $circlesManager->getFederatedUser($userId, Member::TYPE_USER);
			$circlesManager->startSession($federatedUser);
			$probe = new CircleProbe();
			$probe->mustBeMember();
			return array_map(function (Circle $circle) {
				return $circle->getSingleId();
			}, $circlesManager->getCircles($probe));
		} catch (Throwable $e) {
		}
		return [];
	}
}
