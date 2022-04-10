/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  eslint: {
    dirs: [
      'layouts',
      'models',
      'pages',
      'queries',
      'services',
      'styles',
      'hooks',
    ],
  },
};
