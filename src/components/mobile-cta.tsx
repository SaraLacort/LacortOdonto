import { CalendarDays, MessageCircle, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { whatsappUrl } from "@/lib/site-data";

export function MobileCta() {
  const [visible, setVisible] = useState(true);
  if (!visible) return null;
  return <aside className="mobile-cta md:hidden" aria-label="Atalhos de contato"><Button asChild variant="gold" size="sm"><a href={whatsappUrl()} target="_blank" rel="noreferrer"><CalendarDays />Agendar</a></Button><Button asChild variant="outlineDark" size="sm"><a href={whatsappUrl("Olá! Gostaria de conversar com a equipe da Lacort.")} target="_blank" rel="noreferrer"><MessageCircle />WhatsApp</a></Button><Button variant="ghostLight" size="icon" aria-label="Fechar atalhos" onClick={() => setVisible(false)}><X /></Button></aside>;
}