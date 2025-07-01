import React from 'react';
import { Settings as SettingsIcon, Bell, Shield, Database, Palette } from 'lucide-react';

export default function Settings() {
  const settingsSections = [
    {
      title: 'Notifications',
      icon: Bell,
      description: 'Manage your notification preferences',
      settings: [
        { label: 'Email notifications', enabled: true },
        { label: 'Push notifications', enabled: false },
        { label: 'Weekly reports', enabled: true },
      ],
    },
    {
      title: 'Privacy & Security',
      icon: Shield,
      description: 'Control your privacy and security settings',
      settings: [
        { label: 'Two-factor authentication', enabled: false },
        { label: 'Data encryption', enabled: true },
        { label: 'Share usage data', enabled: false },
      ],
    },
    {
      title: 'Data Management',
      icon: Database,
      description: 'Manage your data and backups',
      settings: [
        { label: 'Auto-backup', enabled: true },
        { label: 'Export data', enabled: true },
        { label: 'Data retention', enabled: true },
      ],
    },
    {
      title: 'Appearance',
      icon: Palette,
      description: 'Customize the look and feel',
      settings: [
        { label: 'Dark mode', enabled: false },
        { label: 'Compact view', enabled: false },
        { label: 'High contrast', enabled: false },
      ],
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Settings</h1>
        <p className="text-gray-600">Manage your application preferences and account settings.</p>
      </div>

      <div className="space-y-6">
        {settingsSections.map((section) => {
          const Icon = section.icon;
          return (
            <div key={section.title} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center space-x-3">
                  <div className="bg-gray-100 p-2 rounded-lg">
                    <Icon className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">{section.title}</h2>
                    <p className="text-sm text-gray-600">{section.description}</p>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <div className="space-y-4">
                  {section.settings.map((setting, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700">{setting.label}</span>
                      <button
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                          setting.enabled ? 'bg-blue-600' : 'bg-gray-200'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            setting.enabled ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-xl p-6">
        <div className="flex items-start space-x-3">
          <SettingsIcon className="w-5 h-5 text-yellow-600 mt-0.5" />
          <div>
            <h3 className="text-sm font-medium text-yellow-800">Coming Soon</h3>
            <p className="text-sm text-yellow-700 mt-1">
              More settings and customization options will be available in future updates. 
              This includes team permissions, project templates, and integration settings.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}