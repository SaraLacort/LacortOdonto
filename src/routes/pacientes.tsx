import { createFileRoute } from "@tanstack/react-router";
import { Eyebrow, FinalCta, PageHero } from "@/components/page-elements";

export const Route = createFileRoute("/pacientes")({
  head: () => ({
    meta: [
      { title: "Para Pacientes — Lacort Odontologia Especializada" },
      { name: "description", content: "Como funciona a primeira consulta, orientações para quem tem medo de dentista e dúvidas frequentes." },
      { property: "og:title", content: "Para Pacientes — Lacort Odontologia Especializada" },
      { property: "og:description", content: "Primeira consulta, medo de dentista e dúvidas frequentes na Lacort Odontologia." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Page,
});

const steps = [
  { title: "Conversa inicial", text: "Ouvimos sua queixa, seu histórico e o que você espera do tratamento." },
  { title: "Avaliação clínica", text: "Exame cuidadoso e, quando necessário, exames complementares." },
  { title: "Explicação das possibilidades", text: "Apresentamos os caminhos possíveis, o que cada um envolve e suas etapas." },
  { title: "Decisão no seu tempo", text: "Você decide com as informações em mãos, sem pressão." },
];

const faqs = [
  { q: "Preciso levar exames na primeira consulta?", a: "Se você já tiver radiografias ou documentação recente, leve. Caso não tenha, avaliamos o que é necessário durante a consulta." },
  { q: "Quanto tempo dura a primeira consulta?", a: "Reservamos tempo suficiente para conversar e examinar com calma. A duração varia conforme o caso." },
  { q: "Vocês atendem convênio?", a: "Consulte a recepção pelo WhatsApp para informações atualizadas sobre formas de atendimento e pagamento." },
  { q: "Tenho muito medo de dentista. Como funciona?", a: "Você pode contar isso logo no primeiro contato. O atendimento é conduzido em ritmo mais lento, com explicação de cada passo e pausas quando precisar." },
  { q: "Posso remarcar minha consulta?", a: "Sim. Avise com antecedência pelo WhatsApp para reorganizarmos a agenda." },
];

function Page() {
  return (
    <>
      <PageHero
        eyebrow="Para Pacientes"
        title="O que esperar do seu atendimento."
        intro="Informações práticas sobre a primeira consulta, o cuidado com quem sente medo e as perguntas que mais recebemos."
      />

      <section className="site-container py-20 md:py-28">
        <Eyebrow>Primeira consulta</Eyebrow>
        <h2 className="section-title max-w-3xl">Como funciona, passo a passo</h2>
        <div className="mt-14 grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <div key={s.title} className="editorial-rule pt-6">
              <span className="font-brand text-sm text-gold-deep">0{i + 1}</span>
              <h3 className="mt-4 text-2xl">{s.title}</h3>
              <p className="mt-3 leading-7 text-muted-foreground">{s.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-paper py-20 md:py-28">
        <div className="site-container grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20">
          <div>
            <Eyebrow>Medo de dentista</Eyebrow>
            <h2 className="section-title">Você pode dizer que tem medo.</h2>
          </div>
          <div className="space-y-6 text-lg leading-8 text-muted-foreground">
            <p>Muitas pessoas adiam o cuidado com a boca por causa de experiências difíceis no passado. Na Lacort, esse receio é tratado como parte importante da consulta, e não como algo a ser ignorado.</p>
            <p>O atendimento pode ser conduzido em etapas menores, com explicação prévia de cada passo, combinação de sinais para pausar e tempo para perguntas. O objetivo é que você se sinta em controle.</p>
          </div>
        </div>
      </section>

      <section className="site-container py-20 md:py-28">
        <Eyebrow>Dúvidas frequentes</Eyebrow>
        <h2 className="section-title max-w-3xl">Perguntas que mais recebemos</h2>
        <dl className="mt-14 max-w-4xl">
          {faqs.map((f) => (
            <div key={f.q} className="editorial-rule py-8">
              <dt className="text-2xl leading-snug">{f.q}</dt>
              <dd className="mt-3 leading-8 text-muted-foreground">{f.a}</dd>
            </div>
          ))}
        </dl>
      </section>

      <FinalCta />
    </>
  );
}
