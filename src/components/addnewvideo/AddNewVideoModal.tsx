import React, { useState, useRef, useEffect } from 'react';
import { X } from 'lucide-react';
import PlanningShootingPage from './PlanningShootingPage';
import SchedulePage from './SchedulePage';
import ProjectOverview from './ProjectOverview';
import PersistentBottomBar from './PersistentBottomBar';
import ValidationDialog from '@/components/ui/validation-dialog';
import { useProjectManagement } from '@/hooks/useProjectManagement';
import { useToast } from '@/components/ui/use-toast';

interface AddNewVideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectId?: string;
}

const AddNewVideoModal: React.FC<AddNewVideoModalProps> = ({ isOpen, onClose, projectId }) => {
  const [currentStep, setCurrentStep] = useState<'plan' | 'schedule' | 'overview'>('plan');
  const [showValidationDialog, setShowValidationDialog] = useState(false);
  const [missingFields, setMissingFields] = useState<string[]>([]);
  const [currentProjectId, setCurrentProjectId] = useState<string | null>(projectId || null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const metadataSectionRef = useRef<HTMLDivElement>(null);
  const scheduleSectionRef = useRef<HTMLDivElement>(null);
  
  const { saveProject, getProject } = useProjectManagement();
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    title: '',
    ideas: '',
    script: '',
    storyboardFiles: [] as File[],
    scenes: [] as Array<{
      id: string;
      name: string;
      tags: string[];
      shots: Array<{
        id: string;
        name: string;
      }>;
    }>,
    teamAssignments: {
      scriptwriter: [] as string[],
      storyboardArtist: [] as string[],
      researcher: [] as string[],
      director: [] as string[],
      videoEditor: [] as string[],
      thumbnailDesigner: [] as string[],
      videographer: [] as string[],
      insightsLead: [] as string[]
    },
    scheduledDate: null as Date | null,
    scheduledTime: '',
    uploadNow: false,
    selectedMode: 'schedule' as 'schedule' | 'upload',
    metadata: {
      title: '',
      description: '',
      tags: []
    }
  });

  const [isFormValid, setIsFormValid] = useState(false);

  // Load existing project data if editing
  useEffect(() => {
    if (projectId && isOpen) {
      const existingProject = getProject(projectId);
      if (existingProject) {
        setFormData({
          title: existingProject.title,
          ideas: existingProject.ideas,
          script: existingProject.script,
          storyboardFiles: [], // Can't restore File objects from serialized data
          scenes: existingProject.scenes,
          teamAssignments: existingProject.teamAssignments,
          scheduledDate: existingProject.scheduledDate ? new Date(existingProject.scheduledDate) : null,
          scheduledTime: existingProject.scheduledTime || '',
          uploadNow: existingProject.uploadNow || false,
          selectedMode: existingProject.selectedMode || 'schedule',
          metadata: existingProject.metadata
        });
        setCurrentProjectId(existingProject.id);
      }
    }
  }, [projectId, isOpen, getProject]);

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      setCurrentStep('plan');
      setCurrentProjectId(projectId || null);
      if (!projectId) {
        setFormData({
          title: '',
          ideas: '',
          script: '',
          storyboardFiles: [],
          scenes: [],
          teamAssignments: {
            scriptwriter: [],
            storyboardArtist: [],
            researcher: [],
            director: [],
            videoEditor: [],
            thumbnailDesigner: [],
            videographer: [],
            insightsLead: []
          },
          scheduledDate: null,
          scheduledTime: '',
          uploadNow: false,
          selectedMode: 'schedule',
          metadata: {
            title: '',
            description: '',
            tags: []
          }
        });
      }
    }
  }, [isOpen, projectId]);

  const scrollToTop = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  };

  const validateSchedulePage = () => {
    const missing: string[] = [];
    
    if (!formData.metadata.title || formData.metadata.title.trim() === '') {
      missing.push('title');
    }
    
    if (!formData.metadata.description || formData.metadata.description.trim() === '') {
      missing.push('description');
    }
    
    const hasSchedule = formData.scheduledDate && formData.scheduledTime;
    const hasUploadNow = formData.uploadNow;
    
    if (!hasSchedule && !hasUploadNow) {
      missing.push('schedule');
    }
    
    return missing;
  };

  const scrollToMissingSection = (missingFields: string[]) => {
    if (missingFields.includes('title') || missingFields.includes('description')) {
      if (metadataSectionRef.current) {
        metadataSectionRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    } else if (missingFields.includes('schedule')) {
      if (scheduleSectionRef.current) {
        scheduleSectionRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
  };

  const handleFormChange = (newData: any) => {
    console.log('AddNewVideoModal - handleFormChange called with:', newData);
    console.log('AddNewVideoModal - Old selectedMode:', formData.selectedMode, 'New selectedMode:', newData.selectedMode);
    
    setFormData(newData);
    
    // Check if at least one required field is filled
    const hasTitle = newData.title && newData.title.trim() !== '';
    const hasIdeas = newData.ideas && newData.ideas.trim() !== '';
    const hasScript = newData.script && newData.script.trim() !== '';
    const hasStoryboardFiles = newData.storyboardFiles && newData.storyboardFiles.length > 0;
    const hasShotLog = newData.scenes && newData.scenes.length > 0;
    
    // Check if any team assignment has at least one member
    const hasTeamAssignments = Object.values(newData.teamAssignments).some(
      (assignments: any) => Array.isArray(assignments) && assignments.length > 0
    );
    
    const isValid = hasTitle || hasIdeas || hasScript || hasStoryboardFiles || hasShotLog || hasTeamAssignments;
    setIsFormValid(isValid);
  };

  const handleSave = () => {
    try {
      const projectData = {
        id: currentProjectId,
        title: formData.title,
        ideas: formData.ideas,
        script: formData.script,
        storyboardFiles: formData.storyboardFiles,
        scenes: formData.scenes,
        teamAssignments: formData.teamAssignments,
        scheduledDate: formData.scheduledDate?.toISOString(),
        scheduledTime: formData.scheduledTime,
        uploadNow: formData.uploadNow,
        selectedMode: formData.selectedMode,
        metadata: formData.metadata,
        state: 'Planning' as const
      };

      console.log('Saving project data:', projectData);
      const savedProject = saveProject(projectData);
      setCurrentProjectId(savedProject.id);
      
      toast({
        title: "Project Saved",
        description: "Your project has been saved successfully.",
      });
      
      console.log('Project saved successfully:', savedProject);
    } catch (error) {
      console.error('Error saving project:', error);
      toast({
        title: "Error",
        description: "Failed to save project. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleNext = () => {
    if (currentStep === 'plan') {
      setCurrentStep('schedule');
      scrollToTop();
    } else if (currentStep === 'schedule') {
      // Validate schedule page before proceeding
      const missing = validateSchedulePage();
      if (missing.length > 0) {
        setMissingFields(missing);
        setShowValidationDialog(true);
        return;
      }
      setCurrentStep('overview');
      scrollToTop();
    } else {
      // Finish from overview page - save completed project
      try {
        const completedProjectData = {
          id: currentProjectId,
          title: formData.title,
          ideas: formData.ideas,
          script: formData.script,
          storyboardFiles: formData.storyboardFiles,
          scenes: formData.scenes,
          teamAssignments: formData.teamAssignments,
          scheduledDate: formData.scheduledDate?.toISOString(),
          scheduledTime: formData.scheduledTime,
          uploadNow: formData.uploadNow,
          selectedMode: formData.selectedMode,
          metadata: formData.metadata,
          state: formData.selectedMode === 'schedule' ? 'Scheduled' : 'Production'
        };

        console.log('Completing project:', completedProjectData);
        saveProject(completedProjectData);
        
        toast({
          title: "Project Completed",
          description: "Your project has been completed and saved.",
        });
        
        onClose();
      } catch (error) {
        console.error('Error completing project:', error);
        toast({
          title: "Error",
          description: "Failed to complete project. Please try again.",
          variant: "destructive",
        });
      }
    }
  };

  const handleBack = () => {
    if (currentStep === 'overview') {
      setCurrentStep('schedule');
      scrollToTop();
    } else if (currentStep === 'schedule') {
      setCurrentStep('plan');
      scrollToTop();
    } else {
      onClose();
    }
  };

  const handleEdit = () => {
    setCurrentStep('plan');
    scrollToTop();
  };

  const handleStateChange = (newState: 'Planning' | 'Production') => {
    console.log('State changed to:', newState);
  };

  const handleValidationDialogClose = () => {
    setShowValidationDialog(false);
    scrollToMissingSection(missingFields);
  };

  // Convert formData to project format for overview
  const projectForOverview = {
    id: currentProjectId || 'new',
    title: formData.title || 'Untitled Project',
    state: 'Planning' as const,
    description: formData.metadata.description,
    tags: formData.metadata.tags,
    script: formData.script,
    ideas: formData.ideas,
    scheduledDate: formData.scheduledDate?.toISOString(),
    storyboardFiles: formData.storyboardFiles.map(file => ({
      name: file.name,
      url: URL.createObjectURL(file)
    })),
    scenes: formData.scenes,
    teamAssignments: formData.teamAssignments
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 bg-black overflow-hidden">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-[60] text-gray-400 hover:text-white transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="flex flex-col h-full w-full">
          <div 
            ref={scrollContainerRef}
            className="flex-1 overflow-y-auto pb-20 scrollbar-hide w-full"
          >
            {currentStep === 'plan' ? (
              <PlanningShootingPage 
                formData={formData}
                onChange={handleFormChange}
              />
            ) : currentStep === 'schedule' ? (
              <SchedulePage
                formData={formData}
                onChange={handleFormChange}
                metadataSectionRef={metadataSectionRef}
                scheduleSectionRef={scheduleSectionRef}
              />
            ) : (
              <ProjectOverview
                project={projectForOverview}
                onEdit={handleEdit}
                onStateChange={handleStateChange}
              />
            )}
          </div>

          {currentStep !== 'overview' && (
            <PersistentBottomBar
              currentStep={currentStep}
              isFormValid={isFormValid}
              onBack={handleBack}
              onSave={handleSave}
              onNext={handleNext}
            />
          )}
        </div>
      </div>

      <ValidationDialog
        isOpen={showValidationDialog}
        onClose={() => setShowValidationDialog(false)}
        onFillMissingFields={handleValidationDialogClose}
      />
    </>
  );
};

export default AddNewVideoModal;
