/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true,
  },
  output: 'export',
  // When using `output: export`, Next.js requires this setting for images
  images: {
    unoptimized: true,
  }
};

module.exports = nextConfig;