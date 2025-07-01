/*
  # Create projects table

  1. New Tables
    - `projects`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `title` (text)
      - `state` (text)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
      - `scheduled_date` (timestamptz)
      - `ideas` (text)
      - `script` (text)
      - `metadata` (jsonb)
      - `scheduled_time` (text)
      - `upload_now` (boolean)
      - `selected_mode` (text)
  2. Security
    - Enable RLS on `projects` table
    - Add policies for authenticated users to manage their own projects
*/

-- Create projects table
CREATE TABLE IF NOT EXISTS projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  state TEXT NOT NULL DEFAULT 'Planning',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  scheduled_date TIMESTAMPTZ,
  ideas TEXT,
  script TEXT,
  metadata JSONB DEFAULT '{}'::jsonb,
  scheduled_time TEXT,
  upload_now BOOLEAN DEFAULT false,
  selected_mode TEXT DEFAULT 'schedule',
  CONSTRAINT valid_state CHECK (state IN ('Planning', 'Production', 'Scheduled', 'Uploaded'))
);

-- Create scenes table for project scenes
CREATE TABLE IF NOT EXISTS scenes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  tags TEXT[] DEFAULT '{}',
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create shots table for scene shots
CREATE TABLE IF NOT EXISTS shots (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  scene_id UUID NOT NULL REFERENCES scenes(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  camera_id TEXT,
  lens_id TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create team_assignments table
CREATE TABLE IF NOT EXISTS team_assignments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  role TEXT NOT NULL,
  email TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Create storyboard_files table
CREATE TABLE IF NOT EXISTS storyboard_files (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  file_path TEXT NOT NULL,
  size INTEGER,
  type TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE scenes ENABLE ROW LEVEL SECURITY;
ALTER TABLE shots ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE storyboard_files ENABLE ROW LEVEL SECURITY;

-- Create policies for projects
CREATE POLICY "Users can view their own projects"
  ON projects
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own projects"
  ON projects
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own projects"
  ON projects
  FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own projects"
  ON projects
  FOR DELETE
  USING (auth.uid() = user_id);

-- Create policies for scenes
CREATE POLICY "Users can view scenes of their own projects"
  ON scenes
  FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM projects
    WHERE projects.id = scenes.project_id
    AND projects.user_id = auth.uid()
  ));

CREATE POLICY "Users can create scenes for their own projects"
  ON scenes
  FOR INSERT
  WITH CHECK (EXISTS (
    SELECT 1 FROM projects
    WHERE projects.id = scenes.project_id
    AND projects.user_id = auth.uid()
  ));

CREATE POLICY "Users can update scenes of their own projects"
  ON scenes
  FOR UPDATE
  USING (EXISTS (
    SELECT 1 FROM projects
    WHERE projects.id = scenes.project_id
    AND projects.user_id = auth.uid()
  ));

CREATE POLICY "Users can delete scenes of their own projects"
  ON scenes
  FOR DELETE
  USING (EXISTS (
    SELECT 1 FROM projects
    WHERE projects.id = scenes.project_id
    AND projects.user_id = auth.uid()
  ));

-- Create policies for shots
CREATE POLICY "Users can view shots of their own scenes"
  ON shots
  FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM scenes
    JOIN projects ON scenes.project_id = projects.id
    WHERE scenes.id = shots.scene_id
    AND projects.user_id = auth.uid()
  ));

CREATE POLICY "Users can create shots for their own scenes"
  ON shots
  FOR INSERT
  WITH CHECK (EXISTS (
    SELECT 1 FROM scenes
    JOIN projects ON scenes.project_id = projects.id
    WHERE scenes.id = shots.scene_id
    AND projects.user_id = auth.uid()
  ));

CREATE POLICY "Users can update shots of their own scenes"
  ON shots
  FOR UPDATE
  USING (EXISTS (
    SELECT 1 FROM scenes
    JOIN projects ON scenes.project_id = projects.id
    WHERE scenes.id = shots.scene_id
    AND projects.user_id = auth.uid()
  ));

CREATE POLICY "Users can delete shots of their own scenes"
  ON shots
  FOR DELETE
  USING (EXISTS (
    SELECT 1 FROM scenes
    JOIN projects ON scenes.project_id = projects.id
    WHERE scenes.id = shots.scene_id
    AND projects.user_id = auth.uid()
  ));

-- Create policies for team_assignments
CREATE POLICY "Users can view team assignments of their own projects"
  ON team_assignments
  FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM projects
    WHERE projects.id = team_assignments.project_id
    AND projects.user_id = auth.uid()
  ));

CREATE POLICY "Users can create team assignments for their own projects"
  ON team_assignments
  FOR INSERT
  WITH CHECK (EXISTS (
    SELECT 1 FROM projects
    WHERE projects.id = team_assignments.project_id
    AND projects.user_id = auth.uid()
  ));

CREATE POLICY "Users can update team assignments of their own projects"
  ON team_assignments
  FOR UPDATE
  USING (EXISTS (
    SELECT 1 FROM projects
    WHERE projects.id = team_assignments.project_id
    AND projects.user_id = auth.uid()
  ));

CREATE POLICY "Users can delete team assignments of their own projects"
  ON team_assignments
  FOR DELETE
  USING (EXISTS (
    SELECT 1 FROM projects
    WHERE projects.id = team_assignments.project_id
    AND projects.user_id = auth.uid()
  ));

-- Create policies for storyboard_files
CREATE POLICY "Users can view storyboard files of their own projects"
  ON storyboard_files
  FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM projects
    WHERE projects.id = storyboard_files.project_id
    AND projects.user_id = auth.uid()
  ));

CREATE POLICY "Users can create storyboard files for their own projects"
  ON storyboard_files
  FOR INSERT
  WITH CHECK (EXISTS (
    SELECT 1 FROM projects
    WHERE projects.id = storyboard_files.project_id
    AND projects.user_id = auth.uid()
  ));

CREATE POLICY "Users can update storyboard files of their own projects"
  ON storyboard_files
  FOR UPDATE
  USING (EXISTS (
    SELECT 1 FROM projects
    WHERE projects.id = storyboard_files.project_id
    AND projects.user_id = auth.uid()
  ));

CREATE POLICY "Users can delete storyboard files of their own projects"
  ON storyboard_files
  FOR DELETE
  USING (EXISTS (
    SELECT 1 FROM projects
    WHERE projects.id = storyboard_files.project_id
    AND projects.user_id = auth.uid()
  ));

-- Create trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_projects_updated_at
BEFORE UPDATE ON projects
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_scenes_updated_at
BEFORE UPDATE ON scenes
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_shots_updated_at
BEFORE UPDATE ON shots
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();