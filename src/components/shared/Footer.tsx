
import { Card } from "@/components/ui/card";
import { Twitter, Instagram, Facebook, Linkedin } from "lucide-react";
import { motion } from "framer-motion";
import socialData from "@/data/social.json";
import { Link, useNavigate, useLocation } from "react-router-dom";

const iconMap = {
  twitter: Twitter,
  instagram: Instagram,
  facebook: Facebook,
  linkedin: Linkedin,
};

interface FooterProps {
  theme?: "light" | "dark";
}

function FloatingPaths({ position, theme = "dark" }: { position: number; theme?: "light" | "dark" }) {
  const paths = Array.from({ length: 36 }, (_, i) => ({
    id: i,
    d: `M-${380 - i * 5 * position} -${189 + i * 6}C-${
      380 - i * 5 * position
    } -${189 + i * 6} -${312 - i * 5 * position} ${216 - i * 6} ${
      152 - i * 5 * position
    } ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${
      684 - i * 5 * position
    } ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`,
    color: `rgba(15,23,42,${0.1 + i * 0.03})`,
    width: 0.5 + i * 0.03,
  }));

  const isDark = theme === "dark";

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <svg
        className={`w-full h-full ${isDark ? 'text-white opacity-20' : 'text-gray-300 opacity-30'}`}
        viewBox="0 0 696 316"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
      >
        <title>Background Paths</title>
        {paths.map((path) => (
          <motion.path
            key={path.id}
            d={path.d}
            stroke="currentColor"
            strokeWidth={path.width}
            strokeOpacity={0.1 + path.id * 0.03}
            initial={{ pathLength: 0.3, opacity: 0.6 }}
            animate={{
              pathLength: 1,
              opacity: [0.3, 0.6, 0.3],
              pathOffset: [0, 1, 0],
            }}
            transition={{
              duration: 20 + Math.random() * 10,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />
        ))}
      </svg>
    </div>
  );
}

const Footer = ({ theme = "dark" }: FooterProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (path: string, sectionId?: string) => {
    if (path === location.pathname && sectionId) {
      // Same page - scroll to section
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // Different page - navigate and scroll to top
      navigate(path);
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 100);
    }
  };

  const isDark = theme === "dark";
  
  return (
    <section className={`w-full py-12 sm:py-20 ${isDark ? 'bg-black' : 'bg-gray-100'} overflow-hidden`}>
      <div className="w-full max-w-none px-4 sm:px-6 lg:px-8">
        {/* Footer container */}
        <div className={`relative ${isDark ? 'text-white' : 'text-gray-900'} rounded-2xl border ${isDark ? 'border-gray-800 bg-black' : 'border-gray-200 bg-white'} shadow-lg overflow-hidden max-w-7xl mx-auto`}>
          {/* Background Paths */}
          <div className="absolute inset-0 overflow-hidden">
            <FloatingPaths position={1} theme={theme} />
            <FloatingPaths position={-1} theme={theme} />
          </div>

          {/* Content */}
          <div className="relative z-10 px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
            <div className="w-full max-w-6xl mx-auto">
              {/* Hero Section */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="text-center mb-12 sm:mb-16"
              >
                <h2 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  SIMPLIFY YOUR LIFE,
                  <br />
                  <span className="text-red-500">YOUR WAY</span>
                </h2>
                <p className={`text-lg sm:text-xl md:text-2xl ${isDark ? 'text-white/80' : 'text-gray-600'} mb-6 sm:mb-8 max-w-2xl mx-auto px-4`}>
                  Discover tools and utilities that make your daily tasks easier. 
                  From productivity helpers to lifestyle enhancers, find everything 
                  you need to optimize your routine.
                </p>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleNavigation('/login')}
                  className="bg-red-500 hover:bg-red-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-semibold hover:shadow-lg transition-all duration-300"
                >
                   Explore Tools
                </motion.button>
              </motion.div>

              {/* Footer Links Grid */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-8 sm:mb-12"
              >
                {/* Logo and description */}
                <div className="sm:col-span-2 text-center sm:text-left">
                  <motion.h3 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className={`text-2xl sm:text-3xl font-bold mb-3 sm:mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}
                  >
                    Youtilify
                  </motion.h3>
                  <motion.p 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    viewport={{ once: true }}
                    className={`${isDark ? 'text-white/60' : 'text-gray-600'} mb-4 sm:mb-6 max-w-md mx-auto sm:mx-0`}
                  >
                    Your ultimate toolkit for daily productivity and convenience. 
                    Discover utilities that simplify tasks and enhance your lifestyle.
                  </motion.p>
                  
                  {/* Social media links */}
                  <div className="flex justify-center sm:justify-start space-x-3 sm:space-x-4">
                    {socialData.socialLinks.map((social, index) => {
                      const IconComponent = iconMap[social.platform as keyof typeof iconMap];
                      
                      return (
                        <motion.a
                          key={social.platform}
                          href={social.url}
                          initial={{ opacity: 0, scale: 0 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                          viewport={{ once: true }}
                          whileHover={{ scale: 1.2, rotate: 360 }}
                          className={`w-10 h-10 sm:w-12 sm:h-12 ${isDark ? 'bg-gray-700' : 'bg-gray-200'} rounded-full flex items-center justify-center hover:bg-red-500 hover:text-white transition-all duration-300`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <IconComponent className="w-4 h-4 sm:w-5 sm:h-5" />
                        </motion.a>
                      );
                    })}
                  </div>
                </div>

                {/* Quick links */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  viewport={{ once: true }}
                  className="text-center sm:text-left"
                >
                  <h4 className={`text-base sm:text-lg font-semibold mb-3 sm:mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Product</h4>
                  <ul className="space-y-2">
                    <motion.li 
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.7 }}
                      viewport={{ once: true }}
                    >
                      <button 
                        onClick={() => handleNavigation('/', 'features-10')}
                        className={`${isDark ? 'text-white/60 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors hover:underline text-sm sm:text-base`}
                      >
                        Features
                      </button>
                    </motion.li>
                    <motion.li 
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.8 }}
                      viewport={{ once: true }}
                    >
                      <button 
                        onClick={() => handleNavigation('/', 'demo-preview')}
                        className={`${isDark ? 'text-white/60 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors hover:underline text-sm sm:text-base`}
                      >
                        How it Works
                      </button>
                    </motion.li>
                  </ul>
                </motion.div>

                {/* Company links */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  viewport={{ once: true }}
                  className="text-center sm:text-left"
                >
                  <h4 className={`text-base sm:text-lg font-semibold mb-3 sm:mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Company</h4>
                  <ul className="space-y-2">
                    <motion.li 
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.8 }}
                      viewport={{ once: true }}
                    >
                      <button onClick={() => handleNavigation('/')} className={`${isDark ? 'text-white/60 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors hover:underline text-sm sm:text-base`}>
                        Home
                      </button>
                    </motion.li>
                    <motion.li 
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.9 }}
                      viewport={{ once: true }}
                    >
                      <button onClick={() => handleNavigation('/privacy-policy')} className={`${isDark ? 'text-white/60 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors hover:underline text-sm sm:text-base`}>
                        Privacy
                      </button>
                    </motion.li>
                    <motion.li 
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 1.0 }}
                      viewport={{ once: true }}
                    >
                      <button onClick={() => handleNavigation('/support')} className={`${isDark ? 'text-white/60 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors hover:underline text-sm sm:text-base`}>
                        Support
                      </button>
                    </motion.li>
                  </ul>
                </motion.div>
              </motion.div>

              {/* Copyright */}
              <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                viewport={{ once: true }}
                className={`border-t ${isDark ? 'border-gray-800' : 'border-gray-200'} pt-6 sm:pt-8 text-center`}
              >
                <p className={`${isDark ? 'text-white/40' : 'text-gray-500'} text-sm sm:text-base`}>
                  © 2025 Youtilify. All rights reserved.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Footer;
