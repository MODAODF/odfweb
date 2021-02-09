<?php
namespace OCA\LoginCaptcha\Controller;

use OCP\AppFramework\Controller;
use OCP\IRequest;
use OCP\ISession;

class CaptchaController extends Controller {

	/** @var ISession */
	private $session;

	const CAPTCHA_NAME = 'login_captcha_code';

	/**
	 * @param string $appName
	 * @param IRequest $request
	 * @param ISession $session
	 */
	public function __construct(string $AppName, IRequest $request, ISession $session) {
		parent::__construct($AppName, $request);
		$this->session = $session;
	}

	/**
	 * create random captcha
	 *
	 * @NoCSRFRequired
	 * @PublicPage
     * @UseSession
	 *
	 * @param int $letterNums
	 * @param int $width
	 * @param int $height
	 * @return array
	 */
	public function create($nums = 5, $width = 90, $height = 30) {
        //去除了數字0和1 字母小寫O和L，為了避免辨識不清楚
        $str = "23456789abcdefghijkmnpqrstuvwxyzABCDEFGHIJKLMOPQRSTUBWXYZ";
        $code = '';
        for ($i = 0; $i < $nums; $i++) {
            $code .= $str[mt_rand(0, strlen($str)-1)];
        }

        $this->session->set(SELF::CAPTCHA_NAME, $code);

        //建立圖示，設置寬度及高度與顏色等等條件
        $image = imagecreate($width, $height);
        $color = imagecolorallocate($image, mt_rand(0, 200), mt_rand(0, 200), mt_rand(0, 200));
        // $border_color = imagecolorallocate($image, 0, 0, 0);
        $background_color = imagecolorallocate($image, 255, 255, 255);

        //建立圖示背景
        imagefilledrectangle($image, 0, 0, $width, $height, $background_color);

        //建立圖示邊框
        // imagerectangle($image, 0, 0, $width-1, $height-1, $border_color);

        // // 在圖示布上隨機產生大量躁點
        // for ($i = 0; $i < 80; $i++) {
        //     imagesetpixel($image, rand(0, $width), rand(0, $height), $black);
        // }

        $strx = mt_rand(1, 5); // rand(3, 8);
        for ($i = 0; $i < $nums; $i++) {
			$strpos = rand(1, 6);
               imagestring($image, 5, $strx, $strpos, substr($code, $i, 1), $color);
            $strx += rand(10, 20);
        }

		ob_start();
        imagepng($image);
        imagedestroy($image);
		$img = ob_get_clean();
		$data = 'data:image/png;base64,'.base64_encode($img);
		return $data;
	}

}
