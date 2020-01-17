import { SET_LOADING_STATE, SET_ALERT_STATE, SET_ALERT_SHOW_STATE, SET_TABLE_LOADING_STATE, SET_DIALOG_STATE, SET_TAB_TABLE_LOADING_STATE } from './mutation-types'
import Vue from 'vue'

export default {
	state: {
		tabTableLoading: false,
		tableLoading: false,
		loading: false,
		dialog: localStorage.dialog === 'true' ? true : false,
		alert: {
			show: false,
			type: 'success',
			timeout: 5000,
			text: ''
		},
		eventHub: new Vue()
	},
	getters: {
		getLoading: state => {
			return state.loading
		},
		getTableLoading: state => {
			return state.tableLoading
        },
        getTabTableLoading: state => {
			return state.tabTableLoading
		},
		getAlert: state => {
			return state.alert
		},
		getDialog: state => {
			return state.dialog
		},
		getEventHub: state => {
			return state.eventHub
		}
	},
	mutations: {
		[SET_LOADING_STATE](state, payload) {
			state.loading = payload.loading
		},
		[SET_TABLE_LOADING_STATE](state, payload) {
			state.tableLoading = payload.tableLoading
		},
		[SET_TAB_TABLE_LOADING_STATE](state, payload) {
			state.tabTableLoading = payload.tabTableLoading
		},
		[SET_ALERT_STATE](state, payload) {
			state.alert.show = payload.show
			state.alert.type = payload.alertType
			state.alert.timeout = payload.timeout
			state.alert.text = payload.text
		},
		[SET_DIALOG_STATE](state, payload) {
			state.dialog = payload.dialog
		},
		[SET_ALERT_SHOW_STATE](state, payload) {
			state.alert.show = payload.show
		}
	},
	actions: {
		setLoading({ commit }, loading) {
			commit({ type: SET_LOADING_STATE, loading: loading })
		},
		setTableLoading({ commit }, tableLoading) {
			commit({ type: SET_TABLE_LOADING_STATE, tableLoading: tableLoading })
		},
		setTabTableLoading({ commit }, tabTableLoading) {
			commit({ type: SET_TAB_TABLE_LOADING_STATE, tabTableLoading: tabTableLoading })
		},
		setAlert({ commit }, alert) {
			commit({ type: SET_ALERT_STATE, show: alert.show, alertType: alert.type, timeout: alert.timeout, text: alert.text })
		},
		setDialog({ commit }, dialog) {
			commit({ type: SET_DIALOG_STATE, dialog: dialog })
		},
		setErrorAlert({ commit }, text) {
			commit({ type: SET_ALERT_STATE, show: true, alertType: 'error', timeout: 7000, text: text })
		},
		setWarningAlert({ commit }, text) {
			commit({ type: SET_ALERT_STATE, show: true, alertType: 'warning', timeout: 5000, text: text })
		},
		setInfoAlert({ commit }, text) {
			commit({ type: SET_ALERT_STATE, show: true, alertType: 'info', timeout: 6000, text: text })
		},
		setSuccessAlert({ commit }, text) {
			commit({ type: SET_ALERT_STATE, show: true, alertType: 'success', timeout: 4000, text: text })
		},
		hideAlert({ commit }) {
			commit({ type: SET_ALERT_SHOW_STATE, show: false })
		}
	}
}
