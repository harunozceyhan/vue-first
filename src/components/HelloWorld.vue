<template>
	<v-container fluid>
		<div :v-if="getPage.mainList.length > 0" style="width: 220px; height: 80px; margin-top: 10px" v-for="(crud, i) in getPage.mainList" :key="i">
			id: {{ crud.adi }}
			<div>pageSize: {{ getPage.pageSize }}</div>
			totalElements: {{ getPage.totalElements }}
		</div>
		<div>{{ $t('hello') }}</div>
	</v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
	name: 'HelloWorld',

	data: () => ({}),
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
    hello: "Merhaba!!!"
en:
    hello: "hello world!"
</i18n>
