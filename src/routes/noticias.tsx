import { createFileRoute } from "@tanstack/react-router";
import { Eyebrow, FinalCta, PageHero } from "@/components/page-elements";
import { draftArticles, draftNews } from "@/lib/site-data";

export const Route = createFileRoute("/noticias")({
  head: () => ({
    meta: [
      { title: "Notícias — Lacort Odontologia Especializada" },
      { name: "description", content: "Notícias importantes e educativas para tirar suas dúvidas sobre saúde bucal." },
      { property: "og:title", content: "Notícias — Lacort Odontologia Especializada" },
      { property: "og:description", content: "Notícias da clínica e noticias educativas sobre saúde bucal." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <>

     {/* <section className="site-container py-20 md:py-28">
        <h2 className="section-title max-w-3xl">noticias educativos</h2>
        <div className="mt-14 grid gap-x-12 gap-y-14 md:grid-cols-3">
          {draftArticles.map((a) => (
            <article key={a.slug} className="editorial-rule pt-6">
              <p className="eyebrow">{a.category}</p>
              <h3 className="text-2xl leading-snug">{a.title}</h3>
              <p className="mt-3 leading-7 text-muted-foreground">{a.excerpt}</p>
              <p className="mt-4 text-xs uppercase tracking-widest text-muted-foreground/70">Exemplo · leitura de {a.read}</p>
            </article>
          ))}
        </div>
      </section> */}

      <section className="bg-paper py-20 md:py-28">
        <div className="site-container">
          
         <h2 className="section-title max-w-3xl text-gold-deep uppercase font-extrabold tracking-[0.14em]">
  Notícias
</h2>
          <div className="mt-14 grid gap-x-12 gap-y-14 md:grid-cols-3">
            {draftNews.map((n) => (
              <article key={n.slug} className="editorial-rule pt-6">
                <p className="eyebrow">{n.category}</p>
                <h3 className="text-2xl leading-snug">{n.title}</h3>
                <p className="mt-3 leading-7 text-muted-foreground">{n.excerpt}</p>
                <p className="mt-4 text-xs uppercase tracking-widest text-muted-foreground/70">{n.date}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
