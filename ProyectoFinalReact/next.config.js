/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: ['sequelize', 'mysql2', 'mongoose'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
};

module.exports = nextConfig;
