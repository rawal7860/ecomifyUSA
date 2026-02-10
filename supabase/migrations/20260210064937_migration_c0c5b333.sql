-- Update profiles table
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS phone text;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS address text;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS city text;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS state text;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS zip_code text;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS business_name text;

-- Update orders table structure
ALTER TABLE orders DROP CONSTRAINT IF EXISTS orders_service_type_check;
ALTER TABLE orders DROP CONSTRAINT IF EXISTS orders_payment_status_check;

ALTER TABLE orders ADD COLUMN IF NOT EXISTS state_code text;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS stripe_invoice_id text;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS formation_fee numeric;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS service_fee numeric;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS addons jsonb;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS entity_type text;

-- Ensure order_number has a default generation
ALTER TABLE orders ALTER COLUMN order_number SET DEFAULT 'ORD-' || substring(uuid_generate_v4()::text from 1 for 8);