import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	eslint: {
		ignoreDuringBuilds: true,
	},
	experimental: {
		serverActions: {
			bodySizeLimit: '5gb',
		},
	},
	images: {
		unoptimized: true,
		remotePatterns: [
			{
				protocol: 'http',
				hostname: 'localhost:3000',
			},
			{
				hostname: 'vault.suprinceshakya.com.np',
				protocol: 'https',
			},
		],
	},
};

export default nextConfig;
