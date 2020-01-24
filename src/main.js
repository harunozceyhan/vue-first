import Vue from 'vue'
import App from './App.vue'
import i18n from './plugins/i18n/i18n'
import store from './store'
import permission from './plugins/auth/permission'
import vuetify from './plugins/vuetify/vuetify'
import router from './plugins/router/router'
import moment from 'vue-moment'
import './plugins/auth/jwt'
import './plugins/api/axios'
import './plugins/socket'
import './sass/main.scss'

Vue.config.productionTip = false
Vue.use(moment)

new Vue({
	router,
	vuetify,
	store,
	i18n,
	moment,
	components: { permission },
	render: h => h(App)
}).$mount('#app')
