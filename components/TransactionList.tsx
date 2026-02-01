import React from 'react';
import { Transaction } from '../types';
import { Coffee, ShoppingBag, Car, Home, Zap, Heart, Briefcase, DollarSign, HelpCircle, ArrowUpRight, ArrowDownLeft, Trash2 } from 'lucide-react';

interface TransactionListProps {
  transactions: Transaction[];
  onDelete: (id: string) => void;
}

const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'Food': return <Coffee className="w-5 h-5" />;
    case 'Shopping': return <ShoppingBag className="w-5 h-5" />;
    case 'Transport': return <Car className="w-5 h-5" />;
    case 'Housing': return <Home className="w-5 h-5" />;
    case 'Utilities': return <Zap className="w-5 h-5" />;
    case 'Health': return <Heart className="w-5 h-5" />;
    case 'Salary': case 'Freelance': return <Briefcase className="w-5 h-5" />;
    case 'Investment': return <DollarSign className="w-5 h-5" />;
    default: return <HelpCircle className="w-5 h-5" />;
  }
};

const formatDate = (isoString: string) => {
  const date = new Date(isoString);
  return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' }).format(date);
};

const TransactionList: React.FC<TransactionListProps> = ({ transactions, onDelete }) => {
  if (transactions.length === 0) return null;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
      <div className="p-4 border-b border-slate-100 bg-slate-50/50">
        <h3 className="font-semibold text-slate-700">Recent Transactions</h3>
      </div>
      <div className="divide-y divide-slate-100">
        {transactions.map((t) => (
          <div key={t.id} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors group">
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-full ${t.type === 'income' ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'}`}>
                {getCategoryIcon(t.category)}
              </div>
              <div>
                <p className="font-semibold text-slate-800">{t.category}</p>
                <p className="text-xs text-slate-500 flex items-center gap-1">
                  {formatDate(t.date)} 
                  {t.note && <span className="text-slate-400">• {t.note}</span>}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className={`font-bold ${t.type === 'income' ? 'text-emerald-600' : 'text-slate-900'}`}>
                  {t.type === 'income' ? '+' : '-'}${t.amount.toFixed(2)}
                </p>
              </div>
              <button 
                onClick={() => onDelete(t.id)}
                className="opacity-0 group-hover:opacity-100 p-2 text-slate-300 hover:text-red-500 transition-all"
                aria-label="Delete transaction"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransactionList;
