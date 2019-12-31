<template>
	<v-container fluid>
		<div>{{ $t('text') }}</div>
		<div>{{ $t('hello.text') }}</div>
		<div :v-if="getPage.mainList.length > 0" style="width: 220px; height: 80px; margin-top: 10px" v-for="(crud, i) in getPage.mainList" :key="i">
			id: {{ crud.adi }}
			<div>pageSize: {{ getPage.pageSize }}</div>
			totalElements: {{ getPage.totalElements }}
		</div>
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
    text: "Merhaba!!!"
    hello: 
        text: "Merhaba!!!"
en:
    text: "hello!!!"
    hello:
        text:  "hello world!"
</i18n>
