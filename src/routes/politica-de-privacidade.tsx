import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/politica-de-privacidade")({
  head: () => ({
    meta: [
      {
        title: "Política de Privacidade | Lacort Odonto",
      },
      {
        name: "description",
        content:
          "Consulte a Política de Privacidade da Lacort Odonto e saiba como os dados enviados pelo site podem ser utilizados e protegidos.",
      },
      {
        property: "og:title",
        content: "Política de Privacidade | Lacort Odonto",
      },
      {
        property: "og:description",
        content:
          "Informações sobre o tratamento de dados pessoais enviados pelo site da Lacort Odonto.",
      },
      {
        property: "og:type",
        content: "website",
      },
      {
        property: "og:url",
        content: "https://lacortodonto.com.br/politica-de-privacidade",
      },
      {
        name: "twitter:card",
        content: "summary_large_image",
      },
      {
        name: "twitter:title",
        content: "Política de Privacidade | Lacort Odonto",
      },
      {
        name: "twitter:description",
        content:
          "Informações sobre o tratamento de dados pessoais enviados pelo site da Lacort Odonto.",
      },
    ],

    links: [
      {
        rel: "canonical",
        href: "https://lacortodonto.com.br/politica-de-privacidade",
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

        <h1 className="section-title">Política de Privacidade</h1>

        <p className="page-intro">
          A Lacort Odonto respeita a privacidade dos usuários deste site e
          busca tratar os dados pessoais fornecidos de forma responsável,
          transparente e compatível com as finalidades para as quais foram
          informados.
        </p>

        <div className="article-content mt-12">
          <h2>1. Dados que podem ser coletados</h2>

          <p>
            Ao utilizar o formulário de contato disponível neste site,
            poderão ser coletados dados informados voluntariamente pelo
            usuário, como nome, telefone ou WhatsApp, endereço de e-mail,
            assunto e conteúdo da mensagem.
          </p>

          <p>
            O formulário registra também a manifestação de consentimento
            apresentada no momento do envio.
          </p>

          <h2>2. Para que os dados são utilizados</h2>

          <p>
            Os dados enviados pelo formulário são utilizados para receber,
            identificar e responder solicitações de contato relacionadas aos
            serviços e ao atendimento da Lacort Odonto.
          </p>

          <h2>3. Dados de saúde</h2>

          <p>
            O formulário de contato não é destinado ao envio de informações
            clínicas, exames, diagnósticos ou outros dados sensíveis de
            saúde. Por esse motivo, solicitamos que esse tipo de informação
            não seja incluído nas mensagens enviadas pelo site.
          </p>

          <h2>4. Armazenamento e proteção</h2>

          <p>
            São adotadas medidas técnicas e administrativas compatíveis com
            o funcionamento do site para reduzir riscos de acesso,
            alteração, divulgação ou utilização não autorizada dos dados
            armazenados.
          </p>

          <h2>5. Compartilhamento de dados</h2>

          <p>
            Os dados poderão ser processados por serviços tecnológicos
            utilizados para o funcionamento e armazenamento das informações
            do site, na medida necessária à prestação desses serviços.
          </p>

          <h2>6. Direitos do titular</h2>

          <p>
            O titular dos dados poderá solicitar informações relacionadas ao
            tratamento de seus dados pessoais e, quando aplicável, exercer
            os direitos previstos na legislação brasileira de proteção de
            dados pessoais.
          </p>

          <h2>7. Contato</h2>

          <p>
            Para dúvidas ou solicitações relacionadas à privacidade e ao
            tratamento de dados pessoais, entre em contato pelo e-mail
            disponibilizado na página de contato deste site.
          </p>

          <h2>8. Atualizações desta política</h2>

          <p>
            Esta Política de Privacidade poderá ser atualizada para refletir
            alterações no funcionamento do site, nos serviços utilizados ou
            nas práticas relacionadas ao tratamento de dados pessoais.
          </p>

          <p>
            <strong>Última atualização:</strong> setembro de 2026.
          </p>
        </div>
      </article>
    </section>
  );
}