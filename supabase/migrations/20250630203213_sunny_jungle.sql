/*
  # Create missing database tables

  1. New Tables
    - `profiles` - User profile information
    - `projects` - Video projects with metadata
    - `scenes` - Project scenes with tags and notes
    - `shots` - Individual shots within scenes
    - `team_assignments` - Team member assignments to projects
    - `storyboard_files` - File attachments for projects

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to manage their own data
    - Add policies for project-related data access control

  3. Functions
    - Add trigger functions for updating timestamps
    - Add function to handle new user profile creation
*/

-- Create profiles table
CREATE TABLE IF NOT EXISTS public.profiles (
  id uuid REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  full_name text,
  email text,
  phone text,
  location text,
  bio text,
  avatar_url text,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Profiles policies - check if they exist first
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'profiles' AND policyname = 'Users can view own profile'
  ) THEN
    CREATE POLICY "Users can view own profile" ON public.profiles
      FOR SELECT USING (auth.uid() = id);
  END IF;
  
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'profiles' AND policyname = 'Users can update own profile'
  ) THEN
    CREATE POLICY "Users can update own profile" ON public.profiles
      FOR UPDATE USING (auth.uid() = id);
  END IF;
  
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'profiles' AND policyname = 'Users can insert own profile'
  ) THEN
    CREATE POLICY "Users can insert own profile" ON public.profiles
      FOR INSERT WITH CHECK (auth.uid() = id);
  END IF;
END $$;

-- Create projects table
CREATE TABLE IF NOT EXISTS public.projects (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title text NOT NULL,
  state text DEFAULT 'Planning' NOT NULL,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  scheduled_date timestamp with time zone,
  ideas text,
  script text,
  metadata jsonb DEFAULT '{}' NOT NULL,
  scheduled_time text,
  upload_now boolean DEFAULT false,
  selected_mode text DEFAULT 'schedule'
);

-- Add constraint for valid states
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints 
    WHERE constraint_name = 'valid_state' AND table_name = 'projects'
  ) THEN
    ALTER TABLE public.projects ADD CONSTRAINT valid_state 
    CHECK (state = ANY (ARRAY['Planning'::text, 'Production'::text, 'Scheduled'::text, 'Uploaded'::text]));
  END IF;
END $$;

ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

-- Projects policies - check if they exist first
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'projects' AND policyname = 'Users can view their own projects'
  ) THEN
    CREATE POLICY "Users can view their own projects" ON public.projects
      FOR SELECT USING (auth.uid() = user_id);
  END IF;
  
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'projects' AND policyname = 'Users can update their own projects'
  ) THEN
    CREATE POLICY "Users can update their own projects" ON public.projects
      FOR UPDATE USING (auth.uid() = user_id);
  END IF;
  
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'projects' AND policyname = 'Users can create their own projects'
  ) THEN
    CREATE POLICY "Users can create their own projects" ON public.projects
      FOR INSERT WITH CHECK (auth.uid() = user_id);
  END IF;
  
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'projects' AND policyname = 'Users can delete their own projects'
  ) THEN
    CREATE POLICY "Users can delete their own projects" ON public.projects
      FOR DELETE USING (auth.uid() = user_id);
  END IF;
END $$;

-- Create scenes table
CREATE TABLE IF NOT EXISTS public.scenes (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id uuid REFERENCES public.projects(id) ON DELETE CASCADE NOT NULL,
  name text NOT NULL,
  tags text[] DEFAULT '{}',
  notes text,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

ALTER TABLE public.scenes ENABLE ROW LEVEL SECURITY;

-- Scenes policies - check if they exist first
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'scenes' AND policyname = 'Users can view scenes of their own projects'
  ) THEN
    CREATE POLICY "Users can view scenes of their own projects" ON public.scenes
      FOR SELECT USING (
        EXISTS (
          SELECT 1 FROM public.projects 
          WHERE projects.id = scenes.project_id AND projects.user_id = auth.uid()
        )
      );
  END IF;
  
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'scenes' AND policyname = 'Users can update scenes of their own projects'
  ) THEN
    CREATE POLICY "Users can update scenes of their own projects" ON public.scenes
      FOR UPDATE USING (
        EXISTS (
          SELECT 1 FROM public.projects 
          WHERE projects.id = scenes.project_id AND projects.user_id = auth.uid()
        )
      );
  END IF;
  
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'scenes' AND policyname = 'Users can create scenes for their own projects'
  ) THEN
    CREATE POLICY "Users can create scenes for their own projects" ON public.scenes
      FOR INSERT WITH CHECK (
        EXISTS (
          SELECT 1 FROM public.projects 
          WHERE projects.id = scenes.project_id AND projects.user_id = auth.uid()
        )
      );
  END IF;
  
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'scenes' AND policyname = 'Users can delete scenes of their own projects'
  ) THEN
    CREATE POLICY "Users can delete scenes of their own projects" ON public.scenes
      FOR DELETE USING (
        EXISTS (
          SELECT 1 FROM public.projects 
          WHERE projects.id = scenes.project_id AND projects.user_id = auth.uid()
        )
      );
  END IF;
END $$;

-- Create shots table
CREATE TABLE IF NOT EXISTS public.shots (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  scene_id uuid REFERENCES public.scenes(id) ON DELETE CASCADE NOT NULL,
  name text NOT NULL,
  camera_id text,
  lens_id text,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

ALTER TABLE public.shots ENABLE ROW LEVEL SECURITY;

-- Shots policies - check if they exist first
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'shots' AND policyname = 'Users can view shots of their own scenes'
  ) THEN
    CREATE POLICY "Users can view shots of their own scenes" ON public.shots
      FOR SELECT USING (
        EXISTS (
          SELECT 1 FROM public.scenes 
          JOIN public.projects ON scenes.project_id = projects.id 
          WHERE scenes.id = shots.scene_id AND projects.user_id = auth.uid()
        )
      );
  END IF;
  
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'shots' AND policyname = 'Users can update shots of their own scenes'
  ) THEN
    CREATE POLICY "Users can update shots of their own scenes" ON public.shots
      FOR UPDATE USING (
        EXISTS (
          SELECT 1 FROM public.scenes 
          JOIN public.projects ON scenes.project_id = projects.id 
          WHERE scenes.id = shots.scene_id AND projects.user_id = auth.uid()
        )
      );
  END IF;
  
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'shots' AND policyname = 'Users can create shots for their own scenes'
  ) THEN
    CREATE POLICY "Users can create shots for their own scenes" ON public.shots
      FOR INSERT WITH CHECK (
        EXISTS (
          SELECT 1 FROM public.scenes 
          JOIN public.projects ON scenes.project_id = projects.id 
          WHERE scenes.id = shots.scene_id AND projects.user_id = auth.uid()
        )
      );
  END IF;
  
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'shots' AND policyname = 'Users can delete shots of their own scenes'
  ) THEN
    CREATE POLICY "Users can delete shots of their own scenes" ON public.shots
      FOR DELETE USING (
        EXISTS (
          SELECT 1 FROM public.scenes 
          JOIN public.projects ON scenes.project_id = projects.id 
          WHERE scenes.id = shots.scene_id AND projects.user_id = auth.uid()
        )
      );
  END IF;
END $$;

-- Create team_assignments table
CREATE TABLE IF NOT EXISTS public.team_assignments (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id uuid REFERENCES public.projects(id) ON DELETE CASCADE NOT NULL,
  role text NOT NULL,
  email text NOT NULL,
  created_at timestamp with time zone DEFAULT now()
);

ALTER TABLE public.team_assignments ENABLE ROW LEVEL SECURITY;

-- Team assignments policies - check if they exist first
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'team_assignments' AND policyname = 'Users can view team assignments of their own projects'
  ) THEN
    CREATE POLICY "Users can view team assignments of their own projects" ON public.team_assignments
      FOR SELECT USING (
        EXISTS (
          SELECT 1 FROM public.projects 
          WHERE projects.id = team_assignments.project_id AND projects.user_id = auth.uid()
        )
      );
  END IF;
  
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'team_assignments' AND policyname = 'Users can update team assignments of their own projects'
  ) THEN
    CREATE POLICY "Users can update team assignments of their own projects" ON public.team_assignments
      FOR UPDATE USING (
        EXISTS (
          SELECT 1 FROM public.projects 
          WHERE projects.id = team_assignments.project_id AND projects.user_id = auth.uid()
        )
      );
  END IF;
  
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'team_assignments' AND policyname = 'Users can create team assignments for their own projects'
  ) THEN
    CREATE POLICY "Users can create team assignments for their own projects" ON public.team_assignments
      FOR INSERT WITH CHECK (
        EXISTS (
          SELECT 1 FROM public.projects 
          WHERE projects.id = team_assignments.project_id AND projects.user_id = auth.uid()
        )
      );
  END IF;
  
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'team_assignments' AND policyname = 'Users can delete team assignments of their own projects'
  ) THEN
    CREATE POLICY "Users can delete team assignments of their own projects" ON public.team_assignments
      FOR DELETE USING (
        EXISTS (
          SELECT 1 FROM public.projects 
          WHERE projects.id = team_assignments.project_id AND projects.user_id = auth.uid()
        )
      );
  END IF;
END $$;

-- Create storyboard_files table
CREATE TABLE IF NOT EXISTS public.storyboard_files (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id uuid REFERENCES public.projects(id) ON DELETE CASCADE NOT NULL,
  name text NOT NULL,
  file_path text NOT NULL,
  size integer,
  type text,
  created_at timestamp with time zone DEFAULT now()
);

ALTER TABLE public.storyboard_files ENABLE ROW LEVEL SECURITY;

-- Storyboard files policies - check if they exist first
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'storyboard_files' AND policyname = 'Users can view storyboard files of their own projects'
  ) THEN
    CREATE POLICY "Users can view storyboard files of their own projects" ON public.storyboard_files
      FOR SELECT USING (
        EXISTS (
          SELECT 1 FROM public.projects 
          WHERE projects.id = storyboard_files.project_id AND projects.user_id = auth.uid()
        )
      );
  END IF;
  
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'storyboard_files' AND policyname = 'Users can update storyboard files of their own projects'
  ) THEN
    CREATE POLICY "Users can update storyboard files of their own projects" ON public.storyboard_files
      FOR UPDATE USING (
        EXISTS (
          SELECT 1 FROM public.projects 
          WHERE projects.id = storyboard_files.project_id AND projects.user_id = auth.uid()
        )
      );
  END IF;
  
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'storyboard_files' AND policyname = 'Users can create storyboard files for their own projects'
  ) THEN
    CREATE POLICY "Users can create storyboard files for their own projects" ON public.storyboard_files
      FOR INSERT WITH CHECK (
        EXISTS (
          SELECT 1 FROM public.projects 
          WHERE projects.id = storyboard_files.project_id AND projects.user_id = auth.uid()
        )
      );
  END IF;
  
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'storyboard_files' AND policyname = 'Users can delete storyboard files of their own projects'
  ) THEN
    CREATE POLICY "Users can delete storyboard files of their own projects" ON public.storyboard_files
      FOR DELETE USING (
        EXISTS (
          SELECT 1 FROM public.projects 
          WHERE projects.id = storyboard_files.project_id AND projects.user_id = auth.uid()
        )
      );
  END IF;
END $$;

-- Create trigger function for updating timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger function for profiles updated_at
CREATE OR REPLACE FUNCTION update_profiles_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger function to handle new user profile creation
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, email)
  VALUES (NEW.id, NEW.raw_user_meta_data->>'full_name', NEW.email);
  RETURN NEW;
END;
$$ language 'plpgsql' SECURITY DEFINER;

-- Add triggers for updated_at columns
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.triggers 
    WHERE trigger_name = 'update_profiles_updated_at'
  ) THEN
    CREATE TRIGGER update_profiles_updated_at
      BEFORE UPDATE ON public.profiles
      FOR EACH ROW EXECUTE FUNCTION update_profiles_updated_at();
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.triggers 
    WHERE trigger_name = 'update_projects_updated_at'
  ) THEN
    CREATE TRIGGER update_projects_updated_at
      BEFORE UPDATE ON public.projects
      FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.triggers 
    WHERE trigger_name = 'update_scenes_updated_at'
  ) THEN
    CREATE TRIGGER update_scenes_updated_at
      BEFORE UPDATE ON public.scenes
      FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.triggers 
    WHERE trigger_name = 'update_shots_updated_at'
  ) THEN
    CREATE TRIGGER update_shots_updated_at
      BEFORE UPDATE ON public.shots
      FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
  END IF;
END $$;

-- Add trigger for new user profile creation
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.triggers 
    WHERE trigger_name = 'on_auth_user_created'
  ) THEN
    CREATE TRIGGER on_auth_user_created
      AFTER INSERT ON auth.users
      FOR EACH ROW EXECUTE FUNCTION handle_new_user();
  END IF;
END $$;