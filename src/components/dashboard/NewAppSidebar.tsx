
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Home, 
  Calendar, 
  BarChart3, 
  DollarSign, 
  MessageCircle, 
  Settings, 
  ChevronLeft, 
  ChevronRight,
  Users,
  User,
  Bell,
  LogOut,
  HelpCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

interface NewAppSidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

const NewAppSidebar: React.FC<NewAppSidebarProps> = ({ collapsed, onToggle }) => {
  const location = useLocation();
  const [notifications] = useState(3); // Mock notification count

  const isActive = (path: string) => location.pathname === path;

  const sidebarVariants = {
    expanded: { width: '300px' },
    collapsed: { width: '60px' }
  };

  const contentVariants = {
    expanded: { opacity: 1, x: 0 },
    collapsed: { opacity: 0, x: -10 }
  };

  return (
    <motion.div 
      className="h-screen bg-black border-r border-gray-800 flex flex-col fixed left-0 top-0 z-50"
      variants={sidebarVariants}
      animate={collapsed ? 'collapsed' : 'expanded'}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
    >
      {/* Header */}
      <div className="p-4 border-b border-gray-800 flex items-center justify-between">
        <AnimatePresence mode="wait">
          {!collapsed && (
            <motion.div
              key="logo"
              variants={contentVariants}
              initial="collapsed"
              animate="expanded"
              exit="collapsed"
              transition={{ duration: 0.2 }}
              className="flex items-center space-x-2"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">Y</span>
              </div>
              <span className="text-white font-semibold text-lg">YOUTILIFY</span>
            </motion.div>
          )}
        </AnimatePresence>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggle}
          className="text-gray-400 hover:text-white hover:bg-gray-800 p-1 h-8 w-8"
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </Button>
      </div>

      {/* Main Navigation - Hidden */}
      <div className="flex-1 px-3 py-4 space-y-1 opacity-0 pointer-events-none">
        {/* Navigation items are hidden */}
      </div>

      {/* Team / Gear Management - Only visible item */}
      <div className="px-3 py-2">
        <Link to="/dashboard/team">
          <motion.div
            className={`flex items-center px-3 py-2 rounded-lg transition-colors ${
              isActive('/dashboard/team')
                ? 'bg-blue-600 text-white'
                : 'text-gray-400 hover:text-white hover:bg-gray-800'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Users className="w-5 h-5 flex-shrink-0" />
            <AnimatePresence mode="wait">
              {!collapsed && (
                <motion.span
                  variants={contentVariants}
                  initial="collapsed"
                  animate="expanded"
                  exit="collapsed"
                  transition={{ duration: 0.2 }}
                  className="ml-3 text-sm font-medium"
                >
                  Team / Gear Management
                </motion.span>
              )}
            </AnimatePresence>
          </motion.div>
        </Link>
      </div>

      {/* Profile Section */}
      <div className="p-4 border-t border-gray-800 space-y-3">
        {/* Notifications */}
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            className="text-gray-400 hover:text-white hover:bg-gray-800 p-2 h-9 w-9 relative"
          >
            <Bell className="w-4 h-4" />
            {notifications > 0 && (
              <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 text-xs bg-red-500 text-white">
                {notifications}
              </Badge>
            )}
          </Button>

          <AnimatePresence mode="wait">
            {!collapsed && (
              <motion.div
                variants={contentVariants}
                initial="collapsed"
                animate="expanded"
                exit="collapsed"
                transition={{ duration: 0.2 }}
                className="flex space-x-2"
              >
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-400 hover:text-white hover:bg-gray-800 p-2 h-9 w-9"
                >
                  <HelpCircle className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-400 hover:text-white hover:bg-gray-800 p-2 h-9 w-9"
                >
                  <Settings className="w-4 h-4" />
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* User Profile */}
        <div className="flex items-center space-x-3">
          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-sm">
              JD
            </AvatarFallback>
          </Avatar>
          
          <AnimatePresence mode="wait">
            {!collapsed && (
              <motion.div
                variants={contentVariants}
                initial="collapsed"
                animate="expanded"
                exit="collapsed"
                transition={{ duration: 0.2 }}
                className="flex-1 min-w-0"
              >
                <div className="flex items-center justify-between">
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-white truncate">John Doe</p>
                    <p className="text-xs text-gray-400 truncate">Director</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-gray-400 hover:text-white hover:bg-gray-800 p-1 h-6 w-6 ml-2"
                  >
                    <LogOut className="w-3 h-3" />
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

export default NewAppSidebar;
