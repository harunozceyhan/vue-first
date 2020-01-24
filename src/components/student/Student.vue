<template>
	<div>
		<smart-data-table translate="student" v-if="getMetadataOfPage != null" metadata="student" permission="sbo-service:student" />
		<page-detail translate="student" v-if="getMetadataOfPage != null" permission="sbo-service:student" />
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
		if (AuthService.checkPermissionForRoute('sbo-service:student:get')) this.requestMetaDataOfPage('metadata/student')
	},
	methods: {
		...mapActions(['requestMetaDataOfPage'])
	},
	computed: {
		...mapGetters(['getMetadataOfPage'])
	}
}
</script>
