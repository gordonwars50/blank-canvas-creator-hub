
import React from 'react';
import { GlowCard } from '@/components/ui/spotlight-card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Users } from 'lucide-react';
import { useTeamManagement } from '@/hooks/useTeamManagement';

// Updated interface to support all 8 roles
interface TeamAssignments {
  scriptwriter: string[];
  storyboardArtist: string[];
  researcher: string[];
  director: string[];
  videoEditor: string[];
  thumbnailDesigner: string[];
  videographer: string[];
  insightsLead: string[];
}

interface TeamAssignmentSectionProps {
  teamAssignments: TeamAssignments;
  onChange: (assignments: TeamAssignments) => void;
}

const roleLabels = {
  scriptwriter: 'Script',
  storyboardArtist: 'Storyboard',
  researcher: 'Research',
  director: 'Director',
  videoEditor: 'Editor',
  thumbnailDesigner: 'Thumbnail',
  videographer: 'Video',
  insightsLead: 'Insights'
};

const TeamAssignmentSection: React.FC<TeamAssignmentSectionProps> = ({
  teamAssignments,
  onChange
}) => {
  const { members, loading, getMemberInitials } = useTeamManagement();

  const isAssigned = (memberId: string, role: keyof TeamAssignments) => {
    return teamAssignments[role]?.includes(memberId) || false;
  };

  const toggleAssignment = (memberId: string, role: keyof TeamAssignments) => {
    const currentAssignments = teamAssignments[role] || [];
    const isCurrentlyAssigned = currentAssignments.includes(memberId);
    
    const updatedAssignments = {
      ...teamAssignments,
      [role]: isCurrentlyAssigned
        ? currentAssignments.filter(id => id !== memberId)
        : [...currentAssignments, memberId]
    };
    
    onChange(updatedAssignments);
  };

  const getMemberAssignedRoles = (memberId: string) => {
    const assignedRoles: string[] = [];
    Object.entries(roleLabels).forEach(([roleKey, roleLabel]) => {
      if (isAssigned(memberId, roleKey as keyof TeamAssignments)) {
        assignedRoles.push(roleLabel);
      }
    });
    return assignedRoles;
  };

  const handleRoleSelect = (memberId: string, roleKey: string) => {
    if (roleKey && roleKey !== 'placeholder') {
      toggleAssignment(memberId, roleKey as keyof TeamAssignments);
    }
  };

  if (loading) {
    return (
      <GlowCard glowColor="orange" customSize className="w-full p-6">
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-orange-400" />
            <h2 className="text-xl font-semibold text-white">Team Assignment</h2>
          </div>
          <div className="text-gray-400">Loading team members...</div>
        </div>
      </GlowCard>
    );
  }

  if (members.length === 0) {
    return (
      <GlowCard glowColor="orange" customSize className="w-full p-6">
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-orange-400" />
            <h2 className="text-xl font-semibold text-white">Team Assignment</h2>
          </div>
          
          <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-4 text-center">
            <p className="text-orange-200">
              No team members found. Please add team members in the Team Management section first.
            </p>
          </div>
        </div>
      </GlowCard>
    );
  }
  
  return (
    <GlowCard glowColor="orange" customSize className="w-full p-6">
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <Users className="w-5 h-5 text-orange-400" />
          <h2 className="text-xl font-semibold text-white">Team Assignment</h2>
        </div>
        
        <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-3">
          <p className="text-sm text-orange-200">
            💡 <strong>Note:</strong> Once roles are assigned and the project is saved, all assigned team members will be contacted by email with their role details.
          </p>
        </div>

        <div className="rounded-lg border border-gray-700 overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="border-gray-700 hover:bg-gray-800/50">
                <TableHead className="text-gray-300 font-medium">Team Member</TableHead>
                <TableHead className="text-gray-300 font-medium">Current Roles</TableHead>
                <TableHead className="text-gray-300 font-medium">Assign Roles</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {members.map((member) => {
                const assignedRoles = getMemberAssignedRoles(member.id);
                
                return (
                  <TableRow key={member.id} className="border-gray-700 hover:bg-gray-800/30">
                    <TableCell className="py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-orange-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                          {getMemberInitials(member)}
                        </div>
                        <div>
                          <div className="text-white font-medium">{member.name}</div>
                          <div className="text-gray-400 text-sm">{member.email}</div>
                        </div>
                      </div>
                    </TableCell>
                    
                    <TableCell className="py-4">
                      <div className="flex flex-wrap gap-1">
                        {assignedRoles.length > 0 ? (
                          assignedRoles.map((role) => (
                            <Badge
                              key={role}
                              className="bg-orange-600/20 text-orange-300 border-orange-500/50 text-xs"
                            >
                              {role}
                            </Badge>
                          ))
                        ) : (
                          <span className="text-gray-500 text-sm">No roles assigned</span>
                        )}
                      </div>
                    </TableCell>
                    
                    <TableCell className="py-4">
                      <Select onValueChange={(value) => handleRoleSelect(member.id, value)}>
                        <SelectTrigger className="w-[180px] bg-gray-800 border-gray-600 text-white">
                          <SelectValue placeholder="Select role to assign" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-800 border-gray-600">
                          {Object.entries(roleLabels).map(([roleKey, roleLabel]) => {
                            const assigned = isAssigned(member.id, roleKey as keyof TeamAssignments);
                            return (
                              <SelectItem 
                                key={roleKey} 
                                value={roleKey}
                                className="text-white hover:bg-gray-700 focus:bg-gray-700"
                              >
                                <div className="flex items-center justify-between w-full">
                                  <span>{roleLabel}</span>
                                  {assigned && (
                                    <Badge className="ml-2 bg-orange-600/20 text-orange-300 border-orange-500/50 text-xs">
                                      Assigned
                                    </Badge>
                                  )}
                                </div>
                              </SelectItem>
                            );
                          })}
                        </SelectContent>
                      </Select>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>

        <div className="text-sm text-gray-400 space-y-1">
          <p>• Use the dropdown to assign/unassign roles to team members</p>
          <p>• Team members can have multiple roles</p>
          <p>• Assigned roles will appear as badges in the "Current Roles" column</p>
        </div>
      </div>
    </GlowCard>
  );
};

export default TeamAssignmentSection;
