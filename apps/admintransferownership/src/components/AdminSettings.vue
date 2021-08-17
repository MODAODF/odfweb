<template>
	<div id="transfer-settings" class="section">
		<h2>{{ t('admintransferownership', 'AdminTransferownership') }}</h2>
		<TransferOwnershipAdminDialogue />
		<hr>
		<h2>移交紀錄</h2>
		<TransferOwnershipLog />
	</div>
</template>

<script>
import TransferOwnershipAdminDialogue from './TransferOwnershipAdminDialogue'
import TransferOwnershipLog from './TransferOwnershipLog'

export default {
	name: 'AdminSettings',
	components: {
		TransferOwnershipAdminDialogue,
		TransferOwnershipLog,
	},
}
</script>
