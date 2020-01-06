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
			title: 'workerList',
			baseUrl: 'worker',
			getUrl: 'worker/search/worker',
			responseKey: 'workers',
			columns: [
				{ text: 'adi', value: 'adi', searchKey: 'adi', sortable: true, searchable: true, type: 'text', showInTable: true, width: 40 },
				{ text: 'kodu', value: 'kodu', searchKey: 'kodu', sortable: true, searchable: true, type: 'text', showInTable: true, width: 20 },
				{ text: 'siparisAdi', value: 'siparis.adi', searchKey: '', sortable: true, searchable: false, type: 'text', showInTable: true, width: 35 }
			]
		}
	})
}
</script>
<i18n>
tr:
    workerList: 'Çalışan Listesi'
    adi: 'Adı'
    kodu: 'Kodu'
    inHouse: 'İçeride'
    siparisAdi: 'Sipariş Adı'
en:
    workerList: 'Worker List'
    adi: 'Name'
    kodu: 'Code'
    siparisAdi: 'Order Name'
</i18n>
