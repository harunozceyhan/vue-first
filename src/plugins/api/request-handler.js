import store from '@/store'

export const requestConfig = config => {
	if (config.loading) store.dispatch('setLoading', true)
	return config
}

export const requestConfigError = error => {
	return Promise.reject(error)
}
