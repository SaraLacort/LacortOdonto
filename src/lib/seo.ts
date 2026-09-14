export const siteUrl = "https://lacortodonto.com.br";

export function seo(title: string, description: string, path = "") {
  return {
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: `${siteUrl}${path}` }],
  };
}