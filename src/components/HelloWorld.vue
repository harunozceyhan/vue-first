<template>
	<v-container fluid>
		<div>{{ $t('text') }}</div>
		<div>{{ $t('hello.text') }}</div>
		<div :v-if="getPage.mainList.length > 0" style="width: 220px; margin-top: 10px" v-for="(crud, i) in getPage.mainList" :key="i">adi: {{ crud.adi }}</div>
		<div>pageSize: {{ getPage.pageSize }}</div>
		totalElements: {{ getPage.totalElements }}
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
		this.requestEmbeddedMainListOfPage({ requestUri: 'siparis?page=0&size=2&sort=adi,desc', responseKey: 'siparises' })
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
