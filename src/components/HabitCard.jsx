import { motion } from 'framer-motion';
import { CheckCircle2, Circle, Flame, Calendar, TrendingUp } from 'lucide-react';

const HabitCard = ({ habit, onToggle, onDelete, color = 'blue' }) => {
  const isCompletedToday = habit.completedDates?.includes(getTodayKey()) || false;
  const streak = calculateStreak(habit.completedDates || []);
  const weekProgress = getWeekProgress(habit.completedDates || []);
  const totalDays = habit.completedDates?.length || 0;
  const completionRate = getCompletionRate(habit.completedDates || [], habit.createdAt);

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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      className={`glass rounded-2xl p-4 md:p-6 shadow-lg hover:shadow-xl transition-shadow duration-200 border-2 ${bgClass}`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg md:text-xl font-semibold text-gray-800 dark:text-gray-100 truncate">
              {habit.name}
            </h3>
            <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${gradientClass}`} />
          </div>
          
          {/* Stats Row */}
          <div className="flex flex-wrap items-center gap-3 mb-4">
            {streak > 0 && (
              <div className="flex items-center gap-1 text-orange-500 bg-orange-50 dark:bg-orange-900/30 px-2 py-1 rounded-lg">
                <Flame className="w-4 h-4" />
                <span className="text-sm font-medium">{streak}</span>
              </div>
            )}
            {totalDays > 0 && (
              <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-lg">
                <TrendingUp className="w-4 h-4" />
                <span className="text-sm">{totalDays} total</span>
              </div>
            )}
            {completionRate > 0 && (
              <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-lg">
                <span className="text-sm">{completionRate}%</span>
              </div>
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
                <div
                  key={index}
                  className={`flex-1 h-6 rounded ${
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
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
            <button
              onClick={() => onToggle(habit.id)}
              className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                isCompletedToday
                  ? 'bg-green-500 text-white hover:bg-green-600 shadow-lg'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              {isCompletedToday ? (
                <>
                  <CheckCircle2 className="w-5 h-5" />
                  <span>Completed</span>
                </>
              ) : (
                <>
                  <Circle className="w-5 h-5" />
                  <span>Mark Complete</span>
                </>
              )}
            </button>

            <button
              onClick={() => onDelete(habit.id)}
              className="px-4 py-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors duration-200 text-sm font-medium"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

/**
 * Get today's date as a string key (YYYY-MM-DD)
 */
function getTodayKey() {
  return new Date().toISOString().split('T')[0];
}

/**
 * Calculate the current streak from completed dates
 * Streak is consecutive days up to and including today
 * If today is not completed, streak is 0
 */
function calculateStreak(completedDates) {
  if (!completedDates || completedDates.length === 0) return 0;

  const today = getTodayKey();
  const completedSet = new Set(completedDates);
  
  // If today is not completed, streak is 0
  if (!completedSet.has(today)) return 0;

  // Start from today and count backwards
  let streak = 1;
  const todayDate = new Date(today);
  let checkDate = new Date(todayDate);
  
  // Check previous days consecutively
  while (true) {
    checkDate.setDate(checkDate.getDate() - 1);
    const dateKey = checkDate.toISOString().split('T')[0];
    
    if (completedSet.has(dateKey)) {
      streak++;
    } else {
      break;
    }
  }

  return streak;
}

/**
 * Get completion rate based on days since creation
 */
function getCompletionRate(completedDates, createdAt) {
  if (!completedDates || completedDates.length === 0) return 0;
  if (!createdAt) return 0;
  
  const created = new Date(createdAt);
  const today = new Date();
  const daysSinceCreation = Math.ceil((today - created) / (1000 * 60 * 60 * 24)) + 1;
  
  if (daysSinceCreation <= 1) return 0;
  
  // Use unique dates to avoid counting multiple completions per day
  const uniqueDates = new Set(completedDates).size;
  const rate = Math.round((uniqueDates / daysSinceCreation) * 100);
  
  return Math.min(rate, 100); // Cap at 100%
}

/**
 * Get week progress (last 7 days)
 */
function getWeekProgress(completedDates) {
  const weekProgress = [];
  const today = new Date();
  const completedSet = new Set(completedDates);
  
  for (let i = 6; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const dateKey = date.toISOString().split('T')[0];
    const isToday = i === 0;
    
    weekProgress.push({
      date: dateKey,
      completed: completedSet.has(dateKey),
      isToday,
    });
  }
  
  return weekProgress;
}

export default HabitCard;

