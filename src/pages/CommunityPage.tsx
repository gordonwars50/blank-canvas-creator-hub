
import React, { useState, useMemo } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { GlowCard } from '@/components/ui/spotlight-card';
import { CountAnimation } from '@/components/ui/count-animation';
import SearchAndFilters from '@/components/community/SearchAndFilters';
import CommentsList from '@/components/community/CommentsList';
import { Comment, CommentFilters } from '@/types/comments';
import { mockComments } from '@/data/mockComments';

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
      unreadComments: filteredComments.filter(c => !c.isRead).length,
      readComments: filteredComments.filter(c => c.isRead).length,
      totalReplies: filteredComments.reduce((acc, comment) => acc + comment.totalReplyCount, 0)
    };
  }, [comments, filters.searchText]);

  const handleMarkAsRead = (commentId: string) => {
    setComments(prev => prev.map(comment => 
      comment.id === commentId 
        ? { ...comment, isRead: true }
        : comment
    ));
  };

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
    <DashboardLayout title="Community Management" hideTopBarActions={true}>
      <div className="space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <GlowCard 
            glowColor="blue" 
            customSize={true}
            className="w-full h-auto aspect-auto grid-rows-none gap-0 p-4"
          >
            <div className="text-center">
              <CountAnimation 
                number={stats.totalComments} 
                className="text-3xl font-bold text-blue-300 mb-2"
              />
              <div className="text-gray-400 text-sm font-medium">Total Comments</div>
            </div>
          </GlowCard>
          
          <GlowCard 
            glowColor="green" 
            customSize={true}
            className="w-full h-auto aspect-auto grid-rows-none gap-0 p-4"
          >
            <div className="text-center">
              <CountAnimation 
                number={stats.unreadComments} 
                className="text-3xl font-bold text-green-300 mb-2"
              />
              <div className="text-gray-400 text-sm font-medium">Unread Comments</div>
            </div>
          </GlowCard>
          
          <GlowCard 
            glowColor="orange" 
            customSize={true}
            className="w-full h-auto aspect-auto grid-rows-none gap-0 p-4"
          >
            <div className="text-center">
              <CountAnimation 
                number={stats.readComments} 
                className="text-3xl font-bold text-orange-300 mb-2"
              />
              <div className="text-gray-400 text-sm font-medium">Previously Read</div>
            </div>
          </GlowCard>
          
          <GlowCard 
            glowColor="purple" 
            customSize={true}
            className="w-full h-auto aspect-auto grid-rows-none gap-0 p-4"
          >
            <div className="text-center">
              <CountAnimation 
                number={stats.totalReplies} 
                className="text-3xl font-bold text-purple-300 mb-2"
              />
              <div className="text-gray-400 text-sm font-medium">Total Replies</div>
            </div>
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
          onMarkAsRead={handleMarkAsRead}
        />
      </div>
    </DashboardLayout>
  );
};

export default CommunityPage;
