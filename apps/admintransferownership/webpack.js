const path = require('path');

module.exports = {
	entry: {
		'admin': path.join(__dirname, 'src', 'admin.js'),
	},
	output: {
		path: path.resolve(__dirname, './js/dist/'),
		publicPath: '/js/',
		filename: '[name].js',
		chunkFilename: 'files.[id].js'
	}
}