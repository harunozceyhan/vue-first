<template>
	<smart-data-table :props="props" />
</template>

<script>
import SmartDataTable from '@/components/common/page/SmartDataTable'
export default {
	components: {
		'smart-data-table': SmartDataTable
	},
	data: () => ({
		props: {
			title: 'siparisList',
			baseUrl: 'siparis',
			getUrl: 'siparis/search/siparis',
			responseKey: 'siparises',
			columns: [
				{ text: 'adi', value: 'adi', searchKey: 'adi', sortable: true, searchable: true, type: 'text', showInTable: true, width: 35 },
				{ text: 'kodu', value: 'kodu', searchKey: 'kodu', sortable: true, searchable: true, type: 'text', showInTable: true, width: 25 },
				{ text: 'operationName', value: 'operation.adi', searchKey: 'operationAdi', sortable: true, searchable: true, type: 'text', showInTable: true, width: 35 }
			]
		}
	})
}
</script>
<i18n>
tr:
    siparisList: 'Sipariş Listesi'
    adi: 'Adı'
    kodu: 'Kodu'
    operationName: 'Operasyon Adı'
en:
    siparisList: 'Order List'
    adi: 'Name'
    kodu: 'Code'
    operationName: 'Operation List'
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
