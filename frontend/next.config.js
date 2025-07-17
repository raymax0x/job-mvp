/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: 'standalone', // This optimizes the build for production
  env: {
    // Fallback values for environment variables
    NEXT_PUBLIC_API_URL:
      process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8001/api',
  },
  // Configuring allowed image domains if you're using Next.js Image component
  images: {
    domains: ['localhost'],
  },
};

module.exports = nextConfig;
