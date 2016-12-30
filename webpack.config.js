let path = require('path');
let webpack = require('webpack');
// import webpack from "webpack";
import ExtractTextPlugin from "extract-text-webpack-plugin";

const port = process.env.PORT || 3000;

module.exports = {
	debug: false,
	devtool: 'inline-eval-cheap-source-map',

	entry: [
		`webpack-hot-middleware/client?path=http://localhost:${port}/__webpack_hmr`,
		'babel-polyfill',
		'./app'
	],
	output: {
		path: path.join(__dirname, 'dist'),
		filename: 'bundle.js',
		libraryTarget: 'commonjs2',
		publicPath: `http://localhost:${port}/dist/`
	},

	module: {
		loaders: [
			{
				test: /\.js|\.jsx?$/,
				exclude: /(node_modules|bower_components|orgdown-editor)/,
				loader: 'babel-loader',
				query: {
					presets: ['es2015', 'react', 'stage-0']
				}
			},
			{
				test: /\.global\.css$/,
				loaders: [
					'style-loader',
					'css-loader?sourceMap'
				]
			},

			{
				test: /^((?!\.global).)*\.css$/,
				loaders: [
					'style-loader',
					'css-loader?modules&sourceMap&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]'
				]
			},
			{test: /\.json/, loader: "json-loader"},
			{test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/font-woff'},
			{test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/font-woff'},
			{test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/octet-stream'},
			{test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file'},
			{test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=image/svg+xml'},
		]
	},

	plugins: [
		// Minify the output
		new webpack.optimize.UglifyJsPlugin({
			compressor: {
				warnings: false
			}
		}),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify('production')
		}),
		new ExtractTextPlugin('style.css', {allChunks: true})
	],

	target: 'electron-main',

	resolve: {
		extensions: ['', '.js', '.jsx', '.json'],
		packageMains: ['webpack', 'browser', 'web', 'browserify', ['jam', 'main'], 'main']
	},

	devServer: {
		hot: true,
		inline: true
	},

	node: {
		__dirname: false,
		__filename: false
	},
};