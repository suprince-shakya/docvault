'use client';
import { getTrashFiles } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import FileDisplay from '../../[slug]/_components/fileDisplay';
import { FileViewToggle } from '../../_components/file-view-toggle';
import { ActionType } from '@/lib/dropdownItems';

export default function TrashPage() {
	const [viewMode, setViewMode] = useState<'grid' | 'table'>('table');
	const actionItems: ActionType[] = [];
	actionItems.push({
		label: 'Restore',
		icon: '/icons/restore.svg',
		value: 'restore',
	});
	actionItems.push({
		label: 'Permanently Delete',
		icon: '/icons/delete.svg',
		value: 'delete',
	});
	const { data, isLoading, error } = useQuery({
		queryKey: ['trash'],
		queryFn: getTrashFiles,
	});
	if (isLoading) return <p>Loading...</p>;
	if (error) return <p className="text-red-500">Failed to load files</p>;

	return (
		<div className="space-y-4">
			<div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
				<h1 className="text-2xl font-bold tracking-tight capitalize">Trash Bin</h1>

				<div className="flex items-center gap-2">
					<FileViewToggle viewMode={viewMode} onChange={setViewMode} />
				</div>
			</div>

			<FileDisplay data={data} viewMode={viewMode} actionsDropdownItems={actionItems} />
			<div className="mt-6 text-center text-sm text-muted-foreground">
				<p>Files in trash will be automatically deleted after 30 days</p>
			</div>
		</div>
	);
}
