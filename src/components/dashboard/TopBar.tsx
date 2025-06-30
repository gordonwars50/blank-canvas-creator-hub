import React, { useState } from 'react';
import { Search, Bell, Menu, Upload } from 'lucide-react';
import { GlowCard } from '@/components/ui/spotlight-card';
import { GlowInput } from '@/components/ui/glow-input';
import { GlowButton } from '@/components/ui/glow-button';
import { useNotifications } from '@/contexts/NotificationContext';
import NotificationPanel from './NotificationPanel';

interface TopBarProps {
  title: string;
  onMenuClick: () => void;
  showMobileMenu?: boolean;
  hideQuickActions?: boolean;
}

const TopBar: React.FC<TopBarProps> = ({ 
  title, 
  onMenuClick, 
  showMobileMenu = false,
  hideQuickActions = false
}) => {
  const [searchValue, setSearchValue] = useState('');
  const [notificationPanelOpen, setNotificationPanelOpen] = useState(false);
  const { unreadCount } = useNotifications();

  const quickActions = [
    {
      id: 'upload',
      label: 'Upload Video',
      icon: Upload,
      color: 'bg-red-600 hover:bg-red-700',
      href: '/dashboard/upload'
    }
  ];

  return (
    <div className="bg-black border-b border-gray-800 px-4 py-3 flex items-center justify-between">
      {/* Left side */}
      <div className="flex items-center space-x-4">
        {showMobileMenu && (
          <button
            onClick={onMenuClick}
            className="md:hidden p-2 rounded-lg hover:bg-gray-800 text-gray-400"
          >
            <Menu className="w-5 h-5" />
          </button>
        )}
        
        <div>
          <h1 className="text-xl font-semibold text-white">{title}</h1>
        </div>
      </div>

      {/* Center - Search (hidden when hideQuickActions is true) */}
      {!hideQuickActions && (
        <div className="hidden md:flex flex-1 max-w-md mx-8">
          <GlowInput
            glowColor="red"
            placeholder="Search videos, comments..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            leftIcon={<Search className="w-4 h-4" />}
            className="h-10"
          />
        </div>
      )}

      {/* Right side */}
      <div className="flex items-center space-x-3">
        {/* Mobile search (hidden when hideQuickActions is true) */}
        {!hideQuickActions && (
          <GlowCard 
            glowColor="red" 
            customSize={true}
            className="md:hidden w-auto h-auto aspect-auto grid-rows-none gap-0 p-0 bg-transparent border-0 shadow-none backdrop-blur-none"
          >
            <button className="p-2 rounded-lg hover:bg-gray-800 text-gray-400">
              <Search className="w-5 h-5" />
            </button>
          </GlowCard>
        )}

        {/* Quick Actions (hidden when hideQuickActions is true) */}
        {!hideQuickActions && (
          <>
            <div className="hidden sm:flex items-center space-x-3">
              {quickActions.map((action) => (
                <GlowButton
                  key={action.id}
                  glowColor="red"
                  leftIcon={<action.icon className="w-4 h-4" />}
                  className={`${action.color} rounded-full h-10`}
                >
                  <span className="hidden lg:block">{action.label}</span>
                </GlowButton>
              ))}
            </div>

            {/* Mobile Quick Actions - Icons only */}
            <div className="sm:hidden flex items-center space-x-2">
              {quickActions.map((action) => (
                <GlowButton
                  key={action.id}
                  glowColor="red"
                  leftIcon={<action.icon className="w-4 h-4" />}
                  className={`${action.color} rounded-full p-2 h-10 w-10`}
                >
                  <span className="sr-only">{action.label}</span>
                </GlowButton>
              ))}
            </div>
          </>
        )}

        {/* Notifications */}
        <div className="relative">
          <GlowButton
            glowColor="red"
            className="bg-gray-800 hover:bg-gray-700 rounded-full h-12 w-12 p-0 flex items-center justify-center relative transition-all duration-200"
            onClick={() => setNotificationPanelOpen(!notificationPanelOpen)}
          >
            <Bell className="w-6 h-6 text-gray-300" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 min-w-[20px] h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center px-1 font-medium shadow-lg border-2 border-black z-20">
                {unreadCount > 99 ? '99+' : unreadCount}
              </span>
            )}
          </GlowButton>
          
          <NotificationPanel 
            isOpen={notificationPanelOpen}
            onClose={() => setNotificationPanelOpen(false)}
          />
        </div>
      </div>
    </div>
  );
};

export default TopBar;
