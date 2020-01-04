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
			title: 'Operasyon Listesi',
			baseUrl: 'operation',
			getUrl: 'operation/search/operation',
			responseKey: 'operations',
			columns: [
				{ text: 'Adı', value: 'adi', searchKey: 'adi', sortable: true, searchable: true, type: 'text', showInTable: true, width: 60 },
				{ text: 'Kodu', value: 'kodu', searchKey: 'kodu', sortable: true, searchable: true, type: 'text', showInTable: true, width: 30 },
				{ text: 'Active', value: 'active', sortable: false, searchable: false, type: 'boolean', showInTable: true, width: 5 }
			]
		}
	})
}
</script>
