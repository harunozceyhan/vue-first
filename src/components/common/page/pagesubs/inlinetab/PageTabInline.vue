<template>
	<div>
		<smart-inline-data-table :translate="translate" :metadata="metadata" :tab-index="tabIndex" :permission="permission"/>
	</div>
</template>

<script>
import Vue from 'vue'
import SmartInlineDataTable from '@/components/common/page/pagesubs/inlinetab/SmartInlineDataTable'
Vue.component('smart-inline-data-table', SmartInlineDataTable)

export default {
	props: ['translate', 'metadata', 'tabIndex', 'permission']
}
</script>
<style>
.not-tabbed .v-tabs-bar {
	height: 0;
}
</style>
