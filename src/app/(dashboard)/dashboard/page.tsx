'use client';
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { CreditScoreWidget } from "@/components/credit-score-widget"
import { Triangle, ArrowUpRight, Activity, DollarSign, Loader2 } from "lucide-react"
import { useUser } from "@/firebase/auth/use-user";
import { useDoc } from "@/firebase/firestore/use-doc";
import { useCollection } from "@/firebase/firestore/use-collection";
import { collection, doc } from "firebase/firestore";
import { useFirebase } from "@/firebase/provider";
import type { Transaction, UserProfile } from "@/lib/types";
import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardPage() {
  const { user } = useUser();
  const { db } = useFirebase();

  const userProfileRef = user ? doc(db, 'users', user.uid) : null;
  const { data: userProfile, loading: profileLoading } = useDoc<UserProfile>(userProfileRef);

  const transactionsRef = user ? collection(db, 'users', user.uid, 'transactions') : null;
  const { data: transactions, loading: transactionsLoading } = useCollection<Transaction>(transactionsRef);

  const loading = profileLoading || transactionsLoading;
  const recentTransactions = transactions?.slice(0, 5) ?? [];

  if (loading) {
    return (
        <div className="flex flex-col gap-4 p-4 lg:gap-6 lg:p-6">
            <Skeleton className="h-20 w-full" />
             <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Skeleton className="lg:col-span-2 row-span-2 h-96" />
                <Skeleton className="h-32" />
                <Skeleton className="h-32" />
                <Skeleton className="lg:col-span-2 h-40" />
            </div>
            <Skeleton className="h-96" />
        </div>
    )
  }

  return (
    <>
      <Alert className="bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
        <Triangle className="h-4 w-4 text-primary" />
        <AlertTitle className="font-bold text-primary">Stay on Track!</AlertTitle>
        <AlertDescription>
          You have an upcoming loan payment in 5 days. Paying on time boosts your score.
        </AlertDescription>
      </Alert>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="lg:col-span-2 row-span-2 flex flex-col justify-between">
          <CardHeader className="pb-2">
            <CardDescription>{userProfile?.creditScore?.provider}</CardDescription>
            <div className="flex items-baseline gap-2">
              <CardTitle className="text-4xl font-headline">
                {userProfile?.creditScore?.score}
              </CardTitle>
              <div className="flex items-center text-green-500">
                <ArrowUpRight className="h-4 w-4" />
                <span>+{userProfile?.creditScore?.change} this month</span>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
             <CreditScoreWidget score={userProfile?.creditScore?.score ?? 0} className="w-full h-64 md:h-80" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              M-Pesa Summary
            </CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">KES 5,350</div>
            <p className="text-xs text-muted-foreground">
              -12.1% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Bank Activity</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+KES 75,000</div>
            <p className="text-xs text-muted-foreground">
              Salary deposit
            </p>
          </CardContent>
        </Card>
        <Card className="lg:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Loan Repayments</CardTitle>
            <CardDescription>Your digital lender repayment behavior.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">100% on time</div>
            <p className="text-xs text-muted-foreground">
              Great job! Keep it up to boost your score.
            </p>
            <Progress value={100} className="mt-2 h-2" />
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
          <CardDescription>
            A quick look at your latest financial activities.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Description</TableHead>
                <TableHead className="hidden sm:table-cell">Category</TableHead>
                <TableHead className="hidden md:table-cell">Date</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentTransactions.map(tx => (
                <TableRow key={tx.id}>
                  <TableCell>
                    <div className="font-medium">{tx.description}</div>
                    <div className="hidden text-sm text-muted-foreground md:inline">
                      {tx.institution}
                    </div>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    <Badge className="text-xs" variant={tx.category === 'Income' ? 'default' : 'secondary'}>
                      {tx.category}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">{tx.date}</TableCell>
                  <TableCell className={`text-right ${tx.amount > 0 ? 'text-green-500' : 'text-foreground'}`}>
                    {tx.amount.toLocaleString('en-US', { style: 'currency', currency: 'KES' })}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  )
}
