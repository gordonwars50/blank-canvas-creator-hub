
import React from 'react';
import { motion } from 'framer-motion';
import { Play, Eye, Clock, MoreHorizontal, Calendar, Video } from 'lucide-react';
import { GlowCard } from '@/components/ui/spotlight-card';
import { AvatarGroupWithTooltips } from '@/components/ui/avatar-group-with-tooltip';

const RecentVideos: React.FC = () => {
  // TODO: BACKEND CONNECTION - Replace with API call to fetch recent videos
  // Example: const { data: videos, isLoading } = useQuery({
  //   queryKey: ['recent-videos'],
  //   queryFn: async () => {
  //     const response = await fetch('/api/videos/recent?limit=5');
  //     return response.json();
  //   }
  // });

  // BACKEND: Replace this empty array with actual API data
  // When connected to backend, this should fetch real video data
  const videos: any[] = []; // Start with empty array - no default videos

  // Limit to maximum 5 videos
  const displayVideos = videos.slice(0, 5);

  return (
    <div className="bg-gray-950 border border-gray-900 rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-white">Recent Videos</h2>
        <button className="text-sm text-gray-400 hover:text-white transition-colors">
          View All
        </button>
      </div>

      {displayVideos.length === 0 ? (
        // Empty state when no videos are available
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mb-4">
            <Video className="w-8 h-8 text-gray-600" />
          </div>
          <h3 className="text-lg font-medium text-white mb-2">No Recent Videos</h3>
          <p className="text-gray-400 text-sm max-w-md">
            Your recent videos will appear here once you start uploading content.
          </p>
          {/* BACKEND: This button should navigate to upload page or trigger upload modal */}
          <button className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors">
            Upload Your First Video
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {displayVideos.map((video, index) => {
            const isLastOdd = displayVideos.length % 2 !== 0 && index === displayVideos.length - 1;
            
            return (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={isLastOdd ? "lg:col-span-2" : ""}
              >
                <GlowCard 
                  glowColor="red" 
                  customSize={true}
                  className="bg-gray-900/50 border border-gray-800 rounded-lg p-4 hover:border-gray-700 transition-colors w-full h-auto aspect-auto grid-rows-none gap-0"
                >
                  <div className="flex gap-4">
                    {/* Thumbnail */}
                    <div className="relative flex-shrink-0">
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="w-32 h-18 object-cover rounded-lg"
                      />
                      <div className="absolute inset-0 bg-black/20 rounded-lg flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity cursor-pointer">
                        <Play className="w-6 h-6 text-white" />
                      </div>
                      <div className="absolute bottom-1 right-1 bg-black/80 text-white text-xs px-1 rounded">
                        {video.duration}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h3 className="text-white font-medium text-sm line-clamp-2 leading-tight">
                          {video.title}
                        </h3>
                        <button className="text-gray-400 hover:text-white flex-shrink-0">
                          <MoreHorizontal className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="flex items-center gap-4 text-xs text-gray-400 mb-3">
                        <div className="flex items-center gap-1">
                          <Eye className="w-3 h-3" />
                          <span>{video.views}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          <span>{video.uploadDate}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="text-green-400">{video.performance}</span>
                        </div>
                      </div>

                      {/* Team Members */}
                      <div className="flex items-center justify-between">
                        <AvatarGroupWithTooltips 
                          avatars={video.teamMembers}
                          maxAvatars={3}
                        />
                        <span className="text-xs text-gray-500">{video.status}</span>
                      </div>
                    </div>
                  </div>
                </GlowCard>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default RecentVideos;
