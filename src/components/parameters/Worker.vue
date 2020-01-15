<template>
	<div>
		<smart-data-table translate="worker" v-if="getMetadataOfPage != null" metadata="worker" />
		<page-detail translate="worker" v-if="getMetadataOfPage != null" />
	</div>
</template>
<script>
import Vue from 'vue'
import { mapGetters, mapActions } from 'vuex'
import SmartDataTable from '@/components/common/page/SmartDataTable'
import PageDetail from '@/components/common/page/PageDetail'
Vue.component('smart-data-table', SmartDataTable)
Vue.component('page-detail', PageDetail)

export default {
	created() {
		this.requestMetaDataOfPage('metadata/worker')
	},
	methods: {
		...mapActions(['requestMetaDataOfPage'])
	},
	computed: {
		...mapGetters(['getMetadataOfPage'])
	}
}
</script>
