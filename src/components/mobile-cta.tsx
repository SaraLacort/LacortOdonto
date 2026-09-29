import { CalendarDays, MessageCircle, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { whatsappUrl } from "@/lib/site-data";

export function MobileCta() {
  const [visible, setVisible] = useState(true)

  if (!visible) return null

  return (
    <aside
      className="mobile-cta md:hidden"
      aria-label="Atalhos de contato"
    >
      <div className="flex min-w-0 flex-1 gap-2">
        <Button
          asChild
          variant="gold"
          size="sm"
          className="min-w-0 flex-1 gap-2"
        >
          <a
            href={whatsappUrl()}
            target="_blank"
            rel="noreferrer"
          >
            <CalendarDays className="h-4 w-4 shrink-0" />
            <span>Agendar</span>
          </a>
        </Button>

        <Button
          asChild
          variant="outlineDark"
          size="sm"
          className="min-w-0 flex-1 gap-2"
        >
          <a
            href={whatsappUrl(
              'Olá! Gostaria de conversar com a equipe da Lacort.'
            )}
            target="_blank"
            rel="noreferrer"
          >
            <MessageCircle className="h-4 w-4 shrink-0" />
            <span>WhatsApp</span>
          </a>
        </Button>
      </div>

      <Button
        type="button"
        variant="ghostLight"
        size="icon"
        className="h-9 w-9 shrink-0"
        aria-label="Fechar atalhos"
        onClick={() => setVisible(false)}
      >
        <X className="h-4 w-4" />
      </Button>
    </aside>
  )
}