(function(OCA) {

	if (!OCA.FileSubscription) {
		/**
		 * @namespace
		 */
		OCA.FileSubscription = {}
	}

	OCA.FileSubscription.FilesPlugin = {
		attach(fileList) {
			if (fileList.id === 'trashbin' || fileList.id === 'files.public') return
			fileList.registerTabView(new OCA.FileSubscription.TabView('fileSubscriptionTabView'))
		},
	}

	OC.Plugins.register('OCA.Files.FileList', OCA.FileSubscription.FilesPlugin)

})(OCA)
