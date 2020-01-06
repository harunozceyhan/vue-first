<template>
	<div>
		<page-detail-form v-if="getPage.metadata.tabs.length == 0" :translate="translate" />
		<v-tabs v-model="tab" v-if="getPage.metadata.tabs.length > 0" class="elevation-6" grow>
			<v-tab href="#tab-0"> GENEL BİLGİLER </v-tab>
			<v-tab v-for="(item, i) in getPage.metadata.tabs" :key="i" :href="`#tab-${i + 1}`"> {{ item.title }} </v-tab>
			<v-tabs-items v-model="tab">
				<v-tab-item value="tab-0">
					<page-detail-form :translate="translate" />
				</v-tab-item>
				<v-tab-item v-for="(item, i) in getPage.metadata.tabs" :key="i" :value="'tab-' + (i + 1)">
					<page-detail-form :translate="translate" />
				</v-tab-item>
			</v-tabs-items>
		</v-tabs>
	</div>
</template>

<script>
import SmartForm from './PageDetailForm'
import { mapGetters } from 'vuex'

export default {
	props: ['translate'],
	components: {
		'page-detail-form': SmartForm
	},
	computed: {
		...mapGetters(['getPage'])
	},
	data: () => ({ tab: 'tab-0' })
}
</script>
