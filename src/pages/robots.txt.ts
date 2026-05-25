// src/pages/robots.txt.ts
import type { APIRoute } from 'astro';

export const GET: APIRoute = () => {
  // Menggunakan template string agar rapi
  const robotsTxt = `
# Izinkan semua bot pencari standar (Google, Bing, dll)
User-agent: *
Allow: /

# Proteksi AI: Melarang model AI mengambil konten untuk training/pelatihan
# dan melarang penggunaan untuk fitur "AI Overviews" atau rangkuman otomatis
User-agent: GPTBot
Disallow: /
User-agent: ChatGPT-User
Disallow: /
User-agent: ClaudeBot
Disallow: /
User-agent: Claude-Web
Disallow: /
User-agent: Google-Extended
Disallow: /
User-agent: CCBot
Disallow: /
User-agent: FacebookBot
Disallow: /
User-agent: Bytespider
Disallow: /

# Sitemap
Sitemap: https://rwadaily.biz.id/sitemap-index.xml
`.trim();

  return new Response(robotsTxt, {
    headers: { 'Content-Type': 'text/plain' },
  });
};