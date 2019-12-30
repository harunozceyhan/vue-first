module.exports = {
	configureWebpack: {
		devtool: 'source-map'
	},
	// fix: sockjs connection timeout
	devServer: {
		host: 'localhost'
	}
}
