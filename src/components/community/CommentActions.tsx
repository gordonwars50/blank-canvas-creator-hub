
import React from 'react';
import { MessageSquare, Edit3, Trash2, Flag, Heart } from 'lucide-react';
import { YouTubeComment } from '@/types/comments';
import { GlowCard } from '@/components/ui/spotlight-card';

interface CommentActionsProps {
  comment: YouTubeComment;
  onReply: (commentId: string) => void;
  onEdit: (commentId: string) => void;
  onDelete: (commentId: string) => void;
  onMarkAsSpam: (commentId: string) => void;
  onLike: (commentId: string) => void;
}

const CommentActions: React.FC<CommentActionsProps> = ({
  comment,
  onReply,
  onEdit,
  onDelete,
  onMarkAsSpam,
  onLike
}) => {
  return (
    <div className="flex items-center space-x-2 mt-3">
      <GlowCard 
        glowColor="red" 
        customSize={true}
        className="px-3 py-2 cursor-pointer hover:opacity-80"
        onClick={() => onLike(comment.id)}
      >
        <div className="flex items-center space-x-1">
          <Heart className="w-4 h-4 text-red-400" />
          <span className="text-sm text-red-400">{comment.likeCount}</span>
        </div>
      </GlowCard>
      
      <GlowCard 
        glowColor="blue" 
        customSize={true}
        className="px-3 py-2 cursor-pointer hover:opacity-80"
        onClick={() => onReply(comment.id)}
      >
        <div className="flex items-center space-x-1">
          <MessageSquare className="w-4 h-4 text-blue-400" />
          <span className="text-sm text-blue-400">Reply</span>
        </div>
      </GlowCard>

      {comment.isOwnComment ? (
        <>
          <GlowCard 
            glowColor="green" 
            customSize={true}
            className="px-3 py-2 cursor-pointer hover:opacity-80"
            onClick={() => onEdit(comment.id)}
          >
            <div className="flex items-center space-x-1">
              <Edit3 className="w-4 h-4 text-green-400" />
              <span className="text-sm text-green-400">Edit</span>
            </div>
          </GlowCard>
          
          <GlowCard 
            glowColor="red" 
            customSize={true}
            className="px-3 py-2 cursor-pointer hover:opacity-80"
            onClick={() => onDelete(comment.id)}
          >
            <div className="flex items-center space-x-1">
              <Trash2 className="w-4 h-4 text-red-400" />
              <span className="text-sm text-red-400">Delete</span>
            </div>
          </GlowCard>
        </>
      ) : (
        <GlowCard 
          glowColor="orange" 
          customSize={true}
          className="px-3 py-2 cursor-pointer hover:opacity-80"
          onClick={() => onMarkAsSpam(comment.id)}
        >
          <div className="flex items-center space-x-1">
            <Flag className="w-4 h-4 text-orange-400" />
            <span className="text-sm text-orange-400">Spam</span>
          </div>
        </GlowCard>
      )}
    </div>
  );
};

export default CommentActions;
