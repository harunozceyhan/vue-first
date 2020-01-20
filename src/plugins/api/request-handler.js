import store from '@/store'

export const requestConfig = config => {
	if (config.loading) store.dispatch('setLoading', true)
	if (config.tableLoading) store.dispatch('setTableLoading', true)
	if (config.tabTableLoading) store.dispatch('setTabTableLoading', true)
	config.headers.common['Authorization'] = 'Bearer ' + store.state.oidcStore.access_token
	return config
}

export const requestConfigError = error => {
	return Promise.reject(error)
}
