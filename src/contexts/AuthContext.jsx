import { createContext, useContext, useState, useEffect } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  updateProfile,
  deleteUser
} from 'firebase/auth';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { auth, googleProvider, db } from '../config/firebase';

const AuthContext = createContext({});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isGuest, setIsGuest] = useState(false);

  // Sign up with email and password
  const signup = async (email, password, displayName) => {
    try {
      setError(null);
      const result = await createUserWithEmailAndPassword(auth, email, password);
      
      // Update display name
      if (displayName) {
        await updateProfile(result.user, { displayName });
      }
      
      return result.user;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  // Sign in with email and password
  const login = async (email, password) => {
    try {
      setError(null);
      const result = await signInWithEmailAndPassword(auth, email, password);
      return result.user;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  // Sign in with Google
  const signInWithGoogle = async () => {
    try {
      setError(null);
      const result = await signInWithPopup(auth, googleProvider);
      return result.user;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  // Sign out
  const logout = async () => {
    try {
      setError(null);
      await signOut(auth);
      // Reset welcome screen flag so user sees it again with guest option
      localStorage.removeItem('hasSeenWelcome');
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  // Continue as guest
  const continueAsGuest = () => {
    setIsGuest(true);
    setLoading(false);
    localStorage.setItem('guestMode', 'true');
  };

  // Exit guest mode
  const exitGuestMode = () => {
    setIsGuest(false);
    localStorage.removeItem('guestMode');
  };

  // Delete user account and all their data
  const deleteAccount = async () => {
    try {
      setError(null);
      
      if (!currentUser) {
        throw new Error('No user is currently logged in');
      }

      const userId = currentUser.uid;

      // Step 1: Delete all user's habits from Firestore
      const habitsRef = collection(db, `users/${userId}/habits`);
      const habitsSnapshot = await getDocs(habitsRef);
      
      const deletePromises = habitsSnapshot.docs.map((habitDoc) => 
        deleteDoc(doc(db, `users/${userId}/habits`, habitDoc.id))
      );
      
      await Promise.all(deletePromises);

      // Step 2: Delete the user's authentication account
      await deleteUser(currentUser);

      // Step 3: Reset welcome screen flag so user sees welcome screen with guest option
      localStorage.removeItem('hasSeenWelcome');

      // User will be automatically signed out and redirected to welcome screen
      return true;
    } catch (err) {
      console.error('Error deleting account:', err);
      setError(err.message);
      throw err;
    }
  };

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      if (user) {
        setIsGuest(false);
        localStorage.removeItem('guestMode');
      }
      setLoading(false);
    });

    // Check if user was in guest mode
    const guestMode = localStorage.getItem('guestMode');
    if (guestMode === 'true' && !currentUser) {
      setIsGuest(true);
      setLoading(false);
    }

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    isGuest,
    signup,
    login,
    signInWithGoogle,
    logout,
    continueAsGuest,
    exitGuestMode,
    deleteAccount,
    loading,
    error
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
