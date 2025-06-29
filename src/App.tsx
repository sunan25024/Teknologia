import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TopNavigation from './components/TopNavigation';
import BottomNavigation from './components/BottomNavigation';
import Dashboard from './components/Dashboard';
import Notes from './components/Notes';
import Reports from './components/Reports';
import Calendar from './components/Calendar';
import Camera from './components/Camera';
import Spreadsheet from './components/Spreadsheet';
import WhatsApp from './components/WhatsApp';
import Settings from './components/Settings';
import FloatingActionButton from './components/FloatingActionButton';
import LandingPage from './components/LandingPage';
import LoadingScreen from './components/LoadingScreen';
import SplashScreen from './components/SplashScreen';

export type ViewType = 'dashboard' | 'notes' | 'reports' | 'calendar' | 'camera' | 'spreadsheet' | 'whatsapp' | 'settings';

type AppState = 'splash' | 'landing' | 'loading' | 'app';

function App() {
  const [currentView, setCurrentView] = useState<ViewType>('dashboard');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [appState, setAppState] = useState<AppState>('splash');
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loadingMessage, setLoadingMessage] = useState('Initializing...');

  // Splash screen completion
  const handleSplashComplete = () => {
    setAppState('landing');
  };

  // Landing page get started
  const handleGetStarted = () => {
    setAppState('loading');
    simulateLoading();
  };

  // Simulate loading process
  const simulateLoading = () => {
    const steps = [
      { progress: 20, message: 'Loading components...' },
      { progress: 40, message: 'Initializing features...' },
      { progress: 60, message: 'Setting up workspace...' },
      { progress: 80, message: 'Preparing interface...' },
      { progress: 100, message: 'Almost ready!' }
    ];

    let currentStep = 0;
    const interval = setInterval(() => {
      if (currentStep < steps.length) {
        setLoadingProgress(steps[currentStep].progress);
        setLoadingMessage(steps[currentStep].message);
        currentStep++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setAppState('app');
        }, 500);
      }
    }, 800);
  };

  // Auto dark mode based on time
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour >= 18 || hour <= 6) {
      setIsDarkMode(true);
    }
  }, []);

  const renderCurrentView = () => {
    const views = {
      dashboard: <Dashboard onNavigate={setCurrentView} />,
      notes: <Notes />,
      reports: <Reports />,
      calendar: <Calendar />,
      camera: <Camera />,
      spreadsheet: <Spreadsheet />,
      whatsapp: <WhatsApp />,
      settings: <Settings isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
    };

    return (
      <AnimatePresence mode="wait">
        <motion.div
          key={currentView}
          initial={{ opacity: 0, scale: 0.95, rotateX: -10 }}
          animate={{ opacity: 1, scale: 1, rotateX: 0 }}
          exit={{ opacity: 0, scale: 1.05, rotateX: 10 }}
          transition={{ 
            duration: 0.4, 
            ease: [0.25, 0.46, 0.45, 0.94],
            type: "spring",
            stiffness: 100
          }}
          className="h-full"
        >
          {views[currentView]}
        </motion.div>
      </AnimatePresence>
    );
  };

  // Render based on app state
  if (appState === 'splash') {
    return <SplashScreen onComplete={handleSplashComplete} />;
  }

  if (appState === 'landing') {
    return <LandingPage onGetStarted={handleGetStarted} />;
  }

  if (appState === 'loading') {
    return <LoadingScreen progress={loadingProgress} message={loadingMessage} />;
  }

  return (
    <div className={`min-h-screen transition-all duration-500 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900' 
        : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'
    }`}>
      {/* Animated Mesh Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-0 left-0 w-full h-full opacity-30 ${
          isDarkMode ? 'bg-gradient-to-br from-purple-600/20 to-pink-600/20' : 'bg-gradient-to-br from-blue-300/20 to-purple-300/20'
        }`}>
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-violet-400 to-purple-400 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
          <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full mix-blend-multiply filter blur-3xl animate-pulse animation-delay-2000"></div>
          <div className="absolute bottom-1/4 left-1/2 w-96 h-96 bg-gradient-to-r from-pink-400 to-rose-400 rounded-full mix-blend-multiply filter blur-3xl animate-pulse animation-delay-4000"></div>
        </div>
      </div>

      {/* Glass Morphism Container */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Top Navigation */}
        <TopNavigation 
          currentView={currentView} 
          setCurrentView={setCurrentView}
          isDarkMode={isDarkMode}
          setIsDarkMode={setIsDarkMode}
        />
        
        {/* Main Content Area */}
        <main className="flex-1 px-4 pb-24 pt-4 overflow-hidden">
          <div className={`h-full rounded-3xl backdrop-blur-2xl border shadow-2xl overflow-hidden ${
            isDarkMode 
              ? 'bg-slate-800/40 border-slate-700/50' 
              : 'bg-white/40 border-white/50'
          }`}>
            {renderCurrentView()}
          </div>
        </main>

        {/* Bottom Navigation */}
        <BottomNavigation 
          currentView={currentView} 
          setCurrentView={setCurrentView}
          isDarkMode={isDarkMode}
        />

        {/* Floating Action Button */}
        <FloatingActionButton 
          currentView={currentView}
          isDarkMode={isDarkMode}
        />
      </div>
    </div>
  );
}

export default App;