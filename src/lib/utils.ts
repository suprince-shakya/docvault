import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function formatFileSize(bytes: number): string {
	if (bytes === 0) return '0 Bytes';

	const units = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
	const k = 1024;
	const i = Math.floor(Math.log(bytes) / Math.log(k));
	const size = bytes / Math.pow(k, i);

	return `${size.toFixed(1)} ${units[i]}`;
}

export const getFileType = (fileName: string) => {
	const extension = fileName.split('.').pop()?.toLowerCase();
	if (!extension) return { type: 'other', extension: '' };

	const documentExtensions = [
		'pdf',
		'doc',
		'docx',
		'txt',
		'xls',
		'xlsx',
		'csv',
		'ods',
		'md',
		'html',
		'htm',
		'epub',
		'pages',
		'fig',
		'psd',
		'ai',
		'indd',
		'xd',
		'sketch',
		'afdesign',
		'afphoto',
	];
	const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'svg'];
	const videoExtensions = ['mp4', 'avi', 'mov', 'mkv', 'webm'];
	const audioExtensions = ['mp3', 'wav', 'ogg', 'flac'];

	if (documentExtensions.includes(extension)) return { type: 'document', extension };
	if (imageExtensions.includes(extension)) return { type: 'image', extension };
	if (videoExtensions.includes(extension)) return { type: 'video', extension };
	if (audioExtensions.includes(extension)) return { type: 'audio', extension };

	return { type: 'other', extension };
};

export const getFileIcon = (extension: string | undefined, type: string) => {
	const ext = extension?.split('.')[1];
	switch (ext) {
		case 'pdf':
			return '/icons/file-pdf.svg';
		case 'doc':
			return '/icons/file-doc.svg';
		case 'docx':
			return '/icons/file-docx.svg';
		case 'csv':
			return '/icons/file-csv.svg';
		case 'txt':
			return '/icons/file-txt.svg';
		case 'xls':
		case 'xlsx':
			return '/icons/file-xls.svg';
		case 'svg':
			return '/icons/file-image.svg';
		case 'mkv':
		case 'mov':
		case 'avi':
		case 'wmv':
		case 'mp4':
		case 'flv':
		case 'webm':
		case 'm4v':
		case '3gp':
			return '/icons/file-video.svg';
		case 'mp3':
		case 'wav':
		case 'ogg':
		case 'flac':
			return '/icons/file-audio.svg';
		default:
			return '/icons/file-default.svg';
	}
};

export const getFileTypesParams = (type: string) => {
	switch (type) {
		case 'documents':
			return ['document'];
		case 'images':
			return ['image'];
		case 'media':
			return ['video', 'audio'];
		case 'others':
			return ['other'];
		default:
			return ['document'];
	}
};

export const constructDownloadUrl = (path: string) => {
	return `${window.location.origin}/api${path}`;
};
