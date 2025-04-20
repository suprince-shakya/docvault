import path from 'path';
import * as fs from 'fs';

// ✅ Save image to disk
export const saveFile = async (file: File, folder: string) => {
	const buffer = Buffer.from(await file.arrayBuffer());
	const uploadPath = path.join(process.cwd(), 'uploads', folder);
	if (!fs.existsSync(uploadPath)) fs.mkdirSync(uploadPath, { recursive: true });

	const fileName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${path.extname(file.name)}`;
	const filePath = path.join(uploadPath, fileName);
	fs.writeFileSync(filePath, buffer);

	return `/uploads/${folder}/${fileName}`;
};

export const deleteFile = async (filePath: string) => {
	const uploadPath = path.join(process.cwd(), filePath);
	console.log(uploadPath);
	fs.rmSync(uploadPath);
};
