import { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Home from './pages/Home';
import AuthPage from './pages/AuthPage';
import WelcomeScreen from './components/WelcomeScreen';

// App version for localStorage migration
const APP_VERSION = '2.0.0';

function AppContent() {
  const { currentUser, isGuest, continueAsGuest } = useAuth();
  const [showWelcome, setShowWelcome] = useState(false);

  useEffect(() => {
    // Check and migrate localStorage if needed
    const storedVersion = localStorage.getItem('appVersion');
    
    // If version mismatch or no version, clear old flags and set new version
    if (storedVersion !== APP_VERSION) {
      console.log('Migrating app data to version', APP_VERSION);
      
      // Clear old welcome screen flags but keep user data
      localStorage.removeItem('hasSeenWelcome');
      
      // Set new version
      localStorage.setItem('appVersion', APP_VERSION);
    }

    // Check if user has seen welcome screen
    const hasSeenWelcome = localStorage.getItem('hasSeenWelcome');
    if (!hasSeenWelcome && !currentUser && !isGuest) {
      setShowWelcome(true);
    }
  }, [currentUser, isGuest]);

  const handleContinueAsGuest = () => {
    localStorage.setItem('hasSeenWelcome', 'true');
    continueAsGuest();
    setShowWelcome(false);
  };

  const handleSignUp = () => {
    localStorage.setItem('hasSeenWelcome', 'true');
    setShowWelcome(false);
  };

  // Show welcome screen for first-time visitors
  if (showWelcome) {
    return (
      <WelcomeScreen 
        onContinueAsGuest={handleContinueAsGuest}
        onSignUp={handleSignUp}
      />
    );
  }

  // Show home for authenticated or guest users
  if (currentUser || isGuest) {
    return <Home />;
  }

  // Show auth page for non-authenticated users who skipped welcome
  return <AuthPage />;
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;

