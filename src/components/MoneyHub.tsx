import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { AnimatedNumber } from './AnimatedNumber';

interface Transaction {
  id: string;
  title: string;
  amount: number;
  type: 'income' | 'expense';
  category: string;
  date: string;
}

interface MoneyHubProps {
  onSuccess: (msg: string) => void;
}

export function MoneyHub({ onSuccess }: MoneyHubProps) {
  const [transactions, setTransactions] = useLocalStorage<Transaction[]>('lifeos_transactions', [
    { id: '1', title: 'Monthly primary income', amount: 3500, type: 'income', category: 'Salary', date: '2026-08-01' },
    { id: '2', title: 'Hosting & Domain', amount: 450, type: 'expense', category: 'Infrastructure', date: '2026-08-05' },
    { id: '3', title: 'Development courses', amount: 120, type: 'expense', category: 'Learning', date: '2026-08-12' },
    { id: '4', title: 'UI Design project', amount: 800, type: 'income', category: 'Freelance', date: '2026-08-18' },
  ]);

  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState<'income' | 'expense'>('income');
  const [category, setCategory] = useState('General');

  // Real-time calculations
  const totalIncome = transactions
    .filter((t) => t.type === 'income')
    .reduce((acc, t) => acc + t.amount, 0);

  const totalExpenses = transactions
    .filter((t) => t.type === 'expense')
    .reduce((acc, t) => acc + t.amount, 0);

  const netCashflow = totalIncome - totalExpenses;

  const handleAddTransaction = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !amount) return;

    const newTx: Transaction = {
      id: Date.now().toString(),
      title,
      amount: parseFloat(amount),
      type,
      category,
      date: new Date().toISOString().split('T')[0],
    };

    setTransactions([newTx, ...transactions]);
    setTitle('');
    setAmount('');
    onSuccess(`Added ${type}: $${newTx.amount}`);
  };

  const summaryVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.05,
      },
    },
  };

  const summaryCardVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: 'easeOut' },
    },
  };

  const transactionVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.05,
      },
    },
  };

  const transactionItemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, ease: 'easeOut' },
    },
  };

  return (
    <div className="space-y-6">
      {/* Dynamic Summary Cards */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
        variants={summaryVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          variants={summaryCardVariants}
          whileHover={{ y: -2, scale: 1.01 }}
          className="p-5 bg-slate-900/80 border border-slate-800 rounded-2xl cursor-pointer transition-all"
        >
          <p className="text-sm text-slate-400 font-medium">Total Income</p>
          <p className="text-3xl font-extrabold text-emerald-400 mt-1">$<AnimatedNumber value={totalIncome} /></p>
        </motion.div>
        <motion.div
          variants={summaryCardVariants}
          whileHover={{ y: -2, scale: 1.01 }}
          className="p-5 bg-slate-900/80 border border-slate-800 rounded-2xl cursor-pointer transition-all"
        >
          <p className="text-sm text-slate-400 font-medium">Total Expenses</p>
          <p className="text-3xl font-extrabold text-rose-400 mt-1">$<AnimatedNumber value={totalExpenses} /></p>
        </motion.div>
        <motion.div
          variants={summaryCardVariants}
          whileHover={{ y: -2, scale: 1.01 }}
          className="p-5 bg-slate-900/80 border border-slate-800 rounded-2xl cursor-pointer transition-all"
        >
          <p className="text-sm text-slate-400 font-medium">Net Cashflow</p>
          <p className={`text-3xl font-extrabold mt-1 ${netCashflow >= 0 ? 'text-indigo-400' : 'text-rose-500'}`}>
            $<AnimatedNumber value={netCashflow} />
          </p>
        </motion.div>
      </motion.div>

      {/* Add Transaction Form */}
      <form onSubmit={handleAddTransaction} className="p-5 bg-slate-900/60 border border-slate-800/80 rounded-2xl space-y-4">
        <h3 className="text-lg font-bold text-white">Add Transaction</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="bg-slate-800/80 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
          />
          <input
            type="number"
            placeholder="Amount ($)"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="bg-slate-800/80 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
          />
          <select
            value={type}
            onChange={(e) => setType(e.target.value as 'income' | 'expense')}
            className="bg-slate-800/80 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
          >
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
          <motion.button
            type="submit"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl px-4 py-2 text-sm transition"
          >
            Save Record
          </motion.button>
        </div>
      </form>

      {/* Recent Activity List */}
      <div className="p-5 bg-slate-900/60 border border-slate-800/80 rounded-2xl space-y-3">
        <h3 className="text-lg font-bold text-white">Recent Activity</h3>
        <motion.div
          className="space-y-2"
          variants={transactionVariants}
          initial="hidden"
          animate="visible"
        >
          {transactions.map((tx) => (
            <motion.div
              key={tx.id}
              variants={transactionItemVariants}
              whileHover={{ x: 4 }}
              className="flex items-center justify-between p-3 bg-slate-800/30 border border-slate-800/50 rounded-xl transition-all"
            >
              <div>
                <p className="font-medium text-sm text-slate-100">{tx.title}</p>
                <p className="text-xs text-slate-400">{tx.category} • {tx.date}</p>
              </div>
              <span className={`font-bold text-sm ${tx.type === 'income' ? 'text-emerald-400' : 'text-rose-400'}`}>
                {tx.type === 'income' ? '+' : '-'}$<AnimatedNumber value={tx.amount} />
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
