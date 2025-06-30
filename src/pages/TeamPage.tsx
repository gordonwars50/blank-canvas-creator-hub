
import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';

const TeamPage: React.FC = () => {
  return (
    <DashboardLayout title="Team">
      <div className="space-y-6">
        <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Team Management</h2>
          <p className="text-gray-400">Team management interface coming soon...</p>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default TeamPage;
