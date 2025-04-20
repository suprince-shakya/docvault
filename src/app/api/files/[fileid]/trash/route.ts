import { verifyToken } from '@/lib/auth';
import dbConnect from '@/lib/dbConnect';
import File, { Status } from '@/models/File';
import { NextRequest, NextResponse } from 'next/server';
export async function GET(req: NextRequest, { params }: { params: Promise<{ fileid: string }> }) {
	await dbConnect();
	const authHeader = req.headers.get('authorization');
	if (!authHeader) return NextResponse.json({ error: true, messege: 'Unauthorized' }, { status: 401 });
	try {
		verifyToken(authHeader.split(' ')[1]);
	} catch (err: any) {
		return NextResponse.json({ error: true, message: err.name }, { status: 401 });
	}

	const { fileid } = await params;
	const data = await File.findById(fileid);
	if (!data) return NextResponse.json({ error: true, message: 'No file found' }, { status: 404 });

	data.status = Status.TRASH;
	await data.save();
	return NextResponse.json({ message: 'File moved to trash successfully', data }, { status: 200 });
}
