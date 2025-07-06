import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, FileText, Camera, Calendar, MessageCircle, Users, Activity, Clock, Star, ArrowUp, Zap, Target, StickyNote, Plus, Edit3, CalendarDays, BarChart3, Eye, Download, ExternalLink, ArrowRight } from 'lucide-react';
import { ViewType } from '../App';

interface Note {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  color: string;
}

interface Report {
  id: number;
  title: string;
  description: string;
  createdAt: string;
  status: 'draft' | 'completed';
  type: 'text' | 'photo' | 'mixed';
}

interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  type: 'meeting' | 'task' | 'reminder';
  color: string;
}

interface DashboardProps {
  onNavigate: (view: ViewType) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
  const [showNotesModal, setShowNotesModal] = useState(false);
  const [showReportsModal, setShowReportsModal] = useState(false);
  const [showCalendarModal, setShowCalendarModal] = useState(false);
  const [newNote, setNewNote] = useState({ title: '', content: '' });
  const [newReport, setNewReport] = useState({ title: '', description: '', type: 'text' as 'text' | 'photo' | 'mixed' });
  const [newEvent, setNewEvent] = useState({ title: '', date: '', time: '', type: 'meeting' as 'meeting' | 'task' | 'reminder' });

  const [notes, setNotes] = useState<Note[]>([
    {
      id: 1,
      title: 'Project Meeting Notes',
      content: 'Discussed the new features for the upcoming release...',
      createdAt: '2025-01-10',
      color: 'from-blue-400 to-cyan-500'
    },
    {
      id: 2,
      title: 'Shopping List',
      content: 'Weekly grocery shopping: Milk, Bread, Eggs...',
      createdAt: '2025-01-09',
      color: 'from-green-400 to-emerald-500'
    },
    {
      id: 3,
      title: 'Book Ideas',
      content: 'Collection of interesting book concepts...',
      createdAt: '2025-01-08',
      color: 'from-purple-400 to-pink-500'
    }
  ]);

  const [reports, setReports] = useState<Report[]>([
    {
      id: 1,
      title: 'Monthly Progress Report',
      description: 'Comprehensive analysis of project milestones',
      createdAt: '2025-01-10',
      status: 'completed',
      type: 'mixed'
    },
    {
      id: 2,
      title: 'Site Inspection Report',
      description: 'Detailed documentation of site conditions',
      createdAt: '2025-01-09',
      status: 'draft',
      type: 'photo'
    }
  ]);

  const [events, setEvents] = useState<Event[]>([
    {
      id: 1,
      title: 'Team Meeting',
      date: '2025-01-15',
      time: '10:00',
      type: 'meeting',
      color: 'from-blue-400 to-cyan-500'
    },
    {
      id: 2,
      title: 'Project Deadline',
      date: '2025-01-20',
      time: '17:00',
      type: 'task',
      color: 'from-red-400 to-rose-500'
    },
    {
      id: 3,
      title: 'Client Presentation',
      date: '2025-01-18',
      time: '14:00',
      type: 'meeting',
      color: 'from-purple-400 to-pink-500'
    }
  ]);

  const stats = [
    { label: 'Total Notes', value: notes.length.toString(), icon: StickyNote, color: 'from-amber-400 to-orange-500', change: '+12%', trend: 'up' },
    { label: 'Reports Created', value: reports.length.toString(), icon: FileText, color: 'from-emerald-400 to-green-500', change: '+8%', trend: 'up' },
    { label: 'Photos Captured', value: '89', icon: Camera, color: 'from-violet-400 to-purple-500', change: '+23%', trend: 'up' },
    { label: 'Scheduled Events', value: events.length.toString(), icon: Calendar, color: 'from-cyan-400 to-blue-500', change: '+5%', trend: 'up' },
  ];

  const recentActivity = [
    { action: 'Created new report', time: '2 hours ago', type: 'report', color: 'bg-emerald-100 text-emerald-800', icon: FileText },
    { action: 'Added 3 photos to gallery', time: '5 hours ago', type: 'photo', color: 'bg-violet-100 text-violet-800', icon: Camera },
    { action: 'Scheduled meeting for tomorrow', time: '1 day ago', type: 'calendar', color: 'bg-cyan-100 text-cyan-800', icon: Calendar },
    { action: 'Sent WhatsApp message', time: '2 days ago', type: 'message', color: 'bg-green-100 text-green-800', icon: MessageCircle },
  ];

  const handleCreateNote = () => {
    if (newNote.title.trim()) {
      const note: Note = {
        id: Date.now(),
        title: newNote.title,
        content: newNote.content,
        createdAt: new Date().toISOString().split('T')[0],
        color: ['from-blue-400 to-cyan-500', 'from-green-400 to-emerald-500', 'from-purple-400 to-pink-500', 'from-yellow-400 to-orange-500'][Math.floor(Math.random() * 4)]
      };
      setNotes([note, ...notes]);
      setNewNote({ title: '', content: '' });
      setShowNotesModal(false);
    }
  };

  const handleCreateReport = () => {
    if (newReport.title.trim()) {
      const report: Report = {
        id: Date.now(),
        title: newReport.title,
        description: newReport.description,
        createdAt: new Date().toISOString().split('T')[0],
        status: 'draft',
        type: newReport.type
      };
      setReports([report, ...reports]);
      setNewReport({ title: '', description: '', type: 'text' });
      setShowReportsModal(false);
    }
  };

  const handleCreateEvent = () => {
    if (newEvent.title.trim()) {
      const event: Event = {
        id: Date.now(),
        title: newEvent.title,
        date: newEvent.date,
        time: newEvent.time,
        type: newEvent.type,
        color: ['from-blue-400 to-cyan-500', 'from-green-400 to-emerald-500', 'from-purple-400 to-pink-500', 'from-red-400 to-rose-500'][Math.floor(Math.random() * 4)]
      };
      setEvents([event, ...events]);
      setNewEvent({ title: '', date: '', time: '', type: 'meeting' });
      setShowCalendarModal(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="p-2 sm:p-4 lg:p-6 h-full overflow-y-auto">
      {/* Welcome Section */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-4 sm:mb-6 lg:mb-8"
      >
        <div className="flex flex-col space-y-3 sm:space-y-4">
          <div>
            <h1 className="text-xl sm:text-2xl lg:text-4xl font-bold bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-1 sm:mb-2">
              Welcome Back!
            </h1>
            <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm lg:text-lg">Here's what's happening with your productivity today.</p>
          </div>
          <motion.div 
            whileHover={{ scale: 1.05, rotate: 5 }}
            className="flex items-center space-x-2 bg-gradient-to-r from-green-400 to-emerald-500 text-white rounded-lg sm:rounded-xl px-2 sm:px-3 lg:px-4 py-1 sm:py-2 shadow-lg self-start"
          >
            <Activity className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5" />
            <span className="text-xs sm:text-sm font-medium">All systems operational</span>
          </motion.div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 lg:gap-6 mb-4 sm:mb-6 lg:mb-8"
      >
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.02, y: -2 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-purple-600 rounded-xl sm:rounded-2xl lg:rounded-3xl blur opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
              <div className="relative bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-xl sm:rounded-2xl lg:rounded-3xl shadow-xl border border-white/20 dark:border-slate-700/20 p-2 sm:p-4 lg:p-6 hover:shadow-2xl transition-all duration-300 overflow-hidden">
                <div className="absolute top-0 right-0 w-8 sm:w-16 lg:w-32 h-8 sm:h-16 lg:h-32 bg-gradient-to-br from-white/10 to-transparent rounded-full -translate-y-4 sm:-translate-y-8 lg:-translate-y-16 translate-x-4 sm:translate-x-8 lg:translate-x-16"></div>
                
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-1 sm:mb-2 lg:mb-4 relative z-10">
                  <div className={`bg-gradient-to-r ${stat.color} rounded-lg sm:rounded-xl lg:rounded-2xl p-1.5 sm:p-2 lg:p-3 shadow-lg mb-1 sm:mb-0 self-start`}>
                    <Icon className="w-3 h-3 sm:w-4 sm:h-4 lg:w-6 lg:h-6 text-white" />
                  </div>
                  <div className="flex items-center text-green-600 text-xs sm:text-sm font-semibold">
                    <ArrowUp className="w-2 h-2 sm:w-3 sm:h-3 lg:w-4 lg:h-4 mr-1" />
                    {stat.change}
                  </div>
                </div>
                
                <div className="relative z-10">
                  <p className="text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-400 mb-0.5 sm:mb-1">{stat.label}</p>
                  <p className="text-lg sm:text-xl lg:text-3xl font-bold text-slate-800 dark:text-white">{stat.value}</p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-3 sm:gap-4 lg:gap-8">
        {/* Feature Cards */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="xl:col-span-2 space-y-3 sm:space-y-4 lg:space-y-6"
        >
          {/* Notes Card */}
          <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-xl sm:rounded-2xl lg:rounded-3xl shadow-xl border border-white/20 dark:border-slate-700/20 p-3 sm:p-4 lg:p-8">
            <div className="flex flex-col space-y-2 sm:space-y-3 lg:space-y-0 lg:flex-row lg:items-center justify-between mb-3 sm:mb-4 lg:mb-6">
              <div className="flex items-center space-x-2 sm:space-x-3">
                <div className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-lg sm:rounded-xl lg:rounded-2xl p-1.5 sm:p-2 lg:p-3 shadow-lg">
                  <StickyNote className="w-3 h-3 sm:w-4 sm:h-4 lg:w-6 lg:h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-sm sm:text-lg lg:text-2xl font-bold text-slate-800 dark:text-white">Smart Notes</h2>
                  <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm lg:text-base">Organize your thoughts beautifully</p>
                </div>
              </div>
              <div className="flex items-center space-x-1 sm:space-x-2 lg:space-x-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onNavigate('notes')}
                  className="flex items-center px-2 sm:px-3 lg:px-4 py-1.5 sm:py-2 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg sm:rounded-xl hover:bg-slate-300 dark:hover:bg-slate-600 transition-all duration-300 font-medium text-xs sm:text-sm"
                >
                  <ExternalLink className="w-2.5 h-2.5 sm:w-3 sm:h-3 lg:w-4 lg:h-4 mr-1 sm:mr-2" />
                  View All
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowNotesModal(true)}
                  className="flex items-center px-2 sm:px-3 lg:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-lg sm:rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 font-semibold text-xs sm:text-sm"
                >
                  <Plus className="w-2.5 h-2.5 sm:w-3 sm:h-3 lg:w-4 lg:h-4 mr-1 sm:mr-2" />
                  New Note
                </motion.button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 lg:gap-4">
              {notes.slice(0, 4).map((note, index) => (
                <motion.div
                  key={note.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, y: -2 }}
                  onClick={() => onNavigate('notes')}
                  className={`bg-gradient-to-r ${note.color} rounded-lg sm:rounded-xl lg:rounded-2xl p-2 sm:p-3 lg:p-4 text-white shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer`}
                >
                  <h3 className="font-bold text-xs sm:text-sm lg:text-lg mb-1 sm:mb-2 truncate">{note.title}</h3>
                  <p className="text-white/90 text-xs sm:text-sm line-clamp-2 mb-1 sm:mb-2 lg:mb-3">{note.content}</p>
                  <p className="text-white/70 text-xs">{note.createdAt}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Reports Card */}
          <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-xl sm:rounded-2xl lg:rounded-3xl shadow-xl border border-white/20 dark:border-slate-700/20 p-3 sm:p-4 lg:p-8">
            <div className="flex flex-col space-y-2 sm:space-y-3 lg:space-y-0 lg:flex-row lg:items-center justify-between mb-3 sm:mb-4 lg:mb-6">
              <div className="flex items-center space-x-2 sm:space-x-3">
                <div className="bg-gradient-to-r from-emerald-500 to-green-500 rounded-lg sm:rounded-xl lg:rounded-2xl p-1.5 sm:p-2 lg:p-3 shadow-lg">
                  <FileText className="w-3 h-3 sm:w-4 sm:h-4 lg:w-6 lg:h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-sm sm:text-lg lg:text-2xl font-bold text-slate-800 dark:text-white">Dynamic Reports</h2>
                  <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm lg:text-base">Create comprehensive reports</p>
                </div>
              </div>
              <div className="flex items-center space-x-1 sm:space-x-2 lg:space-x-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onNavigate('reports')}
                  className="flex items-center px-2 sm:px-3 lg:px-4 py-1.5 sm:py-2 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg sm:rounded-xl hover:bg-slate-300 dark:hover:bg-slate-600 transition-all duration-300 font-medium text-xs sm:text-sm"
                >
                  <ExternalLink className="w-2.5 h-2.5 sm:w-3 sm:h-3 lg:w-4 lg:h-4 mr-1 sm:mr-2" />
                  View All
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowReportsModal(true)}
                  className="flex items-center px-2 sm:px-3 lg:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-emerald-500 to-green-500 text-white rounded-lg sm:rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 font-semibold text-xs sm:text-sm"
                >
                  <Plus className="w-2.5 h-2.5 sm:w-3 sm:h-3 lg:w-4 lg:h-4 mr-1 sm:mr-2" />
                  New Report
                </motion.button>
              </div>
            </div>
            
            <div className="space-y-2 sm:space-y-3 lg:space-y-4">
              {reports.slice(0, 3).map((report, index) => (
                <motion.div
                  key={report.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, x: 4 }}
                  onClick={() => onNavigate('reports')}
                  className="bg-white/60 dark:bg-slate-700/60 rounded-lg sm:rounded-xl lg:rounded-2xl p-2 sm:p-3 lg:p-4 border border-white/20 dark:border-slate-600/20 hover:shadow-lg transition-all duration-300 cursor-pointer"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-slate-800 dark:text-white mb-1 text-xs sm:text-sm lg:text-base truncate">{report.title}</h3>
                      <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm mb-1 sm:mb-2 line-clamp-2">{report.description}</p>
                      <div className="flex items-center space-x-1 sm:space-x-2 lg:space-x-3 text-xs text-slate-500 dark:text-slate-400">
                        <span>{report.createdAt}</span>
                        <span className={`px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full font-medium text-xs ${
                          report.status === 'completed' 
                            ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' 
                            : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
                        }`}>
                          {report.status}
                        </span>
                      </div>
                    </div>
                    <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-slate-400 ml-2" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Calendar Card */}
          <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-xl sm:rounded-2xl lg:rounded-3xl shadow-xl border border-white/20 dark:border-slate-700/20 p-3 sm:p-4 lg:p-8">
            <div className="flex flex-col space-y-2 sm:space-y-3 lg:space-y-0 lg:flex-row lg:items-center justify-between mb-3 sm:mb-4 lg:mb-6">
              <div className="flex items-center space-x-2 sm:space-x-3">
                <div className="bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg sm:rounded-xl lg:rounded-2xl p-1.5 sm:p-2 lg:p-3 shadow-lg">
                  <CalendarDays className="w-3 h-3 sm:w-4 sm:h-4 lg:w-6 lg:h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-sm sm:text-lg lg:text-2xl font-bold text-slate-800 dark:text-white">Smart Calendar</h2>
                  <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm lg:text-base">Schedule and manage activities</p>
                </div>
              </div>
              <div className="flex items-center space-x-1 sm:space-x-2 lg:space-x-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onNavigate('calendar')}
                  className="flex items-center px-2 sm:px-3 lg:px-4 py-1.5 sm:py-2 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg sm:rounded-xl hover:bg-slate-300 dark:hover:bg-slate-600 transition-all duration-300 font-medium text-xs sm:text-sm"
                >
                  <ExternalLink className="w-2.5 h-2.5 sm:w-3 sm:h-3 lg:w-4 lg:h-4 mr-1 sm:mr-2" />
                  View All
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowCalendarModal(true)}
                  className="flex items-center px-2 sm:px-3 lg:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg sm:rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 font-semibold text-xs sm:text-sm"
                >
                  <Plus className="w-2.5 h-2.5 sm:w-3 sm:h-3 lg:w-4 lg:h-4 mr-1 sm:mr-2" />
                  New Event
                </motion.button>
              </div>
            </div>
            
            <div className="space-y-1.5 sm:space-y-2 lg:space-y-3">
              {events.slice(0, 4).map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, x: 4 }}
                  onClick={() => onNavigate('calendar')}
                  className={`bg-gradient-to-r ${event.color} rounded-lg sm:rounded-xl lg:rounded-2xl p-2 sm:p-3 lg:p-4 text-white shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold mb-1 text-xs sm:text-sm lg:text-base truncate">{event.title}</h3>
                      <div className="flex flex-wrap items-center gap-1 sm:gap-2 text-white/90 text-xs sm:text-sm">
                        <span>{event.date}</span>
                        <span>{event.time}</span>
                        <span className="px-1.5 sm:px-2 py-0.5 sm:py-1 bg-white/20 rounded-full text-xs font-medium capitalize">
                          {event.type}
                        </span>
                      </div>
                    </div>
                    <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-white/80 ml-2" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Recent Activity & Goals */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-3 sm:space-y-4 lg:space-y-6"
        >
          {/* Recent Activity */}
          <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-xl sm:rounded-2xl lg:rounded-3xl shadow-xl border border-white/20 dark:border-slate-700/20 p-3 sm:p-4 lg:p-6">
            <div className="flex items-center justify-between mb-3 sm:mb-4 lg:mb-6">
              <h2 className="text-sm sm:text-lg lg:text-xl font-bold text-slate-800 dark:text-white">Recent Activity</h2>
              <Clock className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-slate-500 dark:text-slate-400" />
            </div>
            
            <div className="space-y-2 sm:space-y-3 lg:space-y-4">
              {recentActivity.map((activity, index) => {
                const Icon = activity.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index }}
                    whileHover={{ scale: 1.02, x: 8 }}
                    className="group flex items-center p-2 sm:p-3 lg:p-4 bg-gradient-to-r from-white/50 to-white/30 dark:from-slate-700/50 dark:to-slate-700/30 rounded-lg sm:rounded-xl lg:rounded-2xl border border-white/20 dark:border-slate-600/20 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="w-6 h-6 sm:w-8 sm:h-8 lg:w-12 lg:h-12 bg-gradient-to-r from-violet-400 to-purple-500 rounded-lg sm:rounded-xl lg:rounded-2xl flex items-center justify-center mr-2 sm:mr-3 lg:mr-4 group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-slate-800 dark:text-white text-xs sm:text-sm lg:text-base truncate">{activity.action}</p>
                      <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">{activity.time}</p>
                    </div>
                    <span className={`px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-xs font-medium ${activity.color} hidden sm:inline`}>
                      {activity.type}
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Daily Goals */}
          <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-xl sm:rounded-2xl lg:rounded-3xl shadow-xl border border-white/20 dark:border-slate-700/20 p-3 sm:p-4 lg:p-6">
            <div className="flex items-center justify-between mb-3 sm:mb-4 lg:mb-6">
              <h2 className="text-sm sm:text-lg lg:text-xl font-bold text-slate-800 dark:text-white">Daily Goals</h2>
              <Target className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-green-500" />
            </div>
            
            <div className="space-y-2 sm:space-y-3 lg:space-y-4">
              {[
                { task: 'Complete 3 reports', progress: 66, color: 'from-blue-400 to-cyan-500' },
                { task: 'Take 10 photos', progress: 80, color: 'from-purple-400 to-pink-500' },
                { task: 'Schedule 2 meetings', progress: 50, color: 'from-green-400 to-emerald-500' },
              ].map((goal, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="space-y-1 sm:space-y-2"
                >
                  <div className="flex justify-between items-center">
                    <span className="text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 truncate pr-2">{goal.task}</span>
                    <span className="text-xs sm:text-sm font-bold text-slate-800 dark:text-white">{goal.progress}%</span>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-1.5 sm:h-2 lg:h-3 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${goal.progress}%` }}
                      transition={{ duration: 1, delay: 0.5 + index * 0.2 }}
                      className={`h-1.5 sm:h-2 lg:h-3 rounded-full bg-gradient-to-r ${goal.color}`}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Modals */}
      {/* Notes Modal */}
      <AnimatePresence>
        {showNotesModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-3 sm:p-4"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-xl sm:rounded-2xl lg:rounded-3xl shadow-2xl max-w-md w-full border border-white/20 dark:border-slate-700/20"
            >
              <div className="p-4 sm:p-6 lg:p-8">
                <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-slate-800 dark:text-white mb-3 sm:mb-4 lg:mb-6">Create New Note</h2>
                
                <div className="space-y-2 sm:space-y-3 lg:space-y-4">
                  <input
                    type="text"
                    placeholder="Note title"
                    value={newNote.title}
                    onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-white/70 dark:bg-slate-700/60 border border-white/20 dark:border-slate-600 rounded-lg sm:rounded-xl lg:rounded-2xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300 text-slate-800 dark:text-white text-sm sm:text-base"
                  />
                  
                  <textarea
                    placeholder="Write your note here..."
                    value={newNote.content}
                    onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
                    rows={4}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-white/70 dark:bg-slate-700/60 border border-white/20 dark:border-slate-600 rounded-lg sm:rounded-xl lg:rounded-2xl focus:ring-2 focus:ring-amber-500 focus:border-transparent resize-none transition-all duration-300 text-slate-800 dark:text-white text-sm sm:text-base"
                  />
                </div>
                
                <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-3 mt-4 sm:mt-6 lg:mt-8">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowNotesModal(false)}
                    className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 text-slate-700 dark:text-slate-300 bg-slate-200 dark:bg-slate-700 rounded-lg sm:rounded-xl lg:rounded-2xl hover:bg-slate-300 dark:hover:bg-slate-600 transition-all duration-200 font-medium text-sm sm:text-base"
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleCreateNote}
                    className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-lg sm:rounded-xl lg:rounded-2xl hover:from-amber-600 hover:to-orange-600 transition-all duration-200 font-medium shadow-lg text-sm sm:text-base"
                  >
                    Create Note
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Reports Modal */}
      <AnimatePresence>
        {showReportsModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-3 sm:p-4"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-xl sm:rounded-2xl lg:rounded-3xl shadow-2xl max-w-md w-full border border-white/20 dark:border-slate-700/20"
            >
              <div className="p-4 sm:p-6 lg:p-8">
                <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-slate-800 dark:text-white mb-3 sm:mb-4 lg:mb-6">Create New Report</h2>
                
                <div className="space-y-2 sm:space-y-3 lg:space-y-4">
                  <input
                    type="text"
                    placeholder="Report title"
                    value={newReport.title}
                    onChange={(e) => setNewReport({ ...newReport, title: e.target.value })}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-white/70 dark:bg-slate-700/60 border border-white/20 dark:border-slate-600 rounded-lg sm:rounded-xl lg:rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300 text-slate-800 dark:text-white text-sm sm:text-base"
                  />
                  
                  <textarea
                    placeholder="Report description"
                    value={newReport.description}
                    onChange={(e) => setNewReport({ ...newReport, description: e.target.value })}
                    rows={3}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-white/70 dark:bg-slate-700/60 border border-white/20 dark:border-slate-600 rounded-lg sm:rounded-xl lg:rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none transition-all duration-300 text-slate-800 dark:text-white text-sm sm:text-base"
                  />
                  
                  <select
                    value={newReport.type}
                    onChange={(e) => setNewReport({ ...newReport, type: e.target.value as 'text' | 'photo' | 'mixed' })}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-white/70 dark:bg-slate-700/60 border border-white/20 dark:border-slate-600 rounded-lg sm:rounded-xl lg:rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300 text-slate-800 dark:text-white text-sm sm:text-base"
                  >
                    <option value="text">Text Only</option>
                    <option value="photo">Photo Only</option>
                    <option value="mixed">Text + Photos</option>
                  </select>
                </div>
                
                <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-3 mt-4 sm:mt-6 lg:mt-8">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowReportsModal(false)}
                    className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 text-slate-700 dark:text-slate-300 bg-slate-200 dark:bg-slate-700 rounded-lg sm:rounded-xl lg:rounded-2xl hover:bg-slate-300 dark:hover:bg-slate-600 transition-all duration-200 font-medium text-sm sm:text-base"
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleCreateReport}
                    className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-emerald-500 to-green-500 text-white rounded-lg sm:rounded-xl lg:rounded-2xl hover:from-emerald-600 hover:to-green-600 transition-all duration-200 font-medium shadow-lg text-sm sm:text-base"
                  >
                    Create Report
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Calendar Modal */}
      <AnimatePresence>
        {showCalendarModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-3 sm:p-4"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-xl sm:rounded-2xl lg:rounded-3xl shadow-2xl max-w-md w-full border border-white/20 dark:border-slate-700/20"
            >
              <div className="p-4 sm:p-6 lg:p-8">
                <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-slate-800 dark:text-white mb-3 sm:mb-4 lg:mb-6">Create New Event</h2>
                
                <div className="space-y-2 sm:space-y-3 lg:space-y-4">
                  <input
                    type="text"
                    placeholder="Event title"
                    value={newEvent.title}
                    onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-white/70 dark:bg-slate-700/60 border border-white/20 dark:border-slate-600 rounded-lg sm:rounded-xl lg:rounded-2xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-300 text-slate-800 dark:text-white text-sm sm:text-base"
                  />
                  
                  <div className="grid grid-cols-2 gap-2 sm:gap-3">
                    <input
                      type="date"
                      value={newEvent.date}
                      onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                      className="px-3 sm:px-4 py-2 sm:py-3 bg-white/70 dark:bg-slate-700/60 border border-white/20 dark:border-slate-600 rounded-lg sm:rounded-xl lg:rounded-2xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-300 text-slate-800 dark:text-white text-sm sm:text-base"
                    />
                    <input
                      type="time"
                      value={newEvent.time}
                      onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
                      className="px-3 sm:px-4 py-2 sm:py-3 bg-white/70 dark:bg-slate-700/60 border border-white/20 dark:border-slate-600 rounded-lg sm:rounded-xl lg:rounded-2xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-300 text-slate-800 dark:text-white text-sm sm:text-base"
                    />
                  </div>
                  
                  <select
                    value={newEvent.type}
                    onChange={(e) => setNewEvent({ ...newEvent, type: e.target.value as 'meeting' | 'task' | 'reminder' })}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-white/70 dark:bg-slate-700/60 border border-white/20 dark:border-slate-600 rounded-lg sm:rounded-xl lg:rounded-2xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-300 text-slate-800 dark:text-white text-sm sm:text-base"
                  >
                    <option value="meeting">Meeting</option>
                    <option value="task">Task</option>
                    <option value="reminder">Reminder</option>
                  </select>
                </div>
                
                <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-3 mt-4 sm:mt-6 lg:mt-8">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowCalendarModal(false)}
                    className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 text-slate-700 dark:text-slate-300 bg-slate-200 dark:bg-slate-700 rounded-lg sm:rounded-xl lg:rounded-2xl hover:bg-slate-300 dark:hover:bg-slate-600 transition-all duration-200 font-medium text-sm sm:text-base"
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleCreateEvent}
                    className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg sm:rounded-xl lg:rounded-2xl hover:from-cyan-600 hover:to-blue-600 transition-all duration-200 font-medium shadow-lg text-sm sm:text-base"
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

export default Dashboard;