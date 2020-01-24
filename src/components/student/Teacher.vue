<template>
	<div>
		<smart-data-table translate="teacher" v-if="getMetadataOfPage != null" metadata="teacher" permission="sbo-service:teacher" />
		<page-detail translate="teacher" v-if="getMetadataOfPage != null" permission="sbo-service:teacher" />
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
		if (AuthService.checkPermissionForRoute('sbo-service:teacher:get')) this.requestMetaDataOfPage('metadata/teacher')
	},
	methods: {
		...mapActions(['requestMetaDataOfPage'])
	},
	computed: {
		...mapGetters(['getMetadataOfPage'])
	}
}
</script>
