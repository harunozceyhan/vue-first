import Vue from 'vue'
import SmartCore from 'smart-core-plugin'
import App from './App.vue'
import i18n from './plugins/i18n/i18n'
import store from './store'
import vuetify from './plugins/vuetify/vuetify'
import router from './plugins/router/router'
import './sass/main.scss'

Vue.config.productionTip = false
Vue.use(SmartCore)

new Vue({
	router,
	vuetify,
	store,
	i18n,
	render: h => h(App)
}).$mount('#app')
