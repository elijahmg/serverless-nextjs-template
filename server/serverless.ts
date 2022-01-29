import { AWS } from '@serverless/typescript';
import approveAndCopyImagesApi from './functions/approve-and-copy-images/api';
import approveAndCopyImagesHandler from './functions/approve-and-copy-images/handler';
import jwtVerifier from './functions/jwt-verifier';
import { server } from './layer';

const serverlessConfiguration: AWS = {
	service: 'models-dashboard-server',
	frameworkVersion: '2',
	plugins: ['serverless-webpack', 'serverless-domain-manager', 'serverless-offline'],
	provider: {
		iam: {
			role: 'function role'
		},
		stage: 'prod',
		region: 'eu-central-1',
		name: 'aws',
		runtime: 'nodejs14.x',
		lambdaHashingVersion: '20201221',
		httpApi: {
			authorizers: {
				jwtVerifier: {
					type: 'request',
					functionName: 'jwtVerifier',
					identitySource: '$request.header.Authorization'
				}
			},
			cors: {
				allowedMethods: ['GET'],
				allowedHeaders: ['Content-Type', 'Authorization'],
				allowedOrigins: ['http://localhost:3000'],
				allowCredentials: true
			}
		}
	},
	layers: {
		server
	},
	functions: {
		jwtVerifier,
		approveAndCopyImagesApi,
		approveAndCopyImagesHandler,
	},
	package: { individually: true },
	custom: {
		webpack: {
			webpackConfig: 'webpack.config.js',
			includeModules: false
		},
		customDomain: {
			http: {
				domainName: 'domainName',
				basePath: '',
				certificateName: 'certificateName',
				createRoute53Record: true,
				endpointType: 'regional',
				securityPolicy: 'tls_1_2',
				autoDomain: false
			}
		},
		'serverless-offline': {
			httpPort: '8888',
			ignoreJWTSignature: true
		}
	}
};

module.exports = serverlessConfiguration;
