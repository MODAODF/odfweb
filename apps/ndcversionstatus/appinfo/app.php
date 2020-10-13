<?php
namespace OCA\NdcVersionStatus\AppInfo;
use OCP\Util;

date_default_timezone_set('Asia/Taipei');

// Get time in DB appconfig
$appConfigs = \OC::$server->getAppConfig()->getValues(false, 'lastCheckTime');
$timeStr_lastCheck = $appConfigs['ndcversionstatus'];
$timeStr_current = date("Y-m-d H:i:s");
$expSec = 7*24*60*60; // 7 days

// Diff timestamp
$needAlert = strtotime($timeStr_lastCheck) + $expSec < strtotime($timeStr_current) ? true : false;
if($needAlert) Util::addScript('ndcversionstatus', 'alertIcon');
