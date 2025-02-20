/** @type {import('next').NextConfig} */
export const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
  experimental: {
    serverActions: {}, // 👈 Change from `true` to an empty object
  },
};

export default nextConfig;
