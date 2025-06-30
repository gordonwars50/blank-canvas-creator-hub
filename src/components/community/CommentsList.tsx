
import React from 'react';
import { YouTubeComment, CommentInteractionState } from '@/types/comments';
import CommentCard from './CommentCard';
import { Loader2, MessageSquare } from 'lucide-react';

interface CommentsListProps {
  comments: YouTubeComment[];
  loading: boolean;
  interactionState: CommentInteractionState;
  onEditTextChange: (text: string) => void;
  onReplyTextChange: (text: string) => void;
  onSaveEdit: (commentId: string, newText: string) => void;
  onCancelEdit: () => void;
  onReply: (commentId: string) => void;
  onEdit: (commentId: string) => void;
  onDelete: (commentId: string) => void;
  onMarkAsSpam: (commentId: string) => void;
  onLike: (commentId: string) => void;
  onSubmitReply: (commentId: string, replyText: string) => void;
  onCancelReply: () => void;
}

const CommentsList: React.FC<CommentsListProps> = ({
  comments,
  loading,
  interactionState,
  onEditTextChange,
  onReplyTextChange,
  onSaveEdit,
  onCancelEdit,
  onReply,
  onEdit,
  onDelete,
  onMarkAsSpam,
  onLike,
  onSubmitReply,
  onCancelReply
}) => {
  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-red-500" />
        <span className="ml-3 text-gray-400">Loading comments...</span>
      </div>
    );
  }

  if (comments.length === 0) {
    return (
      <div className="text-center py-12">
        <MessageSquare className="w-16 h-16 text-gray-600 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-400 mb-2">No comments found</h3>
        <p className="text-gray-500">
          Try adjusting your search or filter criteria to see more comments.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {comments.map(comment => (
        <CommentCard
          key={comment.id}
          comment={comment}
          isEditing={interactionState.editingCommentId === comment.id}
          editText={interactionState.editText}
          isReplying={interactionState.replyingToCommentId === comment.id}
          replyText={interactionState.replyText}
          onEditTextChange={onEditTextChange}
          onReplyTextChange={onReplyTextChange}
          onSaveEdit={onSaveEdit}
          onCancelEdit={onCancelEdit}
          onReply={onReply}
          onEdit={onEdit}
          onDelete={onDelete}
          onMarkAsSpam={onMarkAsSpam}
          onLike={onLike}
          onSubmitReply={onSubmitReply}
          onCancelReply={onCancelReply}
        />
      ))}
    </div>
  );
};

export default CommentsList;
