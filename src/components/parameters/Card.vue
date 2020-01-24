<template>
	<div>
		<smart-data-table translate="card" v-if="getMetadataOfPage != null" metadata="card" permission="sbo-service:card" />
		<page-detail translate="card" v-if="getMetadataOfPage != null" permission="sbo-service:card" />
	</div>
</template>
<script>
import Vue from 'vue'
import { mapGetters, mapActions } from 'vuex'
import AuthService from '@/plugins/auth/auth-service'
import SmartDataTable from '@/components/common/page/SmartDataTable'
import PageDetail from '@/components/common/page/PageDetail'
Vue.component('smart-data-table', SmartDataTable)
Vue.component('page-detail', PageDetail)

export default {
	created() {
		if (AuthService.checkPermissionForRoute('sbo-service:card:get')) this.requestMetaDataOfPage('metadata/card')
	},
	computed: {
		...mapGetters(['getMetadataOfPage'])
	},
	methods: {
		...mapActions(['requestMetaDataOfPage'])
	}
}
</script>
