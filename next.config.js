/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "lh3.googleusercontent.com",
      "www.gravatar.com",
      "firebasestorage.googleapis.com",
    ],
  },
  reactStrictMode: false,
};

module.exports = nextConfig;
