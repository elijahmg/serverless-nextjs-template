import axios, { AxiosInstance } from 'axios';
import JWT from './jwt';

const LOCAL_API_URL = 'http://localhost:8888/api';

interface ApiResponse<T> {
	data: T;
	status: number;
}

class Api {
	private instance: AxiosInstance;

	constructor() {
		this.instance = axios.create({
			baseURL: LOCAL_API_URL,
			headers: {
				Authorization: `Bearer ${JWT.sing({ user: 'next-client' })}`
			}
		});
	}

	async get<T>(url: string) {
		return await this.instance.get<T, ApiResponse<T>>(url);
	}

	async post<T>(url: string, data: T) {
		return await this.instance.post(url, data);
	}
}

export default new Api();
