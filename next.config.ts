import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  compiler: {
    styledComponents: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'robohash.org',
        port: '',
        pathname: "/**"
      }
    ],
  }
};

export default nextConfig;
