import {
  createFileRoute,
  Link,
} from '@tanstack/react-router'

import { FinalCta } from '@/components/page-elements'
import { supabase } from '@/lib/supabase'

type Post = {
  id: number
  title: string
  slug: string
  category: string
  excerpt: string
  content: string
  cover_image: string | null
  cover_image_alt: string | null
  published_at: string | null
  created_at: string
  updated_at: string
  read_time: number | null
  seo_title: string | null
  seo_description: string | null
  sources: string | null
}

function buildSeoTitle(post: Post) {
  const baseTitle =
    post.seo_title?.trim() ||
    post.title.trim()

  const alreadyHasBrand =
    baseTitle.toLowerCase().includes('lacort')

  return alreadyHasBrand
    ? baseTitle
    : `${baseTitle} | Lacort Odonto`
}

export const Route = createFileRoute('/noticias/$slug')({
  loader: async ({ params }) => {
    const { data, error } = await supabase
      .from('posts')
      .select(
        `
          id,
          title,
          slug,
          category,
          excerpt,
          content,
          cover_image,
          cover_image_alt,
          published_at,
          created_at,
          updated_at,
          read_time,
          seo_title,
          seo_description,
          sources
        `
      )
      .eq('slug', params.slug)
      .eq('status', 'published')
      .maybeSingle()

    if (error) {
      console.error(
        'Erro ao carregar publicação:',
        error
      )

      return {
        post: null as Post | null,
        error:
          'Não foi possível carregar este conteúdo.',
      }
    }

    if (!data) {
      return {
        post: null as Post | null,
        error:
          'Este conteúdo não foi encontrado ou não está publicado.',
      }
    }

    return {
      post: data as Post,
      error: '',
    }
  },

  head: ({ loaderData }) => {
    const post = loaderData?.post

    if (!post) {
      return {
        meta: [
          {
            title:
              'Conteúdo não encontrado | Lacort Odonto ',
          },
          {
            name: 'robots',
            content: 'noindex, nofollow',
          },
        ],
      }
    }

    const seoTitle = buildSeoTitle(post)

    const seoDescription =
      post.seo_description?.trim() ||
      post.excerpt.trim()

    const canonicalUrl =
      `https://lacortodonto.com.br/noticias/${post.slug}`

      const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',

  headline: seoTitle,
  description: seoDescription,

  url: canonicalUrl,

  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': canonicalUrl,
  },

  datePublished:
    post.published_at ??
    post.created_at,

  dateModified:
    post.updated_at,

  author: {
    '@type': 'Person',
    name: 'Dra. Sara Lacort',
  },

  publisher: {
    '@type': 'Organization',
    name: 'Lacort Odonto',
    url: 'https://lacortodonto.com.br',
  },

  ...(post.cover_image
    ? {
        image: [post.cover_image],
      }
    : {}),
}

    const meta = [
      {
        title: seoTitle,
      },
      {
        name: 'description',
        content: seoDescription,
      },
      {
        property: 'og:title',
        content: seoTitle,
      },
      {
        property: 'og:description',
        content: seoDescription,
      },
      {
        property: 'og:type',
        content: 'article',
      },
      {
        property: 'og:url',
        content: canonicalUrl,
      },
      {
        name: 'twitter:card',
        content: 'summary_large_image',
      },
      {
        name: 'twitter:title',
        content: seoTitle,
      },
      {
        name: 'twitter:description',
        content: seoDescription,
      },
    ]

    if (post.cover_image) {
      meta.push(
        {
          property: 'og:image',
          content: post.cover_image,
        },
        {
          name: 'twitter:image',
          content: post.cover_image,
        }
      )
    }

return {
  meta,

  links: [
    {
      rel: 'canonical',
      href: canonicalUrl,
    },
  ],

  scripts: [
    {
      type: 'application/ld+json',
      children: JSON.stringify(articleSchema),
      },
    ],
   }
  },

  component: PublicacaoPage,
})

function PublicacaoPage() {
  const { post, error } =
    Route.useLoaderData()

  if (!post) {
    return (
      <>
        <main className="min-h-[65vh] bg-paper">
          <div className="site-container py-24 text-center md:py-32">
            <p className="eyebrow">
              Conteúdo
            </p>

            <h1 className="mx-auto mt-5 max-w-2xl text-4xl leading-tight text-ink md:text-5xl">
              Conteúdo não encontrado
            </h1>

            <p className="mx-auto mt-5 max-w-xl leading-7 text-muted-foreground">
              {error}
            </p>

            <Link
              to="/noticias"
              className="mt-8 inline-flex border-b border-gold-deep pb-1 text-sm font-medium text-ink transition hover:text-gold-deep"
            >
              ← Voltar para conteúdos
            </Link>
          </div>
        </main>

        <FinalCta />
      </>
    )
  }


  const publicationDate =
    post.published_at ??
    post.created_at

  const formattedDate =
    new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    }).format(new Date(publicationDate))

return (
  <>


    <main className="bg-paper">

        {/* CABEÇALHO */}
        <section className="border-b border-ink/10">
          <div className="site-container py-16 md:py-24">
            <Link
              to="/noticias"
              className="text-sm text-ink/50 transition hover:text-gold-deep"
            >
              ← Conteúdos
            </Link>

            <div className="mx-auto mt-12 min-w-0 max-w-4xl overflow-hidden text-center">
              <p className="eyebrow">
                {post.category}
              </p>

              <h1 className="mt-5 max-w-full break-words text-4xl leading-[1.08] text-ink [overflow-wrap:anywhere] md:text-6xl">
                {post.title}
              </h1>

              <p className="mx-auto mt-7 max-w-3xl break-words text-lg leading-8 text-muted-foreground [overflow-wrap:anywhere] md:text-xl">
                {post.excerpt}
              </p>

              <div className="mt-7 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-xs text-muted-foreground/70">
                <span>
                  {formattedDate}
                </span>

                {post.read_time && (
                  <>
                    <span aria-hidden="true">
                      ·
                    </span>

                    <span>
                      {post.read_time} min de leitura
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* IMAGEM DE CAPA */}
        {post.cover_image && (
          <section className="site-container pt-10 md:pt-14">
            <div className="mx-auto max-w-6xl overflow-hidden bg-cream">
              <img
                src={post.cover_image}
                alt={
                  post.cover_image_alt ||
                  post.title
                }
                className="aspect-[16/8] w-full object-cover"
              />
            </div>
          </section>
        )}

        {/* ARTIGO */}
<article className="site-container min-w-0 overflow-hidden py-16 md:py-24">
  <div className="mx-auto min-w-0 max-w-3xl overflow-hidden">

    <div
      className="article-content min-w-0 max-w-full overflow-hidden [overflow-wrap:anywhere] [word-break:break-word]"
      dangerouslySetInnerHTML={{
        __html: post.content,
      }}
    />

{/* RODAPÉ EDITORIAL DO ARTIGO */}
<footer className="mt-16 border-t border-ink/10 pt-10">

  {/* FONTES E REFERÊNCIAS */}
  {post.sources?.trim() && (
    <section className="border-l-2 border-gold-deep bg-cream/50 px-6 py-6 md:px-8">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gold-deep">
        Fontes e referências
      </p>

      <div className="mt-5 grid gap-3">
        {post.sources
          .split('\n')
          .map((source) => source.trim())
          .filter(Boolean)
          .map((source, index) => (
            <p
              key={`${source}-${index}`}
              className="max-w-full break-words text-sm leading-7 text-ink/60 [overflow-wrap:anywhere]"
            >
              {source}
            </p>
          ))}
      </div>
    </section>
  )}

  {/* AVISO INFORMATIVO */}
  <div
    className={
      post.sources?.trim()
        ? 'mt-10'
        : ''
    }
  >
    <p className="text-sm leading-7 text-muted-foreground">
      Este conteúdo foi elaborado para fins educativos e
      informativos. As informações apresentadas não substituem
      avaliação odontológica individualizada, diagnóstico ou
      plano de tratamento.
    </p>
  </div>

  {/* RESPONSABILIDADE */}
  <div className="mt-6 text-sm leading-7 text-ink/50">
    <p className="font-medium text-ink/70">
      Lacort Odontologia Especializada
    </p>

    <p>
      Conteúdo produzido sob responsabilidade técnica da clínica.
    </p>
  </div>

  {/* VOLTAR */}
  <div className="mt-10 border-t border-ink/10 pt-7">
    <Link
      to="/noticias"
      className="inline-flex border-b border-gold-deep pb-1 text-sm font-medium text-ink transition hover:text-gold-deep"
    >
      ← Ver todos os conteúdos
    </Link>
  </div>

</footer>

          </div>
        </article>

      </main>

      <FinalCta />
    </>
  )
}