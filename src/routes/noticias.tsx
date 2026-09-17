import { useEffect, useMemo, useState } from 'react'
import { createFileRoute, Link, Outlet, useRouterState,} from '@tanstack/react-router'

import { FinalCta } from '@/components/page-elements'
import { supabase } from '@/lib/supabase'

export const Route = createFileRoute('/noticias')({
  head: () => ({
    meta: [
      {
        title:
          'Conteúdos sobre Saúde Bucal — Lacort Odontologia Especializada',
      },
      {
        name: 'description',
        content:
          'Informações sobre saúde bucal, tratamentos odontológicos, dúvidas frequentes e novidades da Lacort Odontologia Especializada.',
      },
      {
        property: 'og:title',
        content:
          'Conteúdos — Lacort Odontologia Especializada',
      },
      {
        property: 'og:description',
        content:
          'Informação clara sobre saúde bucal, tratamentos e cuidados odontológicos.',
      },
      {
        property: 'og:type',
        content: 'website',
      },
      {
        name: 'twitter:card',
        content: 'summary_large_image',
      },
    ],
  }),
  component: NoticiasPage,
})

type Post = {
  id: number
  title: string
  slug: string
  category: string
  excerpt: string
  cover_image: string | null
  featured: boolean
  published_at: string | null
  created_at: string
  read_time: number | null
}

const categories = [
  'Todos',
  'Saúde Bucal',
  'Tratamentos',
  'Dúvidas',
  'Nossas Novidades',
] as const

function NoticiasPage() {
  const [posts, setPosts] = useState<Post[]>([])
  const [selectedCategory, setSelectedCategory] =useState<(typeof categories)[number]>('Todos')
  const pathname = useRouterState({select: (state) => state.location.pathname,})
  const isNoticiasIndex = pathname === '/noticias'
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadPosts() {
      setLoading(true)
      setError('')

      const { data, error: postsError } = await supabase
        .from('posts')
        .select(
          'id, title, slug, category, excerpt, cover_image, featured, published_at, created_at, read_time'
        )
        .eq('status', 'published')
        .order('published_at', {
          ascending: false,
          nullsFirst: false,
        })

      if (postsError) {
        console.error(
          'Erro ao carregar conteúdos:',
          postsError
        )

        setError(
          'Não foi possível carregar os conteúdos no momento.'
        )

        setLoading(false)
        return
      }

      setPosts((data ?? []) as Post[])
      setLoading(false)
    }

    void loadPosts()
  }, [])

  const featuredPost = useMemo(() => {
    if (!posts.length) {
      return null
    }

    return (
      posts.find((post) => post.featured) ??
      posts[0]
    )
  }, [posts])

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      if (post.id === featuredPost?.id) {
        return false
      }

      if (selectedCategory === 'Todos') {
        return true
      }

      return post.category === selectedCategory
    })
  }, [posts, selectedCategory, featuredPost])

if (!isNoticiasIndex) {
  return <Outlet />
}

  return (
    <>
      {/* HERO */}
      <section className="border-b border-ink/10 bg-paper">
        <div className="site-container pt-16 pb-12 md:pt-20 md:pb-14">
          <p className="eyebrow">
            Informativo
          </p>

          <h1 className="mt-5 max-w-4xl text-5xl leading-[1.05] text-ink md:text-7xl">
            Conteúdos
          </h1>


        </div>
      </section>

      {/* FILTROS */}
      <section className="border-b border-ink/10 bg-cream">
        <div className="site-container">
          <div className="flex gap-2 overflow-x-auto py-4">
            {categories.map((category) => {
              const active =
                selectedCategory === category

              return (
                <button
                  key={category}
                  type="button"
                  onClick={() =>
                    setSelectedCategory(category)
                  }
                  className={
                    active
                      ? 'shrink-0 bg-ink px-5 py-2.5 text-sm text-cream'
                      : 'shrink-0 border border-ink/15 px-5 py-2.5 text-sm text-ink transition hover:border-gold-deep hover:text-gold-deep'
                  }
                >
                  {category}
                </button>
              )
            })}
          </div>
        </div>
      </section>

      {/* CONTEÚDO */}
      <section className="bg-paper py-16 md:py-24">
        <div className="site-container">

          {loading && (
            <div className="py-24 text-center">
              <p className="text-muted-foreground">
                Carregando conteúdos...
              </p>
            </div>
          )}

          {!loading && error && (
            <div className="border border-ink/10 bg-cream px-6 py-12 text-center">
              <p className="text-muted-foreground">
                {error}
              </p>
            </div>
          )}

          {!loading &&
            !error &&
            posts.length === 0 && (
              <div className="py-24 text-center">
                <p className="eyebrow">
                  Em breve
                </p>

                <h2 className="mx-auto mt-4 max-w-xl text-3xl text-ink md:text-4xl">
                  Estamos preparando novos conteúdos.
                </h2>

                <p className="mx-auto mt-5 max-w-xl leading-7 text-muted-foreground">
                  Em breve você encontrará aqui
                  informações sobre saúde bucal,
                  tratamentos e cuidados odontológicos.
                </p>
              </div>
            )}

          {!loading &&
            !error &&
            featuredPost && (
              <>
                {/* DESTAQUE */}
                <div>
                  <div className="mb-8 flex items-end justify-between gap-6">
                    <div>
                      <p className="eyebrow">
                        Em destaque
                      </p>

                      <h2 className="mt-3 text-3xl text-ink md:text-4xl">
                        Última publicação
                      </h2>
                    </div>
                  </div>

                  <article className="grid overflow-hidden border-y border-ink/10 py-8 md:grid-cols-[1.15fr_.85fr] md:gap-14 md:py-12">

                    <Link
                      to="/noticias/$slug"
                      params={{
                        slug: featuredPost.slug,
                      }}
                      className="group block"
                    >
                      {featuredPost.cover_image ? (
                        <div className="overflow-hidden bg-cream">
                          <img
                            src={
                              featuredPost.cover_image
                            }
                            alt=""
                            className="aspect-[16/10] h-full w-full object-cover transition duration-500 group-hover:scale-[1.02]"
                          />
                        </div>
                      ) : (
                        <div className="flex aspect-[16/10] items-center justify-center bg-cream">
                          <span className="text-sm uppercase tracking-[0.15em] text-ink/30">
                            Lacort Odontologia
                          </span>
                        </div>
                      )}
                    </Link>

                    <div className="flex flex-col justify-center pt-8 md:pt-0">
                      <p className="eyebrow">
                        {featuredPost.category}
                      </p>

                      <h3 className="mt-4 text-3xl leading-tight text-ink md:text-4xl lg:text-5xl">
                        <Link
                          to="/noticias/$slug"
                          params={{
                            slug:
                              featuredPost.slug,
                          }}
                          className="transition hover:text-gold-deep"
                        >
                          {featuredPost.title}
                        </Link>
                      </h3>

                      <p className="mt-6 max-w-xl text-base leading-7 text-muted-foreground md:text-lg md:leading-8">
                        {featuredPost.excerpt}
                      </p>

                      <PostMeta
                        post={featuredPost}
                      />

                      <div className="mt-8">
                        <Link
                          to="/noticias/$slug"
                          params={{
                            slug:
                              featuredPost.slug,
                          }}
                          className="inline-flex border-b border-gold-deep pb-1 text-sm font-medium text-ink transition hover:text-gold-deep"
                        >
                          Ler conteúdo →
                        </Link>
                      </div>
                    </div>
                  </article>
                </div>

                {/* MAIS RECENTES */}
                <div className="mt-20 md:mt-28">
                  <div className="border-b border-ink/10 pb-6">
                    <p className="eyebrow">
                      Conteúdos
                    </p>

                    <h2 className="mt-3 text-3xl text-ink md:text-4xl">
                      {selectedCategory ===
                      'Todos'
                        ? 'Mais recentes'
                        : selectedCategory}
                    </h2>
                  </div>

                  {filteredPosts.length >
                  0 ? (
                    <div className="grid gap-x-8 gap-y-16 pt-10 md:grid-cols-2 lg:grid-cols-3">
                      {filteredPosts.map(
                        (post) => (
                          <PostCard
                            key={post.id}
                            post={post}
                          />
                        )
                      )}
                    </div>
                  ) : (
                    <div className="py-20 text-center">
                      <p className="text-muted-foreground">
                        Ainda não há outros
                        conteúdos nesta categoria.
                      </p>
                    </div>
                  )}
                </div>
              </>
            )}
        </div>
      </section>

      <FinalCta />
    </>
  )
}

function PostCard({
  post,
}: {
  post: Post
}) {
  return (
    <article className="group">
      <Link
        to="/noticias/$slug"
        params={{ slug: post.slug }}
        className="block overflow-hidden bg-cream"
      >
        {post.cover_image ? (
          <img
            src={post.cover_image}
            alt=""
            loading="lazy"
            className="aspect-[16/10] w-full object-cover transition duration-500 group-hover:scale-[1.025]"
          />
        ) : (
          <div className="flex aspect-[16/10] items-center justify-center">
            <span className="text-xs uppercase tracking-[0.15em] text-ink/30">
              Lacort Odontologia
            </span>
          </div>
        )}
      </Link>

      <div className="border-t border-ink/10 pt-5">
        <p className="eyebrow">
          {post.category}
        </p>

        <h3 className="mt-3 text-2xl leading-snug text-ink">
          <Link
            to="/noticias/$slug"
            params={{ slug: post.slug }}
            className="transition hover:text-gold-deep"
          >
            {post.title}
          </Link>
        </h3>

        <p className="mt-4 line-clamp-3 leading-7 text-muted-foreground">
          {post.excerpt}
        </p>

        <PostMeta post={post} />

        <Link
          to="/noticias/$slug"
          params={{ slug: post.slug }}
          className="mt-5 inline-flex border-b border-gold-deep pb-1 text-sm font-medium text-ink transition hover:text-gold-deep"
        >
          Ler conteúdo →
        </Link>
      </div>
    </article>
  )
}

function PostMeta({
  post,
}: {
  post: Post
}) {
  const date =
    post.published_at ?? post.created_at

  const formattedDate =
    new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    }).format(new Date(date))

  return (
    <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground/70">
      <span>{formattedDate}</span>

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
  )
}