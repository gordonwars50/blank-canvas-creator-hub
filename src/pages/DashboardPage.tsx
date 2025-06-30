
import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import KPICard from '@/components/dashboard/KPICard';
import RecentVideos from '@/components/dashboard/RecentVideos';
import ScheduleCalendar from '@/components/dashboard/ScheduleCalendar';
import { Eye, Users, Clock, DollarSign } from 'lucide-react';

const DashboardPage: React.FC = () => {
  // TODO: BACKEND CONNECTION - Replace with API call to fetch real KPI data
  // Example: const { data: kpiData, isLoading } = useQuery({
  //   queryKey: ['dashboard-kpi'],
  //   queryFn: async () => {
  //     const response = await fetch('/api/dashboard/kpi');
  //     return response.json();
  //   }
  // });
  
  const kpiData = [
    {
      title: 'Total Views',
      value: '2.4M', // BACKEND: Connect to YouTube Analytics API - views endpoint
      change: '+12.5%', // BACKEND: Calculate percentage change from previous period
      changeType: 'positive' as const,
      icon: Eye
    },
    {
      title: 'Subscribers',
      value: '45.2K', // BACKEND: Connect to YouTube Analytics API - subscribers endpoint
      change: '+8.3%', // BACKEND: Calculate subscriber growth rate
      changeType: 'positive' as const,
      icon: Users
    },
    {
      title: 'Watch Time',
      value: '892h', // BACKEND: Connect to YouTube Analytics API - watch time metrics
      change: '+15.7%', // BACKEND: Calculate watch time percentage change
      changeType: 'positive' as const,
      icon: Clock
    },
    {
      title: 'Revenue',
      value: '$3,240', // BACKEND: Connect to YouTube Analytics API - monetization data
      change: '+22.1%', // BACKEND: Calculate revenue growth percentage
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
        {/* BACKEND: RecentVideos component needs connection to fetch latest videos */}
        <div className="w-full">
          <RecentVideos />
        </div>

        {/* Schedule Calendar - Full width */}
        {/* BACKEND: ScheduleCalendar component needs connection to fetch scheduled content */}
        <div className="w-full">
          <ScheduleCalendar />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardPage;
