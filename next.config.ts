/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
  },
  env: {
    PERPLEXITY_API_KEY: process.env.NEXT_PUBLIC_PERPLEXITY_API_KEY,
  }
}

module.exports = nextConfig
