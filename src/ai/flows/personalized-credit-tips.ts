'use server';

/**
 * @fileOverview This file defines a Genkit flow for providing personalized credit tips to users based on their financial behavior.
 *
 * - getPersonalizedCreditTips - A function that retrieves personalized credit tips for a user.
 * - PersonalizedCreditTipsInput - The input type for the getPersonalizedCreditTips function.
 * - PersonalizedCreditTipsOutput - The return type for the getPersonalizedCreditTips function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedCreditTipsInputSchema = z.object({
  financialBehavior: z
    .string()
    .describe(
      'A summary of the user\'s financial behavior, including income, spending, loan repayments, and savings habits.'
    ),
});
export type PersonalizedCreditTipsInput = z.infer<typeof PersonalizedCreditTipsInputSchema>;

const PersonalizedCreditTipsOutputSchema = z.object({
  tips: z.array(z.string()).describe('A list of personalized credit improvement tips.'),
});
export type PersonalizedCreditTipsOutput = z.infer<typeof PersonalizedCreditTipsOutputSchema>;

export async function getPersonalizedCreditTips(input: PersonalizedCreditTipsInput): Promise<PersonalizedCreditTipsOutput> {
  return personalizedCreditTipsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizedCreditTipsPrompt',
  input: {schema: PersonalizedCreditTipsInputSchema},
  output: {schema: PersonalizedCreditTipsOutputSchema},
  prompt: `You are a financial advisor specializing in credit improvement.

  Based on the user's financial behavior, provide a list of personalized tips to improve their credit score.

  Financial Behavior: {{{financialBehavior}}}

  Tips:`, // No Handlebars await calls, no function calls.
});

const personalizedCreditTipsFlow = ai.defineFlow(
  {
    name: 'personalizedCreditTipsFlow',
    inputSchema: PersonalizedCreditTipsInputSchema,
    outputSchema: PersonalizedCreditTipsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
