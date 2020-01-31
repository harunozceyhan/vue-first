import { SET_STATE_USERS, UPDATE_STATE_USER, UPDATE_STATE_USERS, UPDATE_STATE_ROOM_ID, UPDATE_STATE_MESSAGE_LIST, ADD_STATE_TO_MESSAGE_LIST, UPDATE_STATE_UNREAD_MESSAGE_LIST, ADD_STATE_TO_UNREAD_MESSAGE_LIST, SET_STATE_CONNECTED } from './mutation-types'

export default {
	state: {
		isConnected: false,
		roomId: null,
		users: [],
		unreadMessageList: [],
		messageList: []
	},
	getters: {
		getSocketConnected: state => {
			return state.isConnected
		},
		getUsers: state => {
			return state.users
		},
		getRoomId: state => {
			return state.roomId
		},
		getMessageList: state => {
			return state.messageList
		},
		getUnreadMessageList: state => {
			return state.unreadMessageList
		},
		getOnlineUserCount: state => {
			return state.users.filter(user => {
				return user.online === true
			}).length
		}
	},
	mutations: {
		[SET_STATE_CONNECTED](state, payload) {
			state.isConnected = payload.isConnected
		},
		[SET_STATE_USERS](state, payload) {
			state.users = payload.users
		},
		[UPDATE_STATE_USER](state, payload) {
			state.users.filter(user => {
				if (user.username === payload.username || user.sockets.includes(payload.socketId)) {
					if (payload.online) {
						user.sockets.push(payload.socketId)
					} else {
						user.sockets.splice(user.sockets.indexOf(payload.socketId), 1)
					}
					user.online = user.sockets.length > 0
				}
			})
		},
		[UPDATE_STATE_USERS](state, payload) {
			payload.socketList.forEach(socket => {
				state.users.filter(user => {
					if (user.username === socket.username) {
						user.sockets.push(socket.socketId)
						user.online = true
					}
				})
			})
		},
		[UPDATE_STATE_ROOM_ID](state, payload) {
			state.roomId = payload.roomId
		},
		[UPDATE_STATE_MESSAGE_LIST](state, payload) {
			state.messageList = payload.messageList
		},
		[UPDATE_STATE_UNREAD_MESSAGE_LIST](state, payload) {
			state.unreadMessageList = payload.unreadMessageList
		},
		[ADD_STATE_TO_MESSAGE_LIST](state, payload) {
			state.messageList.push(payload.message)
		},
		[ADD_STATE_TO_UNREAD_MESSAGE_LIST](state, payload) {
			state.unreadMessageList.push(payload.message)
		}
	},
	actions: {
		SOCKET_connect({ commit }) {
			commit({ type: SET_STATE_CONNECTED, isConnected: true })
			this._vm.$socket.emit('socketConnected', this.getters.oidcUser.preferred_username)
		},
		SOCKET_connect_error({ commit }) {
			commit({ type: SET_STATE_CONNECTED, isConnected: false })
		},
		SOCKET_socketConnected({ commit }, socket) {
			commit({ type: UPDATE_STATE_USER, username: socket.username, socketId: socket.socketId, online: true })
		},
		SOCKET_socketList({ commit }, socketList) {
			commit({ type: UPDATE_STATE_USERS, socketList: socketList })
		},
		SOCKET_getRoomId({ commit }, data) {
			commit({ type: UPDATE_STATE_ROOM_ID, roomId: data })
			this.dispatch('removeUnreadMessagesOfRoom', data)
		},
		// eslint-disable-next-line no-unused-vars
		SOCKET_getMessagesOfRoom({ commit }, messageList) {
			this.dispatch('setMessageList', messageList)
		},
		SOCKET_onMessage({ commit }, message) {
			commit({ type: ADD_STATE_TO_UNREAD_MESSAGE_LIST, message: message })
		},
		// eslint-disable-next-line no-unused-vars
		SOCKET_onRoomMessage({ commit }, message) {
			this.dispatch('addMessageToMessageList', message)
			if (message.receiver === this.getters.oidcUser.preferred_username) {
				this._vm.$socket.emit('setMessageAsRead', message.id)
			}
		},
		SOCKET_unreadMessages({ commit }, messageList) {
			commit({ type: UPDATE_STATE_UNREAD_MESSAGE_LIST, unreadMessageList: messageList })
		},
		SOCKET_socketDisconnected({ commit }, socket) {
			commit({ type: UPDATE_STATE_USER, socketId: socket.socketId, online: false })
		},
		setUsers({ commit }, token) {
			this._vm.axios.get(process.env.VUE_APP_OIDC_AUTHORITY_USER_LIST, { headers: { Authorization: 'Bearer ' + token } }).then(
				response => {
					let users = []
					response.data.forEach(user => {
						if (this.getters.oidcUser.preferred_username !== user.username) users.push({ online: false, name: user.firstName + ' ' + user.lastName, username: user.username, messageCount: 0, sockets: [] })
					})
					commit({ type: SET_STATE_USERS, users: users })
					this._vm.$socket.open()
				},
				() => {}
			)
		},
		setRoomToNull({ commit }) {
			this._vm.$socket.emit('leaveRoom', this.getters.getRoomId)
			commit({ type: UPDATE_STATE_ROOM_ID, roomId: null })
		},
		setMessageList({ commit }, messageList) {
			commit({ type: UPDATE_STATE_MESSAGE_LIST, messageList: messageList })
			this.dispatch('scrollToBottom')
		},
		addMessageToMessageList({ commit }, message) {
			commit({ type: ADD_STATE_TO_MESSAGE_LIST, message: message })
			this.dispatch('scrollToBottom')
		},
		removeUnreadMessagesOfRoom({ commit }, roomId) {
			const unreadMessageList = this.getters.getUnreadMessageList.filter(message => {
				return message.roomId !== roomId
			})
			commit({ type: UPDATE_STATE_UNREAD_MESSAGE_LIST, unreadMessageList: unreadMessageList })
		},
		scrollToBottom() {
			setTimeout(() => {
				const messageRef = document.getElementById('message-list')
				if (messageRef != null) messageRef.scrollTo(0, messageRef.scrollHeight)
			}, 50)
		}
	}
}
