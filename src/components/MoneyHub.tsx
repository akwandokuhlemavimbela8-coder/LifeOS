export function MoneyHub() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-5 bg-slate-900/80 border border-slate-800 rounded-2xl">
          <p className="text-sm text-slate-400 font-medium">Total Income</p>
          <p className="text-3xl font-extrabold text-emerald-400 mt-1">$4,300</p>
        </div>
        <div className="p-5 bg-slate-900/80 border border-slate-800 rounded-2xl">
          <p className="text-sm text-slate-400 font-medium">Total Expenses</p>
          <p className="text-3xl font-extrabold text-rose-400 mt-1">$570</p>
        </div>
        <div className="p-5 bg-slate-900/80 border border-slate-800 rounded-2xl">
          <p className="text-sm text-slate-400 font-medium">Net Cashflow</p>
          <p className="text-3xl font-extrabold text-indigo-400 mt-1">$3,730</p>
        </div>
      </div>
    </div>
  );
}
