import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

const MotivationalGreeting = ({ completionRate, totalHabits }) => {
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  const getMotivationalMessage = () => {
    if (totalHabits === 0) {
      return "Ready to build some amazing habits? Let's get started!";
    }
    
    if (completionRate === 100) {
      return "🎉 Amazing! You've completed all your habits today!";
    }
    
    if (completionRate >= 75) {
      return "You're doing great! Keep up the momentum!";
    }
    
    if (completionRate >= 50) {
      return "You're halfway there! Keep going!";
    }
    
    if (completionRate > 0) {
      return "Every step counts! You've got this!";
    }
    
    return "Today is a fresh start! Let's make it count!";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
      className="mb-6"
    >
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="glass rounded-xl p-4 md:p-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border border-blue-200/50 dark:border-blue-800/50 relative overflow-hidden"
      >
        {/* Animated background pattern */}
        <motion.div
          className="absolute inset-0 opacity-10"
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
          style={{
            backgroundImage: 'radial-gradient(circle, #3b82f6 1px, transparent 1px)',
            backgroundSize: '20px 20px',
          }}
        />
        
        <div className="flex items-center gap-3 relative z-10">
          <motion.div
            animate={{ 
              rotate: [0, 360],
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              duration: 3, 
              repeat: Infinity, 
              ease: 'easeInOut'
            }}
            className="p-2 bg-blue-100 dark:bg-blue-900/40 rounded-lg"
          >
            <Sparkles className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="currentColor" />
          </motion.div>
          <div>
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl md:text-2xl font-bold text-gray-800 dark:text-gray-100"
            >
              {getGreeting()}! 👋
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="text-gray-600 dark:text-gray-400 mt-1"
            >
              {getMotivationalMessage()}
            </motion.p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default MotivationalGreeting;

