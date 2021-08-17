<template>
	<div>
		<ParagraphMultiselect :elId="searchUserKey" @selectedVal="getSelectedVal" /><br>
		<!-- 各項紀錄 -->
		<PendingTransferList :errorMsg="pendingObj.listError" :initList="pendingObj.list" :searchOjb="searchObj" /><br>
		<BackgroundJobTransferList :errorMsg="jobObj.listError" :initList="jobObj.list" :searchOjb="searchObj" /><br>
		<ClosedTransferList  :errorMsg="closedObj.listError" :initList="closedObj.list" :searchOjb="searchObj" />
	</div>
</template>

<script>
import axios from '@nextcloud/axios'
import ParagraphMultiselect from './ParagraphMultiselect'
import PendingTransferList from './PendingTransferList'
import BackgroundJobTransferList from './BackgroundJobTransferList'
import ClosedTransferList from './ClosedTransferList'

export default {
	name: 'TransferOwnershipLog',
	components: {
		ParagraphMultiselect,
		PendingTransferList,
		BackgroundJobTransferList,
		ClosedTransferList,
	},
	data() {
		const baseUrl = OC.generateUrl('apps/admintransferownership/log')
		return {
			searchObj: null,
			pendingObj: {
				api: baseUrl + '/pendinglist',
				list: undefined,
				listError: undefined,
			},
			jobObj: {
				api: baseUrl + '/joblist',
				list: undefined,
				listError: undefined,
			},
			closedObj: {
				api: baseUrl + '/closedlist',
				list: undefined,
				listError: undefined,
			}
		}
	},
	beforeMount() {
		this.getData('pendingObj')
		this.getData('jobObj')
		this.getData('closedObj')
	},
	methods: {
		getSelectedVal(val) {
			this.searchObj = val
		},
		getData(objName) {
			const self = this[objName]
			axios.get(self.api)
				.then(({ data }) => {
					self.list = data
				})
				.catch(error => {
					self.list = undefined
					if (error?.response?.status === 400) {
						self.listError = error?.response?.data?.message || '無法取得資料'
					} else if (error?.response?.status === 404) {
						self.listError = error?.response?.data?.message || '沒有移交項目'
					} else {
						self.listError = '無法取得資料'
					}
				})
		},
	}
}
</script>

<style scoped lang="scss">
/deep/ .list {
	table {
		margin: 15px auto;
		width: 100%;
		border-collapse: collapse;
		border: 0.5px solid lightgray;
		thead tr {
			background-color: lightgray;
			th:not([colspan="2"]):not(:first-child):hover {
				text-decoration: underline;
				cursor: pointer;
			}
		}
		th {
			padding: 10px;
			text-align: center;
			font-weight: 900;
			color: black;
		}
		tr {
			&:nth-child(even) {
				background-color: #f5f5f5;
			}
			&:hover {
				background-color: #e7e7e7;
			}
			td {
				text-align: center;
				padding: 6px;
			}
			td:first-child {
				color: gray;
				font-size: 10px;
				width: 5%;
			}
		}
	}
}
</style>
