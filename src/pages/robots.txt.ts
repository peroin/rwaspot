// src/pages/robots.txt.ts
import type { APIRoute } from 'astro';

export const GET: APIRoute = () => {
  const robotsTxt = `
User-agent: *
Allow: /

Sitemap: https://rwadaily.biz.id/sitemap-index.xml
`.trim();

  return new Response(robotsTxt, {
    headers: { 'Content-Type': 'text/plain' },
  });
};