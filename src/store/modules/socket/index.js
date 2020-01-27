import { SET_STATE_USERS, UPDATE_STATE_USER, UPDATE_STATE_USERS } from './mutation-types'

export default {
	state: {
		isConnected: false,
		users: []
	},
	getters: {
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
		}
	},
	actions: {
		SOCKET_connect() {
			this._vm.$socket.emit('socketConnected', this.getters.oidcUser.preferred_username)
		},
		SOCKET_socketConnected({ commit }, socket) {
			commit({ type: UPDATE_STATE_USER, username: socket.username, socketId: socket.socketId, online: true })
		},
		SOCKET_socketList({ commit }, socketList) {
			commit({ type: UPDATE_STATE_USERS, socketList: socketList })
		},
		SOCKET_socketDisconnected({ commit }, socket) {
			// eslint-disable-next-line no-debugger
			debugger
			commit({ type: UPDATE_STATE_USER, socketId: socket.socketId, online: false })
		},
		setUsers({ commit }, token) {
			this._vm.axios.get(process.env.VUE_APP_OIDC_AUTHORITY_USER_LIST, { headers: { Authorization: 'Bearer ' + token } }).then(
				response => {
					let users = []
					response.data.forEach(user => {
						if (this.getters.oidcUser.preferred_username !== user.username) users.push({ online: false, name: user.firstName + ' ' + user.lastName, username: user.username, sockets: [] })
					})
					commit({ type: SET_STATE_USERS, users: users })
					this._vm.$socket.open()
				},
				() => {}
			)
		}
	}
}
