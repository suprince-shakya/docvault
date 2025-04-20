import { verifyToken } from '@/lib/auth';
import dbConnect from '@/lib/dbConnect';
import { saveFile } from '@/lib/files';
import { getFileType } from '@/lib/utils';
import File, { IFile } from '@/models/File';
import User from '@/models/User';
import { NextRequest, NextResponse } from 'next/server';
import path from 'path';

export async function POST(req: NextRequest) {
	await dbConnect();
	const formData = await req.formData();
	const authHeader = req.headers.get('authorization');
	if (!authHeader) return NextResponse.json({ error: true, messege: 'Unauthorized' }, { status: 401 });

	let tokenData: any;
	try {
		tokenData = verifyToken(authHeader.split(' ')[1]);
	} catch (err: any) {
		return NextResponse.json({ error: true, message: err.name }, { status: 401 });
	}
	try {
		const files = formData.getAll('files') as File[];

		if (!files || files.length === 0) {
			return NextResponse.json({ error: true, message: 'No files received' }, { status: 400 });
		}

		const user = await User.findById(tokenData.userId);

		if (!user) {
			return NextResponse.json({ error: true, message: 'User not found' }, { status: 400 });
		}

		const uploadFileSize = files.reduce((size, file) => (size += file.size), 0);
		if (user.used * 1024 * 1024 + uploadFileSize <= user.limit * 1024 * 1024) {
			for (const file of files) {
				const filePath = await saveFile(file, `${tokenData.userId}`);
				const data: IFile = {
					title: file.name,
					filename: file.name,
					path: filePath,
					size: file.size,
					extension: path.extname(file.name),
					userId: tokenData.userId,
					type: getFileType(file.name).type,
				};
				await File.create(data);
			}
			const fileSize = (uploadFileSize / (1024 * 1024)).toFixed(2);
			const sizeUsed = Number((user.used + parseFloat(fileSize)).toFixed(2));

			user.used = sizeUsed;
			await user.save();
			return NextResponse.json({ message: 'Files uploaded successfully' }, { status: 201 });
		} else {
			return NextResponse.json({ error: true, message: "Couldn't Upload.You have reached your limit" }, { status: 400 });
		}
	} catch (error) {
		console.error('Error:', error);
		return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
	}
}
