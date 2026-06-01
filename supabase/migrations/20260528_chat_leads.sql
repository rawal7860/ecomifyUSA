-- Chat assistant lead capture
-- Stores questions the AI couldn't resolve, plus full conversation transcript for follow-up by support.

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS chat_leads (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    email TEXT NOT NULL,
    name TEXT,
    message TEXT NOT NULL,
    conversation JSONB NOT NULL DEFAULT '[]'::jsonb,
    status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'resolved')),
    source TEXT NOT NULL DEFAULT 'chat_widget',
    user_agent TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_chat_leads_user_id ON chat_leads(user_id);
CREATE INDEX IF NOT EXISTS idx_chat_leads_status ON chat_leads(status);
CREATE INDEX IF NOT EXISTS idx_chat_leads_created_at ON chat_leads(created_at DESC);

ALTER TABLE chat_leads ENABLE ROW LEVEL SECURITY;

-- Public (anon) can insert a lead from the chat widget.
CREATE POLICY "Anyone can submit a chat lead"
    ON chat_leads
    FOR INSERT
    WITH CHECK (true);

-- Authenticated users can read their own leads.
CREATE POLICY "Users can read their own chat leads"
    ON chat_leads
    FOR SELECT
    USING (auth.uid() = user_id);

-- Reuse the project's existing updated_at trigger function (defined in 001_client_portal.sql).
CREATE TRIGGER update_chat_leads_updated_at
    BEFORE UPDATE ON chat_leads
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
