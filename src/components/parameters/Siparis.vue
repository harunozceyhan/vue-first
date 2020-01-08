<template>
	<div>
		<smart-data-table />
		<page-detail :translate="i18n" />
	</div>
</template>

<script>
import SmartDataTable from '@/components/common/page/SmartDataTable'
import PageDetail from '@/components/common/page/PageDetail'
import { mapActions } from 'vuex'

export default {
	components: {
		'smart-data-table': SmartDataTable,
		'page-detail': PageDetail
	},
	data: () => ({
		i18n: null,
		props: {
			title: 'siparisList',
			detailTitleKey: 'adi',
			baseUrl: 'siparis',
			getUrl: 'siparis/search/siparis',
			responseKey: 'siparises',
			columns: [
				{ type: 'text', text: 'adi', value: 'adi', tableValue: 'adi', required: true, sortable: true, searchable: true, searchKey: 'adi', showInTable: true, width: 40, min: 1, max: 60 },
				{ type: 'text', text: 'kodu', value: 'kodu', tableValue: 'kodu', required: true, sortable: true, searchable: true, searchKey: 'kodu', showInTable: true, width: 20, min: 1, max: 10 },
				{ type: 'object', text: 'operation', value: 'operation', tableValue: 'operation.adi', required: true, sortable: true, searchable: true, searchKey: 'operationAdi', showInTable: true, width: 35 }
			],
			tabs: [{ title: 'Çalışanlar' }, { title: 'Kartlar' }]
		}
	}),
	created() {
		this.i18n = this.$i18n
		this.setMetaDataOfPage(this.props)
	},
	methods: {
		...mapActions(['setMetaDataOfPage'])
	}
}
</script>
<i18n>
tr:
    siparisList: 'Sipariş Listesi'
    adi: 'Adı'
    kodu: 'Kodu'
    operation: 'Operasyon'
en:
    siparisList: 'Order List'
    adi: 'Name'
    kodu: 'Code'
    operation: 'Operation'
</i18n>

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
