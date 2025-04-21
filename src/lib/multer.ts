import multer from 'multer';

const storage = multer.memoryStorage(); // ✅ Store file in memory (RAM)

const upload = multer({
	storage,
	limits: {
		fileSize: 5 * 1024 * 1024 * 1024, // 5GB
	},
});

const multerUpload = upload.array('files');

export { upload, multerUpload };
