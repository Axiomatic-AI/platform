/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    serverActions: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        port: '',
        pathname: '/**',
        search: '',
      },
    ],
  },
  rewrites: async () => {
    return [
      {
        source: '/backend-api/:path*',
        destination: 'https://api.axiomatic-ai.com/:path*',
      },
    ];
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '500mb',
    },
  },
  async headers() {
    return [
      {
        source: '/backend-api/:path*',
        headers: [
          {
            key: 'x-forwarded-timeout',
            value: '600000', // 10 minutes in milliseconds
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;