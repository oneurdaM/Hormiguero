/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    experimental: {
        appDir: true,
        typedRoutes: true,
    },
    images: {
        domains: [
            'via.placeholder.com',
            'res.cloudinary.com',
            's3.amazonaws.com',
            '18.141.64.26',
            '127.0.0.1',
            'static.wixstatic.com',
            'localhost',
        ],
        formats: ['image/avif', 'image/webp'],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**',
            },
        ],
    },
}

module.exports = nextConfig
