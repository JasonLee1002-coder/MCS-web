import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'standalone',
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**.mcstation.ai' },
    ],
    unoptimized: true,
  },
}

export default nextConfig
