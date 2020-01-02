import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
import store from '@/store'
import { vuexOidcCreateRouterMiddleware } from 'vuex-oidc'

Vue.use(VueRouter)

const router = new VueRouter({
	mode: 'history',
	routes: routes
})
router.beforeEach((_to, _from, _next) => {
	store.dispatch('clearPage')
	_next()
})

router.beforeEach(vuexOidcCreateRouterMiddleware(store))

export default router
