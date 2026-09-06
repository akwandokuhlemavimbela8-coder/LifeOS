const domains = [
  { name: 'Health', score: 85, color: 'from-emerald-500 to-teal-400' },
  { name: 'Money', score: 70, color: 'from-blue-500 to-cyan-400' },
  { name: 'Learning', score: 90, color: 'from-indigo-500 to-purple-400' },
  { name: 'Career', score: 75, color: 'from-amber-500 to-orange-400' },
  { name: 'Relationships', score: 80, color: 'from-pink-500 to-rose-400' },
  { name: 'Mindset', score: 65, color: 'from-violet-500 to-fuchsia-400' },
];

export function LifeOrbit() {
  return (
    <section className="space-y-4">
      <h2 className="text-xl font-bold text-slate-100 tracking-tight">Life Orbit</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {domains.map((item) => (
          <div
            key={item.name}
            className="p-4 bg-slate-900/60 border border-slate-800/80 rounded-2xl hover:border-slate-700 transition duration-300"
          >
            <span className="text-xs font-medium text-slate-400">{item.name}</span>
            <div className="text-2xl font-black text-white my-1">{item.score}%</div>
            <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div
                className={`h-full bg-gradient-to-r ${item.color} rounded-full`}
                style={{ width: `${item.score}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
