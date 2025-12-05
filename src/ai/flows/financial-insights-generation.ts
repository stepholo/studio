'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating financial insights based on user data.
 *
 * The flow analyzes spending habits, repayment behavior, and saving streaks to provide users
 * with actionable insights for improving their financial well-being.
 *
 * @public
 * @function generateFinancialInsights - The main function to trigger the financial insights generation flow.
 * @interface FinancialInsightsInput - Defines the input schema for the flow.
 * @interface FinancialInsightsOutput - Defines the output schema for the flow.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const FinancialInsightsInputSchema = z.object({
  spendingHabits: z.string().describe('Summary of spending habits.'),
  repaymentBehavior: z.string().describe('Summary of loan repayment behavior.'),
  savingStreaks: z.string().describe('Description of saving streaks.'),
});
export type FinancialInsightsInput = z.infer<typeof FinancialInsightsInputSchema>;

const FinancialInsightsOutputSchema = z.object({
  insights: z.string().describe('Generated insights based on financial data.'),
});
export type FinancialInsightsOutput = z.infer<typeof FinancialInsightsOutputSchema>;

export async function generateFinancialInsights(input: FinancialInsightsInput): Promise<FinancialInsightsOutput> {
  return financialInsightsFlow(input);
}

const financialInsightsPrompt = ai.definePrompt({
  name: 'financialInsightsPrompt',
  input: {schema: FinancialInsightsInputSchema},
  output: {schema: FinancialInsightsOutputSchema},
  prompt: `You are a financial advisor. Analyze the following financial data and provide insights to the user.

Spending Habits: {{{spendingHabits}}}
Repayment Behavior: {{{repaymentBehavior}}}
Saving Streaks: {{{savingStreaks}}}

Provide clear and actionable insights to help the user improve their financial behavior.`,
});

const financialInsightsFlow = ai.defineFlow(
  {
    name: 'financialInsightsFlow',
    inputSchema: FinancialInsightsInputSchema,
    outputSchema: FinancialInsightsOutputSchema,
  },
  async input => {
    const {output} = await financialInsightsPrompt(input);
    return output!;
  }
);
