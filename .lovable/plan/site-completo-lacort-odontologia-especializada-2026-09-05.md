# Site completo — Lacort Odontologia Especializada

## Objetivo
Construir a plataforma institucional e editorial completa da Lacort, com site público, áreas de conteúdo, tratamentos, contato funcional e painel administrativo privado. A experiência será contemporânea, editorial, acolhedora e leve, usando preto/carvão, dourado pontual e fundos claros, sem aparência de template genérico.

## Dados confirmados
- WhatsApp: **(11) 92211-4728** (todos os botões abrirão uma conversa real com mensagem contextual).
- E-mail: **recepcao@lacortodonto.com.br**.
- Horários: **segunda a sexta, 9h–18h; sábado, 9h–12h30**.
- Responsável técnica: **Dra. Sara Lacort — CROSP 155460 SP**.
- Endereço: **Av. Dr. Eduardo Cotching, 1963 — Vila Formosa, São Paulo/SP — CEP 03356-001**.
- Instagram: **@lacortodonto**.
- Marca: logos enviados e símbolo oficial; Cinzel será reservada à marca e a destaques especiais, não aplicada obrigatoriamente a todos os títulos.
- Imagens: fotografia enviada da Dra. Sara e foto real do interior da clínica; nenhuma fachada, vídeo, paciente fictício, depoimento inventado ou antes/depois fictício.

## 1. Fundação visual e estrutura compartilhada
- Criar tokens de cor, tipografia, espaçamento, bordas, foco e movimento em um sistema visual único.
- Usar uma sans-serif legível no conteúdo e Cinzel apenas em elementos institucionais/editoriais selecionados.
- Preparar variações corretas do logo para fundos claros e escuros e gerar o favicon a partir do símbolo oficial.
- Criar cabeçalho responsivo com menus agrupados, versão compacta ao rolar e menu mobile acessível em tela inteira.
- Criar rodapé único com dados confirmados, links, Instagram e WhatsApp.
- Criar barra inferior mobile discreta e fechável para WhatsApp/agendamento.
- Centralizar todos os dados da clínica e mensagens de WhatsApp para evitar divergências.

## 2. Site público e jornada do paciente
Implementar páginas com composição variada e editorial, sem repetição excessiva de cards:
- `/`: fotografia da Dra. Sara em destaque, posicionamento, tratamentos, medo de dentista, Dra. Sara, ambiente, primeira consulta, espaço preparado para avaliações reais, conteúdos, produção científica e chamada final.
- `/sobre`: narrativa institucional, missão, visão e valores em composição editorial.
- `/clinica`: ambiente, estrutura e localização com a fotografia real enviada.
- `/dra-sara`: apresentação profissional, história e forma de atendimento; somente dados confirmados.
- `/pacientes`: central de orientação.
- `/primeira-consulta`: jornada em seis etapas e área editável “o que levar”.
- `/medo-de-dentista`: página acolhedora, sem julgamento e sem pressão comercial.
- `/duvidas-frequentes`: perguntas organizadas por tema.
- `/contato`: endereço, horários, WhatsApp, e-mail, link “Como chegar” e formulário curto com consentimento.
- `/politica-de-privacidade` e `/termos-de-uso`: textos-base claramente marcados para revisão jurídica.
- Página 404 própria e estados de carregamento, vazio, erro e sucesso.

## 3. Tratamentos
- Criar `/tratamentos` como catálogo visual por grandes categorias.
- Criar páginas individuais para estética, prótese e reabilitação, implantes, endodontia, ortodontia, alinhadores e clínica geral/prevenção.
- Cada página terá introdução, possíveis indicações sem diagnóstico, processo, considerações, FAQ, conteúdos relacionados e chamada contextual.
- Não criar urgências, preços, promessas ou especialidades não confirmadas; itens ainda sujeitos à confirmação ficarão identificados no painel.

## 4. Conteúdos editoriais
- Criar `/conteudos` com duas entradas: **Notícias** e **Tire suas dúvidas**.
- `/conteudos/noticias`: visual de jornal/newsroom, manchete principal, notícias secundárias, arquivo e filtros.
- `/conteudos/noticias/[slug]`: página editorial completa com fonte externa quando aplicável.
- `/conteudos/tire-suas-duvidas`: blog educativo com busca, categorias, tags, destaque, recentes e mais lidos.
- `/conteudos/tire-suas-duvidas/[slug]`: leitura confortável, índice, autoria, datas, referências, relacionados e chamada contextual.
- Criar exemplos solicitados de notícias e artigos como **rascunhos**, claramente marcados “revisão profissional necessária”, para edição futura; nenhum conteúdo médico demonstrativo será publicado automaticamente.
- Criar redirecionamentos permanentes de `/noticias` e `/blog` para a arquitetura final dentro de `/conteudos`.

## 5. Produção científica
- Criar `/artigos-cientificos` com busca e filtros por autor, ano, tema e tipo.
- Criar `/artigos-cientificos/[slug]` com metadados bibliográficos, resumo permitido, DOI/link oficial, referências e cópia de citação ABNT/Vancouver.
- Não inventar publicações. A área pública mostrará um estado editorial preparado até existirem dados reais.
- Tratar direitos de publicação no painel: produção própria, autorização, acesso aberto, Creative Commons, referência externa ou revisão necessária.

## 6. Painel administrativo privado
- Implementar autenticação por e-mail e senha, recuperação de senha, encerramento de sessão e acesso restrito; sem cadastro público.
- Guardar papéis em estrutura separada e validar permissões no servidor.
- Criar dashboard com contagens, itens recentes e atalhos.
- Criar gerenciamento real de páginas, tratamentos, FAQs, autores, categorias, tags, notícias, artigos educativos, publicações científicas, mídia, mensagens, redirecionamentos e configurações globais.
- Oferecer rascunho, agendamento, publicação, arquivamento, busca, paginação, pré-visualização e histórico básico.
- Criar editor estruturado para títulos, texto, listas, links, imagens, citações, tabelas, FAQ e referências, com sanitização.
- Incluir campos e checklist de SEO, direitos autorais, revisão de saúde e autorização de imagens.

## 7. Dados, segurança e formulários
- Modelar dados normalizados para configurações, perfis, papéis, páginas, tratamentos, conteúdos, autores, taxonomias, FAQs, mídia, mensagens e redirecionamentos.
- Aplicar regras de acesso: visitantes leem apenas conteúdo publicado; administradores e editores gerenciam conforme o papel; mensagens são privadas.
- Armazenar uploads em áreas organizadas e seguras, com metadados, texto alternativo e controle de status.
- Fazer o formulário de contato gravar mensagens reais, com validação, honeypot, limitação de envio e consentimento não pré-marcado.
- Não coletar informações clínicas sensíveis no contato inicial.

## 8. SEO, acessibilidade e performance
- Criar metadata exclusiva por página, canonical, Open Graph, Twitter Card, breadcrumbs e dados estruturados adequados (`Dentist`, `LocalBusiness`, `WebSite`, `BlogPosting`, `Article`, `ScholarlyArticle`).
- Criar sitemap e robots, excluindo painel, rascunhos, filtros duplicados e páginas privadas.
- Aplicar SEO local naturalmente para Lacort, Vila Formosa e Zona Leste, sem repetição artificial.
- Garantir um único H1, HTML semântico, foco visível, navegação por teclado, labels, contraste, textos alternativos e respeito a movimento reduzido.
- Otimizar imagens, carregamento sob demanda, dimensões estáveis e quantidade de JavaScript.

## 9. Integrações preparadas
- WhatsApp e “Como chegar” funcionarão desde o início.
- Deixar campos desativados até receber configurações reais para Analytics, Tag Manager, Search Console, Google Business Profile, mapa incorporado, envio de e-mail e avaliações reais.
- Não mostrar integrações como ativas antes de configuradas.

## 10. Validação final
- Revisar todas as rotas e fluxos em desktop, tablet e celular, incluindo 320, 375, 390, 414, 768, 1024, 1280, 1440 e 1920 px.
- Testar menus, links, WhatsApp, formulário, buscas, filtros, login, permissões, criação/edição/publicação e uploads.
- Auditar acessibilidade, SEO, desempenho, segurança, consistência visual e ausência de dados inventados.
- Entregar relatório final separando: implementado, configurações externas necessárias, conteúdo ainda necessário e pendências reais.

## Dependências de conteúdo/configuração externa
- Títulos acadêmicos, especialidades, formação detalhada, biografia completa e publicações da Dra. Sara não serão inventados.
- Avaliações de pacientes permanecerão ocultas/preparadas até existir uma fonte real autorizada.
- Integrações Google e notificações por e-mail dependerão dos respectivos IDs, links ou domínio de envio.
- A foto enviada da Dra. Sara será usada como ativo fornecido; a foto HEIC será convertida e otimizada para web.
