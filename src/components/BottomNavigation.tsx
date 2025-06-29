import React from 'react';
import { motion } from 'framer-motion';
import { 
  Home, 
  Camera, 
  Table, 
  MessageCircle, 
  Settings as SettingsIcon 
} from 'lucide-react';
import { ViewType } from '../App';

interface BottomNavigationProps {
  currentView: ViewType;
  setCurrentView: (view: ViewType) => void;
  isDarkMode: boolean;
}

const BottomNavigation: React.FC<BottomNavigationProps> = ({ 
  currentView, 
  setCurrentView, 
  isDarkMode 
}) => {
  const menuItems = [
    { id: 'dashboard' as ViewType, icon: Home, label: 'Home' },
    { id: 'spreadsheet' as ViewType, icon: Table, label: 'Data' },
    { id: 'camera' as ViewType, icon: Camera, label: 'Camera', isCenter: true },
    { id: 'whatsapp' as ViewType, icon: MessageCircle, label: 'Chat' },
    { id: 'settings' as ViewType, icon: SettingsIcon, label: 'Pengaturan' },
  ];

  return (
    <motion.nav 
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed bottom-0 left-0 right-0 z-50 px-4 py-3 backdrop-blur-2xl border-t ${
        isDarkMode 
          ? 'bg-slate-900/80 border-slate-700/50' 
          : 'bg-white/80 border-white/50'
      }`}
    >
      <div className="max-w-md mx-auto">
        <div className="flex items-center justify-around py-2">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            const isCenter = item.isCenter;
            
            return (
              <motion.button
                key={item.id}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: index * 0.1, type: "spring", stiffness: 200 }}
                whileHover={{ scale: isCenter ? 1.1 : 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentView(item.id)}
                className={`relative flex flex-col items-center rounded-2xl transition-all duration-300 ${
                  isCenter 
                    ? 'p-4 transform -translate-y-2' 
                    : 'p-3'
                } ${
                  isActive 
                    ? 'transform -translate-y-1' 
                    : ''
                }`}
              >
                {/* Active Background */}
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className={`absolute inset-0 rounded-2xl shadow-lg ${
                      isCenter 
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500' 
                        : 'bg-gradient-to-r from-violet-500 to-purple-500'
                    }`}
                    initial={false}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                
                {/* Center Camera Special Styling */}
                {isCenter && !isActive && (
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl shadow-lg opacity-80" />
                )}
                
                {/* Icon */}
                <div className={`relative z-10 rounded-xl transition-all duration-300 ${
                  isCenter 
                    ? 'p-3' 
                    : 'p-2'
                } ${
                  isActive || isCenter
                    ? 'text-white' 
                    : isDarkMode 
                      ? 'text-slate-400 hover:text-white' 
                      : 'text-slate-600 hover:text-slate-800'
                }`}>
                  <Icon className={`${isCenter ? 'w-7 h-7' : 'w-5 h-5'}`} />
                </div>
                
                {/* Label */}
                <span className={`relative z-10 text-xs font-medium mt-1 transition-all duration-300 ${
                  isActive || isCenter
                    ? 'text-white' 
                    : isDarkMode 
                      ? 'text-slate-400' 
                      : 'text-slate-600'
                }`}>
                  {item.label}
                </span>

                {/* Active Indicator */}
                {isActive && !isCenter && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white rounded-full"
                  />
                )}

                {/* Center Camera Glow Effect */}
                {isCenter && (
                  <motion.div
                    animate={{ 
                      boxShadow: [
                        "0 0 20px rgba(168, 85, 247, 0.4)",
                        "0 0 40px rgba(168, 85, 247, 0.6)",
                        "0 0 20px rgba(168, 85, 247, 0.4)"
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute inset-0 rounded-2xl"
                  />
                )}
              </motion.button>
            );
          })}
        </div>
      </div>
    </motion.nav>
  );
};

export default BottomNavigation;