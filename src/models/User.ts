import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IUser extends Document {
	name: string;
	email: string;
	password: string;
	status: boolean;
	role: string;
	limit: number;
	used: number;
}

const UserSchema: Schema<IUser> = new mongoose.Schema(
	{
		name: { type: String, required: true },
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true },
		role: { type: String, required: true, default: 'User' },
		status: {
			type: Boolean,
			default: false,
		},
		limit: {
			type: Number,
		},
		used: {
			type: Number,
			required: true,
			default: 0,
		},
	},
	{ timestamps: true }
);

const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

export default User;
