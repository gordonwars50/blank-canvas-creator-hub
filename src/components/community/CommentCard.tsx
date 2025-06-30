
import React, { useState } from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { YouTubeComment } from '@/types/comments';
import { Save, X } from 'lucide-react';
import CommentActions from './CommentActions';
import ReplySection from './ReplySection';
import { motion } from 'framer-motion';

interface CommentCardProps {
  comment: YouTubeComment;
  isEditing: boolean;
  editText: string;
  isReplying: boolean;
  replyText: string;
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

const CommentCard: React.FC<CommentCardProps> = ({
  comment,
  isEditing,
  editText,
  isReplying,
  replyText,
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
  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Less than an hour ago';
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)} days ago`;
    return date.toLocaleDateString();
  };

  const handleSaveEdit = () => {
    if (editText.trim()) {
      onSaveEdit(comment.id, editText);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-gray-900 border border-gray-800 rounded-lg p-6 hover:border-gray-700 transition-colors"
    >
      <div className="flex space-x-4">
        <Avatar className="w-10 h-10 flex-shrink-0">
          <AvatarImage src={comment.authorProfileImageUrl} alt={comment.authorDisplayName} />
          <AvatarFallback>{comment.authorDisplayName.charAt(0)}</AvatarFallback>
        </Avatar>
        
        <div className="flex-1 min-w-0">
          {/* Comment Header */}
          <div className="flex items-center space-x-2 mb-2">
            <h3 className="font-medium text-white">{comment.authorDisplayName}</h3>
            {comment.isOwnComment && (
              <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                Your comment
              </span>
            )}
            <span className="text-gray-500 text-sm">•</span>
            <span className="text-gray-500 text-sm">{formatTimeAgo(comment.publishedAt)}</span>
          </div>

          {/* Video Title */}
          {comment.videoTitle && (
            <div className="mb-3">
              <span className="text-gray-400 text-sm">On: </span>
              <span className="text-blue-400 text-sm font-medium">{comment.videoTitle}</span>
            </div>
          )}

          {/* Comment Content */}
          {isEditing ? (
            <div className="mb-4">
              <textarea
                value={editText}
                onChange={(e) => onEditTextChange(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-red-500"
                rows={4}
                autoFocus
              />
              <div className="flex items-center justify-end space-x-2 mt-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onCancelEdit}
                  className="text-gray-400 hover:text-white"
                >
                  <X className="w-4 h-4 mr-1" />
                  Cancel
                </Button>
                <Button
                  size="sm"
                  onClick={handleSaveEdit}
                  disabled={!editText.trim()}
                  className="bg-red-500 hover:bg-red-600 text-white"
                >
                  <Save className="w-4 h-4 mr-1" />
                  Save
                </Button>
              </div>
            </div>
          ) : (
            <p className="text-gray-300 mb-4 leading-relaxed">{comment.textDisplay}</p>
          )}

          {/* Comment Actions */}
          {!isEditing && (
            <CommentActions
              comment={comment}
              onReply={onReply}
              onEdit={onEdit}
              onDelete={onDelete}
              onMarkAsSpam={onMarkAsSpam}
              onLike={onLike}
            />
          )}

          {/* Reply Section */}
          <ReplySection
            comment={comment}
            isReplying={isReplying}
            replyText={replyText}
            onReplyTextChange={onReplyTextChange}
            onSubmitReply={onSubmitReply}
            onCancelReply={onCancelReply}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default CommentCard;
