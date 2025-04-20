import { verifyToken } from '@/lib/auth';
import dbConnect from '@/lib/dbConnect';
import { formatFileSize } from '@/lib/utils';
import File, { Status, Type } from '@/models/File';
import User from '@/models/User';
import { NextRequest, NextResponse } from 'next/server';
export async function GET(req: NextRequest) {
	await dbConnect();
	const authHeader = req.headers.get('authorization');
	if (!authHeader) return NextResponse.json({ error: true, messege: 'Unauthorized' }, { status: 401 });

	let tokenData: any;
	try {
		tokenData = verifyToken(authHeader.split(' ')[1]);
	} catch (err: any) {
		return NextResponse.json({ error: true, message: err.name }, { status: 401 });
	}
	try {
		const user = await User.findById(tokenData.userId);

		if (!user) {
			return NextResponse.json({ error: true, message: 'User not found' }, { status: 400 });
		}

		const totalDocumentSize = await File.aggregate([
			{
				$match: {
					userId: tokenData.userId,
					status: Status.UPLOAD,
					type: Type.DOCUMENT,
				},
			},
			{
				$group: {
					_id: null,
					totalSize: { $sum: '$size' },
				},
			},
		]);

		const totalImagesSize = await File.aggregate([
			{
				$match: {
					userId: tokenData.userId,
					status: Status.UPLOAD,
					type: Type.IMAGE,
				},
			},
			{
				$group: {
					_id: null,
					totalSize: { $sum: '$size' },
				},
			},
		]);
		const totalAudioVideoSize = await File.aggregate([
			{
				$match: {
					userId: tokenData.userId,
					status: Status.UPLOAD,
					type: {
						$in: [Type.AUDIO, Type.VIDEO],
					},
				},
			},
			{
				$group: {
					_id: null,
					totalSize: { $sum: '$size' },
				},
			},
		]);

		const totalOtherSize = await File.aggregate([
			{
				$match: {
					userId: tokenData.userId,
					status: Status.UPLOAD,
					type: Type.OTHER,
				},
			},
			{
				$group: {
					_id: null,
					totalSize: { $sum: '$size' },
				},
			},
		]);

		const data = {
			availableStorage: {
				spaceUsed: user.used,
				total: user.limit,
				percentUsed: Number(((user.used / user.limit) * 100).toFixed()),
			},
			document: {
				spaceUsed: formatFileSize(totalDocumentSize[0]?.totalSize || 0),
				lastUpdate: new Date().toISOString(),
			},
			image: {
				spaceUsed: formatFileSize(totalImagesSize[0]?.totalSize || 0),
				lastUpdate: new Date().toISOString(),
			},
			audioVideo: {
				spaceUsed: formatFileSize(totalAudioVideoSize[0]?.totalSize || 0),
				lastUpdate: new Date().toISOString(),
			},
			other: {
				spaceUsed: formatFileSize(totalOtherSize[0]?.totalSize || 0),
				lastUpdate: new Date().toISOString(),
			},
		};
		return NextResponse.json({ message: 'Dashboard fetched successfully', data }, { status: 200 });
	} catch (error) {
		console.error('Error:', error);
		return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
	}
}
