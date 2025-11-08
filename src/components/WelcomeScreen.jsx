import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Check, AlertCircle, Target, TrendingUp, Calendar, Sparkles, Zap, Shield } from 'lucide-react';

const WelcomeScreen = ({ onContinueAsGuest, onSignUp }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      icon: Sparkles,
      title: "Welcome to HabitDaily!",
      description: "Transform your life one habit at a time. Build better routines, track your progress, and achieve your goals with our beautiful and intuitive habit tracker.",
      color: "from-blue-500 to-purple-600",
      features: ["Beautiful UI", "Easy to Use", "No Ads"]
    },
    {
      icon: Calendar,
      title: "Track Daily Progress",
      description: "Mark habits as complete each day. Build powerful streaks, visualize your consistency, and watch your progress grow over time.",
      color: "from-purple-500 to-pink-600",
      features: ["Daily Check-ins", "Streak Tracking", "Visual Progress"]
    },
    {
      icon: Zap,
      title: "Stay Motivated",
      description: "Get insights into your completion rates, celebrate milestones with confetti, and see real-time stats that keep you motivated to continue.",
      color: "from-pink-500 to-orange-600",
      features: ["Smart Stats", "Celebrations", "Dark Mode"]
    }
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const Step = steps[currentStep];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-purple-900/20 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-2xl"
      >
        <div className="glass rounded-3xl p-8 md:p-12 shadow-2xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg">
          
          {/* Progress Dots */}
          <div className="flex justify-center gap-2 mb-8">
            {steps.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentStep(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentStep 
                    ? 'w-8 bg-gradient-to-r from-blue-500 to-purple-600' 
                    : 'w-2 bg-gray-300 dark:bg-gray-600'
                }`}
              />
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="text-center"
            >
              {/* Icon */}
              <motion.div
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity, 
                  ease: 'easeInOut'
                }}
                className={`w-24 h-24 mx-auto mb-6 bg-gradient-to-br ${Step.color} rounded-3xl flex items-center justify-center shadow-lg`}
              >
                <Step.icon className="w-12 h-12 text-white" />
              </motion.div>

              {/* Title */}
              <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {Step.title}
              </h1>

              {/* Description */}
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 max-w-lg mx-auto">
                {Step.description}
              </p>

              {/* Features List */}
              {Step.features && (
                <div className="flex justify-center gap-3 mb-8">
                  {Step.features.map((feature, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 + idx * 0.1 }}
                      className="px-3 py-1.5 bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm rounded-full text-sm font-medium text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-600"
                    >
                      ✓ {feature}
                    </motion.div>
                  ))}
                </div>
              )}

              {/* Last Step - Options */}
              {currentStep === steps.length - 1 && (
                <div className="space-y-4 mt-8">
                  {/* Comparison Cards */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6"
                  >
                    {/* Sign Up Option */}
                    <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-2 border-blue-300 dark:border-blue-600 rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Shield className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                        <h3 className="font-bold text-blue-800 dark:text-blue-300">Create Account</h3>
                      </div>
                      <ul className="space-y-1.5 text-sm text-blue-700 dark:text-blue-400">
                        <li className="flex items-center gap-2">
                          <Check className="w-4 h-4" /> Cloud sync across devices
                        </li>
                        <li className="flex items-center gap-2">
                          <Check className="w-4 h-4" /> Never lose your data
                        </li>
                        <li className="flex items-center gap-2">
                          <Check className="w-4 h-4" /> Secure & private
                        </li>
                      </ul>
                    </div>

                    {/* Guest Mode Option */}
                    <div className="bg-gray-50 dark:bg-gray-800/50 border-2 border-gray-300 dark:border-gray-600 rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Zap className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                        <h3 className="font-bold text-gray-800 dark:text-gray-300">Guest Mode</h3>
                      </div>
                      <ul className="space-y-1.5 text-sm text-gray-600 dark:text-gray-400">
                        <li className="flex items-center gap-2">
                          <Check className="w-4 h-4" /> Start immediately
                        </li>
                        <li className="flex items-center gap-2">
                          <AlertCircle className="w-4 h-4" /> Local storage only
                        </li>
                        <li className="flex items-center gap-2">
                          <AlertCircle className="w-4 h-4" /> Data may be lost
                        </li>
                      </ul>
                    </div>
                  </motion.div>

                  {/* Sign Up Button (Primary) */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={onSignUp}
                    className="w-full px-6 py-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2"
                  >
                    <Check className="w-5 h-5" />
                    Create Account (Recommended)
                  </motion.button>

                  {/* Guest Mode Button (Secondary) */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={onContinueAsGuest}
                    className="w-full px-6 py-4 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 font-medium rounded-xl shadow transition-all duration-200 flex items-center justify-center gap-2"
                  >
                    <ArrowRight className="w-5 h-5" />
                    Continue as Guest
                  </motion.button>

                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                    You can create an account anytime to save your progress
                  </p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons (Not on last step) */}
          {currentStep < steps.length - 1 && (
            <div className="flex justify-between items-center mt-8">
              <button
                onClick={handlePrev}
                disabled={currentStep === 0}
                className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 disabled:opacity-0 disabled:cursor-not-allowed transition-opacity"
              >
                ← Back
              </button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleNext}
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-2"
              >
                Next
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </div>
          )}

          {/* Skip Button (Not on last step) */}
          {currentStep < steps.length - 1 && (
            <button
              onClick={() => setCurrentStep(steps.length - 1)}
              className="w-full mt-4 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
            >
              Skip tour
            </button>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default WelcomeScreen;
