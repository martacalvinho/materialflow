/*
  # Initial Schema Setup

  1. Tables
    - users (authentication and role management)
    - clients (client organizations)
    - manufacturers (material suppliers)
    - projects (material specification projects)
    - materials (material definitions)
    - material_instances (material usage in projects)
    - notes (project and manufacturer notes)
  
  2. Security
    - Enable RLS on all tables
    - Policies for data access control
    
  3. Performance
    - Indexes on foreign keys
    - Updated_at triggers
*/

-- Create tables
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  role text NOT NULL DEFAULT 'user',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS clients (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS manufacturers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  contact_name text,
  contact_email text,
  contact_phone text,
  website text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  client_id uuid REFERENCES clients(id) ON DELETE SET NULL,
  type text NOT NULL,
  status text NOT NULL DEFAULT 'draft',
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS materials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  category text NOT NULL,
  manufacturer_id uuid REFERENCES manufacturers(id) ON DELETE SET NULL,
  description text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS material_instances (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  material_id uuid REFERENCES materials(id) ON DELETE CASCADE,
  project_id uuid REFERENCES projects(id) ON DELETE CASCADE,
  location text NOT NULL,
  area numeric,
  quantity numeric,
  price_per_unit numeric,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS notes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  content text NOT NULL,
  manufacturer_id uuid REFERENCES manufacturers(id) ON DELETE CASCADE,
  project_id uuid REFERENCES projects(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE manufacturers ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE materials ENABLE ROW LEVEL SECURITY;
ALTER TABLE material_instances ENABLE ROW LEVEL SECURITY;
ALTER TABLE notes ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DO $$ 
BEGIN
  -- Users policies
  DROP POLICY IF EXISTS "Users can read own data" ON users;
  
  -- Clients policies
  DROP POLICY IF EXISTS "Users can CRUD their own clients" ON clients;
  
  -- Projects policies
  DROP POLICY IF EXISTS "Users can CRUD their own projects" ON projects;
  
  -- Materials policies
  DROP POLICY IF EXISTS "Users can read all materials" ON materials;
  DROP POLICY IF EXISTS "Users can create materials" ON materials;
  
  -- Material instances policies
  DROP POLICY IF EXISTS "Users can CRUD their own material instances" ON material_instances;
  
  -- Manufacturers policies
  DROP POLICY IF EXISTS "Users can read all manufacturers" ON manufacturers;
  DROP POLICY IF EXISTS "Users can create manufacturers" ON manufacturers;
  
  -- Notes policies
  DROP POLICY IF EXISTS "Users can CRUD notes on their projects" ON notes;
END $$;

-- Create policies
-- Users can read their own data
CREATE POLICY "Users can read own data" ON users
  FOR SELECT TO authenticated
  USING (auth.uid() = id);

-- Clients policies
CREATE POLICY "Users can CRUD their own clients" ON clients
  FOR ALL TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Projects policies
CREATE POLICY "Users can CRUD their own projects" ON projects
  FOR ALL TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Materials policies (shared across users)
CREATE POLICY "Users can read all materials" ON materials
  FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "Users can create materials" ON materials
  FOR INSERT TO authenticated
  WITH CHECK (true);

-- Material instances policies
CREATE POLICY "Users can CRUD their own material instances" ON material_instances
  FOR ALL TO authenticated
  USING (EXISTS (
    SELECT 1 FROM projects 
    WHERE projects.id = material_instances.project_id 
    AND projects.user_id = auth.uid()
  ))
  WITH CHECK (EXISTS (
    SELECT 1 FROM projects 
    WHERE projects.id = material_instances.project_id 
    AND projects.user_id = auth.uid()
  ));

-- Manufacturers policies (shared across users)
CREATE POLICY "Users can read all manufacturers" ON manufacturers
  FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "Users can create manufacturers" ON manufacturers
  FOR INSERT TO authenticated
  WITH CHECK (true);

-- Notes policies
CREATE POLICY "Users can CRUD notes on their projects" ON notes
  FOR ALL TO authenticated
  USING (
    project_id IS NULL OR
    EXISTS (
      SELECT 1 FROM projects 
      WHERE projects.id = notes.project_id 
      AND projects.user_id = auth.uid()
    )
  )
  WITH CHECK (
    project_id IS NULL OR
    EXISTS (
      SELECT 1 FROM projects 
      WHERE projects.id = notes.project_id 
      AND projects.user_id = auth.uid()
    )
  );

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_projects_user_id ON projects(user_id);
CREATE INDEX IF NOT EXISTS idx_clients_user_id ON clients(user_id);
CREATE INDEX IF NOT EXISTS idx_material_instances_project_id ON material_instances(project_id);
CREATE INDEX IF NOT EXISTS idx_material_instances_material_id ON material_instances(material_id);
CREATE INDEX IF NOT EXISTS idx_notes_project_id ON notes(project_id);
CREATE INDEX IF NOT EXISTS idx_notes_manufacturer_id ON notes(manufacturer_id);

-- Create updated_at triggers
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW
  EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_clients_updated_at
  BEFORE UPDATE ON clients
  FOR EACH ROW
  EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_manufacturers_updated_at
  BEFORE UPDATE ON manufacturers
  FOR EACH ROW
  EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_projects_updated_at
  BEFORE UPDATE ON projects
  FOR EACH ROW
  EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_materials_updated_at
  BEFORE UPDATE ON materials
  FOR EACH ROW
  EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_material_instances_updated_at
  BEFORE UPDATE ON material_instances
  FOR EACH ROW
  EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_notes_updated_at
  BEFORE UPDATE ON notes
  FOR EACH ROW
  EXECUTE PROCEDURE update_updated_at_column();