import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/termos-de-uso")({
  head: () => ({
    meta: [
      {
        title: "Termos de Uso | Lacort Odonto",
      },
      {
        name: "description",
        content:
          "Consulte os Termos de Uso do site da Lacort Odonto e as condições aplicáveis ao acesso aos conteúdos e canais de contato disponíveis.",
      },
      {
        property: "og:title",
        content: "Termos de Uso | Lacort Odonto",
      },
      {
        property: "og:description",
        content:
          "Condições para utilização do site, conteúdos e canais de contato da Lacort Odonto.",
      },
      {
        property: "og:type",
        content: "website",
      },
      {
        property: "og:url",
        content: "https://lacortodonto.com.br/termos-de-uso",
      },
      {
        name: "twitter:card",
        content: "summary_large_image",
      },
      {
        name: "twitter:title",
        content: "Termos de Uso | Lacort Odonto",
      },
      {
        name: "twitter:description",
        content:
          "Condições para utilização do site, conteúdos e canais de contato da Lacort Odonto.",
      },
    ],

    links: [
      {
        rel: "canonical",
        href: "https://lacortodonto.com.br/termos-de-uso",
      },
    ],
  }),

  component: Page,
});

function Page() {
  return (
    <section className="site-container py-20 md:py-28">
      <article className="mx-auto max-w-3xl">
        <p className="eyebrow">Lacort Odonto</p>

        <h1 className="section-title">Termos de Uso</h1>

        <p className="page-intro">
          Estes Termos de Uso estabelecem as condições gerais para acesso e
          utilização do site da Lacort Odonto, incluindo seus conteúdos,
          informações e canais de contato.
        </p>

        <div className="article-content mt-12">
          <h2>1. Finalidade do site</h2>

          <p>
            Este site tem caráter institucional e informativo, apresentando
            informações sobre a Lacort Odonto, áreas de atendimento,
            conteúdos relacionados à odontologia e formas de contato com a
            clínica.
          </p>

          <h2>2. Conteúdo informativo</h2>

          <p>
            Os conteúdos disponibilizados neste site têm finalidade
            informativa e educativa e não substituem consulta, avaliação,
            diagnóstico, planejamento ou acompanhamento individual realizado
            por profissional habilitado.
          </p>

          <p>
            Informações gerais sobre tratamentos odontológicos não devem ser
            interpretadas como indicação de tratamento para um caso
            específico, pois a necessidade e a indicação de cada procedimento
            dependem de avaliação individual.
          </p>

          <h2>3. Resultados de tratamentos</h2>

          <p>
            Resultados de tratamentos odontológicos podem variar de acordo
            com as características clínicas e individuais de cada paciente.
            A apresentação de informações sobre procedimentos não representa
            promessa ou garantia de resultado.
          </p>

          <h2>4. Formulário e canais de contato</h2>

          <p>
            O envio de uma mensagem pelo formulário, WhatsApp, e-mail ou
            outro canal disponibilizado neste site não constitui, por si só,
            consulta odontológica, diagnóstico, contratação de tratamento ou
            confirmação de agendamento.
          </p>

          <p>
            O usuário é responsável pela veracidade das informações que
            decidir fornecer por meio dos canais de contato.
          </p>

          <h2>5. Informações de saúde pelo formulário</h2>

          <p>
            O formulário de contato do site não é destinado ao envio de
            exames, diagnósticos, prontuários ou outras informações sensíveis
            de saúde. Para orientações relacionadas a situações clínicas,
            utilize os canais apropriados de atendimento da clínica.
          </p>

          <h2>6. Propriedade intelectual</h2>

          <p>
            Os elementos próprios deste site, incluindo textos, identidade
            visual, marca, materiais gráficos e conteúdos produzidos pela
            Lacort Odonto, são protegidos pela legislação aplicável, quando
            cabível.
          </p>

          <p>
            O conteúdo não deve ser reproduzido, modificado ou utilizado para
            fins comerciais de maneira que viole direitos da Lacort Odonto ou
            de terceiros.
          </p>

          <h2>7. Links e serviços externos</h2>

          <p>
            O site poderá disponibilizar links ou integrações com serviços
            externos, como mapas, redes sociais e canais de comunicação. O
            funcionamento e as práticas desses serviços são definidos por
            seus respectivos responsáveis.
          </p>

          <h2>8. Privacidade</h2>

          <p>
            O tratamento de dados pessoais fornecidos por meio deste site é
            abordado na Política de Privacidade da Lacort Odonto.
          </p>

          <h2>9. Disponibilidade do site</h2>

          <p>
            A Lacort Odonto busca manter as informações e funcionalidades do
            site disponíveis e atualizadas, mas poderão ocorrer interrupções,
            indisponibilidades temporárias, manutenções ou alterações.
          </p>

          <h2>10. Alterações destes termos</h2>

          <p>
            Estes Termos de Uso poderão ser atualizados para acompanhar
            alterações no site, nos serviços disponibilizados ou nas normas
            aplicáveis.
          </p>

          <p>
            <strong>Última atualização:</strong> setembro de 2026.
          </p>
        </div>
      </article>
    </section>
  );
}