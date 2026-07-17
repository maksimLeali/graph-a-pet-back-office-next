import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	// server minimale autonomo in .next/standalone, usato dal Dockerfile
	output: "standalone",
	compiler: {
		styledComponents: true,
	},
	// l'area platform-admin è passata da /<sezione> a /platform/<sezione>
	// (/shelters/:id ora è l'area operativa multi-rifugio): redirect dei
	// vecchi percorsi salvati nei bookmark
	async redirects() {
		const legacy = [
			"dashboard",
			"pets",
			"users",
			"statistics",
			"roles-permissions",
			"translations",
			"me",
			"donations",
		];
		return legacy.map((section) => ({
			source: `/${section}/:path*`,
			destination: `/platform/${section}/:path*`,
			permanent: false,
		}));
	},
};

export default nextConfig;
