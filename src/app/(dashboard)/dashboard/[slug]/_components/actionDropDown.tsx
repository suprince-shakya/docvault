import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { MoreVertical } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { constructDownloadUrl } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { archiveFile, moveToTrashFile, permanentlyDeleteFile, restoreFile } from '@/lib/api';
import { toast } from '@/hooks/use-toast';
import { ActionType } from '@/lib/dropdownItems';

const ActionDropDown = ({ file, actionsDropdownItems }: { file: any; actionsDropdownItems: ActionType[] }) => {
	const [action, setAction] = useState<ActionType | null>(null);
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const [name, setName] = useState(file.name);
	const archive = useMutation({ mutationFn: archiveFile });
	const trash = useMutation({ mutationFn: moveToTrashFile });
	const destroy = useMutation({ mutationFn: permanentlyDeleteFile });
	const restore = useMutation({ mutationFn: restoreFile });
	const queryClient = useQueryClient();

	const closeAllModals = () => {
		setIsModalOpen(false);
		setAction(null);
		setName(file.name);
	};

	const handleAction = async () => {
		const actions = {
			archive: () => {
				archive.mutate(file._id, {
					onSuccess: (data) => {
						toast({
							title: 'Success',
							description: data.message,
						});
						queryClient.invalidateQueries({ queryKey: ['files'] });
						queryClient.invalidateQueries({ queryKey: ['archive'] });
						closeAllModals();
					},
					onError: (error) => {
						toast({
							title: 'Uh oh! Something went wrong.',
							description: error.message,
							variant: 'destructive',
						});
					},
				});
			},
			trash: () => {
				trash.mutate(file._id, {
					onSuccess: (data) => {
						toast({
							title: 'Success',
							description: data.message,
						});
						queryClient.invalidateQueries({ queryKey: ['files'] });
						queryClient.invalidateQueries({ queryKey: ['trash'] });
						queryClient.invalidateQueries({ queryKey: ['archive'] });
						closeAllModals();
					},
					onError: (error) => {
						toast({
							title: 'Uh oh! Something went wrong.',
							description: error.message,
							variant: 'destructive',
						});
					},
				});
			},
			delete: () => {
				destroy.mutate(file._id, {
					onSuccess: (data) => {
						toast({
							title: 'Success',
							description: data.message,
						});
						queryClient.invalidateQueries({ queryKey: ['files'] });
						queryClient.invalidateQueries({ queryKey: ['trash'] });
						queryClient.invalidateQueries({ queryKey: ['dashboard'] });
						closeAllModals();
					},
					onError: (error) => {
						toast({
							title: 'Uh oh! Something went wrong.',
							description: error.message,
							variant: 'destructive',
						});
					},
				});
			},
			restore: () => {
				restore.mutate(file._id, {
					onSuccess: (data) => {
						toast({
							title: 'Success',
							description: data.message,
						});
						queryClient.invalidateQueries({ queryKey: ['files'] });
						queryClient.invalidateQueries({ queryKey: ['trash'] });
						queryClient.invalidateQueries({ queryKey: ['archive'] });
						closeAllModals();
					},
					onError: (error) => {
						toast({
							title: 'Uh oh! Something went wrong.',
							description: error.message,
							variant: 'destructive',
						});
					},
				});
			},
		};

		actions[action?.value as keyof typeof actions]();
	};

	const renderDialogContent = () => {
		if (!action) return null;

		const { value, label } = action;
		return (
			<DialogContent className="dark:bg-secondary">
				<DialogHeader className="flex flex-col gap-3">
					<DialogTitle className="text-center text-light-100">{label}</DialogTitle>
					{value === 'rename' && <Input type="text" value={name} onChange={(e) => setName(e.target.value)} />}
					{value === 'trash' && (
						<p className="text-center">
							Are you sure you want to move {` `} <br></br>
							<span className="text-red-600 text-sm font-bold">{file.filename}</span> to trash?
						</p>
					)}
					{value === 'delete' && (
						<p className="text-center">
							Are you sure you want to delete{` `}
							<span className="text-red-600 block text-sm">{file.filename}?</span>
						</p>
					)}
					{value === 'archive' && (
						<p className="text-center">
							Are you sure you want to archive{` `}
							<span className="text-red-600 block text-sm">{file.filename}?</span>
						</p>
					)}
					{value === 'restore' && (
						<p className="text-center">
							Are you sure you want to restore{` `}
							<span className="text-red-600 block text-sm">{file.filename}?</span>
						</p>
					)}
				</DialogHeader>
				{['rename', 'trash', 'share', 'archive', 'delete', 'restore'].includes(value) && (
					<DialogFooter className="flex flex-col gap-3 md:flex-row">
						<Button onClick={closeAllModals} className="rounded-full  text-black dark:text-white bg-transparent hover:bg-gray-500 hover:text-white border-2 shadow-none">
							Cancel
						</Button>
						<Button onClick={handleAction} className="rounded-full bg-primary text-white">
							{label}
						</Button>
					</DialogFooter>
				)}
			</DialogContent>
		);
	};
	return (
		<Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant="ghost" size="icon" className="h-8 w-8">
						<MoreVertical className="h-4 w-4" />
						<span className="sr-only">More options</span>
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end" className="w-[200px]">
					{actionsDropdownItems.map((actionItem: ActionType) => (
						<DropdownMenuItem
							key={actionItem.value}
							onClick={() => {
								setAction(actionItem);
								if (['rename', 'share', 'trash', 'details', 'archive', 'delete', 'restore'].includes(actionItem.value)) {
									setIsModalOpen(true);
								}
							}}
						>
							{actionItem.value === 'view' ? (
								<Link href={constructDownloadUrl(file.path)} target="_blank" className="flex items-center gap-4 w-full">
									<Image src={actionItem.icon} alt={actionItem.label} width={20} height={20} />
									{actionItem.label}
								</Link>
							) : actionItem.value === 'download' ? (
								<Link href={constructDownloadUrl(file.path)} download={file.filename} className="flex items-center gap-4 w-full">
									<Image src={actionItem.icon} alt={actionItem.label} width={20} height={20} />
									{actionItem.label}
								</Link>
							) : (
								<div className="flex items-center gap-4 cursor-pointer">
									<Image src={actionItem.icon} alt={actionItem.label} width={20} height={20} />
									{actionItem.label}
								</div>
							)}
						</DropdownMenuItem>
					))}
				</DropdownMenuContent>
			</DropdownMenu>
			{renderDialogContent()}
		</Dialog>
	);
};

export default ActionDropDown;
