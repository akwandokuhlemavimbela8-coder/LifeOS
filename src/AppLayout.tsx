{activeTab === 'dashboard' && <Dashboard user={user} />}
{activeTab === 'goals' && <Goals />}
{activeTab !== 'dashboard' && activeTab !== 'goals' && (
  <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-8 text-center text-slate-400">
    <h2 className="text-lg font-bold text-slate-200 capitalize mb-2">{activeTab} Module</h2>
    <p className="text-xs">Module views coming up in the next phase!</p>
  </div>
)}
