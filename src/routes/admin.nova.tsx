import { useState } from 'react'
import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { supabase } from '@/lib/supabase'
import { PostCoverImage } from '@/components/admin/PostCoverImage'
import { PostEditor } from '@/components/admin/PostEditor'

export const Route = createFileRoute('/admin/nova')({
  component: NovaPublicacaoPage,
})

function createSlug(value: string) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function NovaPublicacaoPage() {
  const navigate = useNavigate()

  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('Saúde Bucal')
  const [excerpt, setExcerpt] = useState('')
  const [content, setContent] = useState('')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [coverImage, setCoverImage] = useState<string | null>(null)
  const [seoTitle, setSeoTitle] = useState('')
  const [seoDescription, setSeoDescription] = useState('')
  const [coverImageAlt, setCoverImageAlt] = useState('')
  const [sources, setSources] = useState('')
  const brandName = 'Lacort Odonto'

const baseSeoTitle =
  seoTitle.trim() || title.trim()

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


  async function handleSaveDraft(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    setError('')

    if (!title.trim() || !excerpt.trim() || !content.trim()) {
      setError('Preencha título, resumo e conteúdo.')
      return
    }

    const slug = createSlug(title)

    if (!slug) {
      setError('Não foi possível gerar o endereço da publicação.')
      return
    }

    setSaving(true)

    const { error: insertError } = await supabase
      .from('posts')
      .insert({
        title: title.trim(),
        slug,
        category,
        excerpt: excerpt.trim(),
        content: content.trim(),
        cover_image: coverImage,
        seo_title: seoTitle.trim() || null,
        seo_description: seoDescription.trim() || null,
        cover_image_alt: coverImageAlt.trim() || null,
        sources: sources.trim() || null,
        status: 'draft',
        featured: false,
      })

    setSaving(false)

    if (insertError) {
      console.error('Erro ao salvar publicação:', insertError)

      if (insertError.code === '23505') {
        setError(
          'Já existe uma publicação com esse endereço. Altere um pouco o título.'
        )
        return
      }

      setError('Não foi possível salvar a publicação.')
      return
    }

    await navigate({ to: '/admin' })
  }

  return (
    <main className="min-h-screen bg-cream">
      <div className="site-container py-16">
        <Link
          to="/admin"
          className="text-sm text-ink/60 transition hover:text-ink"
        >
          ← Voltar para conteúdos
        </Link>

        <div className="mt-8 border-b border-ink/10 pb-8">
          <p className="text-sm uppercase tracking-[0.18em] text-gold-deep">
            Área administrativa
          </p>

          <h1 className="mt-3 text-4xl font-semibold text-ink">
            Nova publicação
          </h1>

          <p className="mt-3 text-ink/60">
            Crie uma matéria e salve como rascunho.
          </p>
        </div>

        <form
          onSubmit={handleSaveDraft}
         className="admin-post-form mt-10 grid min-w-0 grid-cols-[minmax(0,1fr)] gap-8 border border-ink/10 bg-white p-8"
        >
          <div>
            <label
              htmlFor="title"
              className="mb-2 block text-sm font-medium text-ink"
            >
              Título
            </label>

            <input
              id="title"
              type="text"
              required
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="Ex.: Quando é necessário fazer um implante dentário?"
              className="block w-full min-w-0 max-w-full border border-ink/20 px-4 py-3 outline-none transition focus:border-gold-deep"
            />

            {title && (
              <p className="mt-2 max-w-full break-words text-xs text-ink/40 [overflow-wrap:anywhere]">
                /noticias/{createSlug(title)}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="category"
              className="mb-2 block text-sm font-medium text-ink"
            >
              Categoria
            </label>

            <select
              id="category"
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              className="w-full border border-ink/20 bg-white px-4 py-3 outline-none transition focus:border-gold-deep"
            >
              <option>Saúde Bucal</option>
              <option>Tratamentos</option>
              <option>Dúvidas</option>
              <option>Novidades da Lacort</option>
            </select>
          </div>

<div className="min-w-0">
  <label
    htmlFor="excerpt"
    className="mb-2 block text-sm font-medium text-ink"
  >
    Resumo
  </label>

  <textarea
    id="excerpt"
    required
    rows={3}
    maxLength={300}
    value={excerpt}
    onChange={(event) => setExcerpt(event.target.value)}
    placeholder="Um pequeno resumo que aparecerá no card da matéria."
    className="block w-full min-w-0 max-w-full resize-y whitespace-pre-wrap break-words border border-ink/20 px-4 py-3 [overflow-wrap:anywhere] outline-none transition focus:border-gold-deep"
  />

  <p className="mt-2 text-xs text-ink/40">
    {excerpt.length}/300 caracteres
  </p>
</div>

<PostCoverImage
  value={coverImage}
  onChange={setCoverImage}
/>

<PostEditor
  value={content}
  onChange={setContent}
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
    value={sources}
    rows={5}
    onChange={(event) => setSources(event.target.value)}
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

<label className="grid gap-2">
  <span className="text-sm font-medium text-ink">
    Título para o Google
  </span>

<input
  type="text"
  value={seoTitle}
  maxLength={45}
  onChange={(event) =>
    setSeoTitle(event.target.value)
  }
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

    <label className="grid gap-2">
      <span className="text-sm font-medium text-ink">
        Descrição para o Google
      </span>

      <textarea
        value={seoDescription}
        maxLength={160}
        rows={3}
        onChange={(event) =>
          setSeoDescription(event.target.value)
        }
        placeholder="Resumo curto e claro do conteúdo da publicação."
        className="block w-full min-w-0 max-w-full resize-y whitespace-pre-wrap break-words rounded-md border border-black/20 bg-white px-4 py-3 [overflow-wrap:anywhere] outline-none focus:border-black/50"
/>
      <span className="text-xs text-ink/40">
        {seoDescription.length}/160 caracteres
      </span>
    </label>

    <label className="grid gap-2">
      <span className="text-sm font-medium text-ink">
        Descrição da imagem de capa
      </span>

      <input
        type="text"
        value={coverImageAlt}
        onChange={(event) =>
          setCoverImageAlt(event.target.value)
        }
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

          <div className="flex flex-wrap justify-end gap-3 border-t border-ink/10 pt-6">
            <Link
              to="/admin"
              className="border border-ink/20 px-6 py-3 text-sm font-medium text-ink"
            >
              Cancelar
            </Link>

            <button
              type="submit"
              disabled={saving}
              className="bg-ink px-6 py-3 text-sm font-medium text-cream transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {saving ? 'Salvando...' : 'Salvar rascunho'}
            </button>
          </div>
        </form>
      </div>
    </main>
  )
}