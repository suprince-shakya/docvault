import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

const api: AxiosInstance = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_URL,
	withCredentials: false,
});

// Attach token from localStorage before each request
api.interceptors.request.use((config) => {
	const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
	if (token && config.headers) {
		config.headers['Authorization'] = `Bearer ${token}`;
	}
	return config;
});

// Handle 401 errors (token expired or invalid)
api.interceptors.response.use(
	(response: AxiosResponse) => response,
	(error: AxiosError): Promise<any> => {
		if (error.response?.status === 401 && (error.response.data as any)?.message === 'TokenExpiredError') {
			console.warn('JWT expired. Logging out...');

			// Clear localStorage or any auth data
			localStorage.removeItem('token');

			// Redirect to login
			if (typeof window !== 'undefined') {
				window.location.href = '/login';
			}
		}

		return Promise.reject(error);
	}
);

export default api;
