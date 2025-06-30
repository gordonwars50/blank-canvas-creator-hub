
import React, { useState, useEffect, useMemo } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import SearchAndFilters from '@/components/community/SearchAndFilters';
import CommentsList from '@/components/community/CommentsList';
import { YouTubeComment, CommentFilters, CommentInteractionState } from '@/types/comments';
import { mockComments } from '@/data/mockComments';
import { useToast } from '@/components/ui/use-toast';
import { MessageSquare, Users, TrendingUp } from 'lucide-react';

const CommunityPage: React.FC = () => {
  const { toast } = useToast();
  const [comments, setComments] = useState<YouTubeComment[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<CommentFilters>({
    searchText: '',
    filterType: 'all'
  });
  const [interactionState, setInteractionState] = useState<CommentInteractionState>({
    editingCommentId: null,
    replyingToCommentId: null,
    editText: '',
    replyText: ''
  });

  // Simulate loading comments from YouTube API
  useEffect(() => {
    const loadComments = async () => {
      setLoading(true);
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      /* 
      TODO: Replace with actual YouTube API calls
      - Use commentThreads.list for top-level comments
      - Use comments.list for replies
      - Authenticate via Google OAuth 2.0
      - Filter comments by channel ownership
      */
      setComments(mockComments);
      setLoading(false);
    };

    loadComments();
  }, []);

  // Filter and search comments
  const filteredComments = useMemo(() => {
    let filtered = comments;

    // Apply text search
    if (filters.searchText) {
      const searchLower = filters.searchText.toLowerCase();
      filtered = filtered.filter(comment =>
        comment.textDisplay.toLowerCase().includes(searchLower) ||
        comment.authorDisplayName.toLowerCase().includes(searchLower) ||
        comment.videoTitle?.toLowerCase().includes(searchLower)
      );
    }

    // Apply filter type
    switch (filters.filterType) {
      case 'mine':
        filtered = filtered.filter(comment => comment.isOwnComment);
        break;
      case 'others':
        filtered = filtered.filter(comment => !comment.isOwnComment);
        break;
      default:
        break;
    }

    return filtered;
  }, [comments, filters]);

  // Comment interaction handlers
  const handleReply = (commentId: string) => {
    setInteractionState({
      ...interactionState,
      replyingToCommentId: commentId,
      editingCommentId: null,
      replyText: ''
    });
  };

  const handleEdit = (commentId: string) => {
    const comment = comments.find(c => c.id === commentId);
    if (comment) {
      setInteractionState({
        ...interactionState,
        editingCommentId: commentId,
        replyingToCommentId: null,
        editText: comment.textDisplay
      });
    }
  };

  const handleDelete = async (commentId: string) => {
    // TODO: Implement YouTube API comments.delete call
    setComments(prev => prev.filter(c => c.id !== commentId));
    toast({
      title: "Comment deleted",
      description: "Your comment has been successfully deleted.",
    });
  };

  const handleMarkAsSpam = async (commentId: string) => {
    // TODO: Implement YouTube API comments.setModerationStatus call
    toast({
      title: "Comment marked as spam",
      description: "The comment has been reported and will be reviewed.",
    });
  };

  const handleLike = async (commentId: string) => {
    // TODO: Implement YouTube API for liking comments
    setComments(prev => prev.map(comment =>
      comment.id === commentId
        ? { ...comment, likeCount: comment.likeCount + 1 }
        : comment
    ));
  };

  const handleSaveEdit = async (commentId: string, newText: string) => {
    // TODO: Implement YouTube API comments.update call
    setComments(prev => prev.map(comment =>
      comment.id === commentId
        ? { ...comment, textDisplay: newText }
        : comment
    ));
    setInteractionState({
      ...interactionState,
      editingCommentId: null,
      editText: ''
    });
    toast({
      title: "Comment updated",
      description: "Your comment has been successfully updated.",
    });
  };

  const handleCancelEdit = () => {
    setInteractionState({
      ...interactionState,
      editingCommentId: null,
      editText: ''
    });
  };

  const handleSubmitReply = async (commentId: string, replyText: string) => {
    // TODO: Implement YouTube API comments.insert call for replies
    const newReply: YouTubeComment = {
      id: `${commentId}-${Date.now()}`,
      authorDisplayName: 'John Creator',
      authorProfileImageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
      textDisplay: replyText,
      publishedAt: new Date().toISOString(),
      isOwnComment: true,
      likeCount: 0,
      replyCount: 0
    };

    setComments(prev => prev.map(comment =>
      comment.id === commentId
        ? {
            ...comment,
            replies: [...(comment.replies || []), newReply],
            replyCount: comment.replyCount + 1
          }
        : comment
    ));

    setInteractionState({
      ...interactionState,
      replyingToCommentId: null,
      replyText: ''
    });

    toast({
      title: "Reply posted",
      description: "Your reply has been successfully posted.",
    });
  };

  const handleCancelReply = () => {
    setInteractionState({
      ...interactionState,
      replyingToCommentId: null,
      replyText: ''
    });
  };

  const handleEditTextChange = (text: string) => {
    setInteractionState({
      ...interactionState,
      editText: text
    });
  };

  const handleReplyTextChange = (text: string) => {
    setInteractionState({
      ...interactionState,
      replyText: text
    });
  };

  // Calculate stats
  const myCommentsCount = comments.filter(c => c.isOwnComment).length;
  const othersCommentsCount = comments.filter(c => !c.isOwnComment).length;
  const totalReplies = comments.reduce((sum, comment) => sum + comment.replyCount, 0);

  return (
    <DashboardLayout title="Community Management">
      <div className="space-y-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
            <div className="flex items-center space-x-3">
              <div className="bg-red-500/20 p-3 rounded-lg">
                <MessageSquare className="w-6 h-6 text-red-400" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Total Comments</p>
                <p className="text-white text-2xl font-bold">{comments.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-500/20 p-3 rounded-lg">
                <Users className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">My Comments</p>
                <p className="text-white text-2xl font-bold">{myCommentsCount}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
            <div className="flex items-center space-x-3">
              <div className="bg-green-500/20 p-3 rounded-lg">
                <TrendingUp className="w-6 h-6 text-green-400" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Total Replies</p>
                <p className="text-white text-2xl font-bold">{totalReplies}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <SearchAndFilters
          filters={filters}
          onFiltersChange={setFilters}
          totalComments={comments.length}
          filteredCount={filteredComments.length}
        />

        {/* Comments List */}
        <CommentsList
          comments={filteredComments}
          loading={loading}
          interactionState={interactionState}
          onEditTextChange={handleEditTextChange}
          onReplyTextChange={handleReplyTextChange}
          onSaveEdit={handleSaveEdit}
          onCancelEdit={handleCancelEdit}
          onReply={handleReply}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onMarkAsSpam={handleMarkAsSpam}
          onLike={handleLike}
          onSubmitReply={handleSubmitReply}
          onCancelReply={handleCancelReply}
        />
      </div>
    </DashboardLayout>
  );
};

export default CommunityPage;
