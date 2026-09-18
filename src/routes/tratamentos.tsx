import { createFileRoute } from "@tanstack/react-router";
import { Eyebrow, FinalCta, PageHero } from "@/components/page-elements";
import { treatments } from "@/lib/site-data";

export const Route = createFileRoute("/tratamentos")({
head: () => ({
  meta: [
    {
      title: "Tratamentos Odontológicos na Vila Formosa | Lacort Odonto",
    },
    {
      name: "description",
      content:
        "Conheça os tratamentos odontológicos da Lacort Odonto na Vila Formosa, São Paulo: prevenção, estética, prótese, implantes, endodontia, ortodontia e mais.",
    },

    // Open Graph
    {
      property: "og:title",
      content: "Tratamentos Odontológicos na Vila Formosa | Lacort Odonto",
    },
    {
      property: "og:description",
      content:
        "Conheça as áreas de tratamento odontológico disponíveis na Lacort Odonto, na Vila Formosa, São Paulo.",
    },
    {
      property: "og:type",
      content: "website",
    },
    {
      property: "og:url",
      content: "https://lacortodonto.com.br/tratamentos",
    },

    // Twitter
    {
      name: "twitter:card",
      content: "summary_large_image",
    },
    {
      name: "twitter:title",
      content: "Tratamentos Odontológicos na Vila Formosa | Lacort Odonto",
    },
    {
      name: "twitter:description",
      content:
        "Prevenção, estética, prótese, implantes, endodontia, ortodontia e outras áreas de cuidado odontológico.",
    },
  ],

  links: [
    {
      rel: "canonical",
      href: "https://lacortodonto.com.br/tratamentos",
    },
  ],
}),

component: Page,

});

function Page() {
  return (
    <>
      

      <section className="site-container py-20 md:py-28">
        <h1 className="section-title max-w-3xl">O tratamento certo começa com um bom diagnóstico.</h1>
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
