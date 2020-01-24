import { SET_STATE_USERS } from './mutation-types'

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
		}
	},
	actions: {
		// eslint-disable-next-line no-unused-vars
		SOCKET_welcome({ commit }, data) {
			// eslint-disable-next-line no-console
			console.log(data)
		},
		// eslint-disable-next-line no-unused-vars
		SOCKET_connect({ commit }) {
			// const user = this.getters.oidcUser
			// this._vm.$socket.emit('message', { username: user.preferred_username })
		},
		// eslint-disable-next-line no-unused-vars
		SOCKET_disconnect({ commit }) {
			// eslint-disable-next-line no-console
			console.log('disconnect')
		},
		setUsers({ commit }, token) {
			this._vm.axios.get(process.env.VUE_APP_OIDC_AUTHORITY_USER_LIST, { headers: { Authorization: 'Bearer ' + token } }).then(
				response => {
					const selfUser = this.getters.oidcUser
					let users = []
					response.data.forEach(user => {
						if (selfUser.preferred_username !== user.username) users.push({ online: false, name: user.firstName + ' ' + user.lastName, username: user.username })
					})
					commit({ type: SET_STATE_USERS, users: users })
				},
				() => {}
			)
		}
	}
}
