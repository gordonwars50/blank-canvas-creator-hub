import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Camera, Lens } from '@/types/gear';
import { useToast } from '@/hooks/use-toast';

export const useGearManagement = () => {
  const [cameras, setCameras] = useState<Camera[]>([]);
  const [lenses, setLenses] = useState<Lens[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  // Load gear from Supabase
  useEffect(() => {
    const fetchGear = async () => {
      if (!user) {
        setCameras([]);
        setLenses([]);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        
        // Fetch cameras
        const { data: camerasData, error: camerasError } = await supabase
          .from('cameras')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });

        if (camerasError) {
          console.error('Error fetching cameras:', camerasError);
          toast({
            title: 'Error',
            description: 'Failed to load cameras',
            variant: 'destructive',
          });
        } else {
          setCameras(camerasData || []);
        }
        
        // Fetch lenses
        const { data: lensesData, error: lensesError } = await supabase
          .from('lenses')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });

        if (lensesError) {
          console.error('Error fetching lenses:', lensesError);
          toast({
            title: 'Error',
            description: 'Failed to load lenses',
            variant: 'destructive',
          });
        } else {
          setLenses(lensesData || []);
        }
      } catch (error) {
        console.error('Error in fetchGear:', error);
        toast({
          title: 'Error',
          description: 'Failed to load gear',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchGear();
  }, [user, toast]);

  // Add a new camera
  const addCamera = async (cameraData: Omit<Camera, 'id' | 'user_id' | 'created_at'>): Promise<Camera | null> => {
    if (!user) {
      toast({
        title: 'Error',
        description: 'You must be logged in to add cameras',
        variant: 'destructive',
      });
      return null;
    }

    try {
      const newCamera = {
        user_id: user.id,
        ...cameraData
      };

      const { data, error } = await supabase
        .from('cameras')
        .insert(newCamera)
        .select()
        .single();

      if (error) {
        console.error('Error adding camera:', error);
        toast({
          title: 'Error',
          description: 'Failed to add camera',
          variant: 'destructive',
        });
        return null;
      }

      setCameras(prev => [data, ...prev]);
      return data;
    } catch (error) {
      console.error('Error in addCamera:', error);
      toast({
        title: 'Error',
        description: 'Failed to add camera',
        variant: 'destructive',
      });
      return null;
    }
  };

  // Update an existing camera
  const updateCamera = async (id: string, updates: Partial<Camera>): Promise<Camera | null> => {
    if (!user) {
      toast({
        title: 'Error',
        description: 'You must be logged in to update cameras',
        variant: 'destructive',
      });
      return null;
    }

    try {
      const { data, error } = await supabase
        .from('cameras')
        .update(updates)
        .eq('id', id)
        .eq('user_id', user.id)
        .select()
        .single();

      if (error) {
        console.error('Error updating camera:', error);
        toast({
          title: 'Error',
          description: 'Failed to update camera',
          variant: 'destructive',
        });
        return null;
      }

      setCameras(prev => prev.map(camera => 
        camera.id === id ? data : camera
      ));
      
      return data;
    } catch (error) {
      console.error('Error in updateCamera:', error);
      toast({
        title: 'Error',
        description: 'Failed to update camera',
        variant: 'destructive',
      });
      return null;
    }
  };

  // Remove a camera
  const removeCamera = async (id: string): Promise<boolean> => {
    if (!user) {
      toast({
        title: 'Error',
        description: 'You must be logged in to remove cameras',
        variant: 'destructive',
      });
      return false;
    }

    try {
      const { error } = await supabase
        .from('cameras')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id);

      if (error) {
        console.error('Error removing camera:', error);
        toast({
          title: 'Error',
          description: 'Failed to remove camera',
          variant: 'destructive',
        });
        return false;
      }

      setCameras(prev => prev.filter(camera => camera.id !== id));
      return true;
    } catch (error) {
      console.error('Error in removeCamera:', error);
      toast({
        title: 'Error',
        description: 'Failed to remove camera',
        variant: 'destructive',
      });
      return false;
    }
  };

  // Add a new lens
  const addLens = async (lensData: Omit<Lens, 'id' | 'user_id' | 'created_at'>): Promise<Lens | null> => {
    if (!user) {
      toast({
        title: 'Error',
        description: 'You must be logged in to add lenses',
        variant: 'destructive',
      });
      return null;
    }

    try {
      const newLens = {
        user_id: user.id,
        ...lensData
      };

      const { data, error } = await supabase
        .from('lenses')
        .insert(newLens)
        .select()
        .single();

      if (error) {
        console.error('Error adding lens:', error);
        toast({
          title: 'Error',
          description: 'Failed to add lens',
          variant: 'destructive',
        });
        return null;
      }

      setLenses(prev => [data, ...prev]);
      return data;
    } catch (error) {
      console.error('Error in addLens:', error);
      toast({
        title: 'Error',
        description: 'Failed to add lens',
        variant: 'destructive',
      });
      return null;
    }
  };

  // Update an existing lens
  const updateLens = async (id: string, updates: Partial<Lens>): Promise<Lens | null> => {
    if (!user) {
      toast({
        title: 'Error',
        description: 'You must be logged in to update lenses',
        variant: 'destructive',
      });
      return null;
    }

    try {
      const { data, error } = await supabase
        .from('lenses')
        .update(updates)
        .eq('id', id)
        .eq('user_id', user.id)
        .select()
        .single();

      if (error) {
        console.error('Error updating lens:', error);
        toast({
          title: 'Error',
          description: 'Failed to update lens',
          variant: 'destructive',
        });
        return null;
      }

      setLenses(prev => prev.map(lens => 
        lens.id === id ? data : lens
      ));
      
      return data;
    } catch (error) {
      console.error('Error in updateLens:', error);
      toast({
        title: 'Error',
        description: 'Failed to update lens',
        variant: 'destructive',
      });
      return null;
    }
  };

  // Remove a lens
  const removeLens = async (id: string): Promise<boolean> => {
    if (!user) {
      toast({
        title: 'Error',
        description: 'You must be logged in to remove lenses',
        variant: 'destructive',
      });
      return false;
    }

    try {
      const { error } = await supabase
        .from('lenses')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id);

      if (error) {
        console.error('Error removing lens:', error);
        toast({
          title: 'Error',
          description: 'Failed to remove lens',
          variant: 'destructive',
        });
        return false;
      }

      setLenses(prev => prev.filter(lens => lens.id !== id));
      return true;
    } catch (error) {
      console.error('Error in removeLens:', error);
      toast({
        title: 'Error',
        description: 'Failed to remove lens',
        variant: 'destructive',
      });
      return false;
    }
  };

  return {
    cameras,
    lenses,
    loading,
    addCamera,
    updateCamera,
    removeCamera,
    addLens,
    updateLens,
    removeLens
  };
};
