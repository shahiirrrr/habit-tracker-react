import { motion } from 'framer-motion';
import { CheckCircle2, Circle, Flame } from 'lucide-react';

const HabitCard = ({ habit, onToggle, onDelete }) => {
  const isCompletedToday = habit.completedDates?.includes(getTodayKey()) || false;
  const streak = calculateStreak(habit.completedDates || []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      className="glass rounded-2xl p-4 md:p-6 shadow-lg hover:shadow-xl transition-shadow duration-200"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <h3 className="text-lg md:text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2 truncate">
            {habit.name}
          </h3>
          
          <div className="flex items-center gap-3 mb-3">
            {streak > 0 && (
              <div className="flex items-center gap-1 text-orange-500">
                <Flame className="w-4 h-4" />
                <span className="text-sm font-medium">{streak} day{streak !== 1 ? 's' : ''}</span>
              </div>
            )}
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
            <button
              onClick={() => onToggle(habit.id)}
              className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                isCompletedToday
                  ? 'bg-green-500 text-white hover:bg-green-600'
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

export default HabitCard;

