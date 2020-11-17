/* global $ OC */
$(document).ready(function() {
    $('#captcha').click(function() {
        var captchaUrl = OC.generateUrl('/apps/ndcregistration/captcha');
        var dd = new Date();
        $('#captcha').attr('src', captchaUrl + '?' + dd.getTime());
    });
})