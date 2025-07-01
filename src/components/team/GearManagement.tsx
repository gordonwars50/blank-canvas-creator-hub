import React, { useState } from 'react';
import { GlowCard } from '@/components/ui/spotlight-card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Camera, Zap, Plus, Edit2, Trash2, Save, X } from 'lucide-react';
import { useGearManagement } from '@/hooks/useGearManagement';
import { Camera as CameraType, Lens } from '@/types/gear';
import { useToast } from '@/hooks/use-toast';

const GearManagement: React.FC = () => {
  const { cameras, lenses, loading, addCamera, updateCamera, removeCamera, addLens, updateLens, removeLens } = useGearManagement();
  const { toast } = useToast();

  // Camera state
  const [newCameraName, setNewCameraName] = useState('');
  const [newCameraSerial, setNewCameraSerial] = useState('');
  const [newCameraNotes, setNewCameraNotes] = useState('');
  const [editingCamera, setEditingCamera] = useState<CameraType | null>(null);

  // Lens state
  const [newLensName, setNewLensName] = useState('');
  const [newLensFocalLength, setNewLensFocalLength] = useState('');
  const [newLensAperture, setNewLensAperture] = useState('');
  const [newLensNotes, setNewLensNotes] = useState('');
  const [editingLens, setEditingLens] = useState<Lens | null>(null);

  // Loading states
  const [isAddingCamera, setIsAddingCamera] = useState(false);
  const [isAddingLens, setIsAddingLens] = useState(false);
  const [isUpdatingCamera, setIsUpdatingCamera] = useState(false);
  const [isUpdatingLens, setIsUpdatingLens] = useState(false);

  // Camera functions
  const handleAddCamera = async () => {
    if (!newCameraName.trim()) {
      toast({
        title: "Error",
        description: "Camera name is required",
        variant: "destructive",
      });
      return;
    }

    setIsAddingCamera(true);
    try {
      const camera = await addCamera({
        name: newCameraName.trim(),
        serial_number: newCameraSerial.trim() || undefined,
        notes: newCameraNotes.trim() || undefined
      });

      if (camera) {
        setNewCameraName('');
        setNewCameraSerial('');
        setNewCameraNotes('');
        toast({
          title: "Success",
          description: "Camera added successfully",
        });
      }
    } catch (error) {
      console.error('Error adding camera:', error);
    } finally {
      setIsAddingCamera(false);
    }
  };

  const handleUpdateCamera = async () => {
    if (!editingCamera || !editingCamera.name.trim()) {
      toast({
        title: "Error",
        description: "Camera name is required",
        variant: "destructive",
      });
      return;
    }

    setIsUpdatingCamera(true);
    try {
      const camera = await updateCamera(editingCamera.id, {
        name: editingCamera.name.trim(),
        serial_number: editingCamera.serial_number?.trim() || undefined,
        notes: editingCamera.notes?.trim() || undefined
      });

      if (camera) {
        setEditingCamera(null);
        toast({
          title: "Success",
          description: "Camera updated successfully",
        });
      }
    } catch (error) {
      console.error('Error updating camera:', error);
    } finally {
      setIsUpdatingCamera(false);
    }
  };

  const handleRemoveCamera = async (id: string) => {
    if (confirm('Are you sure you want to remove this camera?')) {
      const success = await removeCamera(id);
      if (success) {
        toast({
          title: "Success",
          description: "Camera removed successfully",
        });
      }
    }
  };

  // Lens functions
  const handleAddLens = async () => {
    if (!newLensName.trim()) {
      toast({
        title: "Error",
        description: "Lens name is required",
        variant: "destructive",
      });
      return;
    }

    setIsAddingLens(true);
    try {
      const lens = await addLens({
        name: newLensName.trim(),
        focal_length: newLensFocalLength.trim() || undefined,
        aperture: newLensAperture.trim() || undefined,
        notes: newLensNotes.trim() || undefined
      });

      if (lens) {
        setNewLensName('');
        setNewLensFocalLength('');
        setNewLensAperture('');
        setNewLensNotes('');
        toast({
          title: "Success",
          description: "Lens added successfully",
        });
      }
    } catch (error) {
      console.error('Error adding lens:', error);
    } finally {
      setIsAddingLens(false);
    }
  };

  const handleUpdateLens = async () => {
    if (!editingLens || !editingLens.name.trim()) {
      toast({
        title: "Error",
        description: "Lens name is required",
        variant: "destructive",
      });
      return;
    }

    setIsUpdatingLens(true);
    try {
      const lens = await updateLens(editingLens.id, {
        name: editingLens.name.trim(),
        focal_length: editingLens.focal_length?.trim() || undefined,
        aperture: editingLens.aperture?.trim() || undefined,
        notes: editingLens.notes?.trim() || undefined
      });

      if (lens) {
        setEditingLens(null);
        toast({
          title: "Success",
          description: "Lens updated successfully",
        });
      }
    } catch (error) {
      console.error('Error updating lens:', error);
    } finally {
      setIsUpdatingLens(false);
    }
  };

  const handleRemoveLens = async (id: string) => {
    if (confirm('Are you sure you want to remove this lens?')) {
      const success = await removeLens(id);
      if (success) {
        toast({
          title: "Success",
          description: "Lens removed successfully",
        });
      }
    }
  };

  if (loading) {
    return (
      <GlowCard glowColor="blue" customSize className="w-full p-6 bg-gray-900/50">
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <Camera className="w-5 h-5 text-blue-400" />
            <h2 className="text-xl font-semibold text-white">Gear Management</h2>
          </div>
          <div className="flex items-center justify-center h-40">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        </div>
      </GlowCard>
    );
  }

  return (
    <GlowCard glowColor="blue" customSize className="w-full p-6 bg-gray-900/50">
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <Camera className="w-5 h-5 text-blue-400" />
          <h2 className="text-xl font-semibold text-white">Gear Management</h2>
        </div>

        {/* Camera Models Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white flex items-center gap-2">
            <Camera className="w-4 h-4 text-blue-400" />
            Camera Models
          </h3>
          
          {/* Add Camera Form */}
          {!editingCamera && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="md:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-3">
                <Input
                  placeholder="Camera name"
                  value={newCameraName}
                  onChange={(e) => setNewCameraName(e.target.value)}
                  className="bg-gray-800 border-gray-600 text-white placeholder-gray-400"
                />
                <Input
                  placeholder="Serial number (optional)"
                  value={newCameraSerial}
                  onChange={(e) => setNewCameraSerial(e.target.value)}
                  className="bg-gray-800 border-gray-600 text-white placeholder-gray-400"
                />
                <div className="flex gap-2">
                  <Input
                    placeholder="Notes (optional)"
                    value={newCameraNotes}
                    onChange={(e) => setNewCameraNotes(e.target.value)}
                    className="bg-gray-800 border-gray-600 text-white placeholder-gray-400 flex-1"
                  />
                  <Button 
                    onClick={handleAddCamera}
                    disabled={isAddingCamera || !newCameraName.trim()}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    {isAddingCamera ? (
                      <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div>
                    ) : (
                      <Plus className="w-4 h-4" />
                    )}
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Edit Camera Form */}
          {editingCamera && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 bg-gray-800/50 p-4 rounded-lg border border-gray-700">
              <div className="md:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-3">
                <Input
                  placeholder="Camera name"
                  value={editingCamera.name}
                  onChange={(e) => setEditingCamera({...editingCamera, name: e.target.value})}
                  className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                />
                <Input
                  placeholder="Serial number (optional)"
                  value={editingCamera.serial_number || ''}
                  onChange={(e) => setEditingCamera({...editingCamera, serial_number: e.target.value})}
                  className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                />
                <Input
                  placeholder="Notes (optional)"
                  value={editingCamera.notes || ''}
                  onChange={(e) => setEditingCamera({...editingCamera, notes: e.target.value})}
                  className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                />
              </div>
              <div className="md:col-span-3 flex justify-end gap-2">
                <Button 
                  variant="outline" 
                  onClick={() => setEditingCamera(null)}
                  className="border-gray-600 text-gray-300 hover:bg-gray-700"
                >
                  <X className="w-4 h-4 mr-2" />
                  Cancel
                </Button>
                <Button 
                  onClick={handleUpdateCamera}
                  disabled={isUpdatingCamera || !editingCamera.name.trim()}
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  {isUpdatingCamera ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                  ) : (
                    <Save className="w-4 h-4 mr-2" />
                  )}
                  Save Changes
                </Button>
              </div>
            </div>
          )}

          {/* Camera List */}
          <div className="space-y-2 mt-4">
            {cameras.length === 0 ? (
              <div className="text-center py-8 bg-gray-800/30 rounded-lg border border-gray-700">
                <Camera className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                <p className="text-gray-400">No cameras added yet</p>
                <p className="text-sm text-gray-500 mt-1">Add your first camera above</p>
              </div>
            ) : (
              cameras.map((camera) => (
                <div key={camera.id} className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <Camera className="w-4 h-4 text-blue-400" />
                      <h4 className="text-white font-medium">{camera.name}</h4>
                    </div>
                    {camera.serial_number && (
                      <p className="text-gray-400 text-sm mt-1 ml-6">S/N: {camera.serial_number}</p>
                    )}
                    {camera.notes && (
                      <p className="text-gray-400 text-sm mt-1 ml-6">{camera.notes}</p>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      onClick={() => setEditingCamera(camera)}
                      className="text-gray-400 hover:text-white hover:bg-gray-700"
                      disabled={!!editingCamera}
                    >
                      <Edit2 className="w-4 h-4" />
                    </Button>
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      onClick={() => handleRemoveCamera(camera.id)}
                      className="text-red-400 hover:text-red-300 hover:bg-red-900/20"
                      disabled={!!editingCamera}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Lenses Section */}
        <div className="space-y-4 mt-8">
          <h3 className="text-lg font-semibold text-white flex items-center gap-2">
            <Zap className="w-4 h-4 text-blue-400" />
            Lenses
          </h3>
          
          {/* Add Lens Form */}
          {!editingLens && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
              <Input
                placeholder="Lens name"
                value={newLensName}
                onChange={(e) => setNewLensName(e.target.value)}
                className="bg-gray-800 border-gray-600 text-white placeholder-gray-400"
              />
              <Input
                placeholder="Focal length (optional)"
                value={newLensFocalLength}
                onChange={(e) => setNewLensFocalLength(e.target.value)}
                className="bg-gray-800 border-gray-600 text-white placeholder-gray-400"
              />
              <Input
                placeholder="Aperture (optional)"
                value={newLensAperture}
                onChange={(e) => setNewLensAperture(e.target.value)}
                className="bg-gray-800 border-gray-600 text-white placeholder-gray-400"
              />
              <div className="flex gap-2">
                <Input
                  placeholder="Notes (optional)"
                  value={newLensNotes}
                  onChange={(e) => setNewLensNotes(e.target.value)}
                  className="bg-gray-800 border-gray-600 text-white placeholder-gray-400 flex-1"
                />
                <Button 
                  onClick={handleAddLens}
                  disabled={isAddingLens || !newLensName.trim()}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  {isAddingLens ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div>
                  ) : (
                    <Plus className="w-4 h-4" />
                  )}
                </Button>
              </div>
            </div>
          )}

          {/* Edit Lens Form */}
          {editingLens && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3 bg-gray-800/50 p-4 rounded-lg border border-gray-700">
              <Input
                placeholder="Lens name"
                value={editingLens.name}
                onChange={(e) => setEditingLens({...editingLens, name: e.target.value})}
                className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
              />
              <Input
                placeholder="Focal length (optional)"
                value={editingLens.focal_length || ''}
                onChange={(e) => setEditingLens({...editingLens, focal_length: e.target.value})}
                className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
              />
              <Input
                placeholder="Aperture (optional)"
                value={editingLens.aperture || ''}
                onChange={(e) => setEditingLens({...editingLens, aperture: e.target.value})}
                className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
              />
              <Input
                placeholder="Notes (optional)"
                value={editingLens.notes || ''}
                onChange={(e) => setEditingLens({...editingLens, notes: e.target.value})}
                className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
              />
              <div className="md:col-span-4 flex justify-end gap-2 mt-2">
                <Button 
                  variant="outline" 
                  onClick={() => setEditingLens(null)}
                  className="border-gray-600 text-gray-300 hover:bg-gray-700"
                >
                  <X className="w-4 h-4 mr-2" />
                  Cancel
                </Button>
                <Button 
                  onClick={handleUpdateLens}
                  disabled={isUpdatingLens || !editingLens.name.trim()}
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  {isUpdatingLens ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                  ) : (
                    <Save className="w-4 h-4 mr-2" />
                  )}
                  Save Changes
                </Button>
              </div>
            </div>
          )}

          {/* Lens List */}
          <div className="space-y-2 mt-4">
            {lenses.length === 0 ? (
              <div className="text-center py-8 bg-gray-800/30 rounded-lg border border-gray-700">
                <Zap className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                <p className="text-gray-400">No lenses added yet</p>
                <p className="text-sm text-gray-500 mt-1">Add your first lens above</p>
              </div>
            ) : (
              lenses.map((lens) => (
                <div key={lens.id} className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <Zap className="w-4 h-4 text-blue-400" />
                      <h4 className="text-white font-medium">{lens.name}</h4>
                    </div>
                    <div className="flex flex-wrap gap-4 text-gray-400 text-sm mt-1 ml-6">
                      {lens.focal_length && <span>Focal Length: {lens.focal_length}</span>}
                      {lens.aperture && <span>Aperture: f/{lens.aperture}</span>}
                    </div>
                    {lens.notes && (
                      <p className="text-gray-400 text-sm mt-1 ml-6">{lens.notes}</p>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      onClick={() => setEditingLens(lens)}
                      className="text-gray-400 hover:text-white hover:bg-gray-700"
                      disabled={!!editingLens}
                    >
                      <Edit2 className="w-4 h-4" />
                    </Button>
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      onClick={() => handleRemoveLens(lens.id)}
                      className="text-red-400 hover:text-red-300 hover:bg-red-900/20"
                      disabled={!!editingLens}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </GlowCard>
  );
};

export default GearManagement;