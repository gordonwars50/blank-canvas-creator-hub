
import React, { useState } from 'react';
import { Calendar, ChevronLeft, ChevronRight, Clock, Users, Video } from 'lucide-react';
import { motion } from 'framer-motion';

const ScheduleCalendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  // TODO: BACKEND CONNECTION - Replace with API call to fetch scheduled content
  // Example: const { data: scheduledContent, isLoading } = useQuery({
  //   queryKey: ['scheduled-content', currentDate.getMonth(), currentDate.getFullYear()],
  //   queryFn: async () => {
  //     const response = await fetch(`/api/schedule/${currentDate.getMonth()}/${currentDate.getFullYear()}`);
  //     return response.json();
  //   }
  // });

  const scheduledContent = [
    {
      id: 1,
      title: "Weekly Tech Review", // BACKEND: Fetch from scheduled_videos table
      date: "2024-01-15", // BACKEND: Scheduled publish date
      time: "10:00 AM", // BACKEND: Scheduled publish time
      type: "video", // BACKEND: Content type (video, short, live, etc.)
      status: "scheduled", // BACKEND: Status (scheduled, published, draft, etc.)
      assignedTo: ["John Doe", "Sarah Smith"], // BACKEND: Assigned team members
      priority: "high" // BACKEND: Priority level
    },
    {
      id: 2,
      title: "Community Q&A Session", // BACKEND: Fetch from scheduled_content table
      date: "2024-01-16", // BACKEND: Scheduled date
      time: "3:00 PM", // BACKEND: Scheduled time
      type: "live", // BACKEND: Content type
      status: "scheduled", // BACKEND: Status
      assignedTo: ["Alex Wong"], // BACKEND: Team assignments
      priority: "medium" // BACKEND: Priority
    },
    {
      id: 3,
      title: "Product Launch Video", // BACKEND: Content title
      date: "2024-01-18", // BACKEND: Scheduled date
      time: "12:00 PM", // BACKEND: Scheduled time
      type: "video", // BACKEND: Content type
      status: "in-progress", // BACKEND: Current status
      assignedTo: ["Emma Johnson", "John Doe"], // BACKEND: Team assignments
      priority: "high" // BACKEND: Priority level
    }
  ];

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const renderCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-24 p-2"></div>);
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const dayContent = scheduledContent.filter(item => item.date === dateStr);
      const isToday = new Date().toDateString() === new Date(currentDate.getFullYear(), currentDate.getMonth(), day).toDateString();

      days.push(
        <div key={day} className={`h-24 p-2 border border-gray-800 rounded-lg ${isToday ? 'bg-red-500/10 border-red-500/30' : 'bg-gray-900/30'}`}>
          <div className="flex items-center justify-between mb-1">
            <span className={`text-sm font-medium ${isToday ? 'text-red-400' : 'text-gray-300'}`}>
              {day}
            </span>
            {dayContent.length > 0 && (
              <span className="text-xs text-gray-500">
                {dayContent.length}
              </span>
            )}
          </div>
          <div className="space-y-1">
            {dayContent.slice(0, 2).map((item, index) => (
              <div key={index} className="text-xs bg-gray-800 px-2 py-1 rounded truncate">
                <div className="flex items-center gap-1">
                  {item.type === 'video' && <Video className="w-3 h-3" />}
                  {item.type === 'live' && <Users className="w-3 h-3" />}
                  <span className="text-gray-300 truncate">{item.title}</span>
                </div>
                <div className="text-gray-500 flex items-center gap-1 mt-1">
                  <Clock className="w-2 h-2" />
                  {item.time}
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    return days;
  };

  const upcomingContent = scheduledContent
    .filter(item => new Date(item.date) >= new Date())
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 3);

  return (
    <div className="bg-gray-950 border border-gray-900 rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-white flex items-center gap-2">
          <Calendar className="w-5 h-5" />
          Content Schedule
        </h2>
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigateMonth('prev')}
            className="p-2 text-gray-400 hover:text-white transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="text-gray-300 font-medium min-w-[120px] text-center">
            {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          </span>
          <button
            onClick={() => navigateMonth('next')}
            className="p-2 text-gray-400 hover:text-white transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar Grid */}
        <div className="lg:col-span-2">
          <div className="grid grid-cols-7 gap-1 mb-4">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="text-center text-sm font-medium text-gray-400 py-2">
                {day}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {renderCalendarDays()}
          </div>
        </div>

        {/* Upcoming Content */}
        <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-white mb-4">Upcoming</h3>
          <div className="space-y-3">
            {upcomingContent.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="bg-gray-800 rounded-lg p-3"
              >
                <div className="flex items-start justify-between mb-2">
                  <h4 className="text-sm font-medium text-white line-clamp-2">
                    {item.title}
                  </h4>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    item.priority === 'high' ? 'bg-red-500/20 text-red-400' :
                    item.priority === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-gray-500/20 text-gray-400'
                  }`}>
                    {item.priority}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-400 mb-2">
                  <Clock className="w-3 h-3" />
                  <span>{new Date(item.date).toLocaleDateString()} at {item.time}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <Users className="w-3 h-3" />
                  <span>{item.assignedTo.join(', ')}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScheduleCalendar;
