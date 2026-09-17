import { useEffect, useState } from 'react'
import { createFileRoute, Link } from '@tanstack/react-router'
import { supabase } from '@/lib/supabase'

export const Route = createFileRoute('/admin/preview/$postId')({
  component: PreviewPublicacaoPage,
})

type Post = {
  id: number
  title: string
  category: string
  excerpt: string
  content: string
  cover_image: string | null
  status: 'draft' | 'published'
  published_at: string | null
  created_at: string
}

function PreviewPublicacaoPage() {
  const { postId } = Route.useParams()

  const [post, setPost] = useState<Post | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadPost() {
      const { data, error: loadError } = await supabase
        .from('posts')
        .select(
          'id, title, category, excerpt, content, cover_image, status, published_at, created_at'
        )
        .eq('id', Number(postId))
        .single()

      if (loadError || !data) {
        console.error('Erro ao carregar pré-visualização:', loadError)
        setError('Não foi possível carregar a publicação.')
        setLoading(false)
        return
      }

      setPost(data as Post)
      setLoading(false)
    }

    void loadPost()
  }, [postId])

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-cream">
        <p className="text-ink/60">
          Carregando pré-visualização...
        </p>
      </main>
    )
  }

  if (!post) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-cream">
        <p className="text-ink/60">{error}</p>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-cream">
      <div className="border-b border-gold-deep/20 bg-ink px-6 py-3 text-center text-sm text-cream">
        PRÉ-VISUALIZAÇÃO — Esta publicação ainda não está visível ao público.
      </div>

      <article className="site-container py-16">
        <div className="mx-auto max-w-4xl">
          <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
            <Link
              to="/admin"
              className="text-sm text-ink/60 transition hover:text-ink"
            >
              ← Voltar para conteúdos
            </Link>

            <Link
              to="/admin/editar/$postId"
              params={{ postId: String(post.id) }}
              className="border border-ink/20 px-5 py-2 text-sm text-ink transition hover:bg-ink hover:text-cream"
            >
              Editar publicação
            </Link>
          </div>

          <header>
            <p className="text-sm uppercase tracking-[0.18em] text-gold-deep">
              {post.category}
            </p>

            <h1 className="mt-5 max-w-3xl text-4xl font-semibold leading-tight text-ink md:text-6xl">
              {post.title}
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-ink/65">
              {post.excerpt}
            </p>
          </header>

          {post.cover_image && (
            <img
              src={post.cover_image}
              alt=""
              className="mt-10 aspect-[16/9] w-full object-cover"
            />
          )}

          <div className="mt-12 border-t border-ink/10 pt-10">
            <div className="whitespace-pre-wrap text-base leading-8 text-ink/80">
              {post.content}
            </div>
          </div>
        </div>
      </article>
    </main>
  )
}