'use client';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import Link from 'next/link';
import { ModeToggle } from './mode-toggle';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Upload, User } from 'lucide-react';
import { FileUploadDialog } from './file-upload-dialog';
import { useState } from 'react';
export default function DashboardHeader() {
	const [showUploadDialog, setShowUploadDialog] = useState(false);
	return (
		<header className="w-full h-16 border-b bg-background dark:bg-[#121827] flex items-center px-4 md:px-6">
			<div className="relative w-full max-w-md">
				<Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
				<Input type="search" placeholder="Search..." className="w-full dark:bg-transparent pl-8 md:w-[300px] lg:w-[400px] rounded-full dark:placeholder:text-white" />
			</div>

			<div className="flex items-center gap-2 md:ml-auto">
				<Button className="hidden md:flex rounded-full text-white" onClick={() => setShowUploadDialog(true)}>
					<Upload className="mr-2 h-4 w-4" />
					Upload
				</Button>
				<Button className="md:hidden" size="icon" variant="ghost" onClick={() => setShowUploadDialog(true)}>
					<Upload className="h-4 w-4" />
				</Button>
				<ModeToggle />
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="ghost" size="icon" className="rounded-full">
							<User className="h-5 w-5" />
							<span className="sr-only">User menu</span>
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<DropdownMenuLabel>My Account</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuItem asChild>
							<Link href="/dashboard/profile">Profile</Link>
						</DropdownMenuItem>
						<DropdownMenuItem asChild>
							<Link href="/dashboard/invite">Invite Friends</Link>
						</DropdownMenuItem>
						<DropdownMenuSeparator />
						<DropdownMenuItem>
							<Link href="/login">Logout</Link>
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
			<FileUploadDialog open={showUploadDialog} onOpenChange={setShowUploadDialog} />
		</header>
	);
}
