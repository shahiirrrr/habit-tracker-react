import { useState, useCallback } from 'react';

/**
 * Custom hook for managing toast notifications
 * Usage:
 *   const { toast, toastState, closeToast } = useToast();
 *   toast.success('Habit added successfully!');
 *   toast.error('Failed to delete habit');
 */
export function useToast() {
  const [toastState, setToastState] = useState({
    isOpen: false,
    message: '',
    type: 'info',
  });

  const showToast = useCallback((message, type = 'info') => {
    setToastState({
      isOpen: true,
      message,
      type,
    });
  }, []);

  const closeToast = useCallback(() => {
    setToastState(prev => ({
      ...prev,
      isOpen: false,
    }));
  }, []);

  // Convenience methods for different toast types
  const toast = {
    success: (message) => showToast(message, 'success'),
    error: (message) => showToast(message, 'error'),
    warning: (message) => showToast(message, 'warning'),
    info: (message) => showToast(message, 'info'),
  };

  return {
    toast,
    toastState,
    closeToast,
  };
}
