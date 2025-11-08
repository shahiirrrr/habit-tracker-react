import { useState, useEffect } from 'react';
import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  onSnapshot,
  query,
  orderBy 
} from 'firebase/firestore';
import { db } from '../config/firebase';

/**
 * Custom hook for managing habits with Firebase Firestore
 * @param {string} userId - User ID for multi-user support (use 'default' for single user)
 * @returns {Object} - { habits, addHabit, updateHabit, deleteHabit, loading, error }
 */
export function useFirebaseHabits(userId = 'default') {
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Reference to the habits collection for this user
  const habitsCollectionRef = collection(db, `users/${userId}/habits`);

  // Real-time listener for habits
  useEffect(() => {
    setLoading(true);
    setError(null);

    const q = query(habitsCollectionRef, orderBy('createdAt', 'desc'));

    // Subscribe to real-time updates
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const habitsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setHabits(habitsData);
        setLoading(false);
      },
      (err) => {
        console.error('Error fetching habits:', err);
        setError(err.message);
        setLoading(false);
      }
    );

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [userId]);

  // Add a new habit
  const addHabit = async (habitData) => {
    try {
      const docRef = await addDoc(habitsCollectionRef, {
        ...habitData,
        createdAt: new Date().toISOString(),
        completedDates: habitData.completedDates || [],
      });
      return docRef.id;
    } catch (err) {
      console.error('Error adding habit:', err);
      setError(err.message);
      throw err;
    }
  };

  // Update an existing habit
  const updateHabit = async (habitId, updates) => {
    try {
      const habitRef = doc(db, `users/${userId}/habits`, habitId);
      await updateDoc(habitRef, updates);
    } catch (err) {
      console.error('Error updating habit:', err);
      setError(err.message);
      throw err;
    }
  };

  // Delete a habit
  const deleteHabit = async (habitId) => {
    try {
      const habitRef = doc(db, `users/${userId}/habits`, habitId);
      await deleteDoc(habitRef);
    } catch (err) {
      console.error('Error deleting habit:', err);
      setError(err.message);
      throw err;
    }
  };

  // Toggle habit completion for a specific date
  const toggleHabitCompletion = async (habitId, date) => {
    try {
      const habit = habits.find(h => h.id === habitId);
      if (!habit) return;

      const completedDates = habit.completedDates || [];
      const isCompleted = completedDates.includes(date);

      const updatedDates = isCompleted
        ? completedDates.filter(d => d !== date)
        : [...completedDates, date];

      await updateHabit(habitId, { completedDates: updatedDates });
    } catch (err) {
      console.error('Error toggling habit:', err);
      throw err;
    }
  };

  return {
    habits,
    addHabit,
    updateHabit,
    deleteHabit,
    toggleHabitCompletion,
    loading,
    error,
  };
}
