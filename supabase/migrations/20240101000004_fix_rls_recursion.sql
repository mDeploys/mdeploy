-- ============================================
-- FINAL FIX: RLS RECURSION
-- ============================================

-- 1. Security Definer function to bypass RLS
CREATE OR REPLACE FUNCTION public.get_user_role(user_id UUID)
RETURNS TEXT AS $$
  -- This query runs with the privileges of the creator (postgres), bypassing RLS
  SELECT role FROM public.profiles WHERE id = user_id;
$$ LANGUAGE sql SECURITY DEFINER;

-- 2. Cleanup ALL potential recursive policies on profiles
DROP POLICY IF EXISTS "Admins can read all profiles" ON profiles;
DROP POLICY IF EXISTS "Admin full access profiles" ON profiles;

-- 3. Create non-recursive Profile policy
CREATE POLICY "Admins can read all profiles" ON profiles
  FOR SELECT
  USING (public.get_user_role(auth.uid()) = 'admin');

-- 4. Cleanup and Fix Apps policies
DROP POLICY IF EXISTS "Admin full access apps" ON apps;
CREATE POLICY "Admin full access apps" ON apps
  USING (public.get_user_role(auth.uid()) = 'admin')
  WITH CHECK (public.get_user_role(auth.uid()) = 'admin');

-- 5. Cleanup and Fix Pricing policies
DROP POLICY IF EXISTS "Admin full access pricing" ON pricing_config;
CREATE POLICY "Admin full access pricing" ON pricing_config
  USING (public.get_user_role(auth.uid()) = 'admin')
  WITH CHECK (public.get_user_role(auth.uid()) = 'admin');
