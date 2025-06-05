-- Fix for user registration with original users table
-- First, clean up any existing triggers that might cause recursion
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP TRIGGER IF EXISTS handle_new_user ON auth.users;
DROP TRIGGER IF EXISTS sync_user_to_profile ON auth.users;
DROP TRIGGER IF EXISTS on_new_user ON auth.users;
DROP TRIGGER IF EXISTS on_auth_user_created_simple ON auth.users;

-- Create a simple, non-recursive function to handle new auth users
CREATE OR REPLACE FUNCTION public.handle_auth_user_created()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER -- Run with elevated permissions
AS $$
BEGIN
  -- Insert directly into the users table with minimal required fields
  INSERT INTO public.users (
    id,
    email,
    role,
    created_at,
    updated_at
  ) VALUES (
    NEW.id,
    NEW.email,
    'user'::public.user_role_enum, -- Always set as basic user role
    NOW(),
    NOW()
  )
  ON CONFLICT (id) DO NOTHING; -- Avoid conflicts
  
  RETURN NEW;
END;
$$;

-- Create a single trigger with a distinct name
CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW
EXECUTE FUNCTION public.handle_auth_user_created();

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO postgres, service_role, anon, authenticated;
GRANT ALL ON public.users TO postgres, service_role;
GRANT SELECT ON public.users TO anon, authenticated;
