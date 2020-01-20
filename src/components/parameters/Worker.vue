<template>
	<div>
		<smart-data-table translate="worker" v-if="getMetadataOfPage != null" metadata="worker" permission="sbo-service:worker"/>
		<page-detail translate="worker" v-if="getMetadataOfPage != null" permission="sbo-service:worker"/>
	</div>
</template>
<script>
import Vue from 'vue'
import AuthService from '@/plugins/auth/AuthService'
import { mapGetters, mapActions } from 'vuex'
import SmartDataTable from '@/components/common/page/SmartDataTable'
import PageDetail from '@/components/common/page/PageDetail'
Vue.component('smart-data-table', SmartDataTable)
Vue.component('page-detail', PageDetail)

export default {
	created() {
		if (AuthService.checkPermissionForRoute('sbo-service:worker:get')) this.requestMetaDataOfPage('metadata/worker')
	},
	methods: {
		...mapActions(['requestMetaDataOfPage'])
	},
	computed: {
		...mapGetters(['getMetadataOfPage'])
	}
}
</script>
