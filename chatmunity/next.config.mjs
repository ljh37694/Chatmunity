/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: '/api/socket',
        headers: [
          { key: 'Connection', value: 'keep-alive' },
        ],
      },
    ];
  },

  async redirects() {
    return [
      {
        source: '/',
        destination: '/room',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
