
import React, { useState } from 'react';
import { 
  Home, 
  BarChart3, 
  Upload, 
  Radio, 
  Calendar, 
  Users, 
  DollarSign, 
  Users as TeamIcon,
  ChevronDown,
  ChevronRight,
  User,
  Settings,
  LogOut
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

interface SidebarItem {
  id: string;
  label: string;
  icon: React.ComponentType<any>;
  href?: string;
  children?: SidebarItem[];
}

const sidebarItems: SidebarItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: Home,
    href: '/dashboard'
  },
  {
    id: 'analytics',
    label: 'Analytics',
    icon: BarChart3,
    children: [
      { id: 'overview', label: 'Overview', icon: BarChart3, href: '/dashboard/analytics/overview' },
      { id: 'growth', label: 'Growth Trends', icon: BarChart3, href: '/dashboard/analytics/growth' },
      { id: 'engagement', label: 'Engagement', icon: BarChart3, href: '/dashboard/analytics/engagement' },
      { id: 'revenue', label: 'Revenue', icon: BarChart3, href: '/dashboard/analytics/revenue' }
    ]
  },
  {
    id: 'upload',
    label: 'Upload & Scheduling',
    icon: Upload,
    href: '/dashboard/upload'
  },
  {
    id: 'livestreams',
    label: 'Live Streams',
    icon: Radio,
    href: '/dashboard/livestreams'
  },
  {
    id: 'calendar',
    label: 'Content Calendar',
    icon: Calendar,
    href: '/dashboard/calendar'
  },
  {
    id: 'community',
    label: 'Community',
    icon: Users,
    href: '/dashboard/community'
  },
  {
    id: 'monetization',
    label: 'Monetization',
    icon: DollarSign,
    href: '/dashboard/monetization'
  },
  {
    id: 'team',
    label: 'Team',
    icon: TeamIcon,
    href: '/dashboard/team'
  }
];

interface AppSidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

const AppSidebar: React.FC<AppSidebarProps> = ({ collapsed, onToggle }) => {
  const location = useLocation();
  const [expandedItems, setExpandedItems] = useState<string[]>(['analytics']);
  const [showChannelDropdown, setShowChannelDropdown] = useState(false);

  const toggleExpanded = (itemId: string) => {
    setExpandedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const isActive = (href?: string) => {
    if (!href) return false;
    return location.pathname === href || location.pathname.startsWith(href + '/');
  };

  const renderSidebarItem = (item: SidebarItem, level = 0) => {
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedItems.includes(item.id);
    const active = isActive(item.href);

    return (
      <div key={item.id} className="w-full">
        {item.href ? (
          <Link
            to={item.href}
            className={`
              flex items-center w-full px-3 py-2.5 rounded-lg transition-all duration-200
              ${active ? 'bg-red-500/20 text-red-400' : 'text-gray-400 hover:text-white hover:bg-gray-800'}
              ${level > 0 ? 'ml-6 pl-2' : ''}
              ${collapsed ? 'justify-center' : 'justify-start'}
            `}
          >
            <item.icon className={`${collapsed ? 'w-5 h-5' : 'w-4 h-4'} flex-shrink-0`} />
            {!collapsed && (
              <span className="ml-3 text-sm font-medium">{item.label}</span>
            )}
          </Link>
        ) : (
          <button
            onClick={() => !collapsed && toggleExpanded(item.id)}
            className={`
              flex items-center w-full px-3 py-2.5 rounded-lg transition-all duration-200
              text-gray-400 hover:text-white hover:bg-gray-800
              ${collapsed ? 'justify-center' : 'justify-between'}
            `}
          >
            <div className="flex items-center">
              <item.icon className={`${collapsed ? 'w-5 h-5' : 'w-4 h-4'} flex-shrink-0`} />
              {!collapsed && (
                <span className="ml-3 text-sm font-medium">{item.label}</span>
              )}
            </div>
            {!collapsed && hasChildren && (
              <div className="transition-transform duration-200">
                {isExpanded ? (
                  <ChevronDown className="w-4 h-4" />
                ) : (
                  <ChevronRight className="w-4 h-4" />
                )}
              </div>
            )}
          </button>
        )}

        {hasChildren && !collapsed && (
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <div className="mt-1 space-y-1">
                  {item.children?.map(child => renderSidebarItem(child, level + 1))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </div>
    );
  };

  return (
    <motion.div
      animate={{ width: collapsed ? 80 : 250 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="bg-black border-r border-gray-800 h-screen flex flex-col sticky top-0"
    >
      {/* Header */}
      <div className="p-4 border-b border-gray-800">
        {!collapsed ? (
          <div className="text-white font-bold text-xl">YOUTILIFY</div>
        ) : (
          <div className="text-white font-bold text-center">YT</div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex-1 p-4 space-y-2 overflow-y-auto">
        {sidebarItems.map(item => renderSidebarItem(item))}
      </div>

      {/* User Profile */}
      <div className="p-4 border-t border-gray-800">
        <div className="relative">
          <button
            onClick={() => !collapsed && setShowChannelDropdown(!showChannelDropdown)}
            className={`
              flex items-center w-full p-3 rounded-lg transition-all duration-200
              text-gray-400 hover:text-white hover:bg-gray-800
              ${collapsed ? 'justify-center' : 'justify-between'}
            `}
          >
            <div className="flex items-center">
              <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0">
                <User className="w-4 h-4 text-white" />
              </div>
              {!collapsed && (
                <div className="ml-3 text-left">
                  <div className="text-sm font-medium text-white">John Creator</div>
                  <div className="text-xs text-gray-500">Main Channel</div>
                </div>
              )}
            </div>
            {!collapsed && (
              <ChevronDown className="w-4 h-4 flex-shrink-0" />
            )}
          </button>

          {showChannelDropdown && !collapsed && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute bottom-full left-0 right-0 mb-2 bg-gray-900 border border-gray-700 rounded-lg shadow-lg overflow-hidden"
            >
              <div className="p-2">
                <div className="px-3 py-2 text-xs text-gray-500 uppercase tracking-wide">
                  Switch Channel
                </div>
                <button className="flex items-center w-full px-3 py-2 rounded-md hover:bg-gray-800 text-sm">
                  <div className="w-6 h-6 bg-blue-500 rounded-full mr-3"></div>
                  Gaming Channel
                </button>
                <button className="flex items-center w-full px-3 py-2 rounded-md hover:bg-gray-800 text-sm">
                  <div className="w-6 h-6 bg-green-500 rounded-full mr-3"></div>
                  Tech Reviews
                </button>
                <hr className="my-2 border-gray-700" />
                <button className="flex items-center w-full px-3 py-2 rounded-md hover:bg-gray-800 text-sm text-gray-400">
                  <Settings className="w-4 h-4 mr-3" />
                  Settings
                </button>
                <button className="flex items-center w-full px-3 py-2 rounded-md hover:bg-gray-800 text-sm text-gray-400">
                  <LogOut className="w-4 h-4 mr-3" />
                  Sign Out
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default AppSidebar;
