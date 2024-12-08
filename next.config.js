/** @type {import('next').NextConfig} */
// const withPWA = require("next-pwa");


const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  // disable: process.env.NODE_ENV === 'development'
})

const nextConfig = {
  swcMinify: true,
  output: 'export',
  webpack: config => {
    if (process.env.NEXT_OUTPUT_MODE !== 'export' || !config.module) {
      return config;
    }
    config.module.rules?.push({
      test: /src\/app\/api/,
      loader: 'ignore-loader',
    });
    return config;
  },
  reactStrictMode: false,
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
  async headers() {
    return [
      {
        // matching all API routes
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" }, // replace this your actual origin
          { key: "Access-Control-Allow-Methods", value: "GET,DELETE,PATCH,POST,PUT,OPTIONS" },
          { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
        ]
      }
    ]
  }
}

module.exports = (nextConfig)
