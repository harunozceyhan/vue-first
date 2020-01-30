<template>
	<v-container fluid>
		<v-card :id="'sub-table-card-' + tabIndex">
			<v-card-title>
				<v-spacer></v-spacer>
				<v-btn class="mx-2" fab dark small color="info" @click="getPageList()"> <v-icon dark>mdi-refresh</v-icon> </v-btn>
				<v-btn class="mx-2" fab dark small color="warning" @click="toggleSearch"> <v-icon dark>mdi-filter</v-icon> </v-btn>
				<v-btn class="mx-2" fab dark small color="success" @click="openDataRow(null, null)" v-permission="permission + ':post'"> <v-icon dark>add</v-icon> </v-btn>
			</v-card-title>
            <v-form ref="form" lazy-validation>
                <v-data-table :headers="headers" :items="tableItems" :options.sync="options" :server-items-length="getTabPage(tabIndex).totalElements" :loading="getTabTableLoading" :footer-props="{ 'items-per-page-options': [5, 10, 20, 50, 100] }" :items-per-page="5" class="elevation-1" calculate-widths single-expand >
                    <template v-slot:body="{ items, expand, isExpanded }">
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
                            <tr v-for="item in items" :key="item.id" >
                                <template v-if="!isExpanded(item)">
                                    <td v-for="(column, index) in tableColumns" :key="index">
                                        <span v-if="column.type === 'text' || column.type === 'object' || column.type === 'float' || column.type === 'integer'">{{ resolve(column.tableValue, item) }}</span>
                                        <span v-if="column.type === 'boolean'"> <v-switch inset class="table-checkbox" :input-value="item[column.tableValue]" hide-details color="accent" readonly /> </span>
                                    </td>
                                    <td class="text-center">
                                        <v-btn fab small icon color="info" @click="openDataRow(item, expand)" v-permission="permission + ':put'"> <v-icon>edit</v-icon> </v-btn>
                                    </td>
                                    <td class="text-center">
                                        <v-btn fab small icon color="error" @click="openDeleteModel($event, item.id)" v-permission="permission + ':delete'"> <v-icon>delete</v-icon> </v-btn>
                                    </td>
                                </template>
                                <template v-if="isExpanded(item)">
                                    <td v-for="(column, index) in tableColumns" :key="index">
                                        <v-container grid-list-md pb-0>
                                            <v-layout row wrap>
                                                <v-flex class="xs12 sm12 md12 lg12" mt-3>
                                                    <v-text-field v-if="column.formType === 'text' && column.type === 'float'" type="number" v-model.number="data[column.value]" :label="$t(translate + '.' + column.text)" :rules="[v => !column.required || !!v || $t('base.form.required')]" :required="column.required" outlined dense></v-text-field>
                                                    <v-text-field v-if="column.formType === 'text' && column.type === 'integer'" type="number" v-model.number="data[column.value]" :label="$t(translate + '.' + column.text)" :rules="[v => !column.required || !!v || $t('base.form.required'), v => !v || v <= 2147483647 || $t('base.form.max-int', [2147483647]), v => !v || v >= -2147483647 || $t('base.form.min-int', [2147483647])]" step="1" pattern="[0 - 9]" :required="column.required" outlined dense></v-text-field>
                                                    <v-text-field v-if="column.formType === 'text' && column.type === 'text'" v-model="data[column.value]" :label="$t(translate + '.' + column.text)" :rules="[v => !column.required || !!v || $t('base.form.required'), v => !v || v.length <= column.max || $t('base.form.max', [column.max]), v => !v || v.length >= column.min || $t('base.form.min', [column.min])]" :required="column.required" :maxLength="column.max" outlined dense></v-text-field>
                                                    <v-menu v-if="column.formType === 'datepicker'" :close-on-content-click="false" v-model="data[column.value + 'Opened']" :nudge-right="40" transition="scale-transition" offset-y max-width="290px" min-width="290px">
                                                        <template v-slot:activator="{ on }"> <v-text-field slot="activator" v-model="data[column.value]" :label="$t(translate + '.' + column.text)" prepend-inner-icon="event" clearable readonly :rules="[v => !column.required || !!v || $t('base.form.required')]" v-on="on" dense outlined></v-text-field> </template>
                                                        <v-date-picker :value="data[column.value] != undefined ? data[column.value].split('-')[2] + '-' + data[column.value].split('-')[1] + '-' + data[column.value].split('-')[0] : null" :locale="$i18n.locale" @input="onDatePickerInput(column.value, $event)" :first-day-of-week="1"></v-date-picker>
                                                    </v-menu>
                                                    <div v-if="column.formType === 'datetimepicker'">
                                                        <v-menu :close-on-content-click="false" v-model="data[column.value + 'Opened']" :nudge-right="40" transition="scale-transition" offset-y max-width="290px" min-width="290px">
                                                            <template v-slot:activator="{ on }"> <v-text-field style="width: 49%; float: left" slot="activator" :value="data[column.value] != undefined ? data[column.value].split(' ')[0] : ''" :label="$t(translate + '.' + column.text)" prepend-inner-icon="event" clearable readonly :rules="[v => !column.required || !!v || $t('base.form.required')]" v-on="on" dense outlined></v-text-field> </template>
                                                            <v-date-picker :value="data[column.value] != undefined ? data[column.value].split(' ')[0].split('-')[2] + '-' + data[column.value].split(' ')[0].split('-')[1] + '-' + data[column.value].split(' ')[0].split('-')[0] : null" :locale="$i18n.locale" @input="onDateTimeDatePickerInput(column.value, $event)" :first-day-of-week="1"></v-date-picker>
                                                        </v-menu>
                                                        <v-menu v-model="data[column.value + 'TimeOpened']" :close-on-content-click="false" :nudge-right="40" :return-value.sync="data[column.value + 'Time']" transition="scale-transition" offset-y max-width="290px" min-width="290px">
                                                            <template v-slot:activator="{ on }"> <v-text-field style="width: 49%; float: left; margin-left: 2%" :value="data[column.value] != undefined ? data[column.value].split(' ')[1] : ''" :label="$t(translate + '.' + column.text)" prepend-inner-icon="access_time" clearable readonly :rules="[v => !column.required || !!v || $t('base.form.required')]" v-on="on" dense outlined></v-text-field> </template>
                                                            <v-time-picker :value="data[column.value] != undefined ? data[column.value].split(' ')[1] : null" v-if="data[column.value + 'TimeOpened']" format="24hr" :locale="$i18n.locale" @input="onTimePickerInput(column.value, $event)" full-width></v-time-picker>
                                                        </v-menu>
                                                    </div>
                                                    <smart-selection :name="column.text" v-if="column.formType === 'combobox' || column.formType === 'autocomplete'" :type="column.formType" :label="$t(translate + '.' + column.text)" :value="data[column.value]" :model="column.value" :item-text="column.itemText" @onItemChange="onItemChange" :url="column.url" :response-key="column.responseKey" :required="column.required" :translate="column.text" :sub-metadata="column.metadata" :permission="permission"/>
                                                    <v-switch v-if="column.formType === 'checkbox'" v-model="data[column.value]" class="form-checkbox" color="accent" :label="$t(translate + '.' + column.text)" inset style="margin-top: 4px; margin-left: 4px" />
                                                </v-flex>
                                            </v-layout>
                                        </v-container>
                                    </td>
                                    <td class="text-center">
                                        <v-btn fab small icon color="success" @click="submit(expand, item)" v-permission="permission + ':put'"> <v-icon>save</v-icon> </v-btn>
                                    </td>
                                    <td class="text-center">
                                        <v-btn fab small icon color="warning" @click=" expand(item, false)"> <v-icon>cancel</v-icon></v-btn>
                                    </td>
                                </template>
                            </tr>
                            <tr v-if="isNew">
                                <td v-for="(column, index) in tableColumns" :key="index">
                                    <v-container grid-list-md pb-0>
                                        <v-layout row wrap>
                                            <v-flex class="xs12 sm12 md12 lg12" mt-3>
                                                <v-text-field v-if="column.formType === 'text' && column.type === 'float'" type="number" v-model.number="data[column.value]" :label="$t(translate + '.' + column.text)" :rules="[v => !column.required || !!v || $t('base.form.required')]" :required="column.required" outlined dense></v-text-field>
                                                <v-text-field v-if="column.formType === 'text' && column.type === 'integer'" type="number" v-model.number="data[column.value]" :label="$t(translate + '.' + column.text)" :rules="[v => !column.required || !!v || $t('base.form.required'), v => !v || v <= 2147483647 || $t('base.form.max-int', [2147483647]), v => !v || v >= -2147483647 || $t('base.form.min-int', [2147483647])]" step="1" pattern="[0 - 9]" :required="column.required" outlined dense></v-text-field>
                                                <v-text-field v-if="column.formType === 'text' && column.type === 'text'" v-model="data[column.value]" :label="$t(translate + '.' + column.text)" :rules="[v => !column.required || !!v || $t('base.form.required'), v => !v || v.length <= column.max || $t('base.form.max', [column.max]), v => !v || v.length >= column.min || $t('base.form.min', [column.min])]" :required="column.required" :maxLength="column.max" outlined dense></v-text-field>
                                                <v-menu v-if="column.formType === 'datepicker'" :close-on-content-click="false" v-model="data[column.value + 'Opened']" :nudge-right="40" transition="scale-transition" offset-y max-width="290px" min-width="290px">
                                                    <template v-slot:activator="{ on }"> <v-text-field slot="activator" v-model="data[column.value]" :label="$t(translate + '.' + column.text)" prepend-inner-icon="event" clearable readonly :rules="[v => !column.required || !!v || $t('base.form.required')]" v-on="on" dense outlined></v-text-field> </template>
                                                    <v-date-picker :value="data[column.value] != undefined ? data[column.value].split('-')[2] + '-' + data[column.value].split('-')[1] + '-' + data[column.value].split('-')[0] : null" :locale="$i18n.locale" @input="onDatePickerInput(column.value, $event)" :first-day-of-week="1"></v-date-picker>
                                                </v-menu>
                                                <div v-if="column.formType === 'datetimepicker'">
                                                    <v-menu :close-on-content-click="false" v-model="data[column.value + 'Opened']" :nudge-right="40" transition="scale-transition" offset-y max-width="290px" min-width="290px">
                                                        <template v-slot:activator="{ on }"> <v-text-field style="width: 49%; float: left" slot="activator" :value="data[column.value] != undefined ? data[column.value].split(' ')[0] : ''" :label="$t(translate + '.' + column.text)" prepend-inner-icon="event" clearable readonly :rules="[v => !column.required || !!v || $t('base.form.required')]" v-on="on" dense outlined></v-text-field> </template>
                                                        <v-date-picker :value="data[column.value] != undefined ? data[column.value].split(' ')[0].split('-')[2] + '-' + data[column.value].split(' ')[0].split('-')[1] + '-' + data[column.value].split(' ')[0].split('-')[0] : null" :locale="$i18n.locale" @input="onDateTimeDatePickerInput(column.value, $event)" :first-day-of-week="1"></v-date-picker>
                                                    </v-menu>
                                                    <v-menu v-model="data[column.value + 'TimeOpened']" :close-on-content-click="false" :nudge-right="40" :return-value.sync="data[column.value + 'Time']" transition="scale-transition" offset-y max-width="290px" min-width="290px">
                                                        <template v-slot:activator="{ on }"> <v-text-field style="width: 49%; float: left; margin-left: 2%" :value="data[column.value] != undefined ? data[column.value].split(' ')[1] : ''" :label="$t(translate + '.' + column.text)" prepend-inner-icon="access_time" clearable readonly :rules="[v => !column.required || !!v || $t('base.form.required')]" v-on="on" dense outlined></v-text-field> </template>
                                                        <v-time-picker :value="data[column.value] != undefined ? data[column.value].split(' ')[1] : null" v-if="data[column.value + 'TimeOpened']" format="24hr" :locale="$i18n.locale" @input="onTimePickerInput(column.value, $event)" full-width></v-time-picker>
                                                    </v-menu>
                                                </div>
                                                <smart-selection :name="column.text" v-if="column.formType === 'combobox' || column.formType === 'autocomplete'" :type="column.formType" :label="$t(translate + '.' + column.text)" :value="data[column.value]" :model="column.value" :item-text="column.itemText" @onItemChange="onItemChange" :url="column.url" :response-key="column.responseKey" :required="column.required" :translate="column.text" :sub-metadata="column.metadata" :permission="permission"/>
                                                <v-switch v-if="column.formType === 'checkbox'" v-model="data[column.value]" class="form-checkbox" color="accent" :label="$t(translate + '.' + column.text)" inset style="margin-top: 4px; margin-left: 4px" />
                                            </v-flex>
                                        </v-layout>
                                    </v-container>
                                </td>
                                <td class="text-center">
                                    <v-btn fab small icon color="success" @click="submit(null, null)" v-permission="permission + ':post'"> <v-icon>save</v-icon> </v-btn>
                                </td>
                                <td class="text-center">
                                    <v-btn fab small icon color="warning" @click="isNew = false "> <v-icon>cancel</v-icon> </v-btn>
                                </td>
                            </tr>
                            <tr v-if="items.length === 0">
                                <td :colspan="tableColumns.length + 1" class="text-center">{{ $t('base.label.no-data') }}...</td>
                            </tr>
                        </tbody>
                    </template>
                </v-data-table>
            </v-form>
		</v-card>
		<sure-model :show="sureModel.show" @hide="sureModel.show = false" @apply="deleteItem(sureModel.data)" />
	</v-container>
</template>

<script>
import Vue from 'vue'
import { mapGetters, mapActions } from 'vuex'
import SmartSelection from '@/components/common/page/elements/SmartSelection'
import SureModel from '@/components/common/layout/components/Sure'
Vue.component('smart-selection', SmartSelection)

export default {
	props: ['translate', 'metadata', 'tabIndex', 'permission'],
	components: {
		'sure-model': SureModel
	},
	data: () => ({
        isNew: false,
		sureModel: { show: false, data: null },
		showSearch: false,
		options: {},
		dates: {},
		filters: {},
		data: {},
		item: null,
		expand: null
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
		tableItems() {
			return this.getTabPage(this.tabIndex).mainList.filter(item => {
				return item
			})
		},
		headers() {
			let headers = []
			this.tableColumns.filter(column => {
				if (column.showInTable && column.metadata != this.getPage.metadata.value) {
					headers.push({ text: this.$t(this.translate + '.' + column.text), align: 'left', sortable: column.sortable, value: column.tableValue, width: column.width + '%' })
				}
			})
			headers.push({ text: this.$t('base.label.edit'), align: 'center', sortable: false, value: 'expand', width: '5%' })
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
                this.closeExpandedItem()
				const { sortBy, sortDesc, page, itemsPerPage } = this.options
				this.requestEmbeddedTabListOfPage({ index: this.tabIndex, requestUri: this.getTabMetadataOfPage(this.tabIndex).baseUrl + '/search/' + this.getPage.metadata.value + '?id=' + this.getPage.detailData.id + '&' + this.filterString() + 'page=' + (page - 1) + '&size=' + itemsPerPage + '&sort=' + (sortBy.length === 0 ? 'updatedAt' : sortBy[0]) + ',' + (sortDesc.length === 0 ? 'desc' : sortDesc[0] ? 'desc' : 'asc'), responseKey: this.getTabMetadataOfPage(this.tabIndex).responseKey })
			}
		},
		openDataRow(item, expand) {
            if (item == null) {
                this.data = {}
                this.data[this.getPage.metadata.value] = this.getPage.detailData
                this.isNew = true
                this.closeExpandedItem()
                setTimeout(() => {
					document.getElementById('router-view').scrollTop = document.getElementById('sub-table-card-' + this.tabIndex).clientHeight
					document.getElementsByClassName('v-dialog')[0].scrollTop = document.getElementById('sub-table-card-' + this.tabIndex).clientHeight
				}, 100)
            } else {
                this.isNew = false
                this.expand = expand
                this.item = item
                this.data = JSON.parse(JSON.stringify(item))
                expand(item, true)
            }
        },
        closeExpandedItem () {
            if (this.item != null) {
                this.expand(this.item, false)
                this.item = null
                this.expand = null
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
		resolve(path, obj) {
			return path.split('.').reduce(function(prev, curr) {
				return prev ? prev[curr] : null
			}, obj || self)
        },
		submit(expand, item) {
			if (this.$refs.form.validate()) {
				if (this.data.id === undefined) {
					this.axios.post(this.getTabMetadataOfPage(this.tabIndex).baseUrl, this.data, { loading: true }).then(
						() => {
                            this.setSuccessAlert(this.$t('base.message.recordAdded') + '!')
                            this.isNew = false
                            this.getPageList()
						},
						() => {}
					)
				} else {
					this.axios.put(this.getTabMetadataOfPage(this.tabIndex).baseUrl + '/' + this.data.id, this.data, { loading: true }).then(
						() => {
							this.setSuccessAlert(this.$t('base.message.recordUpdated') + '!')
							expand(item, false)
                            this.getPageList()
						},
						() => {}
					)
				}
			}
		},
		onItemChange(item) {
			this.data[item.model] = item.val
		},
		onDatePickerInput(value, event) {
			this.data[value + 'Opened'] = false
			this.data[value] = this.$moment(new Date(event)).format('DD-MM-YYYY')
		},
		onDateTimeDatePickerInput(value, event) {
			this.data[value + 'Opened'] = false
			const timeValue = this.data[value] === undefined ? '' : this.data[value].split(' ').length === 2 ? this.data[value].split(' ')[1] : ''
			this.data[value] = timeValue === '' ? this.$moment(new Date(event)).format('DD-MM-YYYY') : this.$moment(new Date(event + ' ' + timeValue)).format('DD-MM-YYYY HH:mm:ss')
		},
		onTimePickerInput(value, event) {
			this.data[value + 'TimeOpened'] = false
			this.data[value] = this.data[value] === undefined ? this.$moment(new Date()).format('DD-MM-YYYY') : this.data[value]
			this.data[value] = this.data[value].split(' ')[0] + ' ' + event + ':00'
		}
	},
	mounted() {
		this.revertToDefaultFilter()
	}
}
</script>
