import { createFileRoute } from "@tanstack/react-router";
import { Eyebrow, FinalCta, PageHero } from "@/components/page-elements";

export const Route = createFileRoute("/artigos-cientificos")({
  head: () => ({
    meta: [
      { title: "Produção Científica — Lacort Odontologia Especializada" },
      { name: "description", content: "Espaço reservado para publicações, participações e produção científica da equipe da Lacort Odontologia." },
      { property: "og:title", content: "Produção Científica — Lacort Odontologia Especializada" },
      { property: "og:description", content: "Publicações e produção científica da equipe da Lacort Odontologia." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <>
      <PageHero
        eyebrow="Produção Científica"
        title="Estudo que sustenta a prática."
        intro="Esta seção reúne publicações, participações em eventos e produção acadêmica da equipe."
      />

      <section className="site-container py-20 md:py-28">
        <div className="max-w-3xl">
          <Eyebrow>Em preparação</Eyebrow>
          <h2 className="section-title">Conteúdo a ser cadastrado</h2>
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
