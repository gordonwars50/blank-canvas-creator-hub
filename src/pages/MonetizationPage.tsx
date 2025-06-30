
import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';

const MonetizationPage: React.FC = () => {
  return (
    <DashboardLayout title="Monetization">
      <div className="space-y-6">
        <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Monetization Tools</h2>
          <p className="text-gray-400">Monetization interface coming soon...</p>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default MonetizationPage;
