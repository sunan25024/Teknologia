import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Search, Filter, Edit3, Trash2, Star, Tag, BookOpen, Clock } from 'lucide-react';

interface Note {
  id: number;
  title: string;
  content: string;
  tags: string[];
  starred: boolean;
  createdAt: string;
  updatedAt: string;
  color: string;
}

const Notes: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([
    {
      id: 1,
      title: 'Project Meeting Notes',
      content: 'Discussed the new features for the upcoming release. Need to focus on user experience improvements and performance optimization. Key points: 1. UI/UX redesign, 2. Performance metrics, 3. User feedback integration.',
      tags: ['work', 'meeting', 'important'],
      starred: true,
      createdAt: '2025-01-10',
      updatedAt: '2025-01-10',
      color: 'from-blue-400 to-cyan-500'
    },
    {
      id: 2,
      title: 'Shopping List',
      content: 'Weekly grocery shopping: Milk, Bread, Eggs, Fresh fruits (apples, bananas), Vegetables (spinach, carrots), Chicken breast, Basmati rice, Olive oil',
      tags: ['personal', 'shopping', 'weekly'],
      starred: false,
      createdAt: '2025-01-09',
      updatedAt: '2025-01-09',
      color: 'from-green-400 to-emerald-500'
    },
    {
      id: 3,
      title: 'Book Ideas',
      content: 'Collection of interesting book concepts: 1. Productivity in digital age, 2. Mindfulness for developers, 3. Future of remote work, 4. AI and creativity',
      tags: ['creative', 'books', 'ideas'],
      starred: true,
      createdAt: '2025-01-08',
      updatedAt: '2025-01-08',
      color: 'from-purple-400 to-pink-500'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [showNewNoteModal, setShowNewNoteModal] = useState(false);
  const [newNote, setNewNote] = useState({ title: '', content: '', tags: '' });

  const colors = [
    'from-blue-400 to-cyan-500',
    'from-green-400 to-emerald-500',
    'from-purple-400 to-pink-500',
    'from-yellow-400 to-orange-500',
    'from-red-400 to-rose-500',
    'from-indigo-400 to-blue-500'
  ];

  const filteredNotes = notes.filter(note => {
    const matchesSearch = note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         note.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || 
                         (selectedFilter === 'starred' && note.starred) ||
                         note.tags.includes(selectedFilter);
    return matchesSearch && matchesFilter;
  });

  const handleCreateNote = () => {
    if (newNote.title.trim()) {
      const note: Note = {
        id: Date.now(),
        title: newNote.title,
        content: newNote.content,
        tags: newNote.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
        starred: false,
        createdAt: new Date().toISOString().split('T')[0],
        updatedAt: new Date().toISOString().split('T')[0],
        color: colors[Math.floor(Math.random() * colors.length)]
      };
      setNotes([note, ...notes]);
      setNewNote({ title: '', content: '', tags: '' });
      setShowNewNoteModal(false);
    }
  };

  const toggleStar = (id: number) => {
    setNotes(notes.map(note => 
      note.id === id ? { ...note, starred: !note.starred } : note
    ));
  };

  const deleteNote = (id: number) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-center mb-8"
      >
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-2">
            Notes
          </h1>
          <p className="text-slate-600 text-lg">Organize your thoughts and ideas beautifully</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowNewNoteModal(true)}
          className="flex items-center px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 font-semibold"
        >
          <Plus className="w-5 h-5 mr-2" />
          New Note
        </motion.button>
      </motion.div>

      {/* Search and Filter */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex flex-col sm:flex-row gap-4 mb-8"
      >
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search notes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white/70 backdrop-blur-xl border border-white/20 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent shadow-lg transition-all duration-300"
          />
        </div>
        <select
          value={selectedFilter}
          onChange={(e) => setSelectedFilter(e.target.value)}
          className="px-6 py-3 bg-white/70 backdrop-blur-xl border border-white/20 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent shadow-lg font-medium"
        >
          <option value="all">All Notes</option>
          <option value="starred">Starred</option>
          <option value="work">Work</option>
          <option value="personal">Personal</option>
          <option value="creative">Creative</option>
        </select>
      </motion.div>

      {/* Notes Grid */}
      <motion.div 
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <AnimatePresence>
          {filteredNotes.map((note, index) => (
            <motion.div
              key={note.id}
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/20 overflow-hidden hover:shadow-2xl transition-all duration-300 group"
            >
              {/* Note Header with Gradient */}
              <div className={`bg-gradient-to-r ${note.color} p-6 relative overflow-hidden`}>
                <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
                <div className="relative z-10 flex justify-between items-start">
                  <h3 className="text-xl font-bold text-white truncate pr-4">{note.title}</h3>
                  <div className="flex space-x-2">
                    <motion.button
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => toggleStar(note.id)}
                      className={`p-2 rounded-xl transition-all duration-200 ${
                        note.starred ? 'bg-yellow-400 text-yellow-900' : 'bg-white/20 text-white hover:bg-white/30'
                      }`}
                    >
                      <Star className="w-4 h-4" fill={note.starred ? 'currentColor' : 'none'} />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-2 bg-white/20 text-white rounded-xl hover:bg-white/30 transition-all duration-200"
                    >
                      <Edit3 className="w-4 h-4" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => deleteNote(note.id)}
                      className="p-2 bg-white/20 text-white rounded-xl hover:bg-red-500 transition-all duration-200"
                    >
                      <Trash2 className="w-4 h-4" />
                    </motion.button>
                  </div>
                </div>
                
                {/* Decorative elements */}
                <div className="absolute -top-4 -right-4 w-20 h-20 bg-white/10 rounded-full"></div>
                <div className="absolute -bottom-2 -left-2 w-16 h-16 bg-white/10 rounded-full"></div>
              </div>
              
              {/* Note Content */}
              <div className="p-6">
                <p className="text-slate-600 text-sm mb-4 line-clamp-4 leading-relaxed">{note.content}</p>
                
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {note.tags.map((tag, tagIndex) => (
                    <motion.span
                      key={tagIndex}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: tagIndex * 0.1 }}
                      className="inline-flex items-center px-3 py-1 bg-gradient-to-r from-slate-100 to-slate-200 text-slate-700 text-xs rounded-full font-medium"
                    >
                      <Tag className="w-3 h-3 mr-1" />
                      {tag}
                    </motion.span>
                  ))}
                </div>
                
                {/* Footer */}
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <div className="flex items-center">
                    <Clock className="w-3 h-3 mr-1" />
                    Updated: {note.updatedAt}
                  </div>
                  <div className="flex items-center">
                    <BookOpen className="w-3 h-3 mr-1" />
                    {note.content.split(' ').length} words
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Empty State */}
      {filteredNotes.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-16"
        >
          <BookOpen className="w-16 h-16 text-slate-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-slate-600 mb-2">No notes found</h3>
          <p className="text-slate-500">Create your first note to get started</p>
        </motion.div>
      )}

      {/* New Note Modal */}
      <AnimatePresence>
        {showNewNoteModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl max-w-md w-full border border-white/20"
            >
              <div className="p-8">
                <h2 className="text-2xl font-bold text-slate-800 mb-6">Create New Note</h2>
                
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Note title"
                    value={newNote.title}
                    onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
                    className="w-full px-4 py-3 bg-white/70 border border-white/20 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
                  />
                  
                  <textarea
                    placeholder="Write your note here..."
                    value={newNote.content}
                    onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-3 bg-white/70 border border-white/20 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none transition-all duration-300"
                  />
                  
                  <input
                    type="text"
                    placeholder="Tags (comma separated)"
                    value={newNote.tags}
                    onChange={(e) => setNewNote({ ...newNote, tags: e.target.value })}
                    className="w-full px-4 py-3 bg-white/70 border border-white/20 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
                  />
                </div>
                
                <div className="flex justify-end space-x-3 mt-8">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowNewNoteModal(false)}
                    className="px-6 py-3 text-slate-700 bg-slate-200 rounded-2xl hover:bg-slate-300 transition-all duration-200 font-medium"
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleCreateNote}
                    className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-2xl hover:from-indigo-600 hover:to-purple-700 transition-all duration-200 font-medium shadow-lg"
                  >
                    Create Note
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Notes;