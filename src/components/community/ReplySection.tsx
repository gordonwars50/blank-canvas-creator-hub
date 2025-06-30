
import React, { useState } from 'react';
import { GlowCard } from '@/components/ui/spotlight-card';
import { GlowTextarea } from '@/components/ui/glow-textarea';
import { GlowButton } from '@/components/ui/glow-button';
import { Reply } from '@/types/comments';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface ReplySectionProps {
  isEditing?: boolean;
  initialText?: string;
  replies?: Reply[];
  showReplies?: boolean;
  onSubmit: (text: string) => void;
  onCancel: () => void;
  onToggleReplies?: () => void;
}

const ReplySection: React.FC<ReplySectionProps> = ({
  isEditing = false,
  initialText = '',
  replies = [],
  showReplies = false,
  onSubmit,
  onCancel,
  onToggleReplies
}) => {
  const [text, setText] = useState(initialText);

  const handleSubmit = () => {
    if (text.trim()) {
      onSubmit(text.trim());
      setText('');
    }
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return `${Math.floor(diffInHours / 24)}d ago`;
  };

  return (
    <div className="mt-4 space-y-4">
      {/* Reply/Edit Input */}
      <GlowCard glowColor="purple" customSize className="w-full p-4">
        <div className="space-y-3">
          <GlowTextarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={isEditing ? "Edit your comment..." : "Write a reply..."}
            glowColor="purple"
            className="min-h-[80px] resize-none"
            rows={3}
          />
          
          <div className="flex gap-2 justify-end">
            <GlowButton
              onClick={onCancel}
              glowColor="red"
              className="px-4 py-2 rounded-full text-sm font-medium text-gray-300 hover:text-white"
            >
              Cancel
            </GlowButton>
            
            <GlowButton
              onClick={handleSubmit}
              glowColor="green"
              className="px-4 py-2 rounded-full text-sm font-medium text-green-300 hover:text-green-200"
              disabled={!text.trim()}
            >
              {isEditing ? 'Update' : 'Reply'}
            </GlowButton>
          </div>
        </div>
      </GlowCard>

      {/* Replies List */}
      {replies.length > 0 && (
        <div className="ml-8">
          <GlowButton
            onClick={onToggleReplies}
            glowColor="blue"
            className="px-3 py-1 rounded-full text-xs font-medium text-blue-300 hover:text-blue-200 mb-3"
          >
            {showReplies ? 'Hide' : 'Show'} {replies.length} {replies.length === 1 ? 'reply' : 'replies'}
          </GlowButton>
          
          {showReplies && (
            <div className="space-y-3">
              {replies.map((reply) => (
                <GlowCard key={reply.id} glowColor="green" customSize className="w-full p-4">
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
                </GlowCard>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ReplySection;
