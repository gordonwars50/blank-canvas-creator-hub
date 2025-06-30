
import React from 'react';
import { Reply, Edit, Trash, Circle } from 'lucide-react';
import { GlowButton } from '@/components/ui/glow-button';

interface CommentActionsProps {
  isOwnComment: boolean;
  onReply: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  onMarkAsSpam?: () => void;
}

const CommentActions: React.FC<CommentActionsProps> = ({
  isOwnComment,
  onReply,
  onEdit,
  onDelete,
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

      {isOwnComment ? (
        /* Actions for own comments */
        <>
          <GlowButton
            onClick={onEdit}
            glowColor="green"
            leftIcon={<Edit className="w-3 h-3" />}
            className="px-3 py-1.5 rounded-full text-xs font-medium text-green-300 hover:text-green-200"
          >
            Edit
          </GlowButton>
          
          <GlowButton
            onClick={onDelete}
            glowColor="red"
            leftIcon={<Trash className="w-3 h-3" />}
            className="px-3 py-1.5 rounded-full text-xs font-medium text-red-300 hover:text-red-200"
          >
            Delete
          </GlowButton>
        </>
      ) : (
        /* Actions for others' comments */
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
