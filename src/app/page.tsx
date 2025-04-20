'use client';
import { redirect } from 'next/navigation';

export default function DashboardPage() {
	const token = localStorage.getItem('token');
	if (!token) redirect('/login');
	redirect('/dashboard');
}
