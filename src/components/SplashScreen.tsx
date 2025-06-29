import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Zap, Sparkles } from 'lucide-react';

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 flex items-center justify-center z-50 overflow-hidden">
      {/* Animated Background Particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ 
              opacity: 0, 
              scale: 0,
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight
            }}
            animate={{ 
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
              y: [null, -100]
            }}
            transition={{
              duration: 3,
              delay: Math.random() * 2,
              repeat: Infinity,
              ease: "easeOut"
            }}
            className="absolute w-2 h-2 bg-white/30 rounded-full"
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center">
        {/* Logo Animation */}
        <motion.div
          initial={{ scale: 0, rotate: -180, opacity: 0 }}
          animate={{ scale: 1, rotate: 0, opacity: 1 }}
          transition={{ 
            duration: 1.2, 
            ease: "easeOut",
            type: "spring",
            stiffness: 100
          }}
          className="mb-8"
        >
          <div className="relative">
            <div className="w-32 h-32 bg-white/20 backdrop-blur-xl rounded-3xl flex items-center justify-center mx-auto shadow-2xl border border-white/30">
              <motion.div
                animate={{ 
                  rotate: [0, 360],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  rotate: { duration: 2, repeat: Infinity, ease: "linear" },
                  scale: { duration: 1, repeat: Infinity, ease: "easeInOut" }
                }}
              >
                <Zap className="w-16 h-16 text-white" />
              </motion.div>
            </div>
            
            {/* Sparkles around logo */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ 
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                  rotate: [0, 180]
                }}
                transition={{
                  duration: 2,
                  delay: 1 + (i * 0.2),
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute"
                style={{
                  top: `${50 + 40 * Math.cos((i * Math.PI * 2) / 8)}%`,
                  left: `${50 + 40 * Math.sin((i * Math.PI * 2) / 8)}%`,
                  transform: 'translate(-50%, -50%)'
                }}
              >
                <Sparkles className="w-6 h-6 text-white/80" />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Brand Text */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8, ease: "easeOut" }}
        >
          <motion.h1 
            className="text-5xl md:text-6xl font-bold text-white mb-4"
            animate={{ 
              textShadow: [
                "0 0 20px rgba(255,255,255,0.5)",
                "0 0 40px rgba(255,255,255,0.8)",
                "0 0 20px rgba(255,255,255,0.5)"
              ]
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            ProductiveHub
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="text-xl text-white/90 font-medium"
          >
            All-in-One Productivity Suite
          </motion.p>
        </motion.div>

        {/* Loading Indicator */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.5, duration: 0.5 }}
          className="mt-12"
        >
          <div className="flex items-center justify-center space-x-2">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: 1,
                  delay: i * 0.2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="w-3 h-3 bg-white/80 rounded-full"
              />
            ))}
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 0.5 }}
            className="text-white/70 text-sm mt-4 font-medium"
          >
            Initializing your workspace...
          </motion.p>
        </motion.div>

        {/* Version Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 0.5 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/60 text-sm"
        >
          Version 2.0.0 • Built with ❤️
        </motion.div>
      </div>
    </div>
  );
};

export default SplashScreen;