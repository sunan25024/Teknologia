import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar as CalendarIcon, Plus, Edit3, Trash2, Clock, MapPin, User, ChevronLeft, ChevronRight } from 'lucide-react';

interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
  time: string;
  location?: string;
  attendees?: string[];
  type: 'meeting' | 'task' | 'reminder' | 'event';
  color: string;
}

const Calendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [events, setEvents] = useState<Event[]>([
    {
      id: 1,
      title: 'Team Meeting',
      description: 'Weekly team sync and project updates',
      date: '2025-01-15',
      time: '10:00',
      location: 'Conference Room A',
      attendees: ['John Doe', 'Jane Smith'],
      type: 'meeting',
      color: 'from-blue-400 to-cyan-500'
    },
    {
      id: 2,
      title: 'Project Deadline',
      description: 'Final submission for Q1 project',
      date: '2025-01-20',
      time: '17:00',
      type: 'task',
      color: 'from-red-400 to-rose-500'
    },
    {
      id: 3,
      title: 'Client Presentation',
      description: 'Present quarterly results to key clients',
      date: '2025-01-18',
      time: '14:00',
      location: 'Boardroom',
      attendees: ['Client ABC', 'Client XYZ'],
      type: 'event',
      color: 'from-purple-400 to-pink-500'
    },
    {
      id: 4,
      title: 'Code Review',
      description: 'Review new feature implementation',
      date: '2025-01-16',
      time: '15:30',
      type: 'meeting',
      color: 'from-green-400 to-emerald-500'
    }
  ]);

  const [showEventModal, setShowEventModal] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    type: 'event' as Event['type']
  });

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const colors = [
    'from-blue-400 to-cyan-500',
    'from-green-400 to-emerald-500',
    'from-purple-400 to-pink-500',
    'from-yellow-400 to-orange-500',
    'from-red-400 to-rose-500',
    'from-indigo-400 to-blue-500'
  ];

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
  
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const previousMonthDays = Array.from({ length: firstDayOfMonth }, (_, i) => 
    new Date(currentDate.getFullYear(), currentDate.getMonth(), -i).getDate()
  ).reverse();

  const getEventsForDate = (date: number) => {
    const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(date).padStart(2, '0')}`;
    return events.filter(event => event.date === dateStr);
  };

  const handleCreateEvent = () => {
    if (newEvent.title.trim()) {
      const event: Event = {
        id: Date.now(),
        title: newEvent.title,
        description: newEvent.description,
        date: newEvent.date,
        time: newEvent.time,
        location: newEvent.location,
        attendees: [],
        type: newEvent.type,
        color: colors[Math.floor(Math.random() * colors.length)]
      };
      setEvents([...events, event]);
      setNewEvent({ title: '', description: '', date: '', time: '', location: '', type: 'event' });
      setShowEventModal(false);
    }
  };

  const deleteEvent = (id: number) => {
    setEvents(events.filter(event => event.id !== id));
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + (direction === 'next' ? 1 : -1), 1));
  };

  const stats = [
    { label: 'Total Events', value: events.length.toString(), color: 'from-blue-500 to-cyan-500' },
    { label: 'This Month', value: events.filter(e => e.date.startsWith(`${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}`)).length.toString(), color: 'from-green-500 to-emerald-500' },
    { label: 'Meetings', value: events.filter(e => e.type === 'meeting').length.toString(), color: 'from-purple-500 to-pink-500' },
    { label: 'Tasks', value: events.filter(e => e.type === 'task').length.toString(), color: 'from-orange-500 to-red-500' }
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-center mb-8"
      >
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-2">
            Calendar
          </h1>
          <p className="text-slate-600 text-lg">Schedule and manage your activities beautifully</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowEventModal(true)}
          className="flex items-center px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 font-semibold"
        >
          <Plus className="w-5 h-5 mr-2" />
          New Event
        </motion.button>
      </motion.div>

      {/* Stats */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
      >
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.05, y: -5 }}
            className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-xl border border-white/20 p-6 hover:shadow-2xl transition-all duration-300"
          >
            <div className="flex items-center justify-between">
              <div className={`bg-gradient-to-r ${stat.color} rounded-2xl p-3 shadow-lg`}>
                <CalendarIcon className="w-6 h-6 text-white" />
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-slate-800">{stat.value}</p>
                <p className="text-sm text-slate-600">{stat.label}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Calendar Grid */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-3 bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8"
        >
          {/* Calendar Header */}
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-slate-800">
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h2>
            <div className="flex space-x-2">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => navigateMonth('prev')}
                className="p-3 text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-2xl transition-all duration-200"
              >
                <ChevronLeft className="w-5 h-5" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => navigateMonth('next')}
                className="p-3 text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-2xl transition-all duration-200"
              >
                <ChevronRight className="w-5 h-5" />
              </motion.button>
            </div>
          </div>

          {/* Days of Week Header */}
          <div className="grid grid-cols-7 gap-2 mb-4">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="p-3 text-center text-sm font-bold text-slate-600 bg-slate-50 rounded-xl">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Days */}
          <div className="grid grid-cols-7 gap-2">
            {/* Previous month days */}
            {previousMonthDays.map((day, index) => (
              <div key={`prev-${index}`} className="p-3 h-28 text-slate-300 text-sm rounded-xl bg-slate-50/50">
                <span className="font-medium">{day}</span>
              </div>
            ))}

            {/* Current month days */}
            {days.map(day => {
              const dayEvents = getEventsForDate(day);
              const isToday = new Date().getDate() === day && 
                            new Date().getMonth() === currentDate.getMonth() && 
                            new Date().getFullYear() === currentDate.getFullYear();

              return (
                <motion.div
                  key={day}
                  whileHover={{ scale: 1.02, y: -2 }}
                  className={`p-3 h-28 border-2 cursor-pointer rounded-2xl transition-all duration-300 ${
                    isToday 
                      ? 'bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-300 shadow-lg' 
                      : 'bg-white/60 border-white/40 hover:bg-white/80 hover:border-white/60 hover:shadow-lg'
                  }`}
                  onClick={() => setSelectedDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), day))}
                >
                  <div className={`text-sm font-bold mb-2 ${isToday ? 'text-blue-600' : 'text-slate-800'}`}>
                    {day}
                  </div>
                  <div className="space-y-1">
                    <AnimatePresence>
                      {dayEvents.slice(0, 2).map(event => (
                        <motion.div
                          key={event.id}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          className={`text-xs p-1 rounded-lg truncate bg-gradient-to-r ${event.color} text-white font-medium shadow-sm`}
                        >
                          {event.title}
                        </motion.div>
                      ))}
                    </AnimatePresence>
                    {dayEvents.length > 2 && (
                      <div className="text-xs text-slate-500 font-medium">
                        +{dayEvents.length - 2} more
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Event List Sidebar */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-6"
        >
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/20 p-6">
            <h3 className="text-xl font-bold text-slate-800 mb-6">Upcoming Events</h3>
            <div className="space-y-4">
              <AnimatePresence>
                {events
                  .filter(event => new Date(event.date) >= new Date())
                  .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
                  .slice(0, 5)
                  .map((event, index) => (
                    <motion.div
                      key={event.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.02, y: -2 }}
                      className={`p-4 rounded-2xl bg-gradient-to-r ${event.color} text-white shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden`}
                    >
                      <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
                      <div className="relative z-10">
                        <div className="flex justify-between items-start mb-3">
                          <h4 className="font-bold text-sm">{event.title}</h4>
                          <motion.button
                            whileHover={{ scale: 1.2 }}
                            whileTap={{ scale: 0.8 }}
                            onClick={() => deleteEvent(event.id)}
                            className="text-white/80 hover:text-white p-1 rounded-lg hover:bg-white/20 transition-all duration-200"
                          >
                            <Trash2 className="w-3 h-3" />
                          </motion.button>
                        </div>
                        
                        <div className="space-y-2 text-xs text-white/90">
                          <div className="flex items-center">
                            <CalendarIcon className="w-3 h-3 mr-2" />
                            {event.date}
                          </div>
                          <div className="flex items-center">
                            <Clock className="w-3 h-3 mr-2" />
                            {event.time}
                          </div>
                          {event.location && (
                            <div className="flex items-center">
                              <MapPin className="w-3 h-3 mr-2" />
                              {event.location}
                            </div>
                          )}
                        </div>
                      </div>
                      
                      {/* Decorative elements */}
                      <div className="absolute -top-2 -right-2 w-12 h-12 bg-white/10 rounded-full"></div>
                      <div className="absolute -bottom-1 -left-1 w-8 h-8 bg-white/10 rounded-full"></div>
                    </motion.div>
                  ))}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>

      {/* New Event Modal */}
      <AnimatePresence>
        {showEventModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl max-w-md w-full border border-white/20"
            >
              <div className="p-8">
                <h2 className="text-2xl font-bold text-slate-800 mb-6">Create New Event</h2>
                
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Event title"
                    value={newEvent.title}
                    onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                    className="w-full px-4 py-3 bg-white/70 border border-white/20 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
                  />
                  
                  <textarea
                    placeholder="Event description"
                    value={newEvent.description}
                    onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-3 bg-white/70 border border-white/20 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none transition-all duration-300"
                  />
                  
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="date"
                      value={newEvent.date}
                      onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                      className="px-4 py-3 bg-white/70 border border-white/20 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
                    />
                    <input
                      type="time"
                      value={newEvent.time}
                      onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
                      className="px-4 py-3 bg-white/70 border border-white/20 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
                    />
                  </div>
                  
                  <input
                    type="text"
                    placeholder="Location (optional)"
                    value={newEvent.location}
                    onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
                    className="w-full px-4 py-3 bg-white/70 border border-white/20 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
                  />
                  
                  <select
                    value={newEvent.type}
                    onChange={(e) => setNewEvent({ ...newEvent, type: e.target.value as Event['type'] })}
                    className="w-full px-4 py-3 bg-white/70 border border-white/20 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
                  >
                    <option value="event">Event</option>
                    <option value="meeting">Meeting</option>
                    <option value="task">Task</option>
                    <option value="reminder">Reminder</option>
                  </select>
                </div>
                
                <div className="flex justify-end space-x-3 mt-8">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowEventModal(false)}
                    className="px-6 py-3 text-slate-700 bg-slate-200 rounded-2xl hover:bg-slate-300 transition-all duration-200 font-medium"
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleCreateEvent}
                    className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-2xl hover:from-indigo-600 hover:to-purple-700 transition-all duration-200 font-medium shadow-lg"
                  >
                    Create Event
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Calendar;