import Vue from 'vue'
import Vuex from 'vuex'
import api from './modules/api'
import common from './modules/common'
import auth from './modules/auth'
import socket from './modules/socket'
import { vuexOidcCreateStoreModule } from 'vuex-oidc'
import { oidcSettings } from '@/plugins/oidc/config/oidc'

Vue.use(Vuex)

export default new Vuex.Store({
	modules: {
		api,
		common,
		auth,
		socket,
		oidcStore: vuexOidcCreateStoreModule(oidcSettings, { dispatchEventsOnWindow: true })
	}
})
