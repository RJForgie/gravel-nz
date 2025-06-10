import type { APIContext } from 'astro';

export async function GET({ site }: APIContext) {
  if (!site) {
    return new Response('Site URL not configured', { status: 500 });
  }

  const siteURL = new URL(site.toString());
  
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <!-- Home page -->
      <url>
        <loc>${siteURL.toString()}</loc>
        <changefreq>daily</changefreq>
        <priority>1.0</priority>
      </url>
    </urlset>`,
    {
      headers: {
        'Content-Type': 'application/xml'
      }
    }
  );
} 