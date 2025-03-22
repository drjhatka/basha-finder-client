import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com',
                pathname: '/**', // This allows any image path under the domain
            },
            {
              protocol: 'https',
              hostname: 'i.ibb.co',
              pathname: '/**', // This allows any image path under the domain
          },
        ],
    },
    
        eslint: {
          // Warning: This allows production builds to successfully complete even if
          // your project has ESLint errors.
          ignoreDuringBuilds: true,
        },
      
};

export default nextConfig;
