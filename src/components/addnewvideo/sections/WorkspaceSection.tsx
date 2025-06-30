
import React, { useState, useRef } from 'react';
import { GlowCard } from '@/components/ui/spotlight-card';
import { GlowButton } from '@/components/ui/glow-button';
import { Upload, FileText, Play } from 'lucide-react';
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

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    onStoryboardFilesChange([...storyboardFiles, ...files]);
  };

  const removeFile = (index: number) => {
    const newFiles = storyboardFiles.filter((_, i) => i !== index);
    onStoryboardFilesChange(newFiles);
  };

  return (
    <>
      <div className="space-y-8 mb-8">
        {/* Ideation Section */}
        <GlowCard glowColor="blue" customSize className="w-full p-6">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-white">Ideation</h2>
            
            <textarea
              value={ideas}
              onChange={(e) => onIdeasChange(e.target.value)}
              placeholder="Brainstorm your video ideas here... What's the concept? Target audience? Key messages?"
              className="w-full min-h-[200px] bg-transparent border border-gray-600 rounded-lg p-4 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 resize-none"
            />

            {/* File Upload Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-white">Storyboard Files</h3>
              
              <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center hover:border-blue-500 transition-colors">
                <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-400 mb-2">Drop files here or click to upload</p>
                <input
                  type="file"
                  multiple
                  accept=".pdf,.jpg,.jpeg,.png,.gif"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="storyboard-upload"
                />
                <label htmlFor="storyboard-upload">
                  <GlowButton
                    glowColor="blue"
                    leftIcon={<Upload className="w-4 h-4" />}
                    className="bg-blue-600 hover:bg-blue-700 rounded-lg px-4 py-2"
                  >
                    Choose Files
                  </GlowButton>
                </label>
              </div>

              {/* File List */}
              {storyboardFiles.length > 0 && (
                <div className="space-y-2">
                  {storyboardFiles.map((file, index) => (
                    <div key={index} className="flex items-center justify-between bg-gray-800 rounded-lg p-3">
                      <div className="flex items-center space-x-3">
                        <FileText className="w-4 h-4 text-blue-400" />
                        <span className="text-white text-sm">{file.name}</span>
                      </div>
                      <button
                        onClick={() => removeFile(index)}
                        className="text-red-400 hover:text-red-300 text-sm"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
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
