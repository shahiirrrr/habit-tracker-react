import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Circle, Flame, Calendar, TrendingUp, Sparkles, FileText, BookOpen } from 'lucide-react';
import { useState } from 'react';
import { getTodayKey, calculateStreak, getCompletionRate, getWeekProgress } from '../utils/dateUtils';
import { getNoteCount, hasNoteForDate } from '../utils/noteUtils';

const HabitCard = ({ habit, onToggle, onDelete, color = 'blue', onCelebrate, onAddNote, onViewNotes }) => {
  const isCompletedToday = habit.completedDates?.includes(getTodayKey()) || false;
  const streak = calculateStreak(habit.completedDates || []);
  const weekProgress = getWeekProgress(habit.completedDates || []);
  const totalDays = habit.completedDates?.length || 0;
  const completionRate = getCompletionRate(habit.completedDates || [], habit.createdAt);
  const [showCelebration, setShowCelebration] = useState(false);
  const noteCount = getNoteCount(habit);
  const hasTodayNote = hasNoteForDate(habit, getTodayKey());

  const handleToggle = () => {
    const wasCompleted = isCompletedToday;
    onToggle(habit.id);
    
    // Show celebration if completing (not uncompleting)
    if (!wasCompleted && onCelebrate) {
      setShowCelebration(true);
      onCelebrate();
      setTimeout(() => setShowCelebration(false), 2000);
    }
  };

  const colorClasses = {
    blue: 'from-blue-500 to-blue-600',
    green: 'from-green-500 to-green-600',
    purple: 'from-purple-500 to-purple-600',
    orange: 'from-orange-500 to-orange-600',
    pink: 'from-pink-500 to-pink-600',
    indigo: 'from-indigo-500 to-indigo-600',
  };

  const bgColorClasses = {
    blue: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800',
    green: 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800',
    purple: 'bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800',
    orange: 'bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800',
    pink: 'bg-pink-50 dark:bg-pink-900/20 border-pink-200 dark:border-pink-800',
    indigo: 'bg-indigo-50 dark:bg-indigo-900/20 border-indigo-200 dark:border-indigo-800',
  };

  const habitColor = habit.color || color;
  const gradientClass = colorClasses[habitColor] || colorClasses.blue;
  const bgClass = bgColorClasses[habitColor] || bgColorClasses.blue;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8, y: -20 }}
      whileHover={{ scale: 1.02, y: -5 }}
      transition={{ 
        type: "spring", 
        stiffness: 300, 
        damping: 20,
        hover: { duration: 0.2 }
      }}
      className={`glass rounded-2xl p-4 md:p-6 shadow-lg hover:shadow-2xl transition-shadow duration-200 border-2 relative overflow-hidden ${bgClass}`}
    >
      {/* Celebration Overlay */}
      <AnimatePresence>
        {showCelebration && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1.5 }}
            exit={{ opacity: 0, scale: 2 }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none z-10"
          >
            <motion.div
              animate={{ 
                rotate: [0, 360],
                scale: [1, 1.2, 1]
              }}
              transition={{ duration: 0.6 }}
              className="text-yellow-400"
            >
              <Sparkles className="w-16 h-16" fill="currentColor" />
            </motion.div>
            <motion.div
              initial={{ scale: 0, y: 0 }}
              animate={{ scale: 1, y: -20 }}
              className="absolute text-white font-bold text-xl"
            >
              🎉 Great Job!
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg md:text-xl font-semibold text-gray-800 dark:text-gray-100 truncate">
              {habit.name}
            </h3>
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              whileHover={{ scale: 1.2, rotate: 10 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="flex items-center gap-2"
            >
              {habit.emoji && (
                <span className="text-2xl">{habit.emoji}</span>
              )}
              <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${gradientClass}`} />
            </motion.div>
          </div>
          
          {/* Stats Row */}
          <div className="flex flex-wrap items-center gap-3 mb-4">
            {noteCount > 0 && (
              <motion.button
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onViewNotes(habit)}
                className="flex items-center gap-1 text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/30 px-2 py-1 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/50 transition-colors"
                title="View journal entries"
              >
                <BookOpen className="w-4 h-4" />
                <span className="text-sm font-medium">{noteCount}</span>
              </motion.button>
            )}
            {streak > 0 && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="flex items-center gap-1 text-orange-500 bg-orange-50 dark:bg-orange-900/30 px-2 py-1 rounded-lg"
              >
                <motion.div
                  animate={{ 
                    scale: [1, 1.2, 1],
                    rotate: [0, 10, -10, 0]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Flame className="w-4 h-4" fill="currentColor" />
                </motion.div>
                <span className="text-sm font-medium">{streak}</span>
              </motion.div>
            )}
            {totalDays > 0 && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-1 text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-lg"
              >
                <TrendingUp className="w-4 h-4" />
                <span className="text-sm">{totalDays} total</span>
              </motion.div>
            )}
            {completionRate > 0 && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-1 text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-lg"
              >
                <span className="text-sm">{completionRate}%</span>
              </motion.div>
            )}
          </div>

          {/* Progress Bar */}
          {completionRate > 0 && (
            <div className="mb-4">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-gray-600 dark:text-gray-400">Overall Progress</span>
                <span className="text-xs font-medium text-gray-700 dark:text-gray-300">{completionRate}%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${completionRate}%` }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className={`h-2 bg-gradient-to-r ${gradientClass} rounded-full`}
                />
              </div>
            </div>
          )}

          {/* Mini Week Calendar */}
          <div className="mb-4">
            <div className="flex items-center gap-1 mb-2">
              <Calendar className="w-3 h-3 text-gray-500 dark:text-gray-400" />
              <span className="text-xs text-gray-600 dark:text-gray-400">This Week</span>
            </div>
            <div className="flex gap-1">
              {weekProgress.map((day, index) => (
                <motion.div
                  key={index}
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: index * 0.05, type: "spring", stiffness: 200 }}
                  whileHover={{ scale: 1.2, zIndex: 10 }}
                  className={`flex-1 h-6 rounded cursor-pointer ${
                    day.completed
                      ? `bg-gradient-to-br ${gradientClass}`
                      : 'bg-gray-200 dark:bg-gray-700'
                  } ${day.isToday ? 'ring-2 ring-gray-400 dark:ring-gray-500' : ''}`}
                  title={day.date}
                />
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleToggle}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 relative overflow-hidden ${
                  isCompletedToday
                    ? 'bg-green-500 text-white hover:bg-green-600 shadow-lg'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                }`}
              >
              {isCompletedToday ? (
                <>
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 0.5 }}
                  >
                    <CheckCircle2 className="w-5 h-5" />
                  </motion.div>
                  <span>Completed</span>
                </>
              ) : (
                <>
                  <Circle className="w-5 h-5" />
                  <span>Mark Complete</span>
                </>
              )}
              </motion.button>

              {/* Add/Edit Note Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onAddNote(habit, getTodayKey())}
                className={`p-2 rounded-lg transition-colors duration-200 ${
                  hasTodayNote
                    ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 hover:bg-purple-200 dark:hover:bg-purple-900/50'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-300 dark:hover:bg-gray-600'
                }`}
                title={hasTodayNote ? 'Edit today\'s note' : 'Add a note'}
              >
                <FileText className="w-5 h-5" />
              </motion.button>
            </div>

            {/* Delete Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onDelete(habit.id)}
              className="w-full px-4 py-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors duration-200 text-sm font-medium"
            >
              Delete Habit
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default HabitCard;

