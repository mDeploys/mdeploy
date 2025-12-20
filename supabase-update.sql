-- ============================================
-- MDEPLOY UPDATE: APPS & PRICING
-- Run this in Supabase SQL Editor to update your DB
-- ============================================

-- 1. Create Apps Table
CREATE TABLE IF NOT EXISTS apps (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  thumbnail_url TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL
);

-- 2. Create Pricing Configuration Table
CREATE TABLE IF NOT EXISTS pricing_config (
  key TEXT PRIMARY KEY,
  value DECIMAL(10, 2) NOT NULL,
  label TEXT NOT NULL
);

-- 3. Seed Default Pricing (Only if not exists)
INSERT INTO pricing_config (key, value, label)
VALUES 
  ('websitePagePrice', 250, 'Front-end Website / Page'),
  ('webAppPrice', 300, 'Web App / Page'),
  ('ecommercePagePrice', 450, 'E-Commerce Website / Page'),
  ('mobileScreenPrice', 300, 'Mobile APP / Screen'),
  ('desktopFunctionPrice', 180, 'Desktop App / Function'),
  ('landingPagePrice', 500, 'Landing Page / Set'),
  ('wordpressTemplatePrice', 1500, 'WordPress Template / Set'),
  ('logoDesignPrice', 300, 'Logo Design / Set'),
  ('brandingDesignPrice', 1500, 'Branding Design / Set'),
  ('setupFee', 200, 'Setup Fee')
ON CONFLICT (key) DO NOTHING;

-- 4. RLS Policies
ALTER TABLE apps ENABLE ROW LEVEL SECURITY;
ALTER TABLE pricing_config ENABLE ROW LEVEL SECURITY;

-- Public read access for apps
CREATE POLICY "Public read apps" ON apps
  FOR SELECT USING (true);

-- Admin full access for apps
CREATE POLICY "Admin full access apps" ON apps
  USING ((SELECT role FROM profiles WHERE id = auth.uid()) = 'admin')
  WITH CHECK ((SELECT role FROM profiles WHERE id = auth.uid()) = 'admin');

-- Public read access for pricing
CREATE POLICY "Public read pricing" ON pricing_config
  FOR SELECT USING (true);

-- Admin full access for pricing
CREATE POLICY "Admin full access pricing" ON pricing_config
  USING ((SELECT role FROM profiles WHERE id = auth.uid()) = 'admin')
  WITH CHECK ((SELECT role FROM profiles WHERE id = auth.uid()) = 'admin');
