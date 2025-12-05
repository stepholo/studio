import { type LucideIcon } from "lucide-react";

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
  logo: string; // Changed from LucideIcon
  status: 'Connected' | 'Not Connected';
  type: 'M-Pesa' | 'Bank' | 'SACCO' | 'Digital Lender' | 'CRB';
};

export type CreditScoreInfo = {
  score: number;
  change: number;
  lastUpdated: string;
  provider: string;
};

export type UserProfile = {
  id: string;
  fullName: string;
  email: string;
  goals: string[];
  creditScore: CreditScoreInfo;
};
