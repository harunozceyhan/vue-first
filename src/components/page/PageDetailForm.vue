<template>
	<div>
		<v-form ref="form" lazy-validation>
			<v-card-text>
				<v-container grid-list-md pb-0>
					<v-layout row wrap>
						<v-flex :class="formClass" v-for="(column, columnIndex) in getPage.metadata.columns" :key="columnIndex">
							<v-text-field v-if="column.type === 'text' || column.type === 'number'" v-model="data[column.value]" :label="translate.t(column.text)" :rules="[v => !column.required || !!v || $t('base.form.required'), v => !v || v.length <= column.max || $t('base.form.max', [column.max]), v => !v || v.length >= column.min || $t('base.form.min', [column.min])]" :required="column.required" :maxLength="column.max" outlined dense></v-text-field>
                            <v-checkbox v-if="column.type === 'boolean'" v-model="data[column.value]" class="form-checkbox" color="accent" :label="translate.t(column.text)" />
                        </v-flex>
						
					</v-layout>
				</v-container>
			</v-card-text>
		</v-form>
	</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
	props: ['translate'],
	data: () => ({
		data: {}
	}),
	computed: {
		...mapGetters(['getPage', 'getEventHub']),
		formClass() {
			return this.getPage.metadata.columns.length < 7 ? 'xs12 sm12 md12 lg12' : 'xs6 sm6 md6 lg6'
		}
	},
	watch: {
		'getPage.detailData': {
			handler() {
				this.data = JSON.parse(JSON.stringify(this.getPage.detailData))
			},
			deep: true
		}
	},
	methods: {
		...mapActions(['requestPostMainOfPage', 'requestPutMainOfPage']),
		submitMainForm() {
			if (this.$refs.form.validate()) this.data.id == undefined ? this.requestPostMainOfPage({ requestUri: this.getPage.metadata.baseUrl, data: this.data }) : this.requestPutMainOfPage({ requestUri: this.getPage.metadata.baseUrl, data: this.data })
		},
		resolve(path, obj) {
			return path.split('.').reduce(function(prev, curr) {
				return prev ? prev[curr] : null
			}, obj || self)
		}
	},
	beforeDestroy() {
		this.getEventHub.$off('submitMainForm')
		this.getEventHub.$off('clearMainForm')
	},
	mounted() {
		this.data = JSON.parse(JSON.stringify(this.getPage.detailData))
		this.getEventHub.$on('submitMainForm', this.submitMainForm)
		this.getEventHub.$on('clearMainForm', () => {
			this.data = JSON.parse(JSON.stringify(this.getPage.detailData))
		})
	}
}
</script>
