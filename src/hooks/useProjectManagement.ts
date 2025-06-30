
import { useState, useEffect } from 'react';

// Define the project state type
type ProjectState = 'Planning' | 'Production' | 'Scheduled' | 'Uploaded';

// Define team assignment roles
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

// Define scene structure
interface Scene {
  id: string;
  name: string;
  tags: string[];
  shots: Array<{
    id: string;
    name: string;
  }>;
}

// Define metadata structure
interface VideoMetadata {
  title: string;
  description: string;
  tags: string[];
  category?: string;
  visibility?: 'public' | 'unlisted' | 'private';
}

// Serializable file reference for localStorage
interface SerializableFile {
  name: string;
  size: number;
  type: string;
  lastModified: number;
  // Note: We can't store the actual file content in localStorage
  // In a real app, files would be uploaded to a file storage service
}

// Define the main project interface
interface VideoProject {
  id: string;
  title: string;
  state: ProjectState;
  createdAt: string;
  updatedAt: string;
  scheduledDate?: string;
  ideas: string;
  script: string;
  storyboardFiles: SerializableFile[];
  scenes: Scene[];
  teamAssignments: TeamAssignments;
  metadata: VideoMetadata;
  scheduledTime?: string;
  uploadNow?: boolean;
  selectedMode?: 'schedule' | 'upload';
  userId?: string;
}

// Helper function to generate unique IDs
const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

// Helper function to generate default team assignments
const getDefaultTeamAssignments = (): TeamAssignments => ({
  scriptwriter: [],
  storyboardArtist: [],
  researcher: [],
  director: [],
  videoEditor: [],
  thumbnailDesigner: [],
  videographer: [],
  insightsLead: []
});

// Helper function to generate default metadata
const getDefaultMetadata = (): VideoMetadata => ({
  title: '',
  description: '',
  tags: [],
  category: '',
  visibility: 'public'
});

// Helper function to generate untitled project name
const generateUntitledName = (existingProjects: VideoProject[]): string => {
  const untitledCount = existingProjects.filter(project => 
    project.title.startsWith('Untitled Project')
  ).length;
  return `Untitled Project ${untitledCount + 1}`;
};

// Helper function to convert File objects to serializable format
const serializeFiles = (files: File[]): SerializableFile[] => {
  return files.map(file => ({
    name: file.name,
    size: file.size,
    type: file.type,
    lastModified: file.lastModified
  }));
};

// Storage key for localStorage
const STORAGE_KEY = 'videoProjects';

export const useProjectManagement = () => {
  const [projects, setProjects] = useState<VideoProject[]>([]);
  const [loading, setLoading] = useState(true);

  // Load projects from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsedProjects = JSON.parse(stored);
        setProjects(parsedProjects);
        console.log('Loaded projects from localStorage:', parsedProjects);
      }
    } catch (error) {
      console.error('Error loading projects from localStorage:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Save projects to localStorage whenever projects change
  useEffect(() => {
    if (!loading) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
        console.log('Saved projects to localStorage:', projects);
      } catch (error) {
        console.error('Error saving projects to localStorage:', error);
      }
    }
  }, [projects, loading]);

  // Create a new project
  const createProject = (data: Partial<VideoProject>): VideoProject => {
    const newProject: VideoProject = {
      id: generateId(),
      title: data.title || generateUntitledName(projects),
      state: 'Planning',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      ideas: data.ideas || '',
      script: data.script || '',
      storyboardFiles: data.storyboardFiles || [],
      scenes: data.scenes || [],
      teamAssignments: data.teamAssignments || getDefaultTeamAssignments(),
      metadata: data.metadata || getDefaultMetadata(),
      scheduledDate: data.scheduledDate,
      scheduledTime: data.scheduledTime,
      uploadNow: data.uploadNow,
      selectedMode: data.selectedMode,
      userId: data.userId
    };

    console.log('Creating new project:', newProject);
    setProjects(prev => [...prev, newProject]);
    return newProject;
  };

  // Update an existing project
  const updateProject = (data: Partial<VideoProject> & { id: string }): VideoProject => {
    let updatedProject: VideoProject | null = null;
    
    setProjects(prev => prev.map(project => {
      if (project.id === data.id) {
        const { metadata: newMetadata, teamAssignments: newTeamAssignments, ...restData } = data;
        
        updatedProject = { 
          ...project, 
          ...restData, 
          updatedAt: new Date().toISOString()
        };
        
        // Handle metadata update properly
        if (newMetadata) {
          updatedProject.metadata = {
            title: newMetadata.title ?? project.metadata.title,
            description: newMetadata.description ?? project.metadata.description,
            tags: newMetadata.tags ?? project.metadata.tags,
            category: newMetadata.category ?? project.metadata.category,
            visibility: newMetadata.visibility ?? project.metadata.visibility
          };
        }

        // Handle team assignments update properly
        if (newTeamAssignments) {
          updatedProject.teamAssignments = {
            scriptwriter: newTeamAssignments.scriptwriter ?? project.teamAssignments.scriptwriter,
            storyboardArtist: newTeamAssignments.storyboardArtist ?? project.teamAssignments.storyboardArtist,
            researcher: newTeamAssignments.researcher ?? project.teamAssignments.researcher,
            director: newTeamAssignments.director ?? project.teamAssignments.director,
            videoEditor: newTeamAssignments.videoEditor ?? project.teamAssignments.videoEditor,
            thumbnailDesigner: newTeamAssignments.thumbnailDesigner ?? project.teamAssignments.thumbnailDesigner,
            videographer: newTeamAssignments.videographer ?? project.teamAssignments.videographer,
            insightsLead: newTeamAssignments.insightsLead ?? project.teamAssignments.insightsLead
          };
        }
        
        console.log('Updated project:', updatedProject);
        return updatedProject;
      }
      return project;
    }));

    return updatedProject!;
  };

  // Delete a project
  const deleteProject = (id: string) => {
    setProjects(prev => prev.filter(project => project.id !== id));
  };

  // Get a project by ID
  const getProject = (id: string): VideoProject | undefined => {
    return projects.find(project => project.id === id);
  };

  // Save or update a project (used by the modal)
  const saveProject = (data: any): VideoProject => {
    // Handle File objects by converting them to serializable format
    const processedData = {
      ...data,
      storyboardFiles: data.storyboardFiles ? serializeFiles(data.storyboardFiles) : [],
      scheduledDate: data.scheduledDate && typeof data.scheduledDate === 'string' ? data.scheduledDate : undefined
    };

    // Check if project already exists
    const existingProject = data.id ? getProject(data.id) : null;
    
    if (existingProject) {
      // Update existing project
      console.log('Updating existing project with ID:', data.id);
      return updateProject(processedData);
    } else {
      // Create new project
      console.log('Creating new project');
      return createProject(processedData);
    }
  };

  return {
    projects,
    loading,
    createProject,
    updateProject,
    deleteProject,
    getProject,
    saveProject
  };
};
