import LoginForm from './_components/login-form';
import Image from 'next/image';

export default function LoginPage() {
	return (
		<div className="flex min-h-screen w-full">
			<div className="flex flex-col md:flex-row w-full">
				{/* Left side - Branding */}
				<div className="w-full md:w-1/2 bg-primary text-white p-8 hidden md:block">
					<div className="max-w-md mx-auto flex flex-col justify-center h-full">
						<div className="flex items-center gap-2 mb-12">
							<div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
								<div className="w-8 h-8 rounded-full bg-white/80"></div>
							</div>
							<span className="text-2xl font-semibold">DocVault</span>
						</div>

						<h1 className="text-4xl md:text-5xl font-bold mb-4">
							Manage your files
							<br />
							the best way
						</h1>
						<p className="text-white/80 mb-8">Awesome, we've created the perfect place for you to store all your documents.</p>

						<div className="mt-8">
							<Image src="/logo.png" alt="File management illustration" width={200} height={200} className="mx-auto md:mx-0" />
						</div>
					</div>
				</div>

				{/* Right side - Login form */}
				<div className="w-full md:w-2/3 bg-background p-8 flex flex-col items-center justify-center h-full">
					<div className="mb-8 block md:hidden">
						<Image src="/logo.png" alt="File management illustration" width={200} height={200} className="mx-auto md:mx-0" />
					</div>
					<LoginForm />
				</div>
			</div>
		</div>
	);
}
