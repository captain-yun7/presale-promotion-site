-- Supabase SQL Schema for Presale Promotion Site

-- Create inquiries table
CREATE TABLE IF NOT EXISTS inquiries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  unit_type VARCHAR(20),
  message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on created_at for better query performance
CREATE INDEX IF NOT EXISTS idx_inquiries_created_at ON inquiries(created_at DESC);

-- Create index on phone for potential duplicate checking
CREATE INDEX IF NOT EXISTS idx_inquiries_phone ON inquiries(phone);

-- Add RLS (Row Level Security) policies
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;

-- Policy: Allow anyone to insert inquiries
CREATE POLICY "Allow public insert on inquiries"
  ON inquiries
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Policy: Allow authenticated users to view all inquiries (for admin)
CREATE POLICY "Allow authenticated users to view inquiries"
  ON inquiries
  FOR SELECT
  TO authenticated
  USING (true);

-- Add comment to table
COMMENT ON TABLE inquiries IS 'Stores customer inquiries for apartment presale';

-- Add comments to columns
COMMENT ON COLUMN inquiries.id IS 'Unique identifier for inquiry';
COMMENT ON COLUMN inquiries.name IS 'Customer name';
COMMENT ON COLUMN inquiries.phone IS 'Customer phone number';
COMMENT ON COLUMN inquiries.unit_type IS 'Preferred unit type (59A, 84A, 114A, etc.)';
COMMENT ON COLUMN inquiries.message IS 'Additional message or inquiry from customer';
COMMENT ON COLUMN inquiries.created_at IS 'Timestamp when inquiry was created';
COMMENT ON COLUMN inquiries.updated_at IS 'Timestamp when inquiry was last updated';

-- Create consultations table
CREATE TABLE IF NOT EXISTS consultations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  source VARCHAR(50) DEFAULT 'website',
  project VARCHAR(100),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on created_at for better query performance
CREATE INDEX IF NOT EXISTS idx_consultations_created_at ON consultations(created_at DESC);

-- Create index on phone for potential duplicate checking
CREATE INDEX IF NOT EXISTS idx_consultations_phone ON consultations(phone);

-- Add RLS (Row Level Security) policies
ALTER TABLE consultations ENABLE ROW LEVEL SECURITY;

-- Policy: Allow anyone to insert consultations
CREATE POLICY "Allow public insert on consultations"
  ON consultations
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Policy: Allow anonymous users to view consultations (protected by API middleware)
CREATE POLICY "Allow anon select on consultations"
  ON consultations
  FOR SELECT
  TO anon
  USING (true);

-- Add comment to table
COMMENT ON TABLE consultations IS 'Stores customer consultation requests';

-- Add comments to columns
COMMENT ON COLUMN consultations.id IS 'Unique identifier for consultation';
COMMENT ON COLUMN consultations.name IS 'Customer name';
COMMENT ON COLUMN consultations.phone IS 'Customer phone number';
COMMENT ON COLUMN consultations.source IS 'Traffic source (website, naver, kakao, etc.)';
COMMENT ON COLUMN consultations.project IS 'Project name';
COMMENT ON COLUMN consultations.created_at IS 'Timestamp when consultation was requested';
