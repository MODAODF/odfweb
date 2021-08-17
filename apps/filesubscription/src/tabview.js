// import { generateOcsUrl } from '@nextcloud/router'
import '../css/tabview.scss'

(function() {
	const TabView = OCA.Files.DetailTabView.extend({

		id: 'fileSubscriptionTabView',
		className: 'tab fileSubscriptionTabView',
		appId: 'filesubscription',

		getLabel() {
			return t(this.appId, 'subscription')
		},

		getIcon() {
			return 'icon-mail'
		},

		template() {
			return `<div class="loading icon-loading-small"></div>
			  <div class="linksWrapper hidden"></div>
			  <button class="reloadLinks hidden">${t(this.appId, 'Reload')}</button>`
		},

		_sectionTemplates: {
			l10n(str) {
				return t('filesubscription', str)
			},
			getLinkFail() {
				return `<div>${this.l10n('Unable to get share link')}</div>`
			},
			noLink() {
				return `<div>
				${this.l10n('There is no external share link of this resource, please reload after creating an external share link in the "Shareing" tab.')}</br>
				${this.l10n('Note: This application does not support the subscription of internal links.')}
				</div>`
			},
			notOwner() {
				return `<div>${this.l10n('Not file owner')}</div>`
			},
			$item(id) {
				return `<div class="item" share-id=${id}></div>`
			},
			$itemContent_vaild(subscr, share) {
				const params = {
					shareId: share.id,
					labelName: share.label,
					isEnabled: subscr.enabled, // int
					entryAvatarCssClass: subscr.enabled ? 'entryAvatarOpen' : 'entryAvatarClose',
					message: subscr.message,
					subscriberNum: subscr.subscriberNum,
					buttonDisable: subscr.subscriberNum > 0 ? '' : 'disabled',

					strEntrySubscriberNum: this.l10n('Subscribers'),
					strEntryEnable: this.l10n(subscr.enabled ? 'Enabled' : 'Disabled'),
					strEntryTitle: this.l10n('Share Link'),
					strLiTitleEdit: this.l10n('Notification message'),
					strLastUpdateOn: this.l10n('Last updated on'),
					strSave: this.l10n('Save'),
					strLiTitleMail: this.l10n('Email subscription'),
					strSend: this.l10n('Send'),
					strLastEmailOn: this.l10n('Last notified on'),
					strLiTitleCancel: this.l10n('Cancel subscribers'),
					strCancel: this.l10n('Cancel'),
					strLastCancelOn: this.l10n('Last cancelled on'),
				}

				if (subscr.last_message_time) {
					params['lastMessageTime'] = subscr.last_message_time // Y-m-d H:i
				}
				if (subscr.last_email_time) {
					params['lastEmailTime'] = subscr.last_email_time // Y-m-d H:i
				}
				if (subscr.last_cancel_time) {
					params['lastCancelTime'] = subscr.last_cancel_time // Y-m-d H:i
				}
				return OCA.FileSubscription.Templates['sidebar-vaildItem'](params)
			},
			$itemContent_invaild(subscr, hasLog) {
				const params = {
					shareId: subscr.share_id,
					labelName: subscr.share_label,
					hasLog,
					strEntryTitle: this.l10n('Share Link'),
					strEntryDeleted: this.l10n('Deleted'),
					strBtnLog: this.l10n('Download notification log'),
					strNoLog: this.l10n('There is no notification log for this share link.'),
					strBtnDelete: this.l10n('Delete'),
				}
				return OCA.FileSubscription.Templates['sidebar-invaildItem'](params)
			}
		},

		canDisplay(fileInfo) {
			return !(typeof fileInfo.shareOwnerId != 'undefined' || fileInfo.shareOwnerI)
		},

		/**
		 * Renders this details view
		 */
		render() {
			this.$el.html(this.template())
			this._getInitData()

			// delegate all btn Events
			this.delegateEvents({
				'click button.reloadLinks': 'render',
				'click button.entryEdit': '_onEntryEdit',
				'change input[name=subscribable]': '_onSubscrSetting',
				'click button.setDescr': '_onSubscrSetting',
				'click button.sendSubscrMail': '_onSendMailEvent',
				'click button.cancelSubscr': '_onCancelEvent',
				'click button.downloadLog': '_onLogDownloadEvent',
				'click button.deleteLog': '_onLogDeletelEvent',
			})
		},

		// 初始化資料：分享連結+訂閱資訊
		_getInitData() {
			const file = this.getFileInfo()
			const fileId = file.attributes.id
			const path = `${file.attributes.path}/${file.attributes.name}`
			$.ajax({
				context: this,
				url: OC.generateUrl(`/apps/${this.appId}/`),
				type: 'POST',
				data: {
					fileId,
					path: JSON.stringify(path.replace('//', '/'))
				},
				beforeSend() {
					$('.linksWrapper').hide()
					$('.reloadLinks').hide()
					$(this.$el).find('.loading').show()
				}
			}).done(function(resp) {
				let dataObj = { data: resp }
				if (typeof resp.result != 'undefined' && !resp.result) {
					dataObj = { data: null, errorType: 'notOwner' }
				}
				this._renderInitData(dataObj)
			}).fail(function(e) {
				this._renderInitData({ data: null, errorType: 'getLinkFail' })
			}).always(function(resp) {
				$(this.$el).find('.loading').hide()
			})
		},

		_renderInitData(obj) {
			const $wrapper = $('.linksWrapper')
			if ($wrapper.length < 1) return
			$wrapper.children().remove()

			const templates = this._sectionTemplates
			if (!obj || !obj.data) {
				if (obj.errorType === 'notOwner') {
					$wrapper.html(templates.notOwner())
				} else {
					$wrapper.html(templates.getLinkFail())
				}
			} else if (obj.data.length < 1) {
				$wrapper.html(templates.noLink())
			} else {
				for (const idx in obj.data) {
					const row = obj.data[idx]

					const itemWrapper = templates.$item(row.subscription.share_id)
					const selector = `.item[share-id=${row.subscription.share_id}]`
					const itemContent = (row.sharing) ? templates.$itemContent_vaild(row.subscription, row.sharing) : templates.$itemContent_invaild(row.subscription, row.hasSubscrLog)

					// 避免重複 render
					if ($(selector).length === 0) {
						$wrapper.append(itemWrapper)
					}
					if ($(selector).children().length === 0) {
						$(selector).append(itemContent)
						$(selector).find('button.entryEdit').click()
					}
				}
			}
			$wrapper.show()
			$('.reloadLinks').show()
		},

		// Rerender 訂閱資訊
		_rerenderItemData(resp) {
			const $item = $(`div.item[share-id=${resp.share_id}]`)
			const share = {
				id: resp.share_id,
				label: $item.find('.itemEntry h5 span').text()
			}
			const subscr = {
				enabled: resp.enabled,
				message: resp.message,
				subscriberNum: resp.subscriberNum,
				last_message_time: resp.last_message_time,
				last_email_time: resp.last_email_time,
				last_cancel_time: resp.last_cancel_time,
			}
			$item.html(this._sectionTemplates.$itemContent_vaild(subscr, share))
		},

		// 顯示訂閱設定內容
		_onEntryEdit(e) {
			const shareId = $(e.target).closest('.item').attr('share-id')
			$(`.item[share-id=${shareId}] ul`).toggle(500)
			$(`.item[share-id=${shareId}] .entryEdit`).toggleClass('rotate')

			$(`.item:not([share-id=${shareId}]) ul`).hide(500)
			$(`.item:not([share-id=${shareId}]) .entryEdit`).removeClass('rotate')
		},

		// 寄訂閱信件
		_onSendMailEvent(e) {
			const shareId = $(e.target).closest('.item').attr('share-id')
			const $formElements = $('.item[share-id]').find('button, input, textarea')

			const $msg = $(e.target).closest('li').find('.msg')
			const msgResponse = { status: '', data: { message: '' } }

			$.ajax({
				context: this,
				url: OC.generateUrl(`/apps/${this.appId}/mail/update`),
				type: 'POST',
				data: { shareId },
				beforeSend() {
					$formElements.attr('disabled', 'disabled')
					OC.msg.startAction($msg, t(this.appId, 'Sending...'))
				}
			}).done(function(resp) {
				msgResponse.status = 'success'
				msgResponse.data.message = resp.data.message
				const $timeDiv = $(`.item[share-id=${shareId}]`).find('.sendSubscrMail ~ .lasttime')
				if ($timeDiv.find('em').length > 0) {
					$timeDiv.find('em > span').text(resp.data.lastEmailTime)
				} else {
					$timeDiv.append(`<em>${t(this.appId, 'Last notified on')} <span>${resp.data.lastEmailTime}</span></em>`)
				}
			}).fail(function(resp) {
				if (typeof resp.responseJSON.data.message != 'undefined') {
					msgResponse.data.message += resp.responseJSON.data.message
				}
			}).always(function() {
				OC.msg.finishedAction($msg, msgResponse)
				$formElements.removeAttr('disabled')
			})
		},

		// 設定變更
		_onSubscrSetting(e) {
			const shareId = $(e.target).closest('.item').attr('share-id')
			const setVal = {
				enabled: $(`#subscribable${shareId}`).is(':checked'),
				message: $(`#versionDescr${shareId}`).val(),
				updateMessageTime: $(e.target).hasClass('setDescr'),
			}

			const $formElements = $('.item[share-id]').find('button, input, textarea')
			const $msg = $(e.target).closest('li').find('.msg')
			const msgResponse = { status: '', data: { message: '' } }

			$.ajax({
				context: this,
				url: OC.generateUrl(`/apps/${this.appId}/update/${shareId}`),
				type: 'POST',
				data: { shareId, setVal },
				beforeSend() {
					$formElements.attr('disabled', 'disabled')
					OC.msg.startAction($msg, t(this.appId, 'Setting...'))
				}
			}).done(function(resp) {
				this._rerenderItemData(resp)
			}).fail(function(e) {
				msgResponse.data.message = t(this.appId, 'Failed')
			}).always(function() {
				OC.msg.finishedAction($msg, msgResponse)
				$formElements.removeAttr('disabled')
			})
		},

		// 取消訂閱
		_onCancelEvent(e) {
			const $formElements = $('.item[share-id]').find('button, input, textarea')
			$formElements.attr('disabled', 'disabled')
			const self = this
			const confirmed = function(confirm) {
				if (!confirm) {
					$formElements.removeAttr('disabled')
					return
				}

				const $msg = $(e.target).closest('li').find('.msg')
				const msgResponse = { status: '', data: { message: '' } }

				$.ajax({
					context: self,
					url: OC.generateUrl(`/apps/${self.appId}/cancel`),
					type: 'POST',
					data: {
						shareId: $(e.target).closest('.item').attr('share-id'),
					},
					beforeSend() {
						OC.msg.startAction($msg, t(self.appId, 'Setting...'))
					}
				}).done(function(resp) {
					self._rerenderItemData(resp)
				}).fail(function(resp) {
					msgResponse.data.message = t(self.appId, 'Failed')
					if (typeof resp.responseJSON.message != 'undefined') {
						msgResponse.data.message += ': '
						msgResponse.data.message += resp.responseJSON.message
					}
				}).always(function() {
					OC.msg.finishedAction($msg, msgResponse)
					$formElements.removeAttr('disabled')
				})
			}
			OC.dialogs.confirm(
				t(this.appId, 'The system will send a cancellation notice to subscribers and remove all subscribers.'),
				t(this.appId, 'Please confirm the cancellation'),
				confirmed
			)
		},

		// 已失效訂閱, 下載訂閱紀錄
		_onLogDownloadEvent(e) {
			const $formElements = $('.item[share-id]').find('button, input, textarea')
			$formElements.attr('disabled', 'disabled')

			const $msg = $(e.target).closest('li').find('.msg')
			const msgResponse = { status: '', data: { message: '' } }

			const shareId = $(e.target).closest('.item').attr('share-id')
			$.ajax({
				context: this,
				url: OC.generateUrl(`/apps/${this.appId}/log/${shareId}`),
				type: 'GET',
				beforeSend() {
					OC.msg.startAction($msg, t(this.appId, 'Loading...'))
				}
			}).done(function(resp) {
				if (typeof resp.data.path != 'undefined') {
					window.location.href = resp.data.path
				}
				msgResponse.status = 'success'
				msgResponse.data.message = 'OK'
			}).fail(function(resp) {
				msgResponse.data.message = t(this.appId, 'Unable to load')
				if (typeof resp.responseJSON.message != 'undefined') {
					msgResponse.data.message = resp.responseJSON.message
				}
			}).always(function(resp) {
				OC.msg.finishedAction($msg, msgResponse)
				$formElements.removeAttr('disabled')
			})
		},

		// 已失效訂閱, 刪除訂閱紀錄
		_onLogDeletelEvent(e) {
			const $formElements = $('.item[share-id]').find('button, input, textarea')
			$formElements.attr('disabled', 'disabled')
			const self = this
			const confirmed = function(confirm) {
				if (!confirm) {
					$formElements.removeAttr('disabled')
					return
				}
				const shareId = $(e.target).closest('.item').attr('share-id')
				$.ajax({
					context: self,
					url: OC.generateUrl(`/apps/${self.appId}/log/${shareId}`),
					type: 'DELETE',
				}).done(function(resp) {
					$(`.item[share-id = ${shareId}]`).remove()
				}).always(function(resp) {
					$formElements.removeAttr('disabled')
					self.render()
				})
			}
			OC.dialogs.confirm(
				t(this.appId, 'The subscription to the shared link will be deleted.'),
				t(this.appId, 'Please confirm the removal'),
				confirmed
			)
		},

	})
	OCA.FileSubscription.TabView = TabView
})()
