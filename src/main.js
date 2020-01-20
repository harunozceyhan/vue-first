import Vue from 'vue'
import App from './App.vue'
import i18n from './plugins/i18n/i18n'
import store from './store'
import AuthDirective from './plugins/auth/AuthDirective'
import vuetify from './plugins/vuetify/vuetify'
import router from './plugins/router/router'
import moment from 'vue-moment'
import './plugins/api/axios'
import './sass/main.scss'

const parseJwt = token => {
	var base64Url = token.split('.')[1]
	var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
	var jsonPayload = decodeURIComponent(
		atob(base64)
			.split('')
			.map(function(c) {
				return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
			})
			.join('')
	)

	return JSON.parse(jsonPayload)
}

Vue.config.productionTip = false
Vue.use(moment)
Vue.prototype.$parseJwt = token => parseJwt(token)

new Vue({
	router,
	vuetify,
	store,
	i18n,
	moment,
	components: { AuthDirective },
	render: h => h(App)
}).$mount('#app')
