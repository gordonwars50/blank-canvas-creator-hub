
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
  filterType: 'all' | 'my-comments' | 'others-comments';
}

export interface CommentStats {
  totalComments: number;
  myComments: number;
  othersComments: number;
  totalReplies: number;
}
