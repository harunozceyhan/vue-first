import Vue from 'vue'
import store from '@/store'

const permission = {
	bind: function(el, binding) {
		const permissionArray = binding.value.split(':')
		if (!store.getters.getPermissionExists(permissionArray[1] + ':' + permissionArray[2], permissionArray[0])) {
			el.hidden = true
		}
	}
}

Vue.directive('permission', permission)

export default permission
