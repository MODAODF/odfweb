$(document).on("click", "button#checkBtn", function (e) {
    // Set appconfig lastCheckTime
    OC.msg.startAction($('.msg'), t('ndcversionstatus', 'Checking... Please Don\'t close this tab.'));
    $.ajax({
        url: OC.generateUrl('/apps/ndcversionstatus/setTime'),
        type: 'GET'
    }).always(function() {
        var f = document.getElementById('hiddenForm');
        window.open('', '_self');
        f.submit();
    })
});
