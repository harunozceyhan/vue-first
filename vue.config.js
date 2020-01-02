module.exports = {
	configureWebpack: {
		devtool: 'source-map'
	},

	// fix: sockjs connection timeout
	devServer: {
		host: 'localhost',
		port: 8081
	},

	pages: {
		app: {
			entry: 'src/main.js',
			template: 'public/index.html',
			filename: 'index.html',
			excludeChunks: ['silent-renew-oidc']
		},
		silentrenewoidc: {
			entry: 'src/plugins/oidc/silent-renew-oidc.js',
			template: 'public/silent-renew-oidc.html',
			filename: 'silent-renew-oidc.html',
			excludeChunks: ['app']
		}
	},

	chainWebpack: config => {
		config.module
			.rule('i18n')
			.resourceQuery(/blockType=i18n/)
			.type('javascript/auto')
			.use('i18n')
			.loader('@kazupon/vue-i18n-loader')
			.end()
			.use('yaml')
			.loader('yaml-loader')
			.end()
	},

	pluginOptions: {
		i18n: {
			locale: 'tr',
			fallbackLocale: 'tr',
			enableInSFC: true
		}
	}
}
