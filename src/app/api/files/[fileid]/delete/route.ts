import { verifyToken } from '@/lib/auth';
import dbConnect from '@/lib/dbConnect';
import { deleteFile } from '@/lib/files';
import File from '@/models/File';
import User from '@/models/User';
import { NextRequest, NextResponse } from 'next/server';
export async function GET(req: NextRequest, { params }: { params: Promise<{ fileid: string }> }) {
	await dbConnect();
	const authHeader = req.headers.get('authorization');
	if (!authHeader) return NextResponse.json({ error: true, messege: 'Unauthorized' }, { status: 401 });
	let tokenData: any;
	try {
		tokenData = verifyToken(authHeader.split(' ')[1]);
	} catch (err: any) {
		return NextResponse.json({ error: true, message: err.name }, { status: 401 });
	}

	const user = await User.findById(tokenData.userId);
	if (!user) {
		return NextResponse.json({ error: true, message: 'User not found' }, { status: 400 });
	}

	const { fileid } = await params;
	const data = await File.findById(fileid);
	if (!data) return NextResponse.json({ error: true, message: 'No file found' }, { status: 404 });

	deleteFile(data.path);
	await data.deleteOne();
	const fileSize = (data.size / (1024 * 1024)).toFixed(2);
	const totalUsed = Number((user.used - parseFloat(fileSize)).toFixed(2));

	user.used = totalUsed < 0 ? 0 : totalUsed;
	await user.save();

	return NextResponse.json({ message: 'File deleted successfully', data }, { status: 200 });
}
