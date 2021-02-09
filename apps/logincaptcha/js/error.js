// 驗證碼錯誤訊息
window.addEventListener('DOMContentLoaded', function() {
    const msg = `<p class="warning">${t(APP_NAME, 'Wrong captcha')}</p>`;
    $(msg).insertAfter($('#submit-wrapper'));
});