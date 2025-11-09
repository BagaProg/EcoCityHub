import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
  base: "./",
  plugins: [react(), tailwindcss(),
  VitePWA({
    registerType: "autoUpdate",
    manifest: {
      name: "EcoCityHub",
      short_name: "EcoCityHub",
      description: "Smart ecological solutions for cities",
      theme_color: "#4CAF50",
      background_color: "#ffffff",
      display: "standalone",
      start_url: "/",
      icons: [
        { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
        { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png" }
      ]
    }
  })
  ],
  proxy: {
    '/api': 'http://localhost:5000'
  }
})