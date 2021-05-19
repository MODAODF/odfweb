/*
 * Copyright (c) 2015
 *
 * This file is licensed under the Affero General Public License version 3
 * or later.
 *
 * See the COPYING-README file.
 *
 */

(function () {

	/**
	 * @class OCA.Activity.ActivityTabView
	 * @classdesc
	 *
	 * Displays activity information for a given file
	 *
	 */
	var MergeODFTabView = OCA.Files.DetailTabView.extend(/** @lends OCA.Activity.ActivityTabView.prototype */ {
		id: 'mergeodfTabView',
		className: 'mergeodfTabView tab',

		events: {
			'click .showMore': '_onClickShowMore'
		},

		_loading: false,
		_plugins: [],
		order: 1,

		initialize: function () {
			console.log("tabview initialize");
			this.order = -200;
		},

		template: function (data) {
			return OCA.Activity.Templates['activitytabview'](data);
		},

		get$: function () {
			return this.$el;
		},

		getLabel: function () {
			return "API 資訊";
		},

		getIcon: function () {
			return 'icon-activity';
		},

		setFileInfo: function (fileInfo) {
			this._fileInfo = fileInfo;
			this.render();
		},

		_onError: function () {
			var $emptyContent = this.$el.find('.emptycontent');
			$emptyContent.removeClass('hidden');
			$emptyContent.find('p').text(t('activity', 'An error occurred while loading activities'));
		},

		_onRequest: function () {
			if (this.collection.lastGivenId === 0) {
				this.render();
			}
			this.$el.find('.showMore').addClass('hidden');
		},

		_onEndRequest: function () {
			this.$container.removeClass('hidden');
			this.$el.find('.loading').addClass('hidden');
			if (this.collection.length) {
				this.$el.find('.emptycontent').addClass('hidden');
			}
			if (this.collection.hasMore) {
				this.$el.find('.showMore').removeClass('hidden');
			}
		},

		_onClickShowMore: function () {

		},

		/**
		 * Renders this details view
		 */
		render: function () {
			if (this._fileInfo) {
				this.$el.html("");
				var buttonJSON = $("<button/>", { text: "取得 JSON 範例說明" });
				var buttonYAML = $("<button/>", { text: "取得 YAML 範例說明" });
				var endpt = md5(FileList.dirInfo["internalPath"] + "/" + this._fileInfo['attributes']["name"]);
				buttonJSON.on("click", { endpt: endpt }, (e) => {
					$.ajax({
						url: OC.generateUrl(`/apps/mergeodf/${FileList.dirInfo['folderId']}/${e.data.endpt}/json`),
						method: "GET"
					}).success((res) => {
						var endpt = md5(FileList.dirInfo["internalPath"] + "/" + this._fileInfo['attributes']["name"]);
						var api_url = FileList.dirInfo.api_server + `/lool/mergeodf/${endpt}`;
						OCA.MergeODF.dialogs.info(`${res.res}`, "JSON 範例說明", {
							type: "json",
							api_url: api_url,
							api_name: this._fileInfo['attributes']["name"]
						});
					});
				});
				buttonYAML.on("click", { endpt: endpt }, (e) => {
					$.ajax({
						url: OC.generateUrl(`/apps/mergeodf/${FileList.dirInfo['folderId']}/${e.data.endpt}/api`),
						method: "GET"
					}).success((res) => {
						var endpt = md5(FileList.dirInfo["internalPath"] + "/" + this._fileInfo['attributes']["name"]);
						var api_url = FileList.dirInfo.api_server + `/lool/mergeodf/${endpt}`;
						OCA.MergeODF.dialogs.info(`${res.res}`, "YAML 範例說明", {
							type: "yaml",
							api_url: api_url,
							api_name: this._fileInfo['attributes']["name"]
						});
					});
				});
				buttonYAML.appendTo(this.$el);
				buttonJSON.appendTo(this.$el);
				//this.$el.html(`<button data-id="">${md5(FileList.dirInfo["internalPath"])+}</button>`);
			}
		}
	});

	OCA.MergeODF = OCA.MergeODF || {};
	OCA.MergeODF.MergeODFTabView = MergeODFTabView;
})();
/*
 * Copyright (c) 2015
 *
 * This file is licensed under the Affero General Public License version 3
 * or later.
 *
 * See the COPYING-README file.
 *
 */

(function (OCA) {

	var FilesPlugin = {
		attach: function (fileList) {
			fileList.registerTabView(new OCA.MergeODF.MergeODFTabView());
		}
	};

	OC.Plugins.register('OCA.Files.FileList', FilesPlugin);

})(OCA);

