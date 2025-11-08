import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Sun, Moon, LogOut, User } from 'lucide-react';
import HabitCard from '../components/HabitCard';
import AddHabitModal from '../components/AddHabitModal';
import ConfirmationModal from '../components/ConfirmationModal';
import StatsDashboard from '../components/StatsDashboard';
import MotivationalGreeting from '../components/MotivationalGreeting';
import Confetti from '../components/Confetti';
import GuestWarningBanner from '../components/GuestWarningBanner';
import SettingsMenu from '../components/SettingsMenu';
import { StarDoodle, RocketDoodle, TrophyDoodle, SmileDoodle } from '../components/Doodles';
import { useFirebaseHabits } from '../hooks/useFirebaseHabits';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useAuth } from '../contexts/AuthContext';

const Home = () => {
  const { currentUser, isGuest, logout, exitGuestMode, deleteAccount } = useAuth();
  
  // Use Firebase for authenticated users, localStorage for guests
  const firebaseHabits = useFirebaseHabits(currentUser?.uid);
  const [localHabits, setLocalHabits] = useLocalStorage('guest_habits', []);
  
  // Choose data source based on auth status
  const habits = isGuest ? localHabits : firebaseHabits.habits;
  const loading = isGuest ? false : firebaseHabits.loading;
  const error = isGuest ? null : firebaseHabits.error;
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [confirmModal, setConfirmModal] = useState({ isOpen: false, habitId: null, habitName: '' });
  const [deleteAccountModal, setDeleteAccountModal] = useState(false);
  const [confettiTrigger, setConfettiTrigger] = useState(0);
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('theme');
    if (saved) return saved === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  const handleCelebrate = () => {
    setConfettiTrigger(prev => prev + 1);
  };

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

  const handleLogout = async () => {
    try {
      await logout();
    } catch (err) {
      console.error('Failed to logout:', err);
    }
  };

  const handleAddHabit = async (name, color, emoji) => {
    const colors = ['blue', 'green', 'purple', 'orange', 'pink', 'indigo'];
    const selectedColor = color || colors[Math.floor(Math.random() * colors.length)];
    const selectedEmoji = emoji || '🎯';
    
    if (isGuest) {
      // Guest mode - use local storage
      const newHabit = {
        id: Date.now().toString(),
        name,
        color: selectedColor,
        emoji: selectedEmoji,
        completedDates: [],
        createdAt: new Date().toISOString(),
      };
      setLocalHabits([...localHabits, newHabit]);
    } else {
      // Authenticated - use Firebase
      try {
        await firebaseHabits.addHabit({
          name,
          color: selectedColor,
          emoji: selectedEmoji,
          completedDates: [],
        });
      } catch (err) {
        console.error('Failed to add habit:', err);
        alert('Failed to add habit. Please try again.');
      }
    }
  };

  const handleToggleHabit = async (id) => {
    const today = new Date().toISOString().split('T')[0];
    
    if (isGuest) {
      // Guest mode - update local storage
      setLocalHabits(
        localHabits.map((habit) => {
          if (habit.id === id) {
            const completedDates = habit.completedDates || [];
            const isCompleted = completedDates.includes(today);

            if (isCompleted) {
              return {
                ...habit,
                completedDates: completedDates.filter((date) => date !== today),
              };
            } else {
              return {
                ...habit,
                completedDates: [...completedDates, today],
              };
            }
          }
          return habit;
        })
      );
    } else {
      // Authenticated - use Firebase
      try {
        await firebaseHabits.toggleHabitCompletion(id, today);
      } catch (err) {
        console.error('Failed to toggle habit:', err);
        alert('Failed to update habit. Please try again.');
      }
    }
  };

  const handleDeleteHabit = (id) => {
    const habit = habits.find(h => h.id === id);
    if (habit) {
      setConfirmModal({
        isOpen: true,
        habitId: id,
        habitName: habit.name,
      });
    }
  };

  const confirmDelete = async () => {
    if (confirmModal.habitId) {
      if (isGuest) {
        // Guest mode - update local storage
        setLocalHabits(localHabits.filter((habit) => habit.id !== confirmModal.habitId));
        setConfirmModal({ isOpen: false, habitId: null, habitName: '' });
      } else {
        // Authenticated - use Firebase
        try {
          await firebaseHabits.deleteHabit(confirmModal.habitId);
          setConfirmModal({ isOpen: false, habitId: null, habitName: '' });
        } catch (err) {
          console.error('Failed to delete habit:', err);
          alert('Failed to delete habit. Please try again.');
        }
      }
    }
  };

  const [showAuthPage, setShowAuthPage] = useState(false);

  const handleShowSignUp = () => {
    exitGuestMode();
    // The App will automatically show AuthPage when guest mode is exited
  };

  const handleShowLogin = () => {
    exitGuestMode();
  };

  const handleDeleteAccountClick = () => {
    setDeleteAccountModal(true);
  };

  const confirmDeleteAccount = async () => {
    try {
      await deleteAccount();
      // User will be automatically logged out and redirected
      setDeleteAccountModal(false);
    } catch (err) {
      console.error('Failed to delete account:', err);
      
      // Check if re-authentication is needed
      if (err.code === 'auth/requires-recent-login') {
        alert('For security, please log out and log back in before deleting your account.');
      } else {
        alert('Failed to delete account. Please try again or contact support.');
      }
      setDeleteAccountModal(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      {/* Navbar */}
      <nav className="glass border-b border-white/20 dark:border-gray-700/20 sticky top-0 z-30 backdrop-blur-md bg-white/80 dark:bg-gray-900/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2"
            >
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
                className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center"
              >
                <span className="text-white font-bold text-sm">HD</span>
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
              >
                HabitDaily
              </motion.h1>
            </motion.div>
            <div className="flex items-center gap-3">
              {/* User Info */}
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-gray-100 dark:bg-gray-800 rounded-lg">
                <User className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  {isGuest 
                    ? 'Guest User' 
                    : (currentUser?.displayName || currentUser?.email?.split('@')[0] || 'User')
                  }
                </span>
              </div>

              {/* Theme Toggle */}
              <motion.button
                whileHover={{ scale: 1.1, rotate: 15 }}
                whileTap={{ scale: 0.9 }}
                onClick={toggleTheme}
                className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
                aria-label="Toggle theme"
              >
                {isDark ? (
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                  >
                    <Sun className="w-5 h-5 text-yellow-500" />
                  </motion.div>
                ) : (
                  <Moon className="w-5 h-5 text-gray-700" />
                )}
              </motion.button>

              {/* Settings Menu - Only show for authenticated users */}
              {!isGuest && (
                <SettingsMenu 
                  user={currentUser}
                  onDeleteAccount={handleDeleteAccountClick}
                  onLogout={handleLogout}
                />
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Guest Warning Banner */}
      {isGuest && (
        <GuestWarningBanner 
          onSignUp={handleShowSignUp}
          onLogin={handleShowLogin}
        />
      )}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-400">Loading your habits...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-100 dark:bg-red-900/20 border border-red-400 text-red-700 dark:text-red-400 px-4 py-3 rounded mb-4">
            <strong className="font-bold">Error: </strong>
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        {!loading && !error && (
          <>
        {/* Motivational Greeting */}
        {habits.length > 0 && (
          <MotivationalGreeting
            completionRate={
              habits.length > 0
                ? Math.round(
                    (habits.filter(h => h.completedDates?.includes(new Date().toISOString().split('T')[0])).length /
                      habits.length) *
                      100
                  )
                : 0
            }
            totalHabits={habits.length}
          />
        )}

        {/* Stats Dashboard */}
        {habits.length > 0 && <StatsDashboard habits={habits} />}

        {/* Header Section */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100 mb-2">
                Your Habits
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Build consistency, one day at a time
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsModalOpen(true)}
              className="hidden sm:flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <Plus className="w-5 h-5" />
              <span>Add Habit</span>
            </motion.button>
          </div>

          {/* Mobile Add Habit Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setIsModalOpen(true)}
            className="sm:hidden w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2 mb-6"
          >
            <Plus className="w-5 h-5" />
            <span>Add New Habit</span>
          </motion.button>
        </div>

        {/* Habits Grid */}
        {habits.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <div className="glass rounded-2xl p-8 md:p-12 max-w-md mx-auto bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 relative overflow-hidden">
              {/* Floating Doodles */}
              <motion.div
                className="absolute top-4 left-4 text-yellow-400 opacity-60"
                animate={{ 
                  y: [0, -10, 0],
                  rotate: [0, 10, -10, 0]
                }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              >
                <StarDoodle className="w-12 h-12" />
              </motion.div>
              <motion.div
                className="absolute top-4 right-4 text-pink-400 opacity-60"
                animate={{ 
                  y: [0, -15, 0],
                  rotate: [0, -15, 15, 0]
                }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
              >
                <RocketDoodle className="w-12 h-12" />
              </motion.div>
              <motion.div
                className="absolute bottom-4 left-8 text-green-400 opacity-60"
                animate={{ 
                  y: [0, -8, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              >
                <SmileDoodle className="w-10 h-10" />
              </motion.div>

              <div className="mb-6 relative z-10">
                <motion.div
                  animate={{ 
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                  className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center"
                >
                  <Plus className="w-10 h-10 text-white" />
                </motion.div>
                <motion.h3
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2"
                >
                  Start Your Journey! 🚀
                </motion.h3>
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-gray-600 dark:text-gray-400 text-lg mb-6"
                >
                  Create your first habit and begin building consistency!
                </motion.p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05, rotate: 2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsModalOpen(true)}
                className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 relative z-10"
              >
                Add Your First Habit
              </motion.button>
            </div>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            <AnimatePresence mode="popLayout">
              {habits.map((habit, index) => (
                <HabitCard
                  key={habit.id}
                  habit={habit}
                  onToggle={handleToggleHabit}
                  onDelete={handleDeleteHabit}
                  color={habit.color}
                  onCelebrate={handleCelebrate}
                />
              ))}
            </AnimatePresence>
          </div>
        )}
          </>
        )}
      </main>

      {/* Add Habit Modal */}
      <AddHabitModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAddHabit}
      />

      {/* Confirmation Modal - Delete Habit */}
      <ConfirmationModal
        isOpen={confirmModal.isOpen}
        onClose={() => setConfirmModal({ isOpen: false, habitId: null, habitName: '' })}
        onConfirm={confirmDelete}
        title="Delete Habit?"
        message={`Are you sure you want to delete "${confirmModal.habitName}"? This action cannot be undone and all your progress will be lost.`}
        confirmText="Delete"
        cancelText="Cancel"
        type="danger"
        preventBackdropClose={true}
      />

      {/* Confirmation Modal - Delete Account */}
      <ConfirmationModal
        isOpen={deleteAccountModal}
        onClose={() => setDeleteAccountModal(false)}
        onConfirm={confirmDeleteAccount}
        title="Delete Account?"
        message="⚠️ WARNING: This will permanently delete your account and ALL your habits. This action cannot be undone! Are you absolutely sure?"
        confirmText="Yes, Delete My Account"
        cancelText="Cancel"
        type="danger"
        preventBackdropClose={true}
      />

      {/* Confetti Celebration */}
      <Confetti trigger={confettiTrigger} />
    </div>
  );
};

export default Home;

