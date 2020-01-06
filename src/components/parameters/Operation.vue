<template>
	<div>
		<smart-data-table :props="props" />
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
				{ text: 'adi', value: 'adi', searchKey: 'adi', sortable: true, searchable: true, type: 'text', showInTable: true, width: 60 },
				{ text: 'kodu', value: 'kodu', searchKey: 'kodu', sortable: true, searchable: true, type: 'text', showInTable: true, width: 30 },
				{ text: 'active', value: 'active', sortable: true, searchable: false, type: 'boolean', showInTable: true, width: 5 }
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
