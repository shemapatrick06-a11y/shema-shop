// ProductDescriptionGenerator.ts
'use server';

/**
 * @fileOverview Generates product descriptions based on a product title.
 *
 * - generateProductDescription - A function that generates the product description.
 * - ProductDescriptionInput - The input type for the generateProductDescription function.
 * - ProductDescriptionOutput - The return type for the generateProductDescription function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ProductDescriptionInputSchema = z.object({
  title: z.string().describe('The title of the product.'),
});

export type ProductDescriptionInput = z.infer<typeof ProductDescriptionInputSchema>;

const ProductDescriptionOutputSchema = z.object({
  description: z.string().describe('The generated product description.'),
});

export type ProductDescriptionOutput = z.infer<typeof ProductDescriptionOutputSchema>;

export async function generateProductDescription(
  input: ProductDescriptionInput
): Promise<ProductDescriptionOutput> {
  return productDescriptionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'productDescriptionPrompt',
  input: {schema: ProductDescriptionInputSchema},
  output: {schema: ProductDescriptionOutputSchema},
  prompt: `You are an expert copywriter specializing in writing product descriptions for an online clothing store.

  Generate an engaging and informative product description for the following product title:

  Title: {{{title}}}
  `,
});

const productDescriptionFlow = ai.defineFlow(
  {
    name: 'productDescriptionFlow',
    inputSchema: ProductDescriptionInputSchema,
    outputSchema: ProductDescriptionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
