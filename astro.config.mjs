import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import sanity from "@sanity/astro";
import sitemap from "@astrojs/sitemap";
import cloudflare from "@astrojs/cloudflare";

export default defineConfig({
  site: "https://rwadaily.biz.id",

  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [
    sanity({
      projectId: "1dgx0sfa",
      dataset: "production",
      useCdn: false, 
    }), 
    sitemap()
  ],

  // Menggunakan mode "directory" agar lebih kompatibel dengan Cloudflare Pages
  adapter: cloudflare({
    mode: "directory"
  }),
});