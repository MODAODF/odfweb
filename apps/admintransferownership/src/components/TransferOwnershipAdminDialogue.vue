<template>
	<div>
		<h3>轉移檔案或是資料夾的所有權</h3>
		<form @submit.prevent="submit">
			<ParagraphMultiselect :elId="sourceUser" :titleName="'原擁有者'" @selectedVal="getSelectedSourceUser" />
			<ParagraphMultiselect :elId="targetUser" :titleName="'新擁有者'" @selectedVal="getSelectedTargetUser" />
			<p>
				<input id="needConfirm"
					v-model="needConfirm"
					type="checkbox"
					class="checkbox">
				<label for="needConfirm">需要新的擁有者確認</label><br>
				<em>將發送移交通知給新的擁有者，新擁有者確認接受後才會執行移交</em>
			</p>
			<p>
				<input type="submit"
					class="primary"
					:value="submitButtonText"
					:disabled="!canSubmit">
				<!-- <span class="error">{{ submitError }}</span> -->
			</p>
		</form>
	</div>
</template>

<script>
import axios from '@nextcloud/axios'
import { showSuccess, showError } from '@nextcloud/dialogs'
import ParagraphMultiselect from './ParagraphMultiselect'

export default {
	name: 'TransferOwnershipAdminDialogue',
	components: {
		ParagraphMultiselect,
	},
	data() {
		return {
			directory: '/', // 預設為轉移SourceUser根目錄
			submitError: undefined,
			selectedSourceUser: null, // old owner
			selectedTargetUser: null, // new owner
			needConfirm: true,
		}
	},
	computed: {
		canSubmit() {
			if (this.selectedTargetUser?.user === this.selectedSourceUser?.user) {
				return false
			}
			return !!this.selectedTargetUser && !!this.selectedSourceUser
		},
		submitButtonText() {
			if (!this.canSubmit) {
				return '轉移'
			}
			return `將 ${this.selectedSourceUser.displayName} 的檔案轉移給 ${this.selectedTargetUser.displayName}`
		},
		readableDirectory() {
			if (!this.directory) {
				return ''
			}
			return this.directory.substring(1)
		},
	},
	methods: {
		getSelectedSourceUser(val) {
			this.selectedSourceUser = val
		},
		getSelectedTargetUser(val) {
			this.selectedTargetUser = val
		},
		submit() {
			if (!this.canSubmit) {
				console.warn('ignoring form submit')
			}
			this.submitError = undefined
			const data = {
				path: this.directory,
				sourceUID: this.selectedSourceUser.user,
				targetUID: this.selectedTargetUser.user,
				needConfirm: this.needConfirm,
			}
			const url = OC.generateUrl('/apps/admintransferownership/admintransfer')
			axios.post(url, data)
				.then(resp => resp.data)
				.then(data => {
					console.info('Transfer ownership request sent', { data })
					this.directory = undefined
					this.selectedSourceUser = null
					this.selectedTargetUser = null
					showSuccess('已送出所有權轉移的請求')
				})
				.catch(error => {
					console.error('Could not send ownership transfer request', { error })
					if (error?.response?.status === 403) {
						this.submitError = '無法轉移您未擁有的檔案或是資料夾所有權'
					} else if (error?.response?.status === 400) {
						this.submitError = error?.response?.data?.message || '未知的錯誤'
					} else {
						this.submitError = error.message || '未知的錯誤'
					}
					showError(this.submitError)
				})
		},
	},
}
</script>

<style scoped lang="scss">
p {
	margin-top: 12px;
	margin-bottom: 12px;
}
</style>
