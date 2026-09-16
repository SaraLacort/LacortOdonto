export const clinic = {
  name: "Lacort Odontologia Especializada",
  whatsappDisplay: "(11) 92211-4728",
  whatsappNumber: "5511922114728",
  email: "recepcao@lacortodonto.com.br",
  address: "Av. Dr. Eduardo Cotching, 1963",
  district: "Vila Formosa — São Paulo/SP",
  postalCode: "CEP 03356-001",
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=Av.+Dr.+Eduardo+Cotching,+1963,+Vila+Formosa,+São+Paulo,+SP",
  instagram: "@lacortodonto",
  hours: ["Segunda a sexta, das 9h às 18h", "Sábados, das 9h às 12h30"],
  director: "Dra. Sara Lacort",
  registration: "CROSP 155460 SP",
};

export function whatsappUrl(message = "Olá! Gostaria de agendar uma avaliação na Lacort Odontologia.") {
  return `https://wa.me/${clinic.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export const treatments = [
  { slug: "estetica", category: "Estética", title: "Estética do sorriso", description: "Planejamento individualizado para preservar naturalidade e harmonia.", items: "Facetas, clareamento e restaurações estéticas" },
  { slug: "protese-reabilitacao", category: "Reabilitação", title: "Prótese e reabilitação", description: "Possibilidades para recuperar função, conforto e segurança ao sorrir.", items: "Próteses, coroas e reabilitação oral" },
  { slug: "implantes", category: "Implantes", title: "Implantes dentários", description: "Avaliação cuidadosa e planejamento para diferentes necessidades de reabilitação.", items: "Implantes e próteses sobre implantes" },
  { slug: "endodontia", category: "Saúde bucal", title: "Endodontia", description: "Avaliação das estruturas internas do dente e tratamento quando necessário.", items: "Tratamento de canal e acompanhamento" },
  { slug: "ortodontia", category: "Ortodontia", title: "Ortodontia", description: "Planejamento para alinhamento, função e acompanhamento do sorriso.", items: "Avaliação e planejamento ortodôntico" },
  { slug: "alinhadores", category: "Ortodontia", title: "Alinhadores", description: "Uma possibilidade ortodôntica que depende de indicação profissional.", items: "Planejamento e acompanhamento individual" },
  { slug: "clinica-geral", category: "Prevenção", title: "Clínica geral e prevenção", description: "Cuidado contínuo para avaliação, prevenção e manutenção da saúde bucal.", items: "Avaliação, prevenção e orientação" },
] as const;

export const draftArticles = [
  { slug: "consulta-para-quem-tem-medo", category: "Medo de dentista", title: "Como funciona uma consulta para quem tem medo de dentista?", excerpt: "Uma estrutura inicial para explicar como a escuta e a clareza podem fazer parte do primeiro encontro.", read: "4 min" },
  { slug: "sensibilidade-frio-quente", category: "Saúde bucal", title: "Sensibilidade ao frio e ao quente: o que observar?", excerpt: "Um guia introdutório sobre sinais que merecem atenção e avaliação profissional.", read: "5 min" },
  { slug: "implante-dentario-entenda", category: "Implantes", title: "Implante dentário: por onde começa o planejamento?", excerpt: "Conheça as etapas gerais que podem fazer parte de uma avaliação individualizada.", read: "6 min" },
] as const;

export const draftNews = [
  { slug: "novidade-exemplo-lacort", category: "Clínica", title: "Um novo capítulo na jornada da Lacort", excerpt: "Espaço editorial preparado para compartilhar novidades reais da clínica.", date: "Conteúdo de exemplo" },
  { slug: "atualizacao-atendimento", category: "Informações", title: "Informações importantes para nossos pacientes", excerpt: "Modelo para comunicados de horários, atendimento e orientações.", date: "Conteúdo de exemplo" },
  { slug: "lacort-em-atualizacao", category: "Odontologia", title: "Conhecimento que acompanha a prática clínica", excerpt: "Modelo para cursos, eventos e atualizações profissionais confirmadas.", date: "Conteúdo de exemplo" },
] as const;

export const nav = [
  { label: "A Clínica", to: "/sobre" },
  { label: "Tratamentos", to: "/tratamentos" },
  { label: "Para Pacientes", to: "/pacientes" },
  { label: "Notícias", to: "/noticias" },
  { label: "Produção Científica", to: "/artigos-cientificos" },
  { label: "Contato", to: "/contato" },
] as const;