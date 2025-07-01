/*
  # Add INSERT policy for profiles table

  1. Security Changes
    - Add INSERT policy to allow users to create their own profile
    - This allows new users to create their initial profile entry
    
  2. Policy Details
    - Users can insert a profile record where the id matches their auth.uid()
    - This works alongside existing SELECT and UPDATE policies
*/

-- Add INSERT policy for profiles table
CREATE POLICY "Users can insert own profile"
  ON profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);