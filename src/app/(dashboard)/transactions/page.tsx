'use client';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import type { Transaction } from "@/lib/types"
import { useUser } from "@/firebase/auth/use-user"
import { useCollection } from "@/firebase/firestore/use-collection"
import { collection, query, where } from "firebase/firestore"
import { useFirebase } from "@/firebase/provider"
import { Loader2 } from "lucide-react"
import React from "react"

const TransactionsTable = ({ transactions, loading }: { transactions: Transaction[], loading: boolean }) => (
  <Card>
    <CardContent className="p-0">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Description</TableHead>
            <TableHead className="hidden sm:table-cell">Institution</TableHead>
            <TableHead className="hidden md:table-cell">Date</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={4} className="h-24 text-center">
                <Loader2 className="h-6 w-6 animate-spin inline-block" />
              </TableCell>
            </TableRow>
          ) : transactions.length > 0 ? (
            transactions.map((tx) => (
              <TableRow key={tx.id} className="hover:bg-muted/50">
                <TableCell>
                  <div className="font-medium">{tx.description}</div>
                  <div className="text-sm text-muted-foreground">{tx.account}</div>
                </TableCell>
                <TableCell className="hidden sm:table-cell">{tx.institution}</TableCell>
                <TableCell className="hidden md:table-cell">{tx.date}</TableCell>
                <TableCell className={`text-right font-mono ${tx.amount > 0 ? 'text-green-500' : ''}`}>
                  {tx.amount.toLocaleString('en-US', { style: 'currency', currency: 'KES', signDisplay: 'auto' })}
                </TableCell>
              </TableRow>
            ))
          ) : (
             <TableRow>
              <TableCell colSpan={4} className="h-24 text-center">
                No transactions found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </CardContent>
  </Card>
);

export default function TransactionsPage() {
  const { user } = useUser();
  const { db } = useFirebase();

  const transactionsRef = React.useMemo(() => user ? collection(db, 'users', user.uid, 'transactions') : null, [user, db]);
  
  const { data: allTransactions, loading } = useCollection<Transaction>(transactionsRef);
  const { data: incomeTransactions, loading: incomeLoading } = useCollection<Transaction>(transactionsRef, { queryConstraints: [where('category', '==', 'Income')] });
  const { data: spendingTransactions, loading: spendingLoading } = useCollection<Transaction>(transactionsRef, { queryConstraints: [where('category', '==', 'Spending')] });
  const { data: loanTransactions, loading: loanLoading } = useCollection<Transaction>(transactionsRef, { queryConstraints: [where('category', '==', 'Loans')] });
  const { data: savingsTransactions, loading: savingsLoading } = useCollection<Transaction>(transactionsRef, { queryConstraints: [where('category', '==', 'Savings')] });


  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-headline font-bold">Your Transactions</h1>
        <p className="text-muted-foreground">A complete history of your financial activities.</p>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-5">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="income">Income</TabsTrigger>
          <TabsTrigger value="spending">Spending</TabsTrigger>
          <TabsTrigger value="loans">Loans</TabsTrigger>
          <TabsTrigger value="savings">Savings</TabsTrigger>
        </TabsList>
        <TabsContent value="all">
          <TransactionsTable transactions={allTransactions ?? []} loading={loading} />
        </TabsContent>
        <TabsContent value="income">
          <TransactionsTable transactions={incomeTransactions ?? []} loading={incomeLoading} />
        </TabsContent>
        <TabsContent value="spending">
          <TransactionsTable transactions={spendingTransactions ?? []} loading={spendingLoading} />
        </TabsContent>
        <TabsContent value="loans">
          <TransactionsTable transactions={loanTransactions ?? []} loading={loanLoading} />
        </TabsContent>
        <TabsContent value="savings">
          <TransactionsTable transactions={savingsTransactions ?? []} loading={savingsLoading} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
