import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, FileText, Search, Edit2, Trash2, Calendar, TrendingUp } from 'lucide-react';
import { getAllNotes, searchNotes, getNoteStats } from '../utils/noteUtils';
import { formatDateWithDay, isToday, isYesterday } from '../utils/dateUtils';

/**
 * Modal to view all notes history for a specific habit
 */
const NotesHistoryModal = ({ isOpen, onClose, habit, onEditNote, onDeleteNote }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  // Get all notes sorted by date
  const allNotes = useMemo(() => {
    if (!habit) return [];
    return searchTerm ? searchNotes(habit, searchTerm) : getAllNotes(habit);
  }, [habit, searchTerm]);

  const stats = useMemo(() => {
    if (!habit) return null;
    return getNoteStats(habit);
  }, [habit]);

  const handleDelete = (date) => {
    if (deleteConfirm === date) {
      onDeleteNote(habit.id, date);
      setDeleteConfirm(null);
    } else {
      setDeleteConfirm(date);
      // Reset confirmation after 3 seconds
      setTimeout(() => setDeleteConfirm(null), 3000);
    }
  };

  const formatDate = (dateString) => {
    if (isToday(dateString)) return 'Today';
    if (isYesterday(dateString)) return 'Yesterday';
    return formatDateWithDay(dateString);
  };

  if (!isOpen || !habit) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className="glass rounded-2xl p-6 max-w-4xl w-full max-h-[90vh] shadow-2xl bg-white/95 dark:bg-gray-800/95 border border-gray-200 dark:border-gray-700 flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-3">
              <motion.div
                initial={{ rotate: -180, scale: 0 }}
                animate={{ rotate: 0, scale: 1 }}
                transition={{ type: 'spring', stiffness: 200 }}
                className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg"
              >
                <FileText className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </motion.div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                  Journal Entries
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 flex items-center gap-2">
                  <span className="text-xl">{habit.emoji}</span>
                  <span className="font-medium">{habit.name}</span>
                </p>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </motion.button>
          </div>

          {/* Stats */}
          {stats && stats.total > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6"
            >
              <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  {stats.total}
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400">Total Entries</div>
              </div>
              <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                  {stats.totalWords}
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400">Total Words</div>
              </div>
              <div className="bg-purple-50 dark:bg-purple-900/20 p-3 rounded-lg">
                <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                  {stats.averageLength}
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400">Avg. Length</div>
              </div>
              <div className="bg-orange-50 dark:bg-orange-900/20 p-3 rounded-lg">
                <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                  {stats.longestNote}
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400">Longest Note</div>
              </div>
            </motion.div>
          )}

          {/* Search Bar */}
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search your notes..."
                className="w-full pl-10 pr-4 py-2 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-colors"
              />
            </div>
          </div>

          {/* Notes List */}
          <div className="flex-1 overflow-y-auto space-y-3 pr-2">
            <AnimatePresence mode="popLayout">
              {allNotes.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center py-12"
                >
                  <FileText className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                  <p className="text-gray-500 dark:text-gray-400 text-lg">
                    {searchTerm ? 'No notes found matching your search' : 'No journal entries yet'}
                  </p>
                  <p className="text-gray-400 dark:text-gray-500 text-sm mt-2">
                    {!searchTerm && 'Start adding notes when you complete this habit'}
                  </p>
                </motion.div>
              ) : (
                allNotes.map((note, index) => (
                  <motion.div
                    key={note.date}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ delay: index * 0.05 }}
                    className="glass rounded-lg p-4 border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-colors"
                  >
                    {/* Note Header */}
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-500" />
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          {formatDate(note.date)}
                        </span>
                        {isToday(note.date) && (
                          <span className="px-2 py-0.5 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-medium rounded-full">
                            Today
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-1">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => onEditNote(note.date, note.content)}
                          className="p-1.5 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded transition-colors"
                          aria-label="Edit note"
                        >
                          <Edit2 className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleDelete(note.date)}
                          className={`p-1.5 rounded transition-colors ${
                            deleteConfirm === note.date
                              ? 'bg-red-100 dark:bg-red-900/30'
                              : 'hover:bg-red-50 dark:hover:bg-red-900/20'
                          }`}
                          aria-label="Delete note"
                        >
                          <Trash2 className="w-4 h-4 text-red-600 dark:text-red-400" />
                        </motion.button>
                      </div>
                    </div>

                    {/* Note Content */}
                    <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap leading-relaxed">
                      {note.content}
                    </p>

                    {/* Note Footer */}
                    <div className="flex items-center gap-3 mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {note.content.split(/\s+/).length} words
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">•</span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {note.content.length} characters
                      </span>
                    </div>

                    {/* Delete Confirmation */}
                    {deleteConfirm === note.date && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="mt-3 p-2 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded text-sm text-red-700 dark:text-red-400"
                      >
                        Click delete again to confirm
                      </motion.div>
                    )}
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </div>

          {/* Footer */}
          <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
            <p className="text-xs text-gray-500 dark:text-gray-500 text-center">
              💡 Keep reflecting on your journey to understand what works best for you
            </p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default NotesHistoryModal;
