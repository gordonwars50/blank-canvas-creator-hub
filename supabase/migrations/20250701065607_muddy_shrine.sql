-- Create team_members table
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

ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;

-- Team members policies
CREATE POLICY "Users can view their own team members" ON public.team_members
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own team members" ON public.team_members
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own team members" ON public.team_members
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own team members" ON public.team_members
  FOR DELETE USING (auth.uid() = user_id);

-- Create team_invites table
CREATE TABLE IF NOT EXISTS public.team_invites (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  email text NOT NULL,
  role text NOT NULL,
  invited_by uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  invited_at timestamp with time zone DEFAULT now(),
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'expired'))
);

ALTER TABLE public.team_invites ENABLE ROW LEVEL SECURITY;

-- Team invites policies
CREATE POLICY "Users can view their own invites" ON public.team_invites
  FOR SELECT USING (auth.uid() = invited_by);

CREATE POLICY "Users can create their own invites" ON public.team_invites
  FOR INSERT WITH CHECK (auth.uid() = invited_by);

CREATE POLICY "Users can update their own invites" ON public.team_invites
  FOR UPDATE USING (auth.uid() = invited_by);

CREATE POLICY "Users can delete their own invites" ON public.team_invites
  FOR DELETE USING (auth.uid() = invited_by);

-- Create cameras table
CREATE TABLE IF NOT EXISTS public.cameras (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name text NOT NULL,
  serial_number text,
  notes text,
  created_at timestamp with time zone DEFAULT now()
);

ALTER TABLE public.cameras ENABLE ROW LEVEL SECURITY;

-- Cameras policies
CREATE POLICY "Users can view their own cameras" ON public.cameras
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own cameras" ON public.cameras
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own cameras" ON public.cameras
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own cameras" ON public.cameras
  FOR DELETE USING (auth.uid() = user_id);

-- Create lenses table
CREATE TABLE IF NOT EXISTS public.lenses (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name text NOT NULL,
  focal_length text,
  aperture text,
  notes text,
  created_at timestamp with time zone DEFAULT now()
);

ALTER TABLE public.lenses ENABLE ROW LEVEL SECURITY;

-- Lenses policies
CREATE POLICY "Users can view their own lenses" ON public.lenses
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own lenses" ON public.lenses
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own lenses" ON public.lenses
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own lenses" ON public.lenses
  FOR DELETE USING (auth.uid() = user_id);