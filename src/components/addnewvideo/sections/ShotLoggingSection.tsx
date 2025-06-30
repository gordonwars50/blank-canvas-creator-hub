
import React, { useState } from 'react';
import { GlowCard } from '@/components/ui/spotlight-card';
import { GlowButton } from '@/components/ui/glow-button';
import { GlowInput } from '@/components/ui/glow-input';
import { Plus, X, Camera } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface Camera {
  id: string;
  brand: string;
  model: string;
  type: 'DSLR' | 'Mirrorless' | 'Cinema';
}

interface Lens {
  id: string;
  name: string;
  mount: string;
  type: 'Prime' | 'Zoom';
  focalLength: string;
  aperture: string;
}

interface Shot {
  id: string;
  name: string;
  cameraId?: string;
  lensId?: string;
}

interface Scene {
  id: string;
  name: string;
  tags: string[];
  shots: Shot[];
}

interface ShotLoggingSectionProps {
  scenes: Scene[];
  onChange: (scenes: Scene[]) => void;
}

// TODO: Connect to user settings for camera/lens management
// Camera lineup and lenses will be populated from user's equipment settings
// This should be managed through a separate settings page/component
const cameraLineup: Camera[] = [
  { id: '1', brand: 'Canon', model: 'EOS R5', type: 'Mirrorless' },
  { id: '2', brand: 'Canon', model: 'EOS R6 Mark II', type: 'Mirrorless' },
  { id: '3', brand: 'Sony', model: 'A7 IV', type: 'Mirrorless' },
  { id: '4', brand: 'Sony', model: 'FX3', type: 'Cinema' },
  { id: '5', brand: 'Nikon', model: 'D850', type: 'DSLR' },
  { id: '6', brand: 'Blackmagic', model: 'Pocket 6K Pro', type: 'Cinema' }
];

// Standard lenses data
const standardLenses: Lens[] = [
  { id: '1', name: '24-70mm f/2.8', mount: 'Canon RF', type: 'Zoom', focalLength: '24-70mm', aperture: 'f/2.8' },
  { id: '2', name: '85mm f/1.4', mount: 'Canon RF', type: 'Prime', focalLength: '85mm', aperture: 'f/1.4' },
  { id: '3', name: '16-35mm f/2.8', mount: 'Canon RF', type: 'Zoom', focalLength: '16-35mm', aperture: 'f/2.8' },
  { id: '4', name: '24-70mm f/2.8 GM', mount: 'Sony E', type: 'Zoom', focalLength: '24-70mm', aperture: 'f/2.8' },
  { id: '5', name: '50mm f/1.2', mount: 'Sony E', type: 'Prime', focalLength: '50mm', aperture: 'f/1.2' },
  { id: '6', name: '70-200mm f/2.8', mount: 'Sony E', type: 'Zoom', focalLength: '70-200mm', aperture: 'f/2.8' },
  { id: '7', name: '24-70mm f/2.8', mount: 'Nikon F', type: 'Zoom', focalLength: '24-70mm', aperture: 'f/2.8' },
  { id: '8', name: '35mm f/1.4', mount: 'Nikon F', type: 'Prime', focalLength: '35mm', aperture: 'f/1.4' }
];

const presetTags = [
  'Talking Head',
  'Interview Style', 
  'Voiceover',
  'Screen Recording',
  'Action',
  'B-Roll'
];

const ShotLoggingSection: React.FC<ShotLoggingSectionProps> = ({ scenes, onChange }) => {
  const [editingShotId, setEditingShotId] = useState<string | null>(null);
  const [editingSceneId, setEditingSceneId] = useState<string | null>(null);
  const [selectedCameraId, setSelectedCameraId] = useState<string>('none');
  const [selectedLensId, setSelectedLensId] = useState<string>('none');

  const addScene = () => {
    const newScene: Scene = {
      id: Date.now().toString(),
      name: '',
      tags: [],
      shots: []
    };
    onChange([...scenes, newScene]);
  };

  const updateScene = (sceneId: string, updates: Partial<Scene>) => {
    const updatedScenes = scenes.map(scene =>
      scene.id === sceneId ? { ...scene, ...updates } : scene
    );
    onChange(updatedScenes);
  };

  const removeScene = (sceneId: string) => {
    onChange(scenes.filter(scene => scene.id !== sceneId));
  };

  const addShot = (sceneId: string) => {
    const newShot: Shot = {
      id: Date.now().toString(),
      name: ''
    };
    
    const updatedScenes = scenes.map(scene =>
      scene.id === sceneId 
        ? { ...scene, shots: [...scene.shots, newShot] }
        : scene
    );
    onChange(updatedScenes);
  };

  const updateShot = (sceneId: string, shotId: string, updates: Partial<Shot>) => {
    const updatedScenes = scenes.map(scene =>
      scene.id === sceneId
        ? {
            ...scene,
            shots: scene.shots.map(shot =>
              shot.id === shotId ? { ...shot, ...updates } : shot
            )
          }
        : scene
    );
    onChange(updatedScenes);
  };

  const removeShot = (sceneId: string, shotId: string) => {
    const updatedScenes = scenes.map(scene =>
      scene.id === sceneId
        ? { ...scene, shots: scene.shots.filter(shot => shot.id !== shotId) }
        : scene
    );
    onChange(updatedScenes);
  };

  const toggleTag = (sceneId: string, tag: string) => {
    const scene = scenes.find(s => s.id === sceneId);
    if (!scene) return;

    const newTags = scene.tags.includes(tag)
      ? scene.tags.filter(t => t !== tag)
      : [...scene.tags, tag];
    
    updateScene(sceneId, { tags: newTags });
  };

  const openEditShotModal = (sceneId: string, shotId: string) => {
    const scene = scenes.find(s => s.id === sceneId);
    const shot = scene?.shots.find(s => s.id === shotId);
    
    if (shot) {
      setEditingSceneId(sceneId);
      setEditingShotId(shotId);
      setSelectedCameraId(shot.cameraId || 'none');
      setSelectedLensId(shot.lensId || 'none');
    }
  };

  const closeEditShotModal = () => {
    setEditingShotId(null);
    setEditingSceneId(null);
    setSelectedCameraId('none');
    setSelectedLensId('none');
  };

  const saveEditShot = () => {
    if (editingSceneId && editingShotId) {
      updateShot(editingSceneId, editingShotId, {
        cameraId: selectedCameraId === 'none' ? undefined : selectedCameraId,
        lensId: selectedLensId === 'none' ? undefined : selectedLensId
      });
      closeEditShotModal();
    }
  };

  const getCompatibleLenses = (cameraId: string) => {
    const camera = cameraLineup.find(c => c.id === cameraId);
    if (!camera) return standardLenses;
    
    const mountMap: Record<string, string[]> = {
      'Canon': ['Canon RF', 'Canon EF'],
      'Sony': ['Sony E'],
      'Nikon': ['Nikon F', 'Nikon Z'],
      'Blackmagic': ['Canon EF', 'Sony E']
    };
    
    const compatibleMounts = mountMap[camera.brand] || [];
    return standardLenses.filter(lens => compatibleMounts.includes(lens.mount));
  };

  const getCameraLabel = (cameraId: string) => {
    const camera = cameraLineup.find(c => c.id === cameraId);
    return camera ? `${camera.brand} ${camera.model}` : '';
  };

  const getLensLabel = (lensId: string) => {
    const lens = standardLenses.find(l => l.id === lensId);
    return lens ? lens.name : '';
  };

  return (
    <GlowCard glowColor="green" customSize className="w-full p-6 mb-8">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-white">Shot Logging & Metadata</h2>
          <GlowButton
            glowColor="green"
            leftIcon={<Plus className="w-4 h-4" />}
            onClick={addScene}
            className="bg-green-600 hover:bg-green-700 rounded-lg px-4 py-2"
          >
            Add Scene
          </GlowButton>
        </div>

        {scenes.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <div className="text-4xl mb-2">🎬</div>
              <p>No scenes added yet</p>
              <p className="text-sm">Click "Add Scene" to start planning your shots</p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {scenes.map((scene) => (
              <div key={scene.id} className="bg-gray-800 rounded-lg p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <GlowInput
                    glowColor="green"
                    placeholder="Scene name"
                    value={scene.name}
                    onChange={(e) => updateScene(scene.id, { name: e.target.value })}
                    className="flex-1 mr-4"
                  />
                  <button
                    onClick={() => removeScene(scene.id)}
                    className="text-red-400 hover:text-red-300 p-2"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Tags */}
                <div className="space-y-2">
                  <p className="text-sm text-gray-300">Tags:</p>
                  <div className="flex flex-wrap gap-2">
                    {presetTags.map((tag) => (
                      <button
                        key={tag}
                        onClick={() => toggleTag(scene.id, tag)}
                        className={`px-3 py-1 rounded-full text-xs transition-colors ${
                          scene.tags.includes(tag)
                            ? 'bg-green-600 text-white'
                            : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                        }`}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Shots */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-300">Shots:</p>
                    <GlowButton
                      glowColor="green"
                      leftIcon={<Plus className="w-3 h-3" />}
                      onClick={() => addShot(scene.id)}
                      className="bg-green-600 hover:bg-green-700 rounded px-3 py-1 text-xs"
                    >
                      Add Shot
                    </GlowButton>
                  </div>

                  {scene.shots.map((shot) => (
                    <div key={shot.id} className="bg-gray-700 rounded-lg p-3 space-y-2">
                      {/* Shot Name Row */}
                      <div className="flex items-center space-x-2">
                        <GlowInput
                          glowColor="green"
                          placeholder="Shot name"
                          value={shot.name}
                          onChange={(e) => updateShot(scene.id, shot.id, { name: e.target.value })}
                          className="flex-1 h-8 text-sm"
                        />
                        <GlowButton
                          glowColor="green"
                          onClick={() => openEditShotModal(scene.id, shot.id)}
                          className="bg-green-600 hover:bg-green-700 rounded-lg px-4 py-2 h-8 text-sm"
                          leftIcon={<Camera className="w-3 h-3" />}
                        >
                          Choose Camera & Lens
                        </GlowButton>
                        <button
                          onClick={() => removeShot(scene.id, shot.id)}
                          className="text-red-400 hover:text-red-300 p-1"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Equipment Tags */}
                      {(shot.cameraId || shot.lensId) && (
                        <div className="flex flex-wrap gap-2">
                          {shot.cameraId && (
                            <div className="flex items-center gap-1 px-2 py-1 bg-blue-600/20 text-blue-400 rounded-full text-xs">
                              <Camera className="w-3 h-3" />
                              {getCameraLabel(shot.cameraId)}
                            </div>
                          )}
                          {shot.lensId && (
                            <div className="flex items-center gap-1 px-2 py-1 bg-purple-600/20 text-purple-400 rounded-full text-xs">
                              <Camera className="w-3 h-3" />
                              {getLensLabel(shot.lensId)}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Edit Shot Modal */}
      <Dialog open={editingShotId !== null} onOpenChange={closeEditShotModal}>
        <DialogContent className="sm:max-w-md bg-gray-800 border-gray-700 text-white">
          <DialogHeader>
            <DialogTitle className="text-white">Choose Camera & Lens</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            {/* Camera Selection */}
            <div className="space-y-2">
              <label className="text-sm text-gray-300 flex items-center gap-1">
                <Camera className="w-4 h-4" />
                Camera
              </label>
              <Select
                value={selectedCameraId}
                onValueChange={(value) => {
                  setSelectedCameraId(value);
                  setSelectedLensId('none'); // Reset lens when camera changes
                }}
              >
                <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                  <SelectValue placeholder="Select camera" />
                </SelectTrigger>
                <SelectContent 
                  className="bg-gray-700 border-gray-600 text-white" 
                  position="popper"
                >
                  <SelectItem value="none" className="text-white hover:bg-gray-600">
                    None
                  </SelectItem>
                  {cameraLineup && cameraLineup.map((camera) => (
                    <SelectItem 
                      key={camera.id} 
                      value={camera.id} 
                      className="text-white hover:bg-gray-600"
                    >
                      {camera.brand} {camera.model} ({camera.type})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Lens Selection */}
            <div className="space-y-2">
              <label className="text-sm text-gray-300 flex items-center gap-1">
                <Camera className="w-4 h-4" />
                Lens
              </label>
              <Select
                value={selectedLensId}
                onValueChange={setSelectedLensId}
                disabled={selectedCameraId === 'none'}
              >
                <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                  <SelectValue placeholder="Select lens" />
                </SelectTrigger>
                <SelectContent 
                  className="bg-gray-700 border-gray-600 text-white" 
                  position="popper"
                >
                  <SelectItem value="none" className="text-white hover:bg-gray-600">
                    None
                  </SelectItem>
                  {selectedCameraId !== 'none' && getCompatibleLenses(selectedCameraId).map((lens) => (
                    <SelectItem 
                      key={lens.id} 
                      value={lens.id} 
                      className="text-white hover:bg-gray-600"
                    >
                      {lens.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={closeEditShotModal}
              className="bg-white text-black border-gray-300 hover:bg-gray-100"
            >
              Cancel
            </Button>
            <Button onClick={saveEditShot} className="bg-green-600 hover:bg-green-700">
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </GlowCard>
  );
};

export default ShotLoggingSection;
