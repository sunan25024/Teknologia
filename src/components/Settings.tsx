import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Settings as SettingsIcon, 
  User, 
  Bell, 
  Shield, 
  Database, 
  Download, 
  Upload, 
  Smartphone, 
  Monitor, 
  Palette, 
  Globe, 
  Moon, 
  Sun,
  Lock,
  Key,
  Eye,
  EyeOff,
  Trash2,
  RefreshCw,
  Save,
  Camera,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Languages,
  Volume2,
  VolumeX,
  Wifi,
  WifiOff,
  HardDrive,
  Cloud,
  FileText,
  Image,
  Video,
  Music,
  Archive,
  AlertTriangle,
  CheckCircle,
  Info,
  X,
  Edit3,
  Plus
} from 'lucide-react';

interface SettingsProps {
  isDarkMode: boolean;
  setIsDarkMode: (dark: boolean) => void;
}

interface UserProfile {
  name: string;
  email: string;
  phone: string;
  company: string;
  location: string;
  bio: string;
  avatar: string;
}

interface NotificationSettings {
  email: boolean;
  push: boolean;
  sms: boolean;
  reports: boolean;
  calendar: boolean;
  reminders: boolean;
  marketing: boolean;
  security: boolean;
}

interface SecuritySettings {
  twoFactorAuth: boolean;
  biometric: boolean;
  sessionTimeout: number;
  loginAlerts: boolean;
  deviceTracking: boolean;
}

interface AppearanceSettings {
  theme: 'light' | 'dark' | 'auto';
  colorScheme: string;
  fontSize: 'small' | 'medium' | 'large';
  animations: boolean;
  compactMode: boolean;
}

interface PrivacySettings {
  analytics: boolean;
  crashReports: boolean;
  locationTracking: boolean;
  dataSharing: boolean;
  cookieConsent: boolean;
}

const Settings: React.FC<SettingsProps> = ({ isDarkMode, setIsDarkMode }) => {
  const [activeTab, setActiveTab] = useState('profile');
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');

  const [profile, setProfile] = useState<UserProfile>({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    company: 'ProductiveHub Inc.',
    location: 'San Francisco, CA',
    bio: 'Passionate about productivity and technology. Always looking for ways to optimize workflows and improve efficiency.',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150'
  });

  const [notifications, setNotifications] = useState<NotificationSettings>({
    email: true,
    push: true,
    sms: false,
    reports: true,
    calendar: true,
    reminders: true,
    marketing: false,
    security: true
  });

  const [security, setSecurity] = useState<SecuritySettings>({
    twoFactorAuth: false,
    biometric: true,
    sessionTimeout: 30,
    loginAlerts: true,
    deviceTracking: true
  });

  const [appearance, setAppearance] = useState<AppearanceSettings>({
    theme: isDarkMode ? 'dark' : 'light',
    colorScheme: 'violet',
    fontSize: 'medium',
    animations: true,
    compactMode: false
  });

  const [privacy, setPrivacy] = useState<PrivacySettings>({
    analytics: true,
    crashReports: true,
    locationTracking: false,
    dataSharing: false,
    cookieConsent: true
  });

  const [storageUsage] = useState({
    total: 15.6, // GB
    used: 8.3, // GB
    breakdown: {
      documents: 2.1,
      images: 3.8,
      videos: 1.9,
      cache: 0.5
    }
  });

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User, color: 'from-blue-500 to-cyan-500' },
    { id: 'notifications', label: 'Notifications', icon: Bell, color: 'from-yellow-500 to-orange-500' },
    { id: 'security', label: 'Security & Privacy', icon: Shield, color: 'from-green-500 to-emerald-500' },
    { id: 'appearance', label: 'Appearance', icon: Palette, color: 'from-purple-500 to-pink-500' },
    { id: 'storage', label: 'Storage & Data', icon: Database, color: 'from-indigo-500 to-blue-500' },
    { id: 'devices', label: 'Connected Devices', icon: Smartphone, color: 'from-red-500 to-rose-500' },
    { id: 'advanced', label: 'Advanced', icon: SettingsIcon, color: 'from-gray-500 to-slate-500' }
  ];

  const colorSchemes = [
    { id: 'violet', name: 'Violet', colors: 'from-violet-400 to-purple-500' },
    { id: 'blue', name: 'Blue', colors: 'from-blue-400 to-cyan-500' },
    { id: 'green', name: 'Green', colors: 'from-green-400 to-emerald-500' },
    { id: 'orange', name: 'Orange', colors: 'from-orange-400 to-red-500' },
    { id: 'pink', name: 'Pink', colors: 'from-pink-400 to-rose-500' },
    { id: 'indigo', name: 'Indigo', colors: 'from-indigo-400 to-blue-500' }
  ];

  // Auto-save functionality
  useEffect(() => {
    const timer = setTimeout(() => {
      if (saveStatus === 'saving') {
        setSaveStatus('saved');
        setTimeout(() => setSaveStatus('idle'), 2000);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [saveStatus]);

  const handleSave = async () => {
    setSaveStatus('saving');
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setSaveStatus('saved');
  };

  const handleNotificationChange = (key: keyof NotificationSettings) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
    setSaveStatus('saving');
  };

  const handleSecurityChange = (key: keyof SecuritySettings, value: any) => {
    setSecurity(prev => ({
      ...prev,
      [key]: value
    }));
    setSaveStatus('saving');
  };

  const handleAppearanceChange = (key: keyof AppearanceSettings, value: any) => {
    setAppearance(prev => ({
      ...prev,
      [key]: value
    }));
    
    if (key === 'theme') {
      if (value === 'dark') setIsDarkMode(true);
      else if (value === 'light') setIsDarkMode(false);
      else {
        // Auto mode - check system preference
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        setIsDarkMode(prefersDark);
      }
    }
    
    setSaveStatus('saving');
  };

  const handlePrivacyChange = (key: keyof PrivacySettings) => {
    setPrivacy(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
    setSaveStatus('saving');
  };

  const exportData = () => {
    const data = {
      profile,
      settings: {
        notifications,
        security,
        appearance,
        privacy
      },
      exportDate: new Date().toISOString(),
      version: '1.0.0'
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `productivehub_settings_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setShowExportModal(false);
  };

  const clearCache = async () => {
    setIsLoading(true);
    // Simulate cache clearing
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsLoading(false);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6 sm:space-y-8"
          >
            <h3 className={`text-xl sm:text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
              Profile Information
            </h3>
            
            {/* Avatar Section */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
              <div className="relative">
                <img
                  src={profile.avatar}
                  alt="Profile"
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl sm:rounded-3xl object-cover border-4 border-white shadow-xl"
                />
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="absolute -bottom-2 -right-2 p-2 bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-xl shadow-lg"
                >
                  <Camera className="w-4 h-4" />
                </motion.button>
              </div>
              <div className="flex-1">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-xl sm:rounded-2xl hover:shadow-lg transition-all duration-300 font-semibold text-sm sm:text-base"
                >
                  Change Photo
                </motion.button>
                <p className={`text-xs sm:text-sm mt-2 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                  JPG, PNG max 5MB. Recommended 400x400px
                </p>
              </div>
            </div>

            {/* Profile Form */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              {Object.entries(profile).filter(([key]) => key !== 'avatar').map(([key, value]) => (
                <div key={key}>
                  <label className={`block text-sm font-semibold mb-2 sm:mb-3 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                    <div className="flex items-center space-x-2">
                      {key === 'email' && <Mail className="w-4 h-4" />}
                      {key === 'phone' && <Phone className="w-4 h-4" />}
                      {key === 'location' && <MapPin className="w-4 h-4" />}
                      {key === 'company' && <User className="w-4 h-4" />}
                      {key === 'name' && <User className="w-4 h-4" />}
                      <span className="capitalize">{key === 'bio' ? 'Biography' : key}</span>
                    </div>
                  </label>
                  {key === 'bio' ? (
                    <textarea
                      value={value}
                      onChange={(e) => setProfile({ ...profile, [key]: e.target.value })}
                      rows={4}
                      className={`w-full px-3 sm:px-4 py-2 sm:py-3 rounded-xl sm:rounded-2xl border transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-lg resize-none text-sm sm:text-base ${
                        isDarkMode 
                          ? 'bg-slate-800/60 border-slate-700 text-white' 
                          : 'bg-white/70 border-white/20 text-slate-800'
                      }`}
                    />
                  ) : (
                    <input
                      type={key === 'email' ? 'email' : key === 'phone' ? 'tel' : 'text'}
                      value={value}
                      onChange={(e) => setProfile({ ...profile, [key]: e.target.value })}
                      className={`w-full px-3 sm:px-4 py-2 sm:py-3 rounded-xl sm:rounded-2xl border transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-lg text-sm sm:text-base ${
                        isDarkMode 
                          ? 'bg-slate-800/60 border-slate-700 text-white' 
                          : 'bg-white/70 border-white/20 text-slate-800'
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>

            {/* Save Button */}
            <div className="flex justify-end">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSave}
                disabled={saveStatus === 'saving'}
                className="flex items-center px-6 sm:px-8 py-2 sm:py-3 bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-xl sm:rounded-2xl hover:shadow-lg transition-all duration-300 font-semibold disabled:opacity-50 text-sm sm:text-base"
              >
                {saveStatus === 'saving' ? (
                  <>
                    <RefreshCw className="w-4 h-4 sm:w-5 sm:h-5 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : saveStatus === 'saved' ? (
                  <>
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                    Saved!
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                    Save Changes
                  </>
                )}
              </motion.button>
            </div>
          </motion.div>
        );

      case 'notifications':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6 sm:space-y-8"
          >
            <h3 className={`text-xl sm:text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
              Notification Preferences
            </h3>
            
            <div className="space-y-4 sm:space-y-6">
              {Object.entries(notifications).map(([key, value]) => (
                <motion.div
                  key={key}
                  whileHover={{ scale: 1.01 }}
                  className={`p-4 sm:p-6 rounded-2xl sm:rounded-3xl border shadow-lg hover:shadow-xl transition-all duration-300 ${
                    isDarkMode 
                      ? 'bg-slate-800/60 border-slate-700/50' 
                      : 'bg-white/60 border-white/50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3 sm:space-x-4">
                      <div className={`p-2 sm:p-3 rounded-xl sm:rounded-2xl ${
                        value ? 'bg-gradient-to-r from-green-500 to-emerald-600' : 'bg-slate-300 dark:bg-slate-600'
                      }`}>
                        {key === 'email' && <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-white" />}
                        {key === 'push' && <Bell className="w-4 h-4 sm:w-5 sm:h-5 text-white" />}
                        {key === 'sms' && <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-white" />}
                        {key === 'reports' && <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-white" />}
                        {key === 'calendar' && <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-white" />}
                        {key === 'reminders' && <Bell className="w-4 h-4 sm:w-5 sm:h-5 text-white" />}
                        {key === 'marketing' && <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-white" />}
                        {key === 'security' && <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-white" />}
                      </div>
                      <div>
                        <p className={`font-medium text-sm sm:text-base ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                          {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
                        </p>
                        <p className={`text-xs sm:text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                          {key === 'email' && 'Receive notifications via email'}
                          {key === 'push' && 'Browser push notifications'}
                          {key === 'sms' && 'SMS notifications for urgent items'}
                          {key === 'reports' && 'Report completion notifications'}
                          {key === 'calendar' && 'Calendar event reminders'}
                          {key === 'reminders' && 'Task and deadline reminders'}
                          {key === 'marketing' && 'Product updates and promotions'}
                          {key === 'security' && 'Security alerts and login notifications'}
                        </p>
                      </div>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleNotificationChange(key as keyof NotificationSettings)}
                      className={`relative w-12 h-6 sm:w-14 sm:h-7 rounded-full transition-all duration-300 ${
                        value ? 'bg-gradient-to-r from-green-500 to-emerald-600' : 'bg-slate-300 dark:bg-slate-600'
                      }`}
                    >
                      <motion.div
                        animate={{ x: value ? 24 : 2 }}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        className="absolute top-1 w-4 h-4 sm:w-5 sm:h-5 bg-white rounded-full shadow-lg"
                      />
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        );

      case 'security':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6 sm:space-y-8"
          >
            <h3 className={`text-xl sm:text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
              Security & Privacy
            </h3>
            
            {/* Security Settings */}
            <div className="space-y-4 sm:space-y-6">
              <h4 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
                Security Settings
              </h4>
              
              <motion.div
                whileHover={{ scale: 1.01 }}
                className={`p-4 sm:p-6 rounded-2xl sm:rounded-3xl border shadow-lg hover:shadow-xl transition-all duration-300 ${
                  isDarkMode 
                    ? 'bg-slate-800/60 border-slate-700/50' 
                    : 'bg-white/60 border-white/50'
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3 sm:space-x-4">
                    <div className="p-2 sm:p-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl sm:rounded-2xl">
                      <Key className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                    </div>
                    <div>
                      <p className={`font-medium text-sm sm:text-base ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                        Two-Factor Authentication
                      </p>
                      <p className={`text-xs sm:text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                        Add an extra layer of security to your account
                      </p>
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowPasswordModal(true)}
                    className="px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-lg sm:rounded-xl font-medium text-xs sm:text-sm"
                  >
                    {security.twoFactorAuth ? 'Disable' : 'Enable'}
                  </motion.button>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.01 }}
                className={`p-4 sm:p-6 rounded-2xl sm:rounded-3xl border shadow-lg hover:shadow-xl transition-all duration-300 ${
                  isDarkMode 
                    ? 'bg-slate-800/60 border-slate-700/50' 
                    : 'bg-white/60 border-white/50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3 sm:space-x-4">
                    <div className="p-2 sm:p-3 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl sm:rounded-2xl">
                      <Eye className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                    </div>
                    <div>
                      <p className={`font-medium text-sm sm:text-base ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                        Biometric Authentication
                      </p>
                      <p className={`text-xs sm:text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                        Use fingerprint or face recognition
                      </p>
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleSecurityChange('biometric', !security.biometric)}
                    className={`relative w-12 h-6 sm:w-14 sm:h-7 rounded-full transition-all duration-300 ${
                      security.biometric ? 'bg-gradient-to-r from-green-500 to-emerald-600' : 'bg-slate-300 dark:bg-slate-600'
                    }`}
                  >
                    <motion.div
                      animate={{ x: security.biometric ? 24 : 2 }}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      className="absolute top-1 w-4 h-4 sm:w-5 sm:h-5 bg-white rounded-full shadow-lg"
                    />
                  </motion.button>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.01 }}
                className={`p-4 sm:p-6 rounded-2xl sm:rounded-3xl border shadow-lg hover:shadow-xl transition-all duration-300 ${
                  isDarkMode 
                    ? 'bg-slate-800/60 border-slate-700/50' 
                    : 'bg-white/60 border-white/50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3 sm:space-x-4">
                    <div className="p-2 sm:p-3 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl sm:rounded-2xl">
                      <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                    </div>
                    <div>
                      <p className={`font-medium text-sm sm:text-base ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                        Session Timeout
                      </p>
                      <p className={`text-xs sm:text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                        Auto-logout after inactivity
                      </p>
                    </div>
                  </div>
                  <select
                    value={security.sessionTimeout}
                    onChange={(e) => handleSecurityChange('sessionTimeout', parseInt(e.target.value))}
                    className={`px-3 py-2 rounded-lg border text-sm ${
                      isDarkMode 
                        ? 'bg-slate-700 border-slate-600 text-white' 
                        : 'bg-white border-slate-300 text-slate-800'
                    }`}
                  >
                    <option value={15}>15 minutes</option>
                    <option value={30}>30 minutes</option>
                    <option value={60}>1 hour</option>
                    <option value={120}>2 hours</option>
                    <option value={0}>Never</option>
                  </select>
                </div>
              </motion.div>
            </div>

            {/* Privacy Settings */}
            <div className="space-y-4 sm:space-y-6">
              <h4 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
                Privacy Settings
              </h4>
              
              {Object.entries(privacy).map(([key, value]) => (
                <motion.div
                  key={key}
                  whileHover={{ scale: 1.01 }}
                  className={`p-4 sm:p-6 rounded-2xl sm:rounded-3xl border shadow-lg hover:shadow-xl transition-all duration-300 ${
                    isDarkMode 
                      ? 'bg-slate-800/60 border-slate-700/50' 
                      : 'bg-white/60 border-white/50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3 sm:space-x-4">
                      <div className={`p-2 sm:p-3 rounded-xl sm:rounded-2xl ${
                        value ? 'bg-gradient-to-r from-blue-500 to-cyan-600' : 'bg-slate-300 dark:bg-slate-600'
                      }`}>
                        {key === 'analytics' && <BarChart3 className="w-4 h-4 sm:w-5 sm:h-5 text-white" />}
                        {key === 'crashReports' && <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5 text-white" />}
                        {key === 'locationTracking' && <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-white" />}
                        {key === 'dataSharing' && <Globe className="w-4 h-4 sm:w-5 sm:h-5 text-white" />}
                        {key === 'cookieConsent' && <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-white" />}
                      </div>
                      <div>
                        <p className={`font-medium text-sm sm:text-base ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                          {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
                        </p>
                        <p className={`text-xs sm:text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                          {key === 'analytics' && 'Help improve the app with usage analytics'}
                          {key === 'crashReports' && 'Send crash reports to help fix bugs'}
                          {key === 'locationTracking' && 'Allow location-based features'}
                          {key === 'dataSharing' && 'Share anonymized data with partners'}
                          {key === 'cookieConsent' && 'Accept cookies for better experience'}
                        </p>
                      </div>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handlePrivacyChange(key as keyof PrivacySettings)}
                      className={`relative w-12 h-6 sm:w-14 sm:h-7 rounded-full transition-all duration-300 ${
                        value ? 'bg-gradient-to-r from-green-500 to-emerald-600' : 'bg-slate-300 dark:bg-slate-600'
                      }`}
                    >
                      <motion.div
                        animate={{ x: value ? 24 : 2 }}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        className="absolute top-1 w-4 h-4 sm:w-5 sm:h-5 bg-white rounded-full shadow-lg"
                      />
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        );

      case 'appearance':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6 sm:space-y-8"
          >
            <h3 className={`text-xl sm:text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
              Appearance Settings
            </h3>
            
            {/* Theme Selection */}
            <div className="space-y-4">
              <h4 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
                Theme
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                {['light', 'dark', 'auto'].map((theme) => (
                  <motion.button
                    key={theme}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleAppearanceChange('theme', theme)}
                    className={`p-4 sm:p-6 rounded-2xl border-2 transition-all duration-300 ${
                      appearance.theme === theme
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                        : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
                    } ${isDarkMode ? 'bg-slate-800/60' : 'bg-white/60'}`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg ${
                        theme === 'light' ? 'bg-yellow-500' :
                        theme === 'dark' ? 'bg-slate-800' :
                        'bg-gradient-to-r from-yellow-500 to-slate-800'
                      }`}>
                        {theme === 'light' ? <Sun className="w-5 h-5 text-white" /> :
                         theme === 'dark' ? <Moon className="w-5 h-5 text-white" /> :
                         <Monitor className="w-5 h-5 text-white" />}
                      </div>
                      <div className="text-left">
                        <p className={`font-medium capitalize ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
                          {theme}
                        </p>
                        <p className={`text-xs sm:text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                          {theme === 'light' && 'Light theme'}
                          {theme === 'dark' && 'Dark theme'}
                          {theme === 'auto' && 'Follow system'}
                        </p>
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Color Scheme */}
            <div className="space-y-4">
              <h4 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
                Color Scheme
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
                {colorSchemes.map((scheme) => (
                  <motion.button
                    key={scheme.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAppearanceChange('colorScheme', scheme.id)}
                    className={`p-3 sm:p-4 rounded-xl border-2 transition-all duration-300 ${
                      appearance.colorScheme === scheme.id
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                        : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
                    } ${isDarkMode ? 'bg-slate-800/60' : 'bg-white/60'}`}
                  >
                    <div className={`w-full h-8 sm:h-12 bg-gradient-to-r ${scheme.colors} rounded-lg mb-2 sm:mb-3`} />
                    <p className={`font-medium text-sm ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
                      {scheme.name}
                    </p>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Font Size */}
            <div className="space-y-4">
              <h4 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
                Font Size
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                {['small', 'medium', 'large'].map((size) => (
                  <motion.button
                    key={size}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleAppearanceChange('fontSize', size)}
                    className={`p-4 sm:p-6 rounded-2xl border-2 transition-all duration-300 ${
                      appearance.fontSize === size
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                        : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
                    } ${isDarkMode ? 'bg-slate-800/60' : 'bg-white/60'}`}
                  >
                    <p className={`font-medium capitalize ${
                      size === 'small' ? 'text-sm' : size === 'medium' ? 'text-base' : 'text-lg'
                    } ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
                      {size} Text
                    </p>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Other Appearance Options */}
            <div className="space-y-4">
              <h4 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
                Interface Options
              </h4>
              
              <motion.div
                whileHover={{ scale: 1.01 }}
                className={`p-4 sm:p-6 rounded-2xl border shadow-lg hover:shadow-xl transition-all duration-300 ${
                  isDarkMode 
                    ? 'bg-slate-800/60 border-slate-700/50' 
                    : 'bg-white/60 border-white/50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className={`font-medium ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                      Animations
                    </p>
                    <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                      Enable smooth animations and transitions
                    </p>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleAppearanceChange('animations', !appearance.animations)}
                    className={`relative w-12 h-6 sm:w-14 sm:h-7 rounded-full transition-all duration-300 ${
                      appearance.animations ? 'bg-gradient-to-r from-green-500 to-emerald-600' : 'bg-slate-300 dark:bg-slate-600'
                    }`}
                  >
                    <motion.div
                      animate={{ x: appearance.animations ? 24 : 2 }}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      className="absolute top-1 w-4 h-4 sm:w-5 sm:h-5 bg-white rounded-full shadow-lg"
                    />
                  </motion.button>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.01 }}
                className={`p-4 sm:p-6 rounded-2xl border shadow-lg hover:shadow-xl transition-all duration-300 ${
                  isDarkMode 
                    ? 'bg-slate-800/60 border-slate-700/50' 
                    : 'bg-white/60 border-white/50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className={`font-medium ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                      Compact Mode
                    </p>
                    <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                      Reduce spacing for more content
                    </p>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleAppearanceChange('compactMode', !appearance.compactMode)}
                    className={`relative w-12 h-6 sm:w-14 sm:h-7 rounded-full transition-all duration-300 ${
                      appearance.compactMode ? 'bg-gradient-to-r from-green-500 to-emerald-600' : 'bg-slate-300 dark:bg-slate-600'
                    }`}
                  >
                    <motion.div
                      animate={{ x: appearance.compactMode ? 24 : 2 }}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      className="absolute top-1 w-4 h-4 sm:w-5 sm:h-5 bg-white rounded-full shadow-lg"
                    />
                  </motion.button>
                </div>
              </motion.div>
            </div>
          </motion.div>
        );

      case 'storage':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6 sm:space-y-8"
          >
            <h3 className={`text-xl sm:text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
              Storage & Data Management
            </h3>
            
            {/* Storage Usage */}
            <div className={`p-4 sm:p-6 rounded-2xl sm:rounded-3xl border shadow-lg ${
              isDarkMode 
                ? 'bg-slate-800/60 border-slate-700/50' 
                : 'bg-white/60 border-white/50'
            }`}>
              <h4 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
                Storage Usage
              </h4>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className={`text-sm ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                    {storageUsage.used} GB of {storageUsage.total} GB used
                  </span>
                  <span className={`text-sm font-medium ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                    {Math.round((storageUsage.used / storageUsage.total) * 100)}%
                  </span>
                </div>
                
                <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-3 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(storageUsage.used / storageUsage.total) * 100}%` }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="h-3 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-full"
                  />
                </div>
                
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-6">
                  {Object.entries(storageUsage.breakdown).map(([type, size]) => (
                    <div key={type} className="text-center">
                      <div className={`p-2 sm:p-3 rounded-xl mb-2 ${
                        type === 'documents' ? 'bg-blue-100 dark:bg-blue-900/20' :
                        type === 'images' ? 'bg-green-100 dark:bg-green-900/20' :
                        type === 'videos' ? 'bg-purple-100 dark:bg-purple-900/20' :
                        'bg-orange-100 dark:bg-orange-900/20'
                      }`}>
                        {type === 'documents' && <FileText className="w-5 h-5 mx-auto text-blue-600" />}
                        {type === 'images' && <Image className="w-5 h-5 mx-auto text-green-600" />}
                        {type === 'videos' && <Video className="w-5 h-5 mx-auto text-purple-600" />}
                        {type === 'cache' && <HardDrive className="w-5 h-5 mx-auto text-orange-600" />}
                      </div>
                      <p className={`text-xs font-medium capitalize ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                        {type}
                      </p>
                      <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                        {size} GB
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Data Management Actions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowExportModal(true)}
                className={`p-4 sm:p-6 rounded-2xl border shadow-lg hover:shadow-xl transition-all duration-300 text-left ${
                  isDarkMode 
                    ? 'bg-slate-800/60 border-slate-700/50 hover:bg-slate-700/60' 
                    : 'bg-white/60 border-white/50 hover:bg-white/80'
                }`}
              >
                <div className="flex items-center space-x-3 sm:space-x-4">
                  <div className="p-2 sm:p-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl">
                    <Download className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </div>
                  <div>
                    <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
                      Export Data
                    </p>
                    <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                      Download all your data
                    </p>
                  </div>
                </div>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={clearCache}
                disabled={isLoading}
                className={`p-4 sm:p-6 rounded-2xl border shadow-lg hover:shadow-xl transition-all duration-300 text-left disabled:opacity-50 ${
                  isDarkMode 
                    ? 'bg-slate-800/60 border-slate-700/50 hover:bg-slate-700/60' 
                    : 'bg-white/60 border-white/50 hover:bg-white/80'
                }`}
              >
                <div className="flex items-center space-x-3 sm:space-x-4">
                  <div className="p-2 sm:p-3 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl">
                    {isLoading ? (
                      <RefreshCw className="w-4 h-4 sm:w-5 sm:h-5 text-white animate-spin" />
                    ) : (
                      <Trash2 className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                    )}
                  </div>
                  <div>
                    <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
                      Clear Cache
                    </p>
                    <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                      {isLoading ? 'Clearing...' : 'Free up space'}
                    </p>
                  </div>
                </div>
              </motion.button>
            </div>
          </motion.div>
        );

      case 'devices':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6 sm:space-y-8"
          >
            <h3 className={`text-xl sm:text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
              Connected Devices
            </h3>
            
            <div className="space-y-4">
              {[
                { name: 'Current Device', type: 'Desktop', browser: 'Chrome', location: 'San Francisco, CA', lastActive: 'Active now', current: true },
                { name: 'iPhone 14 Pro', type: 'Mobile', browser: 'Safari', location: 'San Francisco, CA', lastActive: '2 hours ago', current: false },
                { name: 'MacBook Pro', type: 'Desktop', browser: 'Safari', location: 'San Francisco, CA', lastActive: '1 day ago', current: false },
              ].map((device, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`p-4 sm:p-6 rounded-2xl border shadow-lg hover:shadow-xl transition-all duration-300 ${
                    device.current 
                      ? 'border-green-500 bg-green-50 dark:bg-green-900/20' 
                      : isDarkMode 
                        ? 'bg-slate-800/60 border-slate-700/50' 
                        : 'bg-white/60 border-white/50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3 sm:space-x-4">
                      <div className={`p-2 sm:p-3 rounded-xl ${
                        device.type === 'Mobile' ? 'bg-gradient-to-r from-purple-500 to-pink-600' : 'bg-gradient-to-r from-blue-500 to-cyan-600'
                      }`}>
                        {device.type === 'Mobile' ? (
                          <Smartphone className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                        ) : (
                          <Monitor className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                        )}
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
                            {device.name}
                          </p>
                          {device.current && (
                            <span className="px-2 py-1 bg-green-500 text-white text-xs rounded-full font-medium">
                              Current
                            </span>
                          )}
                        </div>
                        <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                          {device.browser} • {device.location}
                        </p>
                        <p className={`text-xs ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>
                          {device.lastActive}
                        </p>
                      </div>
                    </div>
                    {!device.current && (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-3 sm:px-4 py-1.5 sm:py-2 bg-red-500 text-white rounded-lg font-medium text-xs sm:text-sm hover:bg-red-600 transition-colors"
                      >
                        Revoke
                      </motion.button>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        );

      case 'advanced':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6 sm:space-y-8"
          >
            <h3 className={`text-xl sm:text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
              Advanced Settings
            </h3>
            
            <div className="space-y-4 sm:space-y-6">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full p-4 sm:p-6 rounded-2xl border shadow-lg hover:shadow-xl transition-all duration-300 text-left ${
                  isDarkMode 
                    ? 'bg-slate-800/60 border-slate-700/50 hover:bg-slate-700/60' 
                    : 'bg-white/60 border-white/50 hover:bg-white/80'
                }`}
              >
                <div className="flex items-center space-x-3 sm:space-x-4">
                  <div className="p-2 sm:p-3 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-xl">
                    <Languages className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </div>
                  <div>
                    <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
                      Language & Region
                    </p>
                    <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                      English (US) • Pacific Time
                    </p>
                  </div>
                </div>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full p-4 sm:p-6 rounded-2xl border shadow-lg hover:shadow-xl transition-all duration-300 text-left ${
                  isDarkMode 
                    ? 'bg-slate-800/60 border-slate-700/50 hover:bg-slate-700/60' 
                    : 'bg-white/60 border-white/50 hover:bg-white/80'
                }`}
              >
                <div className="flex items-center space-x-3 sm:space-x-4">
                  <div className="p-2 sm:p-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl">
                    <Archive className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </div>
                  <div>
                    <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
                      Backup & Restore
                    </p>
                    <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                      Manage your data backups
                    </p>
                  </div>
                </div>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowDeleteModal(true)}
                className={`w-full p-4 sm:p-6 rounded-2xl border border-red-200 dark:border-red-800 shadow-lg hover:shadow-xl transition-all duration-300 text-left bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30`}
              >
                <div className="flex items-center space-x-3 sm:space-x-4">
                  <div className="p-2 sm:p-3 bg-gradient-to-r from-red-500 to-rose-600 rounded-xl">
                    <Trash2 className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-red-700 dark:text-red-400">
                      Delete Account
                    </p>
                    <p className="text-sm text-red-600 dark:text-red-500">
                      Permanently delete your account and data
                    </p>
                  </div>
                </div>
              </motion.button>
            </div>
          </motion.div>
        );

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
    <div className="p-2 sm:p-4 lg:p-6 h-full overflow-y-auto">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8 space-y-4 sm:space-y-0"
      >
        <div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
            Settings
          </h1>
          <p className={`text-sm sm:text-base lg:text-lg ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
            Manage your account and application preferences
          </p>
        </div>
        
        {/* Save Status Indicator */}
        <AnimatePresence>
          {saveStatus !== 'idle' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className={`flex items-center space-x-2 px-3 sm:px-4 py-2 rounded-xl text-sm font-medium ${
                saveStatus === 'saving' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400' :
                saveStatus === 'saved' ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' :
                'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
              }`}
            >
              {saveStatus === 'saving' && <RefreshCw className="w-4 h-4 animate-spin" />}
              {saveStatus === 'saved' && <CheckCircle className="w-4 h-4" />}
              {saveStatus === 'error' && <AlertTriangle className="w-4 h-4" />}
              <span>
                {saveStatus === 'saving' && 'Saving...'}
                {saveStatus === 'saved' && 'Saved!'}
                {saveStatus === 'error' && 'Error saving'}
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className={`rounded-2xl sm:rounded-3xl shadow-2xl border overflow-hidden ${
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
            <nav className="p-3 sm:p-4 lg:p-6 space-y-1 sm:space-y-2">
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
                    className={`w-full flex items-center px-3 sm:px-4 py-3 sm:py-4 text-sm font-semibold rounded-xl sm:rounded-2xl transition-all duration-300 ${
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
                        className={`absolute inset-0 bg-gradient-to-r ${tab.color} rounded-xl sm:rounded-2xl`}
                        initial={false}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                    
                    <div className={`
                      relative z-10 p-1.5 sm:p-2 rounded-lg sm:rounded-xl mr-2 sm:mr-3 transition-all duration-300
                      ${activeTab === tab.id 
                        ? 'bg-white/20 text-white' 
                        : `bg-gradient-to-r ${tab.color} text-white`
                      }
                    `}>
                      <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    <span className="relative z-10 text-xs sm:text-sm">{tab.label}</span>
                  </motion.button>
                );
              })}
            </nav>
          </div>

          {/* Settings Content */}
          <div className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
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

      {/* Modals */}
      {/* Password Modal */}
      <AnimatePresence>
        {showPasswordModal && (
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
              className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-2xl max-w-md w-full border border-white/20 dark:border-slate-700/20"
            >
              <div className="p-6 sm:p-8">
                <h2 className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-white mb-4 sm:mb-6">
                  Enable Two-Factor Authentication
                </h2>
                <p className="text-slate-600 dark:text-slate-400 mb-6">
                  Enter your password to continue with 2FA setup.
                </p>
                
                <input
                  type="password"
                  placeholder="Enter your password"
                  className="w-full px-4 py-3 bg-white/70 dark:bg-slate-700/60 border border-white/20 dark:border-slate-600 rounded-xl sm:rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-slate-800 dark:text-white mb-6"
                />
                
                <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowPasswordModal(false)}
                    className="w-full sm:w-auto px-6 py-3 text-slate-700 dark:text-slate-300 bg-slate-200 dark:bg-slate-700 rounded-xl sm:rounded-2xl hover:bg-slate-300 dark:hover:bg-slate-600 transition-all duration-200 font-medium"
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      handleSecurityChange('twoFactorAuth', !security.twoFactorAuth);
                      setShowPasswordModal(false);
                    }}
                    className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-xl sm:rounded-2xl hover:from-blue-600 hover:to-cyan-700 transition-all duration-200 font-medium shadow-lg"
                  >
                    Continue
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Export Modal */}
      <AnimatePresence>
        {showExportModal && (
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
              className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-2xl max-w-md w-full border border-white/20 dark:border-slate-700/20"
            >
              <div className="p-6 sm:p-8">
                <h2 className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-white mb-4 sm:mb-6">
                  Export Your Data
                </h2>
                <p className="text-slate-600 dark:text-slate-400 mb-6">
                  Download all your data including settings, notes, reports, and more in JSON format.
                </p>
                
                <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowExportModal(false)}
                    className="w-full sm:w-auto px-6 py-3 text-slate-700 dark:text-slate-300 bg-slate-200 dark:bg-slate-700 rounded-xl sm:rounded-2xl hover:bg-slate-300 dark:hover:bg-slate-600 transition-all duration-200 font-medium"
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={exportData}
                    className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl sm:rounded-2xl hover:from-green-600 hover:to-emerald-700 transition-all duration-200 font-medium shadow-lg"
                  >
                    Export Data
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Account Modal */}
      <AnimatePresence>
        {showDeleteModal && (
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
              className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-2xl max-w-md w-full border border-red-200 dark:border-red-800"
            >
              <div className="p-6 sm:p-8">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="p-3 bg-red-100 dark:bg-red-900/20 rounded-2xl">
                    <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-400" />
                  </div>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-red-700 dark:text-red-400">
                      Delete Account
                    </h2>
                    <p className="text-red-600 dark:text-red-500 text-sm">
                      This action cannot be undone
                    </p>
                  </div>
                </div>
                
                <p className="text-slate-600 dark:text-slate-400 mb-6">
                  Are you sure you want to permanently delete your account? All your data, including notes, reports, and settings will be permanently removed.
                </p>
                
                <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowDeleteModal(false)}
                    className="w-full sm:w-auto px-6 py-3 text-slate-700 dark:text-slate-300 bg-slate-200 dark:bg-slate-700 rounded-xl sm:rounded-2xl hover:bg-slate-300 dark:hover:bg-slate-600 transition-all duration-200 font-medium"
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowDeleteModal(false)}
                    className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-red-500 to-rose-600 text-white rounded-xl sm:rounded-2xl hover:from-red-600 hover:to-rose-700 transition-all duration-200 font-medium shadow-lg"
                  >
                    Delete Account
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

export default Settings;