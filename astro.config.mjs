import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import sanity from "@sanity/astro";
import sitemap from "@astrojs/sitemap";
import icon from "astro-icon";

export default defineConfig({
  site: "https://rwadaily.biz.id",
  output: 'static', // UBAH KE 'static'

  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [
    icon(),
    sanity({
      projectId: "1dgx0sfa",
      dataset: "production",
      useCdn: false, 
    }), 
    sitemap()
  ],
  // HAPUS bagian adapter cloudflare seluruhnya
});