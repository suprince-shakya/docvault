import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.NEXT_PUBLIC_JWT_SECRET as string;

export function generateToken(userId: string) {
	return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '10h' });
}

export function verifyToken(token: string) {
	return jwt.verify(token, JWT_SECRET);
}
