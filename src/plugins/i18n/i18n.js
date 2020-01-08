import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

function loadLocaleMessages() {
	const locales = require.context('@/plugins/i18n/locales', true, /[A-Za-z0-9-_,\s]+\.json$/i)
	const messages = {}
	locales.keys().forEach(key => {
		const matched = key.match(/([A-Za-z0-9-_]+)\./i)
		if (matched && matched.length > 1) {
			const locale = matched[1].includes('tr') ? 'tr' : matched[1].includes('en') ? 'en' : matched[1]
			messages[locale] = { ...messages[locale], ...locales(key) }
		}
	})
	return messages
}

export default new VueI18n({
	locale: localStorage.language || 'tr',
	fallbackLocale: localStorage.language || 'tr',
	messages: loadLocaleMessages()
})
