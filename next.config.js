/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images:{
    domains:['images.prismic.io']
  },
  typescript: {
    ignoreBuildErrors: true,
  },
}

module.exports = nextConfig
