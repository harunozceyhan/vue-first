import Vue from 'vue'
import App from './App.vue'
import './plugins/api/axios'
import i18n from './plugins/i18n/i18n'
import store from './store'
import vuetify from './plugins/vuetify/vuetify'
import router from './plugins/router/router'

Vue.config.productionTip = false

new Vue({
	router,
	vuetify,
	store,
	i18n,
	render: h => h(App)
}).$mount('#app')
