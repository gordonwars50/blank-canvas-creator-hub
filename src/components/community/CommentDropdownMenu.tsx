
import React from 'react';
import { Edit, Trash } from 'lucide-react';
import { GlowButton } from '@/components/ui/glow-button';

interface CommentDropdownMenuProps {
  onEdit: () => void;
  onDelete: () => void;
}

const CommentDropdownMenu: React.FC<CommentDropdownMenuProps> = ({
  onEdit,
  onDelete
}) => {
  return (
    <div className="flex items-center gap-1">
      <GlowButton
        onClick={onEdit}
        glowColor="green"
        className="w-8 h-8 rounded-full p-0 flex items-center justify-center text-gray-300 hover:text-green-300 border border-gray-600 hover:border-green-400"
      >
        <Edit className="w-4 h-4" />
      </GlowButton>
      
      <GlowButton
        onClick={onDelete}
        glowColor="red"
        className="w-8 h-8 rounded-full p-0 flex items-center justify-center text-gray-300 hover:text-red-300 border border-gray-600 hover:border-red-400"
      >
        <Trash className="w-4 h-4" />
      </GlowButton>
    </div>
  );
};

export default CommentDropdownMenu;
