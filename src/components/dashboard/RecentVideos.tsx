
import React from 'react';
import { motion } from 'framer-motion';
import { Play, Eye, Clock, MoreHorizontal, Calendar } from 'lucide-react';
import { GlowCard } from '@/components/ui/spotlight-card';
import { AvatarGroupWithTooltips } from '@/components/ui/avatar-group-with-tooltip';

const RecentVideos: React.FC = () => {
  // TODO: BACKEND CONNECTION - Replace with API call to fetch recent videos
  // Example: const { data: videos, isLoading } = useQuery({
  //   queryKey: ['recent-videos'],
  //   queryFn: async () => {
  //     const response = await fetch('/api/videos/recent');
  //     return response.json();
  //   }
  // });

  const videos = [
    {
      id: 1,
      title: "How to Create Viral YouTube Content in 2024",
      thumbnail: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400&h=225&fit=crop",
      views: "2.3M", // BACKEND: Connect to YouTube Analytics API - video views
      duration: "12:34", // BACKEND: Fetch from video metadata
      uploadDate: "2 days ago", // BACKEND: Calculate from upload timestamp
      status: "Published", // BACKEND: Fetch video status from database
      performance: "+15%", // BACKEND: Calculate performance metrics vs previous videos
      teamMembers: [ // BACKEND: Fetch assigned team members from database
        {
          src: "https://randomuser.me/api/portraits/men/32.jpg",
          alt: "John Doe",
          name: "John Doe",
          initials: "JD",
        },
        {
          src: "https://randomuser.me/api/portraits/women/44.jpg",
          alt: "Sarah Smith", 
          name: "Sarah Smith",
          initials: "SS",
        }
      ]
    },
    {
      id: 2,
      title: "My Complete Video Production Setup Tour",
      thumbnail: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=400&h=225&fit=crop",
      views: "1.8M", // BACKEND: Connect to YouTube Analytics API
      duration: "18:45", // BACKEND: Video metadata
      uploadDate: "5 days ago", // BACKEND: Upload timestamp calculation
      status: "Published", // BACKEND: Video status
      performance: "+8%", // BACKEND: Performance metrics
      teamMembers: [
        {
          src: "https://randomuser.me/api/portraits/men/91.jpg",
          alt: "Alex Wong",
          name: "Alex Wong", 
          initials: "AW",
        }
      ]
    },
    {
      id: 3,
      title: "Behind the Scenes: Making My Best Video Yet",
      thumbnail: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=400&h=225&fit=crop",
      views: "945K", // BACKEND: YouTube Analytics API
      duration: "15:22", // BACKEND: Video metadata
      uploadDate: "1 week ago", // BACKEND: Timestamp calculation
      status: "Published", // BACKEND: Video status
      performance: "+22%", // BACKEND: Performance metrics
      teamMembers: [
        {
          src: "https://randomuser.me/api/portraits/women/17.jpg",
          alt: "Emma Johnson",
          name: "Emma Johnson",
          initials: "EJ",
        },
        {
          src: "https://randomuser.me/api/portraits/men/32.jpg", 
          alt: "John Doe",
          name: "John Doe",
          initials: "JD",
        },
        {
          src: "https://randomuser.me/api/portraits/women/44.jpg",
          alt: "Sarah Smith",
          name: "Sarah Smith", 
          initials: "SS",
        }
      ]
    },
    {
      id: 4,
      title: "Q&A: Your Questions About Content Creation",
      thumbnail: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=225&fit=crop",
      views: "1.2M", // BACKEND: YouTube Analytics API
      duration: "25:18", // BACKEND: Video metadata
      uploadDate: "2 weeks ago", // BACKEND: Timestamp calculation
      status: "Published", // BACKEND: Video status
      performance: "+12%", // BACKEND: Performance metrics
      teamMembers: [
        {
          src: "https://randomuser.me/api/portraits/men/91.jpg",
          alt: "Alex Wong",
          name: "Alex Wong",
          initials: "AW",
        },
        {
          src: "https://randomuser.me/api/portraits/women/17.jpg",
          alt: "Emma Johnson", 
          name: "Emma Johnson",
          initials: "EJ",
        }
      ]
    },
    {
      id: 5,
      title: "The Future of YouTube and Content Creation",
      thumbnail: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=400&h=225&fit=crop",
      views: "856K", // BACKEND: YouTube Analytics API
      duration: "14:56", // BACKEND: Video metadata  
      uploadDate: "3 weeks ago", // BACKEND: Timestamp calculation
      status: "Published", // BACKEND: Video status
      performance: "+18%", // BACKEND: Performance metrics
      teamMembers: [
        {
          src: "https://randomuser.me/api/portraits/men/32.jpg",
          alt: "John Doe",
          name: "John Doe",
          initials: "JD",
        }
      ]
    }
  ];

  return (
    <div className="bg-gray-950 border border-gray-900 rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-white">Recent Videos</h2>
        <button className="text-sm text-gray-400 hover:text-white transition-colors">
          View All
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {videos.map((video, index) => {
          const isLastOdd = videos.length % 2 !== 0 && index === videos.length - 1;
          
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
    </div>
  );
};

export default RecentVideos;
