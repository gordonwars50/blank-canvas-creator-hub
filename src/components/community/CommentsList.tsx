
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
}

const CommentsList: React.FC<CommentsListProps> = ({
  comments,
  filters,
  onReply,
  onEdit,
  onDelete,
  onMarkAsSpam
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
      (filters.filterType === 'my-comments' && comment.isOwnComment) ||
      (filters.filterType === 'others-comments' && !comment.isOwnComment);

    return matchesSearch && matchesFilter;
  });

  if (filteredComments.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 text-lg mb-2">No comments found</div>
        <div className="text-gray-500 text-sm">
          {filters.searchText 
            ? `No comments match your search "${filters.searchText}"`
            : filters.filterType === 'my-comments'
            ? "You haven't posted any comments yet"
            : "No comments from others yet"
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
        />
      ))}
    </div>
  );
};

export default CommentsList;
