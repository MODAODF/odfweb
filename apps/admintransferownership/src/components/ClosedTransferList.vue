<template>
	<div class="list">
		<h3><b>已完成</b>的移交項目</h3>
		<div>
			<em v-if="this.errorMsg || emptyListText">
				{{ this.errorMsg || emptyListText }}
			</em>
			<table v-else-if="getList !== undefined">
				<thead>
					<tr>
						<th></th>
						<th @click="sort('sourceUser')">原擁有者</th>
						<th @click="sort('targetUser')">新擁有者</th>
						<th @click="sort('nodeName')">檔案名稱</th>
						<th @click="sort('replyType')">回覆類型</th>
						<th @click="sort('replyUser')">回覆者</th>
						<th @click="sort('replyAt')">回覆時間</th>
						<th @click="sort('executeResult')">執行結果</th>
						<th @click="sort('executeAt')">執行時間</th>
					</tr>
				</thead>
				<tbody>
					<ClosedRow v-for="(item, index) in getList"
						:key="index"
						:index="index"
						:item="item" />
				</tbody>
			</table>
		</div>
	</div>
</template>

<script>
import ClosedRow from './TransferItem/ClosedRow'

export default {
	name: 'ClosedTransferList',
	components: {
		ClosedRow,
	},
	props: ['errorMsg', 'initList', 'searchOjb'],
	computed: {
		emptyListText() {
			if (this.newlist && this.newlist.length < 1) {
				if (this.searchName || this.searchUser) {
					return `沒有 ${this.searchName || this.searchUser} 的移交紀錄`
				}
				return '沒有移交紀錄'
			}
			return null
		},
		getList() {
			if (this.currentSort) {
				return this.sorted()
			}
			return this.newlist
		}
	},
	watch: {
		initList(newVal, oldVal) {
			this.newlist = newVal
		},
		searchOjb(newVal, oldVal) {
			if (!newVal) {
				this.newlist = this.initList
			} else {
				this.searchName = newVal?.displayName || null
				this.searchUid = newVal?.user || null
				this.filterList()
			}
		},
	},
	data() {
		return {
			newlist: null,
			searchName: null,
			searchUid: null,
			currentSort: '',
			currentSortDir: 'asc',
		}
	},
	methods: {
		filterList() {
			const name = this.searchName
			const uid = this.searchUid
			this.newlist = this.initList.filter((item) => {
				return item.targetUser === name || item.sourceUser === name || item.replyUser === name || item.targetUser === uid || item.sourceUser === uid || item.replyUser === uid
			})
		},
		sort(s) {
			if (s === this.currentSort) { // reverse
				this.currentSortDir = this.currentSortDir === 'asc' ? 'desc' : 'asc'
			}
			this.currentSort = s
		},
		sorted() {
			return this.newlist.sort((a, b) => {
				let modifier = 1
				const valA = a[this.currentSort] || ''
				const valB = b[this.currentSort] || ''
				if (this.currentSortDir === 'desc') modifier = -1
				if (valA < valB) return -1 * modifier
				if (valA > valB) return 1 * modifier
				return 0
			})
		}
	}
}
</script>
