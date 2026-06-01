-- ============================================================================
-- ecomifyUSA — fresh project setup  (RUN THIS ONE FILE)
-- ----------------------------------------------------------------------------
-- Run once in the Supabase SQL Editor on a fresh project. Idempotent: every
-- statement uses IF NOT EXISTS / DROP ... IF EXISTS, so it is safe to re-run.
--
-- It creates the base tables the app needs that are NOT already present
-- (profiles, orders, services), wires the signup trigger, applies the audited
-- RLS policies + value constraints, and locks the admin-only CRM tables (which
-- hold client PII) to the service role.
--
-- Assumes these tables already exist in the project (they do in yours):
--   clients, companies, client_services, deadlines, reminders, documents, chat_leads
-- ============================================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================================
-- 1. profiles — one row per auth user, auto-created on signup
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.profiles (
    id            UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email         TEXT,
    full_name     TEXT,
    avatar_url    TEXT,
    phone         TEXT,
    address       TEXT,
    city          TEXT,
    state         TEXT,
    zip_code      TEXT,
    business_name TEXT,
    is_guest      BOOLEAN DEFAULT false,
    created_at    TIMESTAMPTZ DEFAULT NOW(),
    updated_at    TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view their own profile"   ON public.profiles;
DROP POLICY IF EXISTS "Users can insert their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;

CREATE POLICY "Users can view their own profile"
    ON public.profiles FOR SELECT
    USING ((SELECT auth.uid()) = id);
CREATE POLICY "Users can insert their own profile"
    ON public.profiles FOR INSERT TO authenticated
    WITH CHECK ((SELECT auth.uid()) = id);
CREATE POLICY "Users can update their own profile"
    ON public.profiles FOR UPDATE
    USING ((SELECT auth.uid()) = id);

-- Auto-create a profile row whenever a new auth user signs up.
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    INSERT INTO public.profiles (id, email, full_name)
    VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data->>'full_name')
    ON CONFLICT (id) DO UPDATE
        SET full_name = EXCLUDED.full_name,
            email     = EXCLUDED.email;
    RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ============================================================================
-- 2. orders — service orders; supports guest (anonymous) checkout
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.orders (
    id             UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id        UUID REFERENCES public.profiles(id) ON DELETE CASCADE,  -- nullable for guest checkout
    order_number   TEXT NOT NULL UNIQUE,
    service_type   TEXT NOT NULL,
    business_name  TEXT NOT NULL,
    state          TEXT NOT NULL,
    status         TEXT NOT NULL DEFAULT 'pending',
    amount         DECIMAL(10,2) NOT NULL,
    payment_status TEXT NOT NULL DEFAULT 'unpaid',
    notes          TEXT,
    customer_email TEXT,
    customer_name  TEXT,
    customer_phone TEXT,
    created_at     TIMESTAMPTZ DEFAULT NOW(),
    updated_at     TIMESTAMPTZ DEFAULT NOW()
);

-- Audited value constraints (drop-then-add so re-runs stay clean).
ALTER TABLE public.orders DROP CONSTRAINT IF EXISTS orders_service_type_check;
ALTER TABLE public.orders DROP CONSTRAINT IF EXISTS orders_payment_status_check;
ALTER TABLE public.orders DROP CONSTRAINT IF EXISTS orders_status_check;
ALTER TABLE public.orders
    ADD CONSTRAINT orders_service_type_check CHECK (service_type IN (
        'llc_formation','ein_application','tax_filing','annual_report',
        'full_package','wyoming_llc','delaware_llc','compliance')),
    ADD CONSTRAINT orders_payment_status_check CHECK (payment_status IN (
        'unpaid','pending','paid','refunded','failed')),
    ADD CONSTRAINT orders_status_check CHECK (status IN (
        'pending','processing','completed','cancelled'));

ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Authenticated users view own orders"        ON public.orders;
DROP POLICY IF EXISTS "Users can view their own orders"            ON public.orders;
DROP POLICY IF EXISTS "Allow guests to view their orders by email" ON public.orders;
DROP POLICY IF EXISTS "Allow guest checkout orders"                ON public.orders;
DROP POLICY IF EXISTS "Users can insert their own orders"          ON public.orders;
DROP POLICY IF EXISTS "Users can update their own orders"          ON public.orders;

-- Signed-in users read only their own orders. Guest order lookups must go
-- through a server-side API route using the service-role key (not the anon key).
CREATE POLICY "Authenticated users view own orders"
    ON public.orders FOR SELECT TO authenticated
    USING ((SELECT auth.uid()) = user_id);
-- Guest checkout: allow inserting a guest order (user_id NULL) or your own.
CREATE POLICY "Allow guest checkout orders"
    ON public.orders FOR INSERT
    WITH CHECK (user_id IS NULL OR (SELECT auth.uid()) = user_id);
CREATE POLICY "Users can update their own orders"
    ON public.orders FOR UPDATE TO authenticated
    USING ((SELECT auth.uid()) = user_id);

CREATE INDEX IF NOT EXISTS orders_user_id_idx         ON public.orders(user_id);
CREATE INDEX IF NOT EXISTS orders_status_idx          ON public.orders(status);
CREATE INDEX IF NOT EXISTS orders_created_at_idx      ON public.orders(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_orders_user_created_at ON public.orders(user_id, created_at DESC);

-- ============================================================================
-- 3. services — public catalogue / reference data
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.services (
    id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name        TEXT NOT NULL,
    description TEXT,
    price       NUMERIC(10,2) NOT NULL,
    category    TEXT,
    created_at  TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Anyone can view services" ON public.services;
CREATE POLICY "Anyone can view services"
    ON public.services FOR SELECT USING (true);

-- ============================================================================
-- 4. chat_leads hardening — table already exists; add size caps + rate limit
-- ============================================================================
ALTER TABLE public.chat_leads DROP CONSTRAINT IF EXISTS chat_leads_message_size;
ALTER TABLE public.chat_leads DROP CONSTRAINT IF EXISTS chat_leads_conversation_size;
ALTER TABLE public.chat_leads
    ADD CONSTRAINT chat_leads_message_size      CHECK (length(message) <= 4000),
    ADD CONSTRAINT chat_leads_conversation_size CHECK (pg_column_size(conversation) <= 65536);

CREATE OR REPLACE FUNCTION public.chat_leads_rate_limit()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    IF (SELECT COUNT(*) FROM public.chat_leads
        WHERE email = NEW.email
          AND created_at > NOW() - INTERVAL '1 hour') >= 5 THEN
        RAISE EXCEPTION 'rate_limit_exceeded: more than 5 chat leads from this email in the last hour';
    END IF;
    RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS enforce_chat_leads_rate_limit ON public.chat_leads;
CREATE TRIGGER enforce_chat_leads_rate_limit
    BEFORE INSERT ON public.chat_leads
    FOR EACH ROW EXECUTE FUNCTION public.chat_leads_rate_limit();

-- ============================================================================
-- 5. CRM PII lockdown — admin-only tables, service role only
--    RLS enabled with no anon/authenticated policy = deny all except service_role.
--    /admin pages and the reminder cron use the service-role key (bypasses RLS).
-- ============================================================================
ALTER TABLE public.clients          ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.companies        ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.client_services  ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.deadlines        ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reminders        ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.documents        ENABLE ROW LEVEL SECURITY;
