import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Sun, Moon } from 'lucide-react';
import HabitCard from '../components/HabitCard';
import AddHabitModal from '../components/AddHabitModal';
import { useLocalStorage } from '../hooks/useLocalStorage';

const Home = () => {
  const [habits, setHabits] = useLocalStorage('habits', []);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('theme');
    if (saved) return saved === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // Apply theme to document
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  const handleAddHabit = (name) => {
    const newHabit = {
      id: Date.now().toString(),
      name,
      completedDates: [],
      createdAt: new Date().toISOString(),
    };
    setHabits([...habits, newHabit]);
  };

  const handleToggleHabit = (id) => {
    const today = new Date().toISOString().split('T')[0];
    setHabits(
      habits.map((habit) => {
        if (habit.id === id) {
          const completedDates = habit.completedDates || [];
          const isCompleted = completedDates.includes(today);

          if (isCompleted) {
            // Remove today's completion
            return {
              ...habit,
              completedDates: completedDates.filter((date) => date !== today),
            };
          } else {
            // Add today's completion
            return {
              ...habit,
              completedDates: [...completedDates, today],
            };
          }
        }
        return habit;
      })
    );
  };

  const handleDeleteHabit = (id) => {
    if (window.confirm('Are you sure you want to delete this habit?')) {
      setHabits(habits.filter((habit) => habit.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      {/* Navbar */}
      <nav className="glass border-b border-white/20 dark:border-gray-700/20 sticky top-0 z-30 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
              HabitDaily
            </h1>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
              aria-label="Toggle theme"
            >
              {isDark ? (
                <Sun className="w-5 h-5 text-yellow-500" />
              ) : (
                <Moon className="w-5 h-5 text-gray-700" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100 mb-2">
            Your Habits
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Build consistency, one day at a time
          </p>
        </div>

        {/* Add Habit Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setIsModalOpen(true)}
          className="mb-6 w-full sm:w-auto px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2"
        >
          <Plus className="w-5 h-5" />
          <span>Add New Habit</span>
        </motion.button>

        {/* Habits Grid */}
        {habits.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="glass rounded-2xl p-8 md:p-12 max-w-md mx-auto">
              <p className="text-gray-600 dark:text-gray-400 text-lg mb-4">
                No habits yet. Start building your routine!
              </p>
              <button
                onClick={() => setIsModalOpen(true)}
                className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition-colors duration-200"
              >
                Add Your First Habit
              </button>
            </div>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            <AnimatePresence mode="popLayout">
              {habits.map((habit) => (
                <HabitCard
                  key={habit.id}
                  habit={habit}
                  onToggle={handleToggleHabit}
                  onDelete={handleDeleteHabit}
                />
              ))}
            </AnimatePresence>
          </div>
        )}
      </main>

      {/* Add Habit Modal */}
      <AddHabitModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAddHabit}
      />
    </div>
  );
};

export default Home;

