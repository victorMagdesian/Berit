-- =============================================================================
-- BERIT, ALIANÇA SAGRADA - Database Schema v2
-- =============================================================================
-- Descrição: Schema corrigido - slot_id como TEXT para compatibilidade
-- =============================================================================

-- Limpar tabelas existentes (se houver)
DROP TABLE IF EXISTS shared_thoughts CASCADE;
DROP TABLE IF EXISTS eternal_memories CASCADE;
DROP TABLE IF EXISTS feedback CASCADE;
DROP TABLE IF EXISTS app_settings CASCADE;
DROP TABLE IF EXISTS save_slots CASCADE;

-- Tabela de Pensamentos Compartilhados (Realtime)
-- slot_id é TEXT para corresponder aos IDs como 'genesis-1'
CREATE TABLE shared_thoughts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slot_id TEXT NOT NULL,
  content TEXT NOT NULL DEFAULT '',
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(slot_id)
);

-- Tabela de Memórias Eternas (Sessões Salvas)
CREATE TABLE eternal_memories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slot_id TEXT NOT NULL,
  title TEXT NOT NULL,
  chapter TEXT NOT NULL,
  verse_range TEXT,
  thoughts TEXT,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de Feedback (Modo Arquiteta)
CREATE TABLE feedback (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category TEXT NOT NULL CHECK (category IN ('ajustar-brilho', 'expandir-horizonte')),
  message TEXT NOT NULL,
  context_page TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de Configurações
CREATE TABLE app_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT UNIQUE NOT NULL,
  value JSONB NOT NULL DEFAULT '{}',
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Inserir configuração padrão
INSERT INTO app_settings (key, value) 
VALUES ('config', '{"alwaysCompare": false}')
ON CONFLICT (key) DO NOTHING;

-- Inserir pensamento compartilhado inicial para genesis-1
INSERT INTO shared_thoughts (slot_id, content)
VALUES ('genesis-1', '')
ON CONFLICT (slot_id) DO NOTHING;

-- Habilitar Realtime para shared_thoughts
ALTER PUBLICATION supabase_realtime ADD TABLE shared_thoughts;

-- Enable RLS
ALTER TABLE shared_thoughts ENABLE ROW LEVEL SECURITY;
ALTER TABLE eternal_memories ENABLE ROW LEVEL SECURITY;
ALTER TABLE feedback ENABLE ROW LEVEL SECURITY;
ALTER TABLE app_settings ENABLE ROW LEVEL SECURITY;

-- Políticas RLS (acesso público para este app específico - sem auth)
CREATE POLICY "Allow all access to shared_thoughts" ON shared_thoughts FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all access to eternal_memories" ON eternal_memories FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all access to feedback" ON feedback FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all access to app_settings" ON app_settings FOR ALL USING (true) WITH CHECK (true);
