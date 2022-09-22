OCA.FilesSharingQrcode = {

    menuId: 'qrcodemenu',
    qrcodeId: 'qrcode',

    _menuTemplate() {
        return '<div id="' + this.menuId + '" class="icon-share hidden"></div>'
    },

	_dialogTemplate() {
        return '<div><div id="' + this.qrcodeId + '"></div></div>'
    },

    /**
     * Create new menu
     */
    initialize() {

        const munu = $(this._menuTemplate())

        if (document.getElementById('header-primary-action')) {
            munu.insertBefore('#header-primary-action');
        } else {
            munu.insertBefore('#header .header-right');
        }

        // Add Css
        munu.css('display', 'flex')
        munu.css('justify-content', 'center')
        munu.css('align-items', 'center')
        munu.css('width', '50px')
        munu.css('height', '100%')
        munu.css('cursor', 'pointer')
        munu.css('opacity', '0.6')
        munu.css('padding', '0')
        munu.css('margin', '0')
        munu.removeClass('hidden')
    },

    /**
     * Show custom dialog
     */
	showDialog() {
        const dialog = $(this._dialogTemplate())
		$('body').append(dialog);

		const ocdialogParams = {
            title: 'QR Code',
			modal: true,
		};

		dialog.ocdialog(ocdialogParams)
			.bind('ocdialogclose', function () {
				dialog.ocdialog('destroy').remove();
			});

        const targetElement = document.getElementById(this.qrcodeId)
        this.generateQR(targetElement)
    },

    generateQR($target) {
        new QRCode($target, { text: window.location.href })
        $target.style.border = '2rem solid white'
    }
}

window.addEventListener('DOMContentLoaded', function() {
    OCA.FilesSharingQrcode.initialize();
    $('#' + OCA.FilesSharingQrcode.menuId).on('click', function() {
        OCA.FilesSharingQrcode.showDialog()
    })
})