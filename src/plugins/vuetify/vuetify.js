import 'material-design-icons-iconfont/dist/material-design-icons.css' // Ensure you are using css-loader
import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader
import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import themes from './theme'
import en from 'vuetify/es5/locale/en'
import tr from 'vuetify/es5/locale/tr'

Vue.use(Vuetify)

const opts = {
	icons: {
		iconfont: 'mdi'
	},
	theme: {
		themes
	},
	lang: {
		locales: { tr, en },
		current: 'tr'
	}
}

export default new Vuetify(opts)
