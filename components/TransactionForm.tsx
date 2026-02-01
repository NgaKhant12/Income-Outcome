import React, { useState } from 'react';
import { Transaction, TransactionType, Category } from '../types';
import { v4 as uuidv4 } from 'uuid'; // We'll implement a simple uuid manually if needed, but assuming library access or implementing helper.
import { ArrowDownCircle, ArrowUpCircle, X } from 'lucide-react';

// Simple UUID generator since we can't easily import v4 in this environment without a package.json
const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

interface TransactionFormProps {
  onSave: (t: Transaction) => void;
  onCancel: () => void;
}

const TransactionForm: React.FC<TransactionFormProps> = ({ onSave, onCancel }) => {
  const [amount, setAmount] = useState('');
  const [type, setType] = useState<TransactionType>('expense');
  const [category, setCategory] = useState<string>(Category.Food);
  const [note, setNote] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount) return;

    const newTransaction: Transaction = {
      id: generateId(),
      amount: parseFloat(amount),
      category,
      date: new Date().toISOString(),
      type,
      note,
    };

    onSave(newTransaction);
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col h-full max-h-[80vh] md:max-h-auto md:h-auto animate-in slide-in-from-bottom duration-300">
      <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
        <h2 className="text-lg font-bold text-slate-800">New Transaction</h2>
        <button onClick={onCancel} className="p-2 hover:bg-slate-200 rounded-full transition-colors">
          <X className="w-5 h-5 text-slate-500" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="p-6 flex-1 overflow-y-auto">
        {/* Type Toggle */}
        <div className="flex bg-slate-100 p-1 rounded-xl mb-8">
          <button
            type="button"
            onClick={() => setType('expense')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-semibold transition-all ${
              type === 'expense'
                ? 'bg-white text-rose-600 shadow-sm'
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            <ArrowDownCircle className="w-4 h-4" />
            Expense
          </button>
          <button
            type="button"
            onClick={() => setType('income')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-semibold transition-all ${
              type === 'income'
                ? 'bg-white text-emerald-600 shadow-sm'
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            <ArrowUpCircle className="w-4 h-4" />
            Income
          </button>
        </div>

        {/* Amount Input */}
        <div className="mb-8">
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Amount</label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl font-bold text-slate-400">$</span>
            <input
              type="number"
              inputMode="decimal"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              className="w-full pl-10 pr-4 py-4 text-4xl font-bold text-slate-800 bg-transparent border-b-2 border-slate-200 focus:border-indigo-500 focus:outline-none transition-colors placeholder-slate-200"
              autoFocus
              required
            />
          </div>
        </div>

        {/* Category Selection */}
        <div className="mb-6">
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 font-medium focus:ring-2 focus:ring-indigo-500 focus:outline-none appearance-none"
          >
            {Object.values(Category).map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {/* Note Input */}
        <div className="mb-6">
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Note (Optional)</label>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="What was this for?"
            rows={3}
            className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 focus:ring-2 focus:ring-indigo-500 focus:outline-none resize-none"
          />
        </div>

        <button
          type="submit"
          className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg shadow-indigo-200 transition-all active:scale-[0.98]"
        >
          Save Transaction
        </button>
      </form>
    </div>
  );
};

export default TransactionForm;
