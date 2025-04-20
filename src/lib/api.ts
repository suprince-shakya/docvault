import api from './axios';

type UploadFileParams = {
	files: File[];
	onProgress?: (fileIndex: number, percent: number) => void;
};

export const loginUser = async ({ email, password }: { email: string; password: string }) => {
	return await api.post('/api/auth/login', {
		email,
		password,
	});
};

export const getDashboard = async () => {
	const { data } = await api.get('/api/dashboard');
	return data;
};

export const getProfile = async () => {
	return await api.get('/api/user/me');
};

export const getFiles = async (queryKey: string[]) => {
	const { data } = await api.get(`/api/files?type=${queryKey}`);
	return data;
};

export const getArchiveFiles = async () => {
	const { data } = await api.get(`/api/files/archive`);
	return data;
};

export const getTrashFiles = async () => {
	const { data } = await api.get(`/api/files/trash`);
	return data;
};

export const archiveFile = async (fileid: string) => {
	const { data } = await api.get(`/api/files/${fileid}/archive`);
	return data;
};

export const moveToTrashFile = async (fileid: string) => {
	const { data } = await api.get(`/api/files/${fileid}/trash`);
	return data;
};

export const permanentlyDeleteFile = async (fileid: string) => {
	const { data } = await api.get(`/api/files/${fileid}/delete`);
	return data;
};

export const restoreFile = async (fileid: string) => {
	const { data } = await api.get(`/api/files/${fileid}/restore`);
	return data;
};

export const uploadFiles = async ({ files, onProgress }: UploadFileParams) => {
	const formData = new FormData();
	for (const file of files) {
		formData.append('files', file);
	}

	return await api.post('/api/upload', formData, {
		headers: {
			'content-type': 'multipart/form-data',
		},
		onUploadProgress: (event) => {
			if (event.total && onProgress) {
				const percent = Math.round((event.loaded * 100) / event.total);
				onProgress(0, percent);
			}
		},
	});
};
