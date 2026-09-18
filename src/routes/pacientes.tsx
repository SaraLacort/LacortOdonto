import { createFileRoute } from "@tanstack/react-router";
import { Eyebrow, FinalCta, PageHero } from "@/components/page-elements";

export const Route = createFileRoute("/pacientes")({
head: () => ({
  meta: [
    {
      title: "Dúvidas e Orientações para Pacientes | Lacort Odonto",
    },
    {
      name: "description",
      content:
        "Veja como funciona a primeira consulta odontológica, tire dúvidas sobre tratamentos e encontre orientações para pacientes da Lacort Odonto, na Vila Formosa.",
    },

    // Open Graph
    {
      property: "og:title",
      content: "Dúvidas e Orientações para Pacientes | Lacort Odonto",
    },
    {
      property: "og:description",
      content:
        "Primeira consulta, dúvidas sobre tratamentos e orientações para pacientes da Lacort Odonto, na Vila Formosa.",
    },
    {
      property: "og:type",
      content: "website",
    },
    {
      property: "og:url",
      content: "https://lacortodonto.com.br/pacientes",
    },

    // Twitter
    {
      name: "twitter:card",
      content: "summary_large_image",
    },
    {
      name: "twitter:title",
      content: "Dúvidas e Orientações para Pacientes | Lacort Odonto",
    },
    {
      name: "twitter:description",
      content:
        "Informações sobre primeira consulta e respostas para dúvidas frequentes sobre saúde bucal e tratamentos odontológicos.",
    },
  ],

  links: [
    {
      rel: "canonical",
      href: "https://lacortodonto.com.br/pacientes",
    },
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
  { q: "Clareamento dental enfraquece os dentes?", a: "O clareamento profissional utiliza agentes específicos e deve ser indicado após avaliação. Sensibilidade pode ocorrer em alguns pacientes, por isso concentração, técnica e acompanhamento precisam ser definidos individualmente." },
  { q: "Tenho medo de dentista. O que posso fazer?", a: "Conte isso já no primeiro contato. Conhecer seus receios permite planejar a consulta com mais tempo para explicações, pausas e adaptação do atendimento às suas necessidades." },
  { q: "Qual a diferença entre prótese, dentadura e implante?", a: "São formas diferentes de reabilitar dentes perdidos. Próteses podem ser fixas ou removíveis; a prótese total removível, popularmente chamada de dentadura, substitui os dentes de uma arcada. Já os implantes são estruturas instaladas no osso que podem servir de suporte para diferentes tipos de prótese e mantê-la fixa." },
  { q: "Quanto tempo dura um implante dentário?", a: "Não existe um prazo único. Higiene bucal, acompanhamento profissional, condições de saúde e hábitos individuais influenciam sua manutenção. O Ministério da Saúde destaca a importância da escovação, fio dental e cuidados ao redor dos implantes." },
  { q: "Tratamento de canal dói?", a: "O procedimento é realizado com anestesia local. A experiência varia conforme o quadro clínico e pode haver sensibilidade após o atendimento, por isso é importante tomar as medicações prescritas." },
  { q: "Quando um dente precisa de tratamento de canal?", a: "Dor intensa ou persistente, sensibilidade prolongada, alteração de cor e infecção podem estar associadas a problemas na polpa do dente. A necessidade de canal é determinada após avaliação clínica e, quando necessário, exames de imagem." },
  { q: "Como saber se preciso fazer uma limpeza dentária?", a: "Acúmulo de tártaro, sangramento gengival, alteração no hálito e sensação de dentes ásperos podem indicar necessidade de avaliação. A presença ou ausência desses sinais, porém, não substitui o exame clínico." },
   { q: "Gengiva sangrando é normal?", a: "Sangramento frequente merece atenção e pode estar relacionado à inflamação gengival, acúmulo de placa ou outras condições. O ideal é identificar a causa antes de iniciar qualquer tratamento." },
];

function Page() {
  return (
    <>


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
