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
import { mockCreditScore, mockTransactions } from "@/lib/data"
import { TriangleUp, ArrowUpRight, Activity, DollarSign } from "lucide-react"

export default function DashboardPage() {
  const recentTransactions = mockTransactions.slice(0, 5);

  return (
    <>
      <Alert className="bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
        <TriangleUp className="h-4 w-4 text-primary" />
        <AlertTitle className="font-bold text-primary">Stay on Track!</AlertTitle>
        <AlertDescription>
          You have an upcoming loan payment in 5 days. Paying on time boosts your score.
        </AlertDescription>
      </Alert>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="lg:col-span-2 row-span-2 flex flex-col justify-between">
          <CardHeader className="pb-2">
            <CardDescription>{mockCreditScore.provider}</CardDescription>
            <div className="flex items-baseline gap-2">
              <CardTitle className="text-4xl font-headline">
                {mockCreditScore.score}
              </CardTitle>
              <div className="flex items-center text-green-500">
                <ArrowUpRight className="h-4 w-4" />
                <span>+{mockCreditScore.change} this month</span>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
             <CreditScoreWidget score={mockCreditScore.score} className="w-full h-64 md:h-80" />
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
