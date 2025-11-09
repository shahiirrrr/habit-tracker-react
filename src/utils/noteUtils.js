/**
 * Utility functions for habit notes/journal
 */

/**
 * Get note for a specific date from habit's notes object
 */
export function getNoteForDate(habit, date) {
  if (!habit.notes || typeof habit.notes !== 'object') return null;
  return habit.notes[date] || null;
}

/**
 * Check if habit has a note for a specific date
 */
export function hasNoteForDate(habit, date) {
  return !!getNoteForDate(habit, date);
}

/**
 * Get all notes for a habit as an array sorted by date (newest first)
 */
export function getAllNotes(habit) {
  if (!habit.notes || typeof habit.notes !== 'object') return [];
  
  return Object.entries(habit.notes)
    .map(([date, content]) => ({
      date,
      content,
      // Parse date for sorting
      timestamp: new Date(date).getTime()
    }))
    .sort((a, b) => b.timestamp - a.timestamp); // Newest first
}

/**
 * Get count of total notes for a habit
 */
export function getNoteCount(habit) {
  if (!habit.notes || typeof habit.notes !== 'object') return 0;
  return Object.keys(habit.notes).length;
}

/**
 * Format note content (trim, validate length)
 */
export function formatNoteContent(content, maxLength = 500) {
  if (!content) return '';
  const trimmed = content.trim();
  return trimmed.length > maxLength ? trimmed.substring(0, maxLength) : trimmed;
}

/**
 * Validate note content
 */
export function validateNote(content, maxLength = 500) {
  if (!content || content.trim().length === 0) {
    return { valid: false, error: 'Note cannot be empty' };
  }
  
  if (content.length > maxLength) {
    return { valid: false, error: `Note must be ${maxLength} characters or less` };
  }
  
  return { valid: true, error: null };
}

/**
 * Get notes count for last N days
 */
export function getRecentNotesCount(habit, days = 7) {
  const notes = getAllNotes(habit);
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - days);
  const cutoffTimestamp = cutoffDate.getTime();
  
  return notes.filter(note => note.timestamp >= cutoffTimestamp).length;
}

/**
 * Search notes by content
 */
export function searchNotes(habit, searchTerm) {
  if (!searchTerm) return getAllNotes(habit);
  
  const notes = getAllNotes(habit);
  const lowerSearch = searchTerm.toLowerCase();
  
  return notes.filter(note => 
    note.content.toLowerCase().includes(lowerSearch)
  );
}

/**
 * Get note statistics
 */
export function getNoteStats(habit) {
  const notes = getAllNotes(habit);
  const totalNotes = notes.length;
  
  if (totalNotes === 0) {
    return {
      total: 0,
      averageLength: 0,
      longestNote: 0,
      shortestNote: 0,
      totalWords: 0
    };
  }
  
  const lengths = notes.map(note => note.content.length);
  const wordCounts = notes.map(note => 
    note.content.trim() ? note.content.trim().split(/\s+/).length : 0
  );
  
  return {
    total: totalNotes,
    averageLength: Math.round(lengths.reduce((a, b) => a + b, 0) / totalNotes),
    longestNote: Math.max(...lengths),
    shortestNote: Math.min(...lengths),
    totalWords: wordCounts.reduce((a, b) => a + b, 0)
  };
}
