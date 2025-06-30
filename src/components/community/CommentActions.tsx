
import React from 'react';
import { Reply, Circle } from 'lucide-react';
import { GlowButton } from '@/components/ui/glow-button';

interface CommentActionsProps {
  isOwnComment: boolean;
  onReply: () => void;
  onMarkAsSpam?: () => void;
}

const CommentActions: React.FC<CommentActionsProps> = ({
  isOwnComment,
  onReply,
  onMarkAsSpam
}) => {
  return (
    <div className="flex flex-wrap gap-2 mt-3">
      {/* Reply Button - Available for all comments */}
      <GlowButton
        onClick={onReply}
        glowColor="blue"
        leftIcon={<Reply className="w-3 h-3" />}
        className="px-3 py-1.5 rounded-full text-xs font-medium text-blue-300 hover:text-blue-200"
      >
        Reply
      </GlowButton>

      {/* Mark as Spam - Only for others' comments */}
      {!isOwnComment && (
        <GlowButton
          onClick={onMarkAsSpam}
          glowColor="orange"
          leftIcon={<Circle className="w-3 h-3" />}
          className="px-3 py-1.5 rounded-full text-xs font-medium text-orange-300 hover:text-orange-200"
        >
          Mark as Spam
        </GlowButton>
      )}
    </div>
  );
};

export default CommentActions;
