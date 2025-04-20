import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

export default function StorageOverview({ storageData }: { storageData: any }) {
	return (
		<Card className="bg-white dark:bg-[#1E293B]">
			<CardHeader className="pb-2">
				<CardTitle>Available Storage</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="flex flex-col md:flex-row items-center gap-4">
					<div className="relative w-40 h-40">
						<svg className="w-full h-full" viewBox="0 0 100 100">
							<circle className="text-muted stroke-current" strokeWidth="10" stroke="currentColor" fill="transparent" r="40" cx="50" cy="50" />
							<circle
								className="text-primary stroke-current"
								strokeWidth="10"
								strokeDasharray={251.2}
								strokeDashoffset={251.2 * (1 - storageData.percentUsed / 100)}
								strokeLinecap="round"
								stroke="currentColor"
								fill="transparent"
								r="40"
								cx="50"
								cy="50"
							/>
						</svg>
						<div className="absolute inset-0 flex flex-col items-center justify-center">
							<span className="text-2xl font-bold">{storageData.percentUsed}%</span>
							<span className="text-xs text-muted-foreground">Space used</span>
						</div>
					</div>

					<div className="flex-1">
						<div className="flex justify-between mb-2">
							<span className="text-sm font-medium">{storageData.spaceUsed}MB</span>
							<span className="text-sm font-medium">{storageData.total}MB</span>
						</div>
						<Progress value={storageData.percentUsed} className="h-2" />
						<p className="text-sm text-muted-foreground mt-2">You&apos;ve used {storageData.percentUsed}% of your storage. Upgrade for more space.</p>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
