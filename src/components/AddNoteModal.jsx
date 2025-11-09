import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Save, FileText, AlertCircle } from 'lucide-react';
import { formatNoteContent, validateNote } from '../utils/noteUtils';
import { formatDateWithDay } from '../utils/dateUtils';

/**
 * Modal for adding/editing notes for a specific habit on a specific date
 */
const AddNoteModal = ({ isOpen, onClose, onSave, habitName, date, existingNote }) => {
  const [noteContent, setNoteContent] = useState('');
  const [error, setError] = useState('');
  const [charCount, setCharCount] = useState(0);
  const maxLength = 500;

  useEffect(() => {
    if (isOpen) {
      setNoteContent(existingNote || '');
      setCharCount(existingNote?.length || 0);
      setError('');
    }
  }, [isOpen, existingNote]);

  const handleContentChange = (e) => {
    const content = e.target.value;
    if (content.length <= maxLength) {
      setNoteContent(content);
      setCharCount(content.length);
      setError('');
    }
  };

  const handleSave = () => {
    const validation = validateNote(noteContent, maxLength);
    if (!validation.valid) {
      setError(validation.error);
      return;
    }

    const formattedNote = formatNoteContent(noteContent, maxLength);
    onSave(date, formattedNote);
    onClose();
  };

  const handleKeyDown = (e) => {
    // Save on Ctrl/Cmd + Enter
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      handleSave();
    }
  };

  if (!isOpen) return null;

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
          className="glass rounded-2xl p-6 max-w-2xl w-full shadow-2xl bg-white/95 dark:bg-gray-800/95 border border-gray-200 dark:border-gray-700"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-3">
              <motion.div
                initial={{ rotate: -180, scale: 0 }}
                animate={{ rotate: 0, scale: 1 }}
                transition={{ type: 'spring', stiffness: 200 }}
                className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg"
              >
                <FileText className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </motion.div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                  {existingNote ? 'Edit Note' : 'Add Note'}
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  <span className="font-medium">{habitName}</span>
                  {' • '}
                  <span>{formatDateWithDay(date)}</span>
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

          {/* Note Input */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              How did it go? (Optional)
            </label>
            <textarea
              value={noteContent}
              onChange={handleContentChange}
              onKeyDown={handleKeyDown}
              placeholder="Reflect on your experience... What worked? How did you feel? Any insights?"
              className="w-full h-40 px-4 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 resize-none transition-colors"
              autoFocus
            />
            
            {/* Character Counter */}
            <div className="flex items-center justify-between mt-2">
              <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                <span>💡 Tip: Press Ctrl+Enter to save quickly</span>
              </div>
              <div className={`text-sm font-medium ${
                charCount > maxLength * 0.9
                  ? 'text-orange-500'
                  : 'text-gray-500 dark:text-gray-400'
              }`}>
                {charCount} / {maxLength}
              </div>
            </div>
          </div>

          {/* Error Message */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-center gap-2"
              >
                <AlertCircle className="w-4 h-4 text-red-500" />
                <span className="text-sm text-red-700 dark:text-red-400">{error}</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleSave}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <Save className="w-5 h-5" />
              <span>{existingNote ? 'Update Note' : 'Save Note'}</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onClose}
              className="flex-1 px-6 py-3 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 font-medium rounded-lg transition-colors duration-200"
            >
              Cancel
            </motion.button>
          </div>

          {/* Helper Text */}
          <p className="text-xs text-gray-500 dark:text-gray-500 text-center mt-4">
            Notes are private and help you reflect on your journey
          </p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AddNoteModal;
