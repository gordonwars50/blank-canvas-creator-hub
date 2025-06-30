
import { YouTubeComment } from '@/types/comments';

export const mockComments: YouTubeComment[] = [
  {
    id: '1',
    authorDisplayName: 'John Creator',
    authorProfileImageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
    textDisplay: 'Thanks everyone for watching! Let me know what topics you\'d like to see next in the comments below.',
    publishedAt: '2024-06-29T10:30:00Z',
    videoTitle: 'Getting Started with YouTube Analytics',
    isOwnComment: true,
    likeCount: 24,
    replyCount: 8,
    replies: [
      {
        id: '1-1',
        authorDisplayName: 'Sarah Tech',
        authorProfileImageUrl: 'https://images.unsplash.com/photo-1494790108755-2616b95f1e0e?w=40&h=40&fit=crop&crop=face',
        textDisplay: 'Would love to see a deep dive into audience retention metrics!',
        publishedAt: '2024-06-29T11:15:00Z',
        isOwnComment: false,
        likeCount: 5,
        replyCount: 0
      }
    ]
  },
  {
    id: '2',
    authorDisplayName: 'Alex Gaming',
    authorProfileImageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
    textDisplay: 'This tutorial was exactly what I needed! The step-by-step breakdown made everything so clear.',
    publishedAt: '2024-06-29T09:45:00Z',
    videoTitle: 'Getting Started with YouTube Analytics',
    isOwnComment: false,
    likeCount: 12,
    replyCount: 2
  },
  {
    id: '3',
    authorDisplayName: 'John Creator',
    authorProfileImageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
    textDisplay: 'Just uploaded a behind-the-scenes look at my content creation process. Check it out and let me know your thoughts!',
    publishedAt: '2024-06-28T16:20:00Z',
    videoTitle: 'Behind the Scenes: My Content Creation Setup',
    isOwnComment: true,
    likeCount: 31,
    replyCount: 15
  },
  {
    id: '4',
    authorDisplayName: 'Emma Creative',
    authorProfileImageUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face',
    textDisplay: 'Your editing style has improved so much! The transitions in this video are smooth and professional.',
    publishedAt: '2024-06-28T14:10:00Z',
    videoTitle: 'Behind the Scenes: My Content Creation Setup',
    isOwnComment: false,
    likeCount: 8,
    replyCount: 1
  },
  {
    id: '5',
    authorDisplayName: 'Mike Developer',
    authorProfileImageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face',
    textDisplay: 'Can you do a tutorial on optimizing thumbnails for better click-through rates?',
    publishedAt: '2024-06-27T20:30:00Z',
    videoTitle: 'YouTube SEO Tips That Actually Work',
    isOwnComment: false,
    likeCount: 18,
    replyCount: 3
  }
];
