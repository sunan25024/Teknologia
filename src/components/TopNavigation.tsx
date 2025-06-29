import React from 'react';
import { motion } from 'framer-motion';
import { Search, Bell, User, Moon, Sun, Zap } from 'lucide-react';
import { ViewType } from '../App';

interface TopNavigationProps {
  currentView: ViewType;
  setCurrentView: (view: ViewType) => void;
  isDarkMode: boolean;
  setIsDarkMode: (dark: boolean) => void;
}

const TopNavigation: React.FC<TopNavigationProps> = ({ 
  currentView, 
  setCurrentView, 
  isDarkMode, 
  setIsDarkMode 
}) => {
  const getViewTitle = (view: ViewType) => {
    const titles = {
      dashboard: 'Dashboard',
      notes: 'Smart Notes',
      reports: 'Dynamic Reports',
      calendar: 'Smart Calendar',
      camera: 'Camera',
      spreadsheet: 'Data Management',
      whatsapp: 'WhatsApp',
      settings: 'Pengaturan'
    };
    return titles[view];
  };

  return (
    <motion.header 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`sticky top-0 z-50 px-4 py-4 backdrop-blur-2xl border-b ${
        isDarkMode 
          ? 'bg-slate-900/60 border-slate-700/50' 
          : 'bg-white/60 border-white/50'
      }`}
    >
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Logo & Brand */}
        <motion.div 
          whileHover={{ scale: 1.05 }}
          onClick={() => setCurrentView('dashboard')}
          className="flex items-center space-x-3 cursor-pointer"
        >
          <div className="relative">
            <div className="w-12 h-12 bg-gradient-to-r from-violet-500 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-orange-400 to-red-400 rounded-full animate-pulse"></div>
          </div>
          <div>
            <h1 className={`text-xl font-bold ${
              isDarkMode ? 'text-white' : 'text-slate-800'
            }`}>
              ProductiveHub
            </h1>
            <p className={`text-xs ${
              isDarkMode ? 'text-slate-400' : 'text-slate-500'
            }`}>
              {getViewTitle(currentView)}
            </p>
          </div>
        </motion.div>

        {/* Search Bar */}
        <motion.div 
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: 'auto', opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="hidden md:flex flex-1 max-w-md mx-8"
        >
          <div className="relative w-full">
            <Search className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
              isDarkMode ? 'text-slate-400' : 'text-slate-500'
            }`} />
            <input
              type="text"
              placeholder="Search anything..."
              className={`w-full pl-12 pr-4 py-3 rounded-2xl border transition-all duration-300 focus:ring-2 focus:ring-violet-500 focus:border-transparent ${
                isDarkMode 
                  ? 'bg-slate-800/60 border-slate-700 text-white placeholder-slate-400' 
                  : 'bg-white/60 border-white/50 text-slate-800 placeholder-slate-500'
              }`}
            />
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div 
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex items-center space-x-3"
        >
          {/* Theme Toggle */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`p-3 rounded-2xl transition-all duration-300 ${
              isDarkMode 
                ? 'bg-slate-800/60 text-yellow-400 hover:bg-slate-700/60' 
                : 'bg-white/60 text-slate-600 hover:bg-white/80'
            }`}
          >
            {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </motion.button>

          {/* Notifications */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className={`relative p-3 rounded-2xl transition-all duration-300 ${
              isDarkMode 
                ? 'bg-slate-800/60 text-slate-300 hover:bg-slate-700/60' 
                : 'bg-white/60 text-slate-600 hover:bg-white/80'
            }`}
          >
            <Bell className="w-5 h-5" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
          </motion.button>

          {/* Profile */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setCurrentView('settings')}
            className={`p-3 rounded-2xl transition-all duration-300 ${
              isDarkMode 
                ? 'bg-slate-800/60 text-slate-300 hover:bg-slate-700/60' 
                : 'bg-white/60 text-slate-600 hover:bg-white/80'
            }`}
          >
            <User className="w-5 h-5" />
          </motion.button>
        </motion.div>
      </div>
    </motion.header>
  );
};

export default TopNavigation;