'use client';

import { cn } from '@/lib/utils';
import { LayoutGrid, FileText, ImageIcon, FileVideo, FolderDot, LogOut, Trash2, Archive } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

export default function DashboardSidebar() {
	const pathname = usePathname();
	const [collapsed, setCollapsed] = useState(false);

	const routes = [
		{
			label: 'Dashboard',
			icon: LayoutGrid,
			href: '/dashboard',
			active: pathname === '/dashboard',
		},
		{
			label: 'Documents',
			icon: FileText,
			href: '/dashboard/documents',
			active: pathname === '/dashboard/documents',
		},
		{
			label: 'Images',
			icon: ImageIcon,
			href: '/dashboard/images',
			active: pathname === '/dashboard/images',
		},
		{
			label: 'Video, Audio',
			icon: FileVideo,
			href: '/dashboard/media',
			active: pathname === '/dashboard/media',
		},
		{
			label: 'Others',
			icon: FolderDot,
			href: '/dashboard/others',
			active: pathname === '/dashboard/others',
		},
		{
			label: 'Archive',
			icon: Archive,
			href: '/dashboard/archive',
			active: pathname === '/dashboard/archive',
		},
		{
			label: 'Trash Bin',
			icon: Trash2,
			href: '/dashboard/trash',
			active: pathname === '/dashboard/trash',
		},
	];

	return (
		<div className={cn('bg-background dark:bg-[#1E293B] h-screen border-r flex flex-col transition-all duration-300', collapsed ? 'w-[70px]' : 'w-[250px]')}>
			<div className="h-16 border-b flex items-center px-4">
				{!collapsed && (
					<>
						<Link href="/dashboard" className="flex items-center gap-2">
							<div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
								<div className="w-6 h-6 rounded-full bg-primary"></div>
							</div>
							<span className="font-semibold text-xl">Storage</span>
						</Link>
					</>
				)}
				<Button variant="ghost" size="icon" className="ml-auto" onClick={() => setCollapsed(!collapsed)}>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
						className="h-4 w-4"
					>
						<path d="M18 6H6" />
						<path d="M18 12H6" />
						<path d="M18 18H6" />
					</svg>
					<span className="sr-only">Toggle sidebar</span>
				</Button>
			</div>

			<div className="flex-1 overflow-auto py-8">
				<nav className="grid gap-1 px-2">
					{routes.map((route, i) => (
						<Link
							key={i}
							href={route.href}
							className={cn(
								'flex items-center gap-5 rounded-full px-3 py-3 text-sm transition-all font-semibold',
								route.active ? 'bg-primary text-white' : 'text-muted-foreground hover:bg-muted hover:text-foreground dark:hover:text-black'
							)}
						>
							<route.icon className="h-5 w-5" />
							{!collapsed && <span>{route.label}</span>}
						</Link>
					))}
				</nav>
			</div>

			<div className="p-4 mt-auto">
				<div className="relative w-full h-[200px] mb-4">
					<div className="absolute inset-0 flex items-center justify-center">
						<img src="/logo.png" alt="Storage illustration" className="w-full h-full object-contain" />
					</div>
				</div>

				{!collapsed && (
					<Button variant="outline" className="w-full" asChild onClick={() => localStorage.removeItem('token')}>
						<Link href="/login">
							<LogOut className="mr-2 h-4 w-4" />
							Logout
						</Link>
					</Button>
				)}
			</div>
		</div>
	);
}
