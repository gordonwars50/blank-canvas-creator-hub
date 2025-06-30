
import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import KPICard from '@/components/dashboard/KPICard';
import RecentVideos from '@/components/dashboard/RecentVideos';
import ScheduleCalendar from '@/components/dashboard/ScheduleCalendar';
import { Eye, Users, Clock, DollarSign } from 'lucide-react';

const DashboardPage: React.FC = () => {
  const kpiData = [
    {
      title: 'Total Views',
      value: '2.4M',
      change: '+12.5%',
      changeType: 'positive' as const,
      icon: Eye
    },
    {
      title: 'Subscribers',
      value: '45.2K',
      change: '+8.3%',
      changeType: 'positive' as const,
      icon: Users
    },
    {
      title: 'Watch Time',
      value: '892h',
      change: '+15.7%',
      changeType: 'positive' as const,
      icon: Clock
    },
    {
      title: 'Revenue',
      value: '$3,240',
      change: '+22.1%',
      changeType: 'positive' as const,
      icon: DollarSign
    }
  ];

  return (
    <DashboardLayout title="Dashboard">
      <div className="space-y-6">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {kpiData.map((kpi, index) => (
            <KPICard
              key={kpi.title}
              title={kpi.title}
              value={kpi.value}
              change={kpi.change}
              changeType={kpi.changeType}
              icon={kpi.icon}
              index={index}
            />
          ))}
        </div>

        {/* Recent Videos - Full width */}
        <div className="w-full">
          <RecentVideos />
        </div>

        {/* Schedule Calendar - Full width */}
        <div className="w-full">
          <ScheduleCalendar />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardPage;
