const path = require('path')
const {merge} = require('webpack-merge')


module.exports = {
	entry: {
		'plugin': path.join(__dirname, 'src', 'plugin.js'),
		'tabview': path.join(__dirname, 'src', 'tabview.js'),
		'sharedfile': path.join(__dirname, 'src', 'sharedfile.js'),
	},
	output: {
		path: path.resolve(__dirname, './js/dist'),
		publicPath: '/js/',
		filename: '[name].js',
		chunkFilename: '[name].[chunkhash].js'
	},
	module: {
		rules: [
			{
				test: /\.(js|vue)$/,
				exclude: /node_modules/,
				use: 'eslint-loader',
				enforce: 'pre'
			},
			{
				test: /\.css$/,
				use: [
					'style-loader',
					'css-loader'
				]
			},
			{
				test: /\.scss$/,
				use: [
					'style-loader',
					'css-loader',
					'sass-loader'
				]
			},
			{
				test: /\.vue$/,
				loader: 'vue-loader'
			},
			{
				test: /\.js$/,
				loader: 'babel-loader',
				exclude: /node_modules/
			},
			{
				test: /\.tsx?$/,
				use: ['babel-loader', 'ts-loader'],
				exclude: /node_modules/
			},
			{
				test: /\.(png|jpg|gif|svg)$/,
				loader: 'url-loader'
			}
		]
	},
	resolve: {
		alias: {
			vue$: 'vue/dist/vue.esm.js'
		},
		extensions: ['*', '.js', '.vue', '.json', '.tsx']
	}
};
