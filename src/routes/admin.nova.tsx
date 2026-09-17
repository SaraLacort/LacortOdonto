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
          className="mt-10 grid gap-8 border border-ink/10 bg-white p-8"
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
              className="w-full border border-ink/20 px-4 py-3 outline-none transition focus:border-gold-deep"
            />

            {title && (
              <p className="mt-2 text-xs text-ink/40">
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

          <div>
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
              className="w-full resize-y border border-ink/20 px-4 py-3 outline-none transition focus:border-gold-deep"
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