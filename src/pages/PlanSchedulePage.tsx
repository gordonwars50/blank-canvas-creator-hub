import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NewAppSidebar from '@/components/dashboard/NewAppSidebar';
import { GlowCard } from '@/components/ui/spotlight-card';
import { GlowButton } from '@/components/ui/glow-button';
import { GlowInput } from '@/components/ui/glow-input';
import { Badge } from '@/components/ui/badge';
import { Plus, ChevronDown, Play, Eye, MessageSquare, Clock, ThumbsUp, Search, Trash2 } from 'lucide-react';
import AddNewVideoModal from '@/components/addnewvideo/AddNewVideoModal';
import { useProjectManagement } from '@/hooks/useProjectManagement';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useToast } from '@/hooks/use-toast';

// Project state type
type ProjectState = 'Planning' | 'Production' | 'Scheduled' | 'Uploaded';

const getStateColor = (state: ProjectState) => {
  switch (state) {
    case 'Planning':
      return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50';
    case 'Production':
      return 'bg-blue-500/20 text-blue-400 border-blue-500/50';
    case 'Scheduled':
      return 'bg-purple-500/20 text-purple-400 border-purple-500/50';
    case 'Uploaded':
      return 'bg-green-500/20 text-green-400 border-green-500/50';
    default:
      return 'bg-gray-500/20 text-gray-400 border-gray-500/50';
  }
};

const formatNumber = (num: number) => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
};

const formatWatchTime = (minutes: number) => {
  if (minutes === 0) return '0 min';
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (hours > 0) {
    return `${hours}h ${mins}m`;
  }
  return `${mins} min`;
};

const PlanSchedulePage: React.FC = () => {
  const navigate = useNavigate();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);
  const [selectedState, setSelectedState] = useState<ProjectState | 'All'>('All');
  const [filterOpen, setFilterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddVideoModal, setShowAddVideoModal] = useState(false);
  const [editingProjectId, setEditingProjectId] = useState<string | undefined>(undefined);
  const [deleteProjectId, setDeleteProjectId] = useState<string | null>(null);

  const { projects, loading, deleteProject } = useProjectManagement();
  const { toast } = useToast();
  const states: (ProjectState | 'All')[] = ['All', 'Planning', 'Production', 'Scheduled', 'Uploaded'];

  const filteredProjects = projects.filter(project => {
    const matchesState = selectedState === 'All' || project.state === selectedState;
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.metadata.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesState && matchesSearch;
  });

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const handleProjectClick = (projectId: string) => {
    const project = projects.find(p => p.id === projectId);
    if (project) {
      if (project.state === 'Planning' || project.state === 'Production') {
        // Open in edit mode
        setEditingProjectId(projectId);
        setShowAddVideoModal(true);
      } else {
        // Navigate to project overview
        navigate(`/dashboard/project/${projectId}`);
      }
    }
  };

  const handleAddNewVideo = () => {
    setEditingProjectId(undefined);
    setShowAddVideoModal(true);
  };

  const handleCloseModal = () => {
    setShowAddVideoModal(false);
    setEditingProjectId(undefined);
  };

  const handleDeleteProject = (projectId: string, event: React.MouseEvent) => {
    event.stopPropagation(); // Prevent card click when clicking delete
    setDeleteProjectId(projectId);
  };

  const confirmDeleteProject = () => {
    if (deleteProjectId) {
      try {
        deleteProject(deleteProjectId);
        toast({
          title: "Project Deleted",
          description: "The project has been deleted successfully.",
        });
        setDeleteProjectId(null);
      } catch (error) {
        console.error('Error deleting project:', error);
        toast({
          title: "Error",
          description: "Failed to delete project. Please try again.",
          variant: "destructive",
        });
      }
    }
  };

  const cancelDeleteProject = () => {
    setDeleteProjectId(null);
  };

  const getMockStats = (state: ProjectState) => {
    if (state === 'Uploaded') {
      return {
        views: Math.floor(Math.random() * 50000) + 1000,
        comments: Math.floor(Math.random() * 200) + 10,
        watchTime: Math.floor(Math.random() * 5000) + 100,
        likes: Math.floor(Math.random() * 1000) + 50
      };
    }
    return { views: 0, comments: 0, watchTime: 0, likes: 0 };
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex w-full">
        <NewAppSidebar collapsed={sidebarCollapsed} onToggle={toggleSidebar} />
        <div 
          className="flex-1 flex items-center justify-center transition-all duration-300"
          style={{ marginLeft: sidebarCollapsed ? '60px' : '300px' }}
        >
          <div className="text-white">Loading projects...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black flex w-full">
      <NewAppSidebar collapsed={sidebarCollapsed} onToggle={toggleSidebar} />

      <div 
        className="flex-1 flex flex-col min-w-0 transition-all duration-300"
        style={{ marginLeft: sidebarCollapsed ? '60px' : '300px' }}
      >
        {/* Header */}
        <div className="p-6 border-b border-gray-800">
          <div className="mb-4">
            <h1 className="text-2xl font-bold text-white">Plan & Schedule</h1>
          </div>

          {/* Single Row with Search, Filter, and Add Button */}
          <div className="flex items-center space-x-4">
            {/* Search Bar */}
            <div className="flex-1 max-w-md">
              <GlowInput
                glowColor="red"
                placeholder="Search videos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                leftIcon={<Search className="w-4 h-4" />}
                className="h-10"
              />
            </div>
            
            {/* Filter Dropdown */}
            <div className="relative">
              <button 
                className="flex items-center justify-center space-x-2 h-10 px-4 bg-gray-900/80 border border-gray-700 hover:border-red-500/50 transition-all duration-200 rounded-full cursor-pointer"
                onClick={() => setFilterOpen(!filterOpen)}
              >
                <span className="text-white text-sm font-medium">{selectedState}</span>
                <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${filterOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {filterOpen && (
                <div className="absolute top-full left-0 mt-2 w-40 bg-gray-800 border border-gray-700 rounded-lg shadow-lg z-50">
                  {states.map(state => (
                    <div
                      key={state}
                      className="px-4 py-2 text-sm text-white hover:bg-gray-700 cursor-pointer first:rounded-t-lg last:rounded-b-lg"
                      onClick={() => {
                        setSelectedState(state);
                        setFilterOpen(false);
                      }}
                    >
                      {state}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Add New Video Button */}
            <GlowButton
              glowColor="red"
              leftIcon={<Plus className="w-4 h-4" />}
              className="bg-red-600 hover:bg-red-700 rounded-lg px-6 h-10"
              onClick={handleAddNewVideo}
            >
              Add New Video
            </GlowButton>
          </div>
        </div>

        {/* Projects List */}
        <div className="flex-1 p-6">
          <div className="space-y-1">
            {filteredProjects.map((project) => {
              const mockStats = getMockStats(project.state);
              return (
                <div
                  key={project.id}
                  onClick={() => handleProjectClick(project.id)}
                  className="cursor-pointer"
                >
                  <GlowCard
                    glowColor="red"
                    customSize={true}
                    className="w-full h-auto bg-gray-900/50 border border-gray-800 hover:border-red-500/50 transition-all duration-200 p-3 flex flex-col gap-0"
                  >
                    <div className="flex items-center space-x-4">
                      {/* Video Thumbnail Placeholder */}
                      <div className="relative flex-shrink-0">
                        <div className="w-28 h-16 rounded-md overflow-hidden bg-gray-700 flex items-center justify-center">
                          <Play className="w-6 h-6 text-gray-400" />
                        </div>
                        <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-200 rounded-md">
                          <Play className="w-4 h-4 text-white" />
                        </div>
                      </div>

                      {/* Video Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div className="flex-1 min-w-0">
                            <h3 className="text-base font-bold text-white mb-1 truncate">
                              {project.title}
                            </h3>
                            <p className="text-sm text-gray-400 mb-2 line-clamp-2 leading-relaxed">
                              {project.metadata.description || project.ideas || 'No description available'}
                            </p>

                            {/* Stats Row */}
                            <div className="flex items-center space-x-3 text-xs text-gray-500">
                              <div className="flex items-center gap-1">
                                <Eye className="w-3 h-3" />
                                <span>{formatNumber(mockStats.views)}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <ThumbsUp className="w-3 h-3" />
                                <span>{formatNumber(mockStats.likes)}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <MessageSquare className="w-3 h-3" />
                                <span>{formatNumber(mockStats.comments)}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                <span>{formatWatchTime(mockStats.watchTime)}</span>
                              </div>
                            </div>
                          </div>

                          {/* Status Badge, Scheduled Date, and Delete Button */}
                          <div className="flex-shrink-0 ml-4 flex flex-col items-end">
                            <div className="flex items-center gap-2 mb-1">
                              <Badge className={`${getStateColor(project.state)} border text-xs`}>
                                {project.state}
                              </Badge>
                              <button
                                onClick={(e) => handleDeleteProject(project.id, e)}
                                className="p-1 text-gray-400 hover:text-red-400 transition-colors"
                                title="Delete project"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                            {project.state === 'Scheduled' && project.scheduledDate && (
                              <div className="text-xs text-gray-400">
                                {new Date(project.scheduledDate).toLocaleDateString('en-US', {
                                  month: 'short',
                                  day: 'numeric',
                                  hour: '2-digit',
                                  minute: '2-digit'
                                })}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </GlowCard>
                </div>
              );
            })}
          </div>

          {/* Empty State */}
          {filteredProjects.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="text-gray-400 text-center">
                <div className="text-6xl mb-4">📹</div>
                <h3 className="text-xl font-semibold mb-2">No videos found</h3>
                <p className="text-sm">
                  {searchQuery 
                    ? `No videos match your search "${searchQuery}"`
                    : selectedState === 'All' 
                      ? 'Create your first video to get started'
                      : `No videos in ${selectedState} state`
                  }
                </p>
                {!searchQuery && selectedState === 'All' && (
                  <GlowButton
                    glowColor="red"
                    leftIcon={<Plus className="w-4 h-4" />}
                    className="bg-red-600 hover:bg-red-700 rounded-lg px-6 h-10 mt-4"
                    onClick={handleAddNewVideo}
                  >
                    Add Your First Video
                  </GlowButton>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Click outside to close dropdown */}
      {filterOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setFilterOpen(false)}
        />
      )}

      {/* Add New Video Modal */}
      <AddNewVideoModal
        isOpen={showAddVideoModal}
        onClose={handleCloseModal}
        projectId={editingProjectId}
      />

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deleteProjectId} onOpenChange={() => setDeleteProjectId(null)}>
        <AlertDialogContent className="bg-gray-900 border-gray-700">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white">Delete Project</AlertDialogTitle>
            <AlertDialogDescription className="text-gray-400">
              Are you sure you want to delete this project? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel 
              onClick={cancelDeleteProject}
              className="bg-gray-700 text-white hover:bg-gray-600 border-gray-600"
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction 
              onClick={confirmDeleteProject}
              className="bg-red-600 text-white hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default PlanSchedulePage;
