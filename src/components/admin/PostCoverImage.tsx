import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { ImagePlus, Trash2, Upload } from 'lucide-react'

type PostCoverImageProps = {
  value: string | null
  onChange: (url: string | null) => void
}

const ALLOWED_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
]

const MAX_FILE_SIZE = 5 * 1024 * 1024

export function PostCoverImage({
  value,
  onChange,
}: PostCoverImageProps) {
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(value)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    setPreview(value)
  }, [value])

  function handleFile(event: React.ChangeEvent<HTMLInputElement>) {
    const selectedFile = event.target.files?.[0]

    setError('')

    if (!selectedFile) {
      return
    }

    if (!ALLOWED_TYPES.includes(selectedFile.type)) {
      setError('Use uma imagem JPG, PNG ou WebP.')
      event.target.value = ''
      return
    }

    if (selectedFile.size > MAX_FILE_SIZE) {
      setError('A imagem deve ter no máximo 5 MB.')
      event.target.value = ''
      return
    }

    setFile(selectedFile)

    const objectUrl = URL.createObjectURL(selectedFile)
    setPreview(objectUrl)
  }

  async function handleUpload() {
    if (!file) {
      return
    }

    setUploading(true)
    setError('')

    const extension = file.name.split('.').pop()?.toLowerCase() || 'jpg'

    const fileName =
      `${crypto.randomUUID()}.${extension}`

    const filePath = `covers/${fileName}`

    const { error: uploadError } = await supabase.storage
      .from('post-images')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false,
      })

    if (uploadError) {
      console.error('Erro no upload da imagem:', uploadError)
      setError('Não foi possível enviar a imagem.')
      setUploading(false)
      return
    }

    const { data } = supabase.storage
      .from('post-images')
      .getPublicUrl(filePath)

    onChange(data.publicUrl)

    setPreview(data.publicUrl)
    setFile(null)
    setUploading(false)
  }

async function handleRemove() {
  setError('')

  // Se a imagem foi apenas selecionada e ainda não enviada
  if (file) {
    setFile(null)
    setPreview(value)
    return
  }

  // Se não existe imagem salva
  if (!value) {
    setPreview(null)
    return
  }

  try {
    const marker = '/post-images/'

    const markerIndex = value.indexOf(marker)

    if (markerIndex !== -1) {
      const filePath = decodeURIComponent(
        value.substring(markerIndex + marker.length)
      )

      const { error: removeError } = await supabase.storage
        .from('post-images')
        .remove([filePath])

      if (removeError) {
        console.error(
          'Erro ao remover imagem do Storage:',
          removeError
        )

        setError('Não foi possível remover a imagem.')
        return
      }
    }

    setFile(null)
    setPreview(null)
    onChange(null)
  } catch (removeError) {
    console.error(
      'Erro inesperado ao remover imagem:',
      removeError
    )

    setError('Não foi possível remover a imagem.')
  }
}

return (
  <div>
    <div className="mb-3">
      <label
        htmlFor="cover-image"
        className="block text-sm font-medium text-ink"
      >
        Imagem de capa
      </label>

      <p className="mt-1 text-sm text-ink/50">
        Recomendamos uma imagem horizontal em JPG, PNG ou WebP.
        Máximo de 5 MB.
      </p>
    </div>

    <input
      id="cover-image"
      type="file"
      accept="image/jpeg,image/png,image/webp"
      onChange={handleFile}
      className="sr-only"
    />

    {!preview ? (
      <label
        htmlFor="cover-image"
        className="flex min-h-52 cursor-pointer flex-col items-center justify-center border border-dashed border-ink/25 bg-cream/40 px-6 py-10 text-center transition hover:border-gold-deep hover:bg-cream"
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-full border border-gold-deep/30 text-gold-deep">
          <ImagePlus size={21} strokeWidth={1.5} />
        </div>

        <p className="mt-4 text-sm font-medium text-ink">
          Adicionar imagem de capa
        </p>

        <p className="mt-1 text-xs text-ink/45">
          Clique para escolher uma imagem do computador
        </p>

        <span className="mt-4 border border-ink/15 bg-white px-4 py-2 text-xs font-medium text-ink">
          Escolher imagem
        </span>
      </label>
    ) : (
      <div className="overflow-hidden border border-ink/10 bg-cream/30">
        <div className="relative">
          <img
            src={preview}
            alt="Pré-visualização da imagem de capa"
            className="aspect-[16/9] w-full object-cover"
          />

          {!file && value && (
            <div className="absolute right-4 top-4 bg-ink/80 px-3 py-1.5 text-xs text-cream">
              Imagem enviada
            </div>
          )}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 p-4">
          <div>
            <p className="text-sm font-medium text-ink">
              {file ? file.name : 'Imagem de capa'}
            </p>

            <p className="mt-1 text-xs text-ink/45">
              {file
                ? 'Confira a imagem e clique em enviar.'
                : 'Imagem armazenada no site.'}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <label
              htmlFor="cover-image"
              className="cursor-pointer border border-ink/15 bg-white px-4 py-2 text-xs font-medium text-ink transition hover:border-ink/40"
            >
              Trocar
            </label>

            {file && (
              <button
                type="button"
                disabled={uploading}
                onClick={() => void handleUpload()}
                className="flex items-center gap-2 bg-ink px-4 py-2 text-xs font-medium text-cream transition hover:opacity-90 disabled:opacity-50"
              >
                <Upload size={14} />

                {uploading ? 'Enviando...' : 'Enviar imagem'}
              </button>
            )}

            <button
              type="button"
              onClick={handleRemove}
              className="flex items-center gap-2 border border-ink/15 px-4 py-2 text-xs font-medium text-ink transition hover:bg-ink hover:text-cream"
            >
              <Trash2 size={14} />
              Remover
            </button>
          </div>
        </div>
      </div>
    )}

    {error && (
      <p className="mt-3 text-sm text-red-700">
        {error}
      </p>
    )}
  </div>
)
}