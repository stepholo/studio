'use client'

import { useState } from 'react'
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Lightbulb, Repeat,TrendingUp, Bot, Loader } from "lucide-react"
import { getPersonalizedCreditTips } from "@/ai/flows/personalized-credit-tips"
import { useToast } from "@/hooks/use-toast"

const chartData = [
  { month: "January", income: 75000, spending: 45000 },
  { month: "February", income: 75000, spending: 52000 },
  { month: "March", income: 80000, spending: 48000 },
  { month: "April", income: 78000, spending: 55000 },
  { month: "May", income: 82000, spending: 60000 },
  { month: "June", income: 75000, spending: 47000 },
]

const chartConfig = {
  income: {
    label: "Income",
    color: "hsl(var(--chart-1))",
  },
  spending: {
    label: "Spending",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

function PersonalizedTips() {
  const [tips, setTips] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleGenerateTips = async () => {
    setIsLoading(true);
    setTips([]);
    try {
      const result = await getPersonalizedCreditTips({
        financialBehavior: "User has a steady income of ~75k KES, with monthly spending around 50k KES. Consistently repays small digital loans on time. Savings are inconsistent."
      });
      setTips(result.tips);
    } catch (error) {
      console.error("Failed to get personalized tips:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Could not generate tips. Please try again later.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Bot className="h-6 w-6 text-primary" />
          <CardTitle>Personalized Credit Tips</CardTitle>
        </div>
        <CardDescription>
          Get AI-powered tips to improve your credit score based on your unique financial behavior.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {tips.length > 0 && (
          <ul className="space-y-4 mb-6">
            {tips.map((tip, index) => (
              <li key={index}>
                <Alert>
                  <Lightbulb className="h-4 w-4" />
                  <AlertTitle>Tip #{index + 1}</AlertTitle>
                  <AlertDescription>{tip}</AlertDescription>
                </Alert>
              </li>
            ))}
          </ul>
        )}
        <Button onClick={handleGenerateTips} disabled={isLoading} className="w-full">
          {isLoading ? <Loader className="mr-2 h-4 w-4 animate-spin" /> : <Lightbulb className="mr-2 h-4 w-4" />}
          {isLoading ? 'Generating...' : 'Generate My Tips'}
        </Button>
      </CardContent>
    </Card>
  )
}

export default function InsightsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-headline font-bold">Financial Insights</h1>
        <p className="text-muted-foreground">Understand your habits, improve your score.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Monthly Income vs. Spending</CardTitle>
            <CardDescription>January - June 2024</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-64 w-full">
              <ResponsiveContainer>
                <BarChart data={chartData} margin={{ top: 20, right: 20, bottom: 5, left: 0 }}>
                  <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} fontSize={12} />
                  <YAxis tickFormatter={(value) => `KES ${Number(value) / 1000}k`} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="income" fill="var(--color-income)" radius={4} />
                  <Bar dataKey="spending" fill="var(--color-spending)" radius={4} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-base font-medium">Repayment Behavior</CardTitle>
            <Repeat className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">100% On-Time</div>
            <p className="text-xs text-muted-foreground">
              You've paid all your recent loans on time. Excellent work!
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-base font-medium">Saving Streaks</CardTitle>
             <TrendingUp className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3 Months</div>
            <p className="text-xs text-muted-foreground">
              You've consistently saved for the last 3 months.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-base font-medium">Consistency Score</CardTitle>
            <Lightbulb className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Good</div>
            <p className="text-xs text-muted-foreground">
              Your income and spending patterns are relatively stable.
            </p>
          </CardContent>
        </Card>
      </div>
      
      <PersonalizedTips />
    </div>
  )
}
