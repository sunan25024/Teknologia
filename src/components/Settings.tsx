import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings as SettingsIcon, User, Bell, Shield, Database, Download, Upload, Smartphone, Monitor, Palette, Globe, Moon, Sun } from 'lucide-react';

interface SettingsProps {
  isDarkMode: boolean;
  setIsDarkMode: (dark: boolean) => void;
}

const Settings: React.FC<SettingsProps> = ({ isDarkMode, setIsDarkMode }) => {
  const [activeTab, setActiveTab] = useState('profile');
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
    reports: true,
    calendar: true
  });

  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    company: 'ProductiveHub Inc.'
  });

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User, color: 'from-blue-500 to-cyan-500' },
    { id: 'notifications', label: 'Notifications', icon: Bell, color: 'from-yellow-500 to-orange-500' },
    { id: 'security', label: 'Security', icon: Shield, color: 'from-green-500 to-emerald-500' },
    { id: 'appearance', label: 'Appearance', icon: Palette, color: 'from-purple-500 to-pink-500' },
    { id: 'data', label: 'Data & Storage', icon: Database, color: 'from-indigo-500 to-blue-500' },
    { id: 'devices', label: 'Devices', icon: Smartphone, color: 'from-red-500 to-rose-500' }
  ];

  const handleNotificationChange = (key: string) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key as keyof typeof prev]
    }));
  };

  const exportData = () => {
    const data = {
      profile,
      settings: notifications,
      exportDate: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'productivehub_data.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <h3 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>Profile Information</h3>
            
            <div className="flex items-center space-x-8">
              <div className="w-24 h-24 bg-gradient-to-r from-violet-400 to-purple-500 rounded-3xl flex items-center justify-center shadow-xl">
                <User className="w-12 h-12 text-white" />
              </div>
              <div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-2xl hover:shadow-lg transition-all duration-300 font-semibold"
                >
                  Change Photo
                </motion.button>
                <p className={`text-sm mt-2 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>JPG, PNG max 2MB</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.entries(profile).map(([key, value]) => (
                <div key={key}>
                  <label className={`block text-sm font-semibold mb-3 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </label>
                  <input
                    type={key === 'email' ? 'email' : key === 'phone' ? 'tel' : 'text'}
                    value={value}
                    onChange={(e) => setProfile({ ...profile, [key]: e.target.value })}
                    className={`w-full px-4 py-3 rounded-2xl border transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-lg ${
                      isDarkMode 
                        ? 'bg-slate-800/60 border-slate-700 text-white' 
                        : 'bg-white/70 border-white/20 text-slate-800'
                    }`}
                  />
                </div>
              ))}
            </div>

            <div className="flex justify-end">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-2xl hover:shadow-lg transition-all duration-300 font-semibold"
              >
                Save Changes
              </motion.button>
            </div>
          </motion.div>
        );

      case 'appearance':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <h3 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>Appearance Settings</h3>
            
            <div className="space-y-6">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className={`p-6 rounded-3xl border shadow-lg hover:shadow-xl transition-all duration-300 ${
                  isDarkMode 
                    ? 'bg-slate-800/60 border-slate-700/50' 
                    : 'bg-white/60 border-white/50'
                }`}
              >
                <h4 className={`font-bold mb-4 text-lg ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>Theme</h4>
                <div className="flex items-center justify-between">
                  <div>
                    <p className={`font-medium ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                      {isDarkMode ? 'Dark Mode' : 'Light Mode'}
                    </p>
                    <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                      Switch between light and dark themes
                    </p>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsDarkMode(!isDarkMode)}
                    className={`p-4 rounded-2xl transition-all duration-300 ${
                      isDarkMode 
                        ? 'bg-yellow-500 text-yellow-900' 
                        : 'bg-slate-800 text-white'
                    }`}
                  >
                    {isDarkMode ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
                  </motion.button>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                className={`p-6 rounded-3xl border shadow-lg hover:shadow-xl transition-all duration-300 ${
                  isDarkMode 
                    ? 'bg-slate-800/60 border-slate-700/50' 
                    : 'bg-white/60 border-white/50'
                }`}
              >
                <h4 className={`font-bold mb-4 text-lg ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>Color Scheme</h4>
                <p className={`text-sm mb-4 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>Customize your app colors</p>
                <div className="flex space-x-3">
                  {[
                    'from-blue-400 to-cyan-500', 
                    'from-purple-400 to-pink-500', 
                    'from-green-400 to-emerald-500', 
                    'from-yellow-400 to-orange-500',
                    'from-red-400 to-rose-500',
                    'from-indigo-400 to-purple-500'
                  ].map((color, index) => (
                    <motion.div 
                      key={index} 
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                      className={`w-12 h-12 bg-gradient-to-r ${color} rounded-2xl cursor-pointer border-2 border-white shadow-lg transition-transform duration-200`}
                    />
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        );

      // Add other cases for notifications, security, data, devices...
      default:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12"
          >
            <h3 className={`text-2xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
              {tabs.find(tab => tab.id === activeTab)?.label}
            </h3>
            <p className={isDarkMode ? 'text-slate-400' : 'text-slate-600'}>
              This section is coming soon!
            </p>
          </motion.div>
        );
    }
  };

  return (
    <div className="p-6 h-full overflow-y-auto">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-center mb-8"
      >
        <div>
          <h1 className={`text-4xl font-bold bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-2`}>
            Settings
          </h1>
          <p className={`text-lg ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>Manage your account and application preferences</p>
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className={`rounded-3xl shadow-2xl border overflow-hidden ${
          isDarkMode 
            ? 'bg-slate-800/40 border-slate-700/50' 
            : 'bg-white/80 border-white/50'
        }`}
      >
        <div className="flex flex-col lg:flex-row min-h-[600px]">
          {/* Settings Navigation */}
          <div className={`lg:w-1/4 border-r ${
            isDarkMode ? 'border-slate-700/50 bg-slate-900/60' : 'border-white/20 bg-gradient-to-br from-slate-50/80 to-white/60'
          }`}>
            <nav className="p-6 space-y-2">
              {tabs.map((tab, index) => {
                const Icon = tab.icon;
                return (
                  <motion.button
                    key={tab.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02, x: 4 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center px-4 py-4 text-sm font-semibold rounded-2xl transition-all duration-300 ${
                      activeTab === tab.id
                        ? 'text-white shadow-lg transform scale-105'
                        : isDarkMode 
                          ? 'text-slate-300 hover:bg-slate-800/60' 
                          : 'text-slate-700 hover:bg-white/60'
                    }`}
                  >
                    {activeTab === tab.id && (
                      <motion.div
                        layoutId="activeTabBackground"
                        className={`absolute inset-0 bg-gradient-to-r ${tab.color} rounded-2xl`}
                        initial={false}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                    
                    <div className={`
                      relative z-10 p-2 rounded-xl mr-3 transition-all duration-300
                      ${activeTab === tab.id 
                        ? 'bg-white/20 text-white' 
                        : `bg-gradient-to-r ${tab.color} text-white`
                      }
                    `}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="relative z-10">{tab.label}</span>
                  </motion.button>
                );
              })}
            </nav>
          </div>

          {/* Settings Content */}
          <div className="flex-1 p-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {renderTabContent()}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Settings;