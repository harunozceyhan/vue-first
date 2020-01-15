<template>
	<div>
		<smart-data-table translate="siparis" v-if="getMetadataOfPage != null" metadata="siparis" />
		<page-detail translate="siparis" v-if="getMetadataOfPage != null" />
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
		this.requestMetaDataOfPage('metadata/siparis')
	},
	methods: {
		...mapActions(['requestMetaDataOfPage'])
	},
	computed: {
		...mapGetters(['getMetadataOfPage'])
	}
}
</script>
