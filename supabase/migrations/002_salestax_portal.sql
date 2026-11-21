-- Sales tax filing portal
-- Client RLS is intentionally disabled per the requested portal schema.

CREATE TABLE IF NOT EXISTS public.salestax_clients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID UNIQUE REFERENCES auth.users(id) ON DELETE SET NULL,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  company_name TEXT NOT NULL,
  platform TEXT NOT NULL,
  phone TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.salestax_registrations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID NOT NULL REFERENCES public.salestax_clients(id) ON DELETE CASCADE,
  state TEXT NOT NULL,
  registration_number TEXT NOT NULL DEFAULT '',
  filing_frequency TEXT NOT NULL CHECK (filing_frequency IN ('Monthly', 'Quarterly', 'Annual')),
  start_date DATE NOT NULL DEFAULT CURRENT_DATE,
  portal_url TEXT NOT NULL DEFAULT '',
  portal_username TEXT NOT NULL DEFAULT '',
  portal_password TEXT NOT NULL DEFAULT '',
  notes TEXT NOT NULL DEFAULT '',
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (client_id, state)
);

CREATE TABLE IF NOT EXISTS public.salestax_filings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID NOT NULL REFERENCES public.salestax_clients(id) ON DELETE CASCADE,
  registration_id UUID NOT NULL REFERENCES public.salestax_registrations(id) ON DELETE CASCADE,
  period_month SMALLINT NOT NULL CHECK (period_month BETWEEN 1 AND 12),
  period_year SMALLINT NOT NULL CHECK (period_year BETWEEN 2000 AND 2100),
  gross_sales NUMERIC(14, 2) NOT NULL DEFAULT 0,
  taxable_sales NUMERIC(14, 2) NOT NULL DEFAULT 0,
  tax_amount NUMERIC(14, 2) NOT NULL DEFAULT 0,
  confirmation_number TEXT NOT NULL DEFAULT '',
  filed_date DATE,
  filed_by TEXT NOT NULL DEFAULT '',
  notes TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL DEFAULT 'Filed',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (registration_id, period_month, period_year)
);

CREATE TABLE IF NOT EXISTS public.salestax_reminders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID NOT NULL REFERENCES public.salestax_clients(id) ON DELETE CASCADE,
  registration_id UUID NOT NULL REFERENCES public.salestax_registrations(id) ON DELETE CASCADE,
  reminder_type TEXT NOT NULL,
  scheduled_date DATE NOT NULL,
  sent BOOLEAN NOT NULL DEFAULT FALSE,
  sent_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS salestax_clients_email_idx ON public.salestax_clients (email);
CREATE INDEX IF NOT EXISTS salestax_registrations_client_idx ON public.salestax_registrations (client_id, is_active);
CREATE INDEX IF NOT EXISTS salestax_filings_client_period_idx ON public.salestax_filings (client_id, period_year DESC, period_month DESC);
CREATE INDEX IF NOT EXISTS salestax_reminders_due_idx ON public.salestax_reminders (scheduled_date, sent);

ALTER TABLE public.salestax_clients DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.salestax_registrations DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.salestax_filings DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.salestax_reminders DISABLE ROW LEVEL SECURITY;
