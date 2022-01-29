import { S3 } from 'aws-sdk';

interface CopyAssetsInput {
	destinationPath: string;
	sourceBucket: string;
	sourcePath: string;
	destinationBucket: string;
}

export async function copyAsset({ destinationBucket, destinationPath, sourceBucket, sourcePath }: CopyAssetsInput) {
	const s3client = new S3();

	// imagePath.Key = assets-approval/resolution/color/trim/image.extension
	const imageSubPath = sourcePath.substring(sourcePath.indexOf('/')); // It will remove assets-approval part from the string
	const key = `${destinationPath}${imageSubPath}`;
	const copySource = `${sourceBucket}/${sourcePath}`;

	const copyObjectInput: S3.CopyObjectRequest = {
		Bucket: destinationBucket,
		Key: key,
		CopySource: copySource
	};

	await s3client.copyObject(copyObjectInput).promise();
}
