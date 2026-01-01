-- ============================================
-- DEBUG: DISABLE AUTH TRIGGERS
-- ============================================

-- 1. Drop the trigger on auth.users
-- This is likely the source of the 500 error if it fails (even with exception handling sometimes)
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- 2. Drop the function to be sure (optional, but good for cleanup during debug)
-- DROP FUNCTION IF EXISTS public.create_profile_on_signup(); 
-- Keeping function for now, just removing trigger linkage.

-- 3. Ensure no other triggers on profiles that might be recursive
DROP TRIGGER IF EXISTS on_profile_updated ON public.profiles;

-- 4. Note: If this fixes login, we know the issue is definitely the trigger logic or permissions.
-- We can then re-enable it carefully later once we fix the underlying permission/logic issue.
