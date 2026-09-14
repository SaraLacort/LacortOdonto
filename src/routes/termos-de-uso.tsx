import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/page-elements";

export const Route = createFileRoute("/termos-de-uso")({
  head: () => ({
    meta: [
      { title: "Termos de Uso — Lacort Odontologia Especializada" },
      { name: "description", content: "Termos de Uso na Lacort Odontologia Especializada, em Vila Formosa, São Paulo." },
      { property: "og:title", content: "Termos de Uso — Lacort Odontologia Especializada" },
      { property: "og:description", content: "Termos de Uso na Lacort Odontologia Especializada, em Vila Formosa, São Paulo." },
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
      title="Termos de Uso"
      intro="Esta página está em preparação e receberá o conteúdo definitivo em breve."
    />
  );
}
