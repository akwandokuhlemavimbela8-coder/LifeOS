import React, { useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

interface Note {
  id: string;
  title: string;
  content: string;
  category: string;
  tags: string[];
  date: string;
}

interface SecondBrainProps {
  onSuccess: (msg: string) => void;
}

export function SecondBrain({ onSuccess }: SecondBrainProps) {
  const [notes, setNotes] = useLocalStorage<Note[]>('lifeos_notes', [
    {
      id: '1',
      title: 'Vite & Tailwind v4 Configuration Notes',
      content: 'Make sure @import "tailwindcss"; is added to the top of index.css and imported directly in main.tsx.',
      category: 'Learning',
      tags: ['webdev', 'tailwind', 'vite'],
      date: '2026-08-20'
    },
    {
      id: '2',
      title: 'Mobile System Storage Optimization Strategy',
      content: 'Use Shizuku combined with a package manager to clean system cache without requiring full root access.',
      category: 'Tech',
      tags: ['shizuku', 'android', 'storage'],
      date: '2026-08-22'
    }
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newCategory, setNewCategory] = useState('Learning');
  const [newTags, setNewTags] = useState('');

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newContent) return;

    const formattedTags = newTags
      ? newTags.split(',').map((t) => t.trim().toLowerCase())
      : ['general'];

    const newNote: Note = {
      id: Date.now().toString(),
      title: newTitle,
      content: newContent,
      category: newCategory,
      tags: formattedTags,
      date: new Date().toISOString().split('T')[0]
    };

    setNotes([newNote, ...notes]);
    setNewTitle('');
    setNewContent('');
    setNewTags('');
    onSuccess('Note saved to Second Brain!');
  };

  const filteredNotes = notes.filter(
    (n) =>
      n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      {/* Search Bar & Create Form */}
      <div className="p-5 bg-slate-900/60 border border-slate-800/80 rounded-2xl space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <h3 className="text-lg font-bold text-white">Second Brain & Knowledge Hub</h3>
          <input
            type="text"
            placeholder="Search notes or tags..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full sm:w-64 bg-slate-800/80 border border-slate-700 rounded-xl px-3 py-1.5 text-sm text-white focus:outline-none focus:border-indigo-500"
          />
        </div>

        <form onSubmit={handleAddNote} className="space-y-3 pt-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input
              type="text"
              placeholder="Note Title"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="bg-slate-800/80 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
            />
            <select
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              className="bg-slate-800/80 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
            >
              <option value="Learning">Learning</option>
              <option value="Tech">Tech</option>
              <option value="Career">Career</option>
              <option value="Ideas">Ideas</option>
            </select>
          </div>

          <textarea
            rows={3}
            placeholder="Write your note or thoughts here..."
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
            className="w-full bg-slate-800/80 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500 resize-none"
          />

          <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
            <input
              type="text"
              placeholder="Tags (comma separated, e.g. react, setup)"
              value={newTags}
              onChange={(e) => setNewTags(e.target.value)}
              className="w-full sm:w-2/3 bg-slate-800/80 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
            />
            <button
              type="submit"
              className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl px-5 py-2 text-sm transition"
            >
              Save Note
            </button>
          </div>
        </form>
      </div>

      {/* Notes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredNotes.map((note) => (
          <div key={note.id} className="p-5 bg-slate-900/60 border border-slate-800/80 rounded-2xl space-y-3 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-2">
                <span className="text-xs uppercase font-semibold text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded-md border border-indigo-500/20">
                  {note.category}
                </span>
                <span className="text-xs text-slate-500">{note.date}</span>
              </div>
              <h4 className="text-md font-bold text-white">{note.title}</h4>
              <p className="text-sm text-slate-300 mt-2 leading-relaxed">{note.content}</p>
            </div>

            <div className="flex flex-wrap gap-1.5 pt-2">
              {note.tags.map((tag) => (
                <span key={tag} className="text-xs text-slate-400 bg-slate-800/60 px-2 py-0.5 rounded-md border border-slate-700/50">
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
