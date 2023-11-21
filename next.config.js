/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'dosen.unimma.ac.id'
            }
        ]
    }
}

module.exports = nextConfig
