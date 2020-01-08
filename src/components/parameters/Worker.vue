<template>
	<div>
		<smart-data-table translate="worker" />
		<page-detail translate="worker" />
	</div>
</template>

<script>
import SmartDataTable from '@/components/common/page/SmartDataTable'
import PageDetail from '@/components/common/page/PageDetail'
import { mapActions } from 'vuex'

export default {
	components: {
		'smart-data-table': SmartDataTable,
		'page-detail': PageDetail
	},
	data: () => ({
		i18n: null,
		props: {
			title: 'workerList',
			detailTitleKey: 'adi',
			baseUrl: 'worker',
			getUrl: 'worker/search/worker',
			responseKey: 'workers',
			columns: [
				{ type: 'text', formType: 'text', text: 'adi', value: 'adi', url: null, responseKey: null, itemText: null, tableValue: 'adi', required: true, sortable: true, searchable: true, searchKey: 'adi', showInTable: true, width: 40, min: 1, max: 60 },
				{ type: 'text', formType: 'text', text: 'kodu', value: 'kodu', url: null, responseKey: null, itemText: null, tableValue: 'kodu', required: true, sortable: true, searchable: true, searchKey: 'kodu', showInTable: true, width: 20, min: 1, max: 10 },
				{ type: 'object', formType: 'autocomplete', text: 'siparis', value: 'siparis', url: 'siparis', responseKey: 'siparises', itemText: 'adi', tableValue: 'siparis.adi', required: true, sortable: true, searchable: true, searchKey: 'siparisAdi', showInTable: true, width: 35 }
			],
			tabs: []
		}
	}),
	created() {
		this.i18n = this.$i18n
		this.setMetaDataOfPage(this.props)
	},
	methods: {
		...mapActions(['setMetaDataOfPage'])
	}
}
</script>
