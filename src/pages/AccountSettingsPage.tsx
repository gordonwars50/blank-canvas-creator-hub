
import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import AccountSettingsForm from '@/components/account/AccountSettingsForm';

const AccountSettingsPage: React.FC = () => {
  return (
    <DashboardLayout title="Account Settings" hideTopBarActions={true}>
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white mb-2">Account Settings</h1>
          <p className="text-gray-400">Manage your account information and preferences</p>
        </div>
        
        <AccountSettingsForm />
      </div>
    </DashboardLayout>
  );
};

export default AccountSettingsPage;
