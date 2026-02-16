import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        // Replace with your Supabase project URL
        hostname: '*.supabase.co',
      },
    ],
  },
};

export default nextConfig;