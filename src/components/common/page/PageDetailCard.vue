<template>
	<div :class="getPage.metadata.tabs.length === 0 ? 'not-tabbed' : ''">
		<v-tabs v-model="tab" class="elevation-6" grow>
			<v-tab href="#tab-0"> {{ $t('base.label.generalInfo') }} </v-tab>
			<v-tab v-for="(item, i) in getPage.metadata.tabs" :key="i" :href="`#tab-${i + 1}`"> {{ $t(item.value + '.' + item.title) }} </v-tab>
			<v-tabs-items v-model="tab">
				<v-tab-item value="tab-0">
					<page-detail-form :translate="translate" />
				</v-tab-item>
				<v-tab-item v-for="(item, i) in getPage.metadata.tabs" :key="i" :value="'tab-' + (i + 1)">
                    <smart-tab-data-table :translate="item.value" :metadata="item.value" :tab-index="i" />
                </v-tab-item>
			</v-tabs-items>
		</v-tabs>
	</div>
</template>

<script>
import Vue from 'vue'
import { mapGetters } from 'vuex'
import SmartForm from './PageDetailForm'
import SmartTabDataTable from '@/components/common/page/pagesubs/SmartTabDataTable'
Vue.component('smart-tab-data-table', SmartTabDataTable)

export default {
	props: ['translate'],
	data: () => ({ tab: 'tab-0' }),
	components: {
		'page-detail-form': SmartForm
	},
	computed: {
		...mapGetters(['getPage'])
	}
}
</script>
<style>
.not-tabbed .v-tabs-bar {
	height: 0;
}
</style>
