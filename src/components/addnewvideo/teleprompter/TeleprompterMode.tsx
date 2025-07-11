
import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { GlowButton } from '@/components/ui/glow-button';
import { GlowCard } from '@/components/ui/spotlight-card';

interface TeleprompterModeProps {
  script: string;
  onClose: () => void;
}

const TeleprompterMode: React.FC<TeleprompterModeProps> = ({ script, onClose }) => {
  const [scrollSpeed, setScrollSpeed] = useState(50);
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

  // Process HTML content (simplified without color customization)
  const processFormattedText = (htmlContent: string) => {
    if (!htmlContent || htmlContent.trim() === '') {
      return 'No script content available. Add content in the script editor to see it here.';
    }
    
    return htmlContent;
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black">
      {/* Toolbar - At bottom center - Always visible */}
      <div className="absolute bottom-4 left-0 right-0 z-[101] p-4">
        <div className="max-w-4xl mx-auto">
          <GlowCard glowColor="blue" customSize className="w-full p-4 backdrop-blur-xl">
            <div className="flex items-center justify-between">
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

                {/* Start/Stop Button */}
                <GlowButton
                  glowColor={isScrolling ? "red" : "green"}
                  onClick={toggleScrolling}
                  leftIcon={isScrolling ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    isScrolling 
                      ? 'bg-red-600 hover:bg-red-700 text-white' 
                      : 'bg-green-600 hover:bg-green-700 text-white'
                  }`}
                >
                  {isScrolling ? 'Pause' : 'Start'}
                </GlowButton>
              </div>

              <div className="flex items-center space-x-2">
                {/* Close */}
                <GlowButton
                  glowColor="red"
                  onClick={onClose}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white transition-colors rounded-lg"
                >
                  Close Teleprompter
                </GlowButton>
              </div>
            </div>
          </GlowCard>
        </div>
      </div>

      {/* Script Content */}
      <div 
        ref={contentRef}
        className="h-full px-8 py-20 pb-32"
        style={{
          scrollBehavior: 'smooth',
          overflowY: 'auto',
          scrollbarWidth: 'none', /* Firefox */
          msOverflowStyle: 'none', /* Internet Explorer 10+ */
        }}
      >
        <style dangerouslySetInnerHTML={{
          __html: `
            .teleprompter-content::-webkit-scrollbar {
              display: none; /* Chrome, Safari, Opera */
            }
          `
        }} />
        <div className="max-w-4xl mx-auto teleprompter-content">
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
