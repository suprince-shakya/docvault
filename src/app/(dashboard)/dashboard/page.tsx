'use client';
import StorageOverview from './_components/storage-overview';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileIcon, FileImageIcon, FileVideoIcon, FolderIcon } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { getDashboard } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
export default function DashboardPage() {
	const { data, isLoading, error } = useQuery({
		queryKey: ['dashboard'],
		queryFn: getDashboard,
	});
	if (isLoading) return <p>Loading...</p>;
	if (error) return <p className="text-red-500">Failed to load files</p>;

	const contacts = [
		{ name: 'Alice Emma', email: 'ammaroant234@gmail.com' },
		{ name: 'Anne Jennifer', email: 'jennifer@gmail.com' },
		{ name: 'Bush Matthew', email: 'matthew0909@gmail.com' },
		{ name: 'Henry Rebecca', email: 'henryrebecca1234@gmail.com' },
		{ name: 'Geogre Michael', email: 'art234@gmail.com' },
		{ name: 'Robert Laura', email: 'laurablaurabl@gmail.com' },
	];

	return (
		<div className="grid gap-6">
			<div className="grid md:grid-cols-6 gap-4">
				<div className="md:col-span-4">
					<StorageOverview storageData={data.data.availableStorage} />

					<div className="grid grid-cols-2 gap-6 mt-6">
						<Card className="bg-white dark:bg-[#1E293B]">
							<CardContent className="p-0">
								<div className="flex flex-col items-center p-6">
									<div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/20 flex items-center justify-center mb-4">
										<FileIcon className="h-6 w-6 text-red-500" />
									</div>
									<div className="text-2xl font-bold">{data.data.document.spaceUsed}</div>
									<div className="text-sm font-medium">Documents</div>
								</div>
								<div className="border-t px-6 py-4">
									<div className="text-xs text-muted-foreground">Last update</div>
									<div className="text-sm">{dayjs(data.data.document.lastUpdate).format('h:mm A MMM D')}</div>
								</div>
							</CardContent>
						</Card>

						<Card className="bg-white dark:bg-[#1E293B]">
							<CardContent className="p-0">
								<div className="flex flex-col items-center p-6">
									<div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center mb-4">
										<FileImageIcon className="h-6 w-6 text-blue-500" />
									</div>
									<div className="text-2xl font-bold">{data.data.image.spaceUsed}</div>
									<div className="text-sm font-medium">Images</div>
								</div>
								<div className="border-t px-6 py-4">
									<div className="text-xs text-muted-foreground">Last update</div>
									<div className="text-sm">{dayjs(data.data.image.lastUpdate).format('h:mm A MMM D')}</div>
								</div>
							</CardContent>
						</Card>

						<Card className="bg-white dark:bg-[#1E293B]">
							<CardContent className="p-0">
								<div className="flex flex-col items-center p-6">
									<div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center mb-4">
										<FileVideoIcon className="h-6 w-6 text-green-500" />
									</div>
									<div className="text-2xl font-bold">{data.data.audioVideo.spaceUsed}</div>
									<div className="text-sm font-medium">Video, Audio</div>
								</div>
								<div className="border-t px-6 py-4">
									<div className="text-xs text-muted-foreground">Last update</div>
									<div className="text-sm">{dayjs(data.data.audioVideo.lastUpdate).format('h:mm A MMM D')}</div>
								</div>
							</CardContent>
						</Card>

						<Card className="bg-white dark:bg-[#1E293B]">
							<CardContent className="p-0">
								<div className="flex flex-col items-center p-6">
									<div className="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center mb-4">
										<FolderIcon className="h-6 w-6 text-purple-500" />
									</div>
									<div className="text-2xl font-bold">{data.data.other.spaceUsed}</div>
									<div className="text-sm font-medium">Others</div>
								</div>
								<div className="border-t px-6 py-4">
									<div className="text-xs text-muted-foreground">Last update</div>
									<div className="text-sm">{dayjs(data.data.other.lastUpdate).format('h:mm A MMM D')}</div>
								</div>
							</CardContent>
						</Card>
					</div>
				</div>

				<div className="space-y-6 md:col-span-2">
					<Card className="bg-white dark:bg-[#1E293B]">
						<CardHeader className="pb-2">
							<CardTitle className="text-lg flex justify-between items-center">
								Contact
								<Button size="icon" variant="ghost" className="h-8 w-8 rounded-full">
									<span className="sr-only">Add contact</span>
									<span className="text-lg">+</span>
								</Button>
							</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="space-y-4">
								{contacts.map((contact, i) => (
									<div key={i} className="flex items-center gap-3">
										<Avatar>
											<AvatarImage src={`/placeholder.svg?height=40&width=40&text=${contact.name.charAt(0)}`} />
											<AvatarFallback>{contact.name.charAt(0)}</AvatarFallback>
										</Avatar>
										<div className="flex-1 min-w-0">
											<p className="text-sm font-medium">{contact.name}</p>
											<p className="text-xs text-muted-foreground truncate">{contact.email}</p>
										</div>
									</div>
								))}
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
}
