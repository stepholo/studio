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

export const kenyanFinancialInstitutions: { name: string; type: 'Bank' | 'M-Pesa' | 'SACCO' | 'Digital Lender' | 'CRB' }[] = [
  // Banks
  { name: 'KCB Bank Kenya', type: 'Bank' },
  { name: 'Equity Bank', type: 'Bank' },
  { name: 'Co-operative Bank of Kenya', type: 'Bank' },
  { name: 'NCBA Bank', type: 'Bank' },
  { name: 'Stanbic Bank', type: 'Bank' },
  { name: 'Absa Bank Kenya', type: 'Bank' },
  { name: 'Standard Chartered Bank Kenya', type: 'Bank' },
  { name: 'Diamond Trust Bank (DTB)', type: 'Bank' },
  { name: 'I&M Bank', type: 'Bank' },
  { name: 'Family Bank', type: 'Bank' },
  { name: 'National Bank of Kenya', type: 'Bank' },
  { name: 'Housing Finance Company (HFC)', type: 'Bank' },
  { name: 'Sidian Bank', type: 'Bank' },
  { name: 'Prime Bank', type: 'Bank' },
  { name: 'Victoria Commercial Bank', type: 'Bank' },
  { name: 'Bank of Africa', type: 'Bank' },
  { name: 'GTBank', type: 'Bank' },
  { name: 'UBA Kenya', type: 'Bank' },
  { name: 'Bank of India', type: 'Bank' },
  { name: 'Bank of Baroda', type: 'Bank' },
  { name: 'Citibank', type: 'Bank' },
  { name: 'Ecobank', type: 'Bank' },
  { name: 'SBM Bank', type: 'Bank' },
  { name: 'Spire Bank', type: 'Bank' },
  { name: 'CIB Bank', type: 'Bank' },
  { name: 'ABC Bank', type: 'Bank' },
  { name: 'Credit Bank', type: 'Bank' },
  { name: 'Consolidated Bank', type: 'Bank' },
  { name: 'Development Bank of Kenya', type: 'Bank' },
  { name: 'Gulf African Bank', type: 'Bank' },
  { name: 'Guardian Bank', type: 'Bank' },
  { name: 'Kingdom Bank', type: 'Bank' },
  { name: 'Mayfair Bank', type: 'Bank' },
  { name: 'Middle East Bank', type: 'Bank' },
  { name: 'M-Oriental Bank', type: 'Bank' },
  { name: 'Paramount Bank', type: 'Bank' },
  { name: 'Trans-National Bank', type: 'Bank' },

  // Mobile Money
  { name: 'M-Pesa', type: 'M-Pesa' },
  { name: 'Airtel Money', type: 'M-Pesa' },
  { name: 'T-kash', type: 'M-Pesa' },

  // Digital Lenders
  { name: 'Tala', type: 'Digital Lender' },
  { name: 'Branch', type: 'Digital Lender' },
  { name: 'M-Shwari', type: 'Digital Lender' },
  { name: 'KCB M-Pesa', type: 'Digital Lender' },
  { name: 'Fuliza', type: 'Digital Lender' },
  { name: 'Zenka', type: 'Digital Lender' },
  { name: 'Okash', type: 'Digital Lender' },
  { name: 'Timiza', type: 'Digital Lender' },

  // SACCOs
  { name: 'Stima SACCO', type: 'SACCO' },
  { name: 'Mwalimu National SACCO', type: 'SACCO' },
  { name: 'Harambee SACCO', type: 'SACCO' },
  { name: 'Kenya Police SACCO', type: 'SACCO' },
  { name: 'Afya SACCO', type: 'SACCO' },
  { name: 'UN SACCO', type: 'SACCO' },
  { name: 'Wakenya Pamoja SACCO', type: 'SACCO' },
  { name: 'Safaricom SACCO', type: 'SACCO' },

  // CRBs
  { name: 'Metropol CRB', type: 'CRB' },
  { name: 'TransUnion CRB (CreditInfo)', type: 'CRB' },
  { name: 'Credit Reference Bureau Africa', type: 'CRB' },
];
