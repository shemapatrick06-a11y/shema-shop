'use server';

/**
 * @fileOverview Product recommendation AI agent.
 *
 * - getProductRecommendations - A function that handles the product recommendation process.
 * - ProductRecommendationsInput - The input type for the getProductRecommendations function.
 * - ProductRecommendationsOutput - The return type for the getProductRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ProductRecommendationsInputSchema = z.object({
  browsingHistory: z.array(
    z.string().describe('IDs of products the user has viewed')
  ).optional().describe('The user browsing history.'),
  purchaseHistory: z.array(
    z.string().describe('IDs of products the user has purchased')
  ).optional().describe('The user purchase history.'),
  numRecommendations: z.number().min(1).max(10).default(3).describe('The number of product recommendations to return.'),
});
export type ProductRecommendationsInput = z.infer<typeof ProductRecommendationsInputSchema>;

const ProductRecommendationsOutputSchema = z.array(
  z.string().describe('IDs of recommended products')
);
export type ProductRecommendationsOutput = z.infer<typeof ProductRecommendationsOutputSchema>;

export async function getProductRecommendations(input: ProductRecommendationsInput): Promise<ProductRecommendationsOutput> {
  return productRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'productRecommendationsPrompt',
  input: {schema: ProductRecommendationsInputSchema},
  output: {schema: ProductRecommendationsOutputSchema},
  prompt: `You are a personal shopping assistant for an online clothing store.

  Based on the user's browsing history and past purchases, recommend {{numRecommendations}} other products that the user might be interested in.

  Browsing history: {{browsingHistory}}
  Purchase history: {{purchaseHistory}}

  Return ONLY a list of product IDs.  Do not include any other text.  If there is no browsing history or purchase history, return a list of {{numRecommendations}} of the most popular products.  If you don't know any popular products, return an empty array.
  `,
});

const productRecommendationsFlow = ai.defineFlow(
  {
    name: 'productRecommendationsFlow',
    inputSchema: ProductRecommendationsInputSchema,
    outputSchema: ProductRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
