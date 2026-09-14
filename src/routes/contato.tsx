import { createFileRoute } from "@tanstack/react-router";
import { Clock, Instagram, Mail, MapPin, MessageCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Eyebrow, PageHero } from "@/components/page-elements";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { clinic, whatsappUrl } from "@/lib/site-data";

export const Route = createFileRoute("/contato")({
  head: () => ({
    meta: [
      { title: "Contato — Lacort Odontologia Especializada" },
      { name: "description", content: "Fale com a Lacort Odontologia Especializada em Vila Formosa, São Paulo. WhatsApp (11) 92211-4728 e recepcao@lacortodonto.com.br." },
      { property: "og:title", content: "Contato — Lacort Odontologia Especializada" },
      { property: "og:description", content: "WhatsApp, e-mail, endereço e horários da Lacort Odontologia Especializada." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Page,
});

function Page() {
  const [sending, setSending] = useState(false);
  const [consent, setConsent] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    if (!consent) {
      toast.error("É necessário aceitar a política de privacidade.");
      return;
    }
    setSending(true);
    const { error } = await supabase.from("contact_messages").insert({
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      phone: String(data.get("phone") ?? ""),
      subject: String(data.get("subject") ?? ""),
      message: String(data.get("message") ?? ""),
      privacy_consent: true,
    });
    setSending(false);
    if (error) {
      toast.error("Não foi possível enviar sua mensagem. Tente pelo WhatsApp.");
      return;
    }
    toast.success("Mensagem enviada! Responderemos em breve.");
    form.reset();
    setConsent(false);
  }

  const field = "mt-2 w-full border border-border bg-paper px-4 py-3 text-base outline-none focus:border-gold";

  return (
    <>
      <PageHero
        eyebrow="Contato"
        title="Vamos conversar."
        intro="Envie sua mensagem ou fale direto pelo WhatsApp. Retornamos dentro do horário de atendimento."
      />

      <section className="site-container grid gap-16 py-20 md:py-28 lg:grid-cols-[1.05fr_.95fr]">
        <div>
          <Eyebrow>Envie uma mensagem</Eyebrow>
          <h2 className="section-title">Formulário de contato</h2>
          <form onSubmit={onSubmit} className="mt-10 grid gap-6">
            <div className="grid gap-6 sm:grid-cols-2">
              <label className="block text-sm font-semibold">Nome<input name="name" required className={field} /></label>
              <label className="block text-sm font-semibold">Telefone / WhatsApp<input name="phone" required className={field} /></label>
            </div>
            <div className="grid gap-6 sm:grid-cols-2">
              <label className="block text-sm font-semibold">E-mail<input name="email" type="email" required className={field} /></label>
              <label className="block text-sm font-semibold">Assunto<input name="subject" required className={field} /></label>
            </div>
            <label className="block text-sm font-semibold">Mensagem<textarea name="message" required rows={6} className={field} /></label>
            <label className="flex items-start gap-3 text-sm text-muted-foreground">
              <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-1 size-4 accent-[var(--gold-deep)]" />
              <span>Autorizo o contato da Lacort Odontologia e li a política de privacidade. Não envie dados de saúde sensíveis por este formulário.</span>
            </label>
            <div><Button type="submit" variant="gold" size="lg" disabled={sending}>{sending ? "Enviando..." : "Enviar mensagem"}</Button></div>
          </form>
        </div>

        <aside className="grid content-start gap-8">
          <div className="editorial-rule pt-6"><MessageCircle className="size-5 text-gold-deep" /><h3 className="mt-4 text-2xl">WhatsApp</h3><a className="mt-3 block text-muted-foreground underline underline-offset-4" href={whatsappUrl()} target="_blank" rel="noreferrer">{clinic.whatsappDisplay}</a></div>
          <div className="editorial-rule pt-6"><Mail className="size-5 text-gold-deep" /><h3 className="mt-4 text-2xl">E-mail</h3><a className="mt-3 block break-all text-muted-foreground underline underline-offset-4" href={`mailto:${clinic.email}`}>{clinic.email}</a></div>
          <div className="editorial-rule pt-6"><MapPin className="size-5 text-gold-deep" /><h3 className="mt-4 text-2xl">Endereço</h3><a className="mt-3 block leading-7 text-muted-foreground underline underline-offset-4" href={clinic.mapsUrl}target="_blank" rel="noreferrer">{clinic.address}<br />{clinic.district}<br />{clinic.postalCode}</a></div>          
          <div className="editorial-rule pt-6"><Clock className="size-5 text-gold-deep" /><h3 className="mt-4 text-2xl">Horários</h3><p className="mt-3 leading-7 text-muted-foreground">{clinic.hours.map((h) => <span key={h} className="block">{h}</span>)}</p></div>
          <div className="editorial-rule pt-6"><Instagram className="size-5 text-gold-deep" /><h3 className="mt-4 text-2xl">Instagram</h3><a className="mt-3 block text-muted-foreground underline underline-offset-4" href="https://instagram.com/lacortodonto" target="_blank" rel="noreferrer">{clinic.instagram}</a></div>
          <p className="text-sm text-muted-foreground">Responsável técnica: {clinic.director} — {clinic.registration}</p>
        </aside>
      </section>
    </>
  );
}
