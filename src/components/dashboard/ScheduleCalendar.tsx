import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar } from '@/components/ui/calendar';
import { GlowCard } from '@/components/ui/spotlight-card';
import { Video, Radio, Calendar as CalendarIcon, Clock, Plus } from 'lucide-react';
import { format, isSameDay, parseISO, startOfMonth, endOfMonth, isSameMonth } from 'date-fns';
import { useProjectManagement } from '@/hooks/useProjectManagement';
interface ScheduledEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  type: 'video' | 'livestream' | 'meeting';
  status: 'scheduled' | 'draft';
}
const ScheduleCalendar: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const {
    projects,
    loading
  } = useProjectManagement();

  // Transform project data to scheduled events
  const events: ScheduledEvent[] = projects.filter(project => project.scheduledDate).map(project => ({
    id: project.id,
    title: project.metadata.title || project.title,
    date: project.scheduledDate!,
    time: project.scheduledTime || '12:00 PM',
    type: 'video' as const,
    status: project.state === 'Scheduled' ? 'scheduled' : 'draft'
  }));
  const getEventIcon = (type: ScheduledEvent['type']) => {
    switch (type) {
      case 'video':
        return <Video className="w-3 h-3" />;
      case 'livestream':
        return <Radio className="w-3 h-3" />;
      case 'meeting':
        return <CalendarIcon className="w-3 h-3" />;
    }
  };
  const getEventColor = (type: ScheduledEvent['type']) => {
    switch (type) {
      case 'video':
        return 'text-blue-400 bg-blue-400/20';
      case 'livestream':
        return 'text-red-400 bg-red-400/20';
      case 'meeting':
        return 'text-green-400 bg-green-400/20';
    }
  };
  const getDatesWithEvents = () => {
    return events.map(event => parseISO(event.date));
  };
  const getEventsForMonth = (date: Date) => {
    const monthStart = startOfMonth(date);
    const monthEnd = endOfMonth(date);
    return events.filter(event => {
      const eventDate = parseISO(event.date);
      return eventDate >= monthStart && eventDate <= monthEnd;
    }).sort((a, b) => parseISO(a.date).getTime() - parseISO(b.date).getTime());
  };
  const currentMonth = selectedDate || new Date();
  const monthlyEvents = getEventsForMonth(currentMonth);
  if (loading) {
    return <motion.div initial={{
      opacity: 0,
      y: 20
    }} animate={{
      opacity: 1,
      y: 0
    }} transition={{
      duration: 0.5,
      delay: 0.6
    }}>
        <GlowCard glowColor="red" customSize={true} className="bg-gray-950 border border-gray-900 rounded-lg p-6 w-full h-auto aspect-auto grid-rows-none gap-0">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-white flex items-center gap-2">
              <CalendarIcon className="w-5 h-5" />
              Your Schedule
            </h2>
          </div>
          <div className="animate-pulse">
            <div className="h-64 bg-gray-800 rounded"></div>
          </div>
        </GlowCard>
      </motion.div>;
  }
  return <motion.div initial={{
    opacity: 0,
    y: 20
  }} animate={{
    opacity: 1,
    y: 0
  }} transition={{
    duration: 0.5,
    delay: 0.6
  }}>
      <GlowCard glowColor="red" customSize={true} className="bg-gray-950 border border-gray-900 rounded-lg p-6 w-full h-auto aspect-auto grid-rows-none gap-0">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-white flex items-center gap-2">
            <CalendarIcon className="w-5 h-5" />
            Your Schedule
          </h2>
          
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Calendar */}
          <div className="space-y-4">
            <Calendar mode="single" selected={selectedDate} onSelect={setSelectedDate} className="rounded-md border border-gray-800 bg-gray-900/50 pointer-events-auto" classNames={{
            months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
            month: "space-y-4",
            caption: "flex justify-center pt-1 relative items-center text-white",
            caption_label: "text-sm font-medium text-white",
            nav: "space-x-1 flex items-center",
            nav_button: "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 text-white hover:bg-gray-800 rounded",
            nav_button_previous: "absolute left-1",
            nav_button_next: "absolute right-1",
            table: "w-full border-collapse space-y-1",
            head_row: "flex",
            head_cell: "text-gray-400 rounded-md w-9 font-normal text-[0.8rem] text-center",
            row: "flex w-full mt-2",
            cell: "h-9 w-9 text-center text-sm p-0 relative text-white hover:bg-gray-800 rounded-md",
            day: "h-9 w-9 p-0 font-normal aria-selected:opacity-100 text-white hover:bg-gray-800 rounded-md",
            day_range_end: "day-range-end",
            day_selected: "bg-red-500 text-white hover:bg-red-600 focus:bg-red-500 rounded-md",
            day_today: "bg-gray-800 text-white rounded-md",
            day_outside: "text-gray-600 opacity-50",
            day_disabled: "text-gray-600 opacity-50",
            day_range_middle: "aria-selected:bg-gray-800 aria-selected:text-white",
            day_hidden: "invisible"
          }} modifiers={{
            hasEvent: getDatesWithEvents()
          }} modifiersClassNames={{
            hasEvent: "bg-red-500/30 text-red-200 font-semibold"
          }} />
          </div>

          {/* This Month's Videos */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-gray-400">
                {format(currentMonth, 'MMMM yyyy')} Videos
              </h3>
              <div className="flex items-center gap-1 text-xs text-gray-500">
                <Clock className="w-3 h-3" />
                {monthlyEvents.length} scheduled
              </div>
            </div>

            <div className="space-y-3 max-h-64 overflow-y-auto scrollbar-hide">
              {monthlyEvents.length > 0 ? monthlyEvents.map((event, index) => <motion.div key={event.id} initial={{
              opacity: 0,
              x: 20
            }} animate={{
              opacity: 1,
              x: 0
            }} transition={{
              duration: 0.3,
              delay: index * 0.1
            }} className="p-3 rounded-lg bg-gray-900/50 border border-gray-800 hover:border-gray-700 transition-colors">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className={`p-1 rounded ${getEventColor(event.type)}`}>
                          {getEventIcon(event.type)}
                        </span>
                        <span className="text-xs text-gray-400 capitalize">{event.type}</span>
                      </div>
                      <span className="text-xs text-gray-500">{event.time}</span>
                    </div>
                    
                    <p className="text-sm text-white font-medium mb-2">{event.title}</p>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-400">
                        {format(parseISO(event.date), 'MMM d, yyyy')}
                      </span>
                      <span className={`text-xs px-2 py-1 rounded-full ${event.status === 'scheduled' ? 'text-green-400 bg-green-400/20' : 'text-yellow-400 bg-yellow-400/20'}`}>
                        {event.status}
                      </span>
                    </div>
                  </motion.div>) : <div className="text-center py-8 text-gray-500">
                  <CalendarIcon className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">No videos scheduled this month</p>
                </div>}
            </div>
          </div>
        </div>
      </GlowCard>
    </motion.div>;
};
export default ScheduleCalendar;