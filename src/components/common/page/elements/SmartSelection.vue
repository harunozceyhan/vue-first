<template>
	<div>
		<v-layout row wrap>
			<v-flex>
				<v-combobox v-if="type === 'combobox'" :items="items" :label="$t('base.form.select-combobox', [label]) + '...'" @change="change" :item-text="itemText" item-value="id" :value="value" :required="required" :rules="[v => !required || !!v || $t('base.form.required')]" outlined dense return-object prepend-inner-icon="add_circle_outline" @click:prepend-inner="showAdd = true"></v-combobox>
				<v-autocomplete v-if="type === 'autocomplete'" :loading="loading" :items="items" :search-input.sync="search" @change="change" :label="$t('base.form.select-combobox', [label]) + '...'" :no-filter="true" item-value="id" :item-text="itemText" :value="value" :required="required" :rules="[v => !required || !!v || $t('base.form.required')]" outlined dense return-object prepend-inner-icon="add_circle_outline" @click:prepend-inner="showAdd = true"></v-autocomplete>
			</v-flex>
		</v-layout>
		<sub-form :show="showAdd" :translate="translate" url="" @closeSubForm="closeSubForm" :sub-metadata="subMetadata" />
	</div>
</template>

<script>
import Vue from 'vue'
import SubForm from '@/components/common/page/pagesubs/SubForm'
Vue.component('sub-form', SubForm)

export default {
	name: 'smart-selection',
	props: ['type', 'label', 'model', 'itemText', 'url', 'responseKey', 'value', 'required', 'translate', 'subMetadata'],
	data: () => ({
		items: [],
		showAdd: false,
		loading: false,
		search: null
	}),
	watch: {
		search(val) {
			val && this.getAutoCompleteItems(val)
		},
		value: {
			handler() {
				if (this.value != undefined && this.type === 'autocomplete') this.items.push(this.value)
			},
			deep: true
		}
	},
	methods: {
		getAutoCompleteItems(val) {
			this.loading = true
			this.axios.get(this.url + '?val=' + val + '&size=10').then(
				response => {
					this.items = response.data._embedded[this.responseKey]
					this.loading = false
				},
				() => {}
			)
		},
		getItems() {
			this.axios.get(this.url + '?size=10000').then(
				response => (this.items = response.data._embedded[this.responseKey]),
				() => {}
			)
		},
		change(val) {
			this.$emit('onItemChange', { model: this.model, val: val })
		},
		closeSubForm(added) {
			if (added && this.type === 'combobox') {
				this.getItems()
			}
			this.showAdd = false
		}
	},
	mounted() {
		if (this.type === 'combobox') {
			this.getItems()
		}
	}
}
</script>
