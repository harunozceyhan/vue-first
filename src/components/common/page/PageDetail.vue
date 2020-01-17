<template>
	<v-container fluid v-if="getPage.metadata != null">
		<v-card class="mt-3 mb-12" v-show="getPage.showDetail" v-if="!getDialog">
			<page-detail-toolbar :title="getPage.detailData.id === undefined ? $t('base.label.new-record') : (getPage.metadata.detailTitleKey.includes(' ') ? (getPage.detailData[getPage.metadata.detailTitleKey.split(' ')[0]] + ' ' + getPage.detailData[getPage.metadata.detailTitleKey.split(' ')[1]]) : (getPage.detailData[getPage.metadata.detailTitleKey.split(' ')[0]]))" expand-icon="mdi-arrow-expand-all" @toggleDialog="setDialog(!getDialog)" @close="setShowDetailOfPage(false)" @save="getEventHub.$emit('submitMainForm')" @clear="getEventHub.$emit('clearMainForm')" />
			<page-detail-card :translate="translate" />
		</v-card>
		<v-dialog v-model="getPage.showDetail" v-if="getDialog" max-width="1600" persistent>
			<v-card>
				<page-detail-toolbar :title="getPage.detailData.id === undefined ? $t('base.label.new-record') : (getPage.metadata.detailTitleKey.includes(' ') ? (getPage.detailData[getPage.metadata.detailTitleKey.split(' ')[0]] + ' ' + getPage.detailData[getPage.metadata.detailTitleKey.split(' ')[1]]) : (getPage.detailData[getPage.metadata.detailTitleKey.split(' ')[0]]))" expand-icon="mdi-arrow-collapse-all" @toggleDialog="setDialog(!getDialog)" @close="setShowDetailOfPage(false)" @save="getEventHub.$emit('submitMainForm')" @clear="getEventHub.$emit('clearMainForm')" />
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
	components: { 'page-detail-toolbar': PageDetailToolbar, 'page-detail-card': PageDetailCard },
	computed: { ...mapGetters(['getPage', 'getEventHub', 'getDialog']) },
	methods: { ...mapActions(['setShowDetailOfPage', 'setDialog']) }
}
</script>
