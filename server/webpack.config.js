const nodeExternals = require('webpack-node-externals');
const slsw = require('serverless-webpack');

module.exports = {
	entry: slsw.lib.entries,
	mode: 'production',
	target: 'node',
	resolve: {
		extensions: ['.ts', '.js']
	},
	module: {
		rules: [
			{
				test: /\.ts?$/,
				exclude: /(node_modules)/,
				use: {
					loader: 'swc-loader',
					options: {
						jsc: {
							target: 'es2020',
							parser: {
								syntax: 'typescript'
							}
						}
					}
				}
			}
		]
	},
	externals: [nodeExternals()]
};
