import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, X, Smartphone, Zap } from 'lucide-react';

interface InstallPromptProps {
  show: boolean;
  onInstall: () => void;
  onDismiss: () => void;
  isDarkMode: boolean;
}

const InstallPrompt: React.FC<InstallPromptProps> = ({ 
  show, 
  onInstall, 
  onDismiss, 
  isDarkMode 
}) => {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-16 sm:bottom-20 lg:bottom-24 left-2 right-2 sm:left-4 sm:right-4 z-50"
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.9 }}
            className={`rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-2xl border backdrop-blur-xl ${
              isDarkMode 
                ? 'bg-slate-800/95 border-slate-700/50' 
                : 'bg-white/95 border-white/50'
            }`}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3 flex-1">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-violet-500 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <Zap className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className={`font-bold text-base sm:text-lg ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
                    Install ProductiveHub
                  </h3>
                  <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                    Add to home screen for faster access and better experience
                  </p>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onDismiss}
                className={`p-2 rounded-xl transition-all duration-200 ${
                  isDarkMode 
                    ? 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/50' 
                    : 'text-slate-500 hover:text-slate-700 hover:bg-slate-100'
                }`}
              >
                <X className="w-5 h-5" />
              </motion.button>
            </div>

            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onDismiss}
                className={`flex-1 px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
                  isDarkMode 
                    ? 'bg-slate-700 text-slate-300 hover:bg-slate-600' 
                    : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                }`}
              >
                Maybe Later
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onInstall}
                className="flex-1 flex items-center justify-center px-4 py-3 bg-gradient-to-r from-violet-500 to-purple-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
              >
                <Download className="w-5 h-5 mr-2" />
                Install App
              </motion.button>
            </div>

            {/* Features highlight */}
            <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="flex flex-col items-center">
                  <Smartphone className={`w-5 h-5 mb-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`} />
                  <span className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>Offline Access</span>
                </div>
                <div className="flex flex-col items-center">
                  <Zap className={`w-5 h-5 mb-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`} />
                  <span className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>Fast Loading</span>
                </div>
                <div className="flex flex-col items-center">
                  <Download className={`w-5 h-5 mb-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`} />
                  <span className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>No App Store</span>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default InstallPrompt;