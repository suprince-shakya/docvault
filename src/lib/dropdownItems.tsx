export type ActionType = {
	label: string;
	icon: string;
	value: string;
};

export const actionsDropdownItems: ActionType[] = [
	{
		label: 'View',
		icon: '/icons/view.svg',
		value: 'view',
	},
	{
		label: 'Rename',
		icon: '/icons/edit.svg',
		value: 'rename',
	},
	{
		label: 'Details',
		icon: '/icons/info.svg',
		value: 'details',
	},
	{
		label: 'Share',
		icon: '/icons/share.svg',
		value: 'share',
	},
	{
		label: 'Archive',
		icon: '/icons/archive.svg',
		value: 'archive',
	},
	{
		label: 'Download',
		icon: '/icons/download.svg',
		value: 'download',
	},
	{
		label: 'Move to Trash',
		icon: '/icons/trash.svg',
		value: 'trash',
	},
];
