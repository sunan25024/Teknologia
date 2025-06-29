import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Loader2 } from 'lucide-react';

interface LoadingScreenProps {
  progress: number;
  message: string;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ progress, message }) => {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 flex items-center justify-center z-50">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/10 rounded-full mix-blend-overlay filter blur-3xl animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-white/10 rounded-full mix-blend-overlay filter blur-3xl animate-pulse animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/2 w-96 h-96 bg-white/10 rounded-full mix-blend-overlay filter blur-3xl animate-pulse animation-delay-4000"></div>
      </div>

      <div className="relative z-10 text-center max-w-md mx-auto px-6">
        {/* Logo */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-8"
        >
          <div className="w-24 h-24 bg-white/20 backdrop-blur-xl rounded-3xl flex items-center justify-center mx-auto shadow-2xl border border-white/30">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <Zap className="w-12 h-12 text-white" />
            </motion.div>
          </div>
        </motion.div>

        {/* Brand */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-white mb-2">ProductiveHub</h1>
          <p className="text-white/80 text-lg">All-in-One Productivity Suite</p>
        </motion.div>

        {/* Progress Bar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.4 }}
          className="mb-6"
        >
          <div className="w-full bg-white/20 rounded-full h-3 backdrop-blur-xl border border-white/30 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="h-full bg-gradient-to-r from-white to-white/80 rounded-full shadow-lg"
            />
          </div>
          <div className="flex justify-between items-center mt-3">
            <span className="text-white/80 text-sm font-medium">{message}</span>
            <span className="text-white font-bold">{progress}%</span>
          </div>
        </motion.div>

        {/* Loading Animation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="flex items-center justify-center space-x-2 text-white/80"
        >
          <Loader2 className="w-5 h-5 animate-spin" />
          <span className="text-sm font-medium">Loading your workspace...</span>
        </motion.div>

        {/* Feature Highlights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="mt-12 grid grid-cols-2 gap-4 text-white/70 text-sm"
        >
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-white/60 rounded-full"></div>
            <span>Smart Notes</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-white/60 rounded-full"></div>
            <span>Dynamic Reports</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-white/60 rounded-full"></div>
            <span>Camera Integration</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-white/60 rounded-full"></div>
            <span>WhatsApp Connect</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LoadingScreen;