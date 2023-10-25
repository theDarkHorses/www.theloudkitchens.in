/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ["i.imgur.com", "cdn.sanity.io", "img.clerk.com"]
    },
    async redirects(){
        return [
            {
                source: '/',
                destination: '/home',
                permanent: true,
            },
        ]
    }
}

module.exports = nextConfig
