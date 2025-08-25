/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export', // Bu satırı kaldırdık - API routes için gerekli
  trailingSlash: false, // API route'lar için false olmalı
  images: {
    unoptimized: true
  }
}

module.exports = nextConfig