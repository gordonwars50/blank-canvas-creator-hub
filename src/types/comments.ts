
export interface YouTubeComment {
  id: string;
  authorDisplayName: string;
  authorProfileImageUrl: string;
  textDisplay: string;
  publishedAt: string;
  videoTitle?: string;
  isOwnComment: boolean;
  likeCount: number;
  replyCount: number;
  replies?: YouTubeComment[];
}

export interface CommentFilters {
  searchText: string;
  filterType: 'all' | 'mine' | 'others';
}

export interface CommentInteractionState {
  editingCommentId: string | null;
  replyingToCommentId: string | null;
  editText: string;
  replyText: string;
}
