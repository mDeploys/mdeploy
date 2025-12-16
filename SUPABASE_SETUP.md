# Supabase Setup Instructions

## 1. Create a Supabase Project

1. Go to [https://supabase.com](https://supabase.com) and sign up/login
2. Create a new project
3. Wait for the project to be set up

## 2. Get Your API Keys

1. Go to Project Settings > API
2. Copy the following values:
   - **Project URL**: `NEXT_PUBLIC_SUPABASE_URL`
   - **anon/public key**: `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## 3. Update Environment Variables

Open `.env.local` and replace the placeholder values:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_actual_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_actual_anon_key
```

## 4. Create Database Tables

1. Go to your Supabase project dashboard
2. Click on "SQL Editor"
3. Run the following SQL queries:

### Create Projects Table
```sql
CREATE TABLE projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('website', 'web_app', 'mobile_app', 'desktop_app')),
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'completed', 'cancelled')),
  client_name TEXT NOT NULL,
  client_email TEXT NOT NULL,
  price DECIMAL(10, 2) NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL
);

CREATE INDEX idx_projects_created_at ON projects(created_at DESC);
CREATE INDEX idx_projects_status ON projects(status);

ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all operations for now" ON projects
  FOR ALL
  USING (true)
  WITH CHECK (true);
```

### Create Profiles Table with Admin Role Support
```sql
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  role TEXT NOT NULL DEFAULT 'user' CHECK (role IN ('admin', 'user')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Allow users to read their own profile
CREATE POLICY "Users can read their own profile" ON profiles
  FOR SELECT
  USING (auth.uid() = id);

-- Allow authenticated users to update their own profile (except role)
CREATE POLICY "Users can update their own profile" ON profiles
  FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Allow admins to read all profiles
CREATE POLICY "Admins can read all profiles" ON profiles
  FOR SELECT
  USING ((SELECT role FROM profiles WHERE id = auth.uid()) = 'admin');

-- Function to create profile on signup
CREATE OR REPLACE FUNCTION create_profile_on_signup()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, email, full_name, role)
  VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data->>'full_name', 'user');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to auto-create profile
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION create_profile_on_signup();
```

### Grant Admin Role to Your User

Replace `your-email@example.com` with your email:

```sql
UPDATE profiles 
SET role = 'admin' 
WHERE email = 'your-email@example.com';
```

## 5. Enable Auth Email Templates (Optional but Recommended)

In Supabase Dashboard:
1. Go to Auth > Email Templates
2. Customize confirmation, password reset, and magic link emails

## 6. Access the Admin Page

Visit: `http://localhost:3000/admin/login`

- Sign up with your email
- Once confirmed, sign in
- You'll be redirected to the admin dashboard

## 7. Testing Locally

```powershell
pnpm dev
```

## Environment Variables Summary

Add to `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_ANON_KEY
ADMIN_PASSWORD=legacy_password_only_if_using_old_method
```

## Features

✅ Email/password authentication via Supabase Auth
✅ Auto role assignment (user by default)
✅ Admin role support
✅ Rate-limited login (5 attempts / 15 minutes)
✅ Full CRUD on projects
✅ Protected `/admin` routes with middleware
✅ Automatic profile creation on signup

## Production Checklist

- [ ] Update RLS policies for tighter security
- [ ] Set strong email templates in Auth > Email Templates
- [ ] Configure custom domain (optional)
- [ ] Enable MFA for admin users
- [ ] Set up email rate limiting in Auth settings
- [ ] Test email confirmation flow
- [ ] Add role-based project ownership (link projects to user)

## Troubleshooting

**Login redirects to login page immediately?**
- Clear browser cookies
- Check `.env.local` has correct Supabase URL/keys
- Ensure middleware is not blocking the auth flow

**Profile not created after signup?**
- Check if the `create_profile_on_signup` trigger is enabled
- Confirm `auth.users` table exists

**Can't see admin features?**
- Update your profile role to 'admin' using the SQL query above
- Clear auth tokens and re-login
