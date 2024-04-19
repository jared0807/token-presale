/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.mjs");

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: false,
  //assetPrefix: isProd ? 'https://cdn.mydomain.com' : undefined,

  /**
   * If you are using `appDir` then you must comment the below `i18n` config out.
   *
   * @see https://github.com/vercel/next.js/issues/41980
   */
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
  images: {
    domains: ["via.placeholder.com"],
  },
  // Add the redirects property
  async redirects() {
    return [
      {
        source: "/analytics",
        destination: "/analytics/explorer",
        permanent: true, // Set to true for a permanent redirect (HTTP 301)
      },
    ];
  },
};

export default config;
