import { useEffect, useState } from 'react'
import {
  createFileRoute,
  Link,
} from '@tanstack/react-router'

import { FinalCta } from '@/components/page-elements'
import { supabase } from '@/lib/supabase'

export const Route = createFileRoute('/noticias/$slug')({
  component: PublicacaoPage,
})

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
  read_time: number | null
}

function PublicacaoPage() {
  const { slug } = Route.useParams()

  const [post, setPost] = useState<Post | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadPost() {
      setLoading(true)
      setError('')

      const { data, error: postError } =
        await supabase
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
              read_time
            `
          )
          .eq('slug', slug)
          .eq('status', 'published')
          .maybeSingle()

      if (postError) {
        console.error(
          'Erro ao carregar publicação:',
          postError
        )

        setError(
          'Não foi possível carregar este conteúdo.'
        )

        setLoading(false)
        return
      }

      if (!data) {
        setError(
          'Este conteúdo não foi encontrado ou não está publicado.'
        )

        setLoading(false)
        return
      }

      setPost(data as Post)
      setLoading(false)
    }

    void loadPost()
  }, [slug])

  if (loading) {
    return (
      <main className="min-h-[70vh] bg-paper">
        <div className="site-container flex min-h-[70vh] items-center justify-center">
          <p className="text-muted-foreground">
            Carregando conteúdo...
          </p>
        </div>
      </main>
    )
  }

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
    post.published_at ?? post.created_at

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

            <div className="mx-auto mt-12 max-w-4xl text-center">
              <p className="eyebrow">
                {post.category}
              </p>

              <h1 className="mt-5 text-4xl leading-[1.08] text-ink md:text-6xl">
                {post.title}
              </h1>

              <p className="mx-auto mt-7 max-w-3xl text-lg leading-8 text-muted-foreground md:text-xl">
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
        <article className="site-container py-16 md:py-24">
          <div className="mx-auto max-w-3xl">
          <article className="article-content"dangerouslySetInnerHTML={{__html: post.content, }} />

            <div className="mt-16 border-t border-ink/10 pt-8">
              <p className="text-sm leading-7 text-muted-foreground">
                Este conteúdo tem caráter informativo e
                não substitui uma avaliação odontológica
                individualizada.
              </p>

              <Link
                to="/noticias"
                className="mt-7 inline-flex border-b border-gold-deep pb-1 text-sm font-medium text-ink transition hover:text-gold-deep"
              >
                ← Ver todos os conteúdos
              </Link>
            </div>
          </div>
        </article>

      </main>

      <FinalCta />
    </>
  )
}