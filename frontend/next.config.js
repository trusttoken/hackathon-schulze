/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { hostname: 'localhost' },
      {
        protocol: 'https',
        hostname: 'loremflickr.com',
      },
    ],
  },
}

module.exports = nextConfig
