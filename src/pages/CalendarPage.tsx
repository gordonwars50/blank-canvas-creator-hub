
import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import NewAppSidebar from '@/components/dashboard/NewAppSidebar';
import { GlowCard } from '@/components/ui/spotlight-card';
import { GlowButton } from '@/components/ui/glow-button';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import { ChevronLeft, ChevronRight, Video, Play, Eye, MessageSquare, Clock, ThumbsUp, Plus, Calendar as CalendarIcon } from 'lucide-react';
import { format, isSameDay, parseISO, startOfMonth, endOfMonth, isSameMonth } from 'date-fns';
import { useProjectManagement } from '@/hooks/useProjectManagement';
import AddNewVideoModal from '@/components/addnewvideo/AddNewVideoModal';

// Project state type
type ProjectState = 'Planning' | 'Production' | 'Scheduled' | 'Uploaded';

const getStateColor = (state: ProjectState) => {
  switch (state) {
    case 'Planning':
      return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50';
    case 'Production':
      return 'bg-blue-500/20 text-blue-400 border-blue-500/50';
    case 'Scheduled':
      return 'bg-purple-500/20 text-purple-400 border-purple-500/50';
    case 'Uploaded':
      return 'bg-green-500/20 text-green-400 border-green-500/50';
    default:
      return 'bg-gray-500/20 text-gray-400 border-gray-500/50';
  }
};

const formatNumber = (num: number) => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
};

const CalendarPage: React.FC = () => {
  const navigate = useNavigate();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [showAddVideoModal, setShowAddVideoModal] = useState(false);

  const { projects, loading } = useProjectManagement();

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  // Filter projects that have scheduled dates
  const scheduledProjects = useMemo(() => {
    return projects.filter(project => 
      project.scheduledDate && 
      (project.state === 'Scheduled' || project.state === 'Uploaded')
    );
  }, [projects]);

  // Get projects for the current month
  const monthProjects = useMemo(() => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(currentMonth);
    
    return scheduledProjects.filter(project => {
      if (!project.scheduledDate) return false;
      const projectDate = parseISO(project.scheduledDate);
      return projectDate >= monthStart && projectDate <= monthEnd;
    });
  }, [scheduledProjects, currentMonth]);

  // Get projects for selected date
  const selectedDateProjects = useMemo(() => {
    return scheduledProjects.filter(project => {
      if (!project.scheduledDate) return false;
      return isSameDay(parseISO(project.scheduledDate), selectedDate);
    });
  }, [scheduledProjects, selectedDate]);

  // Get dates that have projects
  const datesWithProjects = useMemo(() => {
    return scheduledProjects
      .filter(project => project.scheduledDate)
      .map(project => parseISO(project.scheduledDate!));
  }, [scheduledProjects]);

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      setSelectedDate(date);
      if (!isSameMonth(date, currentMonth)) {
        setCurrentMonth(date);
      }
    }
  };

  const handleProjectClick = (projectId: string) => {
    navigate(`/dashboard/project/${projectId}`);
  };

  const handleProjectHighlight = (projectId: string) => {
    const project = scheduledProjects.find(p => p.id === projectId);
    if (project && project.scheduledDate) {
      const projectDate = parseISO(project.scheduledDate);
      setSelectedDate(projectDate);
      if (!isSameMonth(projectDate, currentMonth)) {
        setCurrentMonth(projectDate);
      }
    }
  };

  const getMockStats = (state: ProjectState) => {
    if (state === 'Uploaded') {
      return {
        views: Math.floor(Math.random() * 50000) + 1000,
        comments: Math.floor(Math.random() * 200) + 10,
        watchTime: Math.floor(Math.random() * 5000) + 100,
        likes: Math.floor(Math.random() * 1000) + 50
      };
    }
    return { views: 0, comments: 0, watchTime: 0, likes: 0 };
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex w-full">
        <NewAppSidebar collapsed={sidebarCollapsed} onToggle={toggleSidebar} />
        <div 
          className="flex-1 flex items-center justify-center transition-all duration-300"
          style={{ marginLeft: sidebarCollapsed ? '60px' : '300px' }}
        >
          <div className="text-white">Loading calendar...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black flex w-full">
      <NewAppSidebar collapsed={sidebarCollapsed} onToggle={toggleSidebar} />

      <div 
        className="flex-1 flex flex-col min-w-0 transition-all duration-300"
        style={{ marginLeft: sidebarCollapsed ? '60px' : '300px' }}
      >
        {/* Header */}
        <div className="p-6 border-b border-gray-800">
          <div>
            <h1 className="text-2xl font-bold text-white">Content Calendar</h1>
            <p className="text-gray-400 text-sm mt-1">
              Plan and track your scheduled content
            </p>
          </div>
        </div>

        {/* Main Content - 2 Column Layout */}
        <div className="flex-1 p-6">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 h-full">
            {/* Left Column - Calendar (60%) */}
            <div className="lg:col-span-3">
              <GlowCard 
                glowColor="red" 
                customSize={true}
                className="bg-gray-900/50 border border-gray-800 p-6 h-full"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                    <CalendarIcon className="w-5 h-5" />
                    {format(currentMonth, 'MMMM yyyy')}
                  </h2>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
                      className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
                      className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={handleDateSelect}
                  month={currentMonth}
                  onMonthChange={setCurrentMonth}
                  className="w-full"
                  classNames={{
                    months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
                    month: "space-y-4 w-full",
                    caption: "hidden", // Hide the duplicate month/year and navigation
                    caption_label: "hidden",
                    nav: "hidden", // Hide the duplicate navigation arrows
                    nav_button: "hidden",
                    nav_button_previous: "hidden",
                    nav_button_next: "hidden",
                    table: "w-full border-collapse space-y-1",
                    head_row: "flex",
                    head_cell: "text-gray-400 rounded-md w-full font-normal text-[0.8rem] flex-1 text-center",
                    row: "flex w-full mt-2",
                    cell: "relative text-center text-sm p-0 text-white hover:bg-gray-800 rounded-md flex-1 aspect-square border border-gray-800",
                    day: "h-full w-full p-1 font-normal aria-selected:opacity-100 text-white hover:bg-gray-800 rounded-md flex flex-col items-start justify-start",
                    day_range_end: "day-range-end",
                    day_selected: "bg-red-500/30 text-red-200 hover:bg-red-500/40 focus:bg-red-500/30 rounded-md border-red-500/50",
                    day_today: "bg-gray-800 text-white rounded-md font-semibold",
                    day_outside: "text-gray-600 opacity-50",
                    day_disabled: "text-gray-600 opacity-50",
                    day_range_middle: "aria-selected:bg-gray-800 aria-selected:text-white",
                    day_hidden: "invisible",
                  }}
                  modifiers={{
                    hasProject: datesWithProjects,
                  }}
                  modifiersClassNames={{
                    hasProject: "bg-blue-500/20 border-blue-500/50",
                  }}
                  components={{
                    Day: ({ date, ...props }) => {
                      const dayProjects = scheduledProjects.filter(project => 
                        project.scheduledDate && isSameDay(parseISO(project.scheduledDate), date)
                      );
                      
                      return (
                        <div className="h-full w-full p-1 flex flex-col">
                          <span className="text-xs font-medium mb-1">
                            {format(date, 'd')}
                          </span>
                          <div className="flex-1 space-y-1 overflow-hidden">
                            {dayProjects.slice(0, 2).map((project, index) => (
                              <div
                                key={project.id}
                                className="text-xs bg-red-500/20 text-red-300 px-1 py-0.5 rounded truncate cursor-pointer hover:bg-red-500/30"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleProjectHighlight(project.id);
                                }}
                                title={project.title}
                              >
                                {project.title}
                              </div>
                            ))}
                            {dayProjects.length > 2 && (
                              <div className="text-xs text-gray-400">
                                +{dayProjects.length - 2} more
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    }
                  }}
                />
              </GlowCard>
            </div>

            {/* Right Column - Project List (40%) */}
            <div className="lg:col-span-2">
              <GlowCard 
                glowColor="red" 
                customSize={true}
                className="bg-gray-900/50 border border-gray-800 p-6 h-full flex flex-col"
              >
                {/* Header with Date Info and Schedule Button */}
                <div className="space-y-4 mb-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-white">
                      {format(selectedDate, 'MMMM d, yyyy')}
                    </h2>
                    <div className="text-sm text-gray-400">
                      {selectedDateProjects.length} scheduled
                    </div>
                  </div>
                  
                  <GlowButton
                    glowColor="red"
                    leftIcon={<Plus className="w-4 h-4" />}
                    className="bg-red-600 hover:bg-red-700 rounded-lg px-4 h-9 text-sm w-full"
                    onClick={() => setShowAddVideoModal(true)}
                  >
                    Schedule New Video
                  </GlowButton>
                </div>

                <div className="flex-1 overflow-y-auto space-y-3">
                  {selectedDateProjects.length > 0 ? (
                    selectedDateProjects.map((project) => {
                      const mockStats = getMockStats(project.state);
                      return (
                        <div
                          key={project.id}
                          className="p-4 bg-gray-800/50 border border-gray-700 rounded-lg hover:border-red-500/50 transition-all duration-200 cursor-pointer"
                          onClick={() => handleProjectClick(project.id)}
                        >
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex-1 min-w-0">
                              <h3 className="text-sm font-bold text-white mb-1 truncate">
                                {project.title}
                              </h3>
                              <p className="text-xs text-gray-400 line-clamp-2">
                                {project.metadata.description || project.ideas || 'No description available'}
                              </p>
                            </div>
                            <Badge className={`${getStateColor(project.state)} border text-xs ml-3`}>
                              {project.state}
                            </Badge>
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3 text-xs text-gray-500">
                              <div className="flex items-center gap-1">
                                <Eye className="w-3 h-3" />
                                <span>{formatNumber(mockStats.views)}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <ThumbsUp className="w-3 h-3" />
                                <span>{formatNumber(mockStats.likes)}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <MessageSquare className="w-3 h-3" />
                                <span>{formatNumber(mockStats.comments)}</span>
                              </div>
                            </div>
                            
                            {project.scheduledDate && (
                              <div className="text-xs text-gray-400">
                                {format(parseISO(project.scheduledDate), 'h:mm a')}
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-center py-12">
                      <CalendarIcon className="w-12 h-12 text-gray-600 mb-4" />
                      <h3 className="text-lg font-medium text-gray-400 mb-2">
                        No content scheduled
                      </h3>
                      <p className="text-sm text-gray-500 mb-6">
                        Schedule your first video for {format(selectedDate, 'MMMM d')}
                      </p>
                    </div>
                  )}
                </div>

                {/* Month Summary */}
                {monthProjects.length > selectedDateProjects.length && (
                  <div className="mt-6 pt-4 border-t border-gray-700">
                    <div className="text-xs text-gray-400 text-center">
                      {monthProjects.length} total videos scheduled this month
                    </div>
                  </div>
                )}
              </GlowCard>
            </div>
          </div>
        </div>
      </div>

      {/* Add New Video Modal */}
      <AddNewVideoModal
        isOpen={showAddVideoModal}
        onClose={() => setShowAddVideoModal(false)}
      />
    </div>
  );
};

export default CalendarPage;
