/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // No image domains needed — we render no remote images.

  // We don't ship ESLint config in this repo; ignore lint during Vercel's
  // `next build` so a Next-default rule firing doesn't fail the deploy.
  // Type-checking is unaffected and still runs.
  eslint: { ignoreDuringBuilds: true },
};

export default nextConfig;
