<template>
	<div :class="tabs.length === 0 ? 'not-tabbed' : ''">
		<v-tabs v-model="tab" class="elevation-6" grow>
			<v-tab href="#tab-0"> {{ $t('base.label.generalInfo') }} </v-tab>
			<v-tab v-for="(item, i) in tabs" :key="i" :href="`#tab-${i + 1}`" :disabled="getPage.detailData.id === undefined"> {{ $t(item.value + '.' + item.title) }} </v-tab>
			<v-tabs-items v-model="tab">
				<v-tab-item value="tab-0">
					<page-detail-form :translate="translate" :permission="permission"/>
				</v-tab-item>
				<v-tab-item v-for="(item, i) in tabs" :key="i" :value="'tab-' + (i + 1)">
					<page-tab-dialog v-if="item.tab == 'dialog'" :translate="item.value" :metadata="item.value" :tab-index="i" :key="i" :permission="permission === undefined ? '' : permission.split(':')[0] + ':' + item.baseUrl"/>
					<page-tab-inline v-if="item.tab == 'inline'" :translate="item.value" :metadata="item.value" :tab-index="i" :key="i" :permission="permission === undefined ? '' : permission.split(':')[0] + ':' + item.baseUrl"/>
				</v-tab-item>
			</v-tabs-items>
		</v-tabs>
	</div>
</template>

<script>
import Vue from 'vue'
import { mapGetters } from 'vuex'
import AuthService from '@/plugins/auth/AuthService'
import SmartForm from './PageDetailForm'
import PageTabDialog from '@/components/common/page/pagesubs/dialogtab/PageTabDialog'
import PageTabInline from '@/components/common/page/pagesubs/inlinetab/PageTabInline'
Vue.component('page-tab-dialog', PageTabDialog)
Vue.component('page-tab-inline', PageTabInline)

export default {
	props: ['translate', 'permission'],
	data: () => ({ tab: 'tab-0' }),
	components: {
		'page-detail-form': SmartForm
	},
	watch: {
		'getPage.detailData.id': function() {
			this.tab = 'tab-0'
		}
	},
	computed: {
		...mapGetters(['getPage']),
		tabs() {
			return this.getPage.metadata.tabs.filter(tab => {
				if (this.permission === undefined) {
					return tab
				} else {
					if (AuthService.checkPermission(this.permission.split(':')[0] + ':' + tab.baseUrl + ':get')) {
						return tab
					}
				}
			})
		}
	}
}
</script>
<style>
.not-tabbed .v-tabs-bar {
	height: 0;
}
</style>
