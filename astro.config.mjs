import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import sanity from "@sanity/astro";
import sitemap from "@astrojs/sitemap";
import cloudflare from "@astrojs/cloudflare";
import icon from "astro-icon";

// Deteksi apakah kita sedang dalam mode development
const isDev = process.env.NODE_ENV === 'development';

export default defineConfig({
  site: "https://rwadaily.biz.id",
  output: 'server', 

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

  // Adapter Cloudflare
  adapter: isDev ? undefined : cloudflare({
    mode: "directory",
    // Tambahkan opsi ini agar Cloudflare lebih mudah mengenali file statis
    imageService: 'passthrough' 
  }),
});