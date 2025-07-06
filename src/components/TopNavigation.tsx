import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Bell, User, Moon, Sun, Zap, Menu, X } from 'lucide-react';
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
  const [showMobileSearch, setShowMobileSearch] = useState(false);

  const getViewTitle = (view: ViewType) => {
    const titles = {
      dashboard: 'Dashboard',
      notes: 'Smart Notes',
      reports: 'Dynamic Reports',
      calendar: 'Smart Calendar',
      camera: 'Camera',
      spreadsheet: 'Data Management',
      whatsapp: 'WhatsApp',
      settings: 'Settings'
    };
    return titles[view];
  };

  return (
    <motion.header 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`sticky top-0 z-50 px-2 sm:px-4 py-2 sm:py-3 backdrop-blur-2xl border-b safe-area-pt ${
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
          className="flex items-center space-x-2 cursor-pointer flex-shrink-0 min-h-[44px]"
        >
          <div className="relative">
            <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-gradient-to-r from-violet-500 via-purple-500 to-pink-500 rounded-lg sm:rounded-xl lg:rounded-2xl flex items-center justify-center shadow-lg">
              <Zap className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white" />
            </div>
            <div className="absolute -top-0.5 -right-0.5 sm:-top-1 sm:-right-1 w-2 h-2 sm:w-3 sm:h-3 lg:w-4 lg:h-4 bg-gradient-to-r from-orange-400 to-red-400 rounded-full animate-pulse"></div>
          </div>
          <div className="hidden xs:block">
            <h1 className={`text-sm sm:text-lg lg:text-xl font-bold ${
              isDarkMode ? 'text-white' : 'text-slate-800'
            }`}>
              ProductiveHub
            </h1>
            <p className={`text-xs sm:text-sm ${
              isDarkMode ? 'text-slate-400' : 'text-slate-500'
            }`}>
              {getViewTitle(currentView)}
            </p>
          </div>
        </motion.div>

        {/* Desktop Search Bar */}
        <motion.div 
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: 'auto', opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="hidden lg:flex flex-1 max-w-md mx-4 xl:mx-8"
        >
          <div className="relative w-full">
            <Search className={`absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 ${
              isDarkMode ? 'text-slate-400' : 'text-slate-500'
            }`} />
            <input
              type="text"
              placeholder="Search anything..."
              className={`w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-2 sm:py-3 rounded-xl sm:rounded-2xl border transition-all duration-300 focus:ring-2 focus:ring-violet-500 focus:border-transparent text-sm sm:text-base ${
                isDarkMode 
                  ? 'bg-slate-800/60 border-slate-700 text-white placeholder-slate-400' 
                  : 'bg-white/60 border-white/50 text-slate-800 placeholder-slate-500'
              }`}
            />
          </div>
        </motion.div>

        {/* Mobile Search Overlay */}
        <AnimatePresence>
          {showMobileSearch && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-start justify-center pt-16 sm:pt-20 px-4 lg:hidden"
            >
              <motion.div
                initial={{ y: -20 }}
                animate={{ y: 0 }}
                exit={{ y: -20 }}
                className={`w-full max-w-md rounded-xl sm:rounded-2xl border shadow-2xl ${
                  isDarkMode 
                    ? 'bg-slate-800/90 border-slate-700' 
                    : 'bg-white/90 border-white/50'
                }`}
              >
                <div className="p-3 sm:p-4">
                  <div className="relative">
                    <Search className={`absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 ${
                      isDarkMode ? 'text-slate-400' : 'text-slate-500'
                    }`} />
                    <input
                      type="text"
                      placeholder="Search anything..."
                      autoFocus
                      className={`w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-2 sm:py-3 rounded-lg sm:rounded-xl border transition-all duration-300 focus:ring-2 focus:ring-violet-500 focus:border-transparent text-sm sm:text-base ${
                        isDarkMode 
                          ? 'bg-slate-700/60 border-slate-600 text-white placeholder-slate-400' 
                          : 'bg-white/80 border-white/50 text-slate-800 placeholder-slate-500'
                      }`}
                    />
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowMobileSearch(false)}
                    className="w-full mt-2 sm:mt-3 px-3 sm:px-4 py-2 bg-gradient-to-r from-violet-500 to-purple-600 text-white rounded-lg sm:rounded-xl font-medium text-sm sm:text-base min-h-[44px]"
                  >
                    Close
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Action Buttons */}
        <motion.div 
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex items-center space-x-1 sm:space-x-2"
        >
          {/* Mobile Search Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setShowMobileSearch(true)}
            className={`lg:hidden p-2 sm:p-3 rounded-lg sm:rounded-xl transition-all duration-300 min-h-[44px] min-w-[44px] flex items-center justify-center ${
              isDarkMode 
                ? 'bg-slate-800/60 text-slate-300 hover:bg-slate-700/60' 
                : 'bg-white/60 text-slate-600 hover:bg-white/80'
            }`}
          >
            <Search className="w-4 h-4 sm:w-5 sm:h-5" />
          </motion.button>

          {/* Theme Toggle */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`p-2 sm:p-3 rounded-lg sm:rounded-xl transition-all duration-300 min-h-[44px] min-w-[44px] flex items-center justify-center ${
              isDarkMode 
                ? 'bg-slate-800/60 text-yellow-400 hover:bg-slate-700/60' 
                : 'bg-white/60 text-slate-600 hover:bg-white/80'
            }`}
          >
            {isDarkMode ? <Sun className="w-4 h-4 sm:w-5 sm:h-5" /> : <Moon className="w-4 h-4 sm:w-5 sm:h-5" />}
          </motion.button>

          {/* Notifications */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className={`relative p-2 sm:p-3 rounded-lg sm:rounded-xl transition-all duration-300 min-h-[44px] min-w-[44px] flex items-center justify-center ${
              isDarkMode 
                ? 'bg-slate-800/60 text-slate-300 hover:bg-slate-700/60' 
                : 'bg-white/60 text-slate-600 hover:bg-white/80'
            }`}
          >
            <Bell className="w-4 h-4 sm:w-5 sm:h-5" />
            <div className="absolute -top-0.5 -right-0.5 sm:-top-1 sm:-right-1 w-2 h-2 sm:w-3 sm:h-3 bg-red-500 rounded-full animate-pulse"></div>
          </motion.button>

          {/* Profile */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setCurrentView('settings')}
            className={`p-2 sm:p-3 rounded-lg sm:rounded-xl transition-all duration-300 min-h-[44px] min-w-[44px] flex items-center justify-center ${
              isDarkMode 
                ? 'bg-slate-800/60 text-slate-300 hover:bg-slate-700/60' 
                : 'bg-white/60 text-slate-600 hover:bg-white/80'
            }`}
          >
            <User className="w-4 h-4 sm:w-5 sm:h-5" />
          </motion.button>
        </motion.div>
      </div>
    </motion.header>
  );
};

export default TopNavigation;