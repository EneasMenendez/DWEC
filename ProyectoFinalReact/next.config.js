/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: ['sequelize', 'mariadb', 'mongoose'],
  outputFileTracingIncludes: {
    '/api/**/*': [
      './node_modules/mariadb/**/*',
      './node_modules/sequelize/**/*',
    ],
  },
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
