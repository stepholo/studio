import type { User, CreditScoreInfo, Institution, Transaction } from '@/lib/types';

export const mockUser: User = {
  name: 'Alex Doe',
  avatarUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
  email: 'alex.doe@example.com',
};

export const mockCreditScore: CreditScoreInfo = {
  score: 720,
  change: 12,
  lastUpdated: 'this month',
  provider: 'The Circle Unified Score',
};

export const mockInstitutions: Omit<Institution, 'status'>[] = [
  {
    name: 'M-Pesa',
    logo: 'Smartphone',
    type: 'M-Pesa',
  },
  {
    name: 'Equity Bank',
    logo: 'Landmark',
    type: 'Bank',
  },
  {
    name: 'Stima SACCO',
    logo: 'PiggyBank',
    type: 'SACCO',
  },
  {
    name: 'Tala',
    logo: 'CircleDollarSign',
    type: 'Digital Lender',
  },
  {
    name: 'Metropol CRB',
    logo: 'HandCoins',
    type: 'CRB',
  },
    {
    name: 'KCB Bank',
    logo: 'Landmark',
    type: 'Bank',
  },
];

export const mockTransactions: Omit<Transaction, 'id'>[] = [
  {
    institution: 'Equity Bank',
    account: '**** 1234',
    date: '2024-07-20',
    description: 'Salary Deposit',
    category: 'Income',
    amount: 75000,
    currency: 'KES',
  },
  {
    institution: 'M-Pesa',
    account: '*** *** 7890',
    date: '2024-07-19',
    description: 'Naivas Supermarket',
    category: 'Spending',
    amount: -3500,
    currency: 'KES',
  },
  {
    institution: 'Tala',
    account: 'Loan #5678',
    date: '2024-07-15',
    description: 'Loan Repayment',
    category: 'Loans',
    amount: -5000,
    currency: 'KES',
  },
  {
    institution: 'Equity Bank',
    account: '**** 5678',
    date: '2024-07-10',
    description: 'Transfer to Savings',
    category: 'Savings',
    amount: -10000,
    currency: 'KES',
  },
  {
    institution: 'M-Pesa',
    account: '*** *** 7890',
    date: '2024-07-05',
    description: 'Rent Payment',
    category: 'Spending',
    amount: -25000,
    currency: 'KES',
  },
  {
    institution: 'Tala',
    account: 'Loan #5678',
    date: '2024-06-25',
    description: 'Loan Disbursement',
    category: 'Loans',
    amount: 15000,
    currency: 'KES',
  },
  {
    institution: 'Equity Bank',
    account: '**** 1234',
    date: '2024-06-20',
    description: 'Salary Deposit',
    category: 'Income',
    amount: 75000,
    currency: 'KES',
  },
];
