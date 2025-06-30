
import React, { useState, useMemo } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { GlowCard } from '@/components/ui/spotlight-card';
import SearchAndFilters from '@/components/community/SearchAndFilters';
import CommentsList from '@/components/community/CommentsList';
import { Comment, CommentFilters } from '@/types/comments';
import { mockComments, mockStats } from '@/data/mockComments';

const CommunityPage: React.FC = () => {
  const [comments, setComments] = useState<Comment[]>(mockComments);
  const [filters, setFilters] = useState<CommentFilters>({
    searchText: '',
    filterType: 'all'
  });

  // Calculate stats dynamically based on current comments
  const stats = useMemo(() => {
    const filteredComments = comments.filter(comment => {
      const matchesSearch = !filters.searchText || 
        comment.textDisplay.toLowerCase().includes(filters.searchText.toLowerCase()) ||
        comment.authorName.toLowerCase().includes(filters.searchText.toLowerCase()) ||
        comment.videoTitle?.toLowerCase().includes(filters.searchText.toLowerCase());
      return matchesSearch;
    });

    return {
      totalComments: filteredComments.length,
      myComments: filteredComments.filter(c => c.isOwnComment).length,
      othersComments: filteredComments.filter(c => !c.isOwnComment).length,
      totalReplies: filteredComments.reduce((acc, comment) => acc + comment.totalReplyCount, 0)
    };
  }, [comments, filters.searchText]);

  const handleReply = (commentId: string, replyText: string) => {
    // TODO: Implement YouTube API call to comments.insert
    console.log('Reply to comment:', commentId, 'with text:', replyText);
    // For now, just show success message
    alert('Reply functionality will be connected to YouTube API');
  };

  const handleEdit = (commentId: string, newText: string) => {
    // TODO: Implement YouTube API call to comments.update
    console.log('Edit comment:', commentId, 'with new text:', newText);
    
    // Update local state for demo
    setComments(prev => prev.map(comment => 
      comment.id === commentId 
        ? { ...comment, textDisplay: newText }
        : comment
    ));
  };

  const handleDelete = (commentId: string) => {
    // TODO: Implement YouTube API call to comments.delete
    console.log('Delete comment:', commentId);
    
    // Update local state for demo
    setComments(prev => prev.filter(comment => comment.id !== commentId));
  };

  const handleMarkAsSpam = (commentId: string) => {
    // TODO: Implement YouTube API call to comments.setModerationStatus
    console.log('Mark comment as spam:', commentId);
    
    // Update local state for demo (remove from view)
    setComments(prev => prev.filter(comment => comment.id !== commentId));
    alert('Comment marked as spam');
  };

  return (
    <DashboardLayout title="Community Management">
      <div className="space-y-6">
        {/* API Integration Notice */}
        <GlowCard glowColor="orange" customSize className="w-full p-4">
          <div className="text-center text-orange-300">
            <p className="font-medium mb-1">🔧 Backend Integration Required</p>
            <p className="text-sm text-orange-200">
              Connect to YouTube API via Google OAuth 2.0 to enable live comment management
            </p>
          </div>
        </GlowCard>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <GlowCard glowColor="blue" customSize className="p-6 text-center">
            <div className="text-3xl font-bold text-blue-300 mb-2">{stats.totalComments}</div>
            <div className="text-gray-400 text-sm font-medium">Total Comments</div>
          </GlowCard>
          
          <GlowCard glowColor="green" customSize className="p-6 text-center">
            <div className="text-3xl font-bold text-green-300 mb-2">{stats.myComments}</div>
            <div className="text-gray-400 text-sm font-medium">My Comments</div>
          </GlowCard>
          
          <GlowCard glowColor="purple" customSize className="p-6 text-center">
            <div className="text-3xl font-bold text-purple-300 mb-2">{stats.othersComments}</div>
            <div className="text-gray-400 text-sm font-medium">Others' Comments</div>
          </GlowCard>
          
          <GlowCard glowColor="orange" customSize className="p-6 text-center">
            <div className="text-3xl font-bold text-orange-300 mb-2">{stats.totalReplies}</div>
            <div className="text-gray-400 text-sm font-medium">Total Replies</div>
          </GlowCard>
        </div>

        {/* Search and Filters */}
        <SearchAndFilters
          filters={filters}
          onFiltersChange={setFilters}
        />

        {/* Comments List */}
        <CommentsList
          comments={comments}
          filters={filters}
          onReply={handleReply}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onMarkAsSpam={handleMarkAsSpam}
        />
      </div>
    </DashboardLayout>
  );
};

export default CommunityPage;
