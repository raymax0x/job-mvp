/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: 'standalone',
  env: {
    // Fallback values for environment variables
    NEXT_PUBLIC_API_URL:
      process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8001/api',
  },

  images: {
    domains: ['localhost'],
  },
};

module.exports = nextConfig;
