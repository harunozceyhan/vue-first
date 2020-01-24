<template>
	<div>
		<smart-data-table translate="siparis" v-if="getMetadataOfPage != null" metadata="siparis" permission="sbo-service:siparis" />
		<page-detail translate="siparis" v-if="getMetadataOfPage != null" permission="sbo-service:siparis" />
	</div>
</template>
<script>
import Vue from 'vue'
import AuthService from '@/plugins/auth/auth-service'
import { mapGetters, mapActions } from 'vuex'
import SmartDataTable from '@/components/common/page/SmartDataTable'
import PageDetail from '@/components/common/page/PageDetail'
Vue.component('smart-data-table', SmartDataTable)
Vue.component('page-detail', PageDetail)

export default {
	created() {
		if (AuthService.checkPermissionForRoute('sbo-service:siparis:get')) this.requestMetaDataOfPage('metadata/siparis')
	},
	methods: {
		...mapActions(['requestMetaDataOfPage'])
	},
	computed: {
		...mapGetters(['getMetadataOfPage'])
	}
}
</script>
