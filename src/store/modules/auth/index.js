import { SET_USERNAME_OF_OBJ } from './mutation-types'

export default {
	state: {
		user: {
			username: null,
			notification: 4
		}
	},
	getters: {
		getUser: state => {
			return state.user
		}
	},
	mutations: {
		[SET_USERNAME_OF_OBJ](state, payload) {
			state.user.username = payload.username
		}
	},
	actions: {
		setUsernameOfObj({ commit }, username) {
			commit({ type: SET_USERNAME_OF_OBJ, username: username })
		}
	}
}
