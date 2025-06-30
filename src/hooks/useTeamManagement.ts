
import { useState, useEffect } from 'react';
import { TeamMember, TeamInvite, TeamRole } from '@/types/team';

// Helper function to generate unique team member IDs
const generateMemberId = (existingMembers: TeamMember[] = []): string => {
  const existingIds = new Set(existingMembers.map(m => m.id));
  
  const generateRandomId = (): string => {
    return 'member_' + Math.random().toString(36).substr(2, 9);
  };
  
  let newId = generateRandomId();
  while (existingIds.has(newId)) {
    newId = generateRandomId();
  }
  
  return newId;
};

// Helper function to generate avatar initials
const getInitials = (name: string): string => {
  return name
    .split(' ')
    .map(word => word.charAt(0).toUpperCase())
    .slice(0, 2)
    .join('');
};

// Storage key for localStorage
const TEAM_STORAGE_KEY = 'teamMembers';
const INVITES_STORAGE_KEY = 'teamInvites';

export const useTeamManagement = () => {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [invites, setInvites] = useState<TeamInvite[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentUserRole] = useState<TeamRole>('Admin'); // Mock current user as Admin

  // Load data from localStorage on mount
  useEffect(() => {
    try {
      const storedMembers = localStorage.getItem(TEAM_STORAGE_KEY);
      const storedInvites = localStorage.getItem(INVITES_STORAGE_KEY);
      
      if (storedMembers) {
        const parsedMembers = JSON.parse(storedMembers);
        setMembers(parsedMembers);
        console.log('Loaded team members from localStorage:', parsedMembers);
      } else {
        // Initialize with default admin user if no members exist
        const defaultAdmin: TeamMember = {
          id: generateMemberId([]),
          name: 'John Doe',
          email: 'john.doe@example.com',
          role: 'Admin',
          joinedAt: new Date().toISOString(),
          isActive: true
        };
        setMembers([defaultAdmin]);
      }
      
      if (storedInvites) {
        const parsedInvites = JSON.parse(storedInvites);
        setInvites(parsedInvites);
        console.log('Loaded team invites from localStorage:', parsedInvites);
      }
    } catch (error) {
      console.error('Error loading team data from localStorage:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    if (!loading) {
      try {
        localStorage.setItem(TEAM_STORAGE_KEY, JSON.stringify(members));
        localStorage.setItem(INVITES_STORAGE_KEY, JSON.stringify(invites));
        console.log('Saved team data to localStorage');
      } catch (error) {
        console.error('Error saving team data to localStorage:', error);
      }
    }
  }, [members, invites, loading]);

  // Add a new team member
  const addMember = (memberData: Omit<TeamMember, 'id' | 'joinedAt' | 'isActive'>): TeamMember => {
    const newMember: TeamMember = {
      ...memberData,
      id: generateMemberId(members),
      joinedAt: new Date().toISOString(),
      isActive: true
    };

    console.log('Adding new team member:', newMember);
    setMembers(prev => [...prev, newMember]);
    return newMember;
  };

  // Update an existing team member
  const updateMember = (id: string, updates: Partial<TeamMember>): TeamMember | null => {
    let updatedMember: TeamMember | null = null;
    
    setMembers(prev => prev.map(member => {
      if (member.id === id) {
        updatedMember = { ...member, ...updates };
        console.log('Updated team member:', updatedMember);
        return updatedMember;
      }
      return member;
    }));

    return updatedMember;
  };

  // Remove a team member
  const removeMember = (id: string) => {
    setMembers(prev => prev.filter(member => member.id !== id));
    console.log('Removed team member with ID:', id);
  };

  // Send an invite (placeholder for future backend integration)
  const sendInvite = (email: string, role: TeamRole): TeamInvite => {
    const newInvite: TeamInvite = {
      id: 'invite_' + Math.random().toString(36).substr(2, 9),
      email,
      role,
      invitedBy: 'current-user-id', // Replace with actual current user ID
      invitedAt: new Date().toISOString(),
      status: 'pending'
    };

    console.log('Sending invite (placeholder):', newInvite);
    setInvites(prev => [...prev, newInvite]);
    
    // TODO: Integrate with backend to send actual email invite
    return newInvite;
  };

  // Get member by ID
  const getMember = (id: string): TeamMember | undefined => {
    return members.find(member => member.id === id);
  };

  // Get initials for a member
  const getMemberInitials = (member: TeamMember): string => {
    return getInitials(member.name);
  };

  // Check if current user can perform admin actions
  const canManageTeam = (): boolean => {
    return currentUserRole === 'Admin';
  };

  return {
    members,
    invites,
    loading,
    currentUserRole,
    addMember,
    updateMember,
    removeMember,
    sendInvite,
    getMember,
    getMemberInitials,
    canManageTeam
  };
};
