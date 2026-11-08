import withPWAInit from "@ducanh2912/next-pwa";

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

const withPWA = withPWAInit({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  register: true,
  skipWaiting: true,
  // Opcional: Configura un fallback si creas la página /~offline
  fallbacks: {
    document: "/~offline",
  },
  workboxOptions: {
    runtimeCaching: [
      // 1. Navegación de páginas: NetworkFirst (con timeout para no colgar)
      {
        urlPattern: ({ request }) => request.mode === "navigate",
        handler: "NetworkFirst",
        options: {
          cacheName: "pages",
          networkTimeoutSeconds: 3,
          expiration: {
            maxEntries: 50,
            maxAgeSeconds: 7 * 24 * 60 * 60, // 1 semana
          },
        },
      },
      // 2. Assets estáticos de Next.js: CacheFirst (son inmutables por el hash)
      {
        urlPattern: /^\/_next\/static\/.*/i,
        handler: "CacheFirst",
        options: {
          cacheName: "next-static",
          expiration: {
            maxEntries: 200,
            maxAgeSeconds: 30 * 24 * 60 * 60, // 30 días
          },
        },
      },
      // 3. Imágenes del clima (OpenWeatherMap): StaleWhileRevalidate
      {
        urlPattern: /^https:\/\/openweathermap\.org\/.*/i,
        handler: "StaleWhileRevalidate",
        options: {
          cacheName: "weather-images",
          expiration: {
            maxEntries: 30,
            maxAgeSeconds: 24 * 60 * 60, // 1 día
          },
        },
      },
      // 4. Red de seguridad: Todo lo demás (APIs, RSC, datos privados) -> NetworkOnly
      // Esto evita que se cacheen sesiones o respuestas dinámicas de Next.js
      {
        urlPattern: /.*/i,
        handler: "NetworkOnly",
      },
    ],
  },
});

export default withPWA(nextConfig);