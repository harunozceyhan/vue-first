<template>
	<v-container fluid v-if="show">
		<v-dialog v-model="show" max-width="1600" persistent>
			<v-card v-if="metadata != null">
				<v-toolbar dark color="header">
					<v-icon class="mx-2">mdi-pencil</v-icon>
					<v-toolbar-title>{{ $t('base.label.new') + ' ' + $t(translate + '.' + translate) }}</v-toolbar-title>
					<v-spacer></v-spacer>
					<v-btn icon dark class="mx-1" @click="submit" v-permission="permission.split(':')[0] + ':' + metadata.baseUrl + ':post'"> <v-icon>save</v-icon> </v-btn>
					<v-btn icon dark class="mx-1" @click="setDefaultData"> <v-icon>format_clear</v-icon> </v-btn>
					<v-btn icon dark @click="$emit('closeSubForm', false)"> <v-icon>close</v-icon> </v-btn>
				</v-toolbar>
				<v-form ref="form" lazy-validation>
					<v-card-text>
						<v-container grid-list-md pb-0>
							<v-layout row wrap>
								<v-flex :class="formClass" v-for="(column, columnIndex) in metadata.columns" :key="columnIndex">
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
									<smart-selection :name="column.text" v-if="column.formType === 'combobox' || column.formType === 'autocomplete'" :type="column.formType" :label="$t(translate + '.' + column.text)" :value="data[column.value]" :model="column.value" :item-text="column.itemText" @onItemChange="onItemChange" :url="column.url" :response-key="column.responseKey" :required="column.required" :translate="column.text" :sub-metadata="column.metadata" :permission="permission" />
									<v-switch v-if="column.formType === 'checkbox'" v-model="data[column.value]" class="form-checkbox" color="accent" :label="$t(translate + '.' + column.text)" inset style="margin-top: 4px; margin-left: 4px" />
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
import Vue from 'vue'
import SmartSelection from '@/components/common/page/elements/SmartSelection'
import { mapActions } from 'vuex'
Vue.component('smart-selection', SmartSelection)

export default {
	name: 'sub-form',
	props: ['translate', 'show', 'subMetadata', 'permission'],
	data: () => ({
		data: {},
		metadata: null
	}),
	computed: {
		formClass() {
			return this.metadata != null ? (this.metadata.columns.length < 7 ? 'xs12 sm12 md12 lg12' : 'xs6 sm6 md6 lg6') : 'xs12 sm12 md12 lg12'
		}
	},
	watch: {
		metadata: {
			handler() {
				this.setDefaultData()
			},
			deep: true
		}
	},
	mounted() {
		if (this.subMetadata != undefined) {
			this.axios.get('metadata/' + this.subMetadata, { loading: true }).then(
				response => (this.metadata = response.data),
				() => {}
			)
		}
	},
	methods: {
		...mapActions(['setSuccessAlert']),
		setDefaultData() {
			if (this.metadata != null) {
				this.data = {}
				this.metadata.columns.forEach(column => {
					if (column.type === 'boolean') this.data[column.value] = true
				})
			}
		},
		submit() {
			if (this.$refs.form.validate()) {
				this.axios.post(this.metadata.baseUrl, this.data, { loading: true }).then(
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
			const timeValue = this.data[value] === undefined ? '' : this.data[value].split(' ').length === 2 ? this.data[value].split(' ')[1] : ''
			this.data[value] = timeValue === '' ? this.$moment(new Date(event)).format('DD-MM-YYYY') : this.$moment(new Date(event + ' ' + timeValue)).format('DD-MM-YYYY HH:mm:ss')
		},
		onTimePickerInput(value, event) {
			this.data[value + 'TimeOpened'] = false
			this.data[value] = this.data[value] === undefined ? this.$moment(new Date()).format('DD-MM-YYYY') : this.data[value]
			this.data[value] = this.data[value].split(' ')[0] + ' ' + event + ':00'
		}
	}
}
</script>
