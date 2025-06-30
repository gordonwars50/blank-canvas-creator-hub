
import React from 'react';
import { Clock, MessageSquare } from 'lucide-react';
import { YouTubeComment, CommentInteractionState } from '@/types/comments';
import CommentActions from './CommentActions';
import ReplySection from './ReplySection';
import { GlowCard } from '@/components/ui/spotlight-card';

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
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d ago`;
    return date.toLocaleDateString();
  };

  return (
    <GlowCard 
      glowColor={comment.isOwnComment ? "green" : "blue"} 
      customSize={true}
      className="w-full p-6"
    >
      <div className="flex space-x-4">
        {/* Profile Picture */}
        <GlowCard 
          glowColor="purple" 
          customSize={true}
          className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0"
        >
          <img
            src={comment.authorProfileImageUrl}
            alt={comment.authorDisplayName}
            className="w-full h-full object-cover"
          />
        </GlowCard>

        {/* Comment Content */}
        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="flex items-center space-x-3 mb-2">
            <span className="font-semibold text-white text-sm">
              {comment.authorDisplayName}
            </span>
            {comment.isOwnComment && (
              <GlowCard 
                glowColor="green" 
                customSize={true}
                className="px-2 py-1"
              >
                <span className="text-xs font-medium text-green-400">Your comment</span>
              </GlowCard>
            )}
            <div className="flex items-center text-gray-400 text-xs">
              <Clock className="w-3 h-3 mr-1" />
              <span>{formatDate(comment.publishedAt)}</span>
            </div>
          </div>

          {/* Video Title */}
          {comment.videoTitle && (
            <GlowCard 
              glowColor="orange" 
              customSize={true}
              className="mb-3 p-2"
            >
              <p className="text-gray-300 text-xs">
                On video: <span className="text-white">{comment.videoTitle}</span>
              </p>
            </GlowCard>
          )}

          {/* Comment Text */}
          {isEditing ? (
            <GlowCard 
              glowColor="blue" 
              customSize={true}
              className="mb-3 p-3"
            >
              <textarea
                value={editText}
                onChange={(e) => onEditTextChange(e.target.value)}
                className="w-full bg-transparent border-none text-white placeholder-gray-400 resize-none focus:outline-none"
                rows={3}
                placeholder="Edit your comment..."
              />
              <div className="flex space-x-2 mt-3">
                <GlowCard 
                  glowColor="green" 
                  customSize={true}
                  className="px-4 py-2 cursor-pointer hover:opacity-80"
                  onClick={() => onSaveEdit(comment.id, editText)}
                >
                  <span className="text-sm font-medium text-green-400">Save</span>
                </GlowCard>
                <GlowCard 
                  glowColor="red" 
                  customSize={true}
                  className="px-4 py-2 cursor-pointer hover:opacity-80"
                  onClick={onCancelEdit}
                >
                  <span className="text-sm font-medium text-red-400">Cancel</span>
                </GlowCard>
              </div>
            </GlowCard>
          ) : (
            <p className="text-gray-100 text-sm leading-relaxed mb-3 whitespace-pre-wrap">
              {comment.textDisplay}
            </p>
          )}

          {/* Replies Count */}
          {comment.replyCount > 0 && (
            <div className="flex items-center text-gray-400 text-xs mb-3">
              <MessageSquare className="w-3 h-3 mr-1" />
              <span>{comment.replyCount} {comment.replyCount === 1 ? 'reply' : 'replies'}</span>
            </div>
          )}

          {/* Comment Actions */}
          <CommentActions
            comment={comment}
            onReply={onReply}
            onEdit={onEdit}
            onDelete={onDelete}
            onMarkAsSpam={onMarkAsSpam}
            onLike={onLike}
          />

          {/* Reply Section */}
          {isReplying && (
            <ReplySection
              comment={comment}
              replyText={replyText}
              onReplyTextChange={onReplyTextChange}
              onSubmitReply={onSubmitReply}
              onCancelReply={onCancelReply}
            />
          )}

          {/* Replies Display */}
          {comment.replies && comment.replies.length > 0 && (
            <div className="mt-4 space-y-3">
              {comment.replies.map(reply => (
                <GlowCard 
                  key={reply.id}
                  glowColor="purple" 
                  customSize={true}
                  className="p-4"
                >
                  <div className="flex space-x-3">
                    <GlowCard 
                      glowColor="blue" 
                      customSize={true}
                      className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0"
                    >
                      <img
                        src={reply.authorProfileImageUrl}
                        alt={reply.authorDisplayName}
                        className="w-full h-full object-cover"
                      />
                    </GlowCard>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="font-medium text-white text-xs">
                          {reply.authorDisplayName}
                        </span>
                        {reply.isOwnComment && (
                          <GlowCard 
                            glowColor="green" 
                            customSize={true}
                            className="px-1 py-0.5"
                          >
                            <span className="text-xs text-green-400">You</span>
                          </GlowCard>
                        )}
                        <span className="text-gray-400 text-xs">
                          {formatDate(reply.publishedAt)}
                        </span>
                      </div>
                      <p className="text-gray-100 text-xs leading-relaxed">
                        {reply.textDisplay}
                      </p>
                    </div>
                  </div>
                </GlowCard>
              ))}
            </div>
          )}
        </div>
      </div>
    </GlowCard>
  );
};

export default CommentCard;
