import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Pin Turbopack's workspace root to THIS project — Next 15.5's workspace
  // inference walks parent dirs looking for `node_modules` and on macOS
  // gets confused between /tmp and the symlinked /private/tmp. Pinning here
  // makes builds reproducible regardless of where the project is cloned.
  turbopack: { root: __dirname },

  // No image domains needed — we render no remote images.

  // We don't ship ESLint config in this repo; ignore lint during Vercel's
  // `next build` so a Next-default rule firing doesn't fail the deploy.
  // Type-checking is unaffected and still runs.
  eslint: { ignoreDuringBuilds: true },
};

export default nextConfig;
