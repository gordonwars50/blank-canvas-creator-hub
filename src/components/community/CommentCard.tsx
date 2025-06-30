import React, { useState, useEffect } from 'react';
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
  onMarkAsRead: (commentId: string) => void;
}

const CommentCard: React.FC<CommentCardProps> = ({
  comment,
  onReply,
  onEdit,
  onDelete,
  onMarkAsSpam,
  onMarkAsRead
}) => {
  const [showReplyBox, setShowReplyBox] = useState(false);
  const [showEditBox, setShowEditBox] = useState(false);
  const [showReplies, setShowReplies] = useState(false);

  // Mark comment as read when it's viewed (component mounts)
  useEffect(() => {
    if (!comment.isRead) {
      // Add a small delay to simulate "viewing" the comment
      const timer = setTimeout(() => {
        onMarkAsRead(comment.id);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [comment.id, comment.isRead, onMarkAsRead]);

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
        {/* Profile Picture */}
        <Avatar className="w-12 h-12 flex-shrink-0">
          <AvatarImage src={comment.authorProfileImageUrl} alt={comment.authorName} />
          <AvatarFallback className="bg-gray-700 text-white">
            {comment.authorName.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>

        {/* Comment Content */}
        <div className="flex-1 min-w-0">
          {/* Header with Three-Dot Menu */}
          <div className="flex items-start justify-between mb-2">
            <div className="flex flex-col sm:flex-row sm:items-center flex-wrap gap-2">
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

              {/* Video Title - Now responsive */}
              {comment.videoTitle && (
                <div className="flex items-center gap-2">
                  <span className="hidden sm:inline text-gray-500">•</span>
                  <span className="text-gray-400 text-sm sm:hidden">on </span>
                  <span className="text-blue-300 text-sm font-medium">{comment.videoTitle}</span>
                </div>
              )}
            </div>

            {/* Three-Dot Menu for Own Comments */}
            {comment.isOwnComment && (
              <CommentDropdownMenu
                onEdit={() => setShowEditBox(true)}
                onDelete={handleDelete}
              />
            )}
          </div>

          {/* Comment Text */}
          <p className="text-gray-300 leading-relaxed mb-3">{comment.textDisplay}</p>

          {/* Stats and Show Replies on same line */}
          <div className="flex items-center justify-between mb-3 text-sm text-gray-400">
            <div className="flex items-center">
              <span>{comment.likeCount} likes</span>
            </div>
            
            {/* Show Replies Button - Only show when not in reply/edit mode */}
            {!showReplyBox && !showEditBox && comment.replies.length > 0 && (
              <button
                onClick={() => setShowReplies(!showReplies)}
                className="px-3 py-1 rounded-full text-xs font-medium text-blue-300 hover:text-blue-200 hover:bg-blue-500/10 transition-colors"
              >
                {showReplies ? 'Hide' : 'Show'} {comment.replies.length} {comment.replies.length === 1 ? 'reply' : 'replies'}
              </button>
            )}
          </div>

          {/* Actions - Hide reply button when reply box or edit box is shown */}
          <CommentActions
            isOwnComment={comment.isOwnComment}
            showReplyButton={!showReplyBox && !showEditBox}
            onReply={() => setShowReplyBox(true)}
            onMarkAsSpam={!comment.isOwnComment ? handleMarkAsSpam : undefined}
          />

          {/* Reply Input Section - Only show when replying */}
          {showReplyBox && (
            <ReplySection
              onSubmit={handleReply}
              onCancel={() => setShowReplyBox(false)}
            />
          )}

          {/* Edit Input Section - Only show when editing */}
          {showEditBox && (
            <ReplySection
              isEditing={true}
              initialText={comment.textDisplay}
              onSubmit={handleEdit}
              onCancel={() => setShowEditBox(false)}
            />
          )}

          {/* Replies Section - Only show when replies are expanded */}
          {showReplies && (
            <div className="mt-4">
              <div className="ml-8">
                <div className="space-y-3">
                  {comment.replies.map((reply) => (
                    <div key={reply.id} className="w-full p-4 bg-gray-800/20 backdrop-blur-sm border border-gray-700/30 rounded-2xl">
                      <div className="flex gap-3">
                        <Avatar className="w-8 h-8 flex-shrink-0">
                          <AvatarImage src={reply.authorProfileImageUrl} alt={reply.authorName} />
                          <AvatarFallback className="bg-gray-700 text-white text-xs">
                            {reply.authorName.charAt(0).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium text-white text-sm">{reply.authorName}</span>
                            {reply.isOwnComment && (
                              <span className="bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded-full text-xs font-medium">
                                Your reply
                              </span>
                            )}
                            <span className="text-gray-400 text-xs">{formatTimeAgo(reply.publishedAt)}</span>
                          </div>
                          
                          <p className="text-gray-300 text-sm leading-relaxed">{reply.textDisplay}</p>
                          
                          <div className="flex items-center gap-4 mt-2">
                            <span className="text-gray-400 text-xs">{reply.likeCount} likes</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </GlowCard>
  );
};

export default CommentCard;
