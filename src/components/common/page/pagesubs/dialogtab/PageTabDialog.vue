<template>
	<div>
		<smart-tab-data-table :translate="translate" :metadata="metadata" :tab-index="tabIndex" @openDetailDialog="showAdd = true" />
		<tab-detail-form :show="showAdd" :translate="translate" @closeSubForm="closeSubForm" :sub-metadata="metadata" :tab-index="tabIndex" />
	</div>
</template>

<script>
import Vue from 'vue'
import { mapGetters } from 'vuex'
import SmartTabDataTable from '@/components/common/page/pagesubs/dialogtab/SmartTabDataTable'
import TabDetailForm from '@/components/common/page/pagesubs/dialogtab/TabDetailForm'
Vue.component('smart-tab-data-table', SmartTabDataTable)
Vue.component('tab-detail-form', TabDetailForm)

export default {
	props: ['translate', 'metadata', 'tabIndex'],
	data: () => ({ showAdd: false }),
	computed: {
		...mapGetters(['getPage'])
	},
	methods: {
		closeSubForm(added) {
			if (added) {
				this.$emit('refreshPageList')
			}
			this.showAdd = false
		}
	}
}
</script>
<style>
.not-tabbed .v-tabs-bar {
	height: 0;
}
</style>
