import { AWS } from '@serverless/typescript';
import serverHandler from './next-server';
import { nextServerless } from './next-server/layer';

const serverlessConfiguration: AWS = {
	service: 'models-dashboard-client',
	frameworkVersion: '2',
	plugins: ['serverless-webpack'],
	provider: {
		iam: {
			role: 'function_role'
		},
		stage: 'prod',
		region: 'eu-central-1',
		name: 'aws',
		runtime: 'nodejs14.x',
		lambdaHashingVersion: '20201221',
		httpApi: {
			cors: {
				allowedOrigins: ['http://localhost:3000']
			}
		}
	},
	layers: {
		nextServerless
	},
	functions: {
		serverHandler
	},
	package: { individually: true },
	custom: {
		webpack: {
			webpackConfig: 'webpack.config.js',
			includeModules: false
		}
	}
};

module.exports = serverlessConfiguration;
