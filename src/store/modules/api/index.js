import { SET_METADATA_OF_PAGE, SET_MAINLIST_OF_PAGE, CLEAR_PAGE_STATE, SET_STATE_NOTIFICATIONS, SET_STATE_USERS } from './mutation-types'

const page = () => ({
	metadata: null,
	mainList: [],
	pageSize: 5,
	totalElements: 0,
	pageNumber: 0
})

export default {
	state: {
		page: page(),
		notifications: [
			{ title: ' Yeni Güncellemeler', subtitle: 'Stok Takibi Eklendi.', read: true },
			{ title: 'Recipes', subtitle: 'Jan 17, 2014', read: true },
			{ title: 'Work', subtitle: 'Jan 28, 2014', read: true }
		],
		users: [
			{ online: false, title: 'Jason Oner' },
			{ online: false, title: 'Ranee Carlson' },
			{ online: false, title: 'Cindy Baker' },
			{ online: false, title: 'Ali Connors' },
			{ online: false, title: 'Travis Howard' }
		]
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
		},
		getNotifications: state => {
			return state.notifications
		},
		getUnreadNotificationCount: state => {
			return state.notifications.filter(notification => {
				return notification.read === false
			}).length
		},
		getUsers: state => {
			return state.users
		},
		getOnlineUserCount: state => {
			return state.users.filter(user => {
				return user.online === true
			}).length
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
			state.page.pageNumber = payload.pageNumber
		},
		[SET_STATE_NOTIFICATIONS](state, payload) {
			state.notifications = payload.notifications
		},
		[SET_STATE_USERS](state, payload) {
			state.users = payload.users
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
			this._vm.axios.get(requestUri, { tableLoading: true }).then(
				response => commit({ type: SET_MAINLIST_OF_PAGE, mainList: response.data.content, pageSize: response.data.size, totalElements: response.data.totalElements, pageNumber: response.data.number }),
				() => {}
			)
		},
		requestEmbeddedMainListOfPage({ commit }, payload) {
			this._vm.axios.get(payload.requestUri, { tableLoading: true }).then(
				response => commit({ type: SET_MAINLIST_OF_PAGE, mainList: response.data._embedded[payload.responseKey], pageSize: response.data.page.size, totalElements: response.data.page.totalElements, pageNumber: response.data.page.number }),
				() => {}
			)
		},
		setNotifications({ commit }, notifications) {
			commit({ type: SET_STATE_NOTIFICATIONS, notifications: notifications })
		},
		setUsers({ commit }, users) {
			commit({ type: SET_STATE_USERS, users: users })
		}
	}
}
