$(document).ready(function() {
	var appName = "odfwebupgrade";
    var msgEl = $('.msg')
    var msgResponse = {
		status: '',
		data: { message: '' }
	}

	$('#uploadZip').fileupload({
		pasteZone: null,
		dropZone: null,
		beforeSend: function () {
			$('#uploadZip').attr('disabled', true);
			$('.openUpdater').attr('disabled', true);
			OC.msg.startAction(msgEl, t(appName, 'Uploading...'));
		},
		done: function (e, response) {
			var resp = response.result;
			if (resp.result) {
				msgResponse.status = 'success';
				$('#uploadZip').attr('disabled', true);
				$('.openUpdater').attr('disabled', false);
				canOpenUpdater(resp.data.zipname);

			} else {
				$('#uploadZip').attr('disabled', false);
				$('.openUpdater').attr('disabled', true);
			}
			msgResponse.data.message = resp.data.message;
		},
		fail: function (e) {
			msgResponse.data.message = t(appName, 'Failed to upload.') + resp.data.message;
			console.error(e);
			$('#uploadZip').attr('disabled', false);
		},
		always: function() {
			OC.msg.finishedAction(msgEl, msgResponse);
		}
	});

	function canOpenUpdater(zipname) {
		$('#odfwebupgrade').on('click', 'button', function() {
			$.ajax({
				url: OC.generateUrl("/apps/odfwebupgrade/credentials"),
			}).success(function(t) {
				var e = document.createElement("form");
				e.setAttribute("method", "post"),
				e.setAttribute("action", OC.getRootPath()+"/updaterOdfweb/");

				var n = document.createElement("input");
				n.setAttribute("type", "hidden");
				n.setAttribute("name", "updater-secret-input");
				n.setAttribute("value", t);
				e.appendChild(n);

				var z = document.createElement("input");
				z.setAttribute("type", "hidden");
				z.setAttribute("name", "zipname");
				z.setAttribute("value", zipname);
				e.appendChild(z);

				document.body.appendChild(e);
				e.submit();
			})
		})
	}

});