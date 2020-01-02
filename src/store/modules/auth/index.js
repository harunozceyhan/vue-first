import { SET_SERVICES_STATE, SET_ROLES_STATE, SET_PERMISSIONS_STATE } from './mutation-types'

export default {
	state: {
		services: [],
		roles: [],
		permissions: []
	},
	getters: {
		getState: state => {
			return state
		},
		getServices: state => {
			return state.services
		},
		getServicesExists: state => service => {
			return state.services.includes(service)
		},
		getRoles: state => {
			return state.roles
		},
		getPermissions: state => {
			return state.permissions
		},
		getPermissionExists: state => (permission, service) => {
			return (
				state.permissions.filter(permissionobj => {
					return permissionobj.service === service && (permissionobj.permission === permission || permissionobj.permission === permission.split(':')[0] + ':*' || permissionobj.permission === '*')
				}).length > 0
			)
		}
	},
	mutations: {
		[SET_SERVICES_STATE](state, payload) {
			state.services = payload.services
		},
		[SET_ROLES_STATE](state, payload) {
			state.roles = payload.roles
		},
		[SET_PERMISSIONS_STATE](state, payload) {
			state.permissions = payload.permissions
		}
	},
	actions: {
		setServices({ commit }, services) {
			services instanceof Array ? commit({ type: SET_SERVICES_STATE, services: services }) : commit({ type: SET_SERVICES_STATE, services: [services] })
		},
		setRoles({ commit }, roles) {
			commit({ type: SET_ROLES_STATE, roles: roles })
		},
		setPermissions({ commit, state }, parsedJwt) {
			let permissions = []
			state.services.forEach(service => {
				parsedJwt.resource_access[service].roles.forEach(permission => {
					permissions.push({ permission: permission, service: service })
				})
			})
			commit({ type: SET_PERMISSIONS_STATE, permissions: permissions })
		}
	}
}
