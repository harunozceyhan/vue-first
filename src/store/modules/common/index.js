import { SET_LOADING_STATE, SET_ALERT_STATE, SET_ALERT_SHOW_STATE } from './mutation-types'

export default {
	state: {
		loading: false,
		alert: {
			show: false,
			type: 'success',
			timeout: 5000,
			text: ''
		}
	},
	getters: {
		getLoading: state => {
			return state.loading
		},
		getAlert: state => {
			return state.alert
		}
	},
	mutations: {
		[SET_LOADING_STATE](state, payload) {
			state.loading = payload.loading
		},
		[SET_ALERT_STATE](state, payload) {
			state.alert.show = payload.show
			state.alert.type = payload.alertType
			state.alert.timeout = payload.timeout
			state.alert.text = payload.text
		},
		[SET_ALERT_SHOW_STATE](state, payload) {
			state.alert.show = payload.show
		}
	},
	actions: {
		setLoading({ commit }, loading) {
			commit({ type: SET_LOADING_STATE, loading: loading })
		},
		setAlert({ commit }, alert) {
			commit({ type: SET_ALERT_STATE, show: alert.show, alertType: alert.type, timeout: alert.timeout, text: alert.text })
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
