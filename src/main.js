import Vue from 'vue'
import App from './App.vue'
import i18n from './plugins/i18n/i18n'
import store from './store'
import vuetify from './plugins/vuetify/vuetify'
import router from './plugins/router/router'
import './plugins/api/axios'
import './sass/variables.scss'

Vue.config.productionTip = false

new Vue({
	router,
	vuetify,
	store,
	i18n,
	render: h => h(App)
}).$mount('#app')
