import Vue from 'vue'
import vuetify from './plugins/vuetify'
import router from './plugins/router'
import App from './App.vue'
import store from './store'

Vue.config.productionTip = false

new Vue({
	router,
	vuetify,
	store,
	render: h => h(App)
}).$mount('#app')
