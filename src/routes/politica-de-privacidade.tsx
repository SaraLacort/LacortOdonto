import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/page-elements";

export const Route = createFileRoute("/politica-de-privacidade")({
  head: () => ({
    meta: [
      { title: "Política de Privacidade — Lacort Odontologia Especializada" },
      { name: "description", content: "Política de Privacidade na Lacort Odontologia Especializada, em Vila Formosa, São Paulo." },
      { property: "og:title", content: "Política de Privacidade — Lacort Odontologia Especializada" },
      { property: "og:description", content: "Política de Privacidade na Lacort Odontologia Especializada, em Vila Formosa, São Paulo." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <PageHero
      eyebrow="Lacort Odontologia"
      title="Política de Privacidade"
      intro="Esta página está em preparação e receberá o conteúdo definitivo em breve."
    />
  );
}
