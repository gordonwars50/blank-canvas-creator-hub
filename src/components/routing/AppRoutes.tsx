
import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import ProtectedRoute from './ProtectedRoute';
import AnimatedRoute from './AnimatedRoute';
import LandingPage from '@/pages/LandingPage';
import LoginPage from '@/pages/LoginPage';
import SignupPage from '@/pages/SignupPage';
import SupportPage from '@/pages/SupportPage';
import SupportArticlePage from '@/pages/SupportArticlePage';
import PrivacyPolicyPage from '@/pages/PrivacyPolicyPage';
import NotFound from '@/pages/NotFound';
import DashboardPage from '@/pages/DashboardPage';
import PlanSchedulePage from '@/pages/PlanSchedulePage';
import CommunityPage from '@/pages/CommunityPage';
import TeamPage from '@/pages/TeamPage';
import ProjectOverviewPage from '@/pages/ProjectOverviewPage';
import AccountSettingsPage from '@/pages/AccountSettingsPage';

const AppRoutes: React.FC = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={
          <AnimatedRoute>
            <LandingPage />
          </AnimatedRoute>
        } />
        <Route path="/login" element={
          <AnimatedRoute>
            <LoginPage />
          </AnimatedRoute>
        } />
        <Route path="/signup" element={
          <AnimatedRoute>
            <SignupPage />
          </AnimatedRoute>
        } />
        <Route path="/support" element={
          <AnimatedRoute>
            <SupportPage />
          </AnimatedRoute>
        } />
        <Route path="/support/article/:slug" element={
          <AnimatedRoute>
            <SupportArticlePage />
          </AnimatedRoute>
        } />
        <Route path="/privacy-policy" element={
          <AnimatedRoute>
            <PrivacyPolicyPage />
          </AnimatedRoute>
        } />
        
        {/* Protected Dashboard Routes */}
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <AnimatedRoute>
              <DashboardPage />
            </AnimatedRoute>
          </ProtectedRoute>
        } />
        <Route path="/dashboard/plan-schedule" element={
          <ProtectedRoute>
            <AnimatedRoute>
              <PlanSchedulePage />
            </AnimatedRoute>
          </ProtectedRoute>
        } />
        <Route path="/dashboard/project/:id" element={
          <ProtectedRoute>
            <AnimatedRoute>
              <ProjectOverviewPage />
            </AnimatedRoute>
          </ProtectedRoute>
        } />
        <Route path="/dashboard/community" element={
          <ProtectedRoute>
            <AnimatedRoute>
              <CommunityPage />
            </AnimatedRoute>
          </ProtectedRoute>
        } />
        <Route path="/dashboard/team" element={
          <ProtectedRoute>
            <AnimatedRoute>
              <TeamPage />
            </AnimatedRoute>
          </ProtectedRoute>
        } />
        <Route path="/dashboard/account-settings" element={
          <ProtectedRoute>
            <AnimatedRoute>
              <AccountSettingsPage />
            </AnimatedRoute>
          </ProtectedRoute>
        } />
        
        <Route path="*" element={
          <AnimatedRoute>
            <NotFound />
          </AnimatedRoute>
        } />
      </Routes>
    </AnimatePresence>
  );
};

export default AppRoutes;
