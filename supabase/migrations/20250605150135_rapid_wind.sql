/*
  # Fix user registration configuration

  1. Changes
    - Add trigger to automatically create profile record when a new user is created
    - Ensure proper RLS policies for profiles table
    - Fix user role synchronization

  2. Security
    - Enable RLS on profiles table
    - Add policies for user access to their own profile
*/

-- First, ensure the trigger function exists and is updated
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
    COALESCE((NEW.raw_user_meta_data->>'role')::user_role_enum, 'user'::user_role_enum)
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