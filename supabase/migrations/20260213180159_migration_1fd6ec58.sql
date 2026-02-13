-- CRITICAL: Create RLS policy to allow authenticated users to insert their own profiles
CREATE POLICY "Enable insert for authenticated users only" 
ON profiles 
FOR INSERT 
TO authenticated 
WITH CHECK (auth.uid() = id);