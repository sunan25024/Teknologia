import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit, Camera, FileText, Calendar, MessageSquare, X, Table } from 'lucide-react';
import { ViewType } from '../App';

interface FloatingActionButtonProps {
  currentView: ViewType;
  isDarkMode: boolean;
}

const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({ 
  currentView, 
  isDarkMode 
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const getQuickActions = () => {
    const actions = {
      dashboard: [
        { icon: Edit, label: 'Quick Note', color: 'from-amber-500 to-orange-500' },
        { icon: FileText, label: 'New Report', color: 'from-emerald-500 to-green-500' },
        { icon: Calendar, label: 'Schedule Event', color: 'from-cyan-500 to-blue-500' },
      ],
      camera: [
        { icon: Camera, label: 'Take Photo', color: 'from-purple-500 to-pink-500' },
      ],
      spreadsheet: [
        { icon: Plus, label: 'Add Row', color: 'from-indigo-500 to-blue-500' },
        { icon: Table, label: 'New Sheet', color: 'from-green-500 to-emerald-500' },
      ],
      whatsapp: [
        { icon: MessageSquare, label: 'New Chat', color: 'from-green-500 to-emerald-500' },
      ],
      settings: []
    };
    return actions[currentView] || [];
  };

  const quickActions = getQuickActions();

  if (quickActions.length === 0) return null;

  return (
    <div className="fixed bottom-20 sm:bottom-24 lg:bottom-28 right-3 sm:right-4 lg:right-6 z-40">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute bottom-14 sm:bottom-16 lg:bottom-20 right-0 space-y-2 sm:space-y-3"
          >
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <motion.button
                  key={index}
                  initial={{ opacity: 0, x: 20, scale: 0.8 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: 20, scale: 0.8 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.1, x: -5 }}
                  whileTap={{ scale: 0.95 }}
                  className={`flex items-center space-x-2 sm:space-x-3 px-3 sm:px-4 py-2 sm:py-3 bg-gradient-to-r ${action.color} text-white rounded-xl sm:rounded-2xl shadow-lg backdrop-blur-xl min-h-[44px]`}
                >
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="text-xs sm:text-sm font-medium whitespace-nowrap hidden xs:block">{action.label}</span>
                </motion.button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main FAB */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl shadow-2xl backdrop-blur-xl border transition-all duration-300 min-h-[44px] min-w-[44px] flex items-center justify-center ${
          isDarkMode 
            ? 'bg-slate-800/80 border-slate-700/50 text-white' 
            : 'bg-white/80 border-white/50 text-slate-800'
        }`}
      >
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {isOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Plus className="w-5 h-5 sm:w-6 sm:h-6" />}
        </motion.div>
      </motion.button>
    </div>
  );
};

export default FloatingActionButton;