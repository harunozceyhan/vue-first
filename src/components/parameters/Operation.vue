<template>
	<div>
		<smart-data-table translate="operation" />
		<page-detail translate="operation" />
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
		props: {
			title: 'operationList',
			detailTitleKey: 'adi',
			baseUrl: 'operation',
			getUrl: 'operation/search/operation',
			responseKey: 'operations',
			columns: [
				{ type: 'text', formType: 'text', text: 'adi', value: 'adi', url: null, responseKey: null, itemText: null, tableValue: 'adi', required: true, sortable: true, searchable: true, searchKey: 'adi', showInTable: true, width: 55, min: 1, max: 60 },
				{ type: 'text', formType: 'text', text: 'kodu', value: 'kodu', url: null, responseKey: null, itemText: null, tableValue: 'kodu', required: true, sortable: true, searchable: true, searchKey: 'kodu', showInTable: true, width: 30, min: 1, max: 10 },
				{ type: 'boolean', formType: 'checkbox', text: 'active', value: 'active', url: null, responseKey: null, itemText: null, tableValue: 'active', required: true, sortable: true, searchable: false, searchKey: null, showInTable: true, width: 10 }
			],
			tabs: []
		}
	}),
	created() {
		this.setMetaDataOfPage(this.props)
	},
	methods: {
		...mapActions(['setMetaDataOfPage'])
	}
}
</script>
