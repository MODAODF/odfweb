<?php
include_once(__DIR__.'/config/tscsso_config.php');
Class TSCSSO
{
	public function __construct()
        {
		// TODO: 待補
        }

	/*
	 * 解密系統首頁使用者驗證碼
	 * 將網址列xx.aspx?v=validateCode參數v內容(驗證碼)解密產生使用者資訊
	 *
	 * 傳入參數：
	 * ValidateCode - 驗證碼
	 */
	public function DeCodeHomePageValidateCode(string $validateCode)
	{
		$result = $this->_SSOCommand('DeCodeHomePageValidateCode',
					array('ValidateCode' => $validateCode));
		// $result 物件內容：
		// State - 執行結果
		// Description - 原因(成功的話為空字串)
		// UserNo - 員工編號
		// SysKindNo - 系統別
		// GUID -  登入識別碼(單一入口「登入頁面」賦予使用者之 唯一識別碼GUID)
		return $result;
	}

	/*
	 * 產生系統首頁使用者驗證碼 
	 * 將傳入之參數加密產生網址列 xx.aspx?v=validateCode參數v內容(驗證碼) 
	 * 
	 * 傳入參數：
	 * UserNo - 員工編號
	 * SysKindNo - 系統別
	 * GUID - 登入識別碼
	 */
	public function EnCodeHomePageValidateCode(object $decodeResult)
	{
		$result = null;
		if (isset($decodeResult->UserNo) &&
			isset($decodeResult->SysKindNo) &&
			isset($decodeResult->GUID))
		{
			$result = $this->_SSOCommand('EnCodeHomePageValidateCode',
						array('UserNo' => $decodeResult->UserNo,
					  		  'SysKindNo' => $decodeResult->SysKindNo,
					  		  'GUID' => $decodeResult->GUID));
		}
		// $result 物件內容：
		// State - 執行結果
		// ValidateCode - 驗證碼(用於網址列 ?v=xxxxxxxxxxxxxxxxx)
		return $result;
	}

	/*
	 * 取得單一入口登入頁面網址 
	 * 
	 */
	public function GetLoginWebSiteURL()
	{
		$result = $this->_SSOCommand('GetLoginWebSiteURL');
		// $result 物件內容：
		// State - 執行結果
		// URL - 單一入口登入首頁網址
		return $result;
	}

	/*
	 * 判斷使用者有無 Admin 權限
	 * 判斷使用者有無操作指定系統【權限管理】按鍵之權限
	 * 
	 * 傳入參數： 
	 * paramUserNo - 員工編號
	 * paramSysKindNo - 系統別
	 */
	public function VerifyUserAmAuthority(string $UserNo, string $SysKindNo)
	{
		$result = $this->_SSOCommand('VerifyUserAmAuthority',
			array('paramUserNo' => $UserNo, 'paramSysKindNo' => $SysKindNo));
		// $result 物件內容：
		// State - 執行結果 ('true':有管理權限，否則沒有)
		return $result;
	}

	/*
	 * 取得單一入口管理頁面網址
	 * 
	 */
	public function GetAmWebSiteURL()
	{
		$result = $this->_SSOCommand('GetAmWebSiteURL');
		// $result 物件內容：
		// State - 執行結果
		// URL - 單一入口管理頁面網址
		return $result;
	}

	private function _SSOCommand(string $cmd, array $opts = array())
	{
		$header = new SoapHeader(TSCNameSpace, 'CipherHeader',
				array('wsAccountId' => wsAccountId,
					'wsAccountPassword' => wsAccountPassword));
		$client = new SoapClient(ServiceURL.'?WSDL');
		$client->__setSoapHeaders($header);
		$result = $client->__soapCall($cmd, $opts);
		if ($result)
		{
			return $this->_getData($result);
		}
		return null;
	}

	private function _getData($result)
	{
		$key = '';
		$start_tag = '<diffgr:diffgram';
		$end_tag = '</diffgr:diffgram>';
		$vars = get_object_vars($result);
		if (is_array($vars))
		{
			foreach ($vars as $key=>$value)
			{
				break;
			}
			$start_pos = strpos($value->any, $start_tag);
			$end_pos = strrpos($value->any, $end_tag);
			$content = substr($value->any, $start_pos, $end_pos - $start_pos + strlen($end_tag));
			$xml = new SimpleXMLElement($content);
			if (isset($xml->DocumentElement->Table))
			{
				// 外部測試環境若帶 URL 結果，需變更 IP
				if (TESTING && isset($xml->DocumentElement->Table->URL))
				{
					$xml->DocumentElement->Table->URL = str_replace('172.30.156.26', '61.67.74.76', $xml->DocumentElement->Table->URL);
				}
				return $xml->DocumentElement->Table;
			}
		}
		return null;
	}
}
?>
