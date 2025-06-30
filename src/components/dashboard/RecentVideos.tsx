import React from 'react';
import { motion } from 'framer-motion';
import { Eye, ThumbsUp, MessageCircle, Calendar, TrendingUp, Award, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { GlowCard } from '@/components/ui/spotlight-card';
import { GlowButton } from '@/components/ui/glow-button';
import { AvatarGroupWithTooltips } from '@/components/ui/avatar-group-with-tooltip';
import { useProjectManagement } from '@/hooks/useProjectManagement';

interface Video {
  id: string;
  title: string;
  thumbnail: string;
  views: number;
  likes: number;
  comments: number;
  publishDate: string;
  status: 'published' | 'scheduled' | 'draft';
  engagementRate?: number;
  teamMembers?: Array<{
    name: string;
    initials: string;
    avatar?: string;
  }>;
}

const RecentVideos: React.FC = () => {
  const { projects, loading } = useProjectManagement();

  // Generate mock team members for each project
  const generateTeamMembers = (projectId: string) => {
    const teamPool = [
      { name: "John Doe", initials: "JD", avatar: "https://randomuser.me/api/portraits/men/32.jpg" },
      { name: "Sarah Smith", initials: "SS", avatar: "https://randomuser.me/api/portraits/women/44.jpg" },
      { name: "Alex Wong", initials: "AW", avatar: "https://randomuser.me/api/portraits/men/91.jpg" },
      { name: "Emma Johnson", initials: "EJ", avatar: "https://randomuser.me/api/portraits/women/17.jpg" },
      { name: "Mike Chen", initials: "MC", avatar: "https://randomuser.me/api/portraits/men/15.jpg" },
      { name: "Lisa Park", initials: "LP", avatar: "https://randomuser.me/api/portraits/women/25.jpg" },
    ];
    
    // Use project ID to deterministically select team members
    const hash = projectId.split('').reduce((a, b) => a + b.charCodeAt(0), 0);
    const memberCount = 2 + (hash % 4); // 2-5 members
    const shuffled = [...teamPool].sort(() => hash % 2 - 0.5);
    return shuffled.slice(0, memberCount);
  };

  // Transform project data to video data format
  const videos: Video[] = projects.map(project => ({
    id: project.id,
    title: project.metadata.title || project.title,
    thumbnail: '/placeholder.svg',
    views: project.state === 'Uploaded' ? Math.floor(Math.random() * 50000) : 0,
    likes: project.state === 'Uploaded' ? Math.floor(Math.random() * 2000) : 0,
    comments: project.state === 'Uploaded' ? Math.floor(Math.random() * 200) : 0,
    publishDate: project.scheduledDate || project.updatedAt.split('T')[0],
    status: project.state === 'Uploaded' ? 'published' : 
             project.state === 'Scheduled' ? 'scheduled' : 'draft',
    engagementRate: project.state === 'Uploaded' ? 
      Math.random() * 2 + 1 : 0,
    teamMembers: generateTeamMembers(project.id)
  }));

  const getStatusColor = (status: Video['status']) => {
    switch (status) {
      case 'published': return 'text-green-400 bg-green-400/20';
      case 'scheduled': return 'text-yellow-400 bg-yellow-400/20';
      case 'draft': return 'text-gray-400 bg-gray-400/20';
    }
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <GlowCard 
          glowColor="red" 
          customSize={true}
          className="bg-gray-950 border border-gray-900 rounded-lg p-6 w-full h-auto aspect-auto grid-rows-none gap-0"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-white">Recent Videos</h2>
            <Link to="/dashboard/plan-schedule">
              <GlowButton glowColor="red" className="px-4 py-2">
                <Plus className="w-4 h-4 mr-2" />
                Add New Video
              </GlowButton>
            </Link>
          </div>
          <div className="animate-pulse grid grid-cols-1 md:grid-cols-2 gap-4">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="flex items-center space-x-4 p-3">
                <div className="w-24 h-16 bg-gray-800 rounded"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-800 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-800 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        </GlowCard>
      </motion.div>
    );
  }

  if (videos.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <GlowCard 
          glowColor="red" 
          customSize={true}
          className="bg-gray-950 border border-gray-900 rounded-lg p-6 w-full h-auto aspect-auto grid-rows-none gap-0"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-white">Recent Videos</h2>
            <Link to="/dashboard/plan-schedule">
              <GlowButton glowColor="red" className="px-4 py-2">
                <Plus className="w-4 h-4 mr-2" />
                Add New Video
              </GlowButton>
            </Link>
          </div>
          <div className="text-center py-8 text-gray-500">
            <p className="text-sm">No videos yet. Create your first project to get started!</p>
          </div>
        </GlowCard>
      </motion.div>
    );
  }

  // Find the top performing video based on engagement rate
  const publishedVideos = videos.filter(video => video.status === 'published');
  const topPerformer = publishedVideos.length > 0 ? 
    publishedVideos.reduce((prev, current) => 
      (prev.engagementRate || 0) > (current.engagementRate || 0) ? prev : current
    ) : null;

  // Get remaining videos excluding the top performer
  const otherVideos = topPerformer ? 
    videos.filter(video => video.id !== topPerformer.id) : 
    videos;

  // Determine if we need special layout for odd number of videos
  const isOddCount = otherVideos.length % 2 !== 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <GlowCard 
        glowColor="red" 
        customSize={true}
        className="bg-gray-950 border border-gray-900 rounded-lg p-6 w-full h-auto aspect-auto grid-rows-none gap-0"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-white">Recent Videos</h2>
          <Link to="/dashboard/plan-schedule">
            <GlowButton glowColor="red" className="px-4 py-2">
              <Plus className="w-4 h-4 mr-2" />
              Add New Video
            </GlowButton>
          </Link>
        </div>

        {/* Top Performer Section - Keep existing full width layout */}
        {topPerformer && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.5 }}
            className="mb-6 p-4 rounded-xl bg-gradient-to-r from-red-500/20 to-orange-500/20 border border-red-500/30 relative overflow-hidden"
          >
            <div className="flex items-center gap-2 mb-3">
              <Award className="w-5 h-5 text-yellow-400" />
              <span className="text-sm font-medium text-yellow-400">Top Performer</span>
              <div className="flex items-center gap-1 text-xs text-green-400">
                <TrendingUp className="w-3 h-3" />
                <span>{topPerformer.engagementRate?.toFixed(1)}% engagement</span>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <img
                src={topPerformer.thumbnail}
                alt={topPerformer.title}
                className="w-40 h-24 bg-gray-800 rounded-lg object-cover flex-shrink-0"
              />
              
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-semibold text-white mb-2 line-clamp-2">
                  {topPerformer.title}
                </h3>
                
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-6 text-sm text-gray-300">
                    <div className="flex items-center space-x-2">
                      <Eye className="w-4 h-4" />
                      <span className="font-medium">{formatNumber(topPerformer.views)}</span>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <ThumbsUp className="w-4 h-4" />
                      <span>{formatNumber(topPerformer.likes)}</span>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <MessageCircle className="w-4 h-4" />
                      <span>{formatNumber(topPerformer.comments)}</span>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4" />
                      <span>{topPerformer.publishDate}</span>
                    </div>
                  </div>
                </div>

                {/* Team Members for Top Performer */}
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-gray-400">Team:</span>
                  <AvatarGroupWithTooltips 
                    avatars={topPerformer.teamMembers?.map(member => ({
                      src: member.avatar,
                      alt: member.name,
                      name: member.name,
                      initials: member.initials
                    }))} 
                    maxAvatars={3}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Other Videos Section - New Grid Layout */}
        <div>
          <h3 className="text-sm font-medium text-gray-400 mb-3">
            {topPerformer ? 'Other Recent Videos' : 'Recent Projects'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {otherVideos.map((video, index) => (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.6 + index * 0.1 }}
                className={`
                  flex flex-col space-y-3 p-3 rounded-xl hover:bg-red-500/10 hover:rounded-xl transition-all duration-300 cursor-pointer
                  ${isOddCount && index === otherVideos.length - 1 ? 'md:col-span-2' : ''}
                `}
              >
                {/* Video thumbnail and basic info */}
                <div className="flex items-start space-x-3">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-20 h-14 bg-gray-800 rounded object-cover flex-shrink-0"
                  />

                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-white truncate mb-1">
                      {video.title}
                    </h4>
                    
                    <div className="flex items-center space-x-3 text-xs text-gray-400 mb-2">
                      {video.status === 'published' && (
                        <>
                          <div className="flex items-center space-x-1">
                            <Eye className="w-3 h-3" />
                            <span>{formatNumber(video.views)}</span>
                          </div>
                          
                          <div className="flex items-center space-x-1">
                            <ThumbsUp className="w-3 h-3" />
                            <span>{formatNumber(video.likes)}</span>
                          </div>
                          
                          <div className="flex items-center space-x-1">
                            <MessageCircle className="w-3 h-3" />
                            <span>{formatNumber(video.comments)}</span>
                          </div>
                        </>
                      )}
                      
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-3 h-3" />
                        <span>{video.publishDate}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex-shrink-0">
                    <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(video.status)}`}>
                      {video.status}
                    </span>
                  </div>
                </div>

                {/* Team Members */}
                <div className="flex items-center space-x-2 pl-23">
                  <span className="text-xs text-gray-500">Team:</span>
                  <AvatarGroupWithTooltips 
                    avatars={video.teamMembers?.map(member => ({
                      src: member.avatar,
                      alt: member.name,
                      name: member.name,
                      initials: member.initials
                    }))} 
                    maxAvatars={3}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </GlowCard>
    </motion.div>
  );
};

export default RecentVideos;
