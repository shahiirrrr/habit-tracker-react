import { motion } from 'framer-motion';
import { Target, CheckCircle2, Flame, TrendingUp } from 'lucide-react';

const StatsDashboard = ({ habits }) => {
  const today = new Date().toISOString().split('T')[0];
  
  // Calculate stats
  const totalHabits = habits.length;
  const todayCompletions = habits.filter(habit => 
    habit.completedDates?.includes(today)
  ).length;
  
  const totalCompletions = habits.reduce((sum, habit) => 
    sum + (habit.completedDates?.length || 0), 0
  );
  
  const longestStreak = habits.reduce((max, habit) => {
    const streak = calculateStreak(habit.completedDates || []);
    return Math.max(max, streak);
  }, 0);

  const completionRate = totalHabits > 0 
    ? Math.round((todayCompletions / totalHabits) * 100) 
    : 0;

  const stats = [
    {
      label: 'Total Habits',
      value: totalHabits,
      icon: Target,
      color: 'text-blue-500',
      bgColor: 'bg-blue-100 dark:bg-blue-900/30',
    },
    {
      label: "Today's Progress",
      value: `${todayCompletions}/${totalHabits}`,
      icon: CheckCircle2,
      color: 'text-green-500',
      bgColor: 'bg-green-100 dark:bg-green-900/30',
      subtitle: `${completionRate}% completed`,
    },
    {
      label: 'Total Completions',
      value: totalCompletions,
      icon: TrendingUp,
      color: 'text-purple-500',
      bgColor: 'bg-purple-100 dark:bg-purple-900/30',
    },
    {
      label: 'Longest Streak',
      value: longestStreak,
      icon: Flame,
      color: 'text-orange-500',
      bgColor: 'bg-orange-100 dark:bg-orange-900/30',
      subtitle: longestStreak > 0 ? `${longestStreak} days` : 'No streak yet',
    },
  ];

  if (totalHabits === 0) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ 
              delay: index * 0.1,
              type: "spring",
              stiffness: 200,
              damping: 15
            }}
            whileHover={{ 
              scale: 1.05, 
              y: -5,
              transition: { duration: 0.2 }
            }}
            className="glass rounded-xl p-4 shadow-lg hover:shadow-xl transition-shadow duration-200 cursor-pointer"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                  {stat.label}
                </p>
                <motion.p
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: index * 0.1 + 0.2, type: "spring" }}
                  className="text-2xl font-bold text-gray-800 dark:text-gray-100"
                >
                  {stat.value}
                </motion.p>
                {stat.subtitle && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.1 + 0.3 }}
                    className="text-xs text-gray-500 dark:text-gray-500 mt-1"
                  >
                    {stat.subtitle}
                  </motion.p>
                )}
              </div>
              <motion.div
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity, 
                  delay: index * 0.2,
                  ease: 'easeInOut'
                }}
                className={`${stat.bgColor} p-3 rounded-lg`}
              >
                <Icon className={`w-5 h-5 ${stat.color}`} />
              </motion.div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

function calculateStreak(completedDates) {
  if (!completedDates || completedDates.length === 0) return 0;
  const today = new Date().toISOString().split('T')[0];
  const completedSet = new Set(completedDates);
  if (!completedSet.has(today)) return 0;
  
  let streak = 1;
  const todayDate = new Date(today);
  let checkDate = new Date(todayDate);
  
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

export default StatsDashboard;

