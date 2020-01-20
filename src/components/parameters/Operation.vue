<template>
	<div>
		<smart-data-table translate="operation" v-if="getMetadataOfPage != null" metadata="operation" permission="sbo-service:operation" />
		<page-detail translate="operation" v-if="getMetadataOfPage != null" permission="sbo-service:operation" />
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
		if (AuthService.checkPermissionForRoute('sbo-service:operation:get')) this.requestMetaDataOfPage('metadata/operation')
	},
	methods: {
		...mapActions(['requestMetaDataOfPage'])
	},
	computed: {
		...mapGetters(['getMetadataOfPage'])
	}
}
</script>
