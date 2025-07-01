export interface Profile {
  id: string;
  full_name: string | null;
  email: string | null;
  phone: string | null;
  location: string | null;
  bio: string | null;
  avatar_url: string | null;
  created_at: string | null;
  updated_at: string | null;
}

export interface ProfileFormData {
  full_name: string;
  email: string;
  phone: string;
  location: string;
  bio: string;
  avatar_url?: string;
}