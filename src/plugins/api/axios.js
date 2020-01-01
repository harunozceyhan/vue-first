'use strict'
import Vue from 'vue'
import axios from 'axios'
import { successResponseHandler, errorResponseHandler } from './response-handler'
import { requestConfig, requestConfigError } from './request-handler'

const _axios = axios.create({
	baseURL: process.env.VUE_APP_ROOT_API,
	headers: {
		Authorization: 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJubjMzU1FlVVFmMWpiYW04TTVfTVVsYXBnbURNRkpjNnRZNlBZT2VpVEpzIn0.eyJqdGkiOiI1M2QxNzVmMy00YTZlLTQxYzgtYmRkYS1mMjU0NzMwZTdkZjIiLCJleHAiOjE1Nzc5MjczNTcsIm5iZiI6MCwiaWF0IjoxNTc3ODkxMzU3LCJpc3MiOiJodHRwOi8vZGV2LnNtYXJ0aXlzLmlvOjgwODAvYXV0aC9yZWFsbXMvbWFzdGVyIiwiYXVkIjpbInNiby1zZXJ2aWNlIiwibWFzdGVyLXJlYWxtIiwiYWNjb3VudCJdLCJzdWIiOiJhNDc2YWFkMS1iMmYwLTRlOGQtOWZjZC00OGQzYzZlMmE0NWYiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJhdXRoIiwiYXV0aF90aW1lIjowLCJzZXNzaW9uX3N0YXRlIjoiMTczODU3ODQtZWUyMC00OTZhLWIwNWMtODFjNTMyOGU0MGIyIiwiYWNyIjoiMSIsImFsbG93ZWQtb3JpZ2lucyI6WyIqLyoiXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbImNyZWF0ZS1yZWFsbSIsInNib19hZG1pbiIsIm9mZmxpbmVfYWNjZXNzIiwiYWRtaW4iLCJ1bWFfYXV0aG9yaXphdGlvbiJdfSwicmVzb3VyY2VfYWNjZXNzIjp7InNiby1zZXJ2aWNlIjp7InJvbGVzIjpbInNpcGFyaXM6KiIsIm9wZXJhdGlvbnM6KiIsIndvcmtlcjoqIiwiY2FyZDoqIl19LCJtYXN0ZXItcmVhbG0iOnsicm9sZXMiOlsidmlldy1yZWFsbSIsInZpZXctaWRlbnRpdHktcHJvdmlkZXJzIiwibWFuYWdlLWlkZW50aXR5LXByb3ZpZGVycyIsImltcGVyc29uYXRpb24iLCJjcmVhdGUtY2xpZW50IiwibWFuYWdlLXVzZXJzIiwicXVlcnktcmVhbG1zIiwidmlldy1hdXRob3JpemF0aW9uIiwicXVlcnktY2xpZW50cyIsInF1ZXJ5LXVzZXJzIiwibWFuYWdlLWV2ZW50cyIsIm1hbmFnZS1yZWFsbSIsInZpZXctZXZlbnRzIiwidmlldy11c2VycyIsInZpZXctY2xpZW50cyIsIm1hbmFnZS1hdXRob3JpemF0aW9uIiwibWFuYWdlLWNsaWVudHMiLCJxdWVyeS1ncm91cHMiXX0sImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoicHJvZmlsZSBlbWFpbCIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwicHJlZmVycmVkX3VzZXJuYW1lIjoiYWRtaW4ifQ.AHenWMYWyp6WrdtYqTfERLzeNITWh19FhSKAQLj-o8k67fV0AppnxF51hqswX8HGfuqH_qS9PB2VCuBEJUnpiA_H6M2-ZMnK4LBhTfaCDqX8Rq5GNe_pb5mp1pzaAKtcosk7iiqOVTd_uhSL63hy_H25aSyG4n7iT4uhIT0jbWEwOv3P6bhT0V3d41uE8jcWyaC70AobWnBRGuT6GJK0euakIaLyCtYKMT8mL7FKSH2eVVJf44RTliufd0eX8Iovzlfs5OVpg6Hmsq_iN1gKcnKcEAgZlnnZlprshq7ji3eHWoB4aTddmZLXI5mRqVT55avaTS6RIIPkI1yT07XqsQ'
	}
})

_axios.interceptors.request.use(requestConfig, requestConfigError)
_axios.interceptors.response.use(successResponseHandler, errorResponseHandler)

Plugin.install = function(Vue) {
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
