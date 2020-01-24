import Vue from 'vue'
import store from '@/store'
import VueSocketIO from 'vue-socket.io'

const socket = new VueSocketIO({
	connection: 'http://localhost:3000/default',
	vuex: {
		store,
		actionPrefix: 'SOCKET_',
		options: {
			useConnectionNamespace: true
		}
	}
})

Vue.use(socket)
