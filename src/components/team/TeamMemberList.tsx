
import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { GlowCard } from '@/components/ui/spotlight-card';
import { GlowButton } from '@/components/ui/glow-button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Edit, Trash2, Users, UserPlus } from 'lucide-react';
import { TeamMember, TeamRole, TEAM_ROLES } from '@/types/team';
import { useTeamManagement } from '@/hooks/useTeamManagement';
import { useProjectManagement } from '@/hooks/useProjectManagement';
import EditMemberModal from './EditMemberModal';

interface TeamMemberListProps {
  members: TeamMember[];
  onAddMember?: () => void;
  canManageTeam?: boolean;
}

const getRoleBadgeColor = (role: TeamRole) => {
  switch (role) {
    case 'Director':
      return 'bg-red-500/20 text-red-400 border-red-500/50';
    case 'Video Editor':
      return 'bg-blue-500/20 text-blue-400 border-blue-500/50';
    case 'Script Writer':
      return 'bg-green-500/20 text-green-400 border-green-500/50';
    case 'Storyboard Artist':
      return 'bg-purple-500/20 text-purple-400 border-purple-500/50';
    case 'Researcher':
      return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50';
    case 'Thumbnail Designer':
      return 'bg-pink-500/20 text-pink-400 border-pink-500/50';
    case 'Videographer':
      return 'bg-indigo-500/20 text-indigo-400 border-indigo-500/50';
    case 'Insights Lead':
      return 'bg-orange-500/20 text-orange-400 border-orange-500/50';
    default:
      return 'bg-gray-500/20 text-gray-400 border-gray-500/50';
  }
};

const TeamMemberList: React.FC<TeamMemberListProps> = ({ 
  members, 
  onAddMember, 
  canManageTeam: canManageTeamProp 
}) => {
  const { removeMember, getMemberInitials, canManageTeam } = useTeamManagement();
  const { projects } = useProjectManagement();
  
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [memberToDelete, setMemberToDelete] = useState<TeamMember | null>(null);

  // Use prop if provided, otherwise use hook
  const canManage = canManageTeamProp !== undefined ? canManageTeamProp : canManageTeam();

  // Get projects assigned to a member
  const getMemberProjects = (memberEmail: string) => {
    return projects.filter(project => {
      return Object.values(project.teamAssignments).some(assignments => 
        assignments.includes(memberEmail)
      );
    });
  };

  // Calculate workload (number of active projects)
  const getMemberWorkload = (memberEmail: string) => {
    return getMemberProjects(memberEmail).length;
  };

  const handleDeleteMember = (member: TeamMember) => {
    if (member.role === 'Director') {
      // Prevent deleting director users (you might want to check if it's the last director)
      alert('Cannot delete director users');
      return;
    }
    
    removeMember(member.id);
    setMemberToDelete(null);
  };

  const formatJoinDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <GlowCard glowColor="blue" customSize className="w-full p-6 bg-gray-900/50">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-blue-400" />
            <h2 className="text-xl font-semibold text-white">Team Members</h2>
            <Badge variant="secondary" className="ml-2 bg-gray-700 text-gray-200">
              {members.length} {members.length === 1 ? 'member' : 'members'}
            </Badge>
          </div>
          
          {canManage && onAddMember && (
            <GlowButton
              glowColor="blue"
              leftIcon={<UserPlus className="w-4 h-4" />}
              onClick={onAddMember}
              className="bg-blue-600 hover:bg-blue-700 rounded-lg px-4"
            >
              Add Team Member
            </GlowButton>
          )}
        </div>

        {/* Admin-only workload summary */}
        {canManage && (
          <div className="bg-gray-800/50 rounded-lg p-4 mb-6">
            <h3 className="text-sm font-medium text-gray-300 mb-2">Workload Summary</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <span className="text-gray-400">Active Members:</span>
                <span className="ml-2 text-white font-medium">
                  {members.filter(m => m.isActive).length}
                </span>
              </div>
              <div>
                <span className="text-gray-400">Total Projects:</span>
                <span className="ml-2 text-white font-medium">{projects.length}</span>
              </div>
              <div>
                <span className="text-gray-400">Avg. Projects/Member:</span>
                <span className="ml-2 text-white font-medium">
                  {members.length > 0 ? Math.round(projects.length / members.length * 10) / 10 : 0}
                </span>
              </div>
            </div>
          </div>
        )}

        <div className="border border-gray-700 rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="border-gray-700 hover:bg-gray-800/50">
                <TableHead className="text-gray-300">Member</TableHead>
                <TableHead className="text-gray-300">Role</TableHead>
                <TableHead className="text-gray-300">Projects</TableHead>
                <TableHead className="text-gray-300">Joined</TableHead>
                {canManage && <TableHead className="text-gray-300">Actions</TableHead>}
              </TableRow>
            </TableHeader>
            <TableBody>
              {members.map((member) => {
                const memberProjects = getMemberProjects(member.email);
                const workload = getMemberWorkload(member.email);
                
                return (
                  <TableRow key={member.id} className="border-gray-700 hover:bg-gray-800/30">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="w-8 h-8">
                          <AvatarFallback className="bg-gray-700 text-gray-200 text-xs">
                            {getMemberInitials(member)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="text-white font-medium">{member.name}</div>
                          <div className="text-gray-400 text-sm">{member.email}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={`${getRoleBadgeColor(member.role)} border text-xs`}>
                        {member.role}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="text-white font-medium">{workload} projects</div>
                        {memberProjects.length > 0 && (
                          <div className="text-gray-400 text-xs">
                            {memberProjects.slice(0, 2).map(p => p.title).join(', ')}
                            {memberProjects.length > 2 && ` +${memberProjects.length - 2} more`}
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-gray-300">
                      {formatJoinDate(member.joinedAt)}
                    </TableCell>
                    {canManage && (
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setEditingMember(member)}
                            className="text-gray-400 hover:text-white hover:bg-gray-700"
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          {member.role !== 'Director' && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setMemberToDelete(member)}
                              className="text-red-400 hover:text-red-300 hover:bg-red-900/20"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    )}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Edit Member Modal */}
      {editingMember && (
        <EditMemberModal
          member={editingMember}
          onClose={() => setEditingMember(null)}
          onSave={() => setEditingMember(null)}
        />
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog open={!!memberToDelete} onOpenChange={(open) => !open && setMemberToDelete(null)}>
        <DialogContent className="bg-gray-900 border-gray-700">
          <DialogHeader>
            <DialogTitle className="text-white">Remove Team Member</DialogTitle>
            <DialogDescription className="text-gray-400">
              Are you sure you want to remove {memberToDelete?.name} from your team? 
              This action cannot be undone and they will lose access to all assigned projects.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setMemberToDelete(null)}
              className="border-gray-600 text-gray-300 hover:bg-gray-700"
            >
              Cancel
            </Button>
            <Button 
              variant="destructive" 
              onClick={() => memberToDelete && handleDeleteMember(memberToDelete)}
            >
              Remove Member
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </GlowCard>
  );
};

export default TeamMemberList;
