$(document).on("click", "button#checkBtn", function (e) {
    // Set appconfig lastCheckTime
    $.ajax({
        url: OC.generateUrl('/apps/ndcversionstatus/setTime'),
        type: 'GET'
    }).always(function() {
        var f = document.getElementById('hiddenForm');
        window.open('', '_self');
        f.submit();
    })
 });
