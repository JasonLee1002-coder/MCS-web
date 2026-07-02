import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**.mcstation.ai' },
    ],
    unoptimized: true,
  },
  experimental: {
    optimizePackageImports: ['framer-motion', '@phosphor-icons/react'],
  },
}

export default nextConfig
