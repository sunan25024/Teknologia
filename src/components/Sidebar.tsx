import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Home, 
  StickyNote, 
  FileText, 
  Camera, 
  Table, 
  Calendar as CalendarIcon, 
  MessageCircle, 
  Settings as SettingsIcon,
  X,
  Sparkles,
  Zap
} from 'lucide-react';
import { ViewType } from '../App';

interface SidebarProps {
  currentView: ViewType;
  setCurrentView: (view: ViewType) => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, setCurrentView, isOpen, setIsOpen }) => {
  const menuItems = [
    { id: 'dashboard' as ViewType, label: 'Dashboard', icon: Home, color: 'from-blue-500 to-cyan-500' },
    { id: 'notes' as ViewType, label: 'Notes', icon: StickyNote, color: 'from-yellow-500 to-orange-500' },
    { id: 'reports' as ViewType, label: 'Reports', icon: FileText, color: 'from-green-500 to-emerald-500' },
    { id: 'camera' as ViewType, label: 'Camera', icon: Camera, color: 'from-purple-500 to-pink-500' },
    { id: 'spreadsheet' as ViewType, label: 'Spreadsheet', icon: Table, color: 'from-indigo-500 to-blue-500' },
    { id: 'calendar' as ViewType, label: 'Calendar', icon: CalendarIcon, color: 'from-red-500 to-rose-500' },
    { id: 'whatsapp' as ViewType, label: 'WhatsApp', icon: MessageCircle, color: 'from-green-600 to-green-500' },
    { id: 'settings' as ViewType, label: 'Settings', icon: SettingsIcon, color: 'from-gray-500 to-slate-500' },
  ];

  const sidebarVariants = {
    open: {
      x: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    },
    closed: {
      x: "-100%",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.3
      }
    })
  };

  return (
    <>
      {/* Mobile overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>
      
      {/* Sidebar */}
      <motion.div 
        variants={sidebarVariants}
        animate={isOpen ? "open" : "closed"}
        className="fixed inset-y-0 left-0 z-50 w-72 lg:relative lg:translate-x-0 lg:z-0"
      >
        <div className="h-full bg-white/90 backdrop-blur-xl border-r border-white/20 shadow-2xl">
          {/* Header */}
          <div className="flex items-center justify-between h-20 px-6 border-b border-white/10">
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
              className="flex items-center space-x-3"
            >
              <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  ProductiveApp
                </h1>
                <p className="text-xs text-slate-500">All-in-One Solution</p>
              </div>
            </motion.div>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsOpen(false)}
              className="lg:hidden p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-all duration-200"
            >
              <X className="w-5 h-5" />
            </motion.button>
          </div>
          
          {/* Navigation */}
          <nav className="mt-8 px-4">
            <div className="space-y-2">
              {menuItems.map((item, index) => {
                const Icon = item.icon;
                const isActive = currentView === item.id;
                
                return (
                  <motion.button
                    key={item.id}
                    custom={index}
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    whileHover={{ scale: 1.02, x: 4 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      setCurrentView(item.id);
                      setIsOpen(false);
                    }}
                    className={`
                      w-full flex items-center px-4 py-3 text-sm font-medium rounded-2xl transition-all duration-300 group relative overflow-hidden
                      ${isActive 
                        ? 'text-white shadow-lg transform scale-105' 
                        : 'text-slate-700 hover:text-slate-900 hover:bg-white/60'
                      }
                    `}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeBackground"
                        className={`absolute inset-0 bg-gradient-to-r ${item.color} rounded-2xl`}
                        initial={false}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                    
                    <div className={`
                      relative z-10 p-2 rounded-xl mr-3 transition-all duration-300
                      ${isActive 
                        ? 'bg-white/20 text-white' 
                        : `bg-gradient-to-r ${item.color} text-white group-hover:scale-110`
                      }
                    `}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="relative z-10 font-semibold">{item.label}</span>
                    
                    {isActive && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute right-4 w-2 h-2 bg-white rounded-full"
                      />
                    )}
                  </motion.button>
                );
              })}
            </div>
          </nav>
          
          {/* Pro Features Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="absolute bottom-6 left-4 right-4"
          >
            <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-2xl p-4 text-white relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/50 to-purple-600/50 backdrop-blur-sm"></div>
              <div className="relative z-10">
                <div className="flex items-center mb-2">
                  <Zap className="w-5 h-5 mr-2" />
                  <p className="font-bold">Pro Features</p>
                </div>
                <p className="text-sm opacity-90 mb-3">Unlock advanced capabilities</p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full bg-white/20 backdrop-blur-sm text-white font-semibold py-2 px-4 rounded-xl hover:bg-white/30 transition-all duration-200"
                >
                  Upgrade Now
                </motion.button>
              </div>
              
              {/* Animated background elements */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-10 translate-x-10"></div>
              <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/10 rounded-full translate-y-8 -translate-x-8"></div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </>
  );
};

export default Sidebar;