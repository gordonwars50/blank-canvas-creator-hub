
import React from 'react';
import { Send, X } from 'lucide-react';
import { YouTubeComment } from '@/types/comments';
import { GlowCard } from '@/components/ui/spotlight-card';

interface ReplySectionProps {
  comment: YouTubeComment;
  replyText: string;
  onReplyTextChange: (text: string) => void;
  onSubmitReply: (commentId: string, replyText: string) => void;
  onCancelReply: () => void;
}

const ReplySection: React.FC<ReplySectionProps> = ({
  comment,
  replyText,
  onReplyTextChange,
  onSubmitReply,
  onCancelReply
}) => {
  const handleSubmit = () => {
    if (replyText.trim()) {
      onSubmitReply(comment.id, replyText);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <GlowCard 
      glowColor="purple" 
      customSize={true}
      className="mt-4 p-4"
    >
      <div className="space-y-3">
        <div className="flex items-center space-x-2 text-sm text-gray-400">
          <span>Replying to</span>
          <span className="text-white font-medium">{comment.authorDisplayName}</span>
        </div>
        
        <GlowCard 
          glowColor="blue" 
          customSize={true}
          className="p-3"
        >
          <textarea
            value={replyText}
            onChange={(e) => onReplyTextChange(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Write a reply..."
            className="w-full bg-transparent border-none text-white placeholder-gray-400 resize-none focus:outline-none"
            rows={3}
          />
        </GlowCard>

        <div className="flex items-center justify-between">
          <div className="text-xs text-gray-400">
            Press Enter to send, Shift+Enter for new line
          </div>
          <div className="flex space-x-2">
            <GlowCard 
              glowColor="red" 
              customSize={true}
              className="px-4 py-2 cursor-pointer hover:opacity-80"
              onClick={onCancelReply}
            >
              <div className="flex items-center space-x-1">
                <X className="w-4 h-4 text-red-400" />
                <span className="text-sm text-red-400">Cancel</span>
              </div>
            </GlowCard>
            <GlowCard 
              glowColor="green" 
              customSize={true}
              className={`px-4 py-2 cursor-pointer hover:opacity-80 ${
                !replyText.trim() ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              onClick={handleSubmit}
            >
              <div className="flex items-center space-x-1">
                <Send className="w-4 h-4 text-green-400" />
                <span className="text-sm text-green-400">Reply</span>
              </div>
            </GlowCard>
          </div>
        </div>
      </div>
    </GlowCard>
  );
};

export default ReplySection;
