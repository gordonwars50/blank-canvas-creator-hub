
import React, { useState } from 'react';
import { GlowCard } from '@/components/ui/spotlight-card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Comment } from '@/types/comments';
import CommentActions from './CommentActions';
import CommentDropdownMenu from './CommentDropdownMenu';
import ReplySection from './ReplySection';

interface CommentCardProps {
  comment: Comment;
  onReply: (commentId: string, replyText: string) => void;
  onEdit: (commentId: string, newText: string) => void;
  onDelete: (commentId: string) => void;
  onMarkAsSpam: (commentId: string) => void;
}

const CommentCard: React.FC<CommentCardProps> = ({
  comment,
  onReply,
  onEdit,
  onDelete,
  onMarkAsSpam
}) => {
  const [showReplyBox, setShowReplyBox] = useState(false);
  const [showEditBox, setShowEditBox] = useState(false);
  const [showReplies, setShowReplies] = useState(false);

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return `${Math.floor(diffInHours / 24)}d ago`;
  };

  const handleReply = (replyText: string) => {
    onReply(comment.id, replyText);
    setShowReplyBox(false);
  };

  const handleEdit = (newText: string) => {
    onEdit(comment.id, newText);
    setShowEditBox(false);
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this comment?')) {
      onDelete(comment.id);
    }
  };

  const handleMarkAsSpam = () => {
    if (window.confirm('Mark this comment as spam?')) {
      onMarkAsSpam(comment.id);
    }
  };

  return (
    <GlowCard 
      glowColor={comment.isOwnComment ? "green" : comment.isRead ? "blue" : "orange"} 
      customSize 
      className="w-full p-6 mb-4"
    >
      <div className="flex gap-4">
        {/* Profile Picture with Spotlight Glow */}
        <GlowCard 
          glowColor={comment.isOwnComment ? "green" : comment.isRead ? "blue" : "orange"} 
          customSize 
          width={48} 
          height={48} 
          className="flex-shrink-0 p-0 overflow-hidden"
        >
          <Avatar className="w-12 h-12">
            <AvatarImage src={comment.authorProfileImageUrl} alt={comment.authorName} />
            <AvatarFallback className="bg-gray-700 text-white">
              {comment.authorName.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </GlowCard>

        {/* Comment Content */}
        <div className="flex-1 min-w-0">
          {/* Header with Three-Dot Menu */}
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center flex-wrap gap-2">
              <span className="font-semibold text-white">{comment.authorName}</span>
              
              {comment.isOwnComment && (
                <span className="bg-green-500/20 text-green-300 px-3 py-1 rounded-full text-xs font-medium">
                  Your comment
                </span>
              )}
              
              {!comment.isRead && (
                <span className="bg-orange-500/20 text-orange-300 px-3 py-1 rounded-full text-xs font-medium">
                  Unread
                </span>
              )}
              
              <span className="text-gray-400 text-sm">{formatTimeAgo(comment.publishedAt)}</span>
            </div>

            {/* Three-Dot Menu for Own Comments */}
            {comment.isOwnComment && (
              <CommentDropdownMenu
                onEdit={() => setShowEditBox(true)}
                onDelete={handleDelete}
              />
            )}
          </div>

          {/* Video Title */}
          {comment.videoTitle && (
            <div className="mb-2">
              <span className="text-gray-400 text-sm">on </span>
              <span className="text-blue-300 text-sm font-medium">{comment.videoTitle}</span>
            </div>
          )}

          {/* Comment Text */}
          <p className="text-gray-300 leading-relaxed mb-3">{comment.textDisplay}</p>

          {/* Stats */}
          <div className="flex items-center gap-6 mb-3 text-sm text-gray-400">
            <span>{comment.likeCount} likes</span>
            {comment.totalReplyCount > 0 && (
              <span>{comment.totalReplyCount} {comment.totalReplyCount === 1 ? 'reply' : 'replies'}</span>
            )}
          </div>

          {/* Actions */}
          <CommentActions
            isOwnComment={comment.isOwnComment}
            onReply={() => setShowReplyBox(true)}
            onMarkAsSpam={!comment.isOwnComment ? handleMarkAsSpam : undefined}
          />

          {/* Reply/Edit Sections */}
          {(showReplyBox || showEditBox) && (
            <ReplySection
              isEditing={showEditBox}
              initialText={showEditBox ? comment.textDisplay : ''}
              replies={comment.replies}
              showReplies={showReplies}
              onSubmit={showEditBox ? handleEdit : handleReply}
              onCancel={() => {
                setShowReplyBox(false);
                setShowEditBox(false);
              }}
              onToggleReplies={() => setShowReplies(!showReplies)}
            />
          )}

          {/* Show Replies Button (when not in reply/edit mode) */}
          {!showReplyBox && !showEditBox && comment.replies.length > 0 && (
            <ReplySection
              replies={comment.replies}
              showReplies={showReplies}
              onSubmit={() => {}}
              onCancel={() => {}}
              onToggleReplies={() => setShowReplies(!showReplies)}
            />
          )}
        </div>
      </div>
    </GlowCard>
  );
};

export default CommentCard;
