
import React from 'react';
import { MessageSquare, Edit3, Trash2, Flag, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { YouTubeComment } from '@/types/comments';

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
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onLike(comment.id)}
        className="text-gray-400 hover:text-red-400 h-8 px-2"
      >
        <Heart className="w-4 h-4 mr-1" />
        {comment.likeCount}
      </Button>
      
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onReply(comment.id)}
        className="text-gray-400 hover:text-white h-8 px-2"
      >
        <MessageSquare className="w-4 h-4 mr-1" />
        Reply
      </Button>

      {comment.isOwnComment ? (
        <>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onEdit(comment.id)}
            className="text-gray-400 hover:text-blue-400 h-8 px-2"
          >
            <Edit3 className="w-4 h-4 mr-1" />
            Edit
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDelete(comment.id)}
            className="text-gray-400 hover:text-red-400 h-8 px-2"
          >
            <Trash2 className="w-4 h-4 mr-1" />
            Delete
          </Button>
        </>
      ) : (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onMarkAsSpam(comment.id)}
          className="text-gray-400 hover:text-yellow-400 h-8 px-2"
        >
          <Flag className="w-4 h-4 mr-1" />
          Spam
        </Button>
      )}
    </div>
  );
};

export default CommentActions;
