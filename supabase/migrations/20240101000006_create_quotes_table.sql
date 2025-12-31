-- Migration: Separate Quotes from Projects and add Auto-Numbering
-- Description: Creates a dedicated quotes table for new submissions

-- Create the quotes table
CREATE SEQUENCE IF NOT EXISTS quotes_quote_number_seq;

CREATE TABLE IF NOT EXISTS public.quotes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    quote_number INTEGER DEFAULT nextval('quotes_quote_number_seq'),
    quote_id TEXT UNIQUE, -- Formatted like QT-1001
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    company TEXT,
    phone TEXT,
    notes TEXT,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'reviewed', 'converted', 'rejected')),
    total_price DECIMAL(12,2) NOT NULL,
    details JSONB NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- Grant sequence usage to public so triggers work for all roles
GRANT USAGE, SELECT ON SEQUENCE quotes_quote_number_seq TO public;

-- Enable RLS
ALTER TABLE public.quotes ENABLE ROW LEVEL SECURITY;

-- Cleanup existing policies to avoid errors on rerun
DROP POLICY IF EXISTS "Admins can do everything on quotes" ON public.quotes;
DROP POLICY IF EXISTS "Anyone can insert quotes" ON public.quotes;

-- Policies for Admin Access
CREATE POLICY "Admins can do everything on quotes"
ON public.quotes
FOR ALL
TO authenticated
USING (public.get_user_role(auth.uid()) = 'admin');

CREATE POLICY "Anyone can insert quotes"
ON public.quotes
FOR INSERT
TO public
WITH CHECK (true);

-- Function to format quote_id before insert
CREATE OR REPLACE FUNCTION public.format_quote_id()
RETURNS TRIGGER AS $$
BEGIN
    -- Ensure the sequence value is assigned to quote_number if it's null
    IF NEW.quote_number IS NULL THEN
        NEW.quote_number := nextval('quotes_quote_number_seq');
    END IF;
    
    -- Generate the formatted quote_id
    NEW.quote_id := 'QT-' || LPAD(NEW.quote_number::text, 4, '0');
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Cleanup existing trigger
DROP TRIGGER IF EXISTS set_quote_id ON public.quotes;

-- Function to get the next formatted quote_id (for preview)
CREATE OR REPLACE FUNCTION public.get_next_quote_id()
RETURNS TEXT AS $$
DECLARE
    next_val INTEGER;
BEGIN
    -- This WILL increment the sequence
    next_val := nextval('quotes_quote_number_seq');
    RETURN 'QT-' || LPAD(next_val::text, 4, '0');
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to automaticly set quote_id
CREATE TRIGGER set_quote_id
BEFORE INSERT ON public.quotes
FOR EACH ROW
EXECUTE FUNCTION public.format_quote_id();

-- Comments for documentation
COMMENT ON TABLE public.quotes IS 'Stores initial quote requests separate from formal projects.';
