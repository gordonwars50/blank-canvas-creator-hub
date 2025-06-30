
import React, { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { GlowCard } from '@/components/ui/spotlight-card';
import { GlowButton } from '@/components/ui/glow-button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { UserPlus, Search } from 'lucide-react';
import { useTeamManagement } from '@/hooks/useTeamManagement';
import TeamMemberList from '@/components/team/TeamMemberList';
import AddMemberModal from '@/components/team/AddMemberModal';

const TeamPage: React.FC = () => {
  const { members, invites, loading, canManageTeam } = useTeamManagement();
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddMember, setShowAddMember] = useState(false);

  // Filter members based on search term
  const filteredMembers = members.filter(member =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <DashboardLayout title="Team Management" hideTopBarActions={true}>
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
    <DashboardLayout title="Team Management - Manage your team members, roles, and project assignments" hideTopBarActions={true}>
      <div className="space-y-6">
        {/* Header Section with Add Button */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          {canManageTeam() && (
            <GlowButton
              glowColor="blue"
              leftIcon={<UserPlus className="w-4 h-4" />}
              onClick={() => setShowAddMember(true)}
              className="bg-blue-600 hover:bg-blue-700 rounded-lg px-4 ml-auto"
            >
              Add Team Member
            </GlowButton>
          )}
        </div>

        {/* Search and Filters Section */}
        <GlowCard glowColor="purple" customSize className="w-full p-4 bg-gray-900/50">
          <div className="flex flex-col md:flex-row gap-4">
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
        </GlowCard>

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
        <TeamMemberList members={filteredMembers} />

        {/* Phase 2 Features (Commented for future development) */}
        {/* 
        TODO: Phase 2 Features to implement:
        - Advanced filtering by role, project assignment, join date
        - Bulk operations (assign to projects, change roles, etc.)
        - Team member activity timeline
        - Project assignment management interface
        - Permission matrix for different roles
        - Team collaboration analytics
        - Integration with project notifications
        - Team member onboarding checklist
        */}

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
