
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ExpandableTabs } from "@/components/ui/expandable-tabs";
import { Home, HelpCircle, Lock } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

interface HeaderProps {
  theme?: "light" | "dark";
}

const Header = ({ theme = "dark" }: HeaderProps) => {
  const isDark = theme === "dark";
  const location = useLocation();
  const navigate = useNavigate();
  
  const tabs = [
    { title: "Home", icon: Home, type: "tab" as const, href: "/" },
    { type: "separator" as const },
    { title: "Support", icon: HelpCircle, type: "tab" as const, href: "/support" },
    { title: "Privacy", icon: Lock, type: "tab" as const, href: "/privacy-policy" },
  ];

  const handleLoginClick = () => {
    navigate("/login");
  };
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative z-20 w-full py-4 px-6"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="flex items-center gap-3"
        >
          <div className={`text-2xl font-playfair font-bold hover:opacity-80 transition-opacity ${isDark ? 'text-white' : 'text-blue-900'}`}>
            CREATORLY
          </div>
        </motion.div>

        {/* Right side with Navigation Menu and Login Button */}
        <div className="flex items-center gap-6">
          {/* Navigation Menu */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.25, ease: "easeOut" }}
          >
            <ExpandableTabs 
              tabs={tabs} 
              theme={theme}
              className="hidden md:flex"
              currentPath={location.pathname}
            />
          </motion.div>

          {/* Login Button */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
          >
            <Button 
              onClick={handleLoginClick}
              className="h-[42px] px-6 font-medium text-white hover:opacity-90 transition-opacity rounded-2xl border border-gray-600 bg-black/80 backdrop-blur-sm"
              style={{ backgroundColor: '#ff0003' }}
            >
              Log in
            </Button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Header;
