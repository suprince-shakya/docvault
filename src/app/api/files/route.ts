import { verifyToken } from '@/lib/auth';
import dbConnect from '@/lib/dbConnect';
import File, { Status } from '@/models/File';
import { NextRequest, NextResponse } from 'next/server';
export async function GET(req: NextRequest) {
	await dbConnect();
	const { searchParams } = new URL(req.url);
	const authHeader = req.headers.get('authorization');
	if (!authHeader) return NextResponse.json({ error: true, messege: 'Unauthorized' }, { status: 401 });
	let tokenData: any;
	try {
		tokenData = verifyToken(authHeader.split(' ')[1]);
	} catch (err: any) {
		return NextResponse.json({ error: true, message: err.name }, { status: 401 });
	}

	const type: any[] = [];
	const searchType = searchParams.get('type');
	if (searchType === 'video,audio') {
		type.push('audio');
		type.push('video');
	} else {
		type.push(searchType);
	}
	try {
		const data = await File.find({
			userId: tokenData.userId,
			status: Status.UPLOAD,
			type: type,
		});
		return NextResponse.json({ message: 'Files fetched successfully', data }, { status: 200 });
	} catch (error) {
		console.error('Error:', error);
		return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
	}
}
