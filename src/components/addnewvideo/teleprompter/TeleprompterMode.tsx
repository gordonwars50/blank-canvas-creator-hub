
import React, { useState, useEffect, useRef } from 'react';
import { X, Settings, Palette, Minus } from 'lucide-react';
import { Slider } from '@/components/ui/slider';

interface TeleprompterModeProps {
  script: string;
  onClose: () => void;
}

const TeleprompterMode: React.FC<TeleprompterModeProps> = ({ script, onClose }) => {
  const [scrollSpeed, setScrollSpeed] = useState(50);
  const [highlightColor, setHighlightColor] = useState('#ef4444');
  const [showToolbar, setShowToolbar] = useState(true);
  const [isScrolling, setIsScrolling] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const scrollIntervalRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (isScrolling && contentRef.current) {
      scrollIntervalRef.current = setInterval(() => {
        if (contentRef.current) {
          contentRef.current.scrollTop += scrollSpeed / 10;
        }
      }, 100);
    } else if (scrollIntervalRef.current) {
      clearInterval(scrollIntervalRef.current);
    }

    return () => {
      if (scrollIntervalRef.current) {
        clearInterval(scrollIntervalRef.current);
      }
    };
  }, [isScrolling, scrollSpeed]);

  const toggleScrolling = () => {
    setIsScrolling(!isScrolling);
  };

  const highlightColors = [
    { name: 'Red', value: '#ef4444' },
    { name: 'Yellow', value: '#eab308' },
    { name: 'Green', value: '#22c55e' },
    { name: 'Blue', value: '#3b82f6' },
    { name: 'Purple', value: '#a855f7' }
  ];

  // Process HTML content and apply custom highlight color
  const processFormattedText = (htmlContent: string) => {
    if (!htmlContent || htmlContent.trim() === '') {
      return 'No script content available. Add content in the script editor to see it here.';
    }
    
    // Replace the default highlight color with the selected one
    const processedContent = htmlContent.replace(
      /bg-yellow-500/g,
      `bg-[${highlightColor}]`
    );
    
    return processedContent;
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black">
      {/* Toolbar */}
      {showToolbar && (
        <div className="absolute top-0 left-0 right-0 bg-gray-900/90 backdrop-blur-sm border-b border-gray-700 p-4 z-[101]">
          <div className="flex items-center justify-between max-w-4xl mx-auto">
            <div className="flex items-center space-x-6">
              {/* Scroll Speed Control */}
              <div className="flex items-center space-x-3">
                <span className="text-white text-sm">Speed:</span>
                <div className="w-32">
                  <Slider
                    value={[scrollSpeed]}
                    onValueChange={(value) => setScrollSpeed(value[0])}
                    max={100}
                    min={10}
                    step={5}
                    className="cursor-pointer"
                  />
                </div>
                <span className="text-gray-400 text-sm w-8">{scrollSpeed}</span>
              </div>

              {/* Highlight Color Picker */}
              <div className="flex items-center space-x-3">
                <span className="text-white text-sm">Color:</span>
                <div className="flex space-x-1">
                  {highlightColors.map((color) => (
                    <button
                      key={color.value}
                      onClick={() => setHighlightColor(color.value)}
                      className={`w-6 h-6 rounded-full border-2 transition-all ${
                        highlightColor === color.value 
                          ? 'border-white scale-110' 
                          : 'border-gray-600 hover:border-gray-400'
                      }`}
                      style={{ backgroundColor: color.value }}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>

              {/* Start/Stop Button */}
              <button
                onClick={toggleScrolling}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  isScrolling 
                    ? 'bg-red-600 hover:bg-red-700 text-white' 
                    : 'bg-green-600 hover:bg-green-700 text-white'
                }`}
              >
                {isScrolling ? 'Pause' : 'Start'}
              </button>
            </div>

            <div className="flex items-center space-x-2">
              {/* Minimize Toolbar */}
              <button
                onClick={() => setShowToolbar(false)}
                className="p-2 text-gray-400 hover:text-white transition-colors"
                title="Minimize toolbar"
              >
                <Minus className="w-4 h-4" />
              </button>

              {/* Close */}
              <button
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-white transition-colors"
                title="Close teleprompter"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Edit Button (when toolbar is hidden) */}
      {!showToolbar && (
        <button
          onClick={() => setShowToolbar(true)}
          className="fixed top-4 right-4 z-[101] p-3 bg-gray-900/80 hover:bg-gray-800 rounded-full text-white transition-colors"
          title="Show toolbar"
        >
          <Settings className="w-5 h-5" />
        </button>
      )}

      {/* Script Content */}
      <div 
        ref={contentRef}
        className={`h-full overflow-y-auto px-8 py-20 ${showToolbar ? 'pt-28' : 'pt-20'}`}
        style={{
          scrollBehavior: 'smooth'
        }}
      >
        <div className="max-w-4xl mx-auto">
          <div 
            className="text-white leading-relaxed text-2xl md:text-3xl lg:text-4xl prose prose-invert max-w-none"
            style={{
              textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
              lineHeight: '1.6'
            }}
            dangerouslySetInnerHTML={{ __html: processFormattedText(script) }}
          />
        </div>
      </div>

      {/* Keyboard shortcuts info */}
      <div className="absolute bottom-4 left-4 text-gray-500 text-sm">
        <p>Press ESC to close • Space to start/pause</p>
      </div>

      {/* Keyboard event handlers */}
      <div
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Escape') {
            onClose();
          } else if (e.key === ' ' || e.key === 'Spacebar') {
            e.preventDefault();
            toggleScrolling();
          }
        }}
        className="absolute inset-0 outline-none"
      />
    </div>
  );
};

export default TeleprompterMode;
