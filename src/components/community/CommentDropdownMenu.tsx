
import React from 'react';
import { MoreHorizontal, Edit, Trash } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
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
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <GlowButton
          glowColor="purple"
          className="w-8 h-8 rounded-full p-0 text-gray-400 hover:text-white"
        >
          <MoreHorizontal className="w-4 h-4" />
        </GlowButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        className="z-[100] bg-gray-800 border border-gray-600 shadow-lg min-w-[120px]"
        align="end"
        sideOffset={5}
      >
        <DropdownMenuItem 
          onClick={onEdit}
          className="text-green-300 hover:text-green-200 hover:bg-gray-700 cursor-pointer focus:bg-gray-700 focus:text-green-200"
        >
          <Edit className="w-4 h-4 mr-2" />
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={onDelete}
          className="text-red-300 hover:text-red-200 hover:bg-gray-700 cursor-pointer focus:bg-gray-700 focus:text-red-200"
        >
          <Trash className="w-4 h-4 mr-2" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CommentDropdownMenu;
