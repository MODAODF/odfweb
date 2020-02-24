<?php
include_once('./TSCSSO.php');
$sso = new TSCSSO;
$res = $sso->GetLoginWebSiteURL();
var_dump($res);
?>
