import { createFileRoute } from "@tanstack/react-router";
import { Eyebrow, FinalCta, PageHero } from "@/components/page-elements";
import { clinic } from "@/lib/site-data";

export const Route = createFileRoute("/sobre")({
  head: () => ({
    meta: [
      { title: "A Clínica — Lacort Odontologia Especializada" },
      { name: "description", content: "Conheça a Lacort Odontologia Especializada e a Dra. Sara Lacort, em Vila Formosa, São Paulo." },
      { property: "og:title", content: "A Clínica — Lacort Odontologia Especializada" },
      { property: "og:description", content: "Conheça a Lacort Odontologia Especializada e a Dra. Sara Lacort, em Vila Formosa, São Paulo." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Page,
});

const values = [
  { title: "Escuta", text: "Antes de qualquer proposta, entender o que traz você até aqui." },
  { title: "Clareza", text: "Explicar o que foi observado e o que cada caminho envolve, sem promessas." },
  { title: "Respeito ao tempo", text: "Cada pessoa decide no seu ritmo, com as informações necessárias." },
  { title: "Cuidado contínuo", text: "O acompanhamento não termina no procedimento." },
];

function Page() {
  return (
    <>

      <section className="site-container py-20 md:py-28">
         <h2 className="section-title max-w-3xl">Conheça nosso espaço.</h2>
         <eyebrow>  </eyebrow>
         <div className="space-y-4">
        <p>  </p>
        <p>  </p>
       

        </div>
    
        <div className="image-frame aspect-[16/9] w-full max-w-4xl mx-auto border-8 border-gold rounded-lg overflow-hidden">
          <img src={"/clinica-lacort.jpg"} alt="Ambiente da Lacort Odontologia Especializada" loading="lazy" />
       
        </div>
        <div className="mt-16 grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20">
          <div>
            <Eyebrow>Nossa proposta</Eyebrow>
            <h2 className="section-title">Odontologia sem pressa.</h2>
          </div>
          <div className="space-y-6 text-lg leading-8 text-muted-foreground">
            <p>Acreditamos que um bom tratamento começa por uma boa conversa. Entender o histórico, a rotina e as expectativas de cada pessoa é o que permite construir um plano possível e realista.</p>
            <p>O ambiente foi pensado para ser tranquilo e acolhedor, especialmente para quem já teve experiências difíceis com atendimento odontológico.</p>
          </div>
        </div>
      </section>

      <section className="bg-paper py-20 md:py-28">
        <div className="site-container">
          <Eyebrow>Valores</Eyebrow>
          <h2 className="section-title max-w-3xl">O que orienta o atendimento</h2>
          <div className="mt-14 grid gap-10 md:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <div key={v.title} className="editorial-rule pt-6">
                <span className="font-brand text-sm text-gold-deep">0{i + 1}</span>
                <h3 className="mt-4 text-2xl">{v.title}</h3>
                <p className="mt-3 leading-7 text-muted-foreground">{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SEÇAO DRA SARA LACORT
      <section className="site-container grid items-center gap-12 py-20 md:py-28 lg:grid-cols-[.85fr_1.15fr] lg:gap-20">
        <div className="image-frame aspect-[4/5] w-full">
          <img src={"/dra-sara-lacort.webp"} alt="Dra. Sara Lacort" loading="lazy" />
        </div>
        <div>
          <Eyebrow>Responsável técnica</Eyebrow>
          <h2 className="section-title">Dra. Sara Lacort</h2>
          <p className="page-intro">Conduz o atendimento da clínica com atenção ao que cada pessoa traz e transparência sobre as possibilidades de cada caso.</p>
          <p className="mt-6 text-sm text-muted-foreground">{clinic.registration}</p>
        </div>
      </section>
       */}

      <FinalCta />
    </>
  );
}
