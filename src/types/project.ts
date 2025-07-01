
export interface ProjectMetadata {
  title: string;
  description: string;
  tags: string[];
  category?: string;
  visibility?: 'public' | 'unlisted' | 'private';
}

export interface Shot {
  id: string;
  name: string;
  cameraId?: string;
  lensId?: string;
}

export interface Scene {
  id: string;
  name: string;
  tags: string[];
  shots: Shot[];
  notes?: string;
}

export interface TeamAssignments {
  scriptwriter: string[];
  storyboardArtist: string[];
  researcher: string[];
  director: string[];
  videoEditor: string[];
  thumbnailDesigner: string[];
  videographer: string[];
  insightsLead: string[];
  [key: string]: string[];
}

export interface StoryboardFile {
  name: string;
  url: string;
  size?: number;
  type?: string;
}

export type ProjectState = 'Planning' | 'Production' | 'Scheduled' | 'Uploaded';

export interface Project {
  id: string;
  user_id: string;
  title: string;
  state: ProjectState;
  created_at: string;
  updated_at: string;
  scheduled_date?: string;
  ideas: string;
  script: string;
  metadata: ProjectMetadata;
  scheduled_time?: string;
  upload_now?: boolean;
  selected_mode?: 'schedule' | 'upload';
  scenes: Scene[];
  teamAssignments: TeamAssignments;
  storyboardFiles: StoryboardFile[];
}

export interface ProjectFormData {
  title: string;
  ideas: string;
  script: string;
  storyboardFiles: File[];
  scenes: Scene[];
  teamAssignments: TeamAssignments;
  scheduledDate: Date | null;
  scheduledTime: string;
  uploadNow: boolean;
  selectedMode: 'schedule' | 'upload';
  metadata: ProjectMetadata;
}
