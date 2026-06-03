import { defineConfig } from "astro/config";
import cloudflare from "@astrojs/cloudflare";
import react from "@astrojs/react";
import sanity from "@sanity/astro";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import icon from "astro-icon";

export default defineConfig({
  site: "https://rwadaily.biz.id",
  output: 'server', // Ini wajib untuk SSR
  adapter: cloudflare({
    imageService: 'cloudflare', // Aktifkan jika ingin optimasi gambar via Cloudflare
  }),
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [
    react(),
    icon(),
    sanity({
      projectId: "1dgx0sfa",
      dataset: "production",
      useCdn: false, 
    }), 
    sitemap()
  ],
});