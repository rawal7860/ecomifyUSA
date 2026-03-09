-- 1. Add guest checkout columns to orders table
ALTER TABLE orders 
  ADD COLUMN IF NOT EXISTS customer_email TEXT,
  ADD COLUMN IF NOT EXISTS customer_name TEXT,
  ADD COLUMN IF NOT EXISTS customer_phone TEXT;

-- 2. Make user_id nullable for guest checkout
ALTER TABLE orders ALTER COLUMN user_id DROP NOT NULL;

-- 3. Add is_guest column to profiles
ALTER TABLE profiles 
  ADD COLUMN IF NOT EXISTS is_guest BOOLEAN DEFAULT false;

-- 4. Create services table
CREATE TABLE IF NOT EXISTS services (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT,
  price NUMERIC(10,2) NOT NULL,
  category TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Enable RLS on services
ALTER TABLE services ENABLE ROW LEVEL SECURITY;

-- 6. Create RLS policy for public read access to services
CREATE POLICY "Anyone can view services"
  ON services
  FOR SELECT
  USING (true);

-- 7. Update orders RLS to allow guest checkout (anonymous INSERT)
CREATE POLICY "Allow guest checkout orders"
  ON orders
  FOR INSERT
  WITH CHECK (user_id IS NULL OR auth.uid() = user_id);

-- 8. Allow guests to view their orders by email
CREATE POLICY "Allow guests to view their orders by email"
  ON orders
  FOR SELECT
  USING (
    user_id IS NULL 
    OR auth.uid() = user_id
  );

COMMENT ON COLUMN orders.customer_email IS 'Email for guest checkout (when user_id is null)';
COMMENT ON COLUMN orders.customer_name IS 'Name for guest checkout (when user_id is null)';
COMMENT ON COLUMN orders.customer_phone IS 'Phone for guest checkout (when user_id is null)';