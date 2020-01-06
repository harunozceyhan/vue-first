<template>
	<smart-data-table :props="props" />
</template>

<script>
import SmartDataTable from '@/components/common/page/SmartDataTable'
export default {
	components: {
		'smart-data-table': SmartDataTable
	},
	data: () => ({
		props: {
			title: 'operationList',
			baseUrl: 'operation',
			getUrl: 'operation/search/operation',
			responseKey: 'operations',
			columns: [
				{ text: 'adi', value: 'adi', searchKey: 'adi', sortable: true, searchable: true, type: 'text', showInTable: true, width: 60 },
				{ text: 'kodu', value: 'kodu', searchKey: 'kodu', sortable: true, searchable: true, type: 'text', showInTable: true, width: 25 },
				{ text: 'inHouse', value: 'inHouse', sortable: false, searchable: false, type: 'boolean', showInTable: true, width: 5 },
				{ text: 'active', value: 'active', sortable: false, searchable: false, type: 'boolean', showInTable: true, width: 5 }
			]
		}
	})
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
