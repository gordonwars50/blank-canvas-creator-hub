
export interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: 'Script Writer' | 'Storyboard Artist' | 'Researcher' | 'Director' | 'Video Editor' | 'Thumbnail Designer' | 'Videographer' | 'Insights Lead';
  joinedAt: string;
  avatar?: string;
  isActive: boolean;
}

export interface TeamInvite {
  id: string;
  email: string;
  role: 'Script Writer' | 'Storyboard Artist' | 'Researcher' | 'Director' | 'Video Editor' | 'Thumbnail Designer' | 'Videographer' | 'Insights Lead';
  invitedBy: string;
  invitedAt: string;
  status: 'pending' | 'accepted' | 'expired';
}

export type TeamRole = 'Script Writer' | 'Storyboard Artist' | 'Researcher' | 'Director' | 'Video Editor' | 'Thumbnail Designer' | 'Videographer' | 'Insights Lead';

export const TEAM_ROLES: { value: TeamRole; label: string; description: string }[] = [
  { 
    value: 'Script Writer', 
    label: 'Script Writer', 
    description: 'Creates scripts, dialogues, and written content for videos' 
  },
  { 
    value: 'Storyboard Artist', 
    label: 'Storyboard Artist', 
    description: 'Designs visual storyboards and shot planning for videos' 
  },
  { 
    value: 'Researcher', 
    label: 'Researcher', 
    description: 'Conducts research and gathers information for video content' 
  },
  { 
    value: 'Director', 
    label: 'Director', 
    description: 'Oversees creative direction and guides video production' 
  },
  { 
    value: 'Video Editor', 
    label: 'Video Editor', 
    description: 'Edits and post-processes video content and final output' 
  },
  { 
    value: 'Thumbnail Designer', 
    label: 'Thumbnail Designer', 
    description: 'Creates eye-catching thumbnails and visual graphics' 
  },
  { 
    value: 'Videographer', 
    label: 'Videographer', 
    description: 'Handles camera work, filming, and video capture' 
  },
  { 
    value: 'Insights Lead', 
    label: 'Insights Lead', 
    description: 'Analyzes performance metrics and provides data insights' 
  }
];
