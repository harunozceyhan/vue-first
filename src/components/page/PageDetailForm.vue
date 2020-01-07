<template>
	<div>
		<v-form ref="form" lazy-validation>
			<v-card-text>
				<v-container grid-list-md pb-0>
					<v-layout row wrap>
						<v-flex :class="'xs6 sm6 md6 lg6'"> <v-text-field v-model="data.adi" :label="translate.t('adi')" :rules="[v => !!v || $t('base.label.required')]" required outlined dense></v-text-field> </v-flex>
						<v-flex xs6 sm6 md6 lg6> <v-text-field v-model="data.kodu" :label="translate.t('kodu')" :rules="[v => !!v || $t('base.label.required')]" required outlined dense></v-text-field> </v-flex>
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
		...mapGetters(['getPage', 'getEventHub'])
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
			this.data.active = true
			this.data.id == undefined ? this.requestPostMainOfPage({ requestUri: this.getPage.metadata.baseUrl, data: this.data }) : this.requestPutMainOfPage({ requestUri: this.getPage.metadata.baseUrl, data: this.data })
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
