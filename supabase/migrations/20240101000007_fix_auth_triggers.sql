-- ============================================
-- FIX: AUTH TRIGGERS & RLS SAFETY
-- ============================================

-- 1. Ensure `get_user_role` is safe and efficient
CREATE OR REPLACE FUNCTION public.get_user_role(user_id UUID)
RETURNS TEXT AS $$
BEGIN
  -- Return 'user' if no ID provided to prevent errors
  IF user_id IS NULL THEN
    RETURN 'user';
  END IF;
  
  -- Direct query on profiles bypassing RLS (SECURITY DEFINER)
  -- Use COALESCE to handle cases where profile doesn't exist yet
  RETURN COALESCE(
    (SELECT role FROM public.profiles WHERE id = user_id),
    'user'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER; -- Changed to plpgsql for logic

-- 2. Robust Profile Creation Trigger
-- Wrap in exception block to ensure auth.users insertion NEVER fails
CREATE OR REPLACE FUNCTION public.create_profile_on_signup()
RETURNS TRIGGER AS $$
BEGIN
  BEGIN
    INSERT INTO public.profiles (id, email, full_name, role)
    VALUES (
      NEW.id,
      NEW.email,
      COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email),
      'user'
    );
  EXCEPTION WHEN OTHERS THEN
    -- Log error but DO NOT FAIL the transaction
    RAISE WARNING 'Failed to create profile for user %: %', NEW.id, SQLERRM;
  END;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 3. Double-check Trigger exists
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.create_profile_on_signup();

-- 4. Re-apply Policies using the safe function
-- Profiles
DROP POLICY IF EXISTS "Admins can read all profiles" ON public.profiles;
CREATE POLICY "Admins can read all profiles" ON public.profiles
  FOR SELECT
  USING (public.get_user_role(auth.uid()) = 'admin');

-- Apps
DROP POLICY IF EXISTS "Admin full access apps" ON public.apps;
CREATE POLICY "Admin full access apps" ON public.apps
  USING (public.get_user_role(auth.uid()) = 'admin')
  WITH CHECK (public.get_user_role(auth.uid()) = 'admin');

-- Pricing
DROP POLICY IF EXISTS "Admin full access pricing" ON public.pricing_config;
CREATE POLICY "Admin full access pricing" ON public.pricing_config
  USING (public.get_user_role(auth.uid()) = 'admin')
  WITH CHECK (public.get_user_role(auth.uid()) = 'admin');

-- Projects
DROP POLICY IF EXISTS "Admin full access projects" ON public.projects;
CREATE POLICY "Admin full access projects" ON public.projects
  USING (public.get_user_role(auth.uid()) = 'admin')
  WITH CHECK (public.get_user_role(auth.uid()) = 'admin');

-- Quotes
DROP POLICY IF EXISTS "Admins can do everything on quotes" ON public.quotes;
CREATE POLICY "Admins can do everything on quotes" ON public.quotes
  USING (public.get_user_role(auth.uid()) = 'admin');
