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
    // 1. Memaksa mode agar tidak melakukan deteksi otomatis bindings
    mode: 'standalone',
    // 2. Mengosongkan bindings agar adapter tidak mencoba menyuntikkan KV
    bindings: {},
    // 3. Mematikan layanan image otomatis yang sering memicu error binding
    imageService: 'passthrough',
  }),
  
  vite: {
    plugins: [tailwindcss()],
    ssr: {
      target: 'webworker',
      noExternal: ['@astrojs/react'],
    },
    // 4. Memastikan tidak ada variabel global yang memicu auto-config
    define: {
      'process.env.SESSION': 'undefined',
      'process.env.IMAGES': 'undefined',
    }
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
  ]
});