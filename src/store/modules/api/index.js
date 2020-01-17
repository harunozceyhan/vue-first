import { SET_METADATA_OF_PAGE, SET_MAINLIST_OF_PAGE, CLEAR_PAGE_STATE, SET_STATE_NOTIFICATIONS, SET_STATE_USERS, SET_SHOW_DETAIL_STATE, SET_DETAIL_DATA_STATE, SET_COMBOLIST_OF_PAGE_STATE, SET_TAB_MAINLIST_OF_PAGE } from './mutation-types'
import i18n from '@/plugins/i18n/i18n'
import axios from 'axios'

const tabPage = () => ({
	mainList: [],
	pageSize: 5,
	totalElements: 0,
	pageNumber: 0,
	showDetail: false,
	detailData: {},
	comboList: {}
})

const page = () => ({
	metadata: null,
	mainList: [],
	pageSize: 5,
	totalElements: 0,
	pageNumber: 0,
	showDetail: false,
	detailData: {},
	comboList: {},
	tabPageList: []
})

let CancelToken = axios.CancelToken
let source = CancelToken.source()
let isInRequest = false

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
        getTabPage: (state) => (index) => {
			return state.page.tabPageList[index]
		},
		getMetadataOfPage: state => {
			return state.page.metadata
        },
        getTabMetadataOfPage: (state) => (index) => {
			return state.page.metadata.tabs[index]
		},
		getMainListOfPage: state => {
			return state.page.mainList
		},
		getPageComboList: state => {
			return state.page.comboList
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
			const tabPageInitial = tabPage()
			state.page.metadata = payload.metadata
			payload.metadata.tabs.forEach(() => {
				state.page.tabPageList.push(tabPageInitial)
			})
		},
		[SET_MAINLIST_OF_PAGE](state, payload) {
			state.page.mainList = payload.mainList
			state.page.pageSize = payload.pageSize
			state.page.totalElements = payload.totalElements
			state.page.pageNumber = payload.pageNumber
        },
        [SET_TAB_MAINLIST_OF_PAGE](state, payload) {
			state.page.tabPageList[payload.index].mainList = payload.mainList
			state.page.tabPageList[payload.index].pageSize = payload.pageSize
			state.page.tabPageList[payload.index].totalElements = payload.totalElements
			state.page.tabPageList[payload.index].pageNumber = payload.pageNumber
		},
		[SET_COMBOLIST_OF_PAGE_STATE](state, payload) {
			state.page.comboList = payload.comboList
		},
		[SET_SHOW_DETAIL_STATE](state, payload) {
			state.page.showDetail = payload.showDetail
		},
		[SET_DETAIL_DATA_STATE](state, payload) {
			state.page.detailData = JSON.parse(JSON.stringify(payload.detailData))
		},
		[SET_STATE_NOTIFICATIONS](state, payload) {
			state.notifications = payload.notifications
		},
		[SET_STATE_USERS](state, payload) {
			state.users = payload.users
		}
	},
	actions: {
		refreshRequestToken() {
			if (isInRequest) {
				source.cancel()
				CancelToken = axios.CancelToken
				source = CancelToken.source()
			} else {
				isInRequest = true
			}
		},
		clearPage({ commit }) {
			commit({ type: CLEAR_PAGE_STATE })
		},
		setMetaDataOfPage({ commit }, metadata) {
			commit({ type: SET_METADATA_OF_PAGE, metadata: metadata })
		},
		setShowDetailOfPage({ commit }, showDetail) {
			window.dispatchEvent(new Event('resize'))
			commit({ type: SET_SHOW_DETAIL_STATE, showDetail: showDetail })
			if (showDetail === false) this.dispatch('setDetailDataOfPage', {})
		},
		setDetailDataOfPage({ commit, state }, detailData) {
			if (state.page.metadata != null && detailData.id == undefined)
				state.page.metadata.columns.forEach(column => {
					if (column.type === 'boolean') detailData[column.value] = true
				})
			commit({ type: SET_DETAIL_DATA_STATE, detailData: detailData })
		},
		// eslint-disable-next-line no-unused-vars
		setDetailOfPage({ commit }, payload) {
			window.dispatchEvent(new Event('resize'))
			this.dispatch('setDetailDataOfPage', payload.detailData)
			this.dispatch('setShowDetailOfPage', payload.showDetail)
		},
		requestMetaDataOfPage({ commit }, requestUri) {
			this._vm.axios.get(requestUri, { loading: true }).then(
				response => commit({ type: SET_METADATA_OF_PAGE, metadata: response.data }),
				() => {}
			)
		},
		requestEmbeddedMainListOfPage({ commit }, payload) {
			this.dispatch('refreshRequestToken')
			this._vm.axios.get(payload.requestUri, { tableLoading: true, cancelToken: source.token }).then(
				response => {
					isInRequest = false
					commit({ type: SET_MAINLIST_OF_PAGE, mainList: response.data._embedded[payload.responseKey], pageSize: response.data.page.size, totalElements: response.data.page.totalElements, pageNumber: response.data.page.number })
				},
				() => {}
			)
        },
        requestEmbeddedTabListOfPage({ commit }, payload) {
			this.dispatch('refreshRequestToken')
			this._vm.axios.get(payload.requestUri, { tabTableLoading: true, cancelToken: source.token }).then(
				response => {
					isInRequest = false
					commit({ type: SET_TAB_MAINLIST_OF_PAGE, index: payload.index, mainList: response.data._embedded[payload.responseKey], pageSize: response.data.page.size, totalElements: response.data.page.totalElements, pageNumber: response.data.page.number })
				},
				() => {}
			)
		},
		requestPostMainOfPage({ commit, rootState }, payload) {
			this._vm.axios.post(payload.requestUri, payload.data, { loading: true }).then(
				response => {
					commit({ type: SET_DETAIL_DATA_STATE, detailData: response.data })
					this.dispatch('setSuccessAlert', i18n.t('base.message.recordAdded') + '!')
					rootState.common.eventHub.$emit('refreshPageList')
				},
				() => {}
			)
		},
		requestPutMainOfPage({ commit, rootState }, payload) {
			this._vm.axios.put(payload.requestUri + '/' + payload.data.id, payload.data, { loading: true }).then(
				response => {
					commit({ type: SET_DETAIL_DATA_STATE, detailData: response.data })
					this.dispatch('setSuccessAlert', i18n.t('base.message.recordUpdated') + '!')
					rootState.common.eventHub.$emit('refreshPageList')
				},
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
