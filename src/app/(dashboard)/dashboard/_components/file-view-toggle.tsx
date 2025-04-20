'use client';

import { Grid, List } from 'lucide-react';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

interface FileViewToggleProps {
	viewMode: 'grid' | 'table';
	onChange: (value: 'grid' | 'table') => void;
}

export function FileViewToggle({ viewMode, onChange }: FileViewToggleProps) {
	return (
		<ToggleGroup type="single" value={viewMode} onValueChange={(value) => value && onChange(value as 'grid' | 'table')}>
			<ToggleGroupItem value="grid" aria-label="Grid view">
				<Grid className="h-4 w-4" />
			</ToggleGroupItem>
			<ToggleGroupItem value="table" aria-label="Table view">
				<List className="h-4 w-4" />
			</ToggleGroupItem>
		</ToggleGroup>
	);
}
