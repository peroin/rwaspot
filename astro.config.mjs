import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import sanity from "@sanity/astro";
import sitemap from "@astrojs/sitemap";
import icon from "astro-icon";
import react from "@astrojs/react"; // 1. Tambahkan ini

export default defineConfig({
  site: "https://rwadaily.biz.id",
  output: 'static',

  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [
    react(), // 2. Tambahkan ini ke dalam array
    icon(),
    sanity({
      projectId: "1dgx0sfa",
      dataset: "production",
      useCdn: false, 
    }), 
    sitemap()
  ],
});