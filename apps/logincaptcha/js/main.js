// 登入頁面增加驗證碼欄位
const APP_NAME = "logincaptcha";
window.addEventListener('DOMContentLoaded', function() {
    const element = `<p id="captcha-wrapper">
        <input type="text" name="captcha" id="captcha" value=""
            placeholder="${t(APP_NAME, 'Captcha')}"
            aria-label="${t(APP_NAME, 'Captcha')}"
            autocomplete="off" autocapitalize="none" autocorrect="off" required>
        <label for="password" class="infield">${t(APP_NAME, 'Captcha')}</label>
        <a>
            <img id="imgcode" src="" title="${t(APP_NAME, 'Click to refresh captcha')}"/>
        </a>
    </p>`;

    $(element).insertBefore($('#submit-wrapper'));
    getImg();
});

$(document).on('click', '#captcha-wrapper a', getImg)

function getImg() {
    var captchaUrl = OC.generateUrl('/apps/' + APP_NAME + '/create');
    $.ajax(captchaUrl).done(function(resp) {
        $('#imgcode').attr('src', resp).show();
    })
}
