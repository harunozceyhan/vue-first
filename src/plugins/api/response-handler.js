import store from '@/store'
import i18n from '@/plugins/i18n/i18n'

export const successResponseHandler = response => {
	store.dispatch('setLoading', false)
	return response
}

const getMessageOfResponseStatus = status => {
	switch (status) {
		case 400: // Bad Request
			return i18n.t('response.error.badrequest')
		case 401: // Unauthenticated
			return i18n.t('response.error.unauthenticated')
		case 403: // Forbidden
			return i18n.t('response.error.forbidden')
		case 404: // Not Found
			return i18n.t('response.error.notfound')
		case 405: // Method Not Allowed
			return i18n.t('response.error.notallowed')
		case 500: // Internal Server Error
			return i18n.t('response.error.internalerror')
		default:
			return i18n.t('response.error.unknown')
	}
}

export const errorResponseHandler = error => {
	store.dispatch('setLoading', false)
	store.dispatch('setErrorAlert', getMessageOfResponseStatus(error.response.status) + '!')
	return Promise.reject(error)
}
