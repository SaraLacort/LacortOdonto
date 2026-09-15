export type TreatmentFaq = {
  question: string;
  answer: string;
};

export type TreatmentPage = {
  slug: string;
  category: string;
  title: string;
  headline: string;
  introduction: string;
  indicationsTitle: string;
  indications: string[];
  steps: {
    title: string;
    text: string;
  }[];
  important: string[];
  faqs: TreatmentFaq[];
  relatedSlugs: string[];
};

export const treatmentPages: TreatmentPage[] = [
  {
    slug: "estetica-do-sorriso",
    category: "Estética",
    title: "Estética do sorriso",
    headline: "Naturalidade começa com planejamento.",
    introduction:
      "Os tratamentos estéticos procuram melhorar características do sorriso sem ignorar saúde, função e individualidade. A escolha do procedimento depende da avaliação clínica, das condições dos dentes e do resultado que a pessoa deseja alcançar.",
    indicationsTitle: "O que pode ser avaliado",
    indications: [
      "Alterações de cor ou manchas nos dentes.",
      "Diferenças de formato, tamanho ou proporção.",
      "Restaurações antigas que precisam ser avaliadas.",
      "Espaços ou pequenas irregularidades no sorriso.",
      "Desejo de melhorar a harmonia mantendo naturalidade.",
    ],
    steps: [
      {
        title: "Conversa inicial",
        text: "Entendemos o que você gostaria de modificar e quais são suas expectativas.",
      },
      {
        title: "Avaliação clínica",
        text: "Verificamos dentes, gengiva, mordida, restaurações e saúde bucal.",
      },
      {
        title: "Planejamento",
        text: "As possibilidades são explicadas, incluindo limites, etapas e cuidados.",
      },
      {
        title: "Tratamento e acompanhamento",
        text: "O procedimento indicado é realizado e acompanhado conforme a necessidade.",
      },
    ],
    important: [
      "Clareamento, facetas e restaurações possuem indicações diferentes.",
      "Nem toda alteração estética precisa de desgaste dental.",
      "O resultado depende das condições clínicas e características individuais.",
    ],
    faqs: [
      {
        question: "Qual tratamento estético é mais indicado?",
        answer:
          "Depende daquilo que será modificado e das condições dos dentes. A avaliação permite comparar as possibilidades.",
      },
      {
        question: "Todo tratamento estético exige desgaste?",
        answer:
          "Não. Alguns procedimentos podem ser conservadores, enquanto outros exigem preparação. Isso precisa ser definido individualmente.",
      },
    ],
    relatedSlugs: [
      "clinica-geral-e-prevencao",
      "ortodontia",
      "protese-e-reabilitacao",
    ],
  },

  {
    slug: "protese-e-reabilitacao",
    category: "Reabilitação",
    title: "Prótese e reabilitação oral",
    headline: "Recuperar dentes também é recuperar segurança e função.",
    introduction:
      "A reabilitação oral reúne diferentes possibilidades para substituir, reconstruir ou proteger dentes comprometidos. O planejamento considera mastigação, conforto, estética, saúde bucal e as necessidades de cada pessoa.",
    indicationsTitle: "Situações que podem precisar de avaliação",
    indications: [
      "Ausência de um ou mais dentes.",
      "Dentes fraturados ou muito desgastados.",
      "Próteses antigas, instáveis ou desconfortáveis.",
      "Dificuldade para mastigar determinados alimentos.",
      "Necessidade de reconstruir função e estética.",
    ],
    steps: [
      {
        title: "Avaliação completa",
        text: "Analisamos dentes, gengiva, mordida, próteses existentes e exames disponíveis.",
      },
      {
        title: "Definição de prioridades",
        text: "Necessidades de saúde e função são organizadas antes da etapa protética.",
      },
      {
        title: "Escolha da solução",
        text: "As alternativas são comparadas considerando benefícios, limitações e manutenção.",
      },
      {
        title: "Adaptação e acompanhamento",
        text: "Após a instalação, avaliamos conforto, adaptação e necessidade de ajustes.",
      },
    ],
    important: [
      "Existem diferentes tipos de próteses, fixas ou removíveis.",
      "A escolha depende da condição clínica e não apenas da preferência estética.",
      "Próteses também precisam de higiene, manutenção e acompanhamento.",
    ],
    faqs: [
      {
        question: "Como saber qual prótese é adequada?",
        answer:
          "A escolha depende da quantidade e condição dos dentes, suporte ósseo, saúde gengival, mordida e objetivos do tratamento.",
      },
      {
        question: "É necessário trocar uma prótese antiga?",
        answer:
          "Nem sempre. Ela deve ser avaliada quando causa desconforto, está instável, danificada ou apresenta dificuldade de higienização.",
      },
    ],
    relatedSlugs: [
      "implantes-dentarios",
      "estetica-do-sorriso",
      "clinica-geral-e-prevencao",
    ],
  },

  {
    slug: "implantes-dentarios",
    category: "Implantes",
    title: "Implantes dentários",
    headline: "Planejamento cuidadoso para substituir dentes perdidos.",
    introduction:
      "Os implantes podem servir de suporte para diferentes formas de reabilitação. A indicação depende de avaliação clínica, exames de imagem, saúde bucal e condições gerais de saúde.",
    indicationsTitle: "Quando os implantes podem ser considerados",
    indications: [
      "Perda de um único dente.",
      "Ausência de vários dentes.",
      "Necessidade de maior estabilidade para uma prótese.",
      "Reabilitação de uma arcada com ausência dentária.",
      "Substituição de dentes que não podem ser mantidos, após avaliação.",
    ],
    steps: [
      {
        title: "Consulta e exames",
        text: "Avaliamos saúde bucal, histórico de saúde e exames necessários ao planejamento.",
      },
      {
        title: "Planejamento da reabilitação",
        text: "A posição dos implantes é definida considerando a futura prótese e a anatomia local.",
      },
      {
        title: "Etapa cirúrgica",
        text: "O implante é instalado de acordo com o planejamento individual.",
      },
      {
        title: "Etapa protética",
        text: "Após o período indicado, é confeccionada a prótese planejada para o caso.",
      },
    ],
    important: [
      "Implantes não são automaticamente indicados para todas as pessoas.",
      "O tempo de tratamento varia conforme o caso e as etapas necessárias.",
      "Higiene e acompanhamento são essenciais para a manutenção.",
    ],
    faqs: [
      {
        question: "Qualquer pessoa pode colocar implante?",
        answer:
          "Não necessariamente. É preciso avaliar saúde bucal, quantidade óssea, histórico médico, hábitos e outros fatores individuais.",
      },
      {
        question: "O implante e a prótese são a mesma coisa?",
        answer:
          "Não. O implante funciona como suporte instalado no osso, enquanto a prótese corresponde à parte utilizada para reabilitar o dente.",
      },
    ],
    relatedSlugs: [
      "protese-e-reabilitacao",
      "clinica-geral-e-prevencao",
      "estetica-do-sorriso",
    ],
  },

  {
    slug: "endodontia",
    category: "Saúde bucal",
    title: "Endodontia",
    headline: "Cuidado com a parte interna do dente.",
    introduction:
      "A endodontia é a área relacionada ao diagnóstico e tratamento das estruturas internas do dente. O tratamento de canal pode ser indicado em algumas situações, mas dor ou sensibilidade não significam automaticamente que ele será necessário.",
    indicationsTitle: "Sinais que merecem avaliação",
    indications: [
      "Dor espontânea ou persistente.",
      "Sensibilidade intensa ou prolongada.",
      "Dor ao mastigar ou tocar no dente.",
      "Alteração de cor após trauma.",
      "Inchaço ou presença de infecção.",
    ],
    steps: [
      {
        title: "Investigação",
        text: "A queixa, o histórico e os sinais clínicos são avaliados cuidadosamente.",
      },
      {
        title: "Exames",
        text: "Testes clínicos e exames de imagem podem ser necessários para o diagnóstico.",
      },
      {
        title: "Tratamento",
        text: "Quando indicado, o interior do dente é tratado e preparado para o selamento.",
      },
      {
        title: "Restauração",
        text: "Depois do tratamento, o dente precisa receber a restauração adequada.",
      },
    ],
    important: [
      "Nem toda dor de dente significa necessidade de canal.",
      "Adiar a avaliação pode permitir a evolução do problema.",
      "A restauração posterior é importante para proteger o dente tratado.",
    ],
    faqs: [
      {
        question: "Toda dor de dente precisa de canal?",
        answer:
          "Não. Cáries, gengiva, fraturas, sensibilidade e outras condições também podem causar dor.",
      },
      {
        question: "O dente precisa ser restaurado depois?",
        answer:
          "Sim. A forma de restauração depende da estrutura dental restante e da função daquele dente.",
      },
    ],
    relatedSlugs: [
      "clinica-geral-e-prevencao",
      "protese-e-reabilitacao",
      "estetica-do-sorriso",
    ],
  },

  {
    slug: "ortodontia",
    category: "Ortodontia",
    title: "Ortodontia",
    headline: "Alinhamento, função e acompanhamento do sorriso.",
    introduction:
      "O tratamento ortodôntico pode corrigir posições dentárias e relações de mordida. O planejamento considera necessidades funcionais, saúde bucal, estética e características individuais.",
    indicationsTitle: "O que pode ser avaliado",
    indications: [
      "Dentes desalinhados ou com pouco espaço.",
      "Espaços entre os dentes.",
      "Dificuldades relacionadas à mordida.",
      "Necessidade de preparar o sorriso para outra reabilitação.",
      "Desejo de melhorar alinhamento e harmonia.",
    ],
    steps: [
      {
        title: "Avaliação",
        text: "Examinamos dentes, gengiva, mordida e necessidades apresentadas.",
      },
      {
        title: "Documentação",
        text: "Exames e registros podem ser solicitados para completar o diagnóstico.",
      },
      {
        title: "Planejamento",
        text: "O tipo de aparelho e as etapas são definidos conforme cada caso.",
      },
      {
        title: "Acompanhamento",
        text: "Consultas periódicas permitem avaliar a evolução e realizar ajustes.",
      },
    ],
    important: [
      "O tempo de tratamento não é igual para todas as pessoas.",
      "A higiene precisa de atenção durante o uso do aparelho.",
      "Depois da movimentação, a contenção pode ser necessária.",
    ],
    faqs: [
      {
        question: "Quanto tempo dura um tratamento ortodôntico?",
        answer:
          "A duração depende da complexidade, do planejamento, da resposta biológica e da colaboração durante o tratamento.",
      },
      {
        question: "Adultos podem fazer tratamento ortodôntico?",
        answer:
          "Sim, desde que as condições de saúde bucal sejam avaliadas e acompanhadas.",
      },
    ],
    relatedSlugs: [
      "alinhadores",
      "estetica-do-sorriso",
      "clinica-geral-e-prevencao",
    ],
  },

  {
    slug: "alinhadores",
    category: "Ortodontia",
    title: "Alinhadores",
    headline: "Uma alternativa discreta para alguns planejamentos ortodônticos.",
    introduction:
      "Os alinhadores são placas removíveis produzidas para realizar movimentações dentárias planejadas. Eles não são indicados automaticamente para todos os casos e exigem avaliação e acompanhamento profissional.",
    indicationsTitle: "Quando podem ser considerados",
    indications: [
      "Alguns casos de desalinhamento dentário.",
      "Presença de espaços entre os dentes.",
      "Pessoas que procuram uma opção ortodôntica removível.",
      "Casos compatíveis com planejamento por alinhadores.",
      "Tratamentos que exigem acompanhamento e uso disciplinado.",
    ],
    steps: [
      {
        title: "Avaliação ortodôntica",
        text: "Verificamos se o caso possui indicação para tratamento com alinhadores.",
      },
      {
        title: "Registros e planejamento",
        text: "Imagens, modelos ou escaneamento podem ser utilizados no planejamento.",
      },
      {
        title: "Uso orientado",
        text: "As placas são utilizadas conforme as orientações profissionais.",
      },
      {
        title: "Consultas de acompanhamento",
        text: "A evolução é conferida e novas etapas são entregues quando necessário.",
      },
    ],
    important: [
      "Alinhadores precisam ser utilizados pelo período orientado diariamente.",
      "Serem removíveis não significa ausência de acompanhamento.",
      "Outros recursos podem ser necessários durante o tratamento.",
    ],
    faqs: [
      {
        question: "Alinhadores servem para todos os casos?",
        answer:
          "Não. A indicação depende do tipo e da complexidade da movimentação necessária.",
      },
      {
        question: "Posso retirar os alinhadores?",
        answer:
          "Eles são removíveis, mas precisam ser utilizados conforme a orientação para que o planejamento possa evoluir.",
      },
    ],
    relatedSlugs: [
      "ortodontia",
      "estetica-do-sorriso",
      "clinica-geral-e-prevencao",
    ],
  },

  {
    slug: "clinica-geral-e-prevencao",
    category: "Prevenção",
    title: "Clínica geral e prevenção",
    headline: "Cuidar antes que pequenos problemas se tornem maiores.",
    introduction:
      "A clínica geral acompanha a saúde bucal de forma ampla. Consultas periódicas ajudam a identificar necessidades, orientar a higiene e organizar tratamentos quando alguma alteração é encontrada.",
    indicationsTitle: "O que faz parte desse acompanhamento",
    indications: [
      "Avaliação geral da saúde bucal.",
      "Prevenção e orientação de higiene.",
      "Limpeza profissional quando indicada.",
      "Avaliação de cáries, restaurações e gengiva.",
      "Acompanhamento após outros tratamentos.",
    ],
    steps: [
      {
        title: "Conversa",
        text: "Conhecemos sua rotina, histórico, queixas e objetivos.",
      },
      {
        title: "Exame clínico",
        text: "Avaliamos dentes, gengiva, restaurações, mordida e tecidos da boca.",
      },
      {
        title: "Orientações",
        text: "Explicamos os achados e os cuidados que podem ser realizados em casa.",
      },
      {
        title: "Plano de acompanhamento",
        text: "Quando necessário, organizamos prioridades e retornos.",
      },
    ],
    important: [
      "A frequência das consultas deve ser definida individualmente.",
      "Prevenção não se resume à limpeza profissional.",
      "Mudanças ou desconfortos persistentes precisam ser avaliados.",
    ],
    faqs: [
      {
        question: "Com que frequência devo ir ao dentista?",
        answer:
          "A periodicidade depende da saúde bucal, dos fatores de risco e das necessidades de cada pessoa.",
      },
      {
        question: "Consulta preventiva é apenas limpeza?",
        answer:
          "Não. Ela também pode envolver exame clínico, orientação, avaliação da gengiva, restaurações e outras estruturas.",
      },
    ],
    relatedSlugs: [
      "estetica-do-sorriso",
      "endodontia",
      "protese-e-reabilitacao",
    ],
  },
];

export function getTreatmentBySlug(slug: string) {
  return treatmentPages.find((treatment) => treatment.slug === slug);
}