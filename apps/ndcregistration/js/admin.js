const userStatusUi = {
	list_all: null,
	init() {
		$('.sumCreated, .sumUncreated').html('')
		$('.created, .uncreated').empty()
		$('.registerResult').hide()
		$('.logData').hide()
	},
	showFinalList() {
		userStatusUi.list_all.forEach( function(user) {
			if (user.isCreated) {
				$('.created').append(`<li>${user.name} (${user.uid})</li>`)
			} else {
				$('.uncreated').append(`<li>${user.name} (${user.uid}) : ${user.status}</li>`)
			}
		})

		var sumCreated = $('.created li').length
		var sumUncreated = $('.uncreated li').length
		if ( sumCreated === 0) $('.created').html('<i>NONE</i>')
		if ( sumUncreated === 0) $('.uncreated').html('<i>NONE</i>')
		$('.sumCreated').html(sumCreated)
		$('.sumUncreated').html(sumUncreated)

		$('.registerResult').show()
	},
	updatelogData(data) {
		$('.logData').show()
		var lastRow = data[data.length-1]
		$('#fraction').html(lastRow['index'])
		$('#lastrow').html( lastRow['name'] + ' (' + lastRow['status'] + ')' )
	}
}

var readTxt = false;
function readLogTxt() {
	$.ajax({
		url: OC.generateUrl('/apps/ndcregistration/getLog')
	}).done(function (e, response) {
		if(e.result) {
			var logData = e.data
			if (logData) userStatusUi.updatelogData(logData)
		} else {
			$('.logData').hide()
		}

	}).fail(function (e, response) {
		console.debug(e)
		console.debug(response)

	}).always(function() {
		if(readTxt) setTimeout(readLogTxt, 1000)
	})
}

$(document).ready(function () {
	var msgEl = $('#uploadMessage');
	var errMsg = $('#errorMessages');
	var msgResponse = {
		status: '',
		data: { message: '' }
	}

	$('.fileupload').fileupload({
		pasteZone: null,
		dropZone: null,
		beforeSend: function () {
			userStatusUi.init()
			$('#uploadCsv').attr('disabled', true)
			OC.msg.startAction(msgEl, '正在批次處理帳號資料，請稍候……');
			errMsg.hide().html('');
			readTxt = true
			//readLogTxt(); 不讀 Log
		},
		done: function (e, response) {
			var resp = response.result;
			msgResponse.data.message = resp.data.message;
			console.log(response);
			if (resp.result) {
				msgResponse.status = 'success';
				//userStatusUi.list_all = resp.data.userStatus;
				//userStatusUi.showFinalList();
			} else {
				if (Array.isArray(resp.data.reason)) {
					errMsg.html(resp.data.reason.join('<br>')).show();
				}
			}
		},
		fail: function (e, response) {
			msgResponse.data.message = '檔案上傳失敗'
			console.error(e)
		},
		always: function() {
			readTxt = false
			$('.logData').hide()
			$('#uploadCsv').attr('disabled', false)
			OC.msg.finishedAction(msgEl, msgResponse)
		}
	});

});

const registerFilter = {
	showAll(str) {
		$('.registerResult li').show()
	},
	showOnly(str) {
		$('.registerResult li').each(function() {
			if($(this).html().includes(str)) {
				$(this).show()
			} else {
				$(this).hide()
			}
		})
	},
	hideStr(str) {
		$('.registerResult li').each(function() {
			if($(this).html().includes(str)) {
				$(this).hide()
			} else {
				$(this).show()
			}
		})
	}
}