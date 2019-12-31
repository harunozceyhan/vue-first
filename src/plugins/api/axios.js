'use strict'

import Vue from 'vue'
import axios from 'axios'
import store from '@/store'

let config = {
	baseURL: process.env.VUE_APP_ROOT_API
}

const _axios = axios.create(config)
_axios.defaults.headers['Authorization'] = 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJubjMzU1FlVVFmMWpiYW04TTVfTVVsYXBnbURNRkpjNnRZNlBZT2VpVEpzIn0.eyJqdGkiOiI0ZWZlZTMxZi1hNDQ1LTQ3YmYtYThmZC00YThmY2QwOTI2MjIiLCJleHAiOjE1Nzc4Mzc0ODUsIm5iZiI6MCwiaWF0IjoxNTc3ODAxNDg1LCJpc3MiOiJodHRwOi8vZGV2LnNtYXJ0aXlzLmlvOjgwODAvYXV0aC9yZWFsbXMvbWFzdGVyIiwiYXVkIjpbInNiby1zZXJ2aWNlIiwibWFzdGVyLXJlYWxtIiwiYWNjb3VudCJdLCJzdWIiOiJhNDc2YWFkMS1iMmYwLTRlOGQtOWZjZC00OGQzYzZlMmE0NWYiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJhdXRoIiwiYXV0aF90aW1lIjowLCJzZXNzaW9uX3N0YXRlIjoiYmNlYmFmOTEtZjgyOS00ODhmLWJjMjktOGRhZjdkMjJmNTdmIiwiYWNyIjoiMSIsImFsbG93ZWQtb3JpZ2lucyI6WyIqLyoiXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbImNyZWF0ZS1yZWFsbSIsInNib19hZG1pbiIsIm9mZmxpbmVfYWNjZXNzIiwiYWRtaW4iLCJ1bWFfYXV0aG9yaXphdGlvbiJdfSwicmVzb3VyY2VfYWNjZXNzIjp7InNiby1zZXJ2aWNlIjp7InJvbGVzIjpbInNpcGFyaXM6KiIsIm9wZXJhdGlvbnM6KiIsIndvcmtlcjoqIiwiY2FyZDoqIl19LCJtYXN0ZXItcmVhbG0iOnsicm9sZXMiOlsidmlldy1yZWFsbSIsInZpZXctaWRlbnRpdHktcHJvdmlkZXJzIiwibWFuYWdlLWlkZW50aXR5LXByb3ZpZGVycyIsImltcGVyc29uYXRpb24iLCJjcmVhdGUtY2xpZW50IiwibWFuYWdlLXVzZXJzIiwicXVlcnktcmVhbG1zIiwidmlldy1hdXRob3JpemF0aW9uIiwicXVlcnktY2xpZW50cyIsInF1ZXJ5LXVzZXJzIiwibWFuYWdlLWV2ZW50cyIsIm1hbmFnZS1yZWFsbSIsInZpZXctZXZlbnRzIiwidmlldy11c2VycyIsInZpZXctY2xpZW50cyIsIm1hbmFnZS1hdXRob3JpemF0aW9uIiwibWFuYWdlLWNsaWVudHMiLCJxdWVyeS1ncm91cHMiXX0sImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoicHJvZmlsZSBlbWFpbCIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwicHJlZmVycmVkX3VzZXJuYW1lIjoiYWRtaW4ifQ.RWd1CCXAEPalcAVOGAwxuT3I61JSDYNPEp0fzuB5h0r2GIZiz1sPnj97iUoF3boZIaVFHcoU1CKDsd6W3iR7mrBiLc3KaMyW3BBiWlU54QUGoBE4s9A33_RO1NLnLxDKy-Sqsly1YThQGL1_txM5lqHhICTP3ak_lM2ffnDZTvYHPt6biO-HFZZGH-IpCtckMXpc8doznmaEWSeUklWiM16bHgWGwoTSSZuj7Y_oxBv5r9jLtizqdzZvkHPlkd2OMACL9hOoyWIaUVdIwzefIvqljyxqt8tsbGviMLLpROR5Y50gXzOUxqjQWvLBrvOp5ffz7X5iJt8jOzKHUKotAw'

_axios.interceptors.request.use(
	function(config) {
		return config
	},
	function(error) {
		// Do something with request error
		return Promise.reject(error)
	}
)

// Add a response interceptor
_axios.interceptors.response.use(
	function(response) {
		store.dispatch('setLoading', false)
		return response
	},
	function(error) {
		store.dispatch('setLoading', false)
		// eslint-disable-next-line no-debugger
		if (error.response.status === 403) {
			store.dispatch('setErrorAlert', 'Yetkiniz Bulunmamaktadır!')
		}
		return Promise.reject(error)
	}
)

Plugin.install = function(Vue) {
	Vue.axios = _axios
	store.axios = _axios
	Object.defineProperties(Vue.prototype, {
		axios: {
			get() {
				return _axios
			}
		}
	})
}

Vue.use(Plugin)

export default Plugin
