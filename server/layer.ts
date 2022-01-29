import { AwsLambdaRuntime } from '@serverless/typescript';

export const server = {
	path: `./deps`,
	compatibleRuntimes: ['nodejs14.x' as AwsLambdaRuntime]
};
