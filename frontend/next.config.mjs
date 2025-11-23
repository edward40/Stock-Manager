/** @type {import('next').NextConfig} */
const nextConfig = {
    reactCompiler: true,
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: 'https://stock-manager-api.onrender.com/api/:path*',
            },
        ];
    },
};

export default nextConfig;
