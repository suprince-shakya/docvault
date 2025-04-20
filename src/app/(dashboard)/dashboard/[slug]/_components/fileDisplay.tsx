import Thumbnail from './thumbnail';
import ActionDropDown from './actionDropDown';
import { Card } from '@/components/ui/card';
import { formatFileSize } from '@/lib/utils';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ActionType } from '@/lib/dropdownItems';
import Image from 'next/image';
import dayjs from 'dayjs';

const FileDisplay = ({ data, viewMode, actionsDropdownItems }: { data: any; viewMode: string; actionsDropdownItems: ActionType[] }) => {
	return (
		<>
			{viewMode === 'grid' ? (
				<>
					{data.data.length > 0 ? (
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
							{data.data.map((doc: any, i: number) => (
								<Card key={i} className="overflow-hidden bg-background dark:bg-[#1E293B] flex flex-col">
									<div className="p-6 flex flex-col items-center">
										<Thumbnail type={doc.type} extension={doc.extension} url={doc.path} className="!size-20" imageClassName="!size-20" />
										<div className="mt-4 text-center">
											<h3 className="font-medium text-sm">{doc.filename}</h3>
											<p className="text-xs text-muted-foreground mt-1">{dayjs(doc.createdAt).format('h:mm A 	MMM D, YYYY')}</p>
										</div>
									</div>
									<div className="bg-muted/50 dark:bg-muted/20 px-4 py-2 flex items-center justify-between mt-auto">
										<span className="text-xs font-medium">{formatFileSize(doc.size)}</span>
										<ActionDropDown file={doc} actionsDropdownItems={actionsDropdownItems} />
									</div>
								</Card>
							))}
						</div>
					) : (
						<div className="flex flex-col w-full justify-center items-center">
							<Image src={'/no-files.png'} width={300} height={300} alt="no-files" className="mt-[100px]" />
							<h1 className="font-semibold text-2xl">No files Found</h1>
						</div>
					)}
				</>
			) : (
				<div className="rounded-md border">
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead className="w-[40px]">SN</TableHead>
								<TableHead>Pic</TableHead>
								<TableHead className="w-96">Name</TableHead>
								<TableHead className="hidden md:table-cell">Size</TableHead>
								<TableHead className="hidden md:table-cell">Modified</TableHead>
								<TableHead className="w-[70px]"></TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{data.data.map((doc: any, i: number) => (
								<TableRow key={doc._id}>
									<TableCell>{i + 1}</TableCell>
									<TableCell className="p-2">
										{' '}
										<Thumbnail type={doc.type} extension={doc.extension} url={doc.path} className="!size-12" imageClassName="!size-12" />
									</TableCell>
									<TableCell>{doc.filename}</TableCell>
									<TableCell className="hidden md:table-cell">{formatFileSize(doc.size)}</TableCell>
									<TableCell className="hidden md:table-cell">{dayjs(doc.updatedAt).format('h:mm A MMM D, YYYY')}</TableCell>
									<TableCell>
										<ActionDropDown file={doc} actionsDropdownItems={actionsDropdownItems} />
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</div>
			)}
		</>
	);
};

export default FileDisplay;
