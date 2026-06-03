// functions/[[all]].js
export async function onRequest(context) {
  // Ini akan meneruskan semua request ke Astro SSR
  return context.next();
}