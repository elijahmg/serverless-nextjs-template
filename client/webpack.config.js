const CopyWebpackPlugin = require('copy-webpack-plugin');
const nodeExternals = require('webpack-node-externals');

module.exports = {
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
	plugins: [
		new CopyWebpackPlugin({
			patterns: [
				{ from: '.next', to: '.next' },
				{ from: 'public', to: 'public' }
			]
		})
	],
	externals: [nodeExternals()]
};
