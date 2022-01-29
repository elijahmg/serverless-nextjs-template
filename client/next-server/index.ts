export default {
	handler: `./next-server/server.handler`,
	memorySize: 1024,
	layers: [{ Ref: 'NextServerlessLambdaLayer' }],
	environment: {
		NEXT_PUBLIC_JWT_MODEL_DASHBOARD_SECRET: '${env:NEXT_PUBLIC_JWT_MODEL_DASHBOARD_SECRET}'
	},
	events: [
		{
			httpApi: 'ANY /'
		},
		{
			httpApi: 'ANY /{proxy+}'
		}
	]
};
