-- Add new columns to apps table
ALTER TABLE apps 
ADD COLUMN IF NOT EXISTS url TEXT,
ADD COLUMN IF NOT EXISTS description TEXT,
ADD COLUMN IF NOT EXISTS download_url TEXT;

-- Update RLS policies (re-affirming admin access just in case)
-- (Existing policies cover current table, so adding columns doesn't break them)
