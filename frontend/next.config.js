    /** @type {import('next').NextConfig} */
    const nextConfig = {
    output: 'export',
    trailingSlash: true,
    images: {
        unoptimized: true
    },
    assetPrefix: process.env.NODE_ENV === 'production' ? '/perfume-website' : '',
    }

    module.exports = nextConfig