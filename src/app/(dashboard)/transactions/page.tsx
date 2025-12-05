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
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { mockTransactions } from "@/lib/data"
import type { Transaction } from "@/lib/types"

const categoryIcons = {
  Income: 'text-green-500',
  Spending: 'text-yellow-500',
  Loans: 'text-blue-500',
  Savings: 'text-purple-500',
};

const TransactionsTable = ({ transactions }: { transactions: Transaction[] }) => (
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
          {transactions.map((tx) => (
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
          ))}
        </TableBody>
      </Table>
    </CardContent>
  </Card>
);

export default function TransactionsPage() {
  const allTransactions = mockTransactions;
  const incomeTransactions = mockTransactions.filter(tx => tx.category === 'Income');
  const spendingTransactions = mockTransactions.filter(tx => tx.category === 'Spending');
  const loanTransactions = mockTransactions.filter(tx => tx.category === 'Loans');
  const savingsTransactions = mockTransactions.filter(tx => tx.category === 'Savings');

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
          <TransactionsTable transactions={allTransactions} />
        </TabsContent>
        <TabsContent value="income">
          <TransactionsTable transactions={incomeTransactions} />
        </TabsContent>
        <TabsContent value="spending">
          <TransactionsTable transactions={spendingTransactions} />
        </TabsContent>
        <TabsContent value="loans">
          <TransactionsTable transactions={loanTransactions} />
        </TabsContent>
        <TabsContent value="savings">
          <TransactionsTable transactions={savingsTransactions} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
