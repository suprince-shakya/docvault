import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import User from '@/models/User';
import bcrypt from 'bcryptjs';
import { generateToken } from '@/lib/auth';

export async function POST(req: NextRequest) {
	await dbConnect();
	const data = await req.json();

	const user = await User.findOne({ email: data.email });
	if (!user) return NextResponse.json({ error: true, message: 'Invalid credentials' }, { status: 401 });

	const isValid = await bcrypt.compare(data.password, user.password);
	if (!isValid) return NextResponse.json({ error: true, message: 'Invalid credentials' }, { status: 401 });

	const token = generateToken(user._id as string);
	return NextResponse.json({ data: { token }, message: 'Login successfully' });
}
