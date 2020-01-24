import store from '@/store'
import router from '@/plugins/router/router'

export default class AuthService {
	static checkPermission(permissionString) {
		const permissionArray = permissionString.split(':')
		return store.getters.getPermissionExists(permissionArray[1] + ':' + permissionArray[2], permissionArray[0])
	}

	static checkPermissionForRoute(permissionString) {
		const permissionArray = permissionString.split(':')
		if (!store.getters.getPermissionExists(permissionArray[1] + ':' + permissionArray[2], permissionArray[0])) {
			router.push({ path: '/dashboard' })
		}
		return store.getters.getPermissionExists(permissionArray[1] + ':' + permissionArray[2], permissionArray[0])
	}
}
