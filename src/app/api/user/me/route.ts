import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import User from '@/models/User';
import { verifyToken } from '@/lib/auth';

export async function GET(req: NextRequest) {
	await dbConnect();
	const authHeader = req.headers.get('authorization');
	if (!authHeader) return NextResponse.json({ error: true, message: 'TokenExpiredError' }, { status: 401 });

	let tokenData: any;
	try {
		tokenData = verifyToken(authHeader.split(' ')[1]);
	} catch (err: any) {
		return NextResponse.json({ error: true, message: err.name }, { status: 401 });
	}

	const user = await User.findById(tokenData.userId).select('-password');

	if (!user) {
		return NextResponse.json({ error: true, message: 'User not found' }, { status: 400 });
	}
	return NextResponse.json({ message: 'User fetched successfully', data: user }, { status: 200 });
}
