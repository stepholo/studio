import type { User, CreditScoreInfo, Institution, Transaction } from '@/lib/types';
import { Landmark, Smartphone, PiggyBank, CircleDollarSign, HandCoins } from 'lucide-react';

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

export const mockInstitutions: Institution[] = [
  {
    name: 'M-Pesa',
    logo: Smartphone,
    status: 'Connected',
    type: 'M-Pesa',
  },
  {
    name: 'Equity Bank',
    logo: Landmark,
    status: 'Connected',
    type: 'Bank',
  },
  {
    name: 'Stima SACCO',
    logo: PiggyBank,
    status: 'Not Connected',
    type: 'SACCO',
  },
  {
    name: 'Tala',
    logo: CircleDollarSign,
    status: 'Connected',
    type: 'Digital Lender',
  },
  {
    name: 'Metropol CRB',
    logo: HandCoins,
    status: 'Not Connected',
    type: 'CRB',
  },
    {
    name: 'KCB Bank',
    logo: Landmark,
    status: 'Not Connected',
    type: 'Bank',
  },
];

export const mockTransactions: Transaction[] = [
  {
    id: 'txn1',
    institution: 'Equity Bank',
    account: '**** 1234',
    date: '2024-07-20',
    description: 'Salary Deposit',
    category: 'Income',
    amount: 75000,
    currency: 'KES',
  },
  {
    id: 'txn2',
    institution: 'M-Pesa',
    account: '*** *** 7890',
    date: '2024-07-19',
    description: 'Naivas Supermarket',
    category: 'Spending',
    amount: -3500,
    currency: 'KES',
  },
  {
    id: 'txn3',
    institution: 'Tala',
    account: 'Loan #5678',
    date: '2024-07-15',
    description: 'Loan Repayment',
    category: 'Loans',
    amount: -5000,
    currency: 'KES',
  },
  {
    id: 'txn4',
    institution: 'Equity Bank',
    account: '**** 5678',
    date: '2024-07-10',
    description: 'Transfer to Savings',
    category: 'Savings',
    amount: -10000,
    currency: 'KES',
  },
  {
    id: 'txn5',
    institution: 'M-Pesa',
    account: '*** *** 7890',
    date: '2024-07-05',
    description: 'Rent Payment',
    category: 'Spending',
    amount: -25000,
    currency: 'KES',
  },
  {
    id: 'txn6',
    institution: 'Tala',
    account: 'Loan #5678',
    date: '2024-06-25',
    description: 'Loan Disbursement',
    category: 'Loans',
    amount: 15000,
    currency: 'KES',
  },
  {
    id: 'txn7',
    institution: 'Equity Bank',
    account: '**** 1234',
    date: '2024-06-20',
    description: 'Salary Deposit',
    category: 'Income',
    amount: 75000,
    currency: 'KES',
  },
];
