<template>
	<v-container fluid>
		<v-card>
			<v-card-title>
				<span class="headline secondary--text">Operasyon Listesi</span>
				<v-spacer></v-spacer>
				<!-- <v-text-field color="secondary" dense hide-details single-line v-model="calories" type="text" label="Ara..." class="mx-6" prepend-inner-icon="search"></v-text-field> -->
				<v-btn class="mx-2" fab dark small color="info">
					<v-icon dark>mdi-refresh</v-icon>
				</v-btn>
				<v-btn class="mx-2" fab dark small color="warning" @click="showSearch = !showSearch">
					<v-icon dark>mdi-filter</v-icon>
				</v-btn>
				<v-btn class="mx-2" fab dark small color="success">
					<v-icon dark>add</v-icon>
				</v-btn>
			</v-card-title>
			<v-card-text>
				<v-data-table :headers="headers" :items="desserts" :items-per-page="5">
					<template v-slot:body.prepend v-if="showSearch">
						<tr>
							<td>
								<v-text-field color="secondary" dense hide-details single-line v-model="calories" type="text" label="Ara..." prepend-inner-icon="search"></v-text-field>
							</td>
							<td>
								<v-text-field color="secondary" dense hide-details single-line v-model="calories" type="text" label="Ara..." prepend-inner-icon="search"></v-text-field>
							</td>
							<td>
								<v-text-field color="secondary" dense hide-details single-line v-model="calories" type="text" label="Ara..." prepend-inner-icon="search"></v-text-field>
							</td>
							<td>
								<v-text-field color="secondary" dense hide-details single-line v-model="calories" type="text" label="Ara..." prepend-inner-icon="search"></v-text-field>
							</td>
							<td>
								<v-text-field color="secondary" dense hide-details single-line v-model="calories" type="text" label="Ara..." prepend-inner-icon="search"></v-text-field>
							</td>
							<td></td>
						</tr>
					</template>
				</v-data-table>
			</v-card-text>
		</v-card>

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
								<v-text-field color="secondary" v-model="adi" :label="$t('adi')" :rules="[v => !!v || $t('required')]" required outlined dense></v-text-field>
							</v-flex>
							<v-flex xs6 sm6 md6 lg6>
								<v-text-field color="secondary" v-model="kodu" :label="$t('kodu')" :rules="[v => !!v || $t('required')]" required outlined dense></v-text-field>
							</v-flex>
							<v-flex xs6 sm6 md6 lg6>
								<v-text-field color="secondary" v-model="adi" :label="$t('adi')" :rules="[v => !!v || $t('required')]" required outlined dense></v-text-field>
							</v-flex>
							<v-flex xs6 sm6 md6 lg6>
								<v-text-field color="secondary" v-model="kodu" :label="$t('kodu')" :rules="[v => !!v || $t('required')]" required outlined dense></v-text-field>
							</v-flex>
							<v-flex xs6 sm6 md6 lg6>
								<v-text-field color="secondary" v-model="adi" :label="$t('adi')" :rules="[v => !!v || $t('required')]" required outlined dense></v-text-field>
							</v-flex>
							<v-flex xs6 sm6 md6 lg6>
								<v-text-field color="secondary" v-model="kodu" :label="$t('kodu')" :rules="[v => !!v || $t('required')]" required outlined dense></v-text-field>
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
									<v-text-field color="secondary" v-model="adi" :label="$t('adi')" :rules="[v => !!v || $t('required')]" required outlined dense></v-text-field>
								</v-flex>
								<v-flex xs6 sm6 md6 lg6>
									<v-text-field color="secondary" v-model="kodu" :label="$t('kodu')" :rules="[v => !!v || $t('required')]" required outlined dense></v-text-field>
								</v-flex>
								<v-flex xs6 sm6 md6 lg6>
									<v-text-field color="secondary" v-model="adi" :label="$t('adi')" :rules="[v => !!v || $t('required')]" required outlined dense></v-text-field>
								</v-flex>
								<v-flex xs6 sm6 md6 lg6>
									<v-text-field color="secondary" v-model="kodu" :label="$t('kodu')" :rules="[v => !!v || $t('required')]" required outlined dense></v-text-field>
								</v-flex>
								<v-flex xs6 sm6 md6 lg6>
									<v-text-field color="secondary" v-model="adi" :label="$t('adi')" :rules="[v => !!v || $t('required')]" required outlined dense></v-text-field>
								</v-flex>
								<v-flex xs6 sm6 md6 lg6>
									<v-text-field color="secondary" v-model="kodu" :label="$t('kodu')" :rules="[v => !!v || $t('required')]" required outlined dense></v-text-field>
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
import { mapGetters, mapActions } from 'vuex'

export default {
	name: 'Operation',
	data: () => ({
		dialog: false,
		showSearch: false,
		headers: [
			{
				text: 'Dessert (100g serving)',
				align: 'left',
				sortable: false,
				value: 'name'
			},
			{ text: 'Calories', value: 'calories' },
			{ text: 'Fat (g)', value: 'fat' },
			{ text: 'Carbs (g)', value: 'carbs' },
			{ text: 'Protein (g)', value: 'protein' },
			{ text: 'Iron (%)', value: 'iron' }
		],
		desserts: [
			{
				name: 'Frozen Yogurt',
				calories: 159,
				fat: 6.0,
				carbs: 24,
				protein: 4.0,
				iron: '1%'
			},
			{
				name: 'Ice cream sandwich',
				calories: 237,
				fat: 9.0,
				carbs: 37,
				protein: 4.3,
				iron: '1%'
			},
			{
				name: 'Eclair',
				calories: 262,
				fat: 16.0,
				carbs: 23,
				protein: 6.0,
				iron: '7%'
			},
			{
				name: 'Cupcake',
				calories: 305,
				fat: 3.7,
				carbs: 67,
				protein: 4.3,
				iron: '8%'
			},
			{
				name: 'Gingerbread',
				calories: 356,
				fat: 16.0,
				carbs: 49,
				protein: 3.9,
				iron: '16%'
			},
			{
				name: 'Jelly bean',
				calories: 375,
				fat: 0.0,
				carbs: 94,
				protein: 0.0,
				iron: '0%'
			},
			{
				name: 'Lollipop',
				calories: 392,
				fat: 0.2,
				carbs: 98,
				protein: 0,
				iron: '2%'
			},
			{
				name: 'Honeycomb',
				calories: 408,
				fat: 3.2,
				carbs: 87,
				protein: 6.5,
				iron: '45%'
			},
			{
				name: 'Donut',
				calories: 452,
				fat: 25.0,
				carbs: 51,
				protein: 4.9,
				iron: '22%'
			},
			{
				name: 'KitKat',
				calories: 518,
				fat: 26.0,
				carbs: 65,
				protein: 7,
				iron: '6%'
			},
			{
				name: 'Frozen Yogurt',
				calories: 159,
				fat: 6.0,
				carbs: 24,
				protein: 4.0,
				iron: '1%'
			},
			{
				name: 'Ice cream sandwich',
				calories: 237,
				fat: 9.0,
				carbs: 37,
				protein: 4.3,
				iron: '1%'
			},
			{
				name: 'Eclair',
				calories: 262,
				fat: 16.0,
				carbs: 23,
				protein: 6.0,
				iron: '7%'
			},
			{
				name: 'Cupcake',
				calories: 305,
				fat: 3.7,
				carbs: 67,
				protein: 4.3,
				iron: '8%'
			},
			{
				name: 'Gingerbread',
				calories: 356,
				fat: 16.0,
				carbs: 49,
				protein: 3.9,
				iron: '16%'
			},
			{
				name: 'Jelly bean',
				calories: 375,
				fat: 0.0,
				carbs: 94,
				protein: 0.0,
				iron: '0%'
			},
			{
				name: 'Lollipop',
				calories: 392,
				fat: 0.2,
				carbs: 98,
				protein: 0,
				iron: '2%'
			},
			{
				name: 'Honeycomb',
				calories: 408,
				fat: 3.2,
				carbs: 87,
				protein: 6.5,
				iron: '45%'
			},
			{
				name: 'Donut',
				calories: 452,
				fat: 25.0,
				carbs: 51,
				protein: 4.9,
				iron: '22%'
			},
			{
				name: 'KitKat',
				calories: 518,
				fat: 26.0,
				carbs: 65,
				protein: 7,
				iron: '6%'
			}
		]
	}),
	computed: {
		...mapGetters({
			getPage: 'getPage'
		})
	},
	methods: {
		...mapActions({
			requestEmbeddedMainListOfPage: 'requestEmbeddedMainListOfPage'
		})
	},
	mounted() {
		this.requestEmbeddedMainListOfPage({ requestUri: 'siparis', responseKey: 'siparises' })
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
