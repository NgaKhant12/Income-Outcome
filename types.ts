export type TransactionType = 'income' | 'expense';

export enum Category {
  Food = 'Food',
  Transport = 'Transport',
  Housing = 'Housing',
  Utilities = 'Utilities',
  Entertainment = 'Entertainment',
  Health = 'Health',
  Shopping = 'Shopping',
  Salary = 'Salary',
  Freelance = 'Freelance',
  Investment = 'Investment',
  Other = 'Other'
}

export interface Transaction {
  id: string;
  amount: number;
  category: Category | string;
  date: string; // ISO date string
  type: TransactionType;
  note: string;
}

export interface FinancialSummary {
  totalIncome: number;
  totalExpense: number;
  balance: number;
}
