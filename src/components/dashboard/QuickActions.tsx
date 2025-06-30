
import React from 'react';
import { motion } from 'framer-motion';
import { Upload, Radio, UserPlus } from 'lucide-react';

const QuickActions: React.FC = () => {
  const actions = [
    {
      id: 'upload',
      label: 'Upload Video',
      icon: Upload,
      color: 'bg-red-500 hover:bg-red-600',
      href: '/dashboard/upload'
    },
    {
      id: 'livestream',
      label: 'Schedule Livestream',
      icon: Radio,
      color: 'bg-blue-500 hover:bg-blue-600',
      href: '/dashboard/livestreams'
    },
    {
      id: 'team',
      label: 'Add Team Member',
      icon: UserPlus,
      color: 'bg-green-500 hover:bg-green-600',
      href: '/dashboard/team'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6 }}
      className="bg-gray-900 border border-gray-800 rounded-lg p-6"
    >
      <h2 className="text-lg font-semibold text-white mb-6">Quick Actions</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {actions.map((action, index) => (
          <motion.button
            key={action.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.7 + index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`
              flex items-center justify-center space-x-2 p-4 rounded-lg
              ${action.color} text-white font-medium
              transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900
            `}
          >
            <action.icon className="w-5 h-5" />
            <span>{action.label}</span>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};

export default QuickActions;
