import { createFileRoute } from "@tanstack/react-router";
import { Eyebrow, FinalCta, PageHero } from "@/components/page-elements";
import { treatments } from "@/lib/site-data";

export const Route = createFileRoute("/tratamentos")({
  head: () => ({
    meta: [
      { title: "Tratamentos — Lacort Odontologia Especializada" },
      { name: "description", content: "Estética, prótese e reabilitação, implantes, endodontia, ortodontia, alinhadores e prevenção na Lacort Odontologia." },
      { property: "og:title", content: "Tratamentos — Lacort Odontologia Especializada" },
      { property: "og:description", content: "Áreas de cuidado da Lacort Odontologia Especializada em Vila Formosa, São Paulo." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <>
      

      <section className="site-container py-20 md:py-28">
        <h2 className="section-title max-w-3xl">O tratamento certo começa com um bom diagnóstico.</h2>
        <Eyebrow> </Eyebrow>
        <div className="grid gap-x-14 gap-y-16 md:grid-cols-2">
          {treatments.map((t, i) => (
            <article key={t.slug} className="editorial-rule pt-8">
              <div className="flex items-baseline justify-between gap-4">
                <Eyebrow>{t.category}</Eyebrow>
                <span className="font-brand text-sm text-gold-deep">0{i + 1}</span>
              </div>
              <h2 className="text-3xl leading-tight md:text-4xl">{t.title}</h2>
              <p className="mt-4 text-lg leading-8 text-muted-foreground">{t.description}</p>
              <p className="mt-5 text-sm text-muted-foreground/80">{t.items}</p>
            </article>
          ))}
        </div>
        <p className="mt-20 max-w-3xl border-l-2 border-gold pl-6 text-sm leading-7 text-muted-foreground">
          Resultados variam conforme cada caso. Nenhuma informação desta página garante resultado ou
          substitui a avaliação clínica presencial.
        </p>
      </section>

      <FinalCta />
      
    </>
  );
}
