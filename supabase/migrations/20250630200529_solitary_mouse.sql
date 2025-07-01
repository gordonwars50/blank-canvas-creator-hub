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