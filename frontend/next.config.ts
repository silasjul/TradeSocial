import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    /* config options here */
};

module.exports = {
    images: {
        remotePatterns: [
            new URL("https://pbs.twimg.com/**"),
            new URL("https://static2.finnhub.io/**"),
        ],
    },
};

export default nextConfig;
