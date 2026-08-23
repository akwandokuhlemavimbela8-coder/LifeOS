import React, { useState } from 'react';
import { Wallet, ArrowUpRight, ArrowDownRight, Plus, DollarSign, PieChart, ShieldCheck } from 'lucide-react';
import { FinancialRecord } from '../types';

export const Money: React.FC = () => {
  const [records, setRecords] = useState<FinancialRecord[]>([
    { id: '1', type: 'income', amount: 3500, category: 'Salary / Tech', date: '2026-08-01', note: 'Monthly primary income' },
    { id: '2', type: 'expense', amount: 450, category: 'Hosting & Domain', date: '2026-08-05', note: 'LifeOS cloud infrastructure' },
    { id: '3', type: 'expense', amount: 120, category: 'Learning', date: '2026-08-12', note: 'Development courses' },
    { id: '4', type: 'income', amount: 800, category: 'Freelance', date: '2026-08-18', note: 'UI Design project' },
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('General');
  const [type, setType] = useState<'income' | 'expense'>('expense');
  const [note, setNote] = useState('');

  const totalIncome = records.filter(r => r.type === 'income').reduce((acc, r) => acc + r.amount, 0);
  const totalExpense = records.filter(r => r.type === 'expense').reduce((acc, r) => acc + r.amount, 0);
  const netSavings = totalIncome - totalExpense;

  const handleAddRecord = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || isNaN(Number(amount))) return;

    const newRecord: FinancialRecord = {
      id: 'fin_' + Date.now(),
      type,
      amount: Number(amount),
      category,
      date: new Date().toISOString().split('T')[0],
      note: note || category,
    };

    setRecords([newRecord, ...records]);
    setAmount('');
    setNote('');
    setShowAddModal(false);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-900/60 border border-slate-800 p-6 rounded-2xl backdrop-blur-xl">
        <div>
          <h1 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
            <Wallet className="text-amber-400" size={24} />
            Money & Wealth Hub
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Monitor cashflow, track expenses, and manage budget allocations.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-semibold text-xs transition-all flex items-center gap-2 shrink-0"
        >
          <Plus size={16} />
          Add Transaction
        </button>
      </div>

      {/* Financial Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl backdrop-blur-xl">
          <p className="text-[10px] uppercase font-semibold text-slate-500 tracking-wider">Total Income</p>
          <div className="flex items-center justify-between mt-2">
            <p className="text-xl font-bold text-emerald-400">${totalIncome.toLocaleString()}</p>
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <ArrowUpRight size={18} />
            </div>
          </div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl backdrop-blur-xl">
          <p className="text-[10px] uppercase font-semibold text-slate-500 tracking-wider">Total Expenses</p>
          <div className="flex items-center justify-between mt-2">
            <p className="text-xl font-bold text-rose-400">${totalExpense.toLocaleString()}</p>
            <div className="p-2 rounded-xl bg-rose-500/10 text-rose-400 border border-rose-500/20">
              <ArrowDownRight size={18} />
            </div>
          </div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl backdrop-blur-xl">
          <p className="text-[10px] uppercase font-semibold text-slate-500 tracking-wider">Net Cashflow</p>
          <div className="flex items-center justify-between mt-2">
            <p className={`text-xl font-bold ${netSavings >= 0 ? 'text-cyan-400' : 'text-rose-400'}`}>
              ${netSavings.toLocaleString()}
            </p>
            <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <ShieldCheck size={18} />
            </div>
          </div>
        </div>
      </div>

      {/* Transaction Log */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 backdrop-blur-xl space-y-4">
        <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
          <PieChart className="text-amber-400" size={18} />
          Recent Activity
        </h2>

        <div className="space-y-3">
          {records.map((rec) => (
            <div key={rec.id} className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-xl ${rec.type === 'income' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'}`}>
                  {rec.type === 'income' ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-200">{rec.note}</p>
                  <p className="text-[10px] text-slate-500">{rec.category} • {rec.date}</p>
                </div>
              </div>
              <span className={`text-xs font-bold ${rec.type === 'income' ? 'text-emerald-400' : 'text-rose-400'}`}>
                {rec.type === 'income' ? '+' : '-'}${rec.amount.toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 w-full max-w-md space-y-4">
            <h3 className="text-lg font-bold text-slate-100">Record Transaction</h3>
            <form onSubmit={handleAddRecord} className="space-y-4">
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setType('expense')}
                  className={`flex-1 py-2 rounded-xl text-xs font-semibold transition-colors ${type === 'expense' ? 'bg-rose-500 text-slate-950' : 'bg-slate-950 text-slate-400 border border-slate-800'}`}
                >
                  Expense
                </button>
                <button
                  type="button"
                  onClick={() => setType('income')}
                  className={`flex-1 py-2 rounded-xl text-xs font-semibold transition-colors ${type === 'income' ? 'bg-emerald-500 text-slate-950' : 'bg-slate-950 text-slate-400 border border-slate-800'}`}
                >
                  Income
                </button>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Amount ($)</label>
                <input
                  type="number"
                  required
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-sm focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Category / Note</label>
                <input
                  type="text"
                  required
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="e.g. Cloud Hosting, Salary, Groceries"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-sm focus:outline-none focus:border-amber-400"
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
                  className="flex-1 py-2.5 rounded-xl bg-amber-400 text-slate-950 font-semibold text-xs hover:bg-amber-300"
                >
                  Save Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
