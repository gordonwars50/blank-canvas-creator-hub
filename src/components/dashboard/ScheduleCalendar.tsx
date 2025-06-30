
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar } from '@/components/ui/calendar';
import { GlowCard } from '@/components/ui/spotlight-card';
import { Video, Radio, Calendar as CalendarIcon, Clock, Plus } from 'lucide-react';
import { format, isSameDay, parseISO } from 'date-fns';

interface ScheduledEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  type: 'video' | 'livestream' | 'meeting';
  status: 'scheduled' | 'draft';
}

const mockEvents: ScheduledEvent[] = [
  {
    id: '1',
    title: 'Upload: "Top 10 YouTube Tips"',
    date: '2024-07-01',
    time: '10:00 AM',
    type: 'video',
    status: 'scheduled'
  },
  {
    id: '2',
    title: 'Live Stream: Q&A Session',
    date: '2024-07-03',
    time: '3:00 PM',
    type: 'livestream',
    status: 'scheduled'
  },
  {
    id: '3',
    title: 'Brand Meeting: Sponsor Review',
    date: '2024-07-05',
    time: '2:00 PM',
    type: 'meeting',
    status: 'scheduled'
  },
  {
    id: '4',
    title: 'Upload: "Tech Review Series"',
    date: '2024-07-08',
    time: '11:30 AM',
    type: 'video',
    status: 'draft'
  },
  {
    id: '5',
    title: 'Live Stream: Gaming Session',
    date: '2024-07-10',
    time: '7:00 PM',
    type: 'livestream',
    status: 'scheduled'
  }
];

const ScheduleCalendar: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  const getEventIcon = (type: ScheduledEvent['type']) => {
    switch (type) {
      case 'video': return <Video className="w-3 h-3" />;
      case 'livestream': return <Radio className="w-3 h-3" />;
      case 'meeting': return <CalendarIcon className="w-3 h-3" />;
    }
  };

  const getEventColor = (type: ScheduledEvent['type']) => {
    switch (type) {
      case 'video': return 'text-blue-400 bg-blue-400/20';
      case 'livestream': return 'text-red-400 bg-red-400/20';
      case 'meeting': return 'text-green-400 bg-green-400/20';
    }
  };

  const getDatesWithEvents = () => {
    return mockEvents.map(event => parseISO(event.date));
  };

  const getEventsForDate = (date: Date) => {
    return mockEvents.filter(event => 
      isSameDay(parseISO(event.date), date)
    );
  };

  const selectedDateEvents = selectedDate ? getEventsForDate(selectedDate) : [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6 }}
    >
      <GlowCard 
        glowColor="red" 
        customSize={true}
        className="bg-gray-950 border border-gray-900 rounded-lg p-6 w-full h-auto aspect-auto grid-rows-none gap-0"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-white flex items-center gap-2">
            <CalendarIcon className="w-5 h-5" />
            Your Schedule
          </h2>
          <button className="text-sm text-red-400 hover:text-red-300 flex items-center gap-1">
            <Plus className="w-4 h-4" />
            Add Event
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Calendar */}
          <div className="space-y-4">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="rounded-md border border-gray-800 bg-gray-900/50"
              classNames={{
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
                head_cell: "text-gray-400 rounded-md w-9 font-normal text-[0.8rem]",
                row: "flex w-full mt-2",
                cell: "h-9 w-9 text-center text-sm p-0 relative text-white hover:bg-gray-800 rounded-md",
                day: "h-9 w-9 p-0 font-normal aria-selected:opacity-100 text-white hover:bg-gray-800 rounded-md",
                day_range_end: "day-range-end",
                day_selected: "bg-red-500 text-white hover:bg-red-600 focus:bg-red-500 rounded-md",
                day_today: "bg-gray-800 text-white rounded-md",
                day_outside: "text-gray-600 opacity-50",
                day_disabled: "text-gray-600 opacity-50",
                day_range_middle: "aria-selected:bg-gray-800 aria-selected:text-white",
                day_hidden: "invisible",
              }}
              modifiers={{
                hasEvent: getDatesWithEvents(),
              }}
              modifiersClassNames={{
                hasEvent: "bg-red-500/30 text-red-200 font-semibold",
              }}
            />
          </div>

          {/* Events for Selected Date */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-gray-400">
                {selectedDate ? format(selectedDate, 'MMMM d, yyyy') : 'Select a date'}
              </h3>
              <div className="flex items-center gap-1 text-xs text-gray-500">
                <Clock className="w-3 h-3" />
                {selectedDateEvents.length} events
              </div>
            </div>

            <div className="space-y-3 max-h-64 overflow-y-auto scrollbar-hide">
              {selectedDateEvents.length > 0 ? (
                selectedDateEvents.map((event, index) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="p-3 rounded-lg bg-gray-900/50 border border-gray-800 hover:border-gray-700 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className={`p-1 rounded ${getEventColor(event.type)}`}>
                          {getEventIcon(event.type)}
                        </span>
                        <span className="text-xs text-gray-400 capitalize">{event.type}</span>
                      </div>
                      <span className="text-xs text-gray-500">{event.time}</span>
                    </div>
                    
                    <p className="text-sm text-white font-medium mb-1">{event.title}</p>
                    
                    <div className="flex items-center justify-between">
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        event.status === 'scheduled' 
                          ? 'text-green-400 bg-green-400/20' 
                          : 'text-yellow-400 bg-yellow-400/20'
                      }`}>
                        {event.status}
                      </span>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <CalendarIcon className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">No events scheduled for this date</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </GlowCard>
    </motion.div>
  );
};

export default ScheduleCalendar;
