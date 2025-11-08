import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, X, UserPlus, LogIn } from 'lucide-react';

const GuestWarningBanner = ({ onSignUp, onLogin }) => {
  const [isDismissed, setIsDismissed] = useState(false);

  if (isDismissed) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <AlertTriangle className="w-5 h-5 flex-shrink-0 animate-pulse" />
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm sm:text-base">
                  You're using <strong>Guest Mode</strong> - Your data is stored locally
                </p>
                <p className="text-xs sm:text-sm text-white/90 mt-0.5">
                  ⚠️ Create an account to save your habits permanently and sync across devices
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onSignUp}
                className="px-3 sm:px-4 py-1.5 sm:py-2 bg-white text-amber-600 hover:bg-amber-50 font-medium rounded-lg text-xs sm:text-sm shadow-sm transition-colors flex items-center gap-1.5 whitespace-nowrap"
              >
                <UserPlus className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">Sign Up</span>
                <span className="sm:hidden">Sign Up</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onLogin}
                className="px-3 sm:px-4 py-1.5 sm:py-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm font-medium rounded-lg text-xs sm:text-sm transition-colors flex items-center gap-1.5 whitespace-nowrap"
              >
                <LogIn className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">Login</span>
                <span className="sm:hidden">Login</span>
              </motion.button>

              <button
                onClick={() => setIsDismissed(true)}
                className="p-1 hover:bg-white/20 rounded-lg transition-colors"
                aria-label="Dismiss"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default GuestWarningBanner;
