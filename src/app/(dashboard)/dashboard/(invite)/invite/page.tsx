'use client';

import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Loader2, Mail, Send, UserPlus } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';

const inviteFormSchema = z.object({
	emails: z.string().min(1, {
		message: 'Please enter at least one email address.',
	}),
	message: z.string().optional(),
});

type InviteFormValues = z.infer<typeof inviteFormSchema>;

const defaultValues: Partial<InviteFormValues> = {
	emails: '',
	message: "Hey! I'd like to invite you to try DocVault, a great document management system I'm using.",
};

export default function InvitePage() {
	const [isLoading, setIsLoading] = useState(false);

	const form = useForm<InviteFormValues>({
		resolver: zodResolver(inviteFormSchema),
		defaultValues,
	});

	function onSubmit(data: InviteFormValues) {
		setIsLoading(true);

		// Simulate API call
		setTimeout(() => {
			setIsLoading(false);
			toast({
				title: 'Invitations sent',
				description: 'Your invitations have been sent successfully.',
			});
			form.reset({ ...defaultValues, emails: '' });
		}, 1500);
	}

	return (
		<div className="space-y-6">
			<div>
				<h1 className="text-2xl font-bold tracking-tight">Invite Friends</h1>
				<p className="text-muted-foreground">Invite your friends and colleagues to join DocVault.</p>
			</div>

			<div className="grid gap-6 md:grid-cols-2">
				<Card>
					<CardHeader>
						<CardTitle>Send Invitations</CardTitle>
						<CardDescription>Invite people to collaborate with you on DocVault.</CardDescription>
					</CardHeader>
					<CardContent>
						<Form {...form}>
							<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
								<FormField
									control={form.control}
									name="emails"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Email Address</FormLabel>
											<FormControl>
												<Input placeholder="Enter email address" {...field} />
											</FormControl>

											<FormMessage />
										</FormItem>
									)}
								/>

								<Button type="submit" disabled={isLoading} className="w-full">
									{isLoading ? (
										<>
											<Loader2 className="mr-2 h-4 w-4 animate-spin" />
											Sending Invitations
										</>
									) : (
										<>
											<Send className="mr-2 h-4 w-4" />
											Send Invitation
										</>
									)}
								</Button>
							</form>
						</Form>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>Invite Benefits</CardTitle>
						<CardDescription>Why you should invite your friends to DocVault.</CardDescription>
					</CardHeader>
					<CardContent className="space-y-6">
						<div className="flex items-start space-x-4">
							<div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
								<UserPlus className="h-5 w-5 text-primary" />
							</div>
							<div>
								<h3 className="font-medium">Collaborate Easily</h3>
								<p className="text-sm text-muted-foreground">Work together on documents, share files, and collaborate in real-time.</p>
							</div>
						</div>

						<div className="flex items-start space-x-4">
							<div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
								<Mail className="h-5 w-5 text-primary" />
							</div>
							<div>
								<h3 className="font-medium">Get Extra Storage</h3>
								<p className="text-sm text-muted-foreground">For each friend who joins, both of you get an additional 100MB of storage.</p>
							</div>
						</div>

						<div className="rounded-lg border p-4">
							<h3 className="font-medium">Referral Link</h3>
							<p className="mb-2 text-sm text-muted-foreground">Share this link with your friends to invite them directly.</p>
							<div className="flex items-center space-x-2">
								<Input readOnly value="https://docvault.app/invite/user123" className="bg-muted" />
								<Button
									variant="outline"
									size="sm"
									onClick={() => {
										navigator.clipboard.writeText('https://docvault.app/invite/user123');
										toast({
											title: 'Link copied',
											description: 'Referral link copied to clipboard',
										});
									}}
								>
									Copy
								</Button>
							</div>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
