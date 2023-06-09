/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.mjs");

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,
  webpack: (config) => {
    // fix for @walletconnect broken dependencies
    config.externals.push("pino-pretty", "lokijs", "encoding");
    return config;
  },
  output: "export",
  // distDir: 'build'
};
export default config;
