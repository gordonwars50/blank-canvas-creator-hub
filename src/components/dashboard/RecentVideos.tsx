import React from 'react';
import { motion } from 'framer-motion';
import { Eye, ThumbsUp, MessageCircle, Calendar, TrendingUp, Award } from 'lucide-react';
import { GlowCard } from '@/components/ui/spotlight-card';

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
}

const mockVideos: Video[] = [
  {
    id: '1',
    title: 'How to Grow Your YouTube Channel Fast in 2024',
    thumbnail: '/placeholder.svg',
    views: 45230,
    likes: 1205,
    comments: 89,
    publishDate: '2024-06-27',
    status: 'published',
    engagementRate: 2.86
  },
  {
    id: '2',
    title: 'Best YouTube SEO Tips for Beginners',
    thumbnail: '/placeholder.svg',
    views: 32100,
    likes: 892,
    comments: 67,
    publishDate: '2024-06-25',
    status: 'published',
    engagementRate: 2.99
  },
  {
    id: '3',
    title: 'Creating Viral Content: What Actually Works',
    thumbnail: '/placeholder.svg',
    views: 18750,
    likes: 445,
    comments: 34,
    publishDate: '2024-06-23',
    status: 'published',
    engagementRate: 2.55
  },
  {
    id: '4',
    title: 'YouTube Analytics Deep Dive',
    thumbnail: '/placeholder.svg',
    views: 0,
    likes: 0,
    comments: 0,
    publishDate: '2024-06-30',
    status: 'scheduled',
    engagementRate: 0
  }
];

const RecentVideos: React.FC = () => {
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

  // Find the top performing video based on engagement rate
  const publishedVideos = mockVideos.filter(video => video.status === 'published');
  const topPerformer = publishedVideos.reduce((prev, current) => 
    (prev.engagementRate || 0) > (current.engagementRate || 0) ? prev : current
  );

  // Get remaining videos excluding the top performer
  const otherVideos = mockVideos.filter(video => video.id !== topPerformer.id);

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
          <button className="text-sm text-red-400 hover:text-red-300">
            View All
          </button>
        </div>

        {/* Top Performer Section */}
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
              <span>{topPerformer.engagementRate}% engagement</span>
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
          </div>
        </motion.div>

        {/* Other Videos Section */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-gray-400 mb-3">Other Recent Videos</h3>
          {otherVideos.map((video, index) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.6 + index * 0.1 }}
              className="flex items-center space-x-4 p-3 rounded-xl hover:bg-red-500/10 hover:rounded-xl transition-all duration-300 cursor-pointer"
            >
              <img
                src={video.thumbnail}
                alt={video.title}
                className="w-24 h-16 bg-gray-800 rounded object-cover flex-shrink-0"
              />

              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium text-white truncate mb-1">
                  {video.title}
                </h4>
                
                <div className="flex items-center space-x-4 text-xs text-gray-400">
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
            </motion.div>
          ))}
        </div>
      </GlowCard>
    </motion.div>
  );
};

export default RecentVideos;
