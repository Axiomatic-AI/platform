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
  api: {
    bodyParser: {
      sizeLimit: '500mb',
    },
  },
};

module.exports = nextConfig;