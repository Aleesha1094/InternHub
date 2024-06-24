/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverComponentsExternalPackages: [
          'puppeteer-extra', 
          'puppeteer-extra-plugin-stealth',
        ],
    },
    staticPageGenerationTimeout: 300,
};

export default nextConfig;