<template>
	<div>
		<smart-data-table />
		<page-detail :translate="i18n" />
	</div>
</template>
<script>
import SmartDataTable from '@/components/page/SmartDataTable'
import PageDetail from '@/components/page/PageDetail'
import { mapActions } from 'vuex'

export default {
	components: {
		'smart-data-table': SmartDataTable,
		'page-detail': PageDetail
	},
	data: () => ({
		i18n: null,
		props: {
			title: 'operationList',
			detailTitleKey: 'adi',
			baseUrl: 'operation',
			getUrl: 'operation/search/operation',
			responseKey: 'operations',
			columns: [
				{ type: 'text', text: 'adi', value: 'adi', required: true, sortable: true, searchable: true, searchKey: 'adi', showInTable: true, width: 60, min: 1, max: 60 },
				{ type: 'text', text: 'kodu', value: 'kodu', required: true, sortable: true, searchable: true, searchKey: 'kodu', showInTable: true, width: 30, min: 1, max: 10 },
				{ type: 'boolean', text: 'active', value: 'active', required: true, sortable: true, searchable: false, searchKey: null, showInTable: true, width: 5 }
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
<i18n>
tr:
    operationList: 'Operasyon Listesi'
    adi: 'Adı'
    kodu: 'Kodu'
    inHouse: 'İçeride'
    active: 'Aktif'
en:
    operationList: 'Operation List'
    adi: 'Name'
    kodu: 'Code'
    inHouse: 'In House'
    active: 'Active'
</i18n>
