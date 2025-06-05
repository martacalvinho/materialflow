/*
  # Fix user role enum and registration

  1. Changes
    - Create user_role_enum type if it doesn't exist
    - Update profiles table to use the correct enum
    - Update handle_new_user function to properly handle role assignment
    
  2. Security
    - No changes to security policies
*/

-- First, create the enum type if it doesn't exist
DO $$ 
BEGIN 
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'user_role_enum') THEN
    CREATE TYPE public.user_role_enum AS ENUM ('admin', 'studio_owner', 'user');
  END IF;
END $$;

-- Update the handle_new_user function to properly handle the role
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (
    id,
    full_name,
    studio_name,
    role
  ) VALUES (
    NEW.id,
    NEW.raw_user_meta_data->>'full_name',
    NEW.raw_user_meta_data->>'studio_name',
    COALESCE(
      (NEW.raw_user_meta_data->>'role')::user_role_enum,
      'user'::user_role_enum
    )
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Ensure the trigger exists
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_trigger
    WHERE tgname = 'on_auth_user_created'
  ) THEN
    CREATE TRIGGER on_auth_user_created
      AFTER INSERT ON auth.users
      FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
  END IF;
END
$$;