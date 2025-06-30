
import React, { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { GlowCard } from '@/components/ui/spotlight-card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Search, UserPlus, Camera, Zap, Plus, Edit2, Trash2 } from 'lucide-react';
import { useTeamManagement } from '@/hooks/useTeamManagement';
import TeamMemberList from '@/components/team/TeamMemberList';
import AddMemberModal from '@/components/team/AddMemberModal';

const TeamPage: React.FC = () => {
  const { members, invites, loading, canManageTeam } = useTeamManagement();
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddMember, setShowAddMember] = useState(false);

  // Gear Management state
  const [cameras, setCameras] = useState<string[]>(['Canon EOS R5', 'Sony A7 III']);
  const [lenses, setLenses] = useState<string[]>(['24-70mm f/2.8', '85mm f/1.4', '16-35mm f/2.8']);
  const [newCamera, setNewCamera] = useState('');
  const [newLens, setNewLens] = useState('');
  const [editingCamera, setEditingCamera] = useState<{ index: number, value: string } | null>(null);
  const [editingLens, setEditingLens] = useState<{ index: number, value: string } | null>(null);

  // Filter members based on search term
  const filteredMembers = members.filter(member =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Gear Management functions
  const addCamera = () => {
    if (newCamera.trim()) {
      setCameras([...cameras, newCamera.trim()]);
      setNewCamera('');
    }
  };

  const addLens = () => {
    if (newLens.trim()) {
      setLenses([...lenses, newLens.trim()]);
      setNewLens('');
    }
  };

  const removeCamera = (index: number) => {
    setCameras(cameras.filter((_, i) => i !== index));
  };

  const removeLens = (index: number) => {
    setLenses(lenses.filter((_, i) => i !== index));
  };

  const startEditCamera = (index: number) => {
    setEditingCamera({ index, value: cameras[index] });
  };

  const startEditLens = (index: number) => {
    setEditingLens({ index, value: lenses[index] });
  };

  const saveEditCamera = () => {
    if (editingCamera && editingCamera.value.trim()) {
      const updatedCameras = [...cameras];
      updatedCameras[editingCamera.index] = editingCamera.value.trim();
      setCameras(updatedCameras);
      setEditingCamera(null);
    }
  };

  const saveEditLens = () => {
    if (editingLens && editingLens.value.trim()) {
      const updatedLenses = [...lenses];
      updatedLenses[editingLens.index] = editingLens.value.trim();
      setLenses(updatedLenses);
      setEditingLens(null);
    }
  };

  const cancelEditCamera = () => {
    setEditingCamera(null);
  };

  const cancelEditLens = () => {
    setEditingLens(null);
  };

  if (loading) {
    return (
      <DashboardLayout title="Team / Gear Management" hideTopBarActions={true}>
        <div className="space-y-6">
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
            <div className="animate-pulse">
              <div className="h-4 bg-gray-700 rounded w-1/4 mb-4"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-700 rounded"></div>
                <div className="h-4 bg-gray-700 rounded w-5/6"></div>
              </div>
            </div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="Team / Gear Management" hideTopBarActions={true}>
      <div className="space-y-6">
        {/* Description Section */}
        <div className="pb-4">
          <p className="text-gray-400 text-lg">
            Manage your team members, roles, project assignments, and production equipment
          </p>
        </div>

        {/* Search Section */}
        <div className="flex flex-col md:flex-row gap-4 p-4 bg-gray-900/50 border border-gray-800 rounded-lg">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search by name, email, or role..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-gray-800 border-gray-600 text-white placeholder-gray-400 pl-10"
            />
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-gray-400 text-sm">Showing:</span>
            <Badge variant="outline" className="border-gray-600 text-gray-300">
              {filteredMembers.length} of {members.length} members
            </Badge>
          </div>
        </div>

        {/* Pending Invites */}
        {invites.length > 0 && canManageTeam() && (
          <GlowCard glowColor="orange" customSize className="w-full p-6 bg-gray-900/50">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                <UserPlus className="w-5 h-5 text-orange-400" />
                Pending Invitations
                <Badge variant="outline" className="border-orange-500 text-orange-400">
                  {invites.filter(i => i.status === 'pending').length}
                </Badge>
              </h3>
              
              <div className="space-y-2">
                {invites
                  .filter(invite => invite.status === 'pending')
                  .map(invite => (
                    <div key={invite.id} className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                      <div>
                        <span className="text-white">{invite.email}</span>
                        <Badge className="ml-2 bg-orange-500/20 text-orange-400 text-xs">
                          {invite.role}
                        </Badge>
                      </div>
                      <div className="text-sm text-gray-400">
                        Invited {new Date(invite.invitedAt).toLocaleDateString()}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </GlowCard>
        )}

        {/* Team Members List */}
        <TeamMemberList 
          members={filteredMembers} 
          onAddMember={() => setShowAddMember(true)}
          canManageTeam={canManageTeam()}
        />

        {/* Gear Management Section */}
        <div className="space-y-6">
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
                <div className="flex gap-2">
                  <Input
                    placeholder="Add a new camera model..."
                    value={newCamera}
                    onChange={(e) => setNewCamera(e.target.value)}
                    className="bg-gray-800 border-gray-600 text-white placeholder-gray-400"
                    onKeyPress={(e) => e.key === 'Enter' && addCamera()}
                  />
                  <Button 
                    onClick={addCamera}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>

                {/* Camera List */}
                <div className="space-y-2">
                  {cameras.map((camera, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                      {editingCamera?.index === index ? (
                        <div className="flex items-center gap-2 flex-1">
                          <Input
                            value={editingCamera.value}
                            onChange={(e) => setEditingCamera({ ...editingCamera, value: e.target.value })}
                            className="bg-gray-700 border-gray-600 text-white"
                            onKeyPress={(e) => e.key === 'Enter' && saveEditCamera()}
                          />
                          <Button 
                            size="sm" 
                            onClick={saveEditCamera}
                            className="bg-green-600 hover:bg-green-700 text-white"
                          >
                            Save
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            onClick={cancelEditCamera}
                            className="border-gray-600 text-gray-300"
                          >
                            Cancel
                          </Button>
                        </div>
                      ) : (
                        <>
                          <span className="text-white">{camera}</span>
                          <div className="flex items-center gap-2">
                            <Button 
                              size="sm" 
                              variant="ghost" 
                              onClick={() => startEditCamera(index)}
                              className="text-gray-400 hover:text-white"
                            >
                              <Edit2 className="w-4 h-4" />
                            </Button>
                            <Button 
                              size="sm" 
                              variant="ghost" 
                              onClick={() => removeCamera(index)}
                              className="text-red-400 hover:text-red-300"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Lenses Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                  <Zap className="w-4 h-4 text-blue-400" />
                  Lenses
                </h3>
                
                {/* Add Lens Form */}
                <div className="flex gap-2">
                  <Input
                    placeholder="Add a new lens..."
                    value={newLens}
                    onChange={(e) => setNewLens(e.target.value)}
                    className="bg-gray-800 border-gray-600 text-white placeholder-gray-400"
                    onKeyPress={(e) => e.key === 'Enter' && addLens()}
                  />
                  <Button 
                    onClick={addLens}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>

                {/* Lens List */}
                <div className="space-y-2">
                  {lenses.map((lens, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                      {editingLens?.index === index ? (
                        <div className="flex items-center gap-2 flex-1">
                          <Input
                            value={editingLens.value}
                            onChange={(e) => setEditingLens({ ...editingLens, value: e.target.value })}
                            className="bg-gray-700 border-gray-600 text-white"
                            onKeyPress={(e) => e.key === 'Enter' && saveEditLens()}
                          />
                          <Button 
                            size="sm" 
                            onClick={saveEditLens}
                            className="bg-green-600 hover:bg-green-700 text-white"
                          >
                            Save
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            onClick={cancelEditLens}
                            className="border-gray-600 text-gray-300"
                          >
                            Cancel
                          </Button>
                        </div>
                      ) : (
                        <>
                          <span className="text-white">{lens}</span>
                          <div className="flex items-center gap-2">
                            <Button 
                              size="sm" 
                              variant="ghost" 
                              onClick={() => startEditLens(index)}
                              className="text-gray-400 hover:text-white"
                            >
                              <Edit2 className="w-4 h-4" />
                            </Button>
                            <Button 
                              size="sm" 
                              variant="ghost" 
                              onClick={() => removeLens(index)}
                              className="text-red-400 hover:text-red-300"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </GlowCard>
        </div>

        {/* Add Member Modal */}
        <AddMemberModal 
          isOpen={showAddMember} 
          onClose={() => setShowAddMember(false)} 
        />
      </div>
    </DashboardLayout>
  );
};

export default TeamPage;
