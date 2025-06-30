
import React from 'react';
import { Comment, CommentFilters } from '@/types/comments';
import CommentCard from './CommentCard';

interface CommentsListProps {
  comments: Comment[];
  filters: CommentFilters;
  onReply: (commentId: string, replyText: string) => void;
  onEdit: (commentId: string, newText: string) => void;
  onDelete: (commentId: string) => void;
  onMarkAsSpam: (commentId: string) => void;
  onMarkAsRead: (commentId: string) => void;
}

const CommentsList: React.FC<CommentsListProps> = ({
  comments,
  filters,
  onReply,
  onEdit,
  onDelete,
  onMarkAsSpam,
  onMarkAsRead
}) => {
  // Filter comments based on search text and filter type
  const filteredComments = comments.filter(comment => {
    // Filter by search text
    const matchesSearch = !filters.searchText || 
      comment.textDisplay.toLowerCase().includes(filters.searchText.toLowerCase()) ||
      comment.authorName.toLowerCase().includes(filters.searchText.toLowerCase()) ||
      comment.videoTitle?.toLowerCase().includes(filters.searchText.toLowerCase());

    // Filter by type
    const matchesFilter = 
      filters.filterType === 'all' ||
      (filters.filterType === 'unread' && !comment.isRead) ||
      (filters.filterType === 'read' && comment.isRead);

    return matchesSearch && matchesFilter;
  });

  if (filteredComments.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 text-lg mb-2">No comments found</div>
        <div className="text-gray-500 text-sm">
          {filters.searchText 
            ? `No comments match your search "${filters.searchText}"`
            : filters.filterType === 'unread'
            ? "No unread comments"
            : filters.filterType === 'read'
            ? "No previously read comments"
            : "No comments available"
          }
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {filteredComments.map(comment => (
        <CommentCard
          key={comment.id}
          comment={comment}
          onReply={onReply}
          onEdit={onEdit}
          onDelete={onDelete}
          onMarkAsSpam={onMarkAsSpam}
          onMarkAsRead={onMarkAsRead}
        />
      ))}
    </div>
  );
};

export default CommentsList;
