import { Context } from 'aws-lambda';
import { copyAllAssets } from '../copy-all-assets';
import { BUCKET_APPROVAL_PREFIX, BUCKET_NAME } from '../utils';

interface Event {
	model: string;
	NextContinuationToken?: string;
}

export async function approveAndCopyImagesHandler(event: Event, context: Context) {
	const { model } = event;

	console.log('Start processing...', `${BUCKET_NAME}/${BUCKET_APPROVAL_PREFIX}${model}/`);
	const statusCode = await copyAllAssets(BUCKET_NAME, `${BUCKET_APPROVAL_PREFIX}${model}/`);
	console.log({ statusCode });

	context.done();
}

export default {
	handler: `./functions/approve-and-copy-images/handler/index.approveAndCopyImagesHandler`,
	name: 'CopyFilesFunction',
	memorySize: 2048,
	timeout: 900
};
