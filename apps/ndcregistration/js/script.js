/* global $ OC */
window.addEventListener('DOMContentLoaded', function() {
    $('#goback').click(function() {
        var myhome = OC.generateUrl('/apps/ndcregistration');
        window.location = myhome;
    });

    $('#gologin').click(function() {
        var loginurl = OC.generateUrl('/index.php/login');
        window.location = loginurl;
    });
})