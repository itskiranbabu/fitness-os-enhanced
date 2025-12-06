-- Add phone column to clients table
ALTER TABLE clients ADD COLUMN IF NOT EXISTS phone text;

-- Verify RLS policies for inbound_leads
DROP POLICY IF EXISTS "Public Access Leads" ON inbound_leads;
CREATE POLICY "Public Access Leads" ON inbound_leads FOR ALL USING (true);

-- Enable RLS if not already enabled
ALTER TABLE inbound_leads ENABLE ROW LEVEL SECURITY;
