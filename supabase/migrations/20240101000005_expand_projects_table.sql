-- Expand projects table to store more client information and quote details
ALTER TABLE projects 
ADD COLUMN IF NOT EXISTS client_phone TEXT,
ADD COLUMN IF NOT EXISTS client_company TEXT,
ADD COLUMN IF NOT EXISTS details JSONB;

-- Optional: Update the type check if needed, but the current ones are likely sufficient
-- type IN ('website', 'web_app', 'mobile_app', 'desktop_app')
