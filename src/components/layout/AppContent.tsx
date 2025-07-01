
import React from 'react';
import { useLocation } from 'react-router-dom';
import SmoothScrollProvider from '@/components/providers/SmoothScrollProvider';
import AppBackground from './AppBackground';
import AppRoutes from '../routing/AppRoutes';

const AppContent: React.FC = () => {
  const location = useLocation();
  const isLandingPage = location.pathname === '/';

  return (
    <SmoothScrollProvider enabled={isLandingPage}>
      <AppBackground>
        <AppRoutes />
      </AppBackground>
    </SmoothScrollProvider>
  );
};

export default AppContent;
