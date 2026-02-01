import React, { useState, useEffect } from 'react';
import { LayoutDashboard, PlusCircle, Lightbulb, Wallet } from 'lucide-react';
import Dashboard from './components/Dashboard';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';
import AIInsights from './components/AIInsights';
import { Transaction } from './types';
import { getTransactions, saveTransaction, deleteTransaction } from './services/storageService';

type View = 'dashboard' | 'add' | 'insights';

function App() {
  const [view, setView] = useState<View>('dashboard');
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);

  // Load data on mount
  useEffect(() => {
    setTransactions(getTransactions());
  }, []);

  const handleSaveTransaction = (t: Transaction) => {
    const updated = saveTransaction(t);
    setTransactions(updated);
    setShowAddModal(false);
  };

  const handleDeleteTransaction = (id: string) => {
    if (window.confirm("Delete this transaction?")) {
      const updated = deleteTransaction(id);
      setTransactions(updated);
    }
  };

  const renderContent = () => {
    switch (view) {
      case 'dashboard':
        return (
          <>
            <Dashboard transactions={transactions} />
            <div className="mt-6">
              <TransactionList transactions={transactions} onDelete={handleDeleteTransaction} />
            </div>
          </>
        );
      case 'insights':
        return <AIInsights transactions={transactions} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col max-w-md mx-auto shadow-2xl overflow-hidden relative border-x border-slate-200">
      
      {/* Header */}
      <header className="bg-white p-4 sticky top-0 z-10 border-b border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-2 text-indigo-600">
          <Wallet className="w-8 h-8" />
          <h1 className="text-xl font-extrabold tracking-tight text-slate-900">PocketLedger<span className="text-indigo-600">AI</span></h1>
        </div>
        <div className="text-xs font-medium px-2 py-1 bg-slate-100 rounded text-slate-500">
          Offline Mode Ready
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 p-4 overflow-y-auto no-scrollbar">
        {renderContent()}
      </main>

      {/* Add Transaction Modal Overlay */}
      {showAddModal && (
        <div className="absolute inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="w-full h-full sm:h-auto">
             <TransactionForm 
                onSave={handleSaveTransaction} 
                onCancel={() => setShowAddModal(false)} 
             />
          </div>
        </div>
      )}

      {/* Bottom Navigation */}
      <nav className="bg-white border-t border-slate-200 pb-safe pt-2 px-6 sticky bottom-0 z-40">
        <div className="flex items-center justify-between pb-2">
          <button
            onClick={() => setView('dashboard')}
            className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors ${
              view === 'dashboard' ? 'text-indigo-600' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            <LayoutDashboard className="w-6 h-6" />
            <span className="text-[10px] font-bold">Dashboard</span>
          </button>

          {/* Floating Add Button in Nav */}
          <div className="relative -top-6">
            <button
              onClick={() => setShowAddModal(true)}
              className="bg-indigo-600 text-white p-4 rounded-full shadow-lg shadow-indigo-200 hover:scale-105 active:scale-95 transition-all"
            >
              <PlusCircle className="w-7 h-7" />
            </button>
          </div>

          <button
            onClick={() => setView('insights')}
            className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors ${
              view === 'insights' ? 'text-indigo-600' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            <Lightbulb className="w-6 h-6" />
            <span className="text-[10px] font-bold">Insights</span>
          </button>
        </div>
      </nav>
    </div>
  );
}

export default App;
