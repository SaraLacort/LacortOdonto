import { useEffect, useState } from 'react'
import { createFileRoute, Link, Outlet, useRouterState } from '@tanstack/react-router'
import { supabase } from '@/lib/supabase'

export const Route = createFileRoute('/admin')({
  component: AdminPage,
})

type Post = {
  id: number
  title: string
  slug: string
  category: string
  status: 'draft' | 'published'
  featured: boolean
  created_at: string
  updated_at: string
  published_at: string | null
}

function AdminPage() {
const pathname = useRouterState({
  select: (state) => state.location.pathname,
})

const isAdminIndex = pathname === '/admin'

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [checkingSession, setCheckingSession] = useState(true)
  const [isAdmin, setIsAdmin] = useState(false)
  const [posts, setPosts] = useState<Post[]>([])
  const [loadingPosts, setLoadingPosts] = useState(false)

useEffect(() => {
  async function checkSession() {
    try {
      const {
        data: { session },
        error: sessionError,
      } = await supabase.auth.getSession()

      if (sessionError) {
        console.error('Erro ao verificar sessão:', sessionError)
        return
      }

      if (!session?.user) {
        return
      }

      const { data: adminData, error: adminError } = await supabase
        .from('admins')
        .select('user_id')
        .eq('user_id', session.user.id)
        .maybeSingle()

      if (adminError) {
        console.error('Erro ao verificar administrador:', adminError)
        return
      }

      if (!adminData) {
        return
      }

      setIsAdmin(true)

      const { data: postsData, error: postsError } = await supabase
        .from('posts')
        .select(
          'id, title, slug, category, status, featured, created_at, updated_at, published_at'
        )
        .order('created_at', { ascending: false })

      if (postsError) {
        console.error('Erro ao carregar posts:', postsError)
        return
      }

      setPosts((postsData ?? []) as Post[])
    } catch (err) {
      console.error('Erro inesperado no painel:', err)
    } finally {
      setLoadingPosts(false)
      setCheckingSession(false)
    }
  }

  setLoadingPosts(true)
  void checkSession()
}, [pathname])

  async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    setLoading(true)
    setError('')

    const { error: loginError } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      })

    if (loginError) {
      setError('E-mail ou senha incorretos.')
      setLoading(false)
      return
    }

    setLoading(false)
    window.location.reload()
  }

if (checkingSession) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-cream">
      <p className="text-ink/60">Verificando acesso...</p>
    </main>
  )
}

if (isAdmin) {

if (!isAdminIndex) {
  return <Outlet />
}

  return (
    <main className="min-h-screen bg-cream">
      <div className="site-container py-16">
        <div className="flex flex-wrap items-end justify-between gap-6 border-b border-ink/10 pb-8">
          <div>
            <p className="text-sm uppercase tracking-[0.18em] text-gold-deep">
              Área administrativa
            </p>

            <h1 className="mt-3 text-4xl font-semibold text-ink">
              Conteúdos
            </h1>

            <p className="mt-3 text-ink/60">
              Gerencie as matérias publicadas no site.
            </p>
          </div>

            <Link
               to="/admin/nova" className="bg-ink px-6 py-3 font-medium text-cream transition hover:opacity-90">
              + Nova publicação
              </Link>
        </div>

        <section className="py-10">
          {loadingPosts ? (
            <p className="text-ink/60">
              Carregando publicações...
            </p>
          ) : posts.length === 0 ? (
            <div className="border border-ink/10 bg-white p-10">
              <h2 className="text-xl font-semibold text-ink">
                Nenhuma publicação ainda
              </h2>

              <p className="mt-2 text-ink/60">
                Sua primeira matéria aparecerá aqui.
              </p>
            </div>
          ) : (
            <div className="grid gap-4">
              {posts.map((post) => (
                <article
                  key={post.id}
                  className="flex flex-wrap items-center justify-between gap-5 border border-ink/10 bg-white p-6"
                >
                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="text-xs uppercase tracking-[0.14em] text-gold-deep">
                        {post.category}
                      </span>

                      <span className="text-xs text-ink/40">
                        {post.status === 'published'
                          ? 'Publicado'
                          : 'Rascunho'}
                      </span>
                    </div>

                    <h2 className="mt-2 text-xl font-semibold text-ink">
                      {post.title}
                    </h2>
                  </div>

<div className="flex flex-wrap gap-2">
  <Link
    to="/admin/preview/$postId"
    params={{ postId: String(post.id) }}
    className="border border-ink/20 px-5 py-2 text-sm text-ink transition hover:bg-ink hover:text-cream"
  >
    Pré-visualizar
  </Link>

  <Link
    to="/admin/editar/$postId"
    params={{ postId: String(post.id) }}
    className="border border-ink/20 px-5 py-2 text-sm text-ink transition hover:bg-ink hover:text-cream"
  >
    Editar
  </Link>
</div>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  )
}
  return (
    <main className="min-h-screen bg-cream">
      <div className="site-container flex min-h-screen items-center justify-center py-20">
        <div className="w-full max-w-md">
          <p className="text-sm uppercase tracking-[0.18em] text-gold-deep">
            Área administrativa
          </p>

          <h1 className="mt-4 text-4xl font-semibold text-ink">
            Painel Lacort
          </h1>

          <p className="mt-3 text-sm text-ink/60">
            Entre para gerenciar os conteúdos do site.
          </p>

          <form
            onSubmit={handleLogin}
            className="mt-10 grid gap-5"
          >
            <div>
              <label
                htmlFor="admin-email"
                className="mb-2 block text-sm font-medium text-ink"
              >
                E-mail
              </label>

              <input
                id="admin-email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="w-full border border-ink/20 bg-white px-4 py-3 outline-none transition focus:border-gold-deep"
              />
            </div>

            <div>
              <label
                htmlFor="admin-password"
                className="mb-2 block text-sm font-medium text-ink"
              >
                Senha
              </label>

              <input
                id="admin-password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="w-full border border-ink/20 bg-white px-4 py-3 outline-none transition focus:border-gold-deep"
              />
            </div>

            {error && (
              <p className="text-sm text-red-700">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="bg-ink px-6 py-3 font-medium text-cream transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? 'Entrando...' : 'Entrar'}
            </button>
          </form>
        </div>
      </div>
    </main>
  )
}