<template>
	<v-container fluid v-if="show">
		<v-dialog v-model="show" max-width="1600" persistent>
			<v-card>
				<v-toolbar dark color="header">
					<v-icon class="mx-2">mdi-pencil</v-icon>
					<v-toolbar-title>{{ $t('base.label.new') + ' ' + $t(translate + '.' + translate) }}</v-toolbar-title>
					<v-spacer></v-spacer>
					<v-btn icon dark class="mx-1" @click="submit"> <v-icon>save</v-icon> </v-btn>
					<v-btn icon dark class="mx-1" @click="setDefaultData"> <v-icon>format_clear</v-icon> </v-btn>
					<v-btn icon dark @click="$emit('closeSubForm', false)"> <v-icon>close</v-icon> </v-btn>
				</v-toolbar>
				<v-form ref="form" lazy-validation>
					<v-card-text>
						<v-container grid-list-md pb-0>
							<v-layout row wrap>
								<v-flex :class="formClass" v-for="(column, columnIndex) in props.columns" :key="columnIndex">
									<v-text-field v-if="column.formType === 'text'" v-model="data[column.value]" :label="$t(translate + '.' + column.text)" :rules="[v => !column.required || !!v || $t('base.form.required'), v => !v || v.length <= column.max || $t('base.form.max', [column.max]), v => !v || v.length >= column.min || $t('base.form.min', [column.min])]" :required="column.required" :maxLength="column.max" outlined dense></v-text-field>
									<v-checkbox v-if="column.formType === 'checkbox'" v-model="data[column.value]" class="form-checkbox" color="accent" :label="$t(translate + '.' + column.text)" />
									<smart-selection v-if="column.formType === 'combobox' || column.formType === 'autocomplete'" :type="column.formType" :label="$t(translate + '.' + column.text)" :value="data[column.value]" :model="column.value" :item-text="column.itemText" @onItemChange="onItemChange" :url="column.url" :response-key="column.responseKey" :required="column.required" :translate="column.text" />
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
								</v-flex>
							</v-layout>
						</v-container>
					</v-card-text>
				</v-form>
			</v-card>
		</v-dialog>
	</v-container>
</template>

<script>
import SmartSelection from '@/components/common/page/elements/SmartSelection'
import { mapActions } from 'vuex'

export default {
	name: 'sub-form',
	props: ['translate', 'url', 'show'],
	components: { 'smart-selection': SmartSelection },
	data: () => ({
		data: {},
		props: {}
	}),
	computed: {
		formClass() {
			return this.props.columns.length < 7 ? 'xs12 sm12 md12 lg12' : 'xs6 sm6 md6 lg6'
		}
	},
	methods: {
		...mapActions(['setSuccessAlert']),
		setDefaultData() {
			this.data = {}
			this.props.columns.forEach(column => {
				if (column.type === 'boolean') this.data[column.value] = true
			})
		},
		submit() {
			if (this.$refs.form.validate()) {
				this.axios.post(this.props.baseUrl, this.data, { loading: true }).then(
					() => {
						this.setSuccessAlert(this.$t('base.message.recordAdded') + '!')
						this.$emit('closeSubForm', true)
					},
					() => {}
				)
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
			const timeValue = this.data[value] === undefined ? '' : (this.data[value].split(' ').length === 2) ? this.data[value].split(' ')[1] : ''
			this.data[value] = timeValue === '' ? this.$moment(new Date(event)).format('DD-MM-YYYY') : this.$moment(new Date(event + ' ' + timeValue)).format('DD-MM-YYYY HH:mm:ss')      
		},
		onTimePickerInput(value, event) {
            this.data[value + 'TimeOpened'] = false
            this.data[value] = this.data[value] === undefined ? this.$moment(new Date()).format('DD-MM-YYYY') : this.data[value]
			this.data[value] = this.data[value].split(' ')[0] + ' ' + event + ':00'
		}
	},
	mounted() {
		this.props = {
			title: 'operationList',
			detailTitleKey: 'adi',
			baseUrl: 'operation',
			getUrl: 'operation/search/operation',
			responseKey: 'operations',
			columns: [
				{ type: 'text', formType: 'text', text: 'adi', value: 'adi', url: null, responseKey: null, itemText: null, tableValue: 'adi', required: true, sortable: true, searchable: true, searchKey: 'adi', showInTable: true, width: 45, min: 1, max: 60 },
				{ type: 'text', formType: 'text', text: 'kodu', value: 'kodu', url: null, responseKey: null, itemText: null, tableValue: 'kodu', required: true, sortable: true, searchable: true, searchKey: 'kodu', showInTable: true, width: 20, min: 1, max: 10 },
				{ type: 'text', formType: 'datepicker', text: 'operationDate', value: 'operationDate', url: null, responseKey: null, itemText: null, tableValue: 'operationDate', required: false, sortable: true, searchable: false, searchKey: 'operationDate', showInTable: true, width: 20 },
				{ type: 'boolean', formType: 'checkbox', text: 'active', value: 'active', url: null, responseKey: null, itemText: null, tableValue: 'active', required: true, sortable: true, searchable: false, searchKey: null, showInTable: true, width: 10 }
			],
			tabs: []
		}
		this.setDefaultData()
	}
}
</script>
