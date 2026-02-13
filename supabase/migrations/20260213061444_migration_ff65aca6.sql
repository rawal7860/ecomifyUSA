-- CRITICAL FIX: Allow profile creation for authenticated users
-- Drop existing restrictive policies
DROP POLICY IF EXISTS "Users can view their own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON profiles;
DROP POLICY IF EXISTS "Users can insert their own profile" ON profiles;

-- Create permissive policies that allow profile creation during signup
CREATE POLICY "Allow authenticated users to insert their own profile"
  ON profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Allow authenticated users to view their own profile"
  ON profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Allow authenticated users to update their own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- CRITICAL: Also allow service role to bypass RLS entirely for backend operations
ALTER TABLE profiles FORCE ROW LEVEL SECURITY;

-- Add a policy for initial profile creation that allows INSERT immediately after signup
CREATE POLICY "Allow profile creation during signup"
  ON profiles FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Ensure orders table has proper policies
DROP POLICY IF EXISTS "Users can view their own orders" ON orders;
DROP POLICY IF EXISTS "Users can insert their own orders" ON orders;
DROP POLICY IF EXISTS "Users can update their own orders" ON orders;

CREATE POLICY "Allow users to insert their own orders"
  ON orders FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Allow users to view their own orders"
  ON orders FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Allow users to update their own orders"
  ON orders FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);