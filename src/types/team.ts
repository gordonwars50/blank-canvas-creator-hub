
export interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: 'Admin' | 'Editor' | 'Collaborator';
  joinedAt: string;
  avatar?: string;
  isActive: boolean;
}

export interface TeamInvite {
  id: string;
  email: string;
  role: 'Admin' | 'Editor' | 'Collaborator';
  invitedBy: string;
  invitedAt: string;
  status: 'pending' | 'accepted' | 'expired';
}

export type TeamRole = 'Admin' | 'Editor' | 'Collaborator';

export const TEAM_ROLES: { value: TeamRole; label: string; description: string }[] = [
  { 
    value: 'Admin', 
    label: 'Admin', 
    description: 'Full access to all features and team management' 
  },
  { 
    value: 'Editor', 
    label: 'Editor', 
    description: 'Can create and edit projects, limited team access' 
  },
  { 
    value: 'Collaborator', 
    label: 'Collaborator', 
    description: 'Can view and comment on assigned projects' 
  }
];
