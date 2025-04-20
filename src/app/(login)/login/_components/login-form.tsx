'use client';

import type React from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Facebook, LogIn } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { toast } from '@/hooks/use-toast';
import { useMutation } from '@tanstack/react-query';
import { loginUser } from '@/lib/api';

export default function LoginForm() {
	const router = useRouter();
	const [isSubmitting, setIsSubmitting] = useState(false);
	const login = useMutation({ mutationFn: loginUser });

	const LoginFormSchema = z.object({
		email: z
			.string()
			.min(1, {
				message: 'Email is required',
			})
			.email({ message: 'Must be a valid email' }),
		password: z.string().min(1, {
			message: 'Password is required',
		}),
	});

	const form = useForm<z.infer<typeof LoginFormSchema>>({
		resolver: zodResolver(LoginFormSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	});

	const onSubmit = async (data: z.infer<typeof LoginFormSchema>) => {
		setIsSubmitting(true);
		login.mutate(data, {
			onError: (error) => {
				toast({
					title: 'Uh oh! Something went wrong.',
					description: error.message,
					variant: 'destructive',
				});
			},
			onSuccess: ({ data }) => {
				if (data.error) {
					toast({
						title: 'Uh oh! Something went wrong.',
						description: data.message,
						variant: 'destructive',
					});
				} else {
					localStorage.setItem('token', data.data.token);
					form.reset();
					toast({
						title: 'Success',
						description: data.message,
					});
					setTimeout(() => {
						router.push('/dashboard');
					}, 500);
				}
			},
			onSettled: () => {
				setIsSubmitting(false);
			},
		});
	};

	return (
		<div className="w-full max-w-xl space-y-8">
			<div className="text-center">
				<h2 className="text-3xl font-bold">Login</h2>
			</div>

			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
					<div className="space-y-4">
						<div className="space-y-2">
							<FormField
								control={form.control}
								name="email"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Email</FormLabel>
										<FormControl>
											<Input placeholder="john.doe@gmail.com" {...field} type="email" className="" />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>

						<div className="space-y-2">
							<FormField
								control={form.control}
								name="password"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Password</FormLabel>
										<FormControl>
											<Input placeholder="password" {...field} type="password" />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
					</div>

					<Button type="submit" className="w-full gap-2" disabled={isSubmitting}>
						{isSubmitting ? 'Loging in...' : 'Login'}
						<LogIn className="h-4 w-4" />
					</Button>
				</form>
			</Form>
			<div className="relative my-4">
				<div className="absolute inset-0 flex items-center">
					<span className="w-full border-t"></span>
				</div>
				<div className="relative flex justify-center text-xs uppercase">
					<span className="bg-background px-2 text-muted-foreground">or</span>
				</div>
			</div>

			<div className="flex justify-center space-x-4">
				<Button variant="outline" size="icon" className="rounded-full w-12 h-12">
					<Facebook className="h-5 w-5" />
					<span className="sr-only">Continue with Facebook</span>
				</Button>
				<Button variant="outline" size="icon" className="rounded-full w-12 h-12">
					<svg className="h-5 w-5" viewBox="0 0 24 24">
						<path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
						<path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
						<path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
						<path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
						<path d="M1 1h22v22H1z" fill="none" />
					</svg>
					<span className="sr-only">Continue with Google</span>
				</Button>
			</div>

			<div className="text-center mt-6">
				<p className="text-sm text-muted-foreground">
					Don&apos;t have an account?
					<Link href="/signup" className="ml-1 font-medium text-primary hover:underline">
						Create Account
					</Link>
				</p>
			</div>
		</div>
	);
}
