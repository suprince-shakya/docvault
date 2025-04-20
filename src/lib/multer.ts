import multer from 'multer';

const storage = multer.memoryStorage(); // ✅ Store file in memory (RAM)

const upload = multer({
	storage,
});

export { upload };
