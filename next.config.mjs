/** @type {import('next').NextConfig} */
const nextConfig = {
  // Image optimisation is on. It was previously disabled, which meant every
  // photograph shipped at full resolution in its original format — costly once
  // the site grew to eight routes of imagery. All images are local, so no
  // remotePatterns are needed.
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
    ]
  },
}

export default nextConfig
