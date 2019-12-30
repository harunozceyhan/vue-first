'use strict'

import Vue from 'vue'
import axios from 'axios'

// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

let config = {
	baseURL: process.env.VUE_APP_ROOT_API,
	// timeout: 60 * 1000, // Timeout
	//withCredentials: true // Check cross-site Access-Control
	headers: {
		Authorization: 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJubjMzU1FlVVFmMWpiYW04TTVfTVVsYXBnbURNRkpjNnRZNlBZT2VpVEpzIn0.eyJqdGkiOiIwYWE1M2FjNy0wOGJmLTQzZGYtYThlYi0yZTQ2MmEzZTk1ZmYiLCJleHAiOjE1Nzc3NTk0MTYsIm5iZiI6MCwiaWF0IjoxNTc3NzIzNDE2LCJpc3MiOiJodHRwOi8vZGV2LnNtYXJ0aXlzLmlvOjgwODAvYXV0aC9yZWFsbXMvbWFzdGVyIiwiYXVkIjpbInNiby1zZXJ2aWNlIiwibWFzdGVyLXJlYWxtIiwiYWNjb3VudCJdLCJzdWIiOiJhNDc2YWFkMS1iMmYwLTRlOGQtOWZjZC00OGQzYzZlMmE0NWYiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJhdXRoIiwiYXV0aF90aW1lIjowLCJzZXNzaW9uX3N0YXRlIjoiYjdkNzBmODgtNWI1ZC00YTk5LWE0ODYtZmU4MDQ2MmQwMzI5IiwiYWNyIjoiMSIsImFsbG93ZWQtb3JpZ2lucyI6WyIqLyoiXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbImNyZWF0ZS1yZWFsbSIsInNib19hZG1pbiIsIm9mZmxpbmVfYWNjZXNzIiwiYWRtaW4iLCJ1bWFfYXV0aG9yaXphdGlvbiJdfSwicmVzb3VyY2VfYWNjZXNzIjp7InNiby1zZXJ2aWNlIjp7InJvbGVzIjpbIm9wZXJhdGlvbnM6KiJdfSwibWFzdGVyLXJlYWxtIjp7InJvbGVzIjpbInZpZXctcmVhbG0iLCJ2aWV3LWlkZW50aXR5LXByb3ZpZGVycyIsIm1hbmFnZS1pZGVudGl0eS1wcm92aWRlcnMiLCJpbXBlcnNvbmF0aW9uIiwiY3JlYXRlLWNsaWVudCIsIm1hbmFnZS11c2VycyIsInF1ZXJ5LXJlYWxtcyIsInZpZXctYXV0aG9yaXphdGlvbiIsInF1ZXJ5LWNsaWVudHMiLCJxdWVyeS11c2VycyIsIm1hbmFnZS1ldmVudHMiLCJtYW5hZ2UtcmVhbG0iLCJ2aWV3LWV2ZW50cyIsInZpZXctdXNlcnMiLCJ2aWV3LWNsaWVudHMiLCJtYW5hZ2UtYXV0aG9yaXphdGlvbiIsIm1hbmFnZS1jbGllbnRzIiwicXVlcnktZ3JvdXBzIl19LCJhY2NvdW50Ijp7InJvbGVzIjpbIm1hbmFnZS1hY2NvdW50IiwibWFuYWdlLWFjY291bnQtbGlua3MiLCJ2aWV3LXByb2ZpbGUiXX19LCJzY29wZSI6InByb2ZpbGUgZW1haWwiLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsInByZWZlcnJlZF91c2VybmFtZSI6ImFkbWluIn0.iALRqlydGvDo_EkPGvOlA_P5Z0hTDdmnp7BWB29hDcR3l36l5FEGpvngJKMdg-ommxpc0SATbosga60o6SNr6tX7I5YpO3-sH_0PpbW91By6RlddPkMj_ADDkxtbqU5XVhDxBhMTDWBMZC15eHGjZQofeAEUI5AYgV2Tr5bVXpXRwJcxfzW5K8WymF-GoRFvRBoXHTpxOOezi3PQhsRB8fIbHoe5QTvr9mXUAipivmIOeS3u-1rEk6RjIFtGWyN1LKYBtdcM_g5OKnQMU5kkE2MdrAlLHlMC_wgpsFxnoumsRSebjoGbumve0dTXJp8DTrtcMyzn1KQgktemhLRXlw'
	}
}

const _axios = axios.create(config)

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
		alert(response)
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
