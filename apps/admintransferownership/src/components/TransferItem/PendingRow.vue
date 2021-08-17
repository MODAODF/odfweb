<template>
	<tr>
		<td>{{ index+1 }}</td>
		<td class="sourceUser">{{ sourceUser }}</td>
		<td class="targetUser">{{ targetUser }}</td>
		<td class="nodeName">{{ nodeName }}</td>
		<td class="actions">
			<div v-if="actionStatus !== undefined">
				{{ actionStatus }}
			</div>
			<div v-else>
				<button @click="reply('accept')" :disabled="btnDisabled === true">接收</button>
				<button @click="reply('reject')" :disabled="btnDisabled === true">拒絕</button>
			</div>
		</td>
	</tr>
</template>

<script>
import axios from '@nextcloud/axios'
import { showSuccess, showError } from '@nextcloud/dialogs'

export default {
	name: 'PendingRow',
	props: {
		index: {
			type: Number,
			required: true,
		},
		item: {
			type: Array,
			required: true,
		},
	},
	watch: {
		item() {
			this.id = this.item.id
			this.sourceUser = this.item.sourceUser
			this.targetUser = this.item.targetUser
			this.fileId = this.item.fileId
			this.nodeName = this.item.nodeName
		}
	},
	data() {
		return {
			id: this.item.id,
			sourceUser: this.item.sourceUser,
			targetUser: this.item.targetUser,
			fileId: this.item.fileId,
			nodeName: this.item.nodeName,

			appId: 'admintransferownership',
			btnDisabled: false,
			actionStatus: undefined,
			baseUrl: OC.generateUrl('apps/admintransferownership'),
		}
	},
	methods: {
		reply(type) {
			this.btnDisabled = true
			axios.get(`${this.baseUrl}/${type}/${this.id}`)
				.then(({ data }) => {
					const msg = data?.message || `已回覆(${t(this.appId, type)})`
					this.actionStatus = msg
					showSuccess(msg)
				})
				.catch(error => {
					const msg = error?.response?.data?.message || '未知的錯誤'
					this.actionStatus = msg
					showError(msg)
				})
		},
	},
}
</script>

<style scoped lang="scss">
.actions button {
	margin: auto 5px;
}
</style>
