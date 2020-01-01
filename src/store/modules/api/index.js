import { SET_METADATA_OF_PAGE, SET_MAINLIST_OF_PAGE, CLEAR_PAGE_STATE } from './mutation-types'

const page = () => ({
	metadata: null,
	mainList: [],
	pageSize: 0,
	totalElements: 0,
	totalPages: 0,
	pageNumber: 0
})

export default {
	state: {
		page: page()
	},
	getters: {
		getPage: state => {
			return state.page
		},
		getMetadataOfPage: state => {
			return state.page.metadata
		},
		getMainListOfPage: state => {
			return state.page.mainList
		}
	},
	mutations: {
		[CLEAR_PAGE_STATE](state) {
			const initial = page()
			Object.keys(initial).forEach(key => {
				state.page[key] = initial[key]
			})
		},
		[SET_METADATA_OF_PAGE](state, payload) {
			state.page.metadata = payload.metadata
		},
		[SET_MAINLIST_OF_PAGE](state, payload) {
			state.page.mainList = payload.mainList
			state.page.pageSize = payload.pageSize
			state.page.totalElements = payload.totalElements
			state.page.totalPages = payload.totalPages
			state.page.pageNumber = payload.pageNumber
		}
	},
	actions: {
		clearPage({ commit }) {
			commit({ type: CLEAR_PAGE_STATE })
		},
		setMetaDataOfPage({ commit }, metadata) {
			commit({ type: SET_METADATA_OF_PAGE, metadata: metadata })
		},
		requestContentMainListOfPage({ commit }, requestUri) {
			this._vm.axios.get(requestUri, { loading: true }).then(
				response => commit({ type: SET_MAINLIST_OF_PAGE, mainList: response.data.content, pageSize: response.data.size, totalElements: response.data.totalElements, totalPages: response.data.page.totalPages, pageNumber: response.data.number }),
				() => {}
			)
		},
		requestEmbeddedMainListOfPage({ commit }, payload) {
			this._vm.axios.get(payload.requestUri, { loading: true }).then(
				response => commit({ type: SET_MAINLIST_OF_PAGE, mainList: response.data._embedded[payload.responseKey], pageSize: response.data.page.size, totalElements: response.data.page.totalElements, totalPages: response.data.page.totalPages, pageNumber: response.data.page.number }),
				() => {}
			)
		}
	}
}
