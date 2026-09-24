import { useEffect, useRef, useState } from 'react'
import { createFileRoute, Link, useNavigate,} from '@tanstack/react-router'
import { PostEditor } from '@/components/admin/PostEditor'
import { PostCoverImage } from '@/components/admin/PostCoverImage'
import { supabase } from '@/lib/supabase'

export const Route = createFileRoute('/admin/editar/$postId')({
  component: EditarPublicacaoPage,
})

type PostForm = {
  title: string
  slug: string
  category: string
  excerpt: string
  content: string
  status: 'draft' | 'published'
  published_at: string | null
  cover_image: string | null
  sources: string | null
  seo_title: string | null
  seo_description: string | null
  cover_image_alt: string | null
}

function createSlug(value: string) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function EditarPublicacaoPage() {
  const { postId } = Route.useParams()
  const navigate = useNavigate()

  const [post, setPost] = useState<PostForm | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)

  const isSavingRef = useRef(false)

  const brandName = 'Lacort Odonto'

const baseSeoTitle =
  post?.seo_title?.trim() ||
  post?.title?.trim() ||
  ''

const alreadyHasBrand =
  baseSeoTitle.toLowerCase().includes('lacort')

const finalSeoTitle =
  baseSeoTitle
    ? alreadyHasBrand
      ? baseSeoTitle
      : `${baseSeoTitle} | ${brandName}`
    : ''

const finalSeoTitleLength =
  finalSeoTitle.length

  // Protege contra fechar a aba, atualizar a página
  // ou sair pelo próprio navegador com alterações não salvas.
  useEffect(() => {
    function handleBeforeUnload(event: BeforeUnloadEvent) {
      if (!hasUnsavedChanges || isSavingRef.current) {
        return
      }

      event.preventDefault()
      event.returnValue = ''
    }

    window.addEventListener('beforeunload', handleBeforeUnload)

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
    }
  }, [hasUnsavedChanges])

  // Carrega a publicação.
  useEffect(() => {
    async function loadPost() {
      const { data, error: loadError } = await supabase
        .from('posts')
        .select(
          'title, slug, category, excerpt, content, status, published_at, cover_image, cover_image_alt, seo_title, seo_description, sources'
        )
        .eq('id', Number(postId))
        .single()

      if (loadError || !data) {
        console.error('Erro ao carregar publicação:', loadError)
        setError('Não foi possível carregar esta publicação.')
        setLoading(false)
        return
      }

      setPost(data as PostForm)
      setHasUnsavedChanges(false)
      setLoading(false)
    }

    void loadPost()
  }, [postId])

  async function save(status: 'draft' | 'published') {
    if (!post) {
      return
    }

    if (
      !post.title.trim() ||
      !post.excerpt.trim() ||
      !post.content.trim()
    ) {
      setError('Preencha título, resumo e conteúdo.')
      return
    }

    setSaving(true)
    setError('')
    isSavingRef.current = true

    const { error: updateError } = await supabase
      .from('posts')
    .update({
     title: post.title.trim(),
     slug: createSlug(post.title),
     category: post.category,
     excerpt: post.excerpt.trim(),
     content: post.content.trim(),
     cover_image: post.cover_image,
     cover_image_alt:
      post.cover_image_alt?.trim() || null,
     seo_title:
      post.seo_title?.trim() || null,
     seo_description:
      post.seo_description?.trim() || null,

      sources:
  post.sources?.trim() || null,
 
        status,

      published_at:
    status === 'published'
      ? post.published_at ?? new Date().toISOString()
      : null,
})

.eq('id', Number(postId))

    if (updateError) {
      console.error(
        'Erro ao atualizar publicação:',
        updateError
      )

      setError('Não foi possível salvar a publicação.')
      setSaving(false)
      isSavingRef.current = false
      return
    }

    setHasUnsavedChanges(false)
    setSaving(false)
    isSavingRef.current = false

    await navigate({ to: '/admin' })
  }

  function handleBack() {
    if (
      hasUnsavedChanges &&
      !window.confirm(
        'Você possui alterações não salvas. Deseja sair sem salvar?'
      )
    ) {
      return
    }

    void navigate({ to: '/admin' })
  }

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-cream">
        <p className="text-ink/60">
          Carregando publicação...
        </p>
      </main>
    )
  }

  if (!post) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-cream">
        <p className="text-ink/60">
          {error}
        </p>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-cream">
      <div className="site-container py-16">
        <button
          type="button"
          onClick={handleBack}
          className="text-sm text-ink/60 transition hover:text-ink"
        >
          ← Voltar para conteúdos
        </button>

        <div className="mt-8 border-b border-ink/10 pb-8">
          <p className="text-sm uppercase tracking-[0.18em] text-gold-deep">
            Área administrativa
          </p>

          <h1 className="mt-3 text-4xl font-semibold text-ink">
            Editar publicação
          </h1>

          {hasUnsavedChanges && (
            <p className="mt-3 text-sm text-gold-deep">
              ● Alterações não salvas
            </p>
          )}
        </div>

        <div className="admin-post-form mt-10 grid min-w-0 grid-cols-[minmax(0,1fr)] gap-8 border border-ink/10 bg-white p-8">
          <div>
            <label
              htmlFor="edit-title"
              className="mb-2 block text-sm font-medium text-ink"
            >
              Título
            </label>

            <input
              id="edit-title"
              value={post.title}
              onChange={(event) => {
                setPost({
                  ...post,
                  title: event.target.value,
                })

                setHasUnsavedChanges(true)
              }}
              className="block w-full min-w-0 max-w-full border border-ink/20 px-4 py-3 outline-none focus:border-gold-deep"
            />

            <p className="mt-2 max-w-full break-words text-xs text-ink/40 [overflow-wrap:anywhere]">
              /noticias/{createSlug(post.title)}
            </p>
          </div>

          <div>
            <label
              htmlFor="edit-category"
              className="mb-2 block text-sm font-medium text-ink"
            >
              Categoria
            </label>

            <select
              id="edit-category"
              value={post.category}
              onChange={(event) => {
                setPost({
                  ...post,
                  category: event.target.value,
                })

                setHasUnsavedChanges(true)
              }}
              className="block w-full min-w-0 max-w-full border border-ink/20 bg-white px-4 py-3 outline-none focus:border-gold-deep"
            >
              <option>Saúde Bucal</option>
              <option>Tratamentos</option>
              <option>Dúvidas</option>
              <option>Novidades da Lacort</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="edit-excerpt"
              className="mb-2 block text-sm font-medium text-ink"
            >
              Resumo
            </label>

            <textarea
              id="edit-excerpt"
              rows={3}
              maxLength={300}
              value={post.excerpt}
              onChange={(event) => {
                setPost({
                  ...post,
                  excerpt: event.target.value,
                })

                setHasUnsavedChanges(true)
              }}
              className="block w-full min-w-0 max-w-full resize-y whitespace-pre-wrap break-words border border-ink/20 px-4 py-3 [overflow-wrap:anywhere] outline-none focus:border-gold-deep"
            />

            <p className="mt-2 text-xs text-ink/40">
              {post.excerpt.length}/300 caracteres
            </p>
          </div>

          <PostCoverImage
            value={post.cover_image}
            onChange={(url) => {
              setPost({
                ...post,
                cover_image: url,
              })

              setHasUnsavedChanges(true)
            }}
          />

          
          <PostEditor 
          value={post.content} onChange={(html) => { setPost({...post, content: html, })
            setHasUnsavedChanges(true)
            }}
            />
            
            {/* =====================================================
    FONTES E REFERÊNCIAS
    ===================================================== */}

<div className="min-w-0 border-t border-black/10 pt-8">
  <div className="mb-4">
    <p className="text-sm font-semibold text-ink">
      Fontes e referências
    </p>

    <p className="mt-1 text-xs leading-5 text-ink/45">
      Informe as fontes utilizadas na elaboração do conteúdo.
      Digite uma referência por linha.
    </p>
  </div>

  <textarea
    value={post.sources ?? ''}
    rows={5}
    onChange={(event) => {
      setPost({
        ...post,
        sources: event.target.value,
      })

      setHasUnsavedChanges(true)
    }}
    placeholder={`Ex.:
Ministério da Saúde. Título da publicação.
Sociedade Brasileira de Periodontologia. Título da diretriz.
https://exemplo.com.br`}
    className="block w-full min-w-0 max-w-full resize-y whitespace-pre-wrap break-words rounded-md border border-black/20 bg-white px-4 py-3 text-sm leading-7 [overflow-wrap:anywhere] outline-none focus:border-gold-deep"
  />

  <p className="mt-2 text-xs leading-5 text-ink/40">
    Campo opcional. O bloco de referências só aparecerá no artigo quando houver conteúdo preenchido.
  </p>
</div>

            {/* =====================================================
    SEO E GOOGLE
    ===================================================== */}

<div className="border-t border-black/10 pt-8">
  <div className="mb-6">
    <p className="text-sm font-semibold text-ink">
      SEO e Google
    </p>

    <p className="mt-1 text-xs leading-5 text-ink/45">
      Essas informações ajudam a apresentar a publicação
      corretamente nos mecanismos de busca.
    </p>
  </div>

  <div className="grid gap-6">

    {/* TÍTULO SEO */}
<label className="grid gap-2">
  <span className="text-sm font-medium text-ink">
    Título para o Google
  </span>

 <input
  type="text"
  value={post.seo_title ?? ''}
  maxLength={45}
  onChange={(event) => {
    setPost({
      ...post,
      seo_title: event.target.value,
    })

    setHasUnsavedChanges(true)
  }}
  placeholder="Se ficar vazio, será usado o título da publicação."
  className="block w-full min-w-0 max-w-full rounded-md border border-black/20 bg-white px-4 py-3 outline-none focus:border-black/50"
/>


  <span className="text-xs leading-5 text-ink/40">
    Se ficar vazio, o título normal da publicação será usado.
    A marca Lacort é acrescentada automaticamente quando necessário.
  </span>

  {finalSeoTitle && (
    <div className="mt-2 rounded-md border border-black/10 bg-cream/50 px-4 py-3">
      <p className="text-xs font-medium text-ink/50">
        Prévia do título final
      </p>

      <p className="mt-1 max-w-full break-words text-sm leading-6 text-ink [overflow-wrap:anywhere]">
        {finalSeoTitle}
      </p>

      <p
        className={`mt-2 text-xs ${
          finalSeoTitleLength > 60
            ? 'text-amber-700'
            : 'text-ink/40'
        }`}
      >
        {finalSeoTitleLength} caracteres
        {finalSeoTitleLength > 60
          ? ' — o título está longo e pode ser exibido de forma reduzida nos resultados de busca.'
          : ''}
      </p>
    </div>
  )}
</label>

    {/* DESCRIÇÃO SEO */}
    <label className="grid gap-2">
      <span className="text-sm font-medium text-ink">
        Descrição para o Google
      </span>

      <textarea
        value={post.seo_description ?? ''}
        maxLength={160}
        rows={3}
        onChange={(event) => {
          setPost({
            ...post,
            seo_description: event.target.value,
          })

          setHasUnsavedChanges(true)
        }}
        placeholder="Resumo curto e claro do conteúdo da publicação."
        className="block w-full min-w-0 max-w-full resize-y whitespace-pre-wrap break-words rounded-md border border-black/20 bg-white px-4 py-3 [overflow-wrap:anywhere] outline-none focus:border-black/50"
      />

      <span className="text-xs text-ink/40">
        {(post.seo_description ?? '').length}/160 caracteres
      </span>
    </label>


    {/* ALT DA IMAGEM */}
    <label className="grid gap-2">
      <span className="text-sm font-medium text-ink">
        Descrição da imagem de capa
      </span>

      <input
        type="text"
        value={post.cover_image_alt ?? ''}
        onChange={(event) => {
          setPost({
            ...post,
            cover_image_alt: event.target.value,
          })

          setHasUnsavedChanges(true)
        }}
        placeholder="Ex.: Atendimento odontológico na Lacort Odontologia Especializada"
        className="block w-full min-w-0 max-w-full rounded-md border border-black/20 bg-white px-4 py-3 outline-none focus:border-black/50"
      />

      <span className="text-xs leading-5 text-ink/40">
        Descreva brevemente o que aparece na imagem.
      </span>
    </label>

  </div>
</div>

          {error && (
            <p className="border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </p>
          )}

          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-ink/10 pt-6">
            <div className="text-xs text-ink/45">
              {post.status === 'published'
                ? 'Esta publicação está publicada.'
                : 'Esta publicação é um rascunho.'}
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                disabled={saving}
                onClick={() => void save('draft')}
                className="border border-ink/20 px-6 py-3 text-sm font-medium text-ink transition hover:border-ink/50 disabled:opacity-50"
              >
                Salvar rascunho
              </button>

              <button
                type="button"
                disabled={saving}
                onClick={() => void save('published')}
                className="bg-ink px-6 py-3 text-sm font-medium text-cream transition hover:opacity-90 disabled:opacity-50"
              >
                {saving ? 'Salvando...' : 'Publicar'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}