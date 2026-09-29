import { Link } from '@tanstack/react-router'
import { Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { nav, whatsappUrl } from '@/lib/site-data'

export function SiteHeader() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24)
    }

    onScroll()

    window.addEventListener('scroll', onScroll, {
      passive: true,
    })

    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  // Impede a página de rolar enquanto o menu mobile estiver aberto
  useEffect(() => {
    if (!open) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [open])

  return (
    <header
      className={`site-header ${
        scrolled ? 'site-header-scrolled' : ''
      }`}
    >
      {/* CABEÇALHO */}
      <div className="site-container relative z-[60] flex h-full items-center justify-between gap-6">
        <Link
          to="/"
          aria-label="Lacort Odontologia — início"
          onClick={() => setOpen(false)}
        >
          <img
            src="/lacort-logo-branco.webp"
            alt="Lacort Odontologia Especializada"
            className="h-12 w-auto md:h-14"
          />
        </Link>

        {/* MENU DESKTOP */}
        <nav
          aria-label="Navegação principal"
          className="hidden items-center gap-5 xl:flex"
        >
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="nav-link"
              activeProps={{
                className: 'nav-link nav-link-active',
              }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button
            asChild
            variant="gold"
            className="hidden sm:inline-flex"
          >
            <a
              href={whatsappUrl()}
              target="_blank"
              rel="noreferrer"
            >
              Agendar avaliação
            </a>
          </Button>

          {/* BOTÃO MOBILE */}
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="relative z-[70] xl:hidden"
            aria-label={
              open ? 'Fechar menu' : 'Abrir menu'
            }
            aria-expanded={open}
            aria-controls="mobile-navigation"
            onClick={() => setOpen((current) => !current)}
          >
            {open ? <X /> : <Menu />}
          </Button>
        </div>
      </div>

      {/* MENU MOBILE */}
      {open && (
        <div
          id="mobile-navigation"
          className="absolute left-0 right-0 top-full z-[50] border-t border-ink/10 bg-cream shadow-xl xl:hidden"
        >
          <nav
            aria-label="Navegação mobile"
            className="site-container flex max-h-[calc(100dvh-6rem)] flex-col overflow-y-auto py-6"
          >
{nav.map((item) => (
  <Link
    key={item.to}
    to={item.to}
    onClick={() => setOpen(false)}
    className="border-b border-ink/10 py-5 text-base font-medium text-ink transition hover:text-gold-deep"
  >
    {item.label}
  </Link>
))}
            <Button
              asChild
              variant="gold"
              size="lg"
              className="mt-7 w-full"
            >
              <a
                href={whatsappUrl()}
                target="_blank"
                rel="noreferrer"
                onClick={() => setOpen(false)}
              >
                Agendar avaliação
              </a>
            </Button>
          </nav>
        </div>
      )}
    </header>
  )
}