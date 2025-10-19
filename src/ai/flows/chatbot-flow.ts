'use server';

/**
 * @fileOverview A chatbot flow that provides different responses based on user role.
 *
 * - getChatbotResponse - A function that returns a response from the chatbot.
 * - ChatbotInput - The input type for the getChatbotResponse function.
 * - ChatbotOutput - The return type for the getChatbotResponse function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const MessageSchema = z.object({
  text: z.string(),
  sender: z.enum(['user', 'bot']),
});

const ChatbotInputSchema = z.object({
  message: z.string().describe('The user\'s message to the chatbot.'),
  role: z.enum(['customer', 'admin']).describe('The role of the user.'),
  history: z.array(MessageSchema).describe('The conversation history.'),
});
export type ChatbotInput = z.infer<typeof ChatbotInputSchema>;

const ChatbotOutputSchema = z.object({
  reply: z.string().describe('The chatbot\'s response.'),
});
export type ChatbotOutput = z.infer<typeof ChatbotOutputSchema>;

export async function getChatbotResponse(
  input: ChatbotInput
): Promise<ChatbotOutput> {
  return chatbotFlow(input);
}

const chatbotFlow = ai.defineFlow(
  {
    name: 'chatbotFlow',
    inputSchema: ChatbotInputSchema,
    outputSchema: ChatbotOutputSchema,
  },
  async (input) => {
    const { message, role, history } = input;

    let systemPrompt = '';
    if (role === 'admin') {
      systemPrompt =
        'You are an expert admin assistant for an online store called Shema Shop. Your role is to help the store administrator manage products, view orders, and answer questions about store performance. Be concise and professional.';
    } else {
      systemPrompt =
        'You are a friendly and helpful shopping assistant for an online clothing store called Shema Shop. Your goal is to help customers find products, answer questions about items, and provide styling advice. You are energetic and love fashion.';
    }

    const prompt = `${systemPrompt}

    Conversation History:
    ${history.map((msg) => `${msg.sender}: ${msg.text}`).join('\n')}
    user: ${message}
    bot:`;

    const { output } = await ai.generate({
      prompt: prompt,
    });

    return { reply: output! as string };
  }
);
