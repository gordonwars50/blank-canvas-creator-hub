import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { GlowCard } from '@/components/ui/spotlight-card';
import { GlowButton } from '@/components/ui/glow-button';
import { Button } from '@/components/ui/button';
import { Edit, Download, Monitor, Calendar, Users, FileText, Lightbulb, Video } from 'lucide-react';
import TeleprompterMode from './teleprompter/TeleprompterMode';

interface ProjectOverviewProps {
  project: {
    id: string;
    title: string;
    state: 'Planning' | 'Production' | 'Scheduled' | 'Uploaded';
    description?: string;
    tags: string[];
    script: string;
    ideas: string;
    scheduledDate?: string;
    uploadedAt?: string;
    storyboardFiles: Array<{ name: string; url: string }>;
    scenes: Array<{
      id: string;
      name: string;
      tags: string[];
      shots: Array<{
        id: string;
        name: string;
      }>;
    }>;
    teamAssignments: {
      [key: string]: string[];
    };
  };
  onEdit: () => void;
  onStateChange: (newState: 'Planning' | 'Production') => void;
}

const getStateColor = (state: string) => {
  switch (state) {
    case 'Planning':
      return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50';
    case 'Production':
      return 'bg-blue-500/20 text-blue-400 border-blue-500/50';
    case 'Scheduled':
      return 'bg-purple-500/20 text-purple-400 border-purple-500/50';
    case 'Uploaded':
      return 'bg-green-500/20 text-green-400 border-green-500/50';
    default:
      return 'bg-gray-500/20 text-gray-400 border-gray-500/50';
  }
};

const getStateEmoji = (state: string) => {
  switch (state) {
    case 'Planning': return '🟡';
    case 'Production': return '🛠';
    case 'Scheduled': return '🗓';
    case 'Uploaded': return '✅';
    default: return '⚪';
  }
};

const ProjectOverview: React.FC<ProjectOverviewProps> = ({
  project,
  onEdit,
  onStateChange
}) => {
  const [showTeleprompter, setShowTeleprompter] = useState(false);
  const [currentState, setCurrentState] = useState(project.state);

  const canEdit = currentState !== 'Uploaded';
  const canToggleState = currentState === 'Planning' || currentState === 'Production';

  const handleStateToggle = () => {
    const newState = currentState === 'Planning' ? 'Production' : 'Planning';
    setCurrentState(newState);
    onStateChange(newState);
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Not scheduled';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const teamRoleLabels: { [key: string]: string } = {
    scriptwriter: 'Scriptwriter',
    storyboardArtist: 'Storyboard Artist',
    researcher: 'Researcher',
    director: 'Director',
    videoEditor: 'Video Editor',
    thumbnailDesigner: 'Thumbnail Designer',
    videographer: 'Videographer',
    insightsLead: 'Insights Lead'
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold text-white">{project.title}</h1>
            <span className="text-sm text-gray-400 font-mono bg-gray-800 px-3 py-1 rounded-lg">
              ID: {project.id}
            </span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-lg">{getStateEmoji(currentState)}</span>
              <Badge className={`${getStateColor(currentState)} border text-sm`}>
                {currentState}
              </Badge>
              {canToggleState && (
                <GlowButton
                  glowColor="blue"
                  onClick={handleStateToggle}
                  className="bg-blue-600 hover:bg-blue-700 rounded-lg px-3 py-1 text-xs"
                >
                  Switch to {currentState === 'Planning' ? 'Production' : 'Planning'}
                </GlowButton>
              )}
            </div>
          </div>
        </div>
        
        {canEdit && (
          <GlowButton
            glowColor="red"
            leftIcon={<Edit className="w-4 h-4" />}
            onClick={onEdit}
            className="bg-red-600 hover:bg-red-700 rounded-lg px-4"
          >
            Edit Project
          </GlowButton>
        )}
      </div>

      {/* Project Summary */}
      <GlowCard glowColor="blue" customSize className="w-full p-6 bg-gray-900/50">
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <FileText className="w-5 h-5 text-blue-400" />
            <h2 className="text-xl font-semibold text-white">Project Summary</h2>
          </div>
          
          {project.description && (
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-gray-300">Description</h3>
              <p className="text-gray-200 leading-relaxed">{project.description}</p>
            </div>
          )}
          
          {project.tags.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-gray-300">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary" className="bg-gray-700 text-gray-200">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      </GlowCard>

      {/* Schedule Info */}
      <GlowCard glowColor="purple" customSize className="w-full p-6 bg-gray-900/50">
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="w-5 h-5 text-purple-400" />
            <h2 className="text-xl font-semibold text-white">Schedule Information</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium text-gray-300 mb-1">Scheduled Date</h3>
              <p className="text-gray-200">{formatDate(project.scheduledDate)}</p>
            </div>
            
            {project.uploadedAt && (
              <div>
                <h3 className="text-sm font-medium text-gray-300 mb-1">Uploaded At</h3>
                <p className="text-gray-200">{formatDate(project.uploadedAt)}</p>
              </div>
            )}
          </div>
        </div>
      </GlowCard>

      {/* Team Overview */}
      <GlowCard glowColor="green" customSize className="w-full p-6 bg-gray-900/50">
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <Users className="w-5 h-5 text-green-400" />
            <h2 className="text-xl font-semibold text-white">Team Overview</h2>
          </div>
          
          <div className="space-y-3">
            {Object.entries(project.teamAssignments)
              .filter(([_, members]) => members.length > 0)
              .map(([role, members]) => (
                <div key={role} className="flex items-center justify-between py-2 border-b border-gray-700 last:border-b-0">
                  <span className="text-gray-300 font-medium">{teamRoleLabels[role] || role}</span>
                  <div className="flex flex-wrap gap-1">
                    {members.map((member, index) => (
                      <Badge key={index} variant="outline" className="text-xs border-gray-600 text-gray-200">
                        {member}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </GlowCard>

      {/* Script */}
      {project.script && (
        <GlowCard glowColor="orange" customSize className="w-full p-6 bg-gray-900/50">
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-orange-400" />
                <h2 className="text-xl font-semibold text-white">Script</h2>
              </div>
              <GlowButton
                glowColor="orange"
                leftIcon={<Monitor className="w-4 h-4" />}
                onClick={() => setShowTeleprompter(true)}
                className="bg-orange-600 hover:bg-orange-700 rounded-lg px-4"
              >
                Use as Teleprompter
              </GlowButton>
            </div>
            
            <div className="bg-gray-800/50 rounded-lg p-4 max-h-64 overflow-y-auto">
              <pre className="text-gray-200 whitespace-pre-wrap font-mono text-sm leading-relaxed">
                {project.script}
              </pre>
            </div>
          </div>
        </GlowCard>
      )}

      {/* Ideas & Storyboards */}
      <GlowCard glowColor="orange" customSize className="w-full p-6 bg-gray-900/50">
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <Lightbulb className="w-5 h-5 text-orange-400" />
            <h2 className="text-xl font-semibold text-white">Ideas & Storyboards</h2>
          </div>
          
          {project.ideas && (
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-gray-300">Ideas</h3>
              <p className="text-gray-200 leading-relaxed">{project.ideas}</p>
            </div>
          )}
          
          {project.storyboardFiles.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-gray-300">Storyboard Files</h3>
              <div className="space-y-2">
                {project.storyboardFiles.map((file, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                    <span className="text-gray-200 text-sm">{file.name}</span>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-xs border-gray-600 text-gray-300 hover:bg-gray-700"
                    >
                      <Download className="w-3 h-3 mr-1" />
                      Download
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </GlowCard>

      {/* Scenes & Shots */}
      {project.scenes.length > 0 && (
        <GlowCard glowColor="red" customSize className="w-full p-6 bg-gray-900/50">
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <Video className="w-5 h-5 text-red-400" />
              <h2 className="text-xl font-semibold text-white">Scenes & Shots</h2>
            </div>
            
            <div className="space-y-4">
              {project.scenes.map((scene) => (
                <div key={scene.id} className="border border-gray-700 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-medium text-white">{scene.name}</h3>
                    <div className="flex flex-wrap gap-1">
                      {scene.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary" className="text-xs bg-gray-700 text-gray-200">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    <h4 className="text-sm font-medium text-gray-300 mb-2">Shots:</h4>
                    {scene.shots.map((shot) => (
                      <div key={shot.id} className="text-sm text-gray-200 pl-4 border-l-2 border-gray-600">
                        {shot.name}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </GlowCard>
      )}

      {/* Teleprompter Modal */}
      {showTeleprompter && (
        <TeleprompterMode
          script={project.script}
          onClose={() => setShowTeleprompter(false)}
        />
      )}
    </div>
  );
};

export default ProjectOverview;
