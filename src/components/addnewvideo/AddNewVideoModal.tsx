import React, { useState, useRef } from 'react';
import { X } from 'lucide-react';
import PlanningShootingPage from './PlanningShootingPage';
import SchedulePage from './SchedulePage';
import ProjectOverview from './ProjectOverview';
import PersistentBottomBar from './PersistentBottomBar';
import ValidationDialog from '@/components/ui/validation-dialog';

interface AddNewVideoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddNewVideoModal: React.FC<AddNewVideoModalProps> = ({ isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState<'plan' | 'schedule' | 'overview'>('plan');
  const [showValidationDialog, setShowValidationDialog] = useState(false);
  const [missingFields, setMissingFields] = useState<string[]>([]);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const metadataSectionRef = useRef<HTMLDivElement>(null);
  const scheduleSectionRef = useRef<HTMLDivElement>(null);

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
    
    // Check if title is filled
    if (!formData.metadata.title || formData.metadata.title.trim() === '') {
      missing.push('title');
    }
    
    // Check if description is filled
    if (!formData.metadata.description || formData.metadata.description.trim() === '') {
      missing.push('description');
    }
    
    // Check if either scheduled date/time is set OR upload now is selected
    const hasSchedule = formData.scheduledDate && formData.scheduledTime;
    const hasUploadNow = formData.uploadNow;
    
    if (!hasSchedule && !hasUploadNow) {
      missing.push('schedule');
    }
    
    return missing;
  };

  const scrollToMissingSection = (missingFields: string[]) => {
    // If title or description is missing, scroll to metadata section
    if (missingFields.includes('title') || missingFields.includes('description')) {
      if (metadataSectionRef.current) {
        metadataSectionRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    } else if (missingFields.includes('schedule')) {
      // If only schedule is missing, scroll to schedule section
      if (scheduleSectionRef.current) {
        scheduleSectionRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
  };

  const handleFormChange = (newData: any) => {
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
    console.log('Saving project:', formData);
    // TODO: Implement save logic
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
      // Close from overview page
      onClose();
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
    // Navigate back to planning page from overview
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
    id: 'new',
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
      <div className="fixed inset-0 z-[9999] bg-black">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-[10000] text-gray-400 hover:text-white transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Main content */}
        <div className="flex flex-col h-full">
          <div 
            ref={scrollContainerRef}
            className="flex-1 overflow-y-auto pb-20 scrollbar-hide"
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

      {/* Custom Validation Dialog */}
      <ValidationDialog
        isOpen={showValidationDialog}
        onClose={() => setShowValidationDialog(false)}
        onFillMissingFields={handleValidationDialogClose}
      />
    </>
  );
};

export default AddNewVideoModal;
