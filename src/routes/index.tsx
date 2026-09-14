import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Check,
  Clock3,
  MapPin,
  MessageCircle,
  ShieldCheck,
} from "lucide-react";
import clinicaAsset from "@/assets/clinica-lacort.jpg.asset.json";
import saraAsset from "@/assets/dra-sara-lacort.png.asset.json";
import { ArrowLink, Eyebrow } from "@/components/page-elements";
import { Button } from "@/components/ui/button";
import { clinic, treatments, whatsappUrl } from "@/lib/site-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dentista na Vila Formosa | Lacort Odontologia Especializada" },
      {
        name: "description",
        content:
          "Atendimento odontológico humanizado na Vila Formosa, São Paulo. Avaliação cuidadosa, explicações claras e tratamentos planejados no seu tempo.",
      },
      {
        property: "og:title",
        content: "Lacort Odontologia — cuidado sem pressa e sem julgamentos",
      },
      {
        property: "og:description",
        content:
          "Atendimento odontológico humanizado na Vila Formosa, com escuta, clareza e planejamento individualizado.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const reasons = [
  "Você sente medo, vergonha ou ansiedade antes de uma consulta.",
  "Faz tempo que não vai ao dentista e não sabe por onde começar.",
  "Quer entender as opções antes de decidir qualquer tratamento.",
];

const journey = [
  {
    number: "01",
    title: "A gente conversa",
    text: "Você conta o que incomoda, o que espera e também o que preocupa.",
  },
  {
    number: "02",
    title: "Avaliamos com calma",
    text: "O exame é feito respeitando seus limites e o tempo necessário.",
  },
  {
    number: "03",
    title: "Explicamos o cenário",
    text: "Você entende o que foi observado e quais caminhos podem ser considerados.",
  },
  {
    number: "04",
    title: "Você decide",
    text: "O plano é construído com clareza, prioridades e espaço para perguntas.",
  },
];

const faqs = [
  {
    question: "Tenho medo de dentista. Posso avisar antes?",
    answer:
      "Sim. Conte isso já no primeiro contato. Assim, o atendimento pode ser preparado com mais tempo, explicações e pausas sempre que você precisar.",
  },
  {
    question: "Preciso fazer o tratamento no mesmo dia?",
    answer:
      "Não. A primeira consulta serve para conversar, avaliar e explicar as possibilidades. Você decide os próximos passos depois de compreender o seu caso.",
  },
  {
    question: "Vocês atendem convênio?",
    answer:
      "As condições de atendimento podem mudar. Fale com a recepção pelo WhatsApp para confirmar os convênios e procedimentos disponíveis.",
  },
  {
    question: "O que devo levar à primeira consulta?",
    answer:
      "Leve um documento e, se tiver, radiografias ou exames odontológicos recentes. Se não tiver exames, a necessidade será avaliada durante a consulta.",
  },
];

function Index() {
  return (
    <>
      <section className="home-hero">
        <div className="home-orbit home-orbit-one" aria-hidden="true" />
        <div className="home-orbit home-orbit-two" aria-hidden="true" />
        <div className="site-container home-hero-grid">
          <div className="home-hero-copy">
            <p className="home-kicker">
              <span />
              Odontologia humanizada · Vila Formosa
            </p>
            <h1 className="home-title">
              Seu sorriso merece cuidado.
              <em> Você merece ser ouvida.</em>
            </h1>
            <p className="home-lead">
              Atendimento odontológico com calma, explicações claras e um plano construído
              junto com você — sem pressa e sem julgamentos.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button asChild variant="gold" size="lg" className="home-primary-button">
                <a href={whatsappUrl("Olá! Conheci a Lacort pelo site e gostaria de agendar uma avaliação.")} target="_blank" rel="noreferrer">
                  Agendar minha avaliação
                  <ArrowRight />
                </a>
              </Button>
              <Button asChild variant="outlineDark" size="lg" className="home-secondary-button">
                <a href="#tratamentos">Ver tratamentos</a>
              </Button>
            </div>
            <div className="home-first-visit">
              <ShieldCheck aria-hidden="true" />
              <p>
                <strong>Primeira consulta com clareza:</strong>
                conversa, avaliação e próximos passos explicados.
              </p>
            </div>
          </div>

          <div className="home-visual">
            <div className="home-photo-frame">
              <img
                src={saraAsset.url}
                alt="Dra. Sara Lacort, cirurgiã-dentista da Lacort Odontologia"
                loading="eager"
                fetchPriority="high"
              />
            </div>
            <div className="home-photo-caption">
              <p>Dra. Sara Lacort</p>
              <span>{clinic.registration}</span>
            </div>
            <div className="home-place-note">
              <MapPin aria-hidden="true" />
              <span>Vila Formosa<br />São Paulo</span>
            </div>
          </div>
        </div>
      </section>

      <section className="home-assurance" aria-label="Diferenciais do atendimento">
        <div className="site-container home-assurance-grid">
          <p><Check /> Atendimento no seu ritmo</p>
          <p><Check /> Explicação antes de cada etapa</p>
          <p><Check /> Planejamento individualizado</p>
        </div>
      </section>

      <section className="site-container home-empathy">
        <div>
          <Eyebrow>Você não precisa adiar mais</Eyebrow>
          <h2 className="home-section-title">
            Cuidar da saúde bucal não deveria começar pelo medo.
          </h2>
        </div>
        <div>
          <p className="home-section-intro">Talvez você esteja aqui porque:</p>
          <ul className="home-reason-list">
            {reasons.map((reason) => (
              <li key={reason}>
                <span aria-hidden="true" />
                {reason}
              </li>
            ))}
          </ul>
          <p className="mt-8 max-w-xl leading-8 text-muted-foreground">
            Seja qual for o ponto de partida, a consulta começa entendendo sua história. Não existe
            bronca por ter esperado e nenhuma decisão precisa ser tomada sem você compreender o porquê.
          </p>
          <div className="mt-8">
            <ArrowLink to="/pacientes">Entenda como será seu atendimento</ArrowLink>
          </div>
        </div>
      </section>

      <section id="tratamentos" className="home-treatments">
        <div className="site-container">
          <div className="home-section-heading">
            <div>
              <Eyebrow>Tratamentos</Eyebrow>
              <h2 className="home-section-title max-w-3xl">
                Diferentes caminhos. Um cuidado pensado para você.
              </h2>
            </div>
            <p>
              Cada indicação depende de avaliação clínica. Primeiro entendemos sua necessidade;
              depois, explicamos as possibilidades.
            </p>
          </div>

          <div className="home-treatment-grid">
            {treatments.map((t, index) => (
              <article key={t.slug} className="home-treatment-item">
                <div className="home-treatment-number">{String(index + 1).padStart(2, "0")}</div>
                <div>
                  <p className="eyebrow">{t.category}</p>
                  <h3>{t.title}</h3>
                  <p>{t.description}</p>
                  <span>{t.items}</span>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-12">
            <Button asChild variant="outline" size="lg" className="rounded-none">
              <Link to="/tratamentos">
                Conhecer todas as áreas
                <ArrowRight />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="home-journey">
        <div className="site-container">
          <div className="max-w-3xl">
            <Eyebrow>Primeira consulta</Eyebrow>
            <h2 className="home-section-title text-cream">
              Você sabe o que vai acontecer — desde o começo.
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-cream/70">
              Informação também faz parte do cuidado. Por isso, a primeira consulta tem um caminho
              simples e transparente.
            </p>
          </div>
          <ol className="home-journey-grid">
            {journey.map((step) => (
              <li key={step.number}>
                <span>{step.number}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </li>
            ))}
          </ol>
          <Button asChild variant="gold" size="lg" className="mt-12 home-primary-button">
            <a href={whatsappUrl("Olá! Gostaria de saber mais sobre a primeira consulta na Lacort.")} target="_blank" rel="noreferrer">
              Conversar sobre a primeira consulta
            </a>
          </Button>
        </div>
      </section>

      <section className="site-container home-clinic">
        <div className="home-clinic-image">
          <img
            src={clinicaAsset.url}
            alt="Consultório da Lacort Odontologia Especializada na Vila Formosa"
            loading="lazy"
          />
          <span>Ambiente real da clínica</span>
        </div>
        <div>
          <Eyebrow>A Lacort</Eyebrow>
          <h2 className="home-section-title">Um espaço reservado para cuidar de você.</h2>
          <p className="home-section-intro">
            Na Vila Formosa, a clínica foi pensada para oferecer um atendimento próximo, tranquilo
            e com atenção verdadeira a cada pessoa.
          </p>
          <div className="home-location-details">
            <div>
              <MapPin />
              <p><strong>{clinic.address}</strong><span>{clinic.district}<br />{clinic.postalCode}</span></p>
            </div>
            <div>
              <Clock3 />
              <p><strong>Horários</strong><span>{clinic.hours.map((hour) => <small key={hour}>{hour}</small>)}</span></p>
            </div>
          </div>
          <div className="mt-9 flex flex-wrap gap-6">
            <a className="arrow-link" href={clinic.mapsUrl} target="_blank" rel="noreferrer">
              Como chegar
              <ArrowRight />
            </a>
            <ArrowLink to="/sobre">Conhecer a Lacort</ArrowLink>
          </div>
        </div>
      </section>

      <section className="home-professional">
        <div className="site-container home-professional-grid">
          <div>
            <p className="home-monogram" aria-hidden="true">L</p>
          </div>
          <div>
            <Eyebrow>À frente do seu cuidado</Eyebrow>
            <h2 className="home-section-title text-cream">Dra. Sara Lacort</h2>
            <p className="mt-7 max-w-3xl text-xl leading-9 text-cream/78">
              “Um atendimento bem conduzido começa quando o paciente entende que pode falar,
              perguntar e participar das decisões sobre o próprio tratamento.”
            </p>
            <p className="mt-8 text-sm uppercase tracking-[0.16em] text-gold">
              Cirurgiã-dentista · {clinic.registration}
            </p>
          </div>
        </div>
      </section>

      <section className="site-container home-faq">
        <div>
          <Eyebrow>Dúvidas frequentes</Eyebrow>
          <h2 className="home-section-title">Antes de agendar, você pode querer saber.</h2>
          <p className="home-section-intro">
            Se sua dúvida não estiver aqui, a recepção responde diretamente pelo WhatsApp.
          </p>
          <a
            className="home-whatsapp-link"
            href={whatsappUrl("Olá! Tenho uma dúvida antes de agendar uma avaliação.")} 
            target="_blank"
            rel="noreferrer"
          >
            <MessageCircle />
            Tirar uma dúvida
          </a>
        </div>
        <div className="home-faq-list">
          {faqs.map((faq, index) => (
            <details key={faq.question}>
              <summary>
                <span>{String(index + 1).padStart(2, "0")}</span>
                {faq.question}
              </summary>
              <p>{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="home-final">
        <div className="site-container home-final-grid">
          <div>
            <Eyebrow>Seu próximo passo</Eyebrow>
            <h2>Comece com uma conversa.</h2>
            <p>
              Conte brevemente o que você precisa. A equipe orienta o agendamento pelo WhatsApp.
            </p>
          </div>
          <div className="home-final-action">
            <Button asChild variant="gold" size="lg" className="home-primary-button">
              <a href={whatsappUrl("Olá! Gostaria de agendar uma avaliação na Lacort Odontologia.")} target="_blank" rel="noreferrer">
                Agendar pelo WhatsApp
                <ArrowRight />
              </a>
            </Button>
            <span>{clinic.whatsappDisplay}</span>
          </div>
        </div>
      </section>
    </>
  );
}
