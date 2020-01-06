<template>
	<v-container fluid v-if="getPage.metadata != null">
		<v-card class="mt-3 mb-12" v-show="getPage.showDetail && !dialog">
			<page-detail-toolbar :title="getPage.detailData === null ? $t('base.label.new-record') : getPage.detailData[getPage.metadata.detailTitleKey]" expand-icon="mdi-arrow-expand-all" @toggleDialog="dialog = !dialog" @close="setShowDetailOfPage(false)" @save="save" @clear="clear" />
			<page-detail-card :translate="translate" />
		</v-card>
		<v-dialog v-model="dialog" v-if="getPage.showDetail" width="unset" max-width="1600">
			<v-card>
				<page-detail-toolbar :title="getPage.detailData === null ? $t('base.label.new-record') : getPage.detailData[getPage.metadata.detailTitleKey]" expand-icon="mdi-arrow-collapse-all" @toggleDialog="dialog = !dialog" @close="setShowDetailOfPage(false)" @save="save" @clear="clear" />
				<page-detail-card :translate="translate" />
			</v-card>
		</v-dialog>
	</v-container>
</template>

<script>
import PageDetailToolbar from './PageDetailToolbar'
import PageDetailCard from './PageDetailCard'
import { mapGetters, mapActions } from 'vuex'

export default {
	props: ['translate'],
	components: {
		'page-detail-toolbar': PageDetailToolbar,
		'page-detail-card': PageDetailCard
	},
	data: () => ({
		dialog: localStorage.dialog === 'true' ? true : false
	}),
	computed: {
		...mapGetters(['getPage'])
	},
	methods: {
		...mapActions(['setShowDetailOfPage']),
		save() {},
		clear() {}
	}
}
</script>
