<template>
	<div>
		<v-form ref="form" lazy-validation>
			<v-card-text>
				<v-container grid-list-md pb-0>
					<v-layout row wrap>
						<v-flex :class="'xs6 sm6 md6 lg6'"> <v-text-field :label="translate.t('adi')" :rules="[v => !!v || $t('base.label.required')]" required outlined dense></v-text-field> </v-flex>
						<v-flex xs6 sm6 md6 lg6> <v-text-field :label="translate.t('kodu')" :rules="[v => !!v || $t('base.label.required')]" required outlined dense></v-text-field> </v-flex>
						<v-flex xs6 sm6 md6 lg6> <v-text-field :label="translate.t('kodu')" :rules="[v => !!v || $t('base.label.required')]" required outlined dense></v-text-field> </v-flex>
						<v-flex :class="'xs6 sm6 md6 lg6'"> <v-text-field :label="translate.t('adi')" :rules="[v => !!v || $t('base.label.required')]" required outlined dense></v-text-field> </v-flex>
						<v-flex xs6 sm6 md6 lg6> <v-text-field :label="translate.t('kodu')" :rules="[v => !!v || $t('base.label.required')]" required outlined dense></v-text-field> </v-flex>
						<v-flex xs6 sm6 md6 lg6> <v-text-field :label="translate.t('kodu')" :rules="[v => !!v || $t('base.label.required')]" required outlined dense></v-text-field> </v-flex>
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
	data: () => ({}),
	computed: {
		...mapGetters(['getPage'])
	},
	methods: {
		...mapActions(['setShowDetailOfPage'])
	}
}
</script>
