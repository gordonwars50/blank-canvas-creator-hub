import React, { useState } from 'react';
import { 
  Home, 
  BarChart3, 
  Upload, 
  Calendar, 
  Users, 
  DollarSign, 
  Users as TeamIcon,
  ChevronDown,
  ChevronRight,
  User,
  Settings,
  LogOut,
  X
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Sidebar, SidebarBody, SidebarLink, useSidebar } from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';

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
    id: 'plan-schedule',
    label: 'Plan & Schedule',
    icon: Upload,
    href: '/dashboard/plan-schedule'
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

const Logo = () => {
  const { open, closeWithDelay } = useSidebar();
  
  return (
    <div className={cn(
      "font-normal flex items-center text-sm text-white py-1 relative z-20",
      open ? "justify-between" : "justify-center"
    )}>
      <Link
        to="/dashboard"
        className={cn(
          "flex items-center",
          open ? "space-x-2" : ""
        )}
      >
        <div className="h-5 w-6 bg-red-500 rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
        <motion.span
          animate={{
            opacity: open ? 1 : 0,
            display: open ? "inline-block" : "none"
          }}
          className="font-bold text-white whitespace-pre"
        >
          YOUTILIFY
        </motion.span>
      </Link>
      
      {open && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={closeWithDelay}
          className="p-1 hover:bg-gray-800 rounded-md transition-colors"
        >
          <X className="w-4 h-4 text-gray-400 hover:text-white" />
        </motion.button>
      )}
    </div>
  );
};

const ExpandableMenuItem = ({ item }: { item: SidebarItem }) => {
  const [expanded, setExpanded] = useState(true);
  const location = useLocation();
  const { open } = useSidebar();
  
  const isActive = (href?: string) => {
    if (!href) return false;
    return location.pathname === href || location.pathname.startsWith(href + '/');
  };

  const hasActiveChild = item.children?.some(child => isActive(child.href));

  if (item.href) {
    return (
      <SidebarLink
        link={{
          label: item.label,
          href: item.href,
          icon: (
            <item.icon 
              className={`w-4 h-4 flex-shrink-0 ${
                isActive(item.href) ? 'text-red-400' : 'text-gray-400'
              }`} 
            />
          ),
        }}
        className={`${
          isActive(item.href) ? 'bg-red-500/20 text-red-400' : 'text-gray-400 hover:text-white hover:bg-gray-800'
        }`}
      />
    );
  }

  return (
    <div className="w-full">
      <button
        onClick={() => open && setExpanded(!expanded)}
        className={cn(
          "flex items-center w-full px-3 py-2 rounded-lg transition-all duration-200 text-gray-400 hover:text-white hover:bg-gray-800",
          open ? "justify-between" : "justify-center",
          hasActiveChild ? 'text-red-400' : ''
        )}
      >
        <div className={cn("flex items-center", open ? "gap-2" : "")}>
          <item.icon className="w-4 h-4 flex-shrink-0" />
          <motion.span
            animate={{
              opacity: open ? 1 : 0,
              display: open ? "inline-block" : "none"
            }}
            className="text-sm font-medium whitespace-pre"
          >
            {item.label}
          </motion.span>
        </div>
        {open && item.children && (
          <motion.div
            animate={{ rotate: expanded ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown className="w-4 h-4" />
          </motion.div>
        )}
      </button>

      {item.children && open && (
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden ml-6 mt-1 space-y-1"
            >
              {item.children.map(child => (
                <SidebarLink
                  key={child.id}
                  link={{
                    label: child.label,
                    href: child.href!,
                    icon: (
                      <child.icon 
                        className={`w-3 h-3 flex-shrink-0 ${
                          isActive(child.href) ? 'text-red-400' : 'text-gray-400'
                        }`} 
                      />
                    ),
                  }}
                  className={`text-xs ${
                    isActive(child.href) ? 'bg-red-500/20 text-red-400' : 'text-gray-400 hover:text-white hover:bg-gray-800'
                  }`}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
};

const UserProfile = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const { open } = useSidebar();

  return (
    <div className="relative">
      <button
        onClick={() => open && setShowDropdown(!showDropdown)}
        className={cn(
          "flex items-center w-full p-3 rounded-lg transition-all duration-200 text-gray-400 hover:text-white hover:bg-gray-800",
          open ? "justify-start" : "justify-center"
        )}
      >
        <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0">
          <User className="w-4 h-4 text-white" />
        </div>
        <motion.div
          animate={{
            opacity: open ? 1 : 0,
            display: open ? "block" : "none"
          }}
          className="ml-3 text-left flex-1"
        >
          <div className="text-sm font-medium text-white">John Creator</div>
          <div className="text-xs text-gray-500">Main Channel</div>
        </motion.div>
        {open && (
          <ChevronDown className="w-4 h-4 flex-shrink-0" />
        )}
      </button>

      {showDropdown && open && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          className="absolute bottom-full left-0 right-0 mb-2 bg-gray-900 border border-gray-700 rounded-lg shadow-lg overflow-hidden z-50"
        >
          <div className="p-2">
            <div className="px-3 py-2 text-xs text-gray-500 uppercase tracking-wide">
              Switch Channel
            </div>
            <button className="flex items-center w-full px-3 py-2 rounded-md hover:bg-gray-800 text-sm text-gray-300">
              <div className="w-6 h-6 bg-blue-500 rounded-full mr-3"></div>
              Gaming Channel
            </button>
            <button className="flex items-center w-full px-3 py-2 rounded-md hover:bg-gray-800 text-sm text-gray-300">
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
  );
};

interface NewAppSidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

const NewAppSidebar: React.FC<NewAppSidebarProps> = ({ collapsed, onToggle }) => {
  return (
    <Sidebar open={!collapsed} setOpen={(open) => onToggle()} animate={true}>
      <SidebarBody className="justify-between gap-10 h-screen bg-black border-r border-gray-800 scrollbar-hide overflow-y-auto">
        <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden scrollbar-hide">
          <Logo />
          <div className="mt-8 flex flex-col gap-2">
            {sidebarItems.map((item) => (
              <ExpandableMenuItem key={item.id} item={item} />
            ))}
          </div>
        </div>
        <div>
          <UserProfile />
        </div>
      </SidebarBody>
    </Sidebar>
  );
};

export default NewAppSidebar;
