<template>
	<tr>
		<td>{{ index+1 }}</td>
		<td class="sourceUser">{{ sourceUser }}</td>
		<td class="targetUser">{{ targetUser }}</td>
		<td class="nodeName">{{ nodeName }}</td>
		<td class="replyType"> {{ replyType }} </td>
		<td class="replyUser"> {{ replyUser }} </td>
		<td class="replyAt"> {{ replyAt }} </td>
	</tr>
</template>

<script>
export default {
	name: 'BackgroundJobRow',
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
			this.replyType = this.item.replyType
			this.replyUser = this.item.replyUser
			this.replyAt = this.item.replyAt
		}
	},
	data() {
		return {
			id: this.item.id,
			sourceUser: this.item.sourceUser,
			targetUser: this.item.targetUser,
			fileId: this.item.fileId,
			nodeName: this.item.nodeName,
			replyType: this.item.replyType,
			replyUser: this.item.replyUser,
			replyAt: this.item.replyAt,
		}
	}
}
</script>
