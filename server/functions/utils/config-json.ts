import { S3 } from 'aws-sdk';
import { BUCKET_APPROVAL_PREFIX, BUCKET_NAME } from '../validate-assets/utils';

export interface ConfigJson {
	models: {
		[key: string]: {
			variants?: {
				[variant: string]: {
					carlineId: string;
					salesGroupId: string;
					trimName: string;
				};
			};
			config: {
				title: string;
				goldenRatioPositionOfCar: number;
				teaser: {
					backgroundImageFolder: string;
				};
			};
		};
	};
}

export async function fetchConfigJson(model: string): Promise<string> {
	const s3Client = new S3();

	const params: S3.GetObjectRequest = {
		Bucket: BUCKET_NAME,
		Key: `${BUCKET_APPROVAL_PREFIX}${model}/config.json`
	};

	try {
		const configJsonAsAwsObj = await s3Client.getObject(params).promise();
		return configJsonAsAwsObj.Body?.toString() || '';
	} catch (e: any) {
		throw new Error(e);
	}
}

export function parseConfigJson(jsonAsString: string): ConfigJson {
	try {
		return JSON.parse(jsonAsString);
	} catch (e: any) {
		throw new Error('Config.json is invalid json file');
	}
}
