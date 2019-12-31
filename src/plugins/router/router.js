import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
import store from '@/store'

Vue.use(VueRouter)

const router = new VueRouter({
	routes
})

// eslint-disable-next-line no-unused-vars
router.beforeEach((_to, _from, _next) => {
	store.dispatch('clearPage')
	_next()
})

export default router
