OC.L10N.register(
    "core",
    {
    "Please select a file." : "請選取一個檔案",
    "File is too big" : "檔案太大",
    "The selected file is not an image." : "選取的檔案不是圖片檔",
    "The selected file cannot be read." : "選取的檔案無法讀取",
    "Invalid file provided" : "提供的檔案無效",
    "No image or file provided" : "未提供圖片或檔案",
    "Unknown filetype" : "未知的檔案類型",
    "Invalid image" : "圖片無效",
    "An error occurred. Please contact your admin." : "發生錯誤，請聯絡管理員。",
    "No temporary profile picture available, try again" : "沒有臨時用的大頭貼，請再試一次",
    "No crop data provided" : "未設定剪裁",
    "No valid crop data provided" : "未提供有效的剪裁設定",
    "Crop is not square" : "剪裁設定不是正方形",
    "State token does not match" : "狀態 token 不相符",
    "Could not complete login" : "無法完成登入",
    "Your login token is invalid or has expired" : "您的登入 token 無效或是已經過期",
    "Password reset is disabled" : "密碼重設已停用",
    "Couldn't reset password because the token is invalid" : "無法重設密碼因為 token 無效",
    "Couldn't reset password because the token is expired" : "無法重設密碼，因為 token 過期",
    "%s password reset" : "%s 密碼重設",
    "Password reset" : "密碼重設",
    "Click the following button to reset your password. If you have not requested the password reset, then ignore this email." : "點選下方的按鈕來重設您的密碼。若您沒有要求重設密碼，請忽略這封信件。",
    "Click the following link to reset your password. If you have not requested the password reset, then ignore this email." : "點選下方的連結以重設您的密碼。 如果您沒有要求重設密碼，請忽略這封信件。",
    "Reset your password" : "重設您的密碼",
    "Nextcloud Server" : "Nextcloud 伺服器",
    "Some of your link shares have been removed" : "部分分享連結己被移除",
    "Due to a security bug we had to remove some of your link shares. Please see the link for more information." : "由於安全性問題，我們必須移除您一部分的連結分享。查看更多資訊請點選連結。",
    "Preparing update" : "準備更新",
    "[%d / %d]: %s" : "[%d / %d]: %s",
    "Repair step:" : "修復步驟：",
    "Repair info:" : "修復資訊：",
    "Repair warning:" : "修復警告：",
    "Repair error:" : "修復錯誤：",
    "Please use the command line updater because automatic updating is disabled in the config.php." : "由於自動更新功能已在 config.php 檔案中設定停用，請使用命令列更新系統。",
    "[%d / %d]: Checking table %s" : "[%d / %d]: 檢查資料表 %s",
    "Turned on maintenance mode" : "啟用維護模式",
    "Turned off maintenance mode" : "停用維護模式",
    "Maintenance mode is kept active" : "伺服器正處於維護模式",
    "Updating database schema" : "正在更新資料庫格式",
    "Updated database" : "已更新資料庫",
    "Checking whether the database schema can be updated (this can take a long time depending on the database size)" : "正在檢查是否有可更新的資料庫格式（若資料庫較大，可能需要一段時間）",
    "Checked database schema update" : "已檢查資料庫格式更新",
    "Checking updates of apps" : "正在檢查應用程式更新",
    "Checking for update of app \"%s\" in appstore" : "正在檢查 %s 的更新",
    "Update app \"%s\" from appstore" : "更新 %s",
    "Checked for update of app \"%s\" in appstore" : "正在檢查 %s 的更新",
    "Checking whether the database schema for %s can be updated (this can take a long time depending on the database size)" : "檢查 %s 是否有可更新的資料庫格式（若資料庫較大，可能需要一段時間）",
    "Checked database schema update for apps" : "已檢查應用程式資料庫格式更新",
    "Updated \"%1$s\" to %2$s" : "已從 %1$s 更新至 %2$s",
    "Set log level to debug" : "設定記錄至除錯層級",
    "Reset log level" : "重設記錄層級",
    "Starting code integrity check" : "開始檢查程式碼完整性",
    "Finished code integrity check" : "已完成程式碼完整性檢查",
    "%s (incompatible)" : "%s （不相容）",
    "Already up to date" : "此版本為最新版本",
    "Your web server is not yet properly set up to allow file synchronization, because the WebDAV interface seems to be broken." : "WebDAV 介面似乎為故障狀態，導致您的網頁伺服器無法提供檔案同步功能。",
    "Your web server is not properly set up to resolve \"{url}\". Further information can be found in the <a target=\"_blank\" rel=\"noreferrer noopener\" href=\"{docLink}\">documentation</a>." : "您的網頁伺服器設定不正確，因此無法解析 \"{url}\" ，請至<a target=\"_blank\" rel=\"noreferrer noopener\" href=\"{docLink}\">說明文件</a>瞭解更多資訊。",
    "Your web server is not properly set up to resolve \"{url}\". This is most likely related to a web server configuration that was not updated to deliver this folder directly. Please compare your configuration against the shipped rewrite rules in \".htaccess\" for Apache or the provided one in the documentation for Nginx at it's <a target=\"_blank\" rel=\"noreferrer noopener\" href=\"{docLink}\">documentation page</a>. On Nginx those are typically the lines starting with \"location ~\" that need an update." : "您的伺服器並未正確的設定解析 \"{url}\"。這可能與伺服器的設定未更新為直接傳送此資料夾有關。請檢查 Apache 的 \".htaccess\" 檔案，或在 <a target=\"_blank\" rel=\"noreferrer noopener\" href=\"{docLink}\">Nginx 說明文件</a>中查閱重寫規則。在 Nginx 環境中，通常是在由 \"location ~\" 開始的那行需要做調整。",
    "Your web server is not properly set up to deliver .woff2 files. This is typically an issue with the Nginx configuration. For Nextcloud 15 it needs an adjustement to also deliver .woff2 files. Compare your Nginx configuration to the recommended configuration in our <a target=\"_blank\" rel=\"noreferrer noopener\" href=\"{docLink}\">documentation</a>." : "您的伺服器並未正確的設定，因此無法傳遞 .woff2 的檔案。這通常是因為 Nginx 的設定問題所導致。在 Nextcloud 15 中，需要一些調整才能一並傳遞  .woff2 的檔案。請檢查您的 Nginx 設定，和Nextcloud<a target=\"_blank\" rel=\"noreferrer noopener\" href=\"{docLink}\">說明文件</a>中提到的建議設定。",
    "PHP does not seem to be setup properly to query system environment variables. The test with getenv(\"PATH\") only returns an empty response." : "PHP 設定似乎不完整，導致無法正確取得系統環境變數，因為偵測到 getenv(\"PATH\") 回傳資料為空值",
    "Please check the <a target=\"_blank\" rel=\"noreferrer noopener\" href=\"{docLink}\">installation documentation ↗</a> for PHP configuration notes and the PHP configuration of your server, especially when using php-fpm." : "請您參考 <a target=\\\"_blank\\\" href=\\\"%s\\\">安裝說明 ↗</a> 來設定 PHP ，尤其如果您使用 php-fpm。",
    "The read-only config has been enabled. This prevents setting some configurations via the web-interface. Furthermore, the file needs to be made writable manually for every update." : "「唯讀設定檔」已經啟用，這樣可以防止來自網頁端的設定操作，每次需要更改設定時，都需要手動將設定檔暫時改為可讀寫。",
    "Your database does not run with \"READ COMMITTED\" transaction isolation level. This can cause problems when multiple actions are executed in parallel." : "您的資料庫並未使用 \"READ COMMITTED\" 的交易隔離等級。當有多個行為平行進行時，這可能會造成問題。",
    "The PHP module \"fileinfo\" is missing. It is strongly recommended to enable this module to get the best results with MIME type detection." : "未偵測到 PHP 模組 'fileinfo'。強烈建議啟用這個模組，以取得最好的 MIME 檔案類型偵測支援。",
    "Transactional file locking is disabled, this might lead to issues with race conditions. Enable \"filelocking.enabled\" in config.php to avoid these problems. See the <a target=\"_blank\" rel=\"noreferrer noopener\" href=\"{docLink}\">documentation ↗</a> for more information." : "事務型文件鎖定的功能已經取消，這可能會造成競態條件，請在 config.php 中啟用 \"filelocking.enabled\" 以避免出現這樣的問題，請參考<a target=\"_blank\" rel=\"noreferrer noopener\" href=\"{docLink}\">說明文件 ↗</a> 來了解更多的資訊。",
    "If your installation is not installed at the root of the domain and uses system cron, there can be issues with the URL generation. To avoid these problems, please set the \"overwrite.cli.url\" option in your config.php file to the webroot path of your installation (suggestion: \"{suggestedOverwriteCliURL}\")" : "如果您的安裝路徑不在網域的最上層，並且使用 cron 作為排程器，URL 的生成可能會有問題，為了避免這樣的狀況，請您在 config.php 檔案裡設定 overwrite.cli.url 為您安裝的 webroot 路徑。（建議值：\"{suggestedOverwriteCliURL}\"）",
    "It was not possible to execute the cron job via CLI. The following technical errors have appeared:" : " 無法透過 CLI 來執行排程工作，發生以下技術性錯誤：",
    "Last background job execution ran {relativeTime}. Something seems wrong." : "上次背景工作是於 {relativeTime} 前執行，似乎很久沒有執行了，有點問題",
    "Check the background job settings" : "請檢查背景工作的設定",
    "This server has no working Internet connection: Multiple endpoints could not be reached. This means that some of the features like mounting external storage, notifications about updates or installation of third-party apps will not work. Accessing files remotely and sending of notification emails might not work, either. Establish a connection from this server to the Internet to enjoy all features." : "伺服器沒有網際網路連線（無法與多個端點取得聯繫），有些功能，像是外部儲存、應用程式更新版通知將無法運作。從遠端存取資料或是寄送 email 通知可能也無法運作。建議您設定好網際網路連線以使用所有功能。",
    "No memory cache has been configured. To enhance performance, please configure a memcache, if available. Further information can be found in the <a target=\"_blank\" rel=\"noreferrer noopener\" href=\"{docLink}\">documentation</a>." : "您沒有設定記憶體快取 (memcache)，如果可以，請完成設定來提升效能。更多資訊請查閱<a target=\"_blank\" rel=\"noreferrer noopener\" href=\"{docLink}\">說明文件</a>",
    "No suitable source for randomness found by PHP which is highly discouraged for security reasons. Further information can be found in the <a target=\"_blank\" rel=\"noreferrer noopener\" href=\"{docLink}\">documentation</a>." : "PHP無法取得合適的亂數產生源。為了安全性考量，不建議如此做。更多資訊參考<a target=\"_blank\" rel=\"noreferrer noopener\" href=\"{docLink}\">documentation</a>",
    "You are currently running PHP {version}. Upgrade your PHP version to take advantage of <a target=\"_blank\" rel=\"noreferrer noopener\" href=\"{phpLink}\">performance and security updates provided by the PHP Group</a> as soon as your distribution supports it." : "您目前正運行 PHP {version} ，我們建議您升級 PHP 到您的發行版所支援的最新版本，以獲得 <a target=\"_blank\" rel=\"noreferrer noopener\" href=\"{phpLink}\">PHP 開發團隊提供的效能與安全性更新</a>。",
    "Nextcloud 19 is the last release supporting PHP 7.2. Nextcloud 20 requires at least PHP 7.3." : "Nextcloud 19 是最後一個支援 PHP 7.2 的版本，Nextcloud 20 將要求至少要使用 PHP 7.3。",
    "The reverse proxy header configuration is incorrect, or you are accessing Nextcloud from a trusted proxy. If not, this is a security issue and can allow an attacker to spoof their IP address as visible to the Nextcloud. Further information can be found in the <a target=\"_blank\" rel=\"noreferrer noopener\" href=\"{docLink}\">documentation</a>." : "偵測到您的反向代理標頭設定不正確，但也有可能是因為您目前正透過信任的代理伺服器存取 Nextcloud。若您目前不是透過信任的代理伺服器存取 Nextcloud，這就是一個安全性問題，允許攻擊者對 Nextcloud 假冒 IP 位址。更多資訊請查閱<a target=\"_blank\" rel=\"noreferrer noopener\" href=\"{docLink}\">說明文件</a>。",
    "Memcached is configured as distributed cache, but the wrong PHP module \"memcache\" is installed. \\OC\\Memcache\\Memcached only supports \"memcached\" and not \"memcache\". See the <a target=\"_blank\" rel=\"noreferrer noopener\" href=\"{wikiLink}\">memcached wiki about both modules</a>." : "您已經設定 Memcached 為分散式快取，但是您安裝了錯誤的 PHP 模組 \"memcache\" ， Nextcloud 的 \\OC\\Memcache\\Memcached 元件不支援 \"memcache\" 模組，僅支援 \"memcached\" 模組。若想要更加瞭解這兩個模組，請閱讀 <a target=\"_blank\" rel=\"noreferrer noopener\" href=\"{wikiLink}\">memcached wiki</a>。",
    "Some files have not passed the integrity check. Further information on how to resolve this issue can be found in the <a target=\"_blank\" rel=\"noreferrer noopener\" href=\"{docLink}\">documentation</a>. (<a href=\"{codeIntegrityDownloadEndpoint}\">List of invalid files…</a> / <a href=\"{rescanEndpoint}\">Rescan…</a>)" : "有些檔案並未通過完整性檢查。可參閱詳細資訊，如我們的<a target=\"_blank\" rel=\"noreferrer\" href=\"{docLink}\">說明文件</a>（<a href=\"{codeIntegrityDownloadEndpoint}\">無效檔案列表</a>/<a href=\"{rescanEndpoint}\">重新檢查</a>）以解決這些問題。",
    "The PHP OPcache module is not loaded. <a target=\"_blank\" rel=\"noreferrer noopener\" href=\"{docLink}\">For better performance it is recommended</a> to load it into your PHP installation." : "PHP 的 OPcache 模組並未被載入。 <a target=\"_blank\" rel=\"noreferrer noopener\" href=\"{docLink}\">為了提供更好的效能</a>，建議將此PHP模組載入。",
    "The PHP OPcache is not properly configured. <a target=\"_blank\" rel=\"noreferrer noopener\" href=\"{docLink}\">For better performance it is recommended</a> to use the following settings in the <code>php.ini</code>:" : "PHP 的 OPcache 功能並未被妥善設定。<a target=\"_blank\" rel=\"noreferrer\" href=\"{docLink}\">為了有更好的效能表現</a>，我們建議在 <code>php.ini</code> 設定檔中使用以下設定：",
    "The PHP function \"set_time_limit\" is not available. This could result in scripts being halted mid-execution, breaking your installation. Enabling this function is strongly recommended." : "無法取得 PHP 中的 \"set_time_limit\" 函式。這可能導致執行過程被終止並造成不完整安裝。我們強烈建議啟用該函式。",
    "Your PHP does not have FreeType support, resulting in breakage of profile pictures and the settings interface." : "您的 PHP 並未啟用 FreeType 支援，導致大頭貼產生器和設定界面無法使用。",
    "Missing index \"{indexName}\" in table \"{tableName}\"." : "在資料表 \"{tableName}\" 中，找不到索引值 \"{indexName}\" 。",
    "The database is missing some indexes. Due to the fact that adding indexes on big tables could take some time they were not added automatically. By running \"occ db:add-missing-indices\" those missing indexes could be added manually while the instance keeps running. Once the indexes are added queries to those tables are usually much faster." : "資料庫缺少了某些索引值。由於在一個龐大的表中新增索引需要一些時間，因此他們並不會被自動新增。您可執行 \"occ db:add-missing-indices\" 來手動新增那些遺失的索引值。當索引值新增完成後，查詢的速度通常會變得快許多",
    "This instance is missing some recommended PHP modules. For improved performance and better compatibility it is highly recommended to install them." : "您的 Nextcloud 缺少了某些建議的 PHP 模組。為了提升效能與相容性，強烈建議您安裝這些 PHP 模組。",
    "Some columns in the database are missing a conversion to big int. Due to the fact that changing column types on big tables could take some time they were not changed automatically. By running 'occ db:convert-filecache-bigint' those pending changes could be applied manually. This operation needs to be made while the instance is offline. For further details read <a target=\"_blank\" rel=\"noreferrer noopener\" href=\"{docLink}\">the documentation page about this</a>." : "資料庫的有些欄位缺少big int.格式轉換。因為攔位格式轉換需要一些時間，所以沒有自動轉換。你可以執行'occ db:convert-filecache-bigin'手動完成轉換，轉換時Nextcloud服務必須處於離線狀態。詳情請參閱<a target=\"_blank\" rel=\"noreferrer noopener\" href=\"{docLink}\">the documentation page about this</a>",
    "SQLite is currently being used as the backend database. For larger installations we recommend that you switch to a different database backend." : "目前您的後端資料庫使用 SQLite，在大型服務當中，我們建議您使用其他的資料庫後端。",
    "This is particularly recommended when using the desktop client for file synchronisation." : "若您使用電腦客戶端來同步檔案，非常建議您這麼做。",
    "To migrate to another database use the command line tool: 'occ db:convert-type', or see the <a target=\"_blank\" rel=\"noreferrer noopener\" href=\"{docLink}\">documentation ↗</a>." : "若要遷移至另一個資料庫，請使用命令列工具： 'occ db:convert-type' ，或是查閱<a target=\"_blank\" rel=\"noreferrer noopener\" href=\"{docLink}\">說明文件</a>。",
    "Use of the the built in php mailer is no longer supported. <a target=\"_blank\" rel=\"noreferrer noopener\" href=\"{docLink}\">Please update your email server settings ↗<a/>." : "我們將不再支援使用 PHP mailer 發送電子郵件。<a target=\"_blank\" rel=\"noreferrer noopener\" href=\"{docLink}\">請更新您電子郵件伺服器的相關設定<a/>。",
    "The PHP memory limit is below the recommended value of 512MB." : "目前的 PHP 的記憶體限制設定低於建議值 512MB",
    "Some app directories are owned by a different user than the web server one. This may be the case if apps have been installed manually. Check the permissions of the following app directories:" : "某些應用程式的資料夾所有者與網頁伺服器預設使用者不同。這可能是因為您手動安裝了這些應用程式。請檢查以下應用程式資料夾的相關權限：",
    "MySQL is used as database but does not support 4-byte characters. To be able to handle 4-byte characters (like emojis) without issues in filenames or comments for example it is recommended to enable the 4-byte support in MySQL. For further details read <a target=\"_blank\" rel=\"noreferrer noopener\" href=\"{docLink}\">the documentation page about this</a>." : "您的 MySQL 資料庫並不支援 4-byte 的字元。為了能處理檔案名稱中，或是註記中的 4-byte 的字元 (如表情符號等) 。建議您啟用 MySQL 中支援 4-byte 的字元的功能。詳情請見<a target=\"_blank\" rel=\"noreferrer noopener\" href=\"{docLink}\">此文件中關於此項目的說明</a>。",
    "This instance uses an S3 based object store as primary storage. The uploaded files are stored temporarily on the server and thus it is recommended to have 50 GB of free space available in the temp directory of PHP. Check the logs for full details about the path and the available space. To improve this please change the temporary directory in the php.ini or make more space available in that path." : "此站台使用Amazon S3物件儲存為主要儲存區。上傳檔案會暫存在伺服器，因此建議PHP的暫存資料夾最少要有50GB可用容量。請在登錄檔中查閱關於資料夾路徑及可用容量的詳細資訊。要增進效能，請在php.ini中變更暫存資料夾位置，或將該資料夾容量增加。",
    "Error occurred while checking server setup" : "檢查伺服器設定時發生錯誤",
    "Your data directory and files are probably accessible from the Internet. The .htaccess file is not working. It is strongly recommended that you configure your web server so that the data directory is no longer accessible, or move the data directory outside the web server document root." : "您的資料目錄和檔案看來可以被公開存取，這表示 .htaccess 設定檔並未生效，我們強烈建議您設定網頁伺服器，拒絕公開存取資料目錄，或者將您的資料目錄移出網頁伺服器根目錄。",
    "The \"{header}\" HTTP header is not set to \"{expected}\". This is a potential security or privacy risk, as it is recommended to adjust this setting accordingly." : "目前 HTTP 的 {header} 標頭設定並不是 \"{expected}\" ，這是一個潛在的安全性和隱私風險，我們建議調整此項設定。",
    "The \"{header}\" HTTP header is not set to \"{expected}\". Some features might not work correctly, as it is recommended to adjust this setting accordingly." : "目前 HTTP 的 {header} 標頭設定並不是 \"{expected}\" ，這將讓某些功能無法正常運作，我們建議修正此項設定。",
    "The \"{header}\" HTTP header doesn't contain \"{expected}\". This is a potential security or privacy risk, as it is recommended to adjust this setting accordingly." : "目前 HTTP 的 {header} 標頭設定並不包防 \"{expected}\" ，這是一個潛在的安全性和隱私風險，建議調整此項設定。",
    "The \"{header}\" HTTP header is not set to \"{val1}\", \"{val2}\", \"{val3}\", \"{val4}\" or \"{val5}\". This can leak referer information. See the <a target=\"_blank\" rel=\"noreferrer noopener\" href=\"{link}\">W3C Recommendation ↗</a>." : "目前 HTTP 的 {header} 標頭設定並不是  \"{val1}\", \"{val2}\", \"{val3}\", \"{val4}\" 或 \"{val5}\"，這將會洩漏一些訊息。<a target=\"_blank\" rel=\"noreferrer noopener\" href=\"{link}\">請參考 W3C建議文件</a>。",
    "The \"Strict-Transport-Security\" HTTP header is not set to at least \"{seconds}\" seconds. For enhanced security, it is recommended to enable HSTS as described in the <a href=\"{docUrl}\" rel=\"noreferrer noopener\">security tips ↗</a>." : "HTTP \"Strict-Transport-Security\" 標頭並未被設定持續至少 {seconds} 秒。為了提高安全性，我們在<a href=\"{docUrl}\" rel=\"noreferrer\">安全建議</a>中有詳述並建議啟用 HSTS。",
    "Accessing site insecurely via HTTP. You are strongly advised to set up your server to require HTTPS instead, as described in the <a href=\"{docUrl}\">security tips ↗</a>." : "您正在透過不安全的 HTTP 存取網站，強烈建議您設定您的伺服器啟用 HTTPS ，更多資訊請查閱<a href=\"{docUrl}\">安全建議</a>。",
    "unknown text" : "未知的文字",
    "Hello world!" : "哈囉，世界！",
    "sunny" : "晴朗的",
    "Hello {name}, the weather is {weather}" : "哈囉 {name}，今天天氣 {weather}",
    "Hello {name}" : "哈囉 {name}",
    "<strong>These are your search results<script>alert(1)</script></strong>" : "<strong>以下是您的搜尋結果<script>警告(1)</script></strong>",
    "new" : "新",
    "_download %n file_::_download %n files_" : ["下載 %n 個檔案"],
    "The update is in progress, leaving this page might interrupt the process in some environments." : "正在更新，在某些狀況下，離開本頁面可能會導致更新中斷",
    "Update to {version}" : "更新到 {version}",
    "Update to the latest version" : "更新至最新版本",
    "An error occurred." : "發生錯誤",
    "Please reload the page." : "請重新整理頁面",
    "The update was unsuccessful. For more information <a href=\"{url}\">check our forum post</a> covering this issue." : "更新失敗，檢視<a href=\"{url}\">論壇上的文章</a>來瞭解更多",
    "The update was unsuccessful. Please report this issue to the <a href=\"https://github.com/nextcloud/server/issues\" target=\"_blank\">Nextcloud community</a>." : "更新不成功。請在<a href=\"https://github.com/nextcloud/server/issues\" target=\"_blank\">Nextcloud社群</a>回報此問題。",
    "Continue to Nextcloud" : "繼續前往 Nextcloud",
    "_The update was successful. Redirecting you to Nextcloud in %n second._::_The update was successful. Redirecting you to Nextcloud in %n seconds._" : ["更新成功，將在 %n 秒後重導向至 Nextcloud"],
    "Searching other places" : "搜尋其他位置",
    "No search results in other folders for {tag}{filter}{endtag}" : "{tag}{filter}{endtag} 在其他資料夾中沒有比對結果",
    "_{count} search result in another folder_::_{count} search results in other folders_" : ["在其他資料夾中有 {count} 比結果"],
    "Log in" : "登入",
    "Logging in …" : "正在登入…",
    "Server side authentication failed!" : "伺服器端認證失敗！",
    "Please contact your administrator." : "請聯絡系統管理員",
    "An internal error occurred." : "發生內部錯誤",
    "Please try again or contact your administrator." : "請重試或聯絡系統管理員",
    "Username or email" : "使用者名稱 或 電子郵件",
    "Username or\temail" : "使用者名稱 或\t電子郵件",
    "Password" : "密碼",
    "Captcha" : "驗證碼",
    "Click to refresh captcha" : "點選更換驗證碼",
    "Wrong username or password." : "錯誤的使用者名稱 或 密碼",
    "User disabled" : "使用者已遭停用",
    "Wrong captcha" : "驗證碼錯誤",
    "We have detected multiple invalid login attempts from your IP. Therefore your next login is throttled up to 30 seconds." : "您的 IP 多次嘗試登入無效，下一次登入將會被延時 30 秒。",
    "Reset password" : "重設密碼",
    "A password reset message has been sent to the e-mail address of this account. If you do not receive it, check your spam/junk folders or ask your local administrator for help." : "重設密碼資訊已寄至您的電子郵件。若您並未收到該信件，請確認您垃圾信箱，或請求管理員協助。",
    "If it is not there ask your local administrator." : "你找的東西不在，請聯絡系統管理員。",
    "Couldn't send reset email. Please contact your administrator." : "無法寄送重設 email 的資訊，請聯絡系統管理員。",
    "Password can not be changed. Please contact your administrator." : "無法重設密碼，請聯絡系統管理員。",
    "Back to login" : "回到登入畫面",
    "New password" : "新密碼",
    "Your files are encrypted. There will be no way to get your data back after your password is reset. If you are not sure what to do, please contact your administrator before you continue. Do you really want to continue?" : "由於您已啟用檔案加密，重設密碼後，您的資料將無法解密。若您不確定繼續與否，請與管理員聯繫。確定要繼續嗎？",
    "I know what I'm doing" : "我知道我在幹嘛",
    "Resetting password" : "重設密碼",
    "Recommended apps" : "推薦的應用程式",
    "Loading apps …" : "正在載入應用程式…",
    "Could not fetch list of apps from the app store." : "無法從應用程式商店抓取應用程式清單",
    "Installing apps …" : "正在安裝應用程式…",
    "Nextcloud {app}" : "Nextcloud {app}",
    "App download or installation failed" : "應用程式下載或是安裝失敗",
    "Can't install this app because it is not compatible" : "應用程式無法安裝，因為不相容",
    "Can't install this app" : "無法安裝這個應用程式",
    "Cancel" : "取消",
    "Schedule work & meetings, synced with all your devices." : "排定工作和會議時間，並與您的所有裝置同步",
    "Keep your colleagues and friends in one place without leaking their private info." : "將您的同事和朋友的聯繫整合在一處，且不洩漏他們的個人資訊",
    "Simple email app nicely integrated with Files, Contacts and Calendar." : "簡潔的電子郵件應用程式，與檔案瀏覽器、通訊錄、行事曆完美整合",
    "Forgot password?" : "忘記密碼？",
    "Back" : "返回",
    "Settings" : "設定",
    "Could not load your contacts" : "無法載入您的聯絡人",
    "Search contacts …" : "搜尋聯絡人…",
    "No contacts found" : "查無聯絡人",
    "Show all contacts …" : "顯示所有聯絡人…",
    "Install the Contacts app" : "安裝「Contact」應用程式",
    "Loading your contacts …" : "正在載入聯絡人…",
    "Looking for {term} …" : "搜尋 {term} …",
    "No" : "否",
    "Yes" : "是",
    "No files in here" : "沒有任何檔案",
    "New folder" : "新增資料夾",
    "No more subfolders in here" : "這裡沒有其他子資料夾了",
    "Name" : "姓名",
    "Size" : "大小",
    "Modified" : "已修改",
    "\"{name}\" is an invalid file name." : "{name} 是無效的檔名",
    "File name cannot be empty." : "檔名不能為空",
    "\"/\" is not allowed inside a file name." : "不允許檔名中出現 \"/\"",
    "\"{name}\" is not an allowed filetype" : "\"{name}\" 是不允許的檔案類型",
    "{newName} already exists" : "{newName} 已經存在",
    "Choose" : "選擇",
    "Copy" : "複製",
    "Move" : "移動",
    "Error loading file picker template: {error}" : "載入檔案選擇器樣板出錯： {error}",
    "OK" : "OK",
    "Error loading message template: {error}" : "載入訊息範本時發生錯誤： {error}",
    "read-only" : "唯讀",
    "_{count} file conflict_::_{count} file conflicts_" : ["{count} 個檔案衝突"],
    "One file conflict" : "一個檔案衝突",
    "New Files" : "新檔案",
    "Already existing files" : "已經存在的檔案",
    "Which files do you want to keep?" : "您要保留哪一個檔案？",
    "If you select both versions, the copied file will have a number added to its name." : "如果您同時選擇兩個版本，被複製的那個檔案名稱後面會加上編號",
    "Continue" : "繼續",
    "(all selected)" : "（已全選）",
    "({count} selected)" : "（已選取 {count} 項）",
    "Error loading file exists template" : "載入已存在的範本時發生錯誤",
    "Pending" : "等候中",
    "Copy to {folder}" : "複製到 {folder}",
    "Move to {folder}" : "移動到 {folder}",
    "Authentication required" : "必須驗證",
    "This action requires you to confirm your password" : "這個動作需要您再次確認密碼",
    "Confirm" : "確認",
    "Failed to authenticate, try again" : "驗證失敗，請再試一次",
    "seconds ago" : "幾秒前",
    "Connection to server lost" : "伺服器連線中斷",
    "_Problem loading page, reloading in %n second_::_Problem loading page, reloading in %n seconds_" : ["載入頁面時出錯，%n 秒後重新整理"],
    "Add to a project" : "新增至專案",
    "Show details" : "顯示細節",
    "Hide details" : "隱藏細節",
    "Rename project" : "重新命名專案",
    "Failed to rename the project" : "重新命名計劃失敗",
    "Failed to create a project" : "建立計劃失敗",
    "Failed to add the item to the project" : "新增項目至專案時失敗",
    "Connect items to a project to make them easier to find" : "將項目連結到計劃以便尋找",
    "Type to search for existing projects" : "搜尋現有計劃",
    "New in" : "新加入",
    "View changelog" : "檢視版本更新紀錄",
    "Very weak password" : "密碼安全性極弱",
    "Weak password" : "密碼安全性弱",
    "So-so password" : "密碼安全性普通",
    "Good password" : "密碼安全性佳",
    "Strong password" : "密碼安全性極佳",
    "No action available" : "沒有可用的動作",
    "Error fetching contact actions" : "擷取聯絡人時發生錯誤",
    "Non-existing tag #{tag}" : "不存在的標籤 #{tag}",
    "restricted" : "受限",
    "invisible" : "不可見",
    "Delete" : "刪除",
    "Rename" : "重新命名",
    "Collaborative tags" : "標籤",
    "No tags found" : "查無標籤",
    "Personal" : "個人",
    "Users" : "使用者",
    "Apps" : "應用程式",
    "Admin" : "管理",
    "Help" : "說明",
    "Access forbidden" : "存取被拒",
    "File not found" : "找不到檔案",
    "The document could not be found on the server. Maybe the share was deleted or has expired?" : "伺服器上找不到該文件，或許這個分享已經被刪除或是過期了？",
    "Back to %s" : "回到 %s",
    "Error" : "錯誤",
    "Internal Server Error" : "內部伺服器錯誤",
    "The server was unable to complete your request." : "伺服器無法完成你的請求。",
    "If this happens again, please send the technical details below to the server administrator." : "如果此問題重複發生，請寄送技術資訊給管理員。",
    "More details can be found in the server log." : "伺服器記錄檔裡面有更多細節",
    "Technical details" : "技術細節",
    "Remote Address: %s" : "遠端位置：%s",
    "Request ID: %s" : "請求編號：%s",
    "Type: %s" : "類型：%s",
    "Code: %s" : "代碼：%s",
    "Message: %s" : "訊息：%s",
    "File: %s" : "檔案：%s",
    "Line: %s" : "行數：%s",
    "Trace" : "追蹤",
    "Security warning" : "安全性警告",
    "Your data directory and files are probably accessible from the internet because the .htaccess file does not work." : "您的資料目錄看起來可以被公開存取，因為 .htaccess 設定檔並未生效。",
    "For information how to properly configure your server, please see the <a href=\"%s\" target=\"_blank\" rel=\"noreferrer noopener\">documentation</a>." : "閱讀<a href=\"%s\" target=\"_blank\" rel=\"noreferrer noopener\">說明文件</a>來瞭解如何正確設定您的伺服器",
    "Create an <strong>admin account</strong>" : "新增<strong>管理者帳號</strong>",
    "Username" : "使用者名稱",
    "Show password" : "顯示密碼",
    "Storage & database" : "儲存空間和資料庫",
    "Data folder" : "資料儲存位置",
    "Configure the database" : "設定資料庫",
    "Only %s is available." : "剩下 %s 可使用",
    "Install and activate additional PHP modules to choose other database types." : "安裝並啟用相關 PHP 模組來使用其他種資料庫",
    "For more details check out the documentation." : "更多細節詳見說明文件",
    "Database user" : "資料庫使用者",
    "Database password" : "資料庫密碼",
    "Database name" : "資料庫名稱",
    "Database tablespace" : "資料庫資料表空間",
    "Database host" : "資料庫主機",
    "Please specify the port number along with the host name (e.g., localhost:5432)." : "請將具體指定連接埠號與主機名稱。(例如：localhost:5432)",
    "Performance warning" : "效能警告",
    "You chose SQLite as database." : "您選擇了 SQLite 作為資料庫",
    "SQLite should only be used for minimal and development instances. For production we recommend a different database backend." : "SQLite 只適用於小型或是開發用站台，針對上線服務我們建議使用其他資料庫後端。",
    "If you use clients for file syncing, the use of SQLite is highly discouraged." : "若使用桌面版或是手機版客戶端同步檔案，不建議使用 SQLite",
    "Install recommended apps" : "安裝推薦的應用程式",
    "Finish setup" : "完成設定",
    "Finishing …" : "即將完成…",
    "Need help?" : "需要協助嗎？",
    "See the documentation" : "閱讀 odfweb 安裝說明書",
    "It looks like you are trying to reinstall your Nextcloud. However the file CAN_INSTALL is missing from your config directory. Please create the file CAN_INSTALL in your config folder to continue." : "您似乎正在嘗試重新安裝您的Nextcloud。然而，檔案 CAN_INSTALL 並未在您的config目錄中。請在您的config目錄中建立 CAN_INSTALL檔以繼續。",
    "Could not remove CAN_INSTALL from the config folder. Please remove this file manually." : "無法從您的 config 目錄中移除 CAN_INSTALL 檔案。請手動移除他。",
    "This application requires JavaScript for correct operation. Please {linkstart}enable JavaScript{linkend} and reload the page." : "這個應用程式需要啟用 Javascript 才能正常運作，請{linkstart}啟用Javascript{linkend}然後重新整理頁面。",
    "Get your own free account" : "取得免費帳號",
    "Skip to main content" : "跳到主內容",
    "Skip to navigation of app" : "跳到應用程式導覽",
    "More apps" : "更多應用程式",
    "More" : "更多",
    "More apps menu" : "更多應用程式選單",
    "Search" : "搜尋",
    "Reset search" : "重置搜尋",
    "Contacts" : "聯絡人",
    "Contacts menu" : "聯絡人選單",
    "Settings menu" : "設定選單",
    "Confirm your password" : "確認密碼",
    "Connect to your account" : "連結您的帳號",
    "Please log in before granting %1$s access to your %2$s account." : "請登入後再授權「%1$s」存取您的 %2$s 帳號",
    "App token" : "App token",
    "Grant access" : "允許存取",
    "Alternative log in using app token" : "使用應用程式 token 來登入",
    "Account access" : "帳戶存取",
    "You are about to grant %1$s access to your %2$s account." : "您將授權「%1$s」存取您的 %2$s 帳戶",
    "Account connected" : "帳戶已連結",
    "This share is password-protected" : "此分享受密碼保護",
    "The password is wrong. Try again." : "密碼錯誤，請重試",
    "Two-factor authentication" : "雙因素驗證",
    "Enhanced security is enabled for your account. Choose a second factor for authentication:" : "您的帳號已啟用進階安全機制，請選擇一個兩步驗證方法：",
    "Could not load at least one of your enabled two-factor auth methods. Please contact your admin." : "無法載入任何一個二階認證方法，請聯絡管理員",
    "Two-factor authentication is enforced but has not been configured on your account. Contact your admin for assistance." : "雙重認證已被強制要求啟用，您的帳號目前還沒設定。請聯絡管理員。",
    "Two-factor authentication is enforced but has not been configured on your account. Please continue to setup two-factor authentication." : "雙因驗證已被強制要求啟用，您的帳戶目前還沒設定。請設定您的雙因驗證。",
    "Set up two-factor authentication" : "設定雙因素驗證",
    "Two-factor authentication is enforced but has not been configured on your account. Use one of your backup codes to log in or contact your admin for assistance." : "雙重認證已被強制要求啟用，您的帳號目前還沒設定。請使用一個備用碼來登入或聯絡管理員。",
    "Use backup code" : "使用備用認證碼",
    "Setup two-factor authentication" : "設定雙因素驗證",
    "Enhanced security is enforced for your account. Choose which provider to set up:" : "您的帳號已啟用進階安全機制，請選擇一個供應者：",
    "Error while validating your second factor" : "驗證二階段因子發生錯誤",
    "Access through untrusted domain" : "經由不可信任的域名存取。",
    "Please contact your administrator. If you are an administrator, edit the \"trusted_domains\" setting in config/config.php like the example in config.sample.php." : "請聯絡你的管理員。如果妳就是管理員，請編輯config/config.php內的\"trusted_domains\"設定，該項的範例通常位於config.sample.php。",
    "Further information how to configure this can be found in the %1$sdocumentation%2$s." : "更多關於如何設定的訊息，請見%1$s文件%2$s。",
    "App update required" : "需要更新應用程式",
    "%1$s will be updated to version %2$s" : "%1$s 將會更新至版本 %2$s",
    "%1$s will be updated to the latest version" : "%1$s 將會更新至最新版本",
    "These incompatible apps will be disabled:" : "將會停用這些不相容的應用程式",
    "The theme %s has been disabled." : "主題 %s 已經被停用",
    "Please make sure that the database, the config folder and the data folder have been backed up before proceeding." : "在繼續之前，請備份資料庫、config 目錄及資料目錄",
    "Start update" : "開始升級",
    "To avoid timeouts with larger installations, you can instead run the following command from your installation directory:" : "在大型安裝上，為了避免升級請求逾時，你也可以在安裝目錄執行下列指令：",
    "Detailed logs" : "詳細記錄檔",
    "Update needed" : "需要更新",
    "Please use the command line updater because you have a big instance with more than 50 users." : "因為您有超過50名使用者，服務規模較大，請透過命令提示字元介面更新",
    "For help, see the  <a target=\"_blank\" rel=\"noreferrer noopener\" href=\"%s\">documentation</a>." : "若需要協助，請參閱<a target=\"_blank\" rel=\"noreferrer noopener\" href=\"%s\">說明文件</a>",
    "I know that if I continue doing the update via web UI has the risk, that the request runs into a timeout and could cause data loss, but I have a backup and know how to restore my instance in case of a failure." : "若我繼續透過網頁介面更新時我已了解有其風險，若請求逾時可能導致資料遺失，萬一更新失敗，我已準備好備份並知道如何回復運作。",
    "Upgrade via web on my own risk" : "願意承擔風險透過網頁更新",
    "Maintenance mode" : "維護模式",
    "This %s instance is currently in maintenance mode, which may take a while." : "這個 %s 安裝目前處於維護模式，需要一段時間恢復。",
    "This page will refresh itself when the instance is available again." : "安裝恢復可用之後，本頁會自動重新整理",
    "Contact your system administrator if this message persists or appeared unexpectedly." : "若這個訊息持續出現，請聯絡系統管理員",
    "Following apps have been disabled: %s" : "以下應用程式已經被停用：%s",
    "You are currently running PHP 5.6. The current major version of Nextcloud is the last that is supported on PHP 5.6. It is recommended to upgrade the PHP version to 7.0+ to be able to upgrade to Nextcloud 14." : "您目前正運行 PHP 5.6 ，目前使用的 Nextcloud 將會是最後一個支援 PHP 5.6 的版本，建議您升級至 PHP 7.0 以上以使用 Nextcloud 14。",
    "Could not send reset email because there is no email address for this username. Please contact your administrator." : "無法寄送重設 email ，因為這個帳號沒有設定 email 地址，請聯絡您的系統管理員。",
    "Couldn't send reset email. Please make sure your username is correct." : "無法寄送重設 email ，請確認您的帳號輸入正確",
    "Dismiss" : "知道了",
    "The link to reset your password has been sent to your email. If you do not receive it within a reasonable amount of time, check your spam/junk folders.<br>If it is not there ask your local administrator." : "重設密碼的連結已經 email 至你的信箱，如果你在一段時間內沒收到，請檢查垃圾郵件資料夾，如果還是找不到，請聯絡系統管理員。",
    "Your files are encrypted. There will be no way to get your data back after your password is reset.<br />If you are not sure what to do, please contact your administrator before you continue. <br />Do you really want to continue?" : "由於您已啟用檔案加密，重設密碼後，您的資料將無法解密。<br/>若您不確定繼續與否，請與管理員聯繫。<br/>確定要繼續嗎？",
    "Sending email …" : "正在傳送電子郵件…",
    "{name} below version {version} is installed, for stability and performance reasons it is recommended to update to a newer {name} version." : "偵測到目前安裝的 {name} 低於版本 {version}，為了更好的穩定性及效能，建議升級到較新的 {name} 版本。",
    "Shared" : "已分享",
    "Shared with" : "分享給",
    "Shared by" : "分享自",
    "Choose a password for the public link" : "為公開連結選一個密碼",
    "Choose a password for the public link or press the \"Enter\" key" : "為公開連結選一個密碼或是按下 Enter 鍵",
    "Copied!" : "已複製！",
    "Copy link" : "複製連結",
    "Not supported!" : "不支援！",
    "Press ⌘-C to copy." : "按下 ⌘-C 來複製",
    "Press Ctrl-C to copy." : "按下 Ctrl-C 來複製",
    "Unable to create a link share" : "無法建立分享連結",
    "Unable to toggle this option" : "無法調整這個選項",
    "Resharing is not allowed" : "不允許重新分享",
    "Link" : "連結",
    "Hide download" : "隱藏下載",
    "Password protection enforced" : "已啟用密碼保護",
    "Password protect" : "密碼保護",
    "Allow editing" : "允許編輯",
    "Email link to person" : "傳送連結（電子郵件）",
    "Send" : "寄出",
    "Allow upload and editing" : "允許上傳及編輯",
    "Read only" : "唯讀",
    "File drop (upload only)" : "檔案投遞箱（僅限上傳）",
    "Expiration date enforced" : "已設定到期日",
    "Set expiration date" : "指定到期日",
    "Expiration" : "過期",
    "Expiration date" : "到期日",
    "Note to recipient" : "給收件人的訊息",
    "Unshare" : "取消分享",
    "Delete share link" : "刪除分享連結",
    "Add another link" : "加入另一個連結",
    "Password protection for links is mandatory" : "連結分享必須設定密碼保護",
    "Share to {name}" : "分享給 {name}",
    "Share link" : "分享連結",
    "New share link" : "建立新分享連結",
    "Created on {time}" : "建立於 {time}",
    "Password protect by Talk" : "密碼受 Talk 保護",
    "Could not unshare" : "無法取消分享",
    "Shared with you and the group {group} by {owner}" : "由 {owner} 分享給您和 {group}",
    "Shared with you and {circle} by {owner}" : "{owner} 分享給您和 {circle}",
    "Shared with you and the conversation {conversation} by {owner}" : "{owner} 分享給您和 {conversation} 對話",
    "Shared with you in a conversation by {owner}" : "{owner} 在對話中分享給您",
    "Shared with you by {owner}" : "{owner} 已經和您分享",
    "Choose a password for the mail share" : "為郵件分享選一個密碼",
    "group" : "群組",
    "remote" : "遠端",
    "remote group" : "遠端群組",
    "email" : "電子郵件",
    "conversation" : "交談",
    "shared by {sharer}" : "由 {sharer} 分享",
    "Can reshare" : "允許再次分享",
    "Can edit" : "允許編輯",
    "Can create" : "新增",
    "Can change" : "允許變更",
    "Can delete" : "允許刪除",
    "Access control" : "存取控制",
    "{shareInitiatorDisplayName} shared via link" : "{shareInitiatorDisplayName} 分享了連結",
    "Error while sharing" : "分享時發生錯誤",
    "Share details could not be loaded for this item." : "無法載入分享細節",
    "Search globally" : "全域搜尋",
    "_At least {count} character is needed for autocompletion_::_At least {count} characters are needed for autocompletion_" : ["至少需要 {count} 個字才能自動完成"],
    "This list is maybe truncated - please refine your search term to see more results." : "這個列表可能不完全 - 請使用更好的關鍵字以找到更多結果",
    "No users or groups found for {search}" : "沒有群組或使用者符合 {search}",
    "No users found for {search}" : "沒有使用者符合 {search}",
    "An error occurred (\"{message}\"). Please try again" : "發生錯誤（{message}），請再試一次",
    "An error occurred. Please try again" : "發生錯誤，請再試一次",
    "Home" : "家庭",
    "Work" : "工作",
    "Other" : "其他",
    "{sharee} (remote group)" : "{sharee} （遠端群組）",
    "{sharee} ({type}, {owner})" : "{sharee} （{type}, {owner}）",
    "Share" : "分享",
    "Name or email address..." : "姓名或電子郵件地址",
    "Name or federated cloud ID..." : "姓名 或 聯邦雲 ID ...",
    "Name, federated cloud ID or email address..." : "姓名、聯邦雲 ID 或 電子郵件地址",
    "Name..." : "姓名…",
    "Error removing share" : "移除分享時發生錯誤",
    "({scope})" : "（{scope}）",
    "Saving..." : "儲存中...",
    "Your client should now be connected! You can close this window." : "您的客戶端應該已經完成連結，您可以關閉這個視窗",
    "Cancel log in" : "取消登入",
    "These apps will be updated:" : "將會更新這些應用程式",
    "SQLite will be used as database." : "將使用 SQLite 為資料庫",
    "For larger installations we recommend to choose a different database backend." : "在大型安裝中建議使用其他種資料庫",
    "Especially when using the desktop client for file syncing the use of SQLite is discouraged." : "若使用桌面版程式同步檔案，不建議使用 SQLite",
    "Wrong password." : "密碼錯誤",
    "New Password" : "新密碼",
    "We have send a password reset e-mail to the e-mail address known to us for this account. If you do not receive it within a reasonable amount of time, check your spam/junk folders.<br>If it is not there ask your local administrator." : "我們已將重設密碼的信件寄到這個帳號所對應的信箱。如果你在合理的時間內沒有收到，請至垃圾郵件中檢查，如果還是沒有，請聯絡管理員。"
},
"nplurals=1; plural=0;");
