<template>
	<div>
		<smart-data-table translate="siparis" />
		<page-detail translate="siparis" />
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
			title: 'siparisList',
			detailTitleKey: 'adi',
			baseUrl: 'siparis',
			getUrl: 'siparis/search/siparis',
			responseKey: 'siparises',
			columns: [
				{ type: 'text', formType: 'text', text: 'adi', value: 'adi', url: null, responseKey: null, itemText: null, tableValue: 'adi', required: true, sortable: true, searchable: true, searchKey: 'adi', showInTable: true, width: 40, min: 1, max: 40 },
				{ type: 'text', formType: 'text', text: 'kodu', value: 'kodu', url: null, responseKey: null, itemText: null, tableValue: 'kodu', required: true, sortable: true, searchable: true, searchKey: 'kodu', showInTable: true, width: 20, min: 1, max: 10 },
				{ type: 'text', formType: 'datetimepicker', text: 'orderDate', value: 'orderDate', url: null, responseKey: null, itemText: null, tableValue: 'orderDate', required: true, sortable: true, searchable: false, searchKey: 'orderDate', showInTable: true, width: 20 },
				{ type: 'object', formType: 'combobox', text: 'operation', value: 'operation', url: 'operation', responseKey: 'operations', itemText: 'adi', tableValue: 'operation.adi', required: true, sortable: true, searchable: true, searchKey: 'operationAdi', showInTable: true, width: 35 }
			],
			tabs: [{ title: 'Çalışanlar' }, { title: 'Kartlar' }]
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
