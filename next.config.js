/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  eslint: {
    dirs: ['src']
  },
  images: {
    loader: 'akamai',
    path: '',
  }
}
