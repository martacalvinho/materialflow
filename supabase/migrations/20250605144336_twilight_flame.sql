/*
  # Add user roles management

  1. Changes
    - Add role column to users table with enum type
    - Add policy for admin users
    - Add trigger to sync auth.users metadata

  2. Security
    - Only admins can modify user roles
    - Users can read their own role
*/

-- Create role enum if it doesn't exist
DO $$ BEGIN
  CREATE TYPE user_role AS ENUM ('user', 'admin', 'studio_owner');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- Add role column if it doesn't exist
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'users' AND column_name = 'role'
  ) THEN
    ALTER TABLE users ADD COLUMN role user_role NOT NULL DEFAULT 'user';
  END IF;
END $$;

-- Create policy for admin users
CREATE POLICY "Admins can update user roles"
  ON users
  FOR UPDATE
  TO authenticated
  USING (auth.uid() IN (
    SELECT id FROM users WHERE role = 'admin'
  ))
  WITH CHECK (auth.uid() IN (
    SELECT id FROM users WHERE role = 'admin'
  ));

-- Function to sync role changes to auth.users metadata
CREATE OR REPLACE FUNCTION sync_user_role()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE auth.users
  SET raw_user_meta_data = 
    COALESCE(raw_user_meta_data::jsonb, '{}'::jsonb) || 
    jsonb_build_object('role', NEW.role)
  WHERE id = NEW.id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for role sync
DROP TRIGGER IF EXISTS sync_user_role ON users;
CREATE TRIGGER sync_user_role
  AFTER INSERT OR UPDATE OF role
  ON users
  FOR EACH ROW
  EXECUTE FUNCTION sync_user_role();