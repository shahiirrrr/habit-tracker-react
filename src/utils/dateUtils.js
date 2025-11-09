/**
 * Date utility functions for habit tracking
 * Handles timezone-safe date operations
 */

/**
 * Get today's date as a string key in local timezone (YYYY-MM-DD)
 * This fixes the timezone bug by using local date instead of UTC
 */
export function getTodayKey() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Convert a Date object to local date string (YYYY-MM-DD)
 */
export function dateToLocalKey(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Get a date key for N days ago
 */
export function getDaysAgo(daysAgo = 0) {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  return dateToLocalKey(date);
}

/**
 * Calculate the current streak from completed dates
 * Streak is consecutive days up to and including today
 * If today is not completed, streak is 0
 * FIXED: Uses local timezone dates
 */
export function calculateStreak(completedDates) {
  if (!completedDates || completedDates.length === 0) return 0;

  const today = getTodayKey();
  const completedSet = new Set(completedDates);
  
  // If today is not completed, streak is 0
  if (!completedSet.has(today)) return 0;

  // Start from today and count backwards
  let streak = 1;
  let currentDate = new Date();
  
  // Check previous days consecutively
  while (true) {
    currentDate.setDate(currentDate.getDate() - 1);
    const dateKey = dateToLocalKey(currentDate);
    
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
 * FIXED: Handles same-day creation and completion correctly
 */
export function getCompletionRate(completedDates, createdAt) {
  if (!completedDates || completedDates.length === 0) return 0;
  if (!createdAt) return 0;
  
  const created = new Date(createdAt);
  const today = new Date();
  
  // Calculate days since creation (inclusive of both start and end day)
  const daysSinceCreation = Math.floor((today - created) / (1000 * 60 * 60 * 24)) + 1;
  
  // FIXED: If created today and completed, should show 100%
  if (daysSinceCreation === 1) {
    return completedDates.length > 0 ? 100 : 0;
  }
  
  // Use unique dates to avoid counting multiple completions per day
  const uniqueDates = new Set(completedDates).size;
  const rate = Math.round((uniqueDates / daysSinceCreation) * 100);
  
  return Math.min(rate, 100); // Cap at 100%
}

/**
 * Get week progress (last 7 days)
 * FIXED: Uses local timezone
 */
export function getWeekProgress(completedDates) {
  const weekProgress = [];
  const completedSet = new Set(completedDates);
  
  for (let i = 6; i >= 0; i--) {
    const dateKey = getDaysAgo(i);
    const isToday = i === 0;
    
    weekProgress.push({
      date: dateKey,
      completed: completedSet.has(dateKey),
      isToday,
    });
  }
  
  return weekProgress;
}

/**
 * Format date for display (e.g., "Nov 9, 2024")
 */
export function formatDate(dateString) {
  const date = new Date(dateString + 'T00:00:00'); // Prevent timezone shift
  return date.toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric', 
    year: 'numeric' 
  });
}

/**
 * Format date for display (e.g., "Monday, Nov 9")
 */
export function formatDateWithDay(dateString) {
  const date = new Date(dateString + 'T00:00:00');
  return date.toLocaleDateString('en-US', { 
    weekday: 'long',
    month: 'short', 
    day: 'numeric'
  });
}

/**
 * Check if a date string is today
 */
export function isToday(dateString) {
  return dateString === getTodayKey();
}

/**
 * Check if a date string is yesterday
 */
export function isYesterday(dateString) {
  return dateString === getDaysAgo(1);
}

/**
 * Get days between two dates
 */
export function daysBetween(date1String, date2String) {
  const date1 = new Date(date1String + 'T00:00:00');
  const date2 = new Date(date2String + 'T00:00:00');
  const diffTime = Math.abs(date2 - date1);
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}
