import { S3 } from 'aws-sdk';
import { copyAsset } from './copy-asset';
import { BUCKET_NAME, BUCKET_PROD_PREFIX } from './utils';

type StatusCode = 200 | 400;

function createPromiseCall(key: string) {
	return new Promise(async resolve => {
		await copyAsset({
			destinationBucket: BUCKET_NAME,
			sourceBucket: BUCKET_NAME,
			sourcePath: key,
			destinationPath: BUCKET_PROD_PREFIX
		});

		resolve({});
	});
}

/**
 *
 * @param bucketName
 * @param bucketPrefix
 * @param NextContinuationToken
 *
 * @return statusCode
 */
export async function copyAllAssets(
	bucketName: string,
	bucketPrefix: string,
	NextContinuationToken?: S3.NextToken
): Promise<StatusCode> {
	const params: S3.ListObjectsV2Request = {
		Bucket: bucketName,
		Prefix: bucketPrefix,
		ContinuationToken: NextContinuationToken
	};
	const s3 = new S3();

	try {
		const object = await s3.listObjectsV2(params).promise();

		const promises = [];

		for (const content of object.Contents!) {
			promises.push(createPromiseCall(content.Key!));
		}

		await Promise.allSettled(promises);

		// listObjectsV2 in one call returns only 1000 objects
		// We need to pass NextContinuationToken to get next 1000 objects
		// IsTruncated shows if another batch of 1000 objects exists
		if (object.IsTruncated) {
			await copyAllAssets(bucketName, bucketPrefix, object.NextContinuationToken);
		}

		return 200;
	} catch (error) {
		// eslint-disable-next-line no-console
		console.log({ error });
		return 400;
	}
}
