import { createFileRoute } from "@tanstack/react-router";
import {
  Clock,
  Instagram,
  Mail,
  MapPin,
  MessageCircle,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Eyebrow } from "@/components/page-elements";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";
import { clinic, whatsappUrl } from "@/lib/site-data";

export const Route = createFileRoute("/contato")({
  head: () => ({
    meta: [
      {
        title: "Contato e Endereço na Vila Formosa | Lacort Odonto",
      },
      {
        name: "description",
        content:
          "Entre em contato com a Lacort Odonto na Vila Formosa, São Paulo. Consulte endereço, WhatsApp, e-mail e horários de atendimento.",
      },
      {
        property: "og:title",
        content: "Contato e Endereço na Vila Formosa | Lacort Odonto",
      },
      {
        property: "og:description",
        content:
          "Endereço, WhatsApp, e-mail e horários de atendimento da Lacort Odonto na Vila Formosa, São Paulo.",
      },
      {
        property: "og:type",
        content: "website",
      },
      {
        property: "og:url",
        content: "https://lacortodonto.com.br/contato",
      },
      {
        name: "twitter:card",
        content: "summary_large_image",
      },
      {
        name: "twitter:title",
        content: "Contato e Endereço na Vila Formosa | Lacort Odonto",
      },
      {
        name: "twitter:description",
        content:
          "Fale com a Lacort Odonto e consulte endereço e horários de atendimento na Vila Formosa, São Paulo.",
      },
    ],

    links: [
      {
        rel: "canonical",
        href: "https://lacortodonto.com.br/contato",
      },
    ],
  }),

  component: Page,
});

function Page() {
  const [sending, setSending] = useState(false);
  const [consent, setConsent] = useState(false);
  const [phone, setPhone] = useState("");

  function formatPhone(value: string) {
    const numbers = value.replace(/\D/g, "").slice(0, 11);

    if (numbers.length === 0) {
      return "";
    }

    if (numbers.length <= 2) {
      return `(${numbers}`;
    }

    if (numbers.length <= 6) {
      return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
    }

    if (numbers.length <= 10) {
      return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 6)}-${numbers.slice(6)}`;
    }

    return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7)}`;
  }

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
      name: String(data.get("name") ?? "").trim(),
      email: String(data.get("email") ?? "").trim(),
      phone: String(data.get("phone") ?? "").trim(),
      subject: String(data.get("subject") ?? "").trim(),
      message: String(data.get("message") ?? "").trim(),
      privacy_consent: true,
    });

    setSending(false);

    if (error) {
      console.error("Erro ao enviar formulário:", error);
      toast.error(
        "Não foi possível enviar sua mensagem. Tente pelo WhatsApp.",
      );
      return;
    }

    toast.success("Mensagem enviada! Responderemos em breve.");

    form.reset();
    setPhone("");
    setConsent(false);
  }

  const field =
    "mt-2 w-full border border-border bg-paper px-4 py-3 text-base outline-none focus:border-gold";

  return (
    <>
      <section className="site-container grid gap-16 py-20 md:py-28 lg:grid-cols-[1.05fr_.95fr]">
        <div>
          <Eyebrow>Envie uma mensagem</Eyebrow>

          <h1 className="section-title">Entre em contato</h1>

          <form onSubmit={onSubmit} className="mt-10 grid gap-6">
            <div className="grid gap-6 sm:grid-cols-2">
              <label className="block text-sm font-semibold">
                Nome
                <input
                  name="name"
                  required
                  autoComplete="name"
                  className={field}
                />
              </label>

              <label className="block text-sm font-semibold">
                Telefone / WhatsApp
                <input
                  name="phone"
                  type="tel"
                  required
                  value={phone}
                  onChange={(event) =>
                    setPhone(formatPhone(event.target.value))
                  }
                  placeholder="(11) 99999-9999"
                  inputMode="tel"
                  autoComplete="tel"
                  className={field}
                />
              </label>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <label className="block text-sm font-semibold">
                E-mail
                <input
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="seuemail@exemplo.com.br"
                  className={field}
                />
              </label>

              <label className="block text-sm font-semibold">
                Assunto
                <input
                  name="subject"
                  required
                  className={field}
                />
              </label>
            </div>

            <label className="block text-sm font-semibold">
              Mensagem
              <textarea
                name="message"
                required
                rows={6}
                className={field}
              />
            </label>

<label className="flex items-start gap-3 text-sm text-muted-foreground">
  <input
    type="checkbox"
    checked={consent}
    onChange={(event) => setConsent(event.target.checked)}
    className="mt-1 size-4 shrink-0 accent-[var(--gold-deep)]"
  />

  <span>
    Autorizo o contato da Lacort Odontologia e declaro que li e aceito os{" "}
    <a
      href="/termos-de-uso"
      target="_blank"
      rel="noreferrer"
      className="font-medium text-foreground underline underline-offset-4 hover:text-gold-deep"
      onClick={(event) => event.stopPropagation()}
    >
      Termos de Uso
    </a>{" "}
    e a{" "}
    <a
      href="/politica-de-privacidade"
      target="_blank"
      rel="noreferrer"
      className="font-medium text-foreground underline underline-offset-4 hover:text-gold-deep"
      onClick={(event) => event.stopPropagation()}
    >
      Política de Privacidade
    </a>
    . Não envie dados de saúde sensíveis por este formulário.
  </span>
</label>

            <div>
              <Button
                type="submit"
                variant="gold"
                size="lg"
                disabled={sending}
              >
                {sending ? "Enviando..." : "Enviar mensagem"}
              </Button>
            </div>
          </form>
        </div>

        <aside className="grid content-start gap-8">
          <div className="editorial-rule pt-6">
            <MessageCircle className="size-5 text-gold-deep" />
            <h2 className="mt-4 text-2xl">WhatsApp</h2>
            <a
              className="mt-3 block text-muted-foreground underline underline-offset-4"
              href={whatsappUrl()}
              target="_blank"
              rel="noreferrer"
            >
              {clinic.whatsappDisplay}
            </a>
          </div>

          <div className="editorial-rule pt-6">
            <Mail className="size-5 text-gold-deep" />
            <h2 className="mt-4 text-2xl">E-mail</h2>
            <a
              className="mt-3 block break-all text-muted-foreground underline underline-offset-4"
              href={`mailto:${clinic.email}`}
            >
              {clinic.email}
            </a>
          </div>

          <div className="editorial-rule pt-6">
            <MapPin className="size-5 text-gold-deep" />
            <h2 className="mt-4 text-2xl">Endereço</h2>
            <a
              className="mt-3 block leading-7 text-muted-foreground underline underline-offset-4"
              href={clinic.mapsUrl}
              target="_blank"
              rel="noreferrer"
            >
              {clinic.address}
              <br />
              {clinic.district}
              <br />
              {clinic.postalCode}
            </a>
          </div>

          <div className="editorial-rule pt-6">
            <Clock className="size-5 text-gold-deep" />
            <h2 className="mt-4 text-2xl">Horários</h2>

            <p className="mt-3 leading-7 text-muted-foreground">
              {clinic.hours.map((hour) => (
                <span key={hour} className="block">
                  {hour}
                </span>
              ))}
            </p>
          </div>

          <div className="editorial-rule pt-6">
            <Instagram className="size-5 text-gold-deep" />
            <h2 className="mt-4 text-2xl">Instagram</h2>

            <a
              className="mt-3 block text-muted-foreground underline underline-offset-4"
              href="https://instagram.com/lacortodonto"
              target="_blank"
              rel="noreferrer"
            >
              {clinic.instagram}
            </a>
          </div>

          <p className="text-sm text-muted-foreground">
            Responsável técnica: {clinic.director} — {clinic.registration}
          </p>
        </aside>
      </section>
    </>
  );
}