CREATE TYPE public.app_role AS ENUM ('admin', 'editor', 'author');
CREATE TYPE public.content_status AS ENUM ('draft', 'scheduled', 'published', 'archived');
CREATE TYPE public.content_kind AS ENUM ('educational', 'news', 'scientific');
CREATE TYPE public.message_status AS ENUM ('new', 'in_progress', 'answered', 'archived');

CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS trigger LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END;
$$;

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  role public.app_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;

CREATE OR REPLACE FUNCTION public.can_edit_content(_user_id uuid)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT public.has_role(_user_id, 'admin') OR public.has_role(_user_id, 'editor') OR public.has_role(_user_id, 'author')
$$;

CREATE POLICY "Users can read own role" ON public.user_roles FOR SELECT TO authenticated USING (user_id = auth.uid() OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins manage roles" ON public.user_roles FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TABLE public.site_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  clinic_name text NOT NULL,
  whatsapp text NOT NULL,
  email text NOT NULL,
  address text NOT NULL,
  postal_code text NOT NULL,
  opening_hours jsonb NOT NULL DEFAULT '{}'::jsonb,
  instagram text,
  technical_director text,
  professional_registration text,
  maps_url text,
  google_business_url text,
  analytics_id text,
  tag_manager_id text,
  default_whatsapp_message text NOT NULL,
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.site_settings TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.site_settings TO authenticated;
GRANT ALL ON public.site_settings TO service_role;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone reads clinic settings" ON public.site_settings FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Admins manage clinic settings" ON public.site_settings FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER site_settings_updated BEFORE UPDATE ON public.site_settings FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TABLE public.authors (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text NOT NULL UNIQUE,
  photo_url text,
  biography text,
  profession text,
  registration text,
  specialty text,
  instagram text,
  linkedin text,
  orcid text,
  website text,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.authors TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.authors TO authenticated;
GRANT ALL ON public.authors TO service_role;
ALTER TABLE public.authors ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone reads active authors" ON public.authors FOR SELECT TO anon, authenticated USING (is_active OR public.can_edit_content(auth.uid()));
CREATE POLICY "Editors manage authors" ON public.authors FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'editor')) WITH CHECK (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'editor'));
CREATE TRIGGER authors_updated BEFORE UPDATE ON public.authors FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TABLE public.categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  kind public.content_kind NOT NULL,
  name text NOT NULL,
  slug text NOT NULL,
  description text,
  image_url text,
  seo_title text,
  meta_description text,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (kind, slug)
);
GRANT SELECT ON public.categories TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.categories TO authenticated;
GRANT ALL ON public.categories TO service_role;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone reads categories" ON public.categories FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Editors manage categories" ON public.categories FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'editor')) WITH CHECK (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'editor'));

CREATE TABLE public.tags (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text NOT NULL UNIQUE,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.tags TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.tags TO authenticated;
GRANT ALL ON public.tags TO service_role;
ALTER TABLE public.tags ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone reads tags" ON public.tags FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Editors manage tags" ON public.tags FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'editor')) WITH CHECK (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'editor'));

CREATE TABLE public.pages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  title text NOT NULL,
  eyebrow text,
  summary text,
  body jsonb NOT NULL DEFAULT '[]'::jsonb,
  image_url text,
  image_alt text,
  status public.content_status NOT NULL DEFAULT 'draft',
  seo_title text,
  meta_description text,
  canonical_url text,
  og_title text,
  og_description text,
  og_image_url text,
  created_by uuid,
  updated_by uuid,
  published_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.pages TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.pages TO authenticated;
GRANT ALL ON public.pages TO service_role;
ALTER TABLE public.pages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone reads published pages" ON public.pages FOR SELECT TO anon, authenticated USING (status = 'published' OR public.can_edit_content(auth.uid()));
CREATE POLICY "Editors manage pages" ON public.pages FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'editor')) WITH CHECK (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'editor'));
CREATE TRIGGER pages_updated BEFORE UPDATE ON public.pages FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TABLE public.treatments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text NOT NULL UNIQUE,
  category text NOT NULL,
  short_description text NOT NULL,
  body jsonb NOT NULL DEFAULT '[]'::jsonb,
  indications jsonb NOT NULL DEFAULT '[]'::jsonb,
  process_steps jsonb NOT NULL DEFAULT '[]'::jsonb,
  considerations jsonb NOT NULL DEFAULT '[]'::jsonb,
  faqs jsonb NOT NULL DEFAULT '[]'::jsonb,
  image_url text,
  image_alt text,
  display_order integer NOT NULL DEFAULT 0,
  status public.content_status NOT NULL DEFAULT 'draft',
  seo_title text,
  meta_description text,
  canonical_url text,
  og_title text,
  og_description text,
  og_image_url text,
  created_by uuid,
  updated_by uuid,
  published_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.treatments TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.treatments TO authenticated;
GRANT ALL ON public.treatments TO service_role;
ALTER TABLE public.treatments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone reads published treatments" ON public.treatments FOR SELECT TO anon, authenticated USING (status = 'published' OR public.can_edit_content(auth.uid()));
CREATE POLICY "Editors manage treatments" ON public.treatments FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'editor')) WITH CHECK (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'editor'));
CREATE TRIGGER treatments_updated BEFORE UPDATE ON public.treatments FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TABLE public.content_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  kind public.content_kind NOT NULL,
  title text NOT NULL,
  subtitle text,
  slug text NOT NULL,
  excerpt text,
  body jsonb NOT NULL DEFAULT '[]'::jsonb,
  cover_image_url text,
  cover_image_alt text,
  author_id uuid REFERENCES public.authors(id) ON DELETE SET NULL,
  category_id uuid REFERENCES public.categories(id) ON DELETE SET NULL,
  status public.content_status NOT NULL DEFAULT 'draft',
  is_featured boolean NOT NULL DEFAULT false,
  reading_minutes integer,
  scheduled_for timestamptz,
  published_at timestamptz,
  source_name text,
  source_url text,
  journal text,
  publication_year integer,
  volume text,
  issue text,
  pages text,
  doi text,
  issn text,
  institution text,
  language text,
  abstract text,
  keywords text[] NOT NULL DEFAULT '{}',
  license_type text,
  rights_confirmed boolean NOT NULL DEFAULT false,
  official_url text,
  citation_abnt text,
  citation_vancouver text,
  faq jsonb NOT NULL DEFAULT '[]'::jsonb,
  references_list jsonb NOT NULL DEFAULT '[]'::jsonb,
  seo_title text,
  meta_description text,
  primary_keyword text,
  secondary_keywords text[] NOT NULL DEFAULT '{}',
  canonical_url text,
  og_title text,
  og_description text,
  og_image_url text,
  created_by uuid,
  updated_by uuid,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (kind, slug)
);
GRANT SELECT ON public.content_items TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.content_items TO authenticated;
GRANT ALL ON public.content_items TO service_role;
ALTER TABLE public.content_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone reads published content" ON public.content_items FOR SELECT TO anon, authenticated USING (status = 'published' OR public.can_edit_content(auth.uid()));
CREATE POLICY "Content team manages content" ON public.content_items FOR ALL TO authenticated USING (public.can_edit_content(auth.uid())) WITH CHECK (public.can_edit_content(auth.uid()));
CREATE TRIGGER content_items_updated BEFORE UPDATE ON public.content_items FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE INDEX content_items_public_idx ON public.content_items (kind, status, published_at DESC);
CREATE INDEX content_items_search_idx ON public.content_items USING gin (to_tsvector('portuguese', coalesce(title,'') || ' ' || coalesce(excerpt,'') || ' ' || coalesce(subtitle,'')));

CREATE TABLE public.content_tags (
  content_id uuid NOT NULL REFERENCES public.content_items(id) ON DELETE CASCADE,
  tag_id uuid NOT NULL REFERENCES public.tags(id) ON DELETE CASCADE,
  PRIMARY KEY (content_id, tag_id)
);
GRANT SELECT ON public.content_tags TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.content_tags TO authenticated;
GRANT ALL ON public.content_tags TO service_role;
ALTER TABLE public.content_tags ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone reads published content tags" ON public.content_tags FOR SELECT TO anon, authenticated USING (EXISTS (SELECT 1 FROM public.content_items c WHERE c.id = content_id AND (c.status = 'published' OR public.can_edit_content(auth.uid()))));
CREATE POLICY "Content team manages content tags" ON public.content_tags FOR ALL TO authenticated USING (public.can_edit_content(auth.uid())) WITH CHECK (public.can_edit_content(auth.uid()));

CREATE TABLE public.media_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category text NOT NULL,
  file_url text NOT NULL,
  title text NOT NULL,
  description text,
  alt_text text NOT NULL,
  credit text,
  mime_type text,
  is_active boolean NOT NULL DEFAULT true,
  uploaded_by uuid,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.media_items TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.media_items TO authenticated;
GRANT ALL ON public.media_items TO service_role;
ALTER TABLE public.media_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone reads active media" ON public.media_items FOR SELECT TO anon, authenticated USING (is_active OR public.can_edit_content(auth.uid()));
CREATE POLICY "Editors manage media" ON public.media_items FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'editor')) WITH CHECK (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'editor'));
CREATE TRIGGER media_items_updated BEFORE UPDATE ON public.media_items FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TABLE public.contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  subject text NOT NULL,
  message text NOT NULL,
  privacy_consent boolean NOT NULL,
  status public.message_status NOT NULL DEFAULT 'new',
  internal_notes text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT INSERT ON public.contact_messages TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.contact_messages TO authenticated;
GRANT ALL ON public.contact_messages TO service_role;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Visitors send contact messages" ON public.contact_messages FOR INSERT TO anon, authenticated WITH CHECK (privacy_consent = true AND length(name) BETWEEN 2 AND 120 AND length(message) BETWEEN 10 AND 3000);
CREATE POLICY "Admins read messages" ON public.contact_messages FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'editor'));
CREATE POLICY "Admins update messages" ON public.contact_messages FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'editor')) WITH CHECK (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'editor'));
CREATE POLICY "Admins delete messages" ON public.contact_messages FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER contact_messages_updated BEFORE UPDATE ON public.contact_messages FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TABLE public.redirects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  from_path text NOT NULL UNIQUE,
  to_path text NOT NULL,
  status_code integer NOT NULL DEFAULT 301 CHECK (status_code IN (301, 302, 307, 308)),
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.redirects TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.redirects TO authenticated;
GRANT ALL ON public.redirects TO service_role;
ALTER TABLE public.redirects ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone reads active redirects" ON public.redirects FOR SELECT TO anon, authenticated USING (is_active OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins manage redirects" ON public.redirects FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER redirects_updated BEFORE UPDATE ON public.redirects FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

INSERT INTO public.site_settings (clinic_name, whatsapp, email, address, postal_code, opening_hours, instagram, technical_director, professional_registration, maps_url, default_whatsapp_message)
VALUES ('Lacort Odontologia Especializada', '5511922114728', 'recepcao@lacortodonto.com.br', 'Av. Dr. Eduardo Cotching, 1963 — Vila Formosa — São Paulo/SP', '03356-001', '{"weekdays":"9h às 18h","saturday":"9h às 12h30","sunday":"Fechado"}', '@lacortodonto', 'Dra. Sara Lacort', 'CROSP 155460 SP', 'https://www.google.com/maps/search/?api=1&query=Av.%20Dr.%20Eduardo%20Cotching%2C%201963%2C%20Vila%20Formosa%2C%20S%C3%A3o%20Paulo', 'Olá! Gostaria de agendar uma avaliação na Lacort Odontologia.');

INSERT INTO public.authors (name, slug, biography, profession, registration, is_active)
VALUES ('Dra. Sara Lacort', 'dra-sara-lacort', 'Odontologia também é sobre reconstruir confiança. Perfil profissional aguardando complementação e revisão pela clínica.', 'Cirurgiã-dentista e responsável técnica', 'CROSP 155460 SP', true);

INSERT INTO public.categories (kind, name, slug, description) VALUES
('educational', 'Medo de dentista', 'medo-de-dentista', 'Conteúdos acolhedores para compreender receios e o cuidado odontológico.'),
('educational', 'Saúde bucal', 'saude-bucal', 'Orientações gerais sobre prevenção e cuidados com o sorriso.'),
('educational', 'Implantes', 'implantes', 'Informações educativas sobre avaliação e planejamento de implantes.'),
('news', 'Clínica', 'clinica', 'Novidades e acontecimentos da Lacort.'),
('news', 'Odontologia', 'odontologia', 'Informações atuais do universo odontológico.'),
('scientific', 'Literatura recomendada', 'literatura-recomendada', 'Referências para consulta e atualização profissional.');

INSERT INTO public.tags (name, slug) VALUES
('acolhimento', 'acolhimento'), ('odontofobia', 'odontofobia'), ('prevenção', 'prevencao'), ('implantes', 'implantes'), ('Vila Formosa', 'vila-formosa');

INSERT INTO public.treatments (name, slug, category, short_description, body, indications, process_steps, considerations, faqs, display_order, status, seo_title, meta_description, published_at) VALUES
('Estética do sorriso', 'estetica', 'Estética', 'Planejamento individualizado para preservar naturalidade e harmonia.', '[{"type":"paragraph","text":"Facetas, clareamento e restaurações estéticas podem fazer parte de um planejamento construído para cada sorriso."}]', '["Alterações de forma, cor ou proporção devem ser avaliadas individualmente."]', '["Avaliação","Planejamento","Tratamento","Acompanhamento"]', '["A indicação e o resultado variam conforme as características de cada pessoa."]', '[{"question":"Como saber qual opção é adequada?","answer":"A avaliação clínica permite entender necessidades, limites e possibilidades para o seu caso."}]', 1, 'published', 'Estética dental na Vila Formosa | Lacort', 'Conheça possibilidades de estética dental com planejamento individualizado na Lacort, em Vila Formosa.', now()),
('Prótese e reabilitação', 'protese-reabilitacao', 'Prótese e Reabilitação', 'Possibilidades para recuperar função, conforto e segurança ao sorrir.', '[{"type":"paragraph","text":"A reabilitação oral reúne diferentes recursos que podem ajudar a restabelecer função e estética."}]', '["Perda dentária, desgaste ou necessidade de reconstrução exigem avaliação individual."]', '["Avaliação","Planejamento","Tratamento","Acompanhamento"]', '["O tipo de prótese depende da condição clínica e dos objetivos de cada pessoa."]', '[{"question":"Qual prótese é mais indicada?","answer":"A escolha depende da avaliação, da saúde bucal e do planejamento individual."}]', 2, 'published', 'Prótese e reabilitação oral | Lacort', 'Entenda as possibilidades de prótese e reabilitação oral na Lacort, em Vila Formosa.', now()),
('Implantes dentários', 'implantes', 'Implantes', 'Avaliação cuidadosa e planejamento para diferentes necessidades de reabilitação.', '[{"type":"paragraph","text":"Implantes são recursos utilizados para apoiar soluções de reabilitação em situações específicas."}]', '["A indicação depende de avaliação clínica, exames e condições individuais."]', '["Avaliação","Planejamento","Tratamento","Acompanhamento"]', '["Implantes não são automaticamente indicados para todas as pessoas."]', '[{"question":"Implante dói?","answer":"A experiência varia conforme o procedimento e as características de cada pessoa. A equipe explica cada etapa do cuidado."},{"question":"Quanto tempo leva?","answer":"O tempo depende do planejamento individual e das etapas necessárias para cada caso."}]', 3, 'published', 'Implantes dentários na Vila Formosa | Lacort', 'Informações sobre avaliação e planejamento de implantes dentários na Lacort, em Vila Formosa.', now()),
('Endodontia', 'endodontia', 'Saúde Bucal', 'Avaliação e tratamento das estruturas internas do dente quando necessário.', '[{"type":"paragraph","text":"O tratamento endodôntico, conhecido como tratamento de canal, pode ser necessário em determinadas condições."}]', '["Dor ou sensibilidade merecem avaliação, mas não significam automaticamente necessidade de canal."]', '["Avaliação","Diagnóstico","Planejamento","Acompanhamento"]', '["Somente uma avaliação pode indicar o cuidado adequado."]', '[{"question":"Toda dor de dente significa canal?","answer":"Não. Diferentes condições podem causar dor e precisam ser avaliadas individualmente."}]', 4, 'published', 'Tratamento de canal na Vila Formosa | Lacort', 'Saiba como funciona a avaliação para endodontia e tratamento de canal na Lacort.', now()),
('Ortodontia', 'ortodontia', 'Ortodontia', 'Planejamento para alinhamento, função e acompanhamento do sorriso.', '[{"type":"paragraph","text":"A ortodontia avalia o alinhamento dentário e a relação entre os dentes de forma individualizada."}]', '["Questões de alinhamento e função podem ser avaliadas em consulta."]', '["Avaliação","Documentação","Planejamento","Acompanhamento"]', '["O plano e o tempo de tratamento variam para cada pessoa."]', '[{"question":"Quanto tempo dura o tratamento?","answer":"A duração depende das necessidades e da resposta individual ao planejamento."}]', 5, 'published', 'Ortodontia na Vila Formosa | Lacort', 'Conheça a abordagem de avaliação e planejamento ortodôntico da Lacort.', now()),
('Alinhadores', 'alinhadores', 'Ortodontia', 'Uma possibilidade ortodôntica que depende de indicação e acompanhamento profissional.', '[{"type":"paragraph","text":"Alinhadores podem ser considerados em alguns planejamentos ortodônticos após avaliação profissional."}]', '["A indicação depende da condição clínica e dos objetivos do tratamento."]', '["Avaliação","Planejamento digital","Uso orientado","Acompanhamento"]', '["Disciplina de uso e retornos são importantes para o acompanhamento."]', '[{"question":"Alinhadores servem para todos?","answer":"Não necessariamente. A indicação depende de avaliação e planejamento individual."}]', 6, 'published', 'Alinhadores na Vila Formosa | Lacort', 'Entenda quando alinhadores podem ser considerados em um planejamento ortodôntico.', now()),
('Clínica geral e prevenção', 'clinica-geral', 'Saúde Bucal', 'Cuidado contínuo para avaliação, prevenção e manutenção da saúde bucal.', '[{"type":"paragraph","text":"Consultas regulares ajudam a acompanhar a saúde bucal e identificar necessidades de cuidado."}]', '["Avaliação preventiva, manutenção e orientação de higiene fazem parte desse acompanhamento."]', '["Conversa","Avaliação","Orientação","Acompanhamento"]', '["A frequência de retorno é definida conforme cada necessidade."]', '[{"question":"Com que frequência devo consultar?","answer":"A periodicidade deve ser definida de acordo com sua saúde bucal e orientação profissional."}]', 7, 'published', 'Dentista e prevenção na Vila Formosa | Lacort', 'Avaliação, prevenção e acompanhamento de saúde bucal na Lacort Odontologia.', now());

WITH sara AS (SELECT id FROM public.authors WHERE slug = 'dra-sara-lacort'), cat AS (SELECT id FROM public.categories WHERE kind='educational' AND slug='medo-de-dentista')
INSERT INTO public.content_items (kind, title, subtitle, slug, excerpt, body, author_id, category_id, status, reading_minutes, seo_title, meta_description, primary_keyword)
SELECT 'educational', 'Como funciona uma consulta para quem tem medo de dentista?', 'Exemplo para revisão profissional', 'consulta-para-quem-tem-medo', 'Texto demonstrativo para a equipe editar antes de publicar.', '[{"type":"notice","text":"RASCUNHO — REVISÃO PROFISSIONAL NECESSÁRIA"},{"type":"heading","level":2,"text":"Começar pela conversa"},{"type":"paragraph","text":"Este conteúdo deve ser revisado e complementado pela Dra. Sara antes da publicação."}]', sara.id, cat.id, 'draft', 4, 'Consulta para quem tem medo de dentista | Lacort', 'Conteúdo educativo em revisão sobre atendimento odontológico acolhedor.', 'medo de dentista' FROM sara, cat;

WITH sara AS (SELECT id FROM public.authors WHERE slug = 'dra-sara-lacort'), cat AS (SELECT id FROM public.categories WHERE kind='educational' AND slug='saude-bucal')
INSERT INTO public.content_items (kind, title, subtitle, slug, excerpt, body, author_id, category_id, status, reading_minutes, seo_title, meta_description, primary_keyword)
SELECT 'educational', 'Sensibilidade ao frio e ao quente: o que observar?', 'Exemplo para revisão profissional', 'sensibilidade-frio-quente', 'Estrutura inicial para um futuro artigo educativo.', '[{"type":"notice","text":"RASCUNHO — REVISÃO PROFISSIONAL NECESSÁRIA"},{"type":"heading","level":2,"text":"Quando observar"},{"type":"paragraph","text":"Conteúdo clínico pendente de elaboração e revisão profissional."}]', sara.id, cat.id, 'draft', 5, 'Sensibilidade dental | Lacort Odontologia', 'Artigo educativo em revisão sobre sensibilidade dental.', 'sensibilidade dental' FROM sara, cat;

WITH sara AS (SELECT id FROM public.authors WHERE slug = 'dra-sara-lacort'), cat AS (SELECT id FROM public.categories WHERE kind='news' AND slug='clinica')
INSERT INTO public.content_items (kind, title, subtitle, slug, excerpt, body, author_id, category_id, status, seo_title, meta_description)
SELECT 'news', 'Novidade da Lacort: título para editar', 'Exemplo de notícia para substituir futuramente', 'novidade-exemplo-lacort', 'Estrutura de notícia preparada para receber uma novidade real da clínica.', '[{"type":"notice","text":"RASCUNHO — CONTEÚDO DE EXEMPLO"},{"type":"paragraph","text":"Edite este texto com uma novidade real, data, contexto e imagem antes de publicar."}]', sara.id, cat.id, 'draft', 'Notícia em edição | Lacort', 'Notícia de exemplo aguardando edição pela equipe da Lacort.' FROM sara, cat;

INSERT INTO public.redirects (from_path, to_path, status_code) VALUES
('/blog', '/conteudos/tire-suas-duvidas', 301),
('/noticias', '/conteudos/noticias', 301);