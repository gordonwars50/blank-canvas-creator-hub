
import React from 'react';
import ScheduleSection from './sections/ScheduleSection';
import MetadataSection from './sections/MetadataSection';

interface SchedulePageProps {
  formData: any;
  onChange: (data: any) => void;
  metadataSectionRef?: React.RefObject<HTMLDivElement>;
  scheduleSectionRef?: React.RefObject<HTMLDivElement>;
}

const SchedulePage: React.FC<SchedulePageProps> = ({
  formData,
  onChange,
  metadataSectionRef,
  scheduleSectionRef
}) => {
  const updateFormData = (field: string, value: any) => {
    console.log('SchedulePage - updateFormData called with field:', field, 'value:', value);
    const newData = {
      ...formData,
      [field]: value
    };
    console.log('SchedulePage - calling onChange with newData:', newData);
    onChange(newData);
  };

  const updateMetadata = (metadata: any) => {
    const newData = {
      ...formData,
      metadata: {
        ...formData.metadata,
        ...metadata
      }
    };
    onChange(newData);
  };

  return (
    <div className="min-h-screen bg-black p-6 space-y-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Schedule</h1>
          <p className="text-gray-400">Generate AI-powered metadata and schedule your video release</p>
        </div>

        {/* Metadata Section */}
        <div ref={metadataSectionRef}>
          <MetadataSection
            metadata={formData.metadata}
            hasScript={formData.script && formData.script.trim() !== ''}
            onMetadataChange={updateMetadata}
          />
        </div>

        {/* Gap between sections */}
        <div className="h-12"></div>

        {/* Schedule Section */}
        <div ref={scheduleSectionRef}>
          <ScheduleSection
            scheduledDate={formData.scheduledDate}
            scheduledTime={formData.scheduledTime}
            uploadNow={formData.uploadNow}
            selectedMode={formData.selectedMode}
            onScheduledDateChange={(date) => updateFormData('scheduledDate', date)}
            onScheduledTimeChange={(time) => updateFormData('scheduledTime', time)}
            onUploadNowChange={(uploadNow) => updateFormData('uploadNow', uploadNow)}
            onModeChange={(mode) => updateFormData('selectedMode', mode)}
          />
        </div>
      </div>
    </div>
  );
};

export default SchedulePage;
