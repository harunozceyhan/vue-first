<template>
	<div>
		<smart-data-table translate="card" v-if="getMetadataOfPage != null" metadata="card" />
		<page-detail translate="card" v-if="getMetadataOfPage != null" />
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
		this.requestMetaDataOfPage('metadata/card')
	},
	methods: {
		...mapActions(['requestMetaDataOfPage'])
	},
	computed: {
		...mapGetters(['getMetadataOfPage'])
	}
}
</script>
