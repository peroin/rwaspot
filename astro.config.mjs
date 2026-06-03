import { defineConfig } from "astro/config";
import cloudflare from "@astrojs/cloudflare";
import react from "@astrojs/react";
import sanity from "@sanity/astro";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import icon from "astro-icon";

export default defineConfig({
  site: "https://rwadaily.biz.id",
  output: 'server', 
  
  adapter: cloudflare({
    mode: 'directory',
    // Menambahkan ini membantu Cloudflare mendeteksi fungsi SSR dengan lebih jelas
    functionPerRoute: false, 
    imageService: 'cloudflare',
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