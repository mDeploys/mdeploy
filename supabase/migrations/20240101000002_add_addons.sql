-- ============================================
-- MDEPLOY UPDATE: ADDONS & FEES
-- ============================================

-- 1. Seed New Pricing Keys
INSERT INTO pricing_config (key, value, label)
VALUES 
  ('backendHostingYearly', 1500, 'Backend Hosting / Year'),
  ('webHosting5GBYearly', 500, 'Web Hosting 5GB / Year'),
  ('webHosting10GBYearly', 800, 'Web Hosting 10GB / Year'),
  ('cloudHosting20GBYearly', 1000, 'Cloud Hosting 20GB / Year'),
  ('paymentGatewayOneTime', 800, 'Payment Gateway / One time'),
  ('mailServerOneTime', 350, 'Setup Mail Server / One time')
ON CONFLICT (key) DO NOTHING;

-- 2. Update Setup Fee
UPDATE pricing_config
SET value = 300, label = 'SQL Setup and Process'
WHERE key = 'setupFee';
