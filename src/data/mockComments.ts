
import { Comment, CommentStats } from '@/types/comments';

export const mockComments: Comment[] = [
  {
    id: '1',
    authorName: 'John Creator',
    authorProfileImageUrl: '/placeholder.svg',
    textDisplay: 'Thanks for watching my latest video! What did you think about the new editing style?',
    publishedAt: '2024-01-15T10:30:00Z',
    videoTitle: 'Amazing Tutorial: React Best Practices',
    isOwnComment: true,
    likeCount: 45,
    totalReplyCount: 8,
    isRead: true,
    replies: [
      {
        id: 'r1',
        authorName: 'Sarah Wilson',
        authorProfileImageUrl: '/placeholder.svg',
        textDisplay: 'Love the new style! Much more engaging.',
        publishedAt: '2024-01-15T11:00:00Z',
        isOwnComment: false,
        likeCount: 12
      },
      {
        id: 'r2',
        authorName: 'Mike Johnson',
        authorProfileImageUrl: '/placeholder.svg',
        textDisplay: 'The transitions were smooth. Great work!',
        publishedAt: '2024-01-15T11:15:00Z',
        isOwnComment: false,
        likeCount: 8
      }
    ]
  },
  {
    id: '2',
    authorName: 'Alex Developer',
    authorProfileImageUrl: '/placeholder.svg',
    textDisplay: 'This tutorial helped me understand React hooks so much better. Thank you!',
    publishedAt: '2024-01-14T15:45:00Z',
    videoTitle: 'Amazing Tutorial: React Best Practices',
    isOwnComment: false,
    likeCount: 23,
    totalReplyCount: 3,
    isRead: false,
    replies: [
      {
        id: 'r3',
        authorName: 'John Creator',
        authorProfileImageUrl: '/placeholder.svg',
        textDisplay: 'So glad it helped! That was exactly what I was aiming for.',
        publishedAt: '2024-01-14T16:00:00Z',
        isOwnComment: true,
        likeCount: 15
      }
    ]
  },
  {
    id: '3',
    authorName: 'Emma Student',
    authorProfileImageUrl: '/placeholder.svg',
    textDisplay: 'Could you make a follow-up video about advanced React patterns?',
    publishedAt: '2024-01-13T09:20:00Z',
    videoTitle: 'Amazing Tutorial: React Best Practices',
    isOwnComment: false,
    likeCount: 31,
    totalReplyCount: 5,
    isRead: false,
    replies: []
  },
  {
    id: '4',
    authorName: 'John Creator',
    authorProfileImageUrl: '/placeholder.svg',
    textDisplay: 'Working on some exciting new content for next week. Stay tuned!',
    publishedAt: '2024-01-12T14:30:00Z',
    videoTitle: 'Behind the Scenes: My Content Creation Process',
    isOwnComment: true,
    likeCount: 67,
    totalReplyCount: 12,
    isRead: true,
    replies: []
  },
  {
    id: '5',
    authorName: 'David Tech',
    authorProfileImageUrl: '/placeholder.svg',
    textDisplay: 'Your explanation of state management was perfect. Finally clicked for me!',
    publishedAt: '2024-01-11T11:45:00Z',
    videoTitle: 'Amazing Tutorial: React Best Practices',
    isOwnComment: false,
    likeCount: 19,
    totalReplyCount: 2,
    isRead: true,
    replies: []
  }
];

export const mockStats: CommentStats = {
  totalComments: mockComments.length,
  unreadComments: mockComments.filter(c => !c.isRead).length,
  readComments: mockComments.filter(c => c.isRead).length,
  totalReplies: mockComments.reduce((acc, comment) => acc + comment.totalReplyCount, 0)
};
