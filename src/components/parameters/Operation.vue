<template>
	<v-container fluid>
		<v-card>
			<v-card-title>
				<span class="headline secondary--text">Operasyon Listesi</span>
				<v-spacer></v-spacer>
				<!-- <v-text-field dense hide-details single-line v-model="calories" type="text" label="Ara..." class="mx-6" prepend-inner-icon="search"></v-text-field> -->
				<v-btn class="mx-2" fab dark small color="info" @click="getPageList()">
					<v-icon dark>mdi-refresh</v-icon>
				</v-btn>
				<v-btn
					class="mx-2"
					fab
					dark
					small
					color="warning"
					@click="
						showSearch = !showSearch
						filters = ['', '']
					"
				>
					<v-icon dark>mdi-filter</v-icon>
				</v-btn>
				<v-btn class="mx-2" fab dark small color="success">
					<v-icon dark>add</v-icon>
				</v-btn>
			</v-card-title>
			<v-card-text>
				<v-data-table :headers="headers" :items="getPage.mainList" :options.sync="options" :server-items-length="getPage.totalElements" :loading="getTableLoading" :footer-props="{ 'items-per-page-options': [5, 10, 20, 50, 100] }" :items-per-page="5" class="elevation-1" calculate-widths>
					<template v-slot:body.prepend v-if="showSearch">
						<tr>
							<td>
								<v-text-field dense hide-details single-line v-model="filters[0]" type="text" label="Ara..." prepend-inner-icon="search"></v-text-field>
							</td>
							<td>
								<v-text-field dense hide-details single-line v-model="filters[1]" type="text" label="Ara..." prepend-inner-icon="search"></v-text-field>
							</td>
						</tr>
					</template>
				</v-data-table>
			</v-card-text>
		</v-card>
	</v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
	name: 'HelloWorld2',
	data: () => ({
		dialog: false,
		showSearch: false,
		loading: true,
		options: {},
		filters: ['', ''],
		headers: [
			{
				text: 'Adi',
				align: 'left',
				sortable: true,
				value: 'adi'
			},
			{
				text: 'Kodu',
				align: 'left',
				value: 'kodu',
				sortable: true
			}
		]
	}),
	computed: {
		...mapGetters({
			getPage: 'getPage',
			getTableLoading: 'getTableLoading'
		})
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
			}
		}
	},
	methods: {
		...mapActions({
			requestEmbeddedMainListOfPage: 'requestEmbeddedMainListOfPage'
		}),
		getPageList() {
			const { sortBy, sortDesc, page, itemsPerPage } = this.options
			this.requestEmbeddedMainListOfPage({ requestUri: 'operation/search/operation?adi=' + this.filters[0] + '&kodu=' + this.filters[1] + '&page=' + (page - 1) + '&size=' + itemsPerPage + '&sort=' + (sortBy.length === 0 ? 'updatedAt' : sortBy[0]) + ',' + (sortDesc.length === 0 ? 'asc' : sortDesc[0] ? 'desc' : 'asc'), responseKey: 'operations' })
		}
	},
	mounted() {
		this.getPageList()
	}
}
</script>
<i18n>
tr:
    text: "Merhaba!!!"
    hello: 
        text: "Merhaba!!!"
en:
    text: "hello!!!"
    hello:
        text:  "hello world!"
</i18n>
