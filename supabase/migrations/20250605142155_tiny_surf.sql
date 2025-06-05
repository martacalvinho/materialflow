/*
  # Schema Enhancements

  1. New Tables
    - studios: Organization/company table for grouping users
    - uploaded_files: Store PDF file metadata

  2. Enums
    - user_role_enum: For user roles (admin, user)
    - project_type_enum: For project types (residential, commercial, etc.)
    - project_status_enum: For project statuses (draft, active, etc.)
    - material_category_enum: For material categories
    - material_unit_enum: For material measurement units

  3. Additional Fields
    - users: Add studio_id, last_login, email_verified
    - projects: Add start_date, end_date, pdf_file_id
    - materials: Add unit_type, sustainability_rating
    - material_instances: Add unit_type, currency
*/

-- Create enums
CREATE TYPE user_role_enum AS ENUM ('admin', 'user', 'studio_owner');
CREATE TYPE project_type_enum AS ENUM (
  'residential',
  'commercial',
  'healthcare',
  'hospitality',
  'education',
  'cultural',
  'mixed_use',
  'other'
);
CREATE TYPE project_status_enum AS ENUM (
  'draft',
  'processing',
  'active',
  'completed',
  'archived'
);
CREATE TYPE material_category_enum AS ENUM (
  'flooring',
  'wall_covering',
  'ceiling',
  'paint',
  'hardware',
  'lighting',
  'plumbing',
  'furniture',
  'textile',
  'stone',
  'wood',
  'metal',
  'glass',
  'ceramic',
  'other'
);
CREATE TYPE material_unit_enum AS ENUM (
  'square_feet',
  'square_meters',
  'linear_feet',
  'linear_meters',
  'units',
  'pieces',
  'gallons',
  'liters'
);

-- Create studios table
CREATE TABLE IF NOT EXISTS studios (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  billing_email text,
  billing_address text,
  subscription_tier text,
  subscription_status text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create uploaded_files table
CREATE TABLE IF NOT EXISTS uploaded_files (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  filename text NOT NULL,
  file_path text NOT NULL,
  file_size integer NOT NULL,
  mime_type text NOT NULL,
  project_id uuid REFERENCES projects(id) ON DELETE CASCADE,
  processing_status text NOT NULL DEFAULT 'uploaded',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Alter existing tables

-- Update users table
ALTER TABLE users
  ADD COLUMN IF NOT EXISTS studio_id uuid REFERENCES studios(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS last_login_at timestamptz,
  ADD COLUMN IF NOT EXISTS email_verified_at timestamptz,
  ALTER COLUMN role TYPE user_role_enum USING role::user_role_enum;

-- Update projects table
ALTER TABLE projects
  ADD COLUMN IF NOT EXISTS start_date date,
  ADD COLUMN IF NOT EXISTS end_date date,
  ADD COLUMN IF NOT EXISTS pdf_file_id uuid REFERENCES uploaded_files(id) ON DELETE SET NULL,
  ALTER COLUMN type TYPE project_type_enum USING 
    CASE type
      WHEN 'residential' THEN 'residential'::project_type_enum
      WHEN 'commercial' THEN 'commercial'::project_type_enum
      ELSE 'other'::project_type_enum
    END,
  ALTER COLUMN status TYPE project_status_enum USING 
    CASE status
      WHEN 'draft' THEN 'draft'::project_status_enum
      WHEN 'active' THEN 'active'::project_status_enum
      WHEN 'completed' THEN 'completed'::project_status_enum
      ELSE 'draft'::project_status_enum
    END;

-- Update materials table
ALTER TABLE materials
  ADD COLUMN IF NOT EXISTS unit_type material_unit_enum DEFAULT 'square_feet',
  ADD COLUMN IF NOT EXISTS sustainability_rating integer CHECK (sustainability_rating BETWEEN 1 AND 5),
  ADD COLUMN IF NOT EXISTS is_locally_sourced boolean DEFAULT false,
  ALTER COLUMN category TYPE material_category_enum USING 
    CASE category
      WHEN 'flooring' THEN 'flooring'::material_category_enum
      WHEN 'paint' THEN 'paint'::material_category_enum
      ELSE 'other'::material_category_enum
    END;

-- Update material_instances table
ALTER TABLE material_instances
  ADD COLUMN IF NOT EXISTS unit_type material_unit_enum,
  ADD COLUMN IF NOT EXISTS currency text DEFAULT 'USD',
  ADD COLUMN IF NOT EXISTS notes text,
  ADD COLUMN IF NOT EXISTS status text;

-- Update manufacturers table
ALTER TABLE manufacturers
  ADD COLUMN IF NOT EXISTS address text,
  ADD COLUMN IF NOT EXISTS city text,
  ADD COLUMN IF NOT EXISTS state text,
  ADD COLUMN IF NOT EXISTS country text,
  ADD COLUMN IF NOT EXISTS postal_code text;

-- Add indexes
CREATE INDEX IF NOT EXISTS idx_users_studio_id ON users(studio_id);
CREATE INDEX IF NOT EXISTS idx_projects_pdf_file_id ON projects(pdf_file_id);
CREATE INDEX IF NOT EXISTS idx_uploaded_files_project_id ON uploaded_files(project_id);

-- Enable RLS on new tables
ALTER TABLE studios ENABLE ROW LEVEL SECURITY;
ALTER TABLE uploaded_files ENABLE ROW LEVEL SECURITY;

-- Add RLS policies for new tables
CREATE POLICY "Users can view their studio" ON studios
  FOR SELECT TO authenticated
  USING (id IN (
    SELECT studio_id FROM users WHERE id = auth.uid()
  ));

CREATE POLICY "Studio owners can manage their studio" ON studios
  FOR ALL TO authenticated
  USING (id IN (
    SELECT studio_id FROM users 
    WHERE id = auth.uid() AND role = 'studio_owner'
  ))
  WITH CHECK (id IN (
    SELECT studio_id FROM users 
    WHERE id = auth.uid() AND role = 'studio_owner'
  ));

CREATE POLICY "Users can view their project files" ON uploaded_files
  FOR SELECT TO authenticated
  USING (project_id IN (
    SELECT id FROM projects WHERE user_id = auth.uid()
  ));

CREATE POLICY "Users can manage their project files" ON uploaded_files
  FOR ALL TO authenticated
  USING (project_id IN (
    SELECT id FROM projects WHERE user_id = auth.uid()
  ))
  WITH CHECK (project_id IN (
    SELECT id FROM projects WHERE user_id = auth.uid()
  ));

-- Add triggers for new tables
CREATE TRIGGER update_studios_updated_at
  BEFORE UPDATE ON studios
  FOR EACH ROW
  EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_uploaded_files_updated_at
  BEFORE UPDATE ON uploaded_files
  FOR EACH ROW
  EXECUTE PROCEDURE update_updated_at_column();