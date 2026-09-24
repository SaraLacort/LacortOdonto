import { useEffect, useState } from 'react'
import {
  EditorContent,
  useEditor,
} from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'

type PostEditorProps = {
  value: string
  onChange: (html: string) => void
}

export function PostEditor({
  value,
  onChange,
}: PostEditorProps) {
  const [, forceUpdate] = useState(0)

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        link: false,
      }),

      Link.configure({
        openOnClick: false,
        autolink: true,
        defaultProtocol: 'https',
      }),
    ],

    content: value,

    editorProps: {
      attributes: {
        class:
          'post-editor-content min-h-[500px] w-full min-w-0 max-w-full px-6 py-6 text-ink outline-none',
      },
    },

    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
      forceUpdate((value) => value + 1)
    },

    onSelectionUpdate: () => {
      forceUpdate((value) => value + 1)
    },
  })

  useEffect(() => {
    if (!editor) return

    if (editor.getHTML() !== value) {
      editor.commands.setContent(value)
    }
  }, [editor, value])

  if (!editor) {
    return (
      <div className="border border-black/20 bg-white p-6">
        Carregando editor...
      </div>
    )
  }

  function setLink() {
    const attributes = editor.getAttributes('link')

    const previousUrl =
      attributes['href'] as string | undefined

    const url = window.prompt(
      'Digite o endereço do link:',
      previousUrl ?? 'https://'
    )

    if (url === null) return

    if (url.trim() === '') {
      editor
        .chain()
        .focus()
        .extendMarkRange('link')
        .unsetLink()
        .run()

      return
    }

    editor
      .chain()
      .focus()
      .extendMarkRange('link')
      .setLink({
        href: url.trim(),
      })
      .run()
  }

  return (
    <div className="w-full min-w-0 max-w-full">

      {/* TÍTULO DO CAMPO */}
      <div className="mb-2">
        <p className="text-sm font-medium text-ink">
          Conteúdo
        </p>

        <p className="mt-1 text-xs text-ink/45">
          Escreva ou cole o conteúdo da publicação.
        </p>
      </div>

      <div className="w-full min-w-0 max-w-full overflow-hidden rounded-md border border-black/20 bg-white">

        {/* TOOLBAR */}
        <div className="flex flex-wrap items-center gap-2 border-b border-black/15 bg-[#f3eee7] p-3">

          {/* DESFAZER */}
          <EditorButton
            title="Desfazer"
            disabled={!editor.can().undo()}
            onClick={() =>
              editor.chain().focus().undo().run()
            }
          >
            ↶
          </EditorButton>

          {/* REFAZER */}
          <EditorButton
            title="Refazer"
            disabled={!editor.can().redo()}
            onClick={() =>
              editor.chain().focus().redo().run()
            }
          >
            ↷
          </EditorButton>

          <Separator />

          {/* TEXTO COMUM */}
          <EditorButton
            title="Texto comum"
            active={editor.isActive('paragraph')}
            onClick={() =>
              editor
                .chain()
                .focus()
                .setParagraph()
                .run()
            }
          >
            Texto
          </EditorButton>

          {/* H2 */}
          <EditorButton
            title="Título grande"
            active={editor.isActive(
              'heading',
              { level: 2 }
            )}
            onClick={() =>
              editor
                .chain()
                .focus()
                .toggleHeading({
                  level: 2,
                })
                .run()
            }
          >
            Título grande
          </EditorButton>

          {/* H3 */}
          <EditorButton
            title="Subtítulo"
            active={editor.isActive(
              'heading',
              { level: 3 }
            )}
            onClick={() =>
              editor
                .chain()
                .focus()
                .toggleHeading({
                  level: 3,
                })
                .run()
            }
          >
            Subtítulo
          </EditorButton>

          {/* H4 */}
          <EditorButton
            title="Entrelinha"
            active={editor.isActive(
              'heading',
              { level: 4 }
            )}
            onClick={() =>
              editor
                .chain()
                .focus()
                .toggleHeading({
                  level: 4,
                })
                .run()
            }
          >
            Entrelinha
          </EditorButton>

          <Separator />

          {/* NEGRITO */}
          <EditorButton
            title="Negrito"
            active={editor.isActive('bold')}
            onClick={() =>
              editor
                .chain()
                .focus()
                .toggleBold()
                .run()
            }
          >
            <strong>B</strong>
          </EditorButton>

          {/* ITÁLICO */}
          <EditorButton
            title="Itálico"
            active={editor.isActive('italic')}
            onClick={() =>
              editor
                .chain()
                .focus()
                .toggleItalic()
                .run()
            }
          >
            <em>I</em>
          </EditorButton>

          <Separator />

          {/* LISTA COM MARCADORES */}
          <EditorButton
            title="Lista com marcadores"
            active={editor.isActive('bulletList')}
            onClick={() => {
              editor
                .chain()
                .focus()
                .toggleBulletList()
                .run()
            }}
          >
            • Lista
          </EditorButton>

          {/* LISTA NUMERADA */}
          <EditorButton
            title="Lista numerada"
            active={editor.isActive('orderedList')}
            onClick={() => {
              editor
                .chain()
                .focus()
                .toggleOrderedList()
                .run()
            }}
          >
            1. Lista
          </EditorButton>

          <Separator />

          {/* LINK */}
          <EditorButton
            title="Adicionar link"
            active={editor.isActive('link')}
            onClick={setLink}
          >
            🔗 Link
          </EditorButton>

          {editor.isActive('link') && (
            <EditorButton
              title="Remover link"
              onClick={() =>
                editor
                  .chain()
                  .focus()
                  .extendMarkRange('link')
                  .unsetLink()
                  .run()
              }
            >
              × Link
            </EditorButton>
          )}
        </div>

        {/* ÁREA DO EDITOR */}
<div className="h-[500px] w-full min-w-0 max-w-full overflow-y-auto overflow-x-hidden bg-white">
  <EditorContent
    editor={editor}
    className="w-full min-w-0 max-w-full"
  />
</div>
      </div>

      <p className="mt-2 text-xs text-ink/40">
        Título grande para seções principais,
        Subtítulo para subdivisões e Entrelinha
        para pequenos destaques.
      </p>
    </div>
  )
}


/* =========================================================
   BOTÃO DA TOOLBAR
   ========================================================= */

type EditorButtonProps = {
  children: React.ReactNode
  title: string
  active?: boolean
  disabled?: boolean
  onClick: () => void
}

function EditorButton({
  children,
  title,
  active = false,
  disabled = false,
  onClick,
}: EditorButtonProps) {
  return (
    <button
      type="button"
      title={title}
      disabled={disabled}

      /*
       * Evita que o botão roube a seleção atual
       * do conteúdo do TipTap.
       */
      onMouseDown={(event) => {
        event.preventDefault()
      }}

      onClick={onClick}

      className={
        active
          ? 'rounded-md bg-[#171717] px-3 py-2 text-sm font-semibold text-white'
          : 'rounded-md border border-black/15 bg-white px-3 py-2 text-sm font-semibold text-[#171717] transition hover:bg-[#f5f5f5] disabled:cursor-not-allowed disabled:opacity-30'
      }
    >
      {children}
    </button>
  )
}


/* =========================================================
   SEPARADOR DA TOOLBAR
   ========================================================= */

function Separator() {
  return (
    <span
      aria-hidden="true"
      className="mx-1 h-7 w-px bg-black/15"
    />
  )
}