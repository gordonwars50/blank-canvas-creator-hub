
import React from 'react';
import { Reply } from 'lucide-react';
import { GlowButton } from '@/components/ui/glow-button';

interface CommentActionsProps {
  isOwnComment: boolean;
  showReplyButton?: boolean;
  onReply: () => void;
  onMarkAsSpam?: () => void;
}

const CommentActions: React.FC<CommentActionsProps> = ({
  isOwnComment,
  showReplyButton = true,
  onReply,
  onMarkAsSpam
}) => {
  return (
    <div className="flex flex-wrap gap-2 mt-3">
      {/* Reply Button - Available for all comments, but conditionally shown */}
      {showReplyButton && (
        <GlowButton
          onClick={onReply}
          glowColor="blue"
          leftIcon={<Reply className="w-3 h-3" />}
          className="px-3 py-1.5 rounded-full text-xs font-medium text-blue-300 hover:text-blue-200"
        >
          Reply
        </GlowButton>
      )}

      {/* Mark as Spam - Only for others' comments */}
      {!isOwnComment && (
        <GlowButton
          onClick={onMarkAsSpam}
          glowColor="red"
          className="px-3 py-1.5 rounded-full text-xs font-medium text-red-300 hover:text-red-200"
        >
          Mark as Spam
        </GlowButton>
      )}
    </div>
  );
};

export default CommentActions;
