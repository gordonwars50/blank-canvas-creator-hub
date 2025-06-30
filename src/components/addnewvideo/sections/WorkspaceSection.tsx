
import React, { useState, useRef } from 'react';
import { GlowCard } from '@/components/ui/spotlight-card';
import { GlowButton } from '@/components/ui/glow-button';
import { FileText, Play } from 'lucide-react';
import TeleprompterMode from '../teleprompter/TeleprompterMode';
import { TiptapEditor, TiptapEditorRef } from '@/components/ui/tiptap-editor';

interface WorkspaceSectionProps {
  ideas: string;
  script: string;
  storyboardFiles: File[];
  onIdeasChange: (value: string) => void;
  onScriptChange: (value: string) => void;
  onStoryboardFilesChange: (files: File[]) => void;
}

const WorkspaceSection: React.FC<WorkspaceSectionProps> = ({
  ideas,
  script,
  storyboardFiles,
  onIdeasChange,
  onScriptChange,
  onStoryboardFilesChange
}) => {
  const [showTeleprompter, setShowTeleprompter] = useState(false);
  const scriptEditorRef = useRef<TiptapEditorRef>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleIdeasChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onIdeasChange(e.target.value);
    
    // Auto-resize textarea
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  const exportToPDF = () => {
    // Create a new window for PDF export
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    // Clean script content for PDF (remove HTML tags for plain text)
    const cleanScript = script.replace(/<[^>]*>/g, '');
    
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Script Export</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              font-size: 16px;
              line-height: 1.6;
              margin: 40px;
              color: #000;
            }
            h1 {
              color: #333;
              border-bottom: 2px solid #333;
              padding-bottom: 10px;
            }
            .script-content {
              margin-top: 30px;
              white-space: pre-wrap;
            }
          </style>
        </head>
        <body>
          <h1>Video Script</h1>
          <div class="script-content">${cleanScript}</div>
        </body>
      </html>
    `);
    
    printWindow.document.close();
    printWindow.focus();
    
    // Trigger print dialog
    setTimeout(() => {
      printWindow.print();
    }, 250);
  };

  return (
    <>
      <div className="space-y-8 mb-8">
        {/* Ideation Section */}
        <GlowCard glowColor="blue" customSize className="w-full p-6">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-white">Ideation</h2>
            
            <textarea
              ref={textareaRef}
              value={ideas}
              onChange={handleIdeasChange}
              placeholder="Brainstorm your video ideas here... What's the concept? Target audience? Key messages?"
              className="w-full min-h-[200px] bg-transparent border border-gray-600 rounded-lg p-4 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 resize-none overflow-hidden"
              style={{ height: 'auto' }}
            />
          </div>
        </GlowCard>

        {/* Script Editor Section */}
        <GlowCard glowColor="purple" customSize className="w-full p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-white">Script Editor</h2>
              <div className="flex space-x-2">
                <GlowButton
                  glowColor="purple"
                  leftIcon={<FileText className="w-4 h-4" />}
                  onClick={exportToPDF}
                  className="bg-purple-600 hover:bg-purple-700 rounded-lg px-4 py-2"
                >
                  Export PDF
                </GlowButton>
                <GlowButton
                  glowColor="purple"
                  leftIcon={<Play className="w-4 h-4" />}
                  onClick={() => setShowTeleprompter(true)}
                  className="bg-purple-600 hover:bg-purple-700 rounded-lg px-4 py-2"
                >
                  Teleprompter
                </GlowButton>
              </div>
            </div>
            
            <TiptapEditor
              ref={scriptEditorRef}
              content={script}
              onChange={onScriptChange}
              placeholder="Write your script here... Use the toolbar to format text with bold, italic, underline, strikethrough, highlight, and links."
              glowColor="purple"
            />
          </div>
        </GlowCard>
      </div>

      {/* Teleprompter Mode */}
      {showTeleprompter && (
        <TeleprompterMode
          script={script}
          onClose={() => setShowTeleprompter(false)}
        />
      )}
    </>
  );
};

export default WorkspaceSection;
