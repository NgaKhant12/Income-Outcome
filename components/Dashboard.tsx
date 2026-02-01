import React, { useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, BarChart, Bar, XAxis, YAxis } from 'recharts';
import { Transaction, TransactionType } from '../types';
import { TrendingUp, TrendingDown, DollarSign } from 'lucide-react';

interface DashboardProps {
  transactions: Transaction[];
}

const COLORS = ['#6366f1', '#10b981', '#f59e0b', '#ef4444', '#ec4899', '#8b5cf6', '#06b6d4', '#84cc16'];

const Dashboard: React.FC<DashboardProps> = ({ transactions }) => {
  const summary = useMemo(() => {
    return transactions.reduce(
      (acc, curr) => {
        if (curr.type === 'income') {
          acc.income += curr.amount;
        } else {
          acc.expense += curr.amount;
        }
        return acc;
      },
      { income: 0, expense: 0 }
    );
  }, [transactions]);

  const categoryData = useMemo(() => {
    const expenses = transactions.filter(t => t.type === 'expense');
    const catMap = expenses.reduce((acc, curr) => {
      acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
      return acc;
    }, {} as Record<string, number>);

    return Object.keys(catMap).map(key => ({
      name: key,
      value: catMap[key]
    })).sort((a, b) => b.value - a.value);
  }, [transactions]);

  const balance = summary.income - summary.expense;

  return (
    <div className="space-y-6 pb-24">
      {/* Balance Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-slate-500 text-sm font-medium">Total Balance</h3>
            <div className="p-2 bg-indigo-50 rounded-full">
              <DollarSign className="w-5 h-5 text-indigo-600" />
            </div>
          </div>
          <p className={`text-3xl font-bold ${balance >= 0 ? 'text-slate-900' : 'text-red-500'}`}>
            ${balance.toFixed(2)}
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-slate-500 text-sm font-medium">Income</h3>
            <div className="p-2 bg-emerald-50 rounded-full">
              <TrendingUp className="w-5 h-5 text-emerald-600" />
            </div>
          </div>
          <p className="text-2xl font-bold text-emerald-600">
            +${summary.income.toFixed(2)}
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-slate-500 text-sm font-medium">Expenses</h3>
            <div className="p-2 bg-rose-50 rounded-full">
              <TrendingDown className="w-5 h-5 text-rose-600" />
            </div>
          </div>
          <p className="text-2xl font-bold text-rose-600">
            -${summary.expense.toFixed(2)}
          </p>
        </div>
      </div>

      {/* Charts Section */}
      {transactions.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 h-80 flex flex-col">
            <h3 className="text-slate-800 font-semibold mb-4">Expense Breakdown</h3>
            <div className="flex-1 w-full min-h-0">
              {categoryData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <RechartsTooltip formatter={(value: number) => `$${value.toFixed(2)}`} />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                 <div className="flex items-center justify-center h-full text-slate-400 text-sm">No expenses yet</div>
              )}
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 h-80 flex flex-col">
            <h3 className="text-slate-800 font-semibold mb-4">Top Categories</h3>
             <div className="flex-1 w-full min-h-0 overflow-y-auto">
               <ul className="space-y-3">
                 {categoryData.map((cat, idx) => (
                   <li key={cat.name} className="flex items-center justify-between">
                     <div className="flex items-center gap-2">
                       <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[idx % COLORS.length] }}></div>
                       <span className="text-sm text-slate-600 font-medium">{cat.name}</span>
                     </div>
                     <span className="text-sm font-bold text-slate-900">${cat.value.toFixed(2)}</span>
                   </li>
                 ))}
                 {categoryData.length === 0 && <li className="text-center text-slate-400 text-sm pt-10">No data available</li>}
               </ul>
             </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-2xl border border-slate-100 border-dashed">
          <div className="text-slate-400 mb-2">No transactions recorded</div>
          <p className="text-sm text-slate-500">Tap the "+" button to add your first expense.</p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
