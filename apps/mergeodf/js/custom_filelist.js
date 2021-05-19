$(document).ready(function () {
	// wait for other apps/extensions to register their event handlers and file actions
	// in the "ready" clause
	_.defer(function () {
		if (window.location.search.split("&").length >= 2) {
			view_target = window.location.search.split("&")[1].split("=")[1]
			OCA.Files.App.setActiveView(view_target);
		}
		else {
			if ($("#app-navigation").find("li").length !== 0) {
				var view_id = $($("#app-navigation").find("li")[0]).attr("data-id");
				OCA.Files.App.setActiveView(view_id);
			}
		}
	});
});


$(document).ready(function () {
	(function (OCA) {
		/**
		 * @class OCA.Files.MergeODFAPPFileList
		 * @augments OCA.Files.MergeODFAPPFileList
		 *
		 * @classdesc MergeODF file list.
		 * Displays the list of files marked as favorites
		 *
		 * @param $el container element with existing markup for the #controls
		 * and a table
		 * @param [options] map of options, see other parameters
		 */
		var app_id = [];
		$("#app-navigation >> li").each((index, content) => {
			var data_id = $(content).attr("data-id");

			if (data_id && data_id.includes("mergeodflist-"))
				app_id.push({
					"data-id": data_id,
					"mount_point": $(content).find("a")[0].text
				});
		});
		for (var i = 0; i < app_id.length; i++) {
			var list_id = app_id[i]['data-id'].split("-")[1];
			console.log(list_id);

			var MergeODFAPPFileList = function ($el, options) {
				this.initialize($el, options);
				this.list_id = options.list_id;
				this.mount_point = options.mount_point;
				console.log(options.list_id);
			};
			MergeODFAPPFileList.prototype = _.extend({}, OCA.Files.FileList.prototype,
				/** @lends OCA.Files.MergeODFAPPFileList.prototype */ {
					id: app_id[i]['data-id'],
					appName: t('files', 'MergeODF'),
					list_id: "",
					mount_point: "",
					_clientSideSort: true,
					_allowSelection: false,

					/**
					 * @private
					 */
					initialize: function ($el, options) {
						OCA.Files.FileList.prototype.initialize.apply(this, arguments);
						if (this.initialized) {
							return;
						}

						// let each filelist have their own and unique progressbar
						this._operationProgressBar = new OCA.MergeODF.OperationProgressBar();
						this._operationProgressBar.parent_id = `#app-content-mergeodflist-${options.list_id}`;
						OC.Plugins.attach('OCA.Files.MergeODFAPPFileList_' + options.list_id, this);

						// 修改每個 app-content 的 id 讓 jquery.fileupload.js 的事件註冊在正確的 DOM 上面 
						this.$el.find('#file_upload_start').attr("id", "file_upload_start_" + options.list_id);

						// Change the default _tabViews
						//this._detailsView._tabViews = [];
						//this.registerTabView(new OCA.Comments.CommentsTabView("commentsTabView"));
						//this.registerTabView(new OCA.MergeODF.MergeODFTabView());

						//Remove Share From FileAction
						delete this.fileActions.actions.all.Share;
					},

					updateEmptyContent: function () {
						var dir = this.getCurrentDirectory();
						if (dir === '/') {
							// root has special permissions
							this.$el.find('#emptycontent').toggleClass('hidden', !this.isEmpty);
							this.$el.find('#filestable thead th').toggleClass('hidden', this.isEmpty);
						}
						else {
							OCA.Files.FileList.prototype.updateEmptyContent.apply(this, arguments);
						}
					},

					getDirectoryPermissions: function () {
						return OC.PERMISSION_READ | OC.PERMISSION_DELETE;
					},

					reload: function () {
						this.showMask();
						if (this._reloadCall) {
							this._reloadCall.abort();
						}

						// there is only root
						this._setCurrentDir('/' + this.mount_point, false);
						window.FileList._setCurrentDir('/' + this.mount_point, false);

						this._reloadCall = $.ajax({
							url: OC.generateUrl('/apps/mergeodf/foldercontent/' + this.list_id),
							type: 'GET',
							dataType: 'json'
						});
						var callBack = this.reloadCallback.bind(this);
						return this._reloadCall.then(callBack, callBack);
					},

					reloadCallback: function (result) {
						delete this._reloadCall;
						this.hideMask();
						var callBack = this.updateDirInfoCallback.bind(this);
						$.ajax({
							url: OC.generateUrl('/apps/mergeodf/folderinfo/' + this.list_id),
							type: 'GET',
							dataType: 'json'
						}).then(callBack, callBack);

						if (result.files) {
							this.setFiles(result.files.sort(this._sortComparator));
							return true;
						}

						return false;
					},

					updateDirInfoCallback: function (result) {
						this.dirInfo = new OC.Files.FileInfo(result["files"][0]);
						window.FileList.dirInfo = this.dirInfo;
						this._updateDirectoryPermissions();
						// Update the #free_space
						this.updateStorageStatistics(true);
					},
					_updateDirectoryPermissions: function () {
						var isCreatable = (this.dirInfo.permissions & OC.PERMISSION_CREATE) !== 0 && this.$el.find('#free_space').val() !== '0';
						this.$el.find('#permissions').val(this.dirInfo.permissions);
						this.$el.find('.creatable').toggleClass('hidden', !isCreatable);
						this.$el.find('.notCreatable').toggleClass('hidden', isCreatable);
					},
					_onClickNewButton: function (event) {
						var $target = $(event.target);
						if (!$target.hasClass('.button')) {
							$target = $target.closest('.button');
						}
						this._newButton.tooltip('hide');
						event.preventDefault();
						if ($target.hasClass('disabled')) {
							return false;
						}
						if (!this._newFileMenu) {
							// 讓 newfilemenu 對 file_start_upload 能夠針對不同的 filelist 進行辨識
							this._newFileMenu = new OCA.MergeODF.NewFileMenu({
								fileList: this,
								parent_id: `#app-content-mergeodflist-${this.list_id}`,
								list_id: this.list_id
							});
							this.$el.find('.actions').append(this._newFileMenu.$el);
						}
						this._newFileMenu.showAt($target);

						return false;
					}
				});
			OCA.Files['MergeODFAPPFileList_' + list_id] = MergeODFAPPFileList;

			OCA.Files['MergeODFAPPPlugin_' + list_id] = {
				name: 'MergeODFAPP_' + list_id,
				fileListName: 'MergeODFAPPFileList_' + list_id,
				list_id: list_id,
				mount_point: app_id[i]['mount_point'],

				/**
				 * @type OCA.Files.MergeODFAPPFileList
				 */
				mergeodfFileList: null,

				attach: function () {
					var self = this;
					$('#app-content-mergeodflist-' + this.list_id).on('show.plugin-mergeodf', function (e) {
						self.showFileList($(e.target));
					});
					$('#app-content-mergeodflist-' + this.list_id).on('hide.plugin-mergeodf', function () {
						self.hideFileList();
					});
				},

				detach: function () {
					if (this.mergeodfFileList) {
						this.mergeodfFileList.destroy();
						OCA.Files.fileActions.off('setDefault.plugin-mergeodf', this._onActionsUpdated);
						OCA.Files.fileActions.off('registerAction.plugin-mergeodf', this._onActionsUpdated);
						$('#app-content-mergeodflist-' + this.list_id).off('.plugin-mergeodf');
						this.mergeodfFileList = null;
					}
				},

				showFileList: function ($el) {
					if (!this.mergeodfFileList) {
						this.mergeodfFileList = this._createMergeODFAPPFileList($el);
					}
					return this.mergeodfFileList;
				},

				hideFileList: function () {
					if (this.mergeodfFileList) {
						this.mergeodfFileList.$fileList.empty();
					}
				},

				/**
				 * Creates the favorites file list.
				 *
				 * @param $el container for the file list
				 * @return {OCA.Files.MergeODFAPPFileList} file list
				 */
				_createMergeODFAPPFileList: function ($el) {
					var fileActions = this._createFileActions();
					// register favorite list for sidebar section
					return new OCA.Files[this.fileListName](
						$el, {
						fileActions: fileActions,
						// The file list is created when a "show" event is handled,
						// so it should be marked as "shown" like it would have been
						// done if handling the event with the file list already
						// created.
						shown: true,
						list_id: this.list_id,
						mount_point: this.mount_point,
						enableUpload: true,
						maxChunkSize: OC.appConfig.files && OC.appConfig.files.max_chunk_size
					}
					);
				},

				_createFileActions: function () {
					// inherit file actions from the files app
					var fileActions = new OCA.Files.FileActions();
					// note: not merging the legacy actions because legacy apps are not
					// compatible with the sharing overview and need to be adapted first
					fileActions.registerDefaultActions();
					fileActions.merge(OCA.Files.fileActions);

					if (!this._globalActionsInitialized) {
						// in case actions are registered later
						this._onActionsUpdated = _.bind(this._onActionsUpdated, this);
						OCA.Files.fileActions.on('setDefault.plugin-mergeodf', this._onActionsUpdated);
						OCA.Files.fileActions.on('registerAction.plugin-mergeodf', this._onActionsUpdated);
						this._globalActionsInitialized = true;
					}
					// when the user clicks on a folder, redirect to the corresponding
					// folder in the files app instead of opening it directly
					fileActions.register('dir', 'Open', OC.PERMISSION_READ, '', function (filename, context) {
						OCA.Files.App.setActiveView('files', { silent: true });
						OCA.Files.App.fileList.changeDirectory(OC.joinPaths(context.$file.attr('data-path'), filename), true, true);
					});
					fileActions.setDefault('dir', 'Open');
					return fileActions;
				},

				_onActionsUpdated: function (ev) {
					if (ev.action) {
						this.mergeodfFileList.fileActions.registerAction(ev.action);
					} else if (ev.defaultAction) {
						this.mergeodfFileList.fileActions.setDefault(
							ev.defaultAction.mime,
							ev.defaultAction.name
						);
					}
				}
			};
			OC.Plugins.register('OCA.Files.App', OCA.Files['MergeODFAPPPlugin_' + list_id]);

		}

	})(OCA);
});
