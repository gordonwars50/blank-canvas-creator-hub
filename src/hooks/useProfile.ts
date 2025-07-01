
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Profile, ProfileFormData } from '@/types/profile';
import { useToast } from '@/hooks/use-toast';

export const useProfile = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) {
        setProfile(null);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .maybeSingle();

        if (error) {
          console.error('Error fetching profile:', error);
          return;
        }

        if (!data) {
          const newProfile = {
            id: user.id,
            email: user.email,
            full_name: user.user_metadata?.full_name || '',
            phone: null,
            location: null,
            bio: null,
            avatar_url: null,
          };

          const { data: createdProfile, error: createError } = await supabase
            .from('profiles')
            .insert(newProfile)
            .select()
            .single();

          if (createError) {
            console.error('Error creating profile:', createError);
            return;
          }

          setProfile(createdProfile);
        } else {
          setProfile(data);
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user]);

  const updateProfile = async (formData: ProfileFormData) => {
    if (!user) {
      toast({
        title: "Error",
        description: "You must be logged in to update your profile",
        variant: "destructive",
      });
      return { success: false };
    }

    try {
      setUpdating(true);

      const updates = {
        id: user.id,
        ...formData,
        updated_at: new Date().toISOString(),
      };

      const { error } = await supabase
        .from('profiles')
        .upsert(updates);

      if (error) {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
        return { success: false };
      }

      const { data: updatedProfile, error: fetchError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (fetchError) {
        console.error('Error fetching updated profile:', fetchError);
      } else {
        setProfile(updatedProfile);
      }

      toast({
        title: "Profile Updated",
        description: "Your profile has been updated successfully",
      });

      return { success: true };
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
      return { success: false };
    } finally {
      setUpdating(false);
    }
  };

  return {
    profile,
    loading,
    updating,
    updateProfile,
  };
};
