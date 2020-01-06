<template>
	<smart-data-table :props="props" />
</template>

<script>
import SmartDataTable from 'smart-core-plugin/components/page/SmartDataTable'
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
				{ text: 'kodu', value: 'kodu', searchKey: 'kodu', sortable: true, searchable: true, type: 'text', showInTable: true, width: 30 },
				{ text: 'active', value: 'active', sortable: true, searchable: false, type: 'boolean', showInTable: true, width: 5 }
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
