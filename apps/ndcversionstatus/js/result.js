window.history.replaceState({}, "", OC.generateUrl('/apps/ndcversionstatus/result'));

$(window).load(function() {

    var msgResponse = {
		status: '',
		data: { message: '' }
    }

    OC.msg.startAction($('.msg'), t('ndcversionstatus', 'Sending...'));
    $.ajax({
        url: OC.generateUrl('/apps/ndcversionstatus/mail'),
        type: 'POST',
        data: {
            content: $('#ndcversionstatus ul').html()
        }
    })
    .done(function (resp) {
        msgResponse.status = resp.result ? 'success' : 'error';
        msgResponse.data.message = resp.data.message;
    })
    .fail(function (e) {
        msgResponse.status = 'error';
        msgResponse.data.message = t('ndcversionstatus', 'Unable to send email.');
        console.error(e);
    })
    .always(function(resp) {
        OC.msg.finishedAction($('.msg'), msgResponse);

        // 寄信結果清單
        var infos = resp.data.infos;
        if (Object.keys(infos).length > 0) {
            Object.keys(infos).forEach(function(name) {
                var msg = infos[name]['message'];
                $('.mailResult').append('<li><b>' + name + '</b><br/>' + msg + '</li>')
            })
            $('.mailResult').show()
        }
    })

});
