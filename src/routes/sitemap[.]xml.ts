import { createFileRoute } from '@tanstack/react-router'
import { supabase } from '@/lib/supabase'

const SITE_URL = 'https://lacortodonto.com.br'

type SitemapPost = {
  slug: string
  updated_at: string
}

function escapeXml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

export const Route = createFileRoute('/sitemap.xml')({
  server: {
    handlers: {
      GET: async () => {
        const { data, error } = await supabase
          .from('posts')
          .select('slug, updated_at')
          .eq('status', 'published')
          .order('published_at', {
            ascending: false,
          })

        if (error) {
          console.error(
            'Erro ao gerar sitemap:',
            error
          )
        }

        const posts =
          (data ?? []) as SitemapPost[]

        const staticPages = [
          '/',
          '/sobre',
          '/tratamentos',
          '/pacientes',
          '/noticias',
          '/artigos-cientificos',
          '/contato',
          '/politica-de-privacidade',
          '/termos-de-uso',
        ]

        const staticUrls = staticPages
          .map(
            (path) => `
  <url>
    <loc>${escapeXml(`${SITE_URL}${path}`)}</loc>
  </url>`
          )
          .join('')

        const postUrls = posts
          .map(
            (post) => `
  <url>
    <loc>${escapeXml(
      `${SITE_URL}/noticias/${post.slug}`
    )}</loc>
    <lastmod>${new Date(
      post.updated_at
    ).toISOString()}</lastmod>
  </url>`
          )
          .join('')

        const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticUrls}
${postUrls}
</urlset>`

        return new Response(sitemap, {
          status: 200,

          headers: {
            'Content-Type':
              'application/xml; charset=utf-8',

            'Cache-Control':
              'public, max-age=3600',
          },
        })
      },
    },
  },
})