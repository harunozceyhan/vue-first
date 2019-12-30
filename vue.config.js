module.exports = {
	configureWebpack: {
		devtool: 'source-map'
	},
	devServer: {
		proxy: 'http://dev.smartiys.io:8083/api/v1/'
	}
}
