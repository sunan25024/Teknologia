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
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);

  // PWA Install Prompt
  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallPrompt(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  // Online/Offline Detection
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Handle URL shortcuts
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const action = urlParams.get('action');
    
    if (action === 'new-note') {
      setCurrentView('notes');
    } else if (action === 'camera') {
      setCurrentView('camera');
    } else if (action === 'calendar') {
      setCurrentView('calendar');
    }
  }, []);

  // Splash screen completion
  const handleSplashComplete = () => {
    setAppState('landing');
  };

  // Landing page get started
  const handleGetStarted = () => {
    setAppState('loading');
    simulateLoading();
  };

  // Install PWA
  const handleInstallPWA = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setShowInstallPrompt(false);
      }
      setDeferredPrompt(null);
    }
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

  // Viewport height fix for mobile
  useEffect(() => {
    const setVH = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    setVH();
    window.addEventListener('resize', setVH);
    window.addEventListener('orientationchange', setVH);

    return () => {
      window.removeEventListener('resize', setVH);
      window.removeEventListener('orientationchange', setVH);
    };
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
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ 
            duration: 0.3, 
            ease: "easeInOut"
          }}
          className="h-full overflow-hidden"
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
    <div className={`min-h-screen min-h-[calc(var(--vh,1vh)*100)] transition-all duration-500 overflow-hidden ${
      isDarkMode 
        ? 'bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900' 
        : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'
    }`}>
      {/* Animated Mesh Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-0 left-0 w-full h-full opacity-30 ${
          isDarkMode ? 'bg-gradient-to-br from-purple-600/20 to-pink-600/20' : 'bg-gradient-to-br from-blue-300/20 to-purple-300/20'
        }`}>
          <div className="absolute top-1/4 left-1/4 w-32 sm:w-96 h-32 sm:h-96 bg-gradient-to-r from-violet-400 to-purple-400 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
          <div className="absolute top-3/4 right-1/4 w-32 sm:w-96 h-32 sm:h-96 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full mix-blend-multiply filter blur-3xl animate-pulse animation-delay-2000"></div>
          <div className="absolute bottom-1/4 left-1/2 w-32 sm:w-96 h-32 sm:h-96 bg-gradient-to-r from-pink-400 to-rose-400 rounded-full mix-blend-multiply filter blur-3xl animate-pulse animation-delay-4000"></div>
        </div>
      </div>

      {/* Offline Indicator */}
      {!isOnline && (
        <motion.div
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          className="fixed top-0 left-0 right-0 z-50 bg-red-500 text-white text-center py-2 text-sm font-medium"
        >
          You're offline. Some features may not work.
        </motion.div>
      )}

      {/* PWA Install Prompt */}
      {showInstallPrompt && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="fixed bottom-20 sm:bottom-24 left-2 right-2 z-40"
        >
          <div className={`rounded-xl p-3 shadow-2xl border mobile-card ${
            isDarkMode 
              ? 'bg-slate-800/90 border-slate-700' 
              : 'bg-white/90 border-white/50'
          }`}>
            <div className="flex items-center justify-between">
              <div className="flex-1 min-w-0">
                <h3 className={`font-bold text-sm ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
                  Install ProductiveHub
                </h3>
                <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                  Add to home screen
                </p>
              </div>
              <div className="flex space-x-2 ml-2">
                <button
                  onClick={() => setShowInstallPrompt(false)}
                  className="px-2 py-1 text-xs text-slate-500 hover:text-slate-700 transition-colors"
                >
                  Later
                </button>
                <button
                  onClick={handleInstallPWA}
                  className="px-3 py-1 bg-gradient-to-r from-violet-500 to-purple-600 text-white text-xs rounded-lg font-medium"
                >
                  Install
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Main App Container */}
      <div className="relative z-10 min-h-screen min-h-[calc(var(--vh,1vh)*100)] flex flex-col overflow-hidden">
        {/* Top Navigation */}
        <TopNavigation 
          currentView={currentView} 
          setCurrentView={setCurrentView}
          isDarkMode={isDarkMode}
          setIsDarkMode={setIsDarkMode}
        />
        
        {/* Main Content Area */}
        <main className="flex-1 mobile-container pb-20 sm:pb-24 pt-2 overflow-hidden">
          <div className={`h-full rounded-xl sm:rounded-3xl backdrop-blur-2xl border shadow-2xl overflow-hidden ${
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