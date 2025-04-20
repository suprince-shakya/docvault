'use client';
import LoadingComponent from '@/components/common/loading/loading';
import { getProfile } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';
import { redirect } from 'next/navigation';

export default function DashboardPage() {
	const { data, isLoading, error } = useQuery({
		queryKey: ['profile'],
		queryFn: getProfile,
		staleTime: 0,
	});
	if (isLoading) return <LoadingComponent />;
	if (error) return redirect('/login');
	if (data?.status == 200) redirect('/dashboard');
}
