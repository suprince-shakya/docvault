'use client';

import { getFiles } from '@/lib/api';
import { getFileTypesParams } from '@/lib/utils';

import { useQuery } from '@tanstack/react-query';
import FileDisplay from './_components/fileDisplay';
import { useState } from 'react';
import { FileViewToggle } from '../_components/file-view-toggle';
import { actionsDropdownItems } from '@/lib/dropdownItems';

interface Props {
	params: {
		slug: string;
	};
}

export default function SlugPage({ params }: Props) {
	const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
	const { slug } = params;
	const type = getFileTypesParams(slug);

	const { data, isLoading, error } = useQuery({
		queryKey: ['files', type],
		queryFn: () => getFiles(type),
		staleTime: 0,
	});
	if (isLoading) return <p>Loading...</p>;
	if (error) return <p className="text-red-500">Failed to load files</p>;

	return (
		<div className="space-y-4">
			<div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
				<h1 className="text-2xl font-bold tracking-tight capitalize">{slug}</h1>
				<div className="flex items-center gap-2">
					<FileViewToggle viewMode={viewMode} onChange={setViewMode} />
				</div>
			</div>
			<FileDisplay data={data} viewMode={viewMode} actionsDropdownItems={actionsDropdownItems} />
		</div>
	);
}
