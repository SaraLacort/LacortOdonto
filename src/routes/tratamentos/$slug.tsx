import {
  createFileRoute,
  Link,
  notFound,
} from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CircleAlert,
  MessageCircle,
} from "lucide-react";

import { Breadcrumbs, Eyebrow } from "@/components/page-elements";
import { Button } from "@/components/ui/button";
import {
  getTreatmentBySlug,
  treatmentPages,
} from "@/lib/treatment-pages";
import { whatsappUrl } from "@/lib/site-data";

export const Route = createFileRoute("/tratamentos/$slug")({
  loader: ({ params }) => {
    const treatment = getTreatmentBySlug(params.slug);

    if (!treatment) {
      throw notFound();
    }

    return treatment;
  },

  head: ({ loaderData }) => {
    const title = loaderData?.title ?? "Tratamento";
    const description =
      loaderData?.introduction ??
      "Conheça os tratamentos da Lacort Odontologia Especializada.";

    return {
      meta: [
        {
          title: `${title} na Vila Formosa | Lacort Odontologia`,
        },
        {
          name: "description",
          content: description,
        },
        {
          property: "og:title",
          content: `${title} | Lacort Odontologia`,
        },
        {
          property: "og:description",
          content: description,
        },
        {
          property: "og:type",
          content: "website",
        },
        {
          name: "twitter:card",
          content: "summary_large_image",
        },
      ],
    };
  },

  component: TreatmentPage,
});

function TreatmentPage() {
  const treatment = Route.useLoaderData();

  const relatedTreatments = treatmentPages.filter((item) =>
    treatment.relatedSlugs.includes(item.slug),
  );

  const whatsappMessage =
    `Olá! Conheci a página sobre ${treatment.title} no site da Lacort ` +
    "e gostaria de agendar uma avaliação.";

  return (
    <>
      {/* Apresentação */}
      <section className="border-b border-cream/15 bg-ink py-16 text-cream md:py-24">
        <div className="site-container">
          <Breadcrumbs
            current={treatment.title}
            parent="Tratamentos"
            parentTo="/tratamentos"
          />

          <Eyebrow>{treatment.category}</Eyebrow>

          <h1 className="max-w-5xl font-display text-[clamp(3rem,8vw,7rem)] leading-[0.88] tracking-[-0.02em]">
            {treatment.title}
          </h1>

          <p className="mt-7 max-w-3xl font-display text-2xl leading-snug text-gold md:text-3xl">
            {treatment.headline}
          </p>

          <p className="mt-7 max-w-3xl text-lg leading-8 text-cream/70">
            {treatment.introduction}
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Button
              asChild
              variant="gold"
              size="lg"
              className="min-h-13 rounded-none px-7"
            >
              <a
                href={whatsappUrl(whatsappMessage)}
                target="_blank"
                rel="noreferrer"
              >
                Agendar uma avaliação
                <ArrowRight />
              </a>
            </Button>

            <Button
              asChild
              variant="outlineDark"
              size="lg"
              className="min-h-13 rounded-none px-7"
            >
              <Link to="/tratamentos">
                <ArrowLeft />
                Voltar aos tratamentos
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Indicações */}
      <section className="site-container grid gap-12 py-20 md:py-28 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div>
          <Eyebrow>Avaliação individual</Eyebrow>

          <h2 className="home-section-title">
            {treatment.indicationsTitle}
          </h2>

          <p className="mt-6 max-w-xl leading-8 text-muted-foreground">
            Estes exemplos são informativos. A presença de um sinal ou
            necessidade não confirma automaticamente a indicação do tratamento.
          </p>
        </div>

        <ul className="border-t border-border">
          {treatment.indications.map((indication) => (
            <li
              key={indication}
              className="flex gap-4 border-b border-border py-5 text-lg leading-7"
            >
              <Check className="mt-1 size-5 shrink-0 text-gold-deep" />
              <span>{indication}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Etapas */}
      <section className="bg-paper py-20 md:py-28">
        <div className="site-container">
          <Eyebrow>Como funciona</Eyebrow>

          <h2 className="home-section-title max-w-3xl">
            Etapas gerais do atendimento
          </h2>

          <div className="mt-14 grid gap-x-10 gap-y-12 md:grid-cols-2 lg:grid-cols-4">
            {treatment.steps.map((step, index) => (
              <article
                key={step.title}
                className="border-t border-border pt-6"
              >
                <span className="font-brand text-sm text-gold-deep">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <h3 className="mt-4 text-2xl leading-tight">
                  {step.title}
                </h3>

                <p className="mt-4 leading-7 text-muted-foreground">
                  {step.text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Observações */}
      <section className="bg-charcoal py-16 text-cream md:py-20">
        <div className="site-container grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
          <div>
            <CircleAlert className="size-7 text-gold" />

            <h2 className="mt-5 font-display text-4xl leading-tight">
              Informações importantes
            </h2>
          </div>

          <ul className="border-t border-cream/20">
            {treatment.important.map((information) => (
              <li
                key={information}
                className="flex gap-4 border-b border-cream/20 py-5 leading-7 text-cream/75"
              >
                <span
                  className="mt-2 size-2 shrink-0 rotate-45 border border-gold"
                  aria-hidden="true"
                />

                {information}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Perguntas frequentes */}
      <section className="site-container grid gap-12 py-20 md:py-28 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
        <div>
          <Eyebrow>Perguntas frequentes</Eyebrow>

          <h2 className="home-section-title">
            Dúvidas sobre {treatment.title.toLowerCase()}
          </h2>
        </div>

        <div>
          {treatment.faqs.map((faq, index) => (
            <details
              key={faq.question}
              className="border-t border-border last:border-b"
            >
              <summary className="grid cursor-pointer list-none grid-cols-[2.5rem_1fr] gap-3 py-6 font-display text-xl leading-snug md:text-2xl">
                <span className="pt-1 font-brand text-xs text-gold-deep">
                  {String(index + 1).padStart(2, "0")}
                </span>

                {faq.question}
              </summary>

              <p className="max-w-3xl pb-7 pl-[3.25rem] leading-8 text-muted-foreground">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </section>

      {/* Tratamentos relacionados */}
      <section className="border-y border-border bg-cream py-20 md:py-24">
        <div className="site-container">
          <Eyebrow>Continue conhecendo</Eyebrow>

          <h2 className="font-display text-4xl leading-tight md:text-5xl">
            Tratamentos relacionados
          </h2>

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {relatedTreatments.map((related) => (
              <Link
                key={related.slug}
                to="/tratamentos/$slug"
                params={{ slug: related.slug }}
                className="group border-t border-border pt-6 transition-colors hover:border-gold-deep"
              >
                <p className="eyebrow">{related.category}</p>

                <h3 className="text-2xl leading-tight">
                  {related.title}
                </h3>

                <span className="mt-6 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider">
                  Conhecer tratamento
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Chamada final */}
      <section className="bg-ink py-20 text-cream md:py-28">
        <div className="site-container grid items-end gap-10 lg:grid-cols-[1fr_auto]">
          <div>
            <Eyebrow>Próximo passo</Eyebrow>

            <h2 className="home-section-title max-w-4xl text-cream">
              A indicação começa por uma avaliação cuidadosa.
            </h2>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-cream/70">
              Converse com a equipe e agende um horário para entender quais
              possibilidades fazem sentido para o seu caso.
            </p>
          </div>

          <Button
            asChild
            variant="gold"
            size="lg"
            className="min-h-13 rounded-none px-7"
          >
            <a
              href={whatsappUrl(whatsappMessage)}
              target="_blank"
              rel="noreferrer"
            >
              <MessageCircle />
              Agendar pelo WhatsApp
            </a>
          </Button>
        </div>
      </section>
    </>
  );
}