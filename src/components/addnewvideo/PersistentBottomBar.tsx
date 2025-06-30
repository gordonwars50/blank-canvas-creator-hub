
import React from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { GlowButton } from '@/components/ui/glow-button';

interface PersistentBottomBarProps {
  currentStep?: 'plan' | 'schedule';
  isFormValid: boolean;
  onBack: () => void;
  onSave: () => void;
  onNext?: () => void;
}

const PersistentBottomBar: React.FC<PersistentBottomBarProps> = ({
  currentStep = 'plan',
  isFormValid,
  onBack,
  onSave,
  onNext
}) => {
  const getNextButtonText = () => {
    if (currentStep === 'plan') return 'Next';
    if (currentStep === 'schedule') return 'Finish';
    return 'Next';
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900/95 backdrop-blur-sm border-t border-gray-800 p-4 z-[55]">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <GlowButton
          glowColor="red"
          leftIcon={<ArrowLeft className="w-4 h-4" />}
          onClick={onBack}
          className="bg-gray-800 hover:bg-gray-700 rounded-lg px-6 h-10"
        >
          Back
        </GlowButton>

        <div className="flex items-center gap-3">
          {/* Only show Save button on plan page */}
          {currentStep === 'plan' && (
            <GlowButton
              glowColor="red"
              onClick={onSave}
              disabled={!isFormValid}
              className={`rounded-lg px-6 h-10 ${
                isFormValid 
                  ? 'bg-red-600 hover:bg-red-700' 
                  : 'bg-gray-600 cursor-not-allowed opacity-50'
              }`}
            >
              Save Project
            </GlowButton>
          )}

          {onNext && (
            <div className="flex items-center gap-3">
              {currentStep === 'schedule' && (
                <p className="text-sm text-gray-400">
                  Project will be completed when you click finish
                </p>
              )}
              <GlowButton
                glowColor="red"
                rightIcon={<ArrowRight className="w-4 h-4" />}
                onClick={onNext}
                disabled={!isFormValid}
                className={`rounded-lg px-8 h-10 ${
                  isFormValid 
                    ? 'bg-red-600 hover:bg-red-700' 
                    : 'bg-gray-600 cursor-not-allowed opacity-50'
                }`}
              >
                {getNextButtonText()}
              </GlowButton>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PersistentBottomBar;
