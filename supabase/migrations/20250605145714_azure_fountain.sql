/*
  # Add user sync trigger function

  1. Changes
    - Create a trigger function to sync auth.users to public.users
    - Add trigger to auth.users table
    - Update existing trigger function to handle metadata

  2. Security
    - Function executes with security definer to bypass RLS
*/

-- Create or replace the trigger function
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.users (
    id,
    email,
    role,
    created_at,
    updated_at
  ) VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'role', 'user')::user_role_enum,
    NEW.created_at,
    NEW.created_at
  );

  -- Update studio information if provided
  IF NEW.raw_user_meta_data->>'studio_name' IS NOT NULL THEN
    INSERT INTO public.studios (
      name,
      created_at,
      updated_at
    ) VALUES (
      NEW.raw_user_meta_data->>'studio_name',
      NEW.created_at,
      NEW.created_at
    ) RETURNING id INTO NEW.raw_user_meta_data->>'studio_id';

    -- Link studio to user
    UPDATE public.users
    SET studio_id = (NEW.raw_user_meta_data->>'studio_id')::uuid
    WHERE id = NEW.id;
  END IF;

  RETURN NEW;
END;
$$;

-- Drop existing trigger if it exists
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- Create new trigger
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();