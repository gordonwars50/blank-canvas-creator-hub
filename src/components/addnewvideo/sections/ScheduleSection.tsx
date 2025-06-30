
import React, { useState } from 'react';
import { Calendar, Clock, Upload } from 'lucide-react';
import { GlowCard } from '@/components/ui/spotlight-card';
import { GlowButton } from '@/components/ui/glow-button';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

interface ScheduleSectionProps {
  scheduledDate: Date | null;
  scheduledTime: string;
  uploadNow: boolean;
  selectedMode: 'schedule' | 'upload';
  onScheduledDateChange: (date: Date | null) => void;
  onScheduledTimeChange: (time: string) => void;
  onUploadNowChange: (uploadNow: boolean) => void;
  onModeChange: (mode: 'schedule' | 'upload') => void;
}

const ScheduleSection: React.FC<ScheduleSectionProps> = ({
  scheduledDate,
  scheduledTime,
  uploadNow,
  selectedMode,
  onScheduledDateChange,
  onScheduledTimeChange,
  onUploadNowChange,
  onModeChange
}) => {
  const [timeHour, setTimeHour] = useState('12');
  const [timeMinute, setTimeMinute] = useState('00');
  const [timeAmPm, setTimeAmPm] = useState('PM');

  const handleTimeChange = (hour: string, minute: string, ampm: string) => {
    setTimeHour(hour);
    setTimeMinute(minute);
    setTimeAmPm(ampm);
    onScheduledTimeChange(`${hour}:${minute} ${ampm}`);
  };

  const handleOpenYouTubeStudio = () => {
    console.log('Opening YouTube Studio...');
    // Open YouTube Studio in a new tab
    window.open('https://studio.youtube.com', '_blank');
  };

  const handleModeChange = (mode: 'schedule' | 'upload') => {
    console.log('Mode changed to:', mode); // Debug log
    onModeChange(mode);
    if (mode === 'upload') {
      onUploadNowChange(true);
    } else {
      onUploadNowChange(false);
    }
  };

  console.log('Current selectedMode:', selectedMode); // Debug log

  return (
    <GlowCard glowColor="red" customSize className="w-full p-6 mb-8 rounded-2xl">
      <div className="space-y-6">
        <div className="flex items-center gap-3 mb-4">
          <Calendar className="w-6 h-6 text-red-400" />
          <h2 className="text-xl font-semibold text-white">Schedule / Upload</h2>
        </div>

        {/* Mode Selection Dropdown */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">Choose an option:</label>
          <Select value={selectedMode} onValueChange={handleModeChange}>
            <SelectTrigger className="w-full bg-gray-800 border-gray-600 text-white rounded-xl">
              <SelectValue placeholder="Select an option" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-600 rounded-xl">
              <SelectItem value="schedule" className="text-white hover:bg-gray-700">Schedule</SelectItem>
              <SelectItem value="upload" className="text-white hover:bg-gray-700">Upload</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Schedule Mode */}
        {selectedMode === 'schedule' && (
          <div className="space-y-4 bg-gray-900/30 p-4 rounded-xl border border-gray-700">
            <h3 className="text-lg font-medium text-white flex items-center gap-2">
              <Clock className="w-5 h-5 text-blue-400" />
              Schedule Video
            </h3>
            
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Date Picker */}
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-300 mb-2">Select Date</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal bg-gray-800 border-gray-600 text-white hover:bg-gray-700 rounded-xl",
                        !scheduledDate && "text-gray-400"
                      )}
                    >
                      <Calendar className="mr-2 h-4 w-4" />
                      {scheduledDate ? format(scheduledDate, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 bg-gray-800 border-gray-600 rounded-xl z-[10000]" align="start">
                    <CalendarComponent
                      mode="single"
                      selected={scheduledDate}
                      onSelect={onScheduledDateChange}
                      disabled={(date) => date < new Date()}
                      initialFocus
                      className="p-3 pointer-events-auto"
                      classNames={{
                        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
                        month: "space-y-4",
                        caption: "flex justify-center pt-1 relative items-center text-white",
                        caption_label: "text-sm font-medium text-white",
                        nav: "space-x-1 flex items-center",
                        nav_button: "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 text-white hover:bg-gray-700 rounded-md",
                        nav_button_previous: "absolute left-1",
                        nav_button_next: "absolute right-1",
                        table: "w-full border-collapse space-y-1",
                        head_row: "flex",
                        head_cell: "text-gray-400 rounded-md w-9 font-normal text-[0.8rem]",
                        row: "flex w-full mt-2",
                        cell: "h-9 w-9 text-center text-sm p-0 relative text-white hover:bg-gray-700 rounded-md",
                        day: "h-9 w-9 p-0 font-normal aria-selected:opacity-100 text-white hover:bg-gray-700 rounded-md",
                        day_range_end: "day-range-end",
                        day_selected: "bg-red-500 text-white hover:bg-red-600 focus:bg-red-500 rounded-md",
                        day_today: "bg-gray-700 text-white rounded-md",
                        day_outside: "text-gray-600 opacity-50",
                        day_disabled: "text-gray-600 opacity-50",
                        day_range_middle: "aria-selected:bg-gray-700 aria-selected:text-white",
                        day_hidden: "invisible",
                      }}
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* Time Picker */}
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-300 mb-2">Select Time</label>
                <div className="flex gap-2">
                  <select
                    value={timeHour}
                    onChange={(e) => handleTimeChange(e.target.value, timeMinute, timeAmPm)}
                    className="flex-1 px-3 py-2 pr-8 bg-gray-800 border border-gray-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-red-500 appearance-none"
                    style={{
                      backgroundImage: `url("data:image/svg+xml;charset=US-ASCII,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 4 5'%3e%3cpath fill='%23ffffff' d='M2 0L0 2h4zm0 5L0 3h4z'/%3e%3c/svg%3e")`,
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'right 0.5rem center',
                      backgroundSize: '12px'
                    }}
                  >
                    {Array.from({ length: 12 }, (_, i) => {
                      const hour = i + 1;
                      return (
                        <option key={hour} value={hour.toString().padStart(2, '0')}>
                          {hour.toString().padStart(2, '0')}
                        </option>
                      );
                    })}
                  </select>
                  <select
                    value={timeMinute}
                    onChange={(e) => handleTimeChange(timeHour, e.target.value, timeAmPm)}
                    className="flex-1 px-3 py-2 pr-8 bg-gray-800 border border-gray-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-red-500 appearance-none"
                    style={{
                      backgroundImage: `url("data:image/svg+xml;charset=US-ASCII,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 4 5'%3e%3cpath fill='%23ffffff' d='M2 0L0 2h4zm0 5L0 3h4z'/%3e%3c/svg%3e")`,
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'right 0.5rem center',
                      backgroundSize: '12px'
                    }}
                  >
                    {Array.from({ length: 60 }, (_, i) => (
                      <option key={i} value={i.toString().padStart(2, '0')}>
                        {i.toString().padStart(2, '0')}
                      </option>
                    ))}
                  </select>
                  <select
                    value={timeAmPm}
                    onChange={(e) => handleTimeChange(timeHour, timeMinute, e.target.value)}
                    className="px-3 py-2 pr-8 bg-gray-800 border border-gray-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-red-500 appearance-none"
                    style={{
                      backgroundImage: `url("data:image/svg+xml;charset=US-ASCII,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 4 5'%3e%3cpath fill='%23ffffff' d='M2 0L0 2h4zm0 5L0 3h4z'/%3e%3c/svg%3e")`,
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'right 0.5rem center',
                      backgroundSize: '12px'
                    }}
                  >
                    <option value="AM">AM</option>
                    <option value="PM">PM</option>
                  </select>
                </div>
              </div>
            </div>

            {scheduledDate && scheduledTime && (
              <p className="text-sm text-gray-400">
                📧 Email and push notifications will be sent at the scheduled time
              </p>
            )}
          </div>
        )}

        {/* Upload Mode */}
        {selectedMode === 'upload' && (
          <div className="space-y-4 bg-gray-900/30 p-4 rounded-xl border border-gray-700">
            <h3 className="text-lg font-medium text-white flex items-center gap-2">
              <Upload className="w-5 h-5 text-green-400" />
              Upload Now
            </h3>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <GlowButton
                glowColor="green"
                leftIcon={<Upload className="w-4 h-4" />}
                onClick={handleOpenYouTubeStudio}
                className="bg-green-600 hover:bg-green-700 rounded-xl px-6 h-10"
              >
                Open YouTube Studio
              </GlowButton>
            </div>
          </div>
        )}

        {/* Warning Alert */}
        <Alert className="bg-yellow-900/20 border-yellow-600 text-yellow-200 rounded-2xl">
          <AlertDescription>
            <strong>⚠️ Due to YouTube API limitations, direct uploads are restricted:</strong>
            <ul className="mt-2 ml-4 list-disc space-y-1 text-sm">
              <li>Monetization, ad controls, end screens & cards are not configurable</li>
              <li>Cannot apply age restrictions or manage comment settings</li>
              <li>No control over YouTube processing speeds</li>
            </ul>
            <p className="mt-2 font-medium">➡️ We recommend uploading via YouTube Studio when reminded.</p>
          </AlertDescription>
        </Alert>
      </div>
    </GlowCard>
  );
};

export default ScheduleSection;
