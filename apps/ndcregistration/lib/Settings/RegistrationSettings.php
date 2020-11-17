<?php

namespace OCA\NdcRegistration\Settings;

use OCP\Settings\ISettings;

use OCA\NdcRegistration\Controller\SettingsController;

class RegistrationSettings implements ISettings {
	public function getForm() {
		$controller = \OC::$server->query(SettingsController::class);
		return $controller->displayPanel();
	}

	public function getSection() {
		return 'ndcregistration';
	}

	public function getPriority() {
		return 50;
	}

	/*
	 * Below for ownCloud
	 */
	public function getPanel() {
		return $this->getForm();
	}

	public function getSectionID() {
		return $this->getSection();
	}
}
