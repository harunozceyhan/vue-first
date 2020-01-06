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
			title: 'workerList',
			detailTitleKey: 'adi',
			baseUrl: 'worker',
			getUrl: 'worker/search/worker',
			responseKey: 'workers',
			columns: [
				{ text: 'adi', value: 'adi', searchKey: 'adi', sortable: true, searchable: true, type: 'text', showInTable: true, width: 40 },
				{ text: 'kodu', value: 'kodu', searchKey: 'kodu', sortable: true, searchable: true, type: 'text', showInTable: true, width: 20 },
				{ text: 'siparisAdi', value: 'siparis.adi', searchKey: '', sortable: true, searchable: false, type: 'text', showInTable: true, width: 35 }
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
