<template>
	<v-container fluid>
		<v-card>
			<v-card-title>
				<span class="headline secondary--text">Sipariş Listesi</span>
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
						if(!showSearch) filters = ['', '', '']
					"
				>
					<v-icon dark>mdi-filter</v-icon>
				</v-btn>
				<v-btn class="mx-2" fab dark small color="success">
					<v-icon dark>add</v-icon>
				</v-btn>
			</v-card-title>
			<v-card-text>
				<v-data-table :headers="headers" :items="getPage.mainList" :options.sync="options" :server-items-length="getPage.totalElements" :loading="getTableLoading" :footer-props="{ 'items-per-page-options': [5, 10, 20, 50, 100] }" :items-per-page="5" class="elevation-1" :calculate-widths="true">
					<template v-slot:body.prepend v-if="showSearch">
						<tr>
							<td>
								<v-text-field dense hide-details single-line v-model="filters[0]" type="text" label="Ara..." prepend-inner-icon="search"></v-text-field>
							</td>
							<td>
								<v-text-field dense hide-details single-line v-model="filters[1]" type="text" label="Ara..." prepend-inner-icon="search"></v-text-field>
							</td>
							<td>
								<v-text-field dense hide-details single-line v-model="filters[2]" type="text" label="Ara..." prepend-inner-icon="search"></v-text-field>
							</td>
						</tr>
					</template>
				</v-data-table>
			</v-card-text>
		</v-card>
		<!--
	<v-card class="mt-6 mb-12" v-show="!dialog">
			<v-toolbar dark color="header">
				<v-icon class="mx-2">mdi-pencil</v-icon>
				<v-toolbar-title>Yeni Kayıt</v-toolbar-title>
				<v-spacer></v-spacer>
				<v-btn icon dark class="mx-1"> <v-icon>save</v-icon> </v-btn>
				<v-btn icon dark class="mx-1"> <v-icon>format_clear</v-icon> </v-btn>
				<v-btn icon dark class="mx-1" @click="dialog = true"> <v-icon>mdi-arrow-expand-all</v-icon> </v-btn>
				<v-btn icon dark> <v-icon>close</v-icon> </v-btn>
			</v-toolbar>
			<v-form ref="form" lazy-validation>
				<v-card-text>
					<v-container grid-list-md pb-0>
						<v-layout row wrap>
							<v-flex xs6 sm6 md6 lg6>
								<v-text-field v-model="adi" :label="$t('adi')" :rules="[v => !!v || $t('required')]" required outlined dense></v-text-field>
							</v-flex>
							<v-flex xs6 sm6 md6 lg6>
								<v-text-field v-model="kodu" :label="$t('kodu')" :rules="[v => !!v || $t('required')]" required outlined dense></v-text-field>
							</v-flex>
							<v-flex xs6 sm6 md6 lg6>
								<v-text-field v-model="adi" :label="$t('adi')" :rules="[v => !!v || $t('required')]" required outlined dense></v-text-field>
							</v-flex>
							<v-flex xs6 sm6 md6 lg6>
								<v-text-field v-model="kodu" :label="$t('kodu')" :rules="[v => !!v || $t('required')]" required outlined dense></v-text-field>
							</v-flex>
							<v-flex xs6 sm6 md6 lg6>
								<v-text-field v-model="adi" :label="$t('adi')" :rules="[v => !!v || $t('required')]" required outlined dense></v-text-field>
							</v-flex>
							<v-flex xs6 sm6 md6 lg6>
								<v-text-field v-model="kodu" :label="$t('kodu')" :rules="[v => !!v || $t('required')]" required outlined dense></v-text-field>
							</v-flex>
						</v-layout>
					</v-container>
				</v-card-text>
			</v-form>
		</v-card>
		<v-dialog v-model="dialog" width="unset">
			<v-card>
				<v-toolbar dark color="header">
					<v-icon class="mx-2">mdi-pencil</v-icon>
					<v-toolbar-title>Yeni Kayıt</v-toolbar-title>
					<v-spacer></v-spacer>
					<v-btn icon dark class="mx-1"> <v-icon>save</v-icon> </v-btn>
					<v-btn icon dark class="mx-1"> <v-icon>format_clear</v-icon> </v-btn>
					<v-btn icon dark class="mx-1" @click="dialog = false"> <v-icon>mdi-arrow-collapse-all</v-icon> </v-btn>
					<v-btn icon dark> <v-icon>close</v-icon> </v-btn>
				</v-toolbar>
				<v-form ref="form" lazy-validation>
					<v-card-text>
						<v-container grid-list-md pb-0>
							<v-layout row wrap>
								<v-flex xs6 sm6 md6 lg6>
									<v-text-field v-model="adi" :label="$t('adi')" :rules="[v => !!v || $t('required')]" required outlined dense></v-text-field>
								</v-flex>
								<v-flex xs6 sm6 md6 lg6>
									<v-text-field v-model="kodu" :label="$t('kodu')" :rules="[v => !!v || $t('required')]" required outlined dense></v-text-field>
								</v-flex>
								<v-flex xs6 sm6 md6 lg6>
									<v-text-field v-model="adi" :label="$t('adi')" :rules="[v => !!v || $t('required')]" required outlined dense></v-text-field>
								</v-flex>
								<v-flex xs6 sm6 md6 lg6>
									<v-text-field v-model="kodu" :label="$t('kodu')" :rules="[v => !!v || $t('required')]" required outlined dense></v-text-field>
								</v-flex>
								<v-flex xs6 sm6 md6 lg6>
									<v-text-field v-model="adi" :label="$t('adi')" :rules="[v => !!v || $t('required')]" required outlined dense></v-text-field>
								</v-flex>
								<v-flex xs6 sm6 md6 lg6>
									<v-text-field v-model="kodu" :label="$t('kodu')" :rules="[v => !!v || $t('required')]" required outlined dense></v-text-field>
								</v-flex>
							</v-layout>
						</v-container>
					</v-card-text>
				</v-form>
			</v-card>
		</v-dialog>
        -->
	</v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
	name: 'Operation',
	data: () => ({
		dialog: false,
		showSearch: false,
		loading: true,
		options: {},
		filters: ['', '', ''],
		headers: [
			{
				text: 'Adi',
				align: 'left',
				sortable: true,
                value: 'adi',
                width: '33%'
			},
			{
				text: 'Kodu',
				align: 'left',
				value: 'kodu',
				sortable: true,
                width: '33%'
			},
			{
				text: 'Operasyon Adı',
				align: 'left',
				value: 'operation.adi',
				sortable: true,
                width: '33%'
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
			this.requestEmbeddedMainListOfPage({ requestUri: 'siparis/search/siparis?adi=' + this.filters[0] + '&kodu=' + this.filters[1] + '&operationAdi=' + this.filters[2] + '&page=' + (page - 1) + '&size=' + itemsPerPage + '&sort=' + (sortBy.length === 0 ? 'updatedAt' : sortBy[0]) + ',' + (sortDesc.length === 0 ? 'asc' : sortDesc[0] ? 'desc' : 'asc'), responseKey: 'siparises' })
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
