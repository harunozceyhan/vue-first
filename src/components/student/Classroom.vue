<template>
	<div>
		<smart-data-table translate="classroom" v-if="getMetadataOfPage != null" metadata="classroom" permission="sbo-service:classroom" />
		<page-detail translate="classroom" v-if="getMetadataOfPage != null" permission="sbo-service:classroom" />
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
		if (AuthService.checkPermissionForRoute('sbo-service:classroom:get')) this.requestMetaDataOfPage('metadata/classroom')
	},
	methods: {
		...mapActions(['requestMetaDataOfPage'])
	},
	computed: {
		...mapGetters(['getMetadataOfPage'])
	}
}
</script>
