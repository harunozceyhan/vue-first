'use strict'

import Vue from 'vue'
import axios from 'axios'
import store from '../../store'

// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

let config = {
	baseURL: process.env.VUE_APP_ROOT_API
}

const _axios = axios.create(config)
_axios.defaults.headers['Authorization'] = 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJubjMzU1FlVVFmMWpiYW04TTVfTVVsYXBnbURNRkpjNnRZNlBZT2VpVEpzIn0.eyJqdGkiOiIzNDJhM2Y4YS02ODVkLTRlNzUtYjA5Zi1iZWY1YmE1NDEyZDQiLCJleHAiOjE1Nzc3NzkwMDIsIm5iZiI6MCwiaWF0IjoxNTc3NzQzMDAyLCJpc3MiOiJodHRwOi8vZGV2LnNtYXJ0aXlzLmlvOjgwODAvYXV0aC9yZWFsbXMvbWFzdGVyIiwiYXVkIjpbInNiby1zZXJ2aWNlIiwibWFzdGVyLXJlYWxtIiwiYWNjb3VudCJdLCJzdWIiOiJhNDc2YWFkMS1iMmYwLTRlOGQtOWZjZC00OGQzYzZlMmE0NWYiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJhdXRoIiwiYXV0aF90aW1lIjowLCJzZXNzaW9uX3N0YXRlIjoiMTYyMWZiNTQtMzJhMy00ZGI0LTk5ODItMzM2OGI4Nzk0NmY5IiwiYWNyIjoiMSIsImFsbG93ZWQtb3JpZ2lucyI6WyIqLyoiXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbImNyZWF0ZS1yZWFsbSIsInNib19hZG1pbiIsIm9mZmxpbmVfYWNjZXNzIiwiYWRtaW4iLCJ1bWFfYXV0aG9yaXphdGlvbiJdfSwicmVzb3VyY2VfYWNjZXNzIjp7InNiby1zZXJ2aWNlIjp7InJvbGVzIjpbInNpcGFyaXM6KiIsIm9wZXJhdGlvbnM6KiIsIndvcmtlcjoqIiwiY2FyZDoqIl19LCJtYXN0ZXItcmVhbG0iOnsicm9sZXMiOlsidmlldy1yZWFsbSIsInZpZXctaWRlbnRpdHktcHJvdmlkZXJzIiwibWFuYWdlLWlkZW50aXR5LXByb3ZpZGVycyIsImltcGVyc29uYXRpb24iLCJjcmVhdGUtY2xpZW50IiwibWFuYWdlLXVzZXJzIiwicXVlcnktcmVhbG1zIiwidmlldy1hdXRob3JpemF0aW9uIiwicXVlcnktY2xpZW50cyIsInF1ZXJ5LXVzZXJzIiwibWFuYWdlLWV2ZW50cyIsIm1hbmFnZS1yZWFsbSIsInZpZXctZXZlbnRzIiwidmlldy11c2VycyIsInZpZXctY2xpZW50cyIsIm1hbmFnZS1hdXRob3JpemF0aW9uIiwibWFuYWdlLWNsaWVudHMiLCJxdWVyeS1ncm91cHMiXX0sImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIHByb2ZpbGUgZW1haWwiLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsInByZWZlcnJlZF91c2VybmFtZSI6ImFkbWluIn0.exe8bcSgxv0Ym3uGgvvYz3Ujii2L5OZWFvl7btjAU5VtcajGT7TMSEPcofPlB4yaZOaz_TqLYVcH28J2dr7pH55J3x4uG3BlTXWXEy6aMr9IAy0n3PtzAckIUwu0WgspED6nCIcBQT8qpi71FPVCIJfvOYHJf3wEYksg85JqpaKwi1TYwc3XM9BM6jrJJaSW4SmkrCdA0aqVqNKFxF2UZs8oHoZuHP6bZmknTIH2PGs-IxJextZHYrt9mJHDBIEdgLq9Rsq0cwC7t3lb8L84JCHg52tG776T7oQyt7beRCay7VKvqb1dGEVmmfaKD-d4ra5y6nq_6oT7gnI_lohIQw'

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
		return response
	},
	function(error) {
		// Do something with response error
		return Promise.reject(error)
	}
)

Plugin.install = function(Vue) {
	Vue.axios = _axios
	window.axios = _axios
	store.axios = _axios
	Object.defineProperties(Vue.prototype, {
		axios: {
			get() {
				return _axios
			}
		},
		$axios: {
			get() {
				return _axios
			}
		}
	})
}

Vue.use(Plugin)

export default Plugin
