import Vue from 'vue'
import store from '@/store'
import VueSocketIO from 'vue-socket.io'

const socket = new VueSocketIO({
	connection: process.env.VUE_APP_NODE_URL + '/chat',
	options: { autoConnect: false },
	vuex: {
		store,
		actionPrefix: 'SOCKET_',
		options: {
			useConnectionNamespace: true
		}
	}
})

Vue.use(socket)
