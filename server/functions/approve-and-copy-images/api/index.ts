import { Lambda } from 'aws-sdk';
import { APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda';
import { InvocationRequest } from 'aws-sdk/clients/lambda';

// Only serves as an endpoint to hit another lambda
export async function approveAndCopyImagesApi(event: APIGatewayEvent): Promise<APIGatewayProxyResult> {
	const model = event.pathParameters!.model;

	// For local development as an argument { endpoint: '${endpoint_which_is_given_by_serverless}'}
	// Usually endpoint is http://localhost:3002
	const lambda = new Lambda({});

	const payload = JSON.stringify({ model });

	const lambdaParams: InvocationRequest = {
		FunctionName: 'CopyFilesFunction',
		InvocationType: 'Event',
		Payload: payload
	};

	return new Promise(resolve => {
		lambda.invoke(lambdaParams, err => {
			if (err) {
				console.log('ERROR of invocation', err);

				resolve({
					statusCode: 500,
					body: JSON.stringify({ status: 'Failed' })
				});
			}

			resolve({
				statusCode: 200,
				body: JSON.stringify({ status: 'Processing...' })
			});
		});
	});
}

export default {
	handler: `./functions/approve-and-copy-images/api/index.approveAndCopyImagesApi`,
	memorySize: 1024,
	timeout: 30,
	events: [
		{
			httpApi: {
				method: 'get',
				path: '/api/approveAndCopy/{model}',
				authorizer: {
					name: 'jwtVerifier'
				}
			}
		}
	]
};
