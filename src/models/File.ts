import mongoose, { Schema, Model } from 'mongoose';

export interface IFile {
	title: string;
	filename: string;
	path: string;
	size: number;
	extension: string;
	userId: string;
	status?: string;
	type: string;
}

export enum Status {
	UPLOAD = 'upload',
	ARCHIVE = 'archive',
	TRASH = 'trash',
}

export enum Type {
	DOCUMENT = 'document',
	IMAGE = 'image',
	VIDEO = 'video',
	AUDIO = 'audio',
	OTHER = 'other',
}

const FileSchema: Schema<IFile> = new mongoose.Schema(
	{
		title: { type: String },
		filename: { type: String, required: true },
		path: { type: String, required: true },
		size: { type: Number, required: true },
		extension: { type: String, required: true },
		userId: { type: String, required: true },
		status: { type: String, enum: Object.values(Status), default: Status.UPLOAD },
		type: { type: String, enum: Object.values(Type) },
	},
	{ timestamps: true }
);

const File: Model<IFile> = mongoose.models.File || mongoose.model<IFile>('File', FileSchema);

export default File;
