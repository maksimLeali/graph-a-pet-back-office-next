import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	// server minimale autonomo in .next/standalone, usato dal Dockerfile
	output: "standalone",
	compiler: {
		styledComponents: true,
	},
};

export default nextConfig;
