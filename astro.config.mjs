import { defineConfig } from "astro/config";
import cloudflare from "@astrojs/cloudflare";
import react from "@astrojs/react";
import sanity from "@sanity/astro";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import icon from "astro-icon";

export default defineConfig({
  site: "https://rwadaily.biz.id",
  // Output server sangat penting untuk mengaktifkan SSR di Cloudflare Pages
  output: 'server', 
  
  adapter: cloudflare({
    mode: 'directory',
    // Mengaktifkan imageService Cloudflare untuk optimasi gambar otomatis
    imageService: 'cloudflare',
  }),
  
  vite: {
    plugins: [tailwindcss()],
    // Optimasi untuk menghindari error pada modul Node.js di Cloudflare
    ssr: {
      target: 'webworker',
      noExternal: true,
    },
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