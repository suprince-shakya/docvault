import type React from 'react';
import DashboardSidebar from './_components/dashboard-sidebar';
import DashboardHeader from './_components/dashboard-header';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className="flex min-h-screen bg-muted/40 dark:bg-[#121827]">
			<DashboardSidebar />
			<div className="flex-1">
				<DashboardHeader />
				<main className="p-4 md:p-6">{children}</main>
			</div>
		</div>
	);
}
