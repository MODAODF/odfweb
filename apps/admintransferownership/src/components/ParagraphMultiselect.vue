<template>
	<p>
		<label :for="elId">
			<span>搜尋使用者</span>
		</label>
		<Multiselect
			:id="elId"
			v-model="selectedVal"
			:multiple="false"
			:options="formatedUserSuggestions"
			:searchable="true"
			placeholder="搜尋使用者"
			:preselect-first="true"
			:preserve-search="true"
			:loading="loadingUsers"
			track-by="user"
			label="displayName"
			:internal-search="false"
			:clear-on-select="false"
			:user-select="true"
			class="middle-align"
			@search-change="findUserDebounced" />
	</p>
</template>

<script>
import axios from '@nextcloud/axios'
import debounce from 'debounce'
import { generateOcsUrl } from '@nextcloud/router'
import Multiselect from '@nextcloud/vue/dist/Components/Multiselect'
import Vue from 'vue'

export default {
	name: 'ParagraphMultiselect',
	components: {
		Multiselect,
	},
	props: ['elId'],
	data() {
		return {
			selectedVal: '',
			loadingUsers: false,
			userSuggestions: {},
			config: {
				minSearchStringLength: parseInt(OC.config['sharing.minSearchStringLength'], 10) || 0,
			},
		}
	},
	watch: {
		selectedVal(newVal, oldVal) {
			this.$emit('selectedVal', this.selectedVal)
		}
	},
	computed: {
		formatedUserSuggestions() {
			return Object.keys(this.userSuggestions).map((uid) => {
				const user = this.userSuggestions[uid]
				return {
					user: user.uid,
					displayName: user.displayName,
					icon: 'icon-user',
				}
			})
		},
	},
	created() {
		this.findUserDebounced = debounce(this.findUser, 300)
		this.findUser('')
	},
	methods: {
		async findUser(query) {
			this.query = query.trim()
			if (query.length < this.config.minSearchStringLength) return
			this.loadingUsers = true
			try {
				const response = await axios.get(generateOcsUrl('apps/files_sharing/api/v1') + 'sharees', {
					params: {
						format: 'json',
						itemType: 'file',
						search: query,
						perPage: 20,
						lookup: false,
					},
				})
				if (response.data.ocs.meta.statuscode !== 100) {
					console.error('Error fetching suggestions', { response })
				}
				this.userSuggestions = {}
				response.data.ocs.data.exact.users.concat(response.data.ocs.data.users).forEach(user => {
					Vue.set(this.userSuggestions, user.value.shareWith, {
						uid: user.value.shareWith,
						displayName: user.label,
					})
				})

				const uid = OC.getCurrentUser().uid
				const displayName = OC.getCurrentUser().displayName
				if (this.query === '' || (uid.includes(this.query) || displayName.includes(this.query))) {
					Vue.set(this.userSuggestions, OC.getCurrentUser().uid, { uid, displayName })
				}

			} catch (error) {
				console.error('could not fetch users', { error })
			} finally {
				this.loadingUsers = false
			}
		},
	}
}
</script>

<style scoped lang="scss">
p {
	display: flex;
	label {
		display: flex;
		align-items: center;
		span {
			margin-right: 8px;
		}
	}
	.multiselect {
		flex-grow: 1;
		max-width: 280px;
	}
}
</style>
