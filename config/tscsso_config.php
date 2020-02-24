<?php
define('TESTING', true);	// 測試狀態
define('TSCNameSpace', 'http://tsc.org/');
define('wsAccountId', 'WSAODF');
define('wsAccountPassword', '8B4CB61D677DC07E38C1892436F83F5E7EF47C6167C6C993D2773ABE658A38FF');
if (TESTING)
{
	error_reporting(E_ALL);
	ini_set("display_errors", 1);
	define('ServiceURL', 'http://61.67.74.76:3535/TscWebService/SingleSignOnWs.asmx');	// 服務網址(測試)
}
else
{
	define('ServiceURL', 'http://oprap.taisugar.com.tw:3535/TscWebService/SingleSignOnWs.asmx');	// 服務網址(正式)
}

ini_set('date.timezone', 'Asia/Taipei');
?>
