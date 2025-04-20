'use client';

import type React from 'react';

import { useState } from 'react';
import { FileUp, Upload, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';
import { toast } from '@/hooks/use-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { uploadFiles } from '@/lib/api';

interface FileUploadDialogProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
}

export function FileUploadDialog({ open, onOpenChange }: FileUploadDialogProps) {
	const [files, setFiles] = useState<File[]>([]);
	const [uploading, setUploading] = useState(false);
	const [progress, setProgress] = useState(0);
	const upload = useMutation({
		mutationFn: ({ files }: { files: File[] }) =>
			uploadFiles({
				files,
				onProgress: (_, percent) => setProgress(percent),
			}),
	});
	const queryClient = useQueryClient();

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			const newFiles = Array.from(e.target.files);
			setFiles((prev) => [...prev, ...newFiles]);
		}
	};

	const removeFile = (index: number) => {
		setFiles((prev) => prev.filter((_, i) => i !== index));
	};

	const handleUpload = () => {
		if (files.length === 0) return;
		setUploading(true);
		setProgress(0);
		upload.mutate(
			{ files },
			{
				onError: (error) => {
					toast({
						title: 'Uh oh! Something went wrong.',
						description: error.message,
						variant: 'destructive',
					});
				},
				onSuccess: ({ data }) => {
					toast({
						title: 'Success',
						description: data.message,
					});
					queryClient.invalidateQueries({ queryKey: ['dashboard'] });
					queryClient.invalidateQueries({ queryKey: ['files'] });
					toast({
						title: 'Success',
						description: data.message,
					});
				},
				onSettled: () => {
					setUploading(false);
					onOpenChange(false);
					setProgress(0);
					setFiles([]);
				},
			}
		);
	};

	const handleDragOver = (e: React.DragEvent) => {
		e.preventDefault();
	};

	const handleDrop = (e: React.DragEvent) => {
		e.preventDefault();
		if (e.dataTransfer.files) {
			const newFiles = Array.from(e.dataTransfer.files);
			setFiles((prev) => [...prev, ...newFiles]);
		}
	};

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="sm:max-w-md dark:bg-secondary" onInteractOutside={(e) => e.preventDefault()} onEscapeKeyDown={(e) => e.preventDefault()}>
				<DialogHeader>
					<DialogTitle>Upload Files</DialogTitle>
					<DialogDescription>Upload files to your storage. Files will be categorized automatically.</DialogDescription>
				</DialogHeader>
				<DialogClose className="absolute right-4 top-4" onClick={(e)=>uploading?e.preventDefault():""}>x</DialogClose>
				<div className="grid w-full gap-4" onDragOver={handleDragOver} onDrop={handleDrop}>
					<div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8">
						<div className="flex flex-col items-center justify-center space-y-2 text-center">
							<div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
								<Upload className="h-6 w-6 text-primary" />
							</div>
							<div className="flex flex-col space-y-1">
								<p className="text-sm font-medium">Drag files here or click to upload</p>
								<p className="text-xs text-muted-foreground">Upload any type of file up to 100MB</p>
							</div>
							<Button variant="outline" size="sm" disabled={uploading} asChild>
								<label>
									<input type="file" className="sr-only" multiple onChange={handleFileChange} disabled={uploading} />
									Select Files
								</label>
							</Button>
						</div>
					</div>
					{files.length > 0 && (
						<div className="space-y-2">
							<p className="text-sm font-medium">Selected Files ({files.length})</p>
							<div className="max-h-40 overflow-y-auto rounded-lg border p-2">
								{files.map((file, index) => (
									<div key={index} className="flex items-center justify-between py-1">
										<div className="flex items-center space-x-2">
											<FileUp className="h-4 w-4 text-muted-foreground" />
											<span className="text-sm truncate max-w-[200px]">{file.name}</span>
											<span className="text-xs text-muted-foreground">{(file.size / 1024 / 1024).toFixed(2)} MB</span>
										</div>
										<Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => removeFile(index)} disabled={uploading}>
											<X className="h-4 w-4" />
											<span className="sr-only">Remove file</span>
										</Button>
									</div>
								))}
							</div>
						</div>
					)}
					{uploading && (
						<div className="space-y-2">
							<div className="flex items-center justify-between">
								<p className="text-sm font-medium">Uploading...</p>
								<p className="text-sm text-muted-foreground">{progress}%</p>
							</div>
							<Progress value={progress} />
						</div>
					)}
				</div>
				<DialogFooter className="sm:justify-between">
					<Button
						variant="outline"
						onClick={() => {
							setFiles([]);
							onOpenChange(false);
						}}
						disabled={uploading}
					>
						Cancel
					</Button>
					<Button onClick={handleUpload} disabled={files.length === 0 || uploading}>
						{uploading ? 'Uploading...' : 'Upload'}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
