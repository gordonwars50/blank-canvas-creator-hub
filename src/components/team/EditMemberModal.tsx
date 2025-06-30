
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { TeamMember, TeamRole, TEAM_ROLES } from '@/types/team';
import { useTeamManagement } from '@/hooks/useTeamManagement';
import { Edit, Save } from 'lucide-react';

interface EditMemberModalProps {
  member: TeamMember;
  onClose: () => void;
  onSave: () => void;
}

const EditMemberModal: React.FC<EditMemberModalProps> = ({ member, onClose, onSave }) => {
  const { updateMember } = useTeamManagement();
  const [name, setName] = useState(member.name);
  const [email, setEmail] = useState(member.email);
  const [selectedRole, setSelectedRole] = useState<TeamRole>(member.role);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});

  useEffect(() => {
    setName(member.name);
    setEmail(member.email);
    setSelectedRole(member.role);
  }, [member]);

  const validateForm = () => {
    const newErrors: { name?: string; email?: string } = {};
    
    if (!name.trim()) {
      newErrors.name = 'Name is required';
    } else if (name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }
    
    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        newErrors.email = 'Please enter a valid email address';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      const updatedMember = updateMember(member.id, {
        name: name.trim(),
        email: email.trim(),
        role: selectedRole
      });

      if (updatedMember) {
        console.log('Updated team member:', updatedMember);
        onSave();
        // TODO: Show success toast notification
      }
    } catch (error) {
      console.error('Error updating team member:', error);
      alert('There was an error updating the team member. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      // Reset form to original values
      setName(member.name);
      setEmail(member.email);
      setSelectedRole(member.role);
      setErrors({});
      onClose();
    }
  };

  const hasChanges = 
    name.trim() !== member.name || 
    email.trim() !== member.email || 
    selectedRole !== member.role;

  return (
    <Dialog open={true} onOpenChange={handleClose}>
      <DialogContent className="bg-gray-900 border-gray-700 max-w-md">
        <DialogHeader>
          <DialogTitle className="text-white flex items-center gap-2">
            <Edit className="w-5 h-5 text-blue-400" />
            Edit Team Member
          </DialogTitle>
          <DialogDescription className="text-gray-400">
            Update member information and role permissions.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label className="text-gray-300">Full Name</Label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter full name"
              className="bg-gray-800 border-gray-600 text-white placeholder-gray-400"
              disabled={isSubmitting}
            />
            {errors.name && <p className="text-red-400 text-sm">{errors.name}</p>}
          </div>

          <div className="space-y-2">
            <Label className="text-gray-300">Email Address</Label>
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Enter email address"
              className="bg-gray-800 border-gray-600 text-white placeholder-gray-400"
              disabled={isSubmitting || member.role === 'Director'} // Prevent changing director email
            />
            {errors.email && <p className="text-red-400 text-sm">{errors.email}</p>}
            {member.role === 'Director' && (
              <p className="text-gray-500 text-xs">Director email cannot be changed</p>
            )}
          </div>

          <div className="space-y-3">
            <Label className="text-gray-300">Role</Label>
            <div className="space-y-2">
              {TEAM_ROLES.map((role) => (
                <div
                  key={role.value}
                  className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                    selectedRole === role.value
                      ? 'border-blue-500 bg-blue-500/10'
                      : 'border-gray-600 bg-gray-800/50 hover:bg-gray-800'
                  } ${
                    member.role === 'Director' && role.value !== 'Director' 
                      ? 'opacity-50 cursor-not-allowed' 
                      : ''
                  }`}
                  onClick={() => {
                    // Prevent changing director role to non-director
                    if (member.role === 'Director' && role.value !== 'Director') return;
                    setSelectedRole(role.value);
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-4 h-4 rounded-full border-2 ${
                          selectedRole === role.value
                            ? 'border-blue-500 bg-blue-500'
                            : 'border-gray-400'
                        }`}
                      >
                        {selectedRole === role.value && (
                          <div className="w-full h-full rounded-full bg-white scale-50"></div>
                        )}
                      </div>
                      <span className="text-white font-medium">{role.label}</span>
                    </div>
                    <Badge variant="outline" className="text-xs border-gray-600 text-gray-300">
                      {role.value}
                    </Badge>
                  </div>
                  <p className="text-gray-400 text-sm mt-1 ml-6">{role.description}</p>
                </div>
              ))}
            </div>
            {member.role === 'Director' && (
              <p className="text-gray-500 text-xs">Director role cannot be changed</p>
            )}
          </div>
        </div>

        <DialogFooter className="flex gap-2 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={handleClose}
            disabled={isSubmitting}
            className="border-gray-600 text-gray-300 hover:bg-gray-700"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            disabled={isSubmitting || !hasChanges}
            className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <Save className="w-4 h-4 mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditMemberModal;
