-- Client Portal Migration
-- Create tables for client portal system

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Companies table
CREATE TABLE companies (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Clients table
CREATE TABLE clients (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    phone TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Client Services table
CREATE TABLE client_services (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
    service_name TEXT NOT NULL,
    description TEXT,
    status TEXT DEFAULT 'active' CHECK (status IN ('active', 'completed', 'cancelled')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Deadlines table
CREATE TABLE deadlines (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    client_service_id UUID REFERENCES client_services(id) ON DELETE CASCADE,
    deadline_date DATE NOT NULL,
    description TEXT NOT NULL,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'overdue')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Reminders table
CREATE TABLE reminders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    deadline_id UUID REFERENCES deadlines(id) ON DELETE CASCADE,
    reminder_date TIMESTAMPTZ NOT NULL,
    message TEXT NOT NULL,
    sent BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Documents table
CREATE TABLE documents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
    service_id UUID REFERENCES client_services(id) ON DELETE SET NULL,
    file_name TEXT NOT NULL,
    file_path TEXT NOT NULL,
    uploaded_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE client_services ENABLE ROW LEVEL SECURITY;
ALTER TABLE deadlines ENABLE ROW LEVEL SECURITY;
ALTER TABLE reminders ENABLE ROW LEVEL SECURITY;
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;

-- RLS Policies for companies
CREATE POLICY "Users can view their own companies" ON companies
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own companies" ON companies
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own companies" ON companies
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own companies" ON companies
    FOR DELETE USING (auth.uid() = user_id);

-- RLS Policies for clients (through company relationship)
CREATE POLICY "Users can view clients from their companies" ON clients
    FOR SELECT USING (
        company_id IN (
            SELECT id FROM companies WHERE user_id = auth.uid()
        )
    );

CREATE POLICY "Users can insert clients for their companies" ON clients
    FOR INSERT WITH CHECK (
        company_id IN (
            SELECT id FROM companies WHERE user_id = auth.uid()
        )
    );

CREATE POLICY "Users can update clients from their companies" ON clients
    FOR UPDATE USING (
        company_id IN (
            SELECT id FROM companies WHERE user_id = auth.uid()
        )
    );

CREATE POLICY "Users can delete clients from their companies" ON clients
    FOR DELETE USING (
        company_id IN (
            SELECT id FROM companies WHERE user_id = auth.uid()
        )
    );

-- RLS Policies for client_services (through client relationship)
CREATE POLICY "Users can view services for their clients" ON client_services
    FOR SELECT USING (
        client_id IN (
            SELECT c.id FROM clients c
            JOIN companies comp ON c.company_id = comp.id
            WHERE comp.user_id = auth.uid()
        )
    );

CREATE POLICY "Users can insert services for their clients" ON client_services
    FOR INSERT WITH CHECK (
        client_id IN (
            SELECT c.id FROM clients c
            JOIN companies comp ON c.company_id = comp.id
            WHERE comp.user_id = auth.uid()
        )
    );

CREATE POLICY "Users can update services for their clients" ON client_services
    FOR UPDATE USING (
        client_id IN (
            SELECT c.id FROM clients c
            JOIN companies comp ON c.company_id = comp.id
            WHERE comp.user_id = auth.uid()
        )
    );

CREATE POLICY "Users can delete services for their clients" ON client_services
    FOR DELETE USING (
        client_id IN (
            SELECT c.id FROM clients c
            JOIN companies comp ON c.company_id = comp.id
            WHERE comp.user_id = auth.uid()
        )
    );

-- RLS Policies for deadlines (through service relationship)
CREATE POLICY "Users can view deadlines for their services" ON deadlines
    FOR SELECT USING (
        client_service_id IN (
            SELECT cs.id FROM client_services cs
            JOIN clients c ON cs.client_id = c.id
            JOIN companies comp ON c.company_id = comp.id
            WHERE comp.user_id = auth.uid()
        )
    );

CREATE POLICY "Users can insert deadlines for their services" ON deadlines
    FOR INSERT WITH CHECK (
        client_service_id IN (
            SELECT cs.id FROM client_services cs
            JOIN clients c ON cs.client_id = c.id
            JOIN companies comp ON c.company_id = comp.id
            WHERE comp.user_id = auth.uid()
        )
    );

CREATE POLICY "Users can update deadlines for their services" ON deadlines
    FOR UPDATE USING (
        client_service_id IN (
            SELECT cs.id FROM client_services cs
            JOIN clients c ON cs.client_id = c.id
            JOIN companies comp ON c.company_id = comp.id
            WHERE comp.user_id = auth.uid()
        )
    );

CREATE POLICY "Users can delete deadlines for their services" ON deadlines
    FOR DELETE USING (
        client_service_id IN (
            SELECT cs.id FROM client_services cs
            JOIN clients c ON cs.client_id = c.id
            JOIN companies comp ON c.company_id = comp.id
            WHERE comp.user_id = auth.uid()
        )
    );

-- RLS Policies for reminders (through deadline relationship)
CREATE POLICY "Users can view reminders for their deadlines" ON reminders
    FOR SELECT USING (
        deadline_id IN (
            SELECT d.id FROM deadlines d
            JOIN client_services cs ON d.client_service_id = cs.id
            JOIN clients c ON cs.client_id = c.id
            JOIN companies comp ON c.company_id = comp.id
            WHERE comp.user_id = auth.uid()
        )
    );

CREATE POLICY "Users can insert reminders for their deadlines" ON reminders
    FOR INSERT WITH CHECK (
        deadline_id IN (
            SELECT d.id FROM deadlines d
            JOIN client_services cs ON d.client_service_id = cs.id
            JOIN clients c ON cs.client_id = c.id
            JOIN companies comp ON c.company_id = comp.id
            WHERE comp.user_id = auth.uid()
        )
    );

CREATE POLICY "Users can update reminders for their deadlines" ON reminders
    FOR UPDATE USING (
        deadline_id IN (
            SELECT d.id FROM deadlines d
            JOIN client_services cs ON d.client_service_id = cs.id
            JOIN clients c ON cs.client_id = c.id
            JOIN companies comp ON c.company_id = comp.id
            WHERE comp.user_id = auth.uid()
        )
    );

CREATE POLICY "Users can delete reminders for their deadlines" ON reminders
    FOR DELETE USING (
        deadline_id IN (
            SELECT d.id FROM deadlines d
            JOIN client_services cs ON d.client_service_id = cs.id
            JOIN clients c ON cs.client_id = c.id
            JOIN companies comp ON c.company_id = comp.id
            WHERE comp.user_id = auth.uid()
        )
    );

-- RLS Policies for documents (through client/service relationship)
CREATE POLICY "Users can view documents for their clients/services" ON documents
    FOR SELECT USING (
        client_id IN (
            SELECT c.id FROM clients c
            JOIN companies comp ON c.company_id = comp.id
            WHERE comp.user_id = auth.uid()
        ) OR
        service_id IN (
            SELECT cs.id FROM client_services cs
            JOIN clients c ON cs.client_id = c.id
            JOIN companies comp ON c.company_id = comp.id
            WHERE comp.user_id = auth.uid()
        )
    );

CREATE POLICY "Users can insert documents for their clients/services" ON documents
    FOR INSERT WITH CHECK (
        client_id IN (
            SELECT c.id FROM clients c
            JOIN companies comp ON c.company_id = comp.id
            WHERE comp.user_id = auth.uid()
        ) OR
        service_id IN (
            SELECT cs.id FROM client_services cs
            JOIN clients c ON cs.client_id = c.id
            JOIN companies comp ON c.company_id = comp.id
            WHERE comp.user_id = auth.uid()
        )
    );

CREATE POLICY "Users can update documents for their clients/services" ON documents
    FOR UPDATE USING (
        client_id IN (
            SELECT c.id FROM clients c
            JOIN companies comp ON c.company_id = comp.id
            WHERE comp.user_id = auth.uid()
        ) OR
        service_id IN (
            SELECT cs.id FROM client_services cs
            JOIN clients c ON cs.client_id = c.id
            JOIN companies comp ON c.company_id = comp.id
            WHERE comp.user_id = auth.uid()
        )
    );

CREATE POLICY "Users can delete documents for their clients/services" ON documents
    FOR DELETE USING (
        client_id IN (
            SELECT c.id FROM clients c
            JOIN companies comp ON c.company_id = comp.id
            WHERE comp.user_id = auth.uid()
        ) OR
        service_id IN (
            SELECT cs.id FROM client_services cs
            JOIN clients c ON cs.client_id = c.id
            JOIN companies comp ON c.company_id = comp.id
            WHERE comp.user_id = auth.uid()
        )
    );

-- Create indexes for better performance
CREATE INDEX idx_companies_user_id ON companies(user_id);
CREATE INDEX idx_clients_company_id ON clients(company_id);
CREATE INDEX idx_client_services_client_id ON client_services(client_id);
CREATE INDEX idx_deadlines_client_service_id ON deadlines(client_service_id);
CREATE INDEX idx_deadlines_deadline_date ON deadlines(deadline_date);
CREATE INDEX idx_reminders_deadline_id ON reminders(deadline_id);
CREATE INDEX idx_reminders_reminder_date ON reminders(reminder_date);
CREATE INDEX idx_documents_client_id ON documents(client_id);
CREATE INDEX idx_documents_service_id ON documents(service_id);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Add updated_at triggers
CREATE TRIGGER update_companies_updated_at BEFORE UPDATE ON companies FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_clients_updated_at BEFORE UPDATE ON clients FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_client_services_updated_at BEFORE UPDATE ON client_services FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_deadlines_updated_at BEFORE UPDATE ON deadlines FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_reminders_updated_at BEFORE UPDATE ON reminders FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();