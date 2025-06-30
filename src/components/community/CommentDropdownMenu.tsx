
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
    <div className="flex items-center gap-2">
      <GlowButton
        onClick={onEdit}
        glowColor="green"
        className="w-8 h-8 rounded-full p-0 text-gray-400 hover:text-green-300"
      >
        <Edit className="w-4 h-4" />
      </GlowButton>
      
      <GlowButton
        onClick={onDelete}
        glowColor="red"
        className="w-8 h-8 rounded-full p-0 text-gray-400 hover:text-red-300"
      >
        <Trash className="w-4 h-4" />
      </GlowButton>
    </div>
  );
};

export default CommentDropdownMenu;
