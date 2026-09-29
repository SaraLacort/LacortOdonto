import { useEffect, useMemo, useState } from 'react'
import { createFileRoute, Link, Outlet, useRouterState,} from '@tanstack/react-router'

import { FinalCta } from '@/components/page-elements'
import { supabase } from '@/lib/supabase'

export const Route = createFileRoute('/noticias')({
head: () => ({
  meta: [
    {
      title: "Saúde Bucal e Odontologia | Lacort Odonto",
    },
    {
      name: "description",
      content:
        "Conteúdos sobre saúde bucal, tratamentos odontológicos, prevenção e dúvidas frequentes preparados pela Lacort Odonto.",
    },

    // Open Graph
    {
      property: "og:title",
      content: "Saúde Bucal e Odontologia | Lacort Odonto",
    },
    {
      property: "og:description",
      content:
        "Informações sobre saúde bucal, tratamentos, prevenção e cuidados odontológicos.",
    },
    {
      property: "og:type",
      content: "website",
    },
    {
      property: "og:url",
      content: "https://lacortodonto.com.br/noticias",
    },

    // Twitter
    {
      name: "twitter:card",
      content: "summary_large_image",
    },
    {
      name: "twitter:title",
      content: "Saúde Bucal e Odontologia | Lacort Odonto",
    },
    {
      name: "twitter:description",
      content:
        "Informações sobre saúde bucal, tratamentos, prevenção e cuidados odontológicos.",
    },
  ],

  links: [
    {
      rel: "canonical",
      href: "https://lacortodonto.com.br/noticias",
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
  cover_image_alt: string | null
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
  'Atualidades',
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
          'id, title, slug, category, excerpt, cover_image, cover_image_alt, featured, published_at, created_at, read_time'
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

const categoryPosts = useMemo(() => {
  if (selectedCategory === 'Todos') {
    return posts
  }

  return posts.filter(
    (post) => post.category === selectedCategory
  )
}, [posts, selectedCategory])

const featuredPost = useMemo(() => {
  if (!categoryPosts.length) {
    return null
  }

  // Em "Todos", respeita um artigo marcado como destaque.
  // Nas categorias, mostra o artigo mais recente daquela categoria.
  if (selectedCategory === 'Todos') {
    return (
      categoryPosts.find((post) => post.featured) ??
      categoryPosts[0]
    )
  }

  return categoryPosts[0]
}, [categoryPosts, selectedCategory])

const filteredPosts = useMemo(() => {
  if (!featuredPost) {
    return []
  }

  return categoryPosts.filter(
    (post) => post.id !== featuredPost.id
  )
}, [categoryPosts, featuredPost])

if (!isNoticiasIndex) {
  return <Outlet />
}

  return (
    <>
{/* HERO + ARTIGO MAIS RECENTE */}
<section className="border-b border-ink/10 bg-paper">
  <div className="site-container py-14 md:py-20">

    {/* CABEÇALHO */}
    <div className="max-w-3xl">

      <h1 className="mt-4 text-5xl leading-[1.05] text-ink md:text-7xl">
        Conteúdos
      </h1>

      <p className="mt-6 max-w-2xl text-base leading-7 text-muted-foreground md:text-lg md:leading-8">
        Informações para ajudar você a entender melhor sua saúde
        bucal, tratamentos e cuidados odontológicos.
      </p>
    </div>

    {/* FILTROS */}
    <div className="mt-9 flex flex-wrap gap-2 md:mt-10">
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
                ? 'rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-cream transition'
                : 'rounded-full border border-ink/15 bg-transparent px-5 py-2.5 text-sm font-medium text-ink/70 transition hover:border-gold-deep hover:text-gold-deep'
            }
          >
            {category}
          </button>
        )
      })}
    </div>

    {/* ARTIGO MAIS RECENTE */}
    {featuredPost && (
      <article className="mt-12 grid border-t border-ink/10 pt-10 md:mt-14 md:grid-cols-[1.08fr_.92fr] md:items-center md:gap-14 md:pt-14">

        {/* IMAGEM */}
        <Link
          to="/noticias/$slug"
          params={{ slug: featuredPost.slug }}
          className="block overflow-hidden rounded-2xl bg-cream"
        >
          {featuredPost.cover_image ? (
            <img
              src={featuredPost.cover_image}
              alt={
                featuredPost.cover_image_alt ||
                featuredPost.title
              }
              className="aspect-[16/9] h-full w-full object-cover transition duration-500 hover:scale-[1.02]"
            />
          ) : (
            <div className="aspect-[16/9] w-full bg-cream" />
          )}
        </Link>

        {/* TEXTO */}
        <div className="mt-8 md:mt-0">
          <p className="eyebrow">
            {featuredPost.category}
          </p>

          <h2 className="mt-4 text-3xl leading-tight text-ink md:text-4xl">
            <Link
              to="/noticias/$slug"
              params={{ slug: featuredPost.slug }}
              className="transition hover:text-gold-deep"
            >
              {featuredPost.title}
            </Link>
          </h2>

          <p className="mt-5 max-w-xl text-base leading-7 text-muted-foreground">
            {featuredPost.excerpt}
          </p>

          <Link
            to="/noticias/$slug"
            params={{ slug: featuredPost.slug }}
            className="mt-7 inline-flex border-b border-gold-deep pb-1 text-sm font-medium text-ink transition hover:text-gold-deep"
          >
            Ler conteúdo →
          </Link>
        </div>

      </article>
    )}

  </div>
</section>

      {/* CONTEÚDO */}
      <section className="bg-paper py-10 md:py-14">
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
                {/* MAIS RECENTES */}
                <div className="mt-6 md:mt-10">
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
           alt={post.cover_image_alt || post.title}
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