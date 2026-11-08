// import withPWAInit from "@ducanh2912/next-pwa";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Merged config options
  cacheComponents: true,
  partialPrefetching: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "openweathermap.org",
      },
    ],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

// PWA desactivado temporalmente para diagnosticar el build colgado
// const withPWA = withPWAInit({
//   dest: "public",
//   disable: process.env.NODE_ENV === "development",
//   register: true,
//   skipWaiting: true,
//   fallbacks: {
//     document: "/~offline",
//   },
//   workboxOptions: {
//     runtimeCaching: [
//       {
//         urlPattern: ({ request }) => request.mode === "navigate",
//         handler: "NetworkFirst",
//         options: {
//           cacheName: "pages",
//           networkTimeoutSeconds: 3,
//           expiration: {
//             maxEntries: 50,
//             maxAgeSeconds: 7 * 24 * 60 * 60,
//           },
//         },
//       },
//       {
//         urlPattern: /^\/_next\/static\/.*/i,
//         handler: "CacheFirst",
//         options: {
//           cacheName: "next-static",
//           expiration: {
//             maxEntries: 200,
//             maxAgeSeconds: 30 * 24 * 60 * 60,
//           },
//         },
//       },
//       {
//         urlPattern: /^https:\/\/openweathermap\.org\/.*/i,
//         handler: "StaleWhileRevalidate",
//         options: {
//           cacheName: "weather-images",
//           expiration: {
//             maxEntries: 30,
//             maxAgeSeconds: 24 * 60 * 60,
//           },
//         },
//       },
//       {
//         urlPattern: /.*/i,
//         handler: "NetworkOnly",
//       },
//     ],
//   },
// });

// export default withPWA(nextConfig);
export default nextConfig;