import React, { useState } from 'react';
import { Transaction } from '../types';
import { generateFinancialInsights } from '../services/geminiService';
import { Sparkles, BrainCircuit, RefreshCw, Shield, Layers } from 'lucide-react';

interface AIInsightsProps {
  transactions: Transaction[];
}

const AIInsights: React.FC<AIInsightsProps> = ({ transactions }) => {
  const [insight, setInsight] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    const result = await generateFinancialInsights(transactions);
    setInsight(result);
    setLoading(false);
  };

  return (
    <div className="space-y-6 pb-24">
      <div className="bg-gradient-to-br from-indigo-600 to-violet-700 rounded-2xl p-6 text-white shadow-lg">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-yellow-300" />
              AI Financial Assistant
            </h2>
            <p className="text-indigo-100 mb-6 max-w-md">
              Get personalized insights, spending analysis, and saving tips powered by Gemini.
              Needs internet connection.
            </p>
          </div>
          <BrainCircuit className="w-16 h-16 text-white opacity-20" />
        </div>
        
        <button
          onClick={handleGenerate}
          disabled={loading}
          className="bg-white text-indigo-600 px-6 py-3 rounded-xl font-bold shadow-md hover:bg-indigo-50 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {loading ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin" />
              Analyzing...
            </>
          ) : (
            'Analyze My Finances'
          )}
        </button>
      </div>

      {insight && (
        <div className="bg-white rounded-2xl shadow-sm border border-indigo-100 p-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <h3 className="text-lg font-bold text-slate-800 mb-4 border-b border-slate-100 pb-2">
            Insight Report
          </h3>
          <div 
            className="prose prose-indigo prose-sm max-w-none text-slate-600"
            dangerouslySetInnerHTML={{ __html: insight.replace(/\n/g, '<br/>') }}
          />
        </div>
      )}

      {/* Product Architecture / Features Section */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
        <h3 className="text-lg font-bold text-slate-800 mb-6 border-b border-slate-100 pb-2">
          App Capabilities
        </h3>
        
        <div className="space-y-8">
          {/* Core Features */}
          <div>
            <h4 className="flex items-center gap-2 font-bold text-slate-700 mb-3 text-sm uppercase tracking-wide">
              <Shield className="w-4 h-4 text-emerald-500" />
              Core Essentials
            </h4>
            <div className="grid gap-3">
              <div className="bg-slate-50 p-3 rounded-lg">
                <p className="font-semibold text-slate-800 text-sm">Offline-First Storage</p>
                <p className="text-xs text-slate-500 mt-1">
                  Complete privacy. Your financial data is stored encrypted on your device, accessible without internet.
                </p>
              </div>
              <div className="bg-slate-50 p-3 rounded-lg">
                <p className="font-semibold text-slate-800 text-sm">Rapid Transaction Log</p>
                <p className="text-xs text-slate-500 mt-1">
                  Frictionless entry for income and expenses to keep up with your busy life.
                </p>
              </div>
              <div className="bg-slate-50 p-3 rounded-lg">
                <p className="font-semibold text-slate-800 text-sm">Visual Dashboard</p>
                <p className="text-xs text-slate-500 mt-1">
                  Instant clarity on balances and category breakdowns via dynamic charts.
                </p>
              </div>
            </div>
          </div>

          {/* AI Features */}
          <div>
            <h4 className="flex items-center gap-2 font-bold text-slate-700 mb-3 text-sm uppercase tracking-wide">
              <Sparkles className="w-4 h-4 text-violet-500" />
              AI Intelligence
            </h4>
            <div className="grid gap-3">
              <div className="bg-violet-50 p-3 rounded-lg border border-violet-100">
                <p className="font-semibold text-violet-900 text-sm">Smart Health Check</p>
                <p className="text-xs text-violet-700 mt-1">
                  Gemini analyzes patterns to provide a plain-English summary of your financial status.
                </p>
              </div>
              <div className="bg-violet-50 p-3 rounded-lg border border-violet-100">
                <p className="font-semibold text-violet-900 text-sm">Actionable Tips</p>
                <p className="text-xs text-violet-700 mt-1">
                  Personalized recommendations to reduce spending in top categories.
                </p>
              </div>
            </div>
          </div>
          
          {/* Roadmap */}
          <div>
            <h4 className="flex items-center gap-2 font-bold text-slate-400 mb-3 text-sm uppercase tracking-wide">
              <Layers className="w-4 h-4" />
              Future Roadmap (Optional)
            </h4>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-xs text-slate-500">
                <div className="w-1.5 h-1.5 rounded-full bg-slate-300"></div>
                <span><strong>Budget Limits:</strong> Set monthly caps per category.</span>
              </li>
              <li className="flex items-center gap-2 text-xs text-slate-500">
                <div className="w-1.5 h-1.5 rounded-full bg-slate-300"></div>
                <span><strong>Data Export:</strong> Download CSV/PDF backups.</span>
              </li>
              <li className="flex items-center gap-2 text-xs text-slate-500">
                <div className="w-1.5 h-1.5 rounded-full bg-slate-300"></div>
                <span><strong>Recurring:</strong> Auto-add salary or rent.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIInsights;
