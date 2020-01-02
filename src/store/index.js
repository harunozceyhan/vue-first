/* eslint-disable no-console */
import Vue from 'vue'
import Vuex from 'vuex'
import api from './modules/api'
import common from './modules/common'
import { vuexOidcCreateStoreModule } from 'vuex-oidc'
import { oidcSettings } from '@/plugins/oidc/config/oidc'

Vue.use(Vuex)

export default new Vuex.Store({
	modules: {
		oidcStore: vuexOidcCreateStoreModule(oidcSettings),
		api,
		common
	}
})
