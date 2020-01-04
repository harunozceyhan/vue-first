<template>
	<v-container fluid>
		<v-card>
			<v-card-title>
				<span class="headline secondary--text">{{ props.title }}</span>
				<v-spacer></v-spacer>
				<v-btn class="mx-2" fab dark small color="info" @click="getPageList()"> <v-icon dark>mdi-refresh</v-icon> </v-btn>
				<v-btn class="mx-2" fab dark small color="warning" @click="toggleSearch"> <v-icon dark>mdi-filter</v-icon> </v-btn>
				<v-btn class="mx-2" fab dark small color="success"> <v-icon dark>add</v-icon> </v-btn>
			</v-card-title>
			<v-card-text>
				<v-data-table :headers="headers" :items="getPage.mainList" :options.sync="options" :server-items-length="getPage.totalElements" :loading="getTableLoading" :footer-props="{ 'items-per-page-options': [5, 10, 20, 50, 100] }" :items-per-page="5" class="elevation-1" calculate-widths>
					<template v-slot:body.prepend v-if="showSearch">
						<tr>
							<td v-for="(column, index) in tableColumns" :key="index"><v-text-field v-if="column.searchable" dense hide-details single-line v-model="filters[column.searchKey]" type="text" label="Ara..." prepend-inner-icon="search" @input="triggerSearch"></v-text-field></td>
							<td></td>
						</tr>
					</template>
					<template v-slot:item.active="{ item }">
						<v-checkbox class="table-checkbox" :input-value="item.active === undefined" hide-details color="accent" readonly></v-checkbox>
					</template>
					<template v-slot:item.delete="{ item }">
						<v-btn fab small icon color="error" @click="sureModel = { show: true, data: item.id }"> <v-icon>delete</v-icon> </v-btn>
					</template>
				</v-data-table>
			</v-card-text>
		</v-card>
		<sure-model :show="sureModel.show" @hide="sureModel.show = false" @apply="deleteItem(sureModel.data)" />
	</v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import SureModel from '@/components/common/layout/Sure'

export default {
	props: ['props'],
	components: {
		'sure-model': SureModel
	},
	data: () => ({
		sureModel: { show: false, data: null },
		showSearch: false,
		options: {},
		filters: {}
	}),
	computed: {
		...mapGetters(['getPage', 'getTableLoading']),
		tableColumns() {
			return this.props.columns.filter(column => {
				if (column.showInTable) {
					return column
				}
			})
		},
		headers() {
			let headers = []
			this.tableColumns.filter(column => {
				if (column.showInTable) {
					headers.push({ text: column.text, align: column.type === 'text' ? 'left' : 'center', sortable: column.sortable, value: column.value, width: column.width + '%' })
				}
			})
			headers.push({ text: 'Sil', align: 'center', sortable: false, value: 'delete', width: '5%' })
			return headers
		}
	},
	watch: {
		options: {
			handler() {
				this.getPageList()
			},
			deep: true
		},
		filters: {
			handler() {
				this.getPageList()
			},
			deep: true
		}
	},
	methods: {
		...mapActions(['requestEmbeddedMainListOfPage']),
		triggerSearch() {
			this.getPageList()
		},
		filterString() {
			let filterString = ''
			for (let key in this.filters) {
				filterString += key + '=' + this.filters[key] + '&'
			}
			return filterString
		},
		revertToDefaultFilter() {
			this.filters = {}
			this.props.columns.filter(column => {
				if (column.showInTable && column.searchable) {
					this.filters[column.searchKey] = ''
				}
			})
		},
		toggleSearch() {
			this.showSearch = !this.showSearch
			if (!this.showSearch) this.revertToDefaultFilter()
		},
		getPageList() {
			const { sortBy, sortDesc, page, itemsPerPage } = this.options
			this.requestEmbeddedMainListOfPage({ requestUri: this.props.getUrl + '?' + this.filterString() + 'page=' + (page - 1) + '&size=' + itemsPerPage + '&sort=' + (sortBy.length === 0 ? 'updatedAt' : sortBy[0]) + ',' + (sortDesc.length === 0 ? 'asc' : sortDesc[0] ? 'desc' : 'asc'), responseKey: this.props.responseKey })
		},
		deleteItem(id) {
			this.axios.delete(this.props.baseUrl + '/' + id, { loading: true }).then(() => this.getPageList())
		}
	},
	mounted() {
		this.revertToDefaultFilter()
		this.getPageList()
	}
}
</script>
