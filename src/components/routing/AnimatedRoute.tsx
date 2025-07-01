
import React from 'react';
import { motion } from 'framer-motion';

interface AnimatedRouteProps {
  children: React.ReactNode;
}

const AnimatedRoute: React.FC<AnimatedRouteProps> = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedRoute;
