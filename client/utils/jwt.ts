import { sign } from 'jsonwebtoken';

const JWT = {
	sing(payload: Record<string, unknown>) {
		if (!process.env.NEXT_PUBLIC_JWT_MODEL_DASHBOARD_SECRET) {
			throw new Error('JWT_MODEL_DASHBOARD_SECRET has not found');
		}
		const jwt_secret = Buffer.from(process.env.NEXT_PUBLIC_JWT_MODEL_DASHBOARD_SECRET as string, 'base64');

		return sign(payload, jwt_secret);
	}
};

export default JWT;
