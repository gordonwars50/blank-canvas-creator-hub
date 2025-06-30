
export interface Comment {
  id: string;
  authorName: string;
  authorProfileImageUrl: string;
  textDisplay: string;
  publishedAt: string;
  videoTitle?: string;
  isOwnComment: boolean;
  likeCount: number;
  totalReplyCount: number;
  replies: Reply[];
  isRead: boolean;
}

export interface Reply {
  id: string;
  authorName: string;
  authorProfileImageUrl: string;
  textDisplay: string;
  publishedAt: string;
  isOwnComment: boolean;
  likeCount: number;
}

export interface CommentFilters {
  searchText: string;
  filterType: 'all' | 'unread' | 'read';
}

export interface CommentStats {
  totalComments: number;
  unreadComments: number;
  readComments: number;
  totalReplies: number;
}
