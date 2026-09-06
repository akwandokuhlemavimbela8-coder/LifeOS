'use client';

export default function Navbar() {
  return (
    <nav className="w-full border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md sticky top-0 z-40 px-6 py-4 flex justify-between items-center">
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 rounded-full bg-indigo-500 animate-pulse" />
        <span className="font-black text-lg text-slate-100 tracking-tight">LifeOS</span>
      </div>
      <div className="flex items-center gap-3">
        <span className="text-xs bg-slate-900 border border-slate-800 text-slate-400 px-3 py-1.5 rounded-lg font-mono">
          Press <kbd className="text-indigo-400 font-bold">⌘K</kbd> to Quick Add
        </span>
      </div>
    </nav>
  );
}
