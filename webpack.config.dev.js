const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const postcss_flexbugs_fixes = require('postcss-flexbugs-fixes');
const postcss_preset_env = require('postcss-preset-env');
const autoprefixer = require('autoprefixer');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
	mode: 'development',
	entry: __dirname + '/src/index.js',
	output: {
		filename: 'bundle-[hash].js',
		path: __dirname + '/build'
	},
	devtool: 'eval-source-map',
	module: {
		rules: [
			{
				test: /(\.jsx|\.js)$/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: [
							"@babel/preset-env","@babel/preset-react"
						]
					}
				},
				include: path.resolve(__dirname, 'src'),
				exclude: path.resolve(__dirname, 'src/styles')
			},
			{
				test: /\.css$/,
				use: [
					'style-loader',
					{
						loader: 'css-loader',
						options: {
							modules: true,
							localIdentName: '[path][name]__[local]--[hash:base64:5]'
						}
					},
					{
						loader: 'postcss-loader',
						options: {
							ident: 'postcss',
							plugins: () => [
								autoprefixer
							]
						}
					}
				],
				exclude: /\.module\.css$/
			},
			{
				test: /\.module\.css$/,
				use: [
					'style-loader',
					{
						loader: 'css-loader',
						options: {
							importLoaders: 1,
              modules: true
						}
					},
					{
						loader: 'postcss-loader',
						options: {
							plugins: () => [
								postcss_flexbugs_fixes,
								postcss_preset_env({
									autoprefixer: {
										flexbox: 'no-2009'
									},
									stage: 3
								})
							]
						}
					}
				]
			}
		]
	},
	plugins: [
		new webpack.BannerPlugin({banner: "版权所有，翻版必究"}),
		new webpack.HotModuleReplacementPlugin(),
		new HtmlWebpackPlugin({
			inject: true,
			template: __dirname + '/public/index.html'
		}),
		new CleanWebpackPlugin('dist/*.*', {
			root: __dirname,
			verbose: true,
			dry: false
		}),
		new UglifyJsPlugin()
	]
}
