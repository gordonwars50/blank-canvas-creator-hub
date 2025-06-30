
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import NewAppSidebar from '@/components/dashboard/NewAppSidebar';
import ProjectOverview from '@/components/addnewvideo/ProjectOverview';

// Extended project interface to include all data
interface ExtendedProject {
  id: string;
  title: string;
  thumbnail: string;
  state: 'Planning' | 'Production' | 'Scheduled' | 'Uploaded';
  createdAt: string;
  scheduledDate?: string;
  uploadedAt?: string;
  description?: string;
  tags: string[];
  script: string;
  ideas: string;
  storyboardFiles: Array<{ name: string; url: string }>;
  scenes: Array<{
    id: string;
    name: string;
    tags: string[];
    shots: Array<{
      id: string;
      name: string;
    }>;
  }>;
  teamAssignments: {
    scriptwriter: string[];
    storyboardArtist: string[];
    researcher: string[];
    director: string[];
    videoEditor: string[];
    thumbnailDesigner: string[];
    videographer: string[];
    insightsLead: string[];
  };
  stats: {
    views: number;
    comments: number;
    watchTime: number;
    likes: number;
  };
}

// Mock extended project data
const mockExtendedProject: ExtendedProject = {
  id: '1',
  title: 'How to Build a React App',
  thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=300&fit=crop',
  state: 'Production',
  createdAt: '2024-06-20',
  description: 'Complete tutorial on React development covering all essential concepts from setup to deployment. Learn modern React patterns, hooks, state management, and best practices for building scalable applications.',
  tags: ['react', 'javascript', 'tutorial', 'web development', 'frontend', 'programming'],
  script: `# Introduction to React Development

Welcome to this comprehensive React tutorial! Today we'll be covering everything you need to know to build modern React applications.

## What We'll Cover
- Setting up your development environment
- Understanding components and JSX
- Working with state and props
- Handling events and user interactions
- Building reusable components

Let's start with the basics...`,
  ideas: 'Create a beginner-friendly React tutorial that covers fundamental concepts while building a real project. Include practical examples and common pitfalls to avoid.',
  storyboardFiles: [
    { name: 'intro-storyboard.pdf', url: '/mock/intro-storyboard.pdf' },
    { name: 'component-diagram.png', url: '/mock/component-diagram.png' }
  ],
  scenes: [
    {
      id: '1',
      name: 'Introduction',
      tags: ['intro', 'welcome'],
      shots: [
        { id: '1-1', name: 'Opening title card' },
        { id: '1-2', name: 'Host introduction' }
      ]
    },
    {
      id: '2',
      name: 'React Basics',
      tags: ['tutorial', 'basics'],
      shots: [
        { id: '2-1', name: 'Code editor setup' },
        { id: '2-2', name: 'First component creation' },
        { id: '2-3', name: 'JSX explanation' }
      ]
    }
  ],
  teamAssignments: {
    scriptwriter: ['John Doe'],
    storyboardArtist: ['Jane Smith'],
    researcher: ['Mike Johnson'],
    director: ['Sarah Wilson'],
    videoEditor: ['Tom Brown'],
    thumbnailDesigner: ['Lisa Davis'],
    videographer: ['Alex Chen'],
    insightsLead: ['Emma Taylor']
  },
  stats: { views: 0, comments: 0, watchTime: 0, likes: 0 }
};

const ProjectOverviewPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);

  // In a real app, this would fetch project data based on the ID
  const project = mockExtendedProject;

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const handleEdit = () => {
    // Navigate to the appropriate editing page based on project state
    if (project.state === 'Planning' || project.state === 'Production') {
      navigate(`/dashboard/plan-schedule/edit/${id}`);
    } else if (project.state === 'Scheduled') {
      navigate(`/dashboard/plan-schedule/schedule/${id}`);
    }
  };

  const handleStateChange = (newState: 'Planning' | 'Production') => {
    // In a real app, this would update the project state in the backend
    console.log('Updating project state to:', newState);
  };

  return (
    <div className="min-h-screen bg-black flex w-full">
      <NewAppSidebar collapsed={sidebarCollapsed} onToggle={toggleSidebar} />
      
      <div 
        className="flex-1 flex flex-col min-w-0 transition-all duration-300"
        style={{ 
          marginLeft: sidebarCollapsed ? '60px' : '300px'
        }}
      >
        <div className="flex-1 overflow-y-auto">
          <ProjectOverview
            project={project}
            onEdit={handleEdit}
            onStateChange={handleStateChange}
          />
        </div>
      </div>
    </div>
  );
};

export default ProjectOverviewPage;
