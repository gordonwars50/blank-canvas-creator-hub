import React from 'react';
import TitleSection from './sections/TitleSection';
import WorkspaceSection from './sections/WorkspaceSection';
import ShotLoggingSection from './sections/ShotLoggingSection';
import TeamAssignmentSection from './sections/TeamAssignmentSection';
interface PlanningShootingPageProps {
  formData: any;
  onChange: (data: any) => void;
}
const PlanningShootingPage: React.FC<PlanningShootingPageProps> = ({
  formData,
  onChange
}) => {
  const updateFormData = (field: string, value: any) => {
    const newData = {
      ...formData,
      [field]: value
    };
    onChange(newData);
  };
  return <div className="min-h-screen bg-black p-6 space-y-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Plan &amp; Shoot</h1>
          <p className="text-gray-400">Create your next video project with comprehensive planning tools</p>
        </div>

        {/* Title Section */}
        <TitleSection value={formData.title} onChange={value => updateFormData('title', value)} />

        {/* Dual-Column Workspace */}
        <WorkspaceSection ideas={formData.ideas} script={formData.script} storyboardFiles={formData.storyboardFiles} onIdeasChange={value => updateFormData('ideas', value)} onScriptChange={value => updateFormData('script', value)} onStoryboardFilesChange={files => updateFormData('storyboardFiles', files)} />

        {/* Shot Logging Section */}
        <ShotLoggingSection scenes={formData.scenes} onChange={scenes => updateFormData('scenes', scenes)} />

        {/* Team Assignment Section */}
        <TeamAssignmentSection teamAssignments={formData.teamAssignments} onChange={assignments => updateFormData('teamAssignments', assignments)} />
      </div>
    </div>;
};
export default PlanningShootingPage;