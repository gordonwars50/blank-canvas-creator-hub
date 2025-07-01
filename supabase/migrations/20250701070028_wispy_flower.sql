/*
  # Fix Team and Gear Management Tables

  1. Team Members
    - Ensures team_members table exists with proper structure
    - Adds unique constraint on user_id + email to prevent duplicates
    - Creates RLS policies with existence checks

  2. Team Invites
    - Ensures team_invites table exists
    - Adds unique constraint on invited_by + email to prevent duplicate invites
    - Creates RLS policies with existence checks

  3. Cameras & Lenses
    - Ensures camera and lens tables exist
    - Creates RLS policies with existence checks
*/

-- Create team_members table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.team_members (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name text NOT NULL,
  email text NOT NULL,
  role text NOT NULL,
  joined_at timestamp with time zone DEFAULT now(),
  is_active boolean DEFAULT true,
  avatar text
);

-- Add unique constraint to prevent duplicates
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint 
    WHERE conname = 'team_members_user_id_email_key'
  ) THEN
    ALTER TABLE public.team_members ADD CONSTRAINT team_members_user_id_email_key UNIQUE (user_id, email);
  END IF;
END
$$;

-- Enable RLS on team_members if not already enabled
ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;

-- Create team_members policies if they don't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'team_members' AND policyname = 'Users can view their own team members'
  ) THEN
    CREATE POLICY "Users can view their own team members" ON public.team_members
      FOR SELECT USING (auth.uid() = user_id);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'team_members' AND policyname = 'Users can create their own team members'
  ) THEN
    CREATE POLICY "Users can create their own team members" ON public.team_members
      FOR INSERT WITH CHECK (auth.uid() = user_id);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'team_members' AND policyname = 'Users can update their own team members'
  ) THEN
    CREATE POLICY "Users can update their own team members" ON public.team_members
      FOR UPDATE USING (auth.uid() = user_id);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'team_members' AND policyname = 'Users can delete their own team members'
  ) THEN
    CREATE POLICY "Users can delete their own team members" ON public.team_members
      FOR DELETE USING (auth.uid() = user_id);
  END IF;
END
$$;

-- Create team_invites table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.team_invites (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  email text NOT NULL,
  role text NOT NULL,
  invited_by uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  invited_at timestamp with time zone DEFAULT now(),
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'expired'))
);

-- Add unique constraint to prevent duplicate invites
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint 
    WHERE conname = 'team_invites_invited_by_email_key'
  ) THEN
    ALTER TABLE public.team_invites ADD CONSTRAINT team_invites_invited_by_email_key UNIQUE (invited_by, email);
  END IF;
END
$$;

-- Enable RLS on team_invites if not already enabled
ALTER TABLE public.team_invites ENABLE ROW LEVEL SECURITY;

-- Create team_invites policies if they don't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'team_invites' AND policyname = 'Users can view their own invites'
  ) THEN
    CREATE POLICY "Users can view their own invites" ON public.team_invites
      FOR SELECT USING (auth.uid() = invited_by);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'team_invites' AND policyname = 'Users can create their own invites'
  ) THEN
    CREATE POLICY "Users can create their own invites" ON public.team_invites
      FOR INSERT WITH CHECK (auth.uid() = invited_by);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'team_invites' AND policyname = 'Users can update their own invites'
  ) THEN
    CREATE POLICY "Users can update their own invites" ON public.team_invites
      FOR UPDATE USING (auth.uid() = invited_by);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'team_invites' AND policyname = 'Users can delete their own invites'
  ) THEN
    CREATE POLICY "Users can delete their own invites" ON public.team_invites
      FOR DELETE USING (auth.uid() = invited_by);
  END IF;
END
$$;

-- Create cameras table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.cameras (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name text NOT NULL,
  serial_number text,
  notes text,
  created_at timestamp with time zone DEFAULT now()
);

-- Enable RLS on cameras if not already enabled
ALTER TABLE public.cameras ENABLE ROW LEVEL SECURITY;

-- Create cameras policies if they don't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'cameras' AND policyname = 'Users can view their own cameras'
  ) THEN
    CREATE POLICY "Users can view their own cameras" ON public.cameras
      FOR SELECT USING (auth.uid() = user_id);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'cameras' AND policyname = 'Users can create their own cameras'
  ) THEN
    CREATE POLICY "Users can create their own cameras" ON public.cameras
      FOR INSERT WITH CHECK (auth.uid() = user_id);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'cameras' AND policyname = 'Users can update their own cameras'
  ) THEN
    CREATE POLICY "Users can update their own cameras" ON public.cameras
      FOR UPDATE USING (auth.uid() = user_id);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'cameras' AND policyname = 'Users can delete their own cameras'
  ) THEN
    CREATE POLICY "Users can delete their own cameras" ON public.cameras
      FOR DELETE USING (auth.uid() = user_id);
  END IF;
END
$$;

-- Create lenses table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.lenses (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name text NOT NULL,
  focal_length text,
  aperture text,
  notes text,
  created_at timestamp with time zone DEFAULT now()
);

-- Enable RLS on lenses if not already enabled
ALTER TABLE public.lenses ENABLE ROW LEVEL SECURITY;

-- Create lenses policies if they don't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'lenses' AND policyname = 'Users can view their own lenses'
  ) THEN
    CREATE POLICY "Users can view their own lenses" ON public.lenses
      FOR SELECT USING (auth.uid() = user_id);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'lenses' AND policyname = 'Users can create their own lenses'
  ) THEN
    CREATE POLICY "Users can create their own lenses" ON public.lenses
      FOR INSERT WITH CHECK (auth.uid() = user_id);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'lenses' AND policyname = 'Users can update their own lenses'
  ) THEN
    CREATE POLICY "Users can update their own lenses" ON public.lenses
      FOR UPDATE USING (auth.uid() = user_id);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'lenses' AND policyname = 'Users can delete their own lenses'
  ) THEN
    CREATE POLICY "Users can delete their own lenses" ON public.lenses
      FOR DELETE USING (auth.uid() = user_id);
  END IF;
END
$$;

-- Remove duplicate team members
DO $$
DECLARE
  duplicate_record RECORD;
BEGIN
  -- Find duplicates based on user_id and email
  FOR duplicate_record IN (
    SELECT user_id, email, array_agg(id) as ids
    FROM public.team_members
    GROUP BY user_id, email
    HAVING COUNT(*) > 1
  ) LOOP
    -- Keep the first record (array_agg sorts by id), delete the rest
    DELETE FROM public.team_members
    WHERE id = ANY(duplicate_record.ids[2:]);
  END LOOP;
END
$$;