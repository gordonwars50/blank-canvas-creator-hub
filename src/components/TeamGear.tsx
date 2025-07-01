import React, { useState } from 'react';
import { Plus, User, Video, Camera, ChevronDown, ChevronUp, Edit3, Trash2 } from 'lucide-react';
import { TeamMember, Camera as CameraType, Lens } from '../types';
import Modal from './Modal';

interface TeamGearProps {
  teamMembers: TeamMember[];
  setTeamMembers: (members: TeamMember[]) => void;
  cameras: CameraType[];
  setCameras: (cameras: CameraType[]) => void;
  lenses: Lens[];
  setLenses: (lenses: Lens[]) => void;
}

export default function TeamGear({
  teamMembers,
  setTeamMembers,
  cameras,
  setCameras,
  lenses,
  setLenses,
}: TeamGearProps) {
  const [isTeamModalOpen, setIsTeamModalOpen] = useState(false);
  const [isCameraModalOpen, setIsCameraModalOpen] = useState(false);
  const [isLensModalOpen, setIsLensModalOpen] = useState(false);
  const [isGearExpanded, setIsGearExpanded] = useState(true);

  // Team member form state
  const [memberForm, setMemberForm] = useState({
    name: '',
    role: '',
    email: '',
    phone: '',
  });

  // Camera form state
  const [cameraForm, setCameraForm] = useState({
    name: '',
    serialNumber: '',
    notes: '',
  });

  // Lens form state
  const [lensForm, setLensForm] = useState({
    name: '',
    focalLength: '',
    aperture: '',
    notes: '',
  });

  const handleAddMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!memberForm.name.trim() || !memberForm.role.trim()) return;

    const newMember: TeamMember = {
      id: Date.now().toString(),
      name: memberForm.name.trim(),
      role: memberForm.role.trim(),
      email: memberForm.email.trim() || undefined,
      phone: memberForm.phone.trim() || undefined,
    };

    setTeamMembers([...teamMembers, newMember]);
    setMemberForm({ name: '', role: '', email: '', phone: '' });
    setIsTeamModalOpen(false);
  };

  const handleAddCamera = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cameraForm.name.trim()) return;

    const newCamera: CameraType = {
      id: Date.now().toString(),
      name: cameraForm.name.trim(),
      serialNumber: cameraForm.serialNumber.trim() || undefined,
      notes: cameraForm.notes.trim() || undefined,
    };

    setCameras([...cameras, newCamera]);
    setCameraForm({ name: '', serialNumber: '', notes: '' });
    setIsCameraModalOpen(false);
  };

  const handleAddLens = (e: React.FormEvent) => {
    e.preventDefault();
    if (!lensForm.name.trim()) return;

    const newLens: Lens = {
      id: Date.now().toString(),
      name: lensForm.name.trim(),
      focalLength: lensForm.focalLength.trim() || undefined,
      aperture: lensForm.aperture.trim() || undefined,
      notes: lensForm.notes.trim() || undefined,
    };

    setLenses([...lenses, newLens]);
    setLensForm({ name: '', focalLength: '', aperture: '', notes: '' });
    setIsLensModalOpen(false);
  };

  const deleteMember = (id: string) => {
    setTeamMembers(teamMembers.filter(member => member.id !== id));
  };

  const deleteCamera = (id: string) => {
    setCameras(cameras.filter(camera => camera.id !== id));
  };

  const deleteLens = (id: string) => {
    setLenses(lenses.filter(lens => lens.id !== id));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Team & Gear Management</h1>
        <p className="text-gray-600">Manage your production team and equipment inventory.</p>
      </div>

      {/* Team Members Section */}
      <div className="bg-white rounded-xl border border-gray-200 mb-8">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-100 p-2 rounded-lg">
                <User className="w-5 h-5 text-blue-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">Team Members</h2>
            </div>
            <button
              onClick={() => setIsTeamModalOpen(true)}
              className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Add Member</span>
            </button>
          </div>
        </div>

        <div className="p-6">
          {teamMembers.length === 0 ? (
            <div className="text-center py-8">
              <User className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">No team members added yet</p>
              <p className="text-sm text-gray-400">Add your first team member to get started</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {teamMembers.map((member) => (
                <div key={member.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow group">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{member.name}</h3>
                      <p className="text-sm text-blue-600 mb-2">{member.role}</p>
                      {member.email && (
                        <p className="text-xs text-gray-500 mb-1">{member.email}</p>
                      )}
                      {member.phone && (
                        <p className="text-xs text-gray-500">{member.phone}</p>
                      )}
                    </div>
                    <button
                      onClick={() => deleteMember(member.id)}
                      className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 transition-all"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Gear Management Section */}
      <div className="bg-white rounded-xl border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <button
            onClick={() => setIsGearExpanded(!isGearExpanded)}
            className="flex items-center justify-between w-full text-left"
          >
            <div className="flex items-center space-x-3">
              <div className="bg-purple-100 p-2 rounded-lg">
                <Video className="w-5 h-5 text-purple-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">Gear Management</h2>
            </div>
            {isGearExpanded ? (
              <ChevronUp className="w-5 h-5 text-gray-400" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-400" />
            )}
          </button>
        </div>

        {isGearExpanded && (
          <div className="p-6 space-y-8">
            {/* Cameras */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <Video className="w-5 h-5 text-purple-600" />
                  <h3 className="text-lg font-medium text-gray-900">Camera Models</h3>
                </div>
                <button
                  onClick={() => setIsCameraModalOpen(true)}
                  className="flex items-center space-x-2 bg-purple-600 text-white px-3 py-2 rounded-lg hover:bg-purple-700 transition-colors text-sm"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Camera</span>
                </button>
              </div>

              {cameras.length === 0 ? (
                <div className="text-center py-6 border border-gray-200 rounded-lg">
                  <Video className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                  <p className="text-gray-500 text-sm">No cameras added yet</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {cameras.map((camera) => (
                    <div key={camera.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow group">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">{camera.name}</h4>
                          {camera.serialNumber && (
                            <p className="text-xs text-gray-500 mt-1">S/N: {camera.serialNumber}</p>
                          )}
                          {camera.notes && (
                            <p className="text-xs text-gray-600 mt-2">{camera.notes}</p>
                          )}
                        </div>
                        <button
                          onClick={() => deleteCamera(camera.id)}
                          className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 transition-all"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Lenses */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <Camera className="w-5 h-5 text-green-600" />
                  <h3 className="text-lg font-medium text-gray-900">Lenses</h3>
                </div>
                <button
                  onClick={() => setIsLensModalOpen(true)}
                  className="flex items-center space-x-2 bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Lens</span>
                </button>
              </div>

              {lenses.length === 0 ? (
                <div className="text-center py-6 border border-gray-200 rounded-lg">
                  <Camera className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                  <p className="text-gray-500 text-sm">No lenses added yet</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {lenses.map((lens) => (
                    <div key={lens.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow group">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">{lens.name}</h4>
                          <div className="flex space-x-4 mt-1">
                            {lens.focalLength && (
                              <span className="text-xs text-gray-500">{lens.focalLength}</span>
                            )}
                            {lens.aperture && (
                              <span className="text-xs text-gray-500">f/{lens.aperture}</span>
                            )}
                          </div>
                          {lens.notes && (
                            <p className="text-xs text-gray-600 mt-2">{lens.notes}</p>
                          )}
                        </div>
                        <button
                          onClick={() => deleteLens(lens.id)}
                          className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 transition-all"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Add Team Member Modal */}
      <Modal
        isOpen={isTeamModalOpen}
        onClose={() => setIsTeamModalOpen(false)}
        title="Add Team Member"
      >
        <form onSubmit={handleAddMember} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name *
            </label>
            <input
              type="text"
              value={memberForm.name}
              onChange={(e) => setMemberForm({ ...memberForm, name: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="John Doe"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Role *
            </label>
            <input
              type="text"
              value={memberForm.role}
              onChange={(e) => setMemberForm({ ...memberForm, role: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Director, Editor, DP, etc."
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value={memberForm.email}
              onChange={(e) => setMemberForm({ ...memberForm, email: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="john@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone
            </label>
            <input
              type="tel"
              value={memberForm.phone}
              onChange={(e) => setMemberForm({ ...memberForm, phone: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="+1 (555) 123-4567"
            />
          </div>
          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={() => setIsTeamModalOpen(false)}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Add Member
            </button>
          </div>
        </form>
      </Modal>

      {/* Add Camera Modal */}
      <Modal
        isOpen={isCameraModalOpen}
        onClose={() => setIsCameraModalOpen(false)}
        title="Add Camera"
      >
        <form onSubmit={handleAddCamera} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Camera Name *
            </label>
            <input
              type="text"
              value={cameraForm.name}
              onChange={(e) => setCameraForm({ ...cameraForm, name: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Sony FX3, Canon R5, etc."
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Serial Number
            </label>
            <input
              type="text"
              value={cameraForm.serialNumber}
              onChange={(e) => setCameraForm({ ...cameraForm, serialNumber: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Serial number or identifier"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Notes
            </label>
            <textarea
              value={cameraForm.notes}
              onChange={(e) => setCameraForm({ ...cameraForm, notes: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Additional notes or specifications"
              rows={3}
            />
          </div>
          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={() => setIsCameraModalOpen(false)}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              Add Camera
            </button>
          </div>
        </form>
      </Modal>

      {/* Add Lens Modal */}
      <Modal
        isOpen={isLensModalOpen}
        onClose={() => setIsLensModalOpen(false)}
        title="Add Lens"
      >
        <form onSubmit={handleAddLens} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Lens Name *
            </label>
            <input
              type="text"
              value={lensForm.name}
              onChange={(e) => setLensForm({ ...lensForm, name: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="Sigma 24-70mm f/2.8, Canon RF 50mm, etc."
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Focal Length
              </label>
              <input
                type="text"
                value={lensForm.focalLength}
                onChange={(e) => setLensForm({ ...lensForm, focalLength: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="24-70mm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Aperture
              </label>
              <input
                type="text"
                value={lensForm.aperture}
                onChange={(e) => setLensForm({ ...lensForm, aperture: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="2.8"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Notes
            </label>
            <textarea
              value={lensForm.notes}
              onChange={(e) => setLensForm({ ...lensForm, notes: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="Additional notes or specifications"
              rows={3}
            />
          </div>
          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={() => setIsLensModalOpen(false)}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Add Lens
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}