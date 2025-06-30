
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import SupportPage from "./pages/SupportPage";
import SupportArticlePage from "./pages/SupportArticlePage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import NotFound from "./pages/NotFound";
import DashboardPage from "./pages/DashboardPage";
import PlanSchedulePage from "./pages/PlanSchedulePage";
import CalendarPage from "./pages/CalendarPage";
import CommunityPage from "./pages/CommunityPage";
import TeamPage from "./pages/TeamPage";
import ProjectOverviewPage from "./pages/ProjectOverviewPage";

const queryClient = new QueryClient();

const AppContent: React.FC = () => {
  const location = useLocation();
  const isLightPage = location.pathname === '/privacy-policy';
  const isLandingPage = location.pathname === '/';
  const isDashboardPage = location.pathname.startsWith('/dashboard');

  return (
    <SmoothScrollProvider enabled={isLandingPage}>
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
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <LandingPage />
              </motion.div>
            } />
            <Route path="/login" element={
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <LoginPage />
              </motion.div>
            } />
            <Route path="/signup" element={
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <SignupPage />
              </motion.div>
            } />
            <Route path="/support" element={
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <SupportPage />
              </motion.div>
            } />
            <Route path="/support/article/:slug" element={
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <SupportArticlePage />
              </motion.div>
            } />
            <Route path="/privacy-policy" element={
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <PrivacyPolicyPage />
              </motion.div>
            } />
            
            {/* Dashboard Routes */}
            <Route path="/dashboard" element={
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <DashboardPage />
              </motion.div>
            } />
            <Route path="/dashboard/plan-schedule" element={
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <PlanSchedulePage />
              </motion.div>
            } />
            <Route path="/dashboard/project/:id" element={
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <ProjectOverviewPage />
              </motion.div>
            } />
            <Route path="/dashboard/calendar" element={
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <CalendarPage />
              </motion.div>
            } />
            <Route path="/dashboard/community" element={
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <CommunityPage />
              </motion.div>
            } />
            <Route path="/dashboard/team" element={
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <TeamPage />
              </motion.div>
            } />
            
            <Route path="*" element={
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <NotFound />
              </motion.div>
            } />
          </Routes>
        </AnimatePresence>
      </motion.div>
    </SmoothScrollProvider>
  );
};

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
