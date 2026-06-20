/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: '**.fbcdn.net',
      },
      {
        protocol: 'https',
        hostname: '**.fna.fbcdn.net',
      },
      {
        protocol: 'https',
        hostname: 'scontent.*.fna.fbcdn.net',
      },
      {
        protocol: 'https',
        hostname: 'scontent-*.fna.fbcdn.net',
      }
    ],
  },
};

export default nextConfig;
