import { createFileRoute } from "@tanstack/react-router";
import { Eyebrow, FinalCta, PageHero } from "@/components/page-elements";

export const Route = createFileRoute("/artigos-cientificos")({
head: () => ({
  meta: [
    {
      title: "Produção Científica | Lacort Odonto",
    },
    {
      name: "description",
      content:
        "Produção científica, publicações e trabalhos acadêmicos vinculados à Lacort Odonto.",
    },

    // Open Graph
    {
      property: "og:title",
      content: "Produção Científica | Lacort Odonto",
    },
    {
      property: "og:description",
      content:
        "Publicações, trabalhos acadêmicos e produção científica vinculados à Lacort Odonto.",
    },
    {
      property: "og:type",
      content: "website",
    },
    {
      property: "og:url",
      content: "https://lacortodonto.com.br/artigos-cientificos",
    },

    // Twitter
    {
      name: "twitter:card",
      content: "summary_large_image",
    },
    {
      name: "twitter:title",
      content: "Produção Científica | Lacort Odonto",
    },
    {
      name: "twitter:description",
      content:
        "Publicações, trabalhos acadêmicos e produção científica vinculados à Lacort Odonto.",
    },
  ],

  links: [
    {
      rel: "canonical",
      href: "https://lacortodonto.com.br/artigos-cientificos",
    },
  ],
}),

component: Page,

});

function Page() {
  return (
    <>


      <section className="site-container py-20 md:py-28">
        <div className="max-w-3xl">
          <Eyebrow>Em preparação</Eyebrow>
          <h1 className="section-title">Conteúdo a ser cadastrado</h1>
          <p className="page-intro">
            Nenhuma publicação foi cadastrada até o momento. Este espaço será preenchido apenas com
            produções confirmadas, com título, ano e link de referência quando disponível.
          </p>
          <p className="mt-8 border-l-2 border-gold pl-6 text-sm leading-7 text-muted-foreground">
            Para evitar qualquer informação imprecisa, não incluímos exemplos fictícios de artigos
            científicos nesta página.
          </p>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
