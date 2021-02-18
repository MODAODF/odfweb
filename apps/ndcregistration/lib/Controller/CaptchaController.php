<?php
/**
 *
 * This file is licensed under the Affero General Public License version 3 or
 * later. See the COPYING file.
 *
 * @author Firefly <firefly@ossii.com.tw>
 */
namespace OCA\NdcRegistration\Controller;

use \OCP\IRequest;
use \OCP\AppFramework\Http\DataDisplayResponse;
use \OCP\AppFramework\Http;
use \OCP\AppFramework\Controller;
use \OCP\IL10N;
use \OCP\IConfig;
use \OCP\ISession;

class CaptchaController extends Controller {
    const CAPTCHA_NAME = 'captcha_code';
    /** @var IL10N */
	private $l10n;
	/** @var IConfig */
    private $config;
    /** @var ISession */
    private $session;
	/** @var string */
	protected $appName;

	public function __construct($appName, IRequest $request, IL10N $l10n, IConfig $config, ISession $session) {
		parent::__construct($appName, $request);
		$this->l10n = $l10n;
		$this->config = $config;
        $this->appName = $appName;
        $this->session = $session;
    }

    /**
	 * @NoCSRFRequired
	 * @PublicPage
     * @UseSession
	 */
    public function imageCode() {
        $this->session->remove(SELF::CAPTCHA_NAME);
        $data = $this->createCaptcha(5, 120, 30);

        $resp = new DataDisplayResponse($data);
        $resp->addHeader('Content-type', 'image/png; charset=utf-8');
        return $resp;
    }

    /**
     * createCaptcha($nums, $width, $height)
     * 設置產生驗證碼圖示的參數
     * $nums 生成驗證碼個數
     * $width 圖片寬
     * $height 圖片高
    */
    private function createCaptcha($nums, $width, $height) {

        //去除了數字0和1 字母小寫O和L，為了避免辨識不清楚
        $str = "23456789abcdefghijkmnpqrstuvwxyzABCDEFGHIJKLMOPQRSTUBWXYZ";
        $code = '';
        for ($i = 0; $i < $nums; $i++) {
            $code .= $str[mt_rand(0, strlen($str)-1)];
        }

        $this->session->set(SELF::CAPTCHA_NAME, $code);

        //建立圖示，設置寬度及高度與顏色等等條件
        $image = imagecreate($width, $height);
        $black = imagecolorallocate($image, mt_rand(0, 200), mt_rand(0, 200), mt_rand(0, 200));
        $border_color = imagecolorallocate($image, 21, 106, 235);
        $background_color = imagecolorallocate($image, 235, 236, 237);

        //建立圖示背景
        imagefilledrectangle($image, 0, 0, $width, $height, $background_color);

        //建立圖示邊框
        imagerectangle($image, 0, 0, $width-1, $height-1, $border_color);

        //在圖示布上隨機產生大量躁點
        for ($i = 0; $i < 80; $i++) {
            imagesetpixel($image, rand(0, $width), rand(0, $height), $black);
        }

        $strx = rand(3, 8);
        for ($i = 0; $i < $nums; $i++) {
            $strpos = rand(1, 6);
            imagestring($image, 5, $strx, $strpos, substr($code, $i, 1), $black);
            $strx += rand(10, 30);
        }

        ob_start();
        imagepng($image);
        imagedestroy($image);
        $data = ob_get_contents();
        ob_end_clean();
        return $data;
    }
}
?>
