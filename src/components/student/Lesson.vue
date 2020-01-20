<template>
	<div>
		<smart-data-table translate="lesson" v-if="getMetadataOfPage != null" metadata="lesson" permission="sbo-service:lesson"/>
		<page-detail translate="lesson" v-if="getMetadataOfPage != null" permission="sbo-service:lesson"/>
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
		if (AuthService.checkPermissionForRoute('sbo-service:lesson:get')) this.requestMetaDataOfPage('metadata/lesson')
	},
	methods: {
		...mapActions(['requestMetaDataOfPage'])
	},
	computed: {
		...mapGetters(['getMetadataOfPage'])
	}
}
</script>
