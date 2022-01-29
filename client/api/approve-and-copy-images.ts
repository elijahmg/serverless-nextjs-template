import api from '../utils/api';

interface ApproveAndCopyImagesBody {
	status: string;
}

export interface ApproveAndCopyImagesResponse {
	status: string;
	statusCode: number;
}

async function approveAndCopyImages(model: string): Promise<ApproveAndCopyImagesResponse> {
	const res = await api.get<ApproveAndCopyImagesBody>(`/approveAndCopy/${model}`);

	return { statusCode: res.status, status: res.data.status };
}

export default approveAndCopyImages;
