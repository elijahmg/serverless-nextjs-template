import { AwsLambdaRuntime } from '@serverless/typescript';

export const nextServerless = {
	path: `./next-server/deps`,
	compatibleRuntimes: ['nodejs14.x' as AwsLambdaRuntime]
};
