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
import InstallPrompt from './components/InstallPrompt';

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
  const [isStandalone, setIsStandalone] = useState(false);

  // Check if app is running in standalone mode (already installed)
  useEffect(() => {
    const checkStandalone = () => {
      const isStandaloneMode = window.matchMedia('(display-mode: standalone)').matches ||
                              (window.navigator as any).standalone ||
                              document.referrer.includes('android-app://');
      setIsStandalone(isStandaloneMode);
    };

    checkStandalone();
    window.addEventListener('resize', checkStandalone);
    return () => window.removeEventListener('resize', checkStandalone);
  }, []);

  // PWA Install Prompt
  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      // Show install prompt after a delay if not in standalone mode
      if (!isStandalone) {
        setTimeout(() => {
          setShowInstallPrompt(true);
        }, 3000);
      }
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, [isStandalone]);

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
        setIsStandalone(true);
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
    <div className={`min-h-screen min-h-[calc(var(--vh,1vh)*100)] transition-all duration-500 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900' 
        : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'
    }`}>
      {/* Animated Mesh Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-0 left-0 w-full h-full opacity-30 ${
          isDarkMode ? 'bg-gradient-to-br from-purple-600/20 to-pink-600/20' : 'bg-gradient-to-br from-blue-300/20 to-purple-300/20'
        }`}>
          <div className="absolute top-1/4 left-1/4 w-32 sm:w-48 lg:w-96 h-32 sm:h-48 lg:h-96 bg-gradient-to-r from-violet-400 to-purple-400 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
          <div className="absolute top-3/4 right-1/4 w-32 sm:w-48 lg:w-96 h-32 sm:h-48 lg:h-96 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full mix-blend-multiply filter blur-3xl animate-pulse animation-delay-2000"></div>
          <div className="absolute bottom-1/4 left-1/2 w-32 sm:w-48 lg:w-96 h-32 sm:h-48 lg:h-96 bg-gradient-to-r from-pink-400 to-rose-400 rounded-full mix-blend-multiply filter blur-3xl animate-pulse animation-delay-4000"></div>
        </div>
      </div>

      {/* Offline Indicator */}
      {!isOnline && (
        <motion.div
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          className="fixed top-0 left-0 right-0 z-50 bg-red-500 text-white text-center py-2 text-sm font-medium safe-area-pt"
        >
          You're offline. Some features may not work.
        </motion.div>
      )}

      {/* Install Prompt Component */}
      <InstallPrompt
        show={showInstallPrompt && !isStandalone}
        onInstall={handleInstallPWA}
        onDismiss={() => setShowInstallPrompt(false)}
        isDarkMode={isDarkMode}
      />

      {/* Glass Morphism Container */}
      <div className="relative z-10 min-h-screen min-h-[calc(var(--vh,1vh)*100)] flex flex-col">
        {/* Top Navigation */}
        <TopNavigation 
          currentView={currentView} 
          setCurrentView={setCurrentView}
          isDarkMode={isDarkMode}
          setIsDarkMode={setIsDarkMode}
        />
        
        {/* Main Content Area */}
        <main className="flex-1 px-1 sm:px-2 lg:px-4 pb-16 sm:pb-20 lg:pb-24 pt-1 sm:pt-2 overflow-hidden">
          <div className={`h-full rounded-xl sm:rounded-2xl lg:rounded-3xl backdrop-blur-2xl border shadow-2xl overflow-hidden ${
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