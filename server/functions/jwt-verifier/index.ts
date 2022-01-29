import { verify, JwtPayload } from 'jsonwebtoken';

function generateAuthResponse(principalId, effect, methodArn) {
	const policyDocument = generatePolicyDocument(effect, methodArn);

	return {
		principalId,
		policyDocument
	};
}

function generatePolicyDocument(effect, methodArn) {
	if (!effect || !methodArn) return null;

	return {
		Version: '2012-10-17',
		Statement: [
			{
				Action: 'execute-api:Invoke',
				Effect: effect,
				Resource: methodArn
			}
		]
	};
}

export const handler = (event: any, context: any, callback: any) => {
	const token = event.identitySource?.[0].replace('Bearer ', '');
	const methodArn = event.routeArn;
	// Only local
	// const token = event.authorizationToken?.replace('Bearer ', '');
	// const methodArn = event.methodArn;

	if (!token || !methodArn) {
		return callback(null, generateAuthResponse('next-server', 'Deny', methodArn));
	}

	try {
		const jwt_secret = Buffer.from(process.env.NEXT_PUBLIC_JWT_MODEL_DASHBOARD_SECRET as string, 'base64');
		const payload = verify(token, jwt_secret) as JwtPayload;

		if (payload.user === 'next-client') {
			return callback(null, generateAuthResponse('next-server', 'Allow', methodArn));
		}
	} catch (e: any) {
		console.log(e.message);
		return callback(null, generateAuthResponse('next-server', 'Deny', methodArn));
	}
};

export default {
	handler: `./functions/jwt-verifier/index.handler`,
	layers: [{ Ref: 'ServerLambdaLayer' }],
	environment: {
		NEXT_PUBLIC_JWT_MODEL_DASHBOARD_SECRET: '${env:NEXT_PUBLIC_JWT_MODEL_DASHBOARD_SECRET}'
	},
	memorySize: 1024
};
