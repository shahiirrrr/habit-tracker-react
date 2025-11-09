import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, AlertCircle, X } from 'lucide-react';
import { useEffect } from 'react';

/**
 * Toast Notification Component
 * Replaces browser alerts with beautiful notifications
 * Types: success, error, warning, info
 */
const Toast = ({ message, type = 'info', isOpen, onClose, duration = 4000 }) => {
  useEffect(() => {
    if (isOpen && duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [isOpen, duration, onClose]);

  const typeConfig = {
    success: {
      icon: CheckCircle2,
      bgColor: 'bg-green-500',
      textColor: 'text-green-50',
      borderColor: 'border-green-600',
    },
    error: {
      icon: XCircle,
      bgColor: 'bg-red-500',
      textColor: 'text-red-50',
      borderColor: 'border-red-600',
    },
    warning: {
      icon: AlertCircle,
      bgColor: 'bg-yellow-500',
      textColor: 'text-yellow-50',
      borderColor: 'border-yellow-600',
    },
    info: {
      icon: AlertCircle,
      bgColor: 'bg-blue-500',
      textColor: 'text-blue-50',
      borderColor: 'border-blue-600',
    },
  };

  const config = typeConfig[type] || typeConfig.info;
  const Icon = config.icon;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -50, x: '-50%' }}
          animate={{ opacity: 1, y: 0, x: '-50%' }}
          exit={{ opacity: 0, y: -50, x: '-50%' }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className="fixed top-20 left-1/2 z-50 max-w-md w-full px-4"
        >
          <div
            className={`${config.bgColor} ${config.textColor} rounded-lg shadow-2xl border-2 ${config.borderColor} p-4 flex items-center gap-3`}
          >
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
            >
              <Icon className="w-6 h-6" />
            </motion.div>
            <p className="flex-1 font-medium">{message}</p>
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="p-1 hover:bg-white/20 rounded transition-colors"
              aria-label="Close notification"
            >
              <X className="w-5 h-5" />
            </motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Toast;
