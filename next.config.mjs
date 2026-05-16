/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // No image domains needed — we render no remote images.
  // Vercel zero-config deployment works out of the box.
};

export default nextConfig;
