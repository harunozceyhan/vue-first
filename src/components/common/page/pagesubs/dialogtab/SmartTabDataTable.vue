<template>
	<v-container fluid>
		<v-card id="table-card">
			<v-card-title>
				<v-spacer></v-spacer>
				<v-btn class="mx-2" fab dark small color="info" @click="getPageList()"> <v-icon dark>mdi-refresh</v-icon> </v-btn>
				<v-btn class="mx-2" fab dark small color="warning" @click="toggleSearch"> <v-icon dark>mdi-filter</v-icon></v-btn>
				<v-btn class="mx-2" fab dark small color="success" @click="openDetailCard({})" v-permission="permission + ':post'"> <v-icon dark>add</v-icon> </v-btn>
			</v-card-title>
			<v-data-table :headers="headers" :items="getTabPage(tabIndex).mainList" :options.sync="options" :server-items-length="getTabPage(tabIndex).totalElements" :loading="getTabTableLoading" :footer-props="{ 'items-per-page-options': [5, 10, 20, 50, 100] }" :items-per-page="5" class="elevation-1" calculate-widths>
				<template v-slot:body="{ items }">
					<tbody>
						<tr v-show="showSearch">
							<td v-for="(column, index) in tableColumns" :key="index">
								<v-text-field v-if="column.searchable && ((column.formType === 'text' && column.type === 'text') || column.formType === 'combobox' || column.formType === 'autocomplete')" dense hide-details single-line v-model="filters[column.searchKey]" type="text" :label="$t('base.label.search') + '...'" prepend-inner-icon="search" @input="triggerSearch"></v-text-field>
								<v-text-field v-if="column.searchable && column.formType === 'text' && (column.type === 'integer' || column.type === 'float')" type="number" dense hide-details single-line v-model="filters[column.searchKey]" :label="$t('base.label.search') + '...'" prepend-inner-icon="search" @input="triggerSearch"></v-text-field>
								<div v-if="column.searchable && (column.formType === 'datepicker' || column.formType === 'datetimepicker')">
									<v-menu :close-on-content-click="true" :nudge-right="40" transition="scale-transition" max-width="290px" min-width="290px">
										<template v-slot:activator="{ on }">
											<v-text-field style="width: 49%; float: left" slot="activator" v-model="filters['start' + column.searchKey]" :label="$t('base.label.startDate')" prepend-inner-icon="event" hide-details single-line clearable readonly v-on="on" dense @click:clear="dates['start' + column.searchKey] = null"></v-text-field>
										</template>
										<v-date-picker v-model="dates['start' + column.searchKey]" :locale="$i18n.locale" :first-day-of-week="1"></v-date-picker>
									</v-menu>
									<v-menu :close-on-content-click="true" :nudge-right="40" transition="scale-transition" max-width="290px" min-width="290px">
										<template v-slot:activator="{ on }">
											<v-text-field style="width: 49%; float: left; margin-left: 2%" slot="activator" v-model="filters['end' + column.searchKey]" :label="$t('base.label.endDate')" prepend-inner-icon="event" hide-details single-line clearable readonly v-on="on" dense @click:clear="dates['end' + column.searchKey] = null"></v-text-field>
										</template>
										<v-date-picker v-model="dates['end' + column.searchKey]" :locale="$i18n.locale" :first-day-of-week="1"></v-date-picker>
									</v-menu>
								</div>
							</td>
							<td></td>
						</tr>
						<tr v-for="item in items" :key="item.id" @click="openDetailCard(item)" style="cursor: pointer">
							<td v-for="(column, index) in tableColumns" :key="index">
								<span v-if="column.type === 'text' || column.type === 'object' || column.type === 'float' || column.type === 'integer'">{{ resolve(column.tableValue, item) }}</span>
								<span v-if="column.type === 'boolean'"> <v-switch inset class="table-checkbox" :input-value="item[column.tableValue]" hide-details color="accent" readonly /> </span>
							</td>
							<td>
								<v-btn fab small icon color="error" @click="openDeleteModel($event, item.id)" v-permission="permission + ':delete'">
									<v-icon>delete</v-icon>
								</v-btn>
							</td>
						</tr>
						<tr v-if="items.length === 0">
							<td :colspan="tableColumns.length + 1" class="text-center">{{ $t('base.label.no-data') }}...</td>
						</tr>
					</tbody>
				</template>
			</v-data-table>
		</v-card>
		<sure-model :show="sureModel.show" @hide="sureModel.show = false" @apply="deleteItem(sureModel.data)" />
	</v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import SureModel from '@/components/common/layout/components/Sure'

export default {
	props: ['translate', 'metadata', 'tabIndex', 'permission'],
	components: {
		'sure-model': SureModel
	},
	data: () => ({
		sureModel: { show: false, data: null },
		showSearch: false,
		options: {},
		dates: {},
		filters: {}
	}),
	computed: {
		...mapGetters(['getPage', 'getTabPage', 'getTabMetadataOfPage', 'getTabTableLoading', 'getDialog']),
		tableColumns() {
			return this.getTabMetadataOfPage(this.tabIndex).columns.filter(column => {
				if (column.showInTable && column.metadata != this.getPage.metadata.value) {
					return column
				}
			})
		},
		headers() {
			let headers = []
			this.tableColumns.filter(column => {
				if (column.showInTable && column.metadata != this.getPage.metadata.value) {
					headers.push({ text: this.$t(this.translate + '.' + column.text), align: 'left', sortable: column.sortable, value: column.tableValue, width: column.width + '%' })
				}
			})
			headers.push({ text: this.$t('base.label.delete'), align: 'center', sortable: false, value: 'delete', width: '5%' })
			return headers
		}
	},
	watch: {
		'getPage.detailData.id': function() {
			if (this.getPage.detailData.id != undefined) {
				this.getPageList()
			} else {
				this.clearTab()
			}
		},
		options: {
			handler() {
				this.getPageList()
			},
			deep: true
		},
		filters: {
			handler() {
				if (this.showSearch) this.getPageList()
			},
			deep: true
		},
		dates: {
			handler() {
				for (var prop in this.dates) {
					if (this.dates.hasOwnProperty(prop)) {
						this.filters[prop] = this.dates[prop] == null ? '' : this.$moment(new Date(this.dates[prop])).format('DD-MM-YYYY')
					}
				}
				this.getPageList()
			},
			deep: true
		}
	},
	methods: {
		...mapActions(['requestEmbeddedTabListOfPage', 'setSuccessAlert', 'setDetailDataOfTab', 'clearTab']),
		triggerSearch() {
			this.getPageList()
		},
		filterString() {
			let filterString = ''
			for (let key in this.filters) {
				filterString += key + '=' + (this.filters[key] === null ? '' : this.filters[key]) + '&'
			}
			return filterString
		},
		revertToDefaultFilter() {
			//TODO: boolean searchable will be add. Default null.
			this.filters = {}
			this.getTabMetadataOfPage(this.tabIndex).columns.filter(column => {
				if (column.showInTable && column.searchable && column.metadata != this.getPage.metadata.value) {
					if (column.formType === 'text' || column.formType === 'combobox' || column.formType === 'autocomplete') {
						this.filters[column.searchKey] = ''
					}
				}
			})
		},
		toggleSearch() {
			this.showSearch = !this.showSearch
			if (!this.showSearch) {
				this.revertToDefaultFilter()
				this.getPageList()
			}
		},
		getPageList() {
			if (this.getTabMetadataOfPage(this.tabIndex) != null && this.metadata === this.getTabMetadataOfPage(this.tabIndex).value) {
				const { sortBy, sortDesc, page, itemsPerPage } = this.options
				this.requestEmbeddedTabListOfPage({ index: this.tabIndex, requestUri: this.getTabMetadataOfPage(this.tabIndex).baseUrl + '/search/' + this.getPage.metadata.value + '?id=' + this.getPage.detailData.id + '&' + this.filterString() + 'page=' + (page - 1) + '&size=' + itemsPerPage + '&sort=' + (sortBy.length === 0 ? 'updatedAt' : sortBy[0]) + ',' + (sortDesc.length === 0 ? 'desc' : sortDesc[0] ? 'desc' : 'asc'), responseKey: this.getTabMetadataOfPage(this.tabIndex).responseKey })
			}
		},
		openDeleteModel(event, itemId) {
			this.sureModel = { show: true, data: itemId }
			event.stopPropagation()
		},
		deleteItem(id) {
			this.axios.delete(this.getTabMetadataOfPage(this.tabIndex).baseUrl + '/' + id, { loading: true }).then(
				() => {
					this.setSuccessAlert(this.$t('base.message.recordDeleted') + '!')
					this.getPageList()
				},
				() => {}
			)
		},
		openDetailCard(item) {
			this.setDetailDataOfTab({ index: this.tabIndex, detailData: item })
			this.$emit('openDetailDialog')
		},
		resolve(path, obj) {
			return path.split('.').reduce(function(prev, curr) {
				return prev ? prev[curr] : null
			}, obj || self)
		}
	},
	beforeDestroy() {
		this.$parent.$off('refreshPageList')
	},
	mounted() {
		this.revertToDefaultFilter()
		this.$parent.$on('refreshPageList', () => this.getPageList())
	}
}
</script>
