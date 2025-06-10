import type { APIContext } from 'astro';

export async function GET({ site }: APIContext) {
  if (!site) {
    return new Response('Site URL not configured', { status: 500 });
  }

  const siteURL = new URL(site.toString());
  
  return new Response(
    `User-agent: *
Allow: /

# Sitemaps
Sitemap: ${new URL('sitemap.xml', siteURL).toString()}

# Prevent crawling of admin areas
Disallow: /admin/
Disallow: /api/

# Rate limiting
Crawl-delay: 10`,
    {
      headers: {
        'Content-Type': 'text/plain'
      }
    }
  );
} 