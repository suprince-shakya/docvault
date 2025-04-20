'use client';
import { getArchiveFiles } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import FileDisplay from '../../[slug]/_components/fileDisplay';
import { FileViewToggle } from '../../_components/file-view-toggle';
import { actionsDropdownItems, ActionType } from '@/lib/dropdownItems';

export default function ArchivePage() {
	const [viewMode, setViewMode] = useState<'grid' | 'table'>('table');
	const actionItems: ActionType[] = [];
	actionItems.push({
		label: 'Restore',
		icon: '/icons/restore.svg',
		value: 'restore',
	});
	actionItems.push(actionsDropdownItems.find((item) => item.value == 'trash') as ActionType);

	const { data, isLoading, error } = useQuery({
		queryKey: ['archive'],
		queryFn: getArchiveFiles,
	});
	if (isLoading) return <p>Loading...</p>;
	if (error) return <p className="text-red-500">Failed to load files</p>;

	return (
		<div className="space-y-4">
			<div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
				<h1 className="text-2xl font-bold tracking-tight capitalize">Archives</h1>

				<div className="flex items-center gap-2">
					<FileViewToggle viewMode={viewMode} onChange={setViewMode} />
				</div>
			</div>
			<FileDisplay data={data} viewMode={viewMode} actionsDropdownItems={actionItems} />
		</div>
	);
}
