-- =============================================================================
-- BERIT, ALIANÇA SAGRADA - Database Schema
-- =============================================================================
-- Descrição: Schema para o sistema de estudo bíblico/filosófico
-- Tabelas: save_slots, shared_thoughts, eternal_memories, feedback
-- =============================================================================

-- Tabela de Save Slots (Jornadas de Estudo)
CREATE TABLE IF NOT EXISTS save_slots (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slot_number INTEGER NOT NULL CHECK (slot_number BETWEEN 1 AND 3),
  title TEXT NOT NULL DEFAULT 'Gênesis, Cap. 1',
  chapter TEXT NOT NULL DEFAULT 'genesis-1',
  current_verse INTEGER DEFAULT 1,
  progress_percent INTEGER DEFAULT 0 CHECK (progress_percent BETWEEN 0 AND 100),
  last_accessed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(slot_number)
);

-- Tabela de Pensamentos Compartilhados (Realtime)
CREATE TABLE IF NOT EXISTS shared_thoughts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slot_id UUID REFERENCES save_slots(id) ON DELETE CASCADE,
  content TEXT NOT NULL DEFAULT '',
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de Memórias Eternas (Sessões Salvas)
CREATE TABLE IF NOT EXISTS eternal_memories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slot_id UUID REFERENCES save_slots(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  chapter TEXT NOT NULL,
  verse_range TEXT,
  thoughts TEXT,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de Feedback (Modo Arquiteta)
CREATE TABLE IF NOT EXISTS feedback (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category TEXT NOT NULL CHECK (category IN ('ajustar-brilho', 'expandir-horizonte')),
  message TEXT NOT NULL,
  context_page TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de Configurações
CREATE TABLE IF NOT EXISTS app_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT UNIQUE NOT NULL,
  value JSONB NOT NULL DEFAULT '{}',
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Inserir configuração padrão
INSERT INTO app_settings (key, value) 
VALUES ('config', '{"alwaysCompare": false}')
ON CONFLICT (key) DO NOTHING;

-- Inserir slots padrão
INSERT INTO save_slots (slot_number, title, chapter) 
VALUES 
  (1, 'Gênesis, Cap. 1', 'genesis-1'),
  (2, 'Novo Slot', 'genesis-1'),
  (3, 'Novo Slot', 'genesis-1')
ON CONFLICT (slot_number) DO NOTHING;

-- Inserir pensamento compartilhado para cada slot
INSERT INTO shared_thoughts (slot_id, content)
SELECT id, ''
FROM save_slots
WHERE NOT EXISTS (
  SELECT 1 FROM shared_thoughts WHERE shared_thoughts.slot_id = save_slots.id
);

-- Habilitar Realtime para shared_thoughts
ALTER PUBLICATION supabase_realtime ADD TABLE shared_thoughts;

-- Enable RLS
ALTER TABLE save_slots ENABLE ROW LEVEL SECURITY;
ALTER TABLE shared_thoughts ENABLE ROW LEVEL SECURITY;
ALTER TABLE eternal_memories ENABLE ROW LEVEL SECURITY;
ALTER TABLE feedback ENABLE ROW LEVEL SECURITY;
ALTER TABLE app_settings ENABLE ROW LEVEL SECURITY;

-- Políticas RLS (acesso público para este app específico - sem auth)
CREATE POLICY "Allow all access to save_slots" ON save_slots FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all access to shared_thoughts" ON shared_thoughts FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all access to eternal_memories" ON eternal_memories FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all access to feedback" ON feedback FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all access to app_settings" ON app_settings FOR ALL USING (true) WITH CHECK (true);
