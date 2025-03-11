/** @type {import('next').NextConfig} */
const nextConfig = {
    compress: true,

    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "oneheart123.club-music.workers.dev",
            },
            {
                protocol: "https",
                hostname: "cdn.sanity.io",
            },
        ],
    },
    
    async headers() {
        return [
            {
                source: "/(.*)",
                headers: [
                    { 
                        key: "Cache-Control",
                        value: "public, max-age=0, immutable",
                    },
                ],
            },
        ];
    },
};

export default nextConfig;
