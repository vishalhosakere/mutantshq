/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "nft-cdn.alchemy.com",
        port: "",
        pathname: "/**",
      },
    ],
    unoptimized: true,
  },

  swcMinify: false,
};

module.exports = nextConfig;
