import { createFileRoute, Link } from "@tanstack/react-router";
import { Clock, MapPin, MessageCircle } from "lucide-react";
import clinicaAsset from "@/assets/clinica-lacort.jpg.asset.json";
import saraAsset from "@/assets/dra-sara-lacort.png.asset.json";
import { ArrowLink, Eyebrow, FinalCta } from "@/components/page-elements";
import { Button } from "@/components/ui/button";
import { clinic, draftArticles, treatments, whatsappUrl } from "@/lib/site-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Lacort Odontologia Especializada — Vila Formosa, São Paulo" },
      { name: "description", content: "Odontologia especializada com escuta e clareza em Vila Formosa, São Paulo. Estética, implantes, prótese, ortodontia e prevenção." },
      { property: "og:title", content: "Lacort Odontologia Especializada — Vila Formosa, São Paulo" },
      { property: "og:description", content: "Odontologia especializada com escuta e clareza em Vila Formosa, São Paulo." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const pillars = [
  { title: "Escuta antes do procedimento", text: "A conversa inicial existe para entender a sua história, suas dúvidas e o seu tempo." },
  { title: "Clareza em cada etapa", text: "Explicamos o que foi observado, as possibilidades e o que cada caminho envolve." },
  { title: "Cuidado especializado", text: "Diferentes áreas da odontologia reunidas em um planejamento individualizado." },
];

function Index() {
  return (
    <>
      <section className="border-b border-border bg-cream">
        <div className="site-container grid items-center gap-12 py-16 md:py-24 lg:grid-cols-[1.05fr_.95fr] lg:gap-20">
          <div>
            <Eyebrow>Vila Formosa · São Paulo</Eyebrow>
            <h1 className="section-title max-w-2xl">Odontologia especializada, feita no seu tempo.</h1>
            <p className="page-intro">
              Na Lacort, cada atendimento começa por uma conversa. Entender o que você sente e o que
              você espera é o que permite construir um plano de cuidado realmente seu.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Button asChild variant="gold" size="lg">
                <a href={whatsappUrl()} target="_blank" rel="noreferrer">Agendar avaliação</a>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/tratamentos">Conhecer tratamentos</Link>
              </Button>
            </div>
            <dl className="mt-12 grid gap-6 border-t border-border pt-8 text-sm sm:grid-cols-3">
              <div><dt className="footer-title text-gold-deep">Endereço</dt><dd className="mt-2 text-muted-foreground">{clinic.address}<br />{clinic.district}</dd></div>
              <div><dt className="footer-title text-gold-deep">Horários</dt><dd className="mt-2 text-muted-foreground">{clinic.hours.map((h) => <span key={h} className="block">{h}</span>)}</dd></div>
              <div><dt className="footer-title text-gold-deep">Responsável</dt><dd className="mt-2 text-muted-foreground">{clinic.director}<br />{clinic.registration}</dd></div>
            </dl>
          </div>
          <div className="image-frame aspect-[4/5] w-full">
            <img src={clinicaAsset.url} alt="Ambiente de atendimento da Lacort Odontologia Especializada" loading="eager" />
          </div>
        </div>
      </section>

      <section className="site-container py-20 md:py-28">
        <Eyebrow>Nosso jeito de cuidar</Eyebrow>
        <h2 className="section-title max-w-3xl">Um atendimento que começa pela conversa.</h2>
        <div className="mt-14 grid gap-10 md:grid-cols-3">
          {pillars.map((p, i) => (
            <div key={p.title} className="editorial-rule pt-6">
              <span className="font-brand text-sm text-gold-deep">0{i + 1}</span>
              <h3 className="mt-4 text-2xl">{p.title}</h3>
              <p className="mt-3 leading-7 text-muted-foreground">{p.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-paper py-20 md:py-28">
        <div className="site-container">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <Eyebrow>Tratamentos</Eyebrow>
              <h2 className="section-title max-w-2xl">Áreas de cuidado</h2>
            </div>
            <ArrowLink to="/tratamentos">Ver todos os tratamentos</ArrowLink>
          </div>
          <div className="mt-14 grid gap-x-10 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
            {treatments.map((t) => (
              <article key={t.slug} className="editorial-rule pt-6">
                <p className="eyebrow">{t.category}</p>
                <h3 className="text-2xl">{t.title}</h3>
                <p className="mt-3 leading-7 text-muted-foreground">{t.description}</p>
                <p className="mt-4 text-sm text-muted-foreground/80">{t.items}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

         
         <section className="site-container grid items-center gap-12 py-20 md:py-28 lg:grid-cols-[.85fr_1.15fr] lg:gap-20">
        <div className="image-frame aspect-[4/5] w-full">
          <img src={saraAsset.url} alt="Dra. Sara Lacort, responsável técnica da Lacort Odontologia Especializada" loading="lazy" />
        </div>
        <div>
          <Eyebrow>Responsável técnica</Eyebrow>
          <h2 className="section-title">Dra. Sara Lacort</h2>
          <p className="page-intro">
            À frente da Lacort Odontologia Especializada, a Dra. Sara conduz o atendimento com
            atenção ao que cada pessoa traz: a queixa, o histórico, o receio e a expectativa.
          </p>
          <p className="mt-6 max-w-2xl leading-8 text-muted-foreground">
            O trabalho reúne diferentes especialidades da odontologia em um planejamento
            individualizado, sempre explicado com transparência antes de qualquer decisão.
          </p>
          <p className="mt-6 text-sm text-muted-foreground">{clinic.registration}</p>
          <div className="mt-10"><ArrowLink to="/sobre">Conhecer a clínica</ArrowLink></div>
        </div>
      </section>
      

      <section className="bg-paper py-20 md:py-28">
        <div className="site-container">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <Eyebrow>Tire suas dúvidas</Eyebrow>
              <h2 className="section-title max-w-2xl">Conteúdos para entender melhor</h2>
            </div>
            <ArrowLink to="/conteudos">Ver todos os conteúdos</ArrowLink>
          </div>
          <div className="mt-14 grid gap-10 md:grid-cols-3">
            {draftArticles.map((a) => (
              <article key={a.slug} className="editorial-rule pt-6">
                <p className="eyebrow">{a.category}</p>
                <h3 className="text-2xl leading-snug">{a.title}</h3>
                <p className="mt-3 leading-7 text-muted-foreground">{a.excerpt}</p>
                <p className="mt-4 text-xs uppercase tracking-widest text-muted-foreground/70">Leitura de {a.read}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="site-container grid gap-10 py-20 md:grid-cols-3 md:py-24">
        <div className="editorial-rule pt-6"><MapPin className="size-5 text-gold-deep" /><h3 className="mt-4 text-2xl">Onde estamos</h3><p className="mt-3 leading-7 text-muted-foreground">{clinic.address}<br />{clinic.district}<br />{clinic.postalCode}</p></div>
        <div className="editorial-rule pt-6"><Clock className="size-5 text-gold-deep" /><h3 className="mt-4 text-2xl">Horários</h3><p className="mt-3 leading-7 text-muted-foreground">{clinic.hours.map((h) => <span key={h} className="block">{h}</span>)}</p></div>
        <div className="editorial-rule pt-6"><MessageCircle className="size-5 text-gold-deep" /><h3 className="mt-4 text-2xl">Fale conosco</h3><p className="mt-3 leading-7 text-muted-foreground">{clinic.whatsappDisplay}<br />{clinic.email}</p><div className="mt-5"><ArrowLink to="/contato">Ir para contato</ArrowLink></div></div>
      </section>

      <FinalCta />
    </>
  );
}
