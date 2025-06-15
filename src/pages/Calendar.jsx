import React, { useState } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Plus,
  Calendar as CalendarIcon,
  Clock,
  MapPin
} from 'lucide-react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, addMonths, subMonths } from 'date-fns';
import { useTheme } from '../context/ThemeContext';

const Calendar = () => {
  const { theme } = useTheme();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showEventModal, setShowEventModal] = useState(false);

  const events = [
    {
      id: 1,
      title: 'Team Meeting',
      date: new Date(),
      time: '10:00 AM',
      location: 'Conference Room A',
      type: 'meeting'
    },
    {
      id: 2,
      title: 'Project Review',
      date: new Date(Date.now() + 86400000),
      time: '2:00 PM',
      location: 'Online',
      type: 'review'
    },
    {
      id: 3,
      title: 'Client Presentation',
      date: new Date(Date.now() + 172800000),
      time: '11:00 AM',
      location: 'Client Office',
      type: 'presentation'
    },
  ];

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const calendarDays = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const getEventsForDate = (date) => {
    return events.filter(event => isSameDay(event.date, date));
  };

  const getEventTypeColor = (type) => {
    switch (type) {
      case 'meeting':
        return theme.primary;
      case 'review':
        return theme.secondary;
      case 'presentation':
        return theme.accent;
      default:
        return theme.success;
    }
  };

  const navigateMonth = (direction) => {
    if (direction === 'prev') {
      setCurrentDate(subMonths(currentDate, 1));
    } else {
      setCurrentDate(addMonths(currentDate, 1));
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold" style={{ color: theme.text }}>
            Calendar
          </h1>
          <p className="mt-2" style={{ color: theme.textSecondary }}>
            Manage your schedule and upcoming events
          </p>
        </div>
        <button
          onClick={() => setShowEventModal(true)}
          className="flex items-center space-x-2 px-4 py-2 rounded-lg text-white font-medium transition-colors hover:opacity-90"
          style={{ backgroundColor: theme.primary }}
        >
          <Plus className="w-4 h-4" />
          <span>Add Event</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Calendar */}
        <div 
          className="lg:col-span-3 p-6 rounded-xl"
          style={{ 
            backgroundColor: theme.surface,
            boxShadow: `0 1px 3px ${theme.shadow}`
          }}
        >
          {/* Calendar Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold" style={{ color: theme.text }}>
              {format(currentDate, 'MMMM yyyy')}
            </h2>
            <div className="flex space-x-2">
              <button
                onClick={() => navigateMonth('prev')}
                className="p-2 rounded-lg transition-colors hover:bg-opacity-80"
                style={{ backgroundColor: theme.surfaceAlt }}
              >
                <ChevronLeft className="w-4 h-4" style={{ color: theme.text }} />
              </button>
              <button
                onClick={() => navigateMonth('next')}
                className="p-2 rounded-lg transition-colors hover:bg-opacity-80"
                style={{ backgroundColor: theme.surfaceAlt }}
              >
                <ChevronRight className="w-4 h-4" style={{ color: theme.text }} />
              </button>
            </div>
          </div>

          {/* Days of Week */}
          <div className="grid grid-cols-7 gap-1 mb-4">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="p-2 text-center text-sm font-medium" style={{ color: theme.textSecondary }}>
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1">
            {calendarDays.map(day => {
              const dayEvents = getEventsForDate(day);
              const isSelected = isSameDay(day, selectedDate);
              const isToday = isSameDay(day, new Date());
              
              return (
                <div
                  key={day.toISOString()}
                  onClick={() => setSelectedDate(day)}
                  className={`p-2 min-h-[100px] cursor-pointer transition-colors border rounded-lg ${
                    isSelected ? 'ring-2' : ''
                  }`}
                  style={{
                    backgroundColor: isSelected ? theme.primary + '20' : theme.background,
                    borderColor: isToday ? theme.primary : theme.border,
                    ringColor: theme.primary
                  }}
                >
                  <div className={`text-sm font-medium mb-1 ${
                    isToday ? 'font-bold' : ''
                  }`} 
                  style={{ 
                    color: isToday ? theme.primary : 
                           isSameMonth(day, currentDate) ? theme.text : theme.textSecondary 
                  }}>
                    {format(day, 'd')}
                  </div>
                  
                  <div className="space-y-1">
                    {dayEvents.slice(0, 2).map(event => (
                      <div
                        key={event.id}
                        className="text-xs px-2 py-1 rounded text-white truncate"
                        style={{ backgroundColor: getEventTypeColor(event.type) }}
                      >
                        {event.title}
                      </div>
                    ))}
                    {dayEvents.length > 2 && (
                      <div className="text-xs text-center" style={{ color: theme.textSecondary }}>
                        +{dayEvents.length - 2} more
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Today's Events */}
          <div 
            className="p-6 rounded-xl"
            style={{ 
              backgroundColor: theme.surface,
              boxShadow: `0 1px 3px ${theme.shadow}`
            }}
          >
            <h3 className="text-lg font-semibold mb-4" style={{ color: theme.text }}>
              Today's Events
            </h3>
            <div className="space-y-3">
              {getEventsForDate(new Date()).map(event => (
                <div key={event.id} className="p-3 rounded-lg" style={{ backgroundColor: theme.surfaceAlt }}>
                  <div className="flex items-start space-x-3">
                    <div 
                      className="w-3 h-3 rounded-full mt-1"
                      style={{ backgroundColor: getEventTypeColor(event.type) }}
                    />
                    <div className="flex-1">
                      <h4 className="font-medium" style={{ color: theme.text }}>
                        {event.title}
                      </h4>
                      <div className="flex items-center space-x-4 mt-1 text-sm" style={{ color: theme.textSecondary }}>
                        <div className="flex items-center space-x-1">
                          <Clock className="w-3 h-3" />
                          <span>{event.time}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MapPin className="w-3 h-3" />
                          <span>{event.location}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              {getEventsForDate(new Date()).length === 0 && (
                <p className="text-sm text-center py-4" style={{ color: theme.textSecondary }}>
                  No events today
                </p>
              )}
            </div>
          </div>

          {/* Mini Calendar */}
          <div 
            className="p-6 rounded-xl"
            style={{ 
              backgroundColor: theme.surface,
              boxShadow: `0 1px 3px ${theme.shadow}`
            }}
          >
            <h3 className="text-lg font-semibold mb-4" style={{ color: theme.text }}>
              Quick Navigation
            </h3>
            <div className="grid grid-cols-7 gap-1 text-xs">
              {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(day => (
                <div key={day} className="p-1 text-center font-medium" style={{ color: theme.textSecondary }}>
                  {day}
                </div>
              ))}
              {calendarDays.map(day => (
                <button
                  key={day.toISOString()}
                  onClick={() => setSelectedDate(day)}
                  className={`p-1 text-xs rounded hover:bg-opacity-80 ${
                    isSameDay(day, selectedDate) ? 'font-bold' : ''
                  }`}
                  style={{
                    backgroundColor: isSameDay(day, selectedDate) ? theme.primary : 'transparent',
                    color: isSameDay(day, selectedDate) ? 'white' : 
                           isSameDay(day, new Date()) ? theme.primary :
                           isSameMonth(day, currentDate) ? theme.text : theme.textSecondary
                  }}
                >
                  {format(day, 'd')}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Event Modal */}
      {showEventModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div 
            className="w-full max-w-md p-6 rounded-xl"
            style={{ backgroundColor: theme.surface }}
          >
            <h3 className="text-lg font-semibold mb-4" style={{ color: theme.text }}>
              Add New Event
            </h3>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Event Title"
                className="w-full p-3 rounded-lg border"
                style={{
                  backgroundColor: theme.background,
                  borderColor: theme.border,
                  color: theme.text
                }}
              />
              <input
                type="time"
                className="w-full p-3 rounded-lg border"
                style={{
                  backgroundColor: theme.background,
                  borderColor: theme.border,
                  color: theme.text
                }}
              />
              <input
                type="text"
                placeholder="Location"
                className="w-full p-3 rounded-lg border"
                style={{
                  backgroundColor: theme.background,
                  borderColor: theme.border,
                  color: theme.text
                }}
              />
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowEventModal(false)}
                  className="flex-1 p-3 rounded-lg border transition-colors"
                  style={{ 
                    borderColor: theme.border,
                    color: theme.text 
                  }}
                >
                  Cancel
                </button>
                <button
                  onClick={() => setShowEventModal(false)}
                  className="flex-1 p-3 rounded-lg text-white transition-colors hover:opacity-90"
                  style={{ backgroundColor: theme.primary }}
                >
                  Add Event
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar;