<?php
/**
 * ownCloud - registration
 *
 * This file is licensed under the Affero General Public License version 3 or
 * later. See the COPYING file.
 *
 * @author Pellaeon Lin <pellaeon@cnmc.tw>
 * @author Julius Härtl <jus@bitgrid.net>
 * @copyright Pellaeon Lin 2015
 */

namespace OCA\NdcRegistration\Controller;

use \OCP\IRequest;
use \OCP\AppFramework\Http\TemplateResponse;
use \OCP\AppFramework\Http\DataResponse;
use \OCP\AppFramework\Http;
use \OCP\AppFramework\Controller;
use \OCP\IGroupManager;
use \OCP\IL10N;
use \OCP\IConfig;

class SettingsController extends Controller {

	/** @var IL10N */
	private $l10n;
	/** @var IConfig */
	private $config;
	/** @var IGroupManager */
	private $groupmanager;
	/** @var string */
	protected $appName;

	public function __construct($appName, IRequest $request, IL10N $l10n, IConfig $config, IGroupManager $groupmanager) {
		parent::__construct($appName, $request);
		$this->l10n = $l10n;
		$this->config = $config;
		$this->groupmanager = $groupmanager;
		$this->appName = $appName;
	}



	/**
	 * @AdminRequired
	 *
	 * @param string $registered_user_group all newly registered user will be put in this group
	 * @param string $user_storage_capacity User preset storage capacity
	 * @param string $allowed_domains Registrations are only allowed for E-Mailadresses with these domains
	 * @param bool $auto_account_active newly registered users have to be validated by an admin
	 * @return DataResponse
	 */
	public function admin($registered_user_group, $user_storage_capacity, $allowed_domains, $auto_account_active, $allow_duplicate_email) {
		// handle domains
		if (($allowed_domains==='') || ($allowed_domains === null)) {
			$this->config->deleteAppValue($this->appName, 'allowed_domains');
		} else {
			$this->config->setAppValue($this->appName, 'allowed_domains', $allowed_domains);
		}

		// handle user preset storage capacity
		$this->config->setAppValue($this->appName, 'user_storage_capacity', $user_storage_capacity);

		// handle admin validation
		$this->config->setAppValue($this->appName, 'admin_approval_required', $auto_account_active ? "no" : "yes");

		// handle registrate with same email via CSV
		$this->config->setAppValue($this->appName, 'allow_duplicate_email', $allow_duplicate_email ? "yes" : "no");

		// handle groups
		$groups = $this->groupmanager->search('');
		$group_id_list = [];
		foreach ($groups as $group) {
			$group_id_list[] = $group->getGid();
		}
		if ($registered_user_group === 'none') {
			$this->config->deleteAppValue($this->appName, 'registered_user_group');
			return new DataResponse([
				'data' => [
					'message' => (string) $this->l10n->t('Saved'),
				],
				'status' => 'success'

			]);
		} elseif (in_array($registered_user_group, $group_id_list)) {
			$this->config->setAppValue($this->appName, 'registered_user_group', $registered_user_group);
			return new DataResponse([
				'data' => [
					'message' => (string) $this->l10n->t('Saved'),
				],
				'status' => 'success'
			]);
		} else {
			return new DataResponse([
				'data' => [
					'message' => (string) $this->l10n->t('No such group'),
				],
				'status' => 'error'
			], Http::STATUS_NOT_FOUND);
		}
	}
	/**
	 * @AdminRequired
	 *
	 * @return TemplateResponse
	 */
	public function displayPanel() {
		// handle groups
		$groups = $this->groupmanager->search('');
		$group_id_list = [];
		foreach ($groups as $group) {
			$group_id_list[] = $group->getGid();
		}
		$current_value = $this->config->getAppValue($this->appName, 'registered_user_group', 'none');

		// handle user preset storage capacity
		$user_storage_capacity = $this->config->getAppValue($this->appName, 'user_storage_capacity', '1');

		// handle domains
		$allowed_domains = $this->config->getAppValue($this->appName, 'allowed_domains', '');

		// handle admin validation (預設需要管理者審核啟用)
		$admin_approval_required = $this->config->getAppValue($this->appName, 'admin_approval_required', "yes");

		$registration_enabled = $this->config->getAppValue($this->appName, 'registration_enabled', 'yes');

		$allow_duplicate_email = $this->config->getAppValue($this->appName, 'allow_duplicate_email', "yes");

		return new TemplateResponse('ndcregistration', 'admin', [
			'groups' => $group_id_list,
			'user_storage_capacity' => $user_storage_capacity,
			'current' => $current_value,
			'allowed' => $allowed_domains,
			'approval_required' => $admin_approval_required,
			'auto_account_active' => ($admin_approval_required === "yes" ? 'no' : 'yes'),
			'registration_enabled' => $registration_enabled,
			'allow_duplicate_email' => $allow_duplicate_email,
		], '');
	}

	/**
	 * @AdminRequired
	 *
	 * @param string $str
	 * @return DataResponse
	 */
	public function status($str) {
		$this->config->setAppValue($this->appName, 'registration_enabled', $str);
		return new DataResponse([
			'data' => [
				'message' => (string) $this->l10n->t('Saved')
			],
			'status' => 'success'
		]);
	}
}
