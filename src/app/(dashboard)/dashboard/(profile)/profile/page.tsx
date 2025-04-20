import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function AccountSettingsPage() {
	return (
		<>
			<h1 className="text-2xl font-bold mb-6">Account Settings</h1>
			<div className="grid md:grid-cols-2 gap-4">
				<Card className="mb-6">
					<CardHeader className="pb-4">
						<CardTitle>Profile Information</CardTitle>
						<CardDescription>Update your account information and profile picture</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="flex flex-col md:flex-row gap-6">
							<div className="flex flex-col items-center gap-4">
								<Avatar className="w-24 h-24">
									<AvatarImage src="/placeholder.svg?height=96&width=96" alt="Profile picture" />
									<AvatarFallback>ML</AvatarFallback>
								</Avatar>
								<Button size="sm" variant="outline">
									Change Picture
								</Button>
							</div>

							<div className="flex-1 grid gap-4">
								<div className="grid gap-2">
									<Label htmlFor="fullName">Full Name</Label>
									<Input id="fullName" defaultValue="Mitchel Lensink" />
								</div>

								<div className="grid gap-2">
									<Label htmlFor="email">Email</Label>
									<Input id="email" type="email" defaultValue="mitchellensink@gmail.com" readOnly />
								</div>

								<div className="grid gap-2">
									<Label htmlFor="phone">Phone number</Label>
									<Input id="phone" type="tel" defaultValue="0901605900" />
								</div>

								<div className="grid gap-2">
									<Label>Gender</Label>
									<RadioGroup defaultValue="male" className="flex gap-4">
										<div className="flex items-center space-x-2">
											<RadioGroupItem value="male" id="male" />
											<Label htmlFor="male">Male</Label>
										</div>
										<div className="flex items-center space-x-2">
											<RadioGroupItem value="female" id="female" />
											<Label htmlFor="female">Female</Label>
										</div>
									</RadioGroup>
								</div>
							</div>
						</div>

						<div className="flex justify-end gap-2 mt-6">
							<Button variant="outline">Cancel</Button>
							<Button>Update</Button>
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className="pb-4">
						<CardTitle>Password</CardTitle>
						<CardDescription>Change your password</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="grid gap-4">
							<div className="grid gap-2">
								<Label htmlFor="currentPassword">Current Password</Label>
								<Input id="currentPassword" type="password" />
							</div>

							<div className="grid gap-2">
								<Label htmlFor="newPassword">New Password</Label>
								<Input id="newPassword" type="password" />
							</div>

							<div className="grid gap-2">
								<Label htmlFor="confirmPassword">Confirm New Password</Label>
								<Input id="confirmPassword" type="password" />
							</div>

							<div className="flex justify-end gap-2 mt-2">
								<Button variant="outline">Cancel</Button>
								<Button>Update Password</Button>
							</div>
						</div>
					</CardContent>
				</Card>
			</div>
		</>
	);
}
