
import React, { useState } from 'react';
import NewAppSidebar from './NewAppSidebar';
import TopBar from './TopBar';
import { NotificationProvider } from '@/contexts/NotificationContext';

interface DashboardLayoutProps {
  children: React.ReactNode;
  title: string;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children, title }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true); // Start collapsed
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <NotificationProvider>
      <div className="min-h-screen bg-black flex w-full">
        {/* Fixed Sidebar */}
        <NewAppSidebar collapsed={sidebarCollapsed} onToggle={toggleSidebar} />

        {/* Main Content with left margin to account for fixed sidebar */}
        <div 
          className="flex-1 flex flex-col min-w-0 transition-all duration-300"
          style={{ 
            marginLeft: sidebarCollapsed ? '60px' : '300px'
          }}
        >
          <div className="sticky top-0 z-50">
            <TopBar 
              title={title} 
              onMenuClick={toggleMobileMenu}
              showMobileMenu={true}
            />
          </div>
          
          <main className="flex-1 p-6 overflow-auto">
            {children}
          </main>
        </div>
      </div>
    </NotificationProvider>
  );
};

export default DashboardLayout;
