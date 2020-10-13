window.history.replaceState({}, "", OC.generateUrl('/apps/ndcversionstatus/result'));

$(document).on("click", "#sendemail", function (e) {

    var msgResponse = {
		status: '',
		data: { message: '' }
	}

    $.ajax({
        url: OC.generateUrl('/apps/ndcversionstatus/mail'),
        type: 'POST',
        data: {
            content: $('#ndcversionstatus ul').html()
        }
    })
    .done(function (resp) {
        if (resp.result) msgResponse.status = 'success';
        msgResponse.data.message = resp.data.message;
    })
    .fail(function (e) {
        msgResponse.data.message = t('ndcversionstatus', 'Unable to send email.');
        console.error(e);
    })
    .always(function() {
        OC.msg.finishedAction($('.msg'), msgResponse);
    })
 });
