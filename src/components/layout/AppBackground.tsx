
import React from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

interface AppBackgroundProps {
  children: React.ReactNode;
}

const AppBackground: React.FC<AppBackgroundProps> = ({ children }) => {
  const location = useLocation();
  const isLightPage = location.pathname === '/privacy-policy';

  return (
    <motion.div
      key="app-background"
      initial={false}
      animate={{
        backgroundColor: isLightPage ? '#f9fafb' : '#000000'
      }}
      transition={{
        duration: 0.6,
        ease: "easeInOut"
      }}
      className="min-h-screen"
    >
      {children}
    </motion.div>
  );
};

export default AppBackground;
