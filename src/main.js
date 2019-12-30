import Vue from 'vue'
import App from './App.vue'
import './plugins/api/axios'
import store from './store'
import vuetify from './plugins/vuetify/vuetify'
import router from './plugins/router/router'

Vue.config.productionTip = false

new Vue({
	router,
	vuetify,
	store,
	render: h => h(App)
}).$mount('#app')
