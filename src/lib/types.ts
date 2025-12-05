export type User = {
  name: string;
  avatarUrl: string;
  email: string;
};

export type Transaction = {
  id: string;
  institution: string;
  account: string;
  date: string;
  description: string;
  category: 'Income' | 'Spending' | 'Loans' | 'Savings';
  amount: number;
  currency: 'KES';
};

export type Institution = {
  name: string;
  logo: React.ComponentType<{ className?: string }>;
  status: 'Connected' | 'Not Connected';
  type: 'M-Pesa' | 'Bank' | 'SACCO' | 'Digital Lender' | 'CRB';
};

export type CreditScoreInfo = {
  score: number;
  change: number;
  lastUpdated: string;
  provider: string;
};
