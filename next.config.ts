import type { NextConfig } from 'next';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  reactStrictMode: true,
  outputFileTracingRoot: __dirname,
  output: 'export',
  experimental: {
    inlineCss: true,
  },
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
