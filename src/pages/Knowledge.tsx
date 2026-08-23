import React, { useState } from 'react';
import { BookMarked, Search, Plus, ExternalLink, Tag, BookOpen, Clock } from 'lucide-react';

interface Resource {
  id: string;
  title: string;
  type: 'article' | 'book' | 'course' | 'video';
  url?: string;
  category: string;
  status: 'reading' | 'completed' | 'queued';
  summary: string;
}

export const Knowledge: React.FC = () => {
  const [resources, setResources] = useState<Resource[]>([
    {
      id: '1',
      title: 'Building a Second Brain (BASB)',
      type: 'book',
      category: 'Productivity & Systems',
      status: 'completed',
      summary: 'METHODOLOGY for capturing, organizing, distilling, and expressing knowledge.',
    },
    {
      id: '2',
      title: 'React 19 & Modern Web Performance Patterns',
      type: 'article',
      category: 'Engineering',
      status: 'reading',
      summary: 'Deep dive into concurrent rendering, Server Components, and client state optimization.',
    },
    {
      id: '3',
      title: 'Mastering Financial Freedom & Asset Allocation',
      type: 'course',
      category: 'Finance',
      status: 'queued',
      summary: 'Strategies for cash flow management and long-term portfolio growth.',
    },
  ]);

  const [search, setSearch] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [title, setTitle] = useState('');
  const [type, setType] = useState<'article' | 'book' | 'course' | 'video'>('article');
  const [category, setCategory] = useState('General');
  const [summary, setSummary] = useState('');

  const filtered = resources.filter(
    (r) =>
      r.title.toLowerCase().includes(search.toLowerCase()) ||
      r.category.toLowerCase().includes(search.toLowerCase())
  );

  const handleAddResource = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newRes: Resource = {
      id: 'res_' + Date.now(),
      title,
      type,
      category,
      status: 'queued',
      summary,
    };

    setResources([newRes, ...resources]);
    setTitle('');
    setSummary('');
    setShowAddModal(false);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-900/60 border border-slate-800 p-6 rounded-2xl backdrop-blur-xl">
        <div>
          <h1 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
            <BookMarked className="text-purple-400" size={24} />
            Knowledge Base & Vault
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Store key insights, books, articles, and learning paths in your second brain.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2.5 rounded-xl bg-purple-500 hover:bg-purple-400 text-slate-950 font-semibold text-xs transition-all flex items-center gap-2 shrink-0 shadow-lg shadow-purple-500/20"
        >
          <Plus size={16} />
          Add Resource
        </button>
      </div>

      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-4 top-3 text-slate-500" size={18} />
        <input
          type="text"
          placeholder="Search notes, tags, books, or topics..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-slate-900/80 border border-slate-800 rounded-2xl pl-11 pr-4 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-purple-500 transition-all backdrop-blur-xl"
        />
      </div>

      {/* Grid of Knowledge Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 backdrop-blur-xl flex flex-col justify-between gap-3 transition-all"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20">
                  {item.type}
                </span>
                <span
                  className={`text-[10px] uppercase font-bold px-2.5 py-0.5 rounded-full ${
                    item.status === 'completed'
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                      : item.status === 'reading'
                      ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20'
                      : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {item.status}
                </span>
              </div>

              <h3 className="text-sm font-bold text-slate-100">{item.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed line-clamp-3">{item.summary}</p>
            </div>

            <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-500 font-medium">
              <span className="flex items-center gap-1">
                <Tag size={12} />
                {item.category}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 w-full max-w-md space-y-4">
            <h3 className="text-lg font-bold text-slate-100">Add Knowledge Resource</h3>
            <form onSubmit={handleAddResource} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Title</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Atomic Habits or System Architecture Guide"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-sm focus:outline-none focus:border-purple-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Type</label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-sm focus:outline-none focus:border-purple-400"
                  >
                    <option value="article">Article</option>
                    <option value="book">Book</option>
                    <option value="course">Course</option>
                    <option value="video">Video</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Category</label>
                  <input
                    type="text"
                    required
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    placeholder="e.g. Tech, Finance"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-sm focus:outline-none focus:border-purple-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Key Summary / Takeaways</label>
                <textarea
                  rows={3}
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  placeholder="Briefly describe what this resource is about..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-sm focus:outline-none focus:border-purple-400 resize-none"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 py-2.5 rounded-xl bg-slate-800 text-slate-300 font-semibold text-xs hover:bg-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-purple-500 text-slate-950 font-semibold text-xs hover:bg-purple-400"
                >
                  Save Resource
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
