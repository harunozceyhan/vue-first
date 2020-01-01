import store from '@/store'
import i18n from '@/plugins/i18n/i18n'

export const successResponseHandler = response => {
	store.dispatch('setLoading', false)
	return response
}

export const errorResponseHandler = error => {
	store.dispatch('setLoading', false)
	if (error.response.status === 403) {
		store.dispatch('setErrorAlert', i18n.t('auth.permission'))
	}
	return Promise.reject(error)
}
