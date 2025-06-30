
import React from 'react';
import { Edit, Trash } from 'lucide-react';

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
      <button
        onClick={onEdit}
        className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-green-400 hover:bg-green-400/10 transition-colors"
      >
        <Edit className="w-4 h-4" />
      </button>
      
      <button
        onClick={onDelete}
        className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-red-400 hover:bg-red-400/10 transition-colors"
      >
        <Trash className="w-4 h-4" />
      </button>
    </div>
  );
};

export default CommentDropdownMenu;
