import React from 'react';
import { X } from 'lucide-react';
interface ValidationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onFillMissingFields: () => void;
}
const ValidationDialog: React.FC<ValidationDialogProps> = ({
  isOpen,
  onClose,
  onFillMissingFields
}) => {
  if (!isOpen) return null;
  return <div className="fixed inset-0 z-[10001] flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      
      {/* Dialog */}
      <div className="relative border border-gray-700 rounded-lg shadow-2xl max-w-md w-full mx-4 p-6 animate-in fade-in-0 zoom-in-95 duration-200 bg-neutral-900">
        {/* Close button */}
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors">
          <X className="w-5 h-5" />
        </button>

        {/* Content */}
        <div className="space-y-4">
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-white">
              Complete Required Fields
            </h3>
            <p className="text-gray-300 text-sm">Please complete the required missing fields — Title, Description, and Schedule or Upload option — before finishing your project.</p>
          </div>

          {/* Action button */}
          <button onClick={onFillMissingFields} className="w-full text-white font-medium px-4 py-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-gray-900 bg-red-800 hover:bg-red-700">
            Fill Missing Fields
          </button>
        </div>
      </div>
    </div>;
};
export default ValidationDialog;