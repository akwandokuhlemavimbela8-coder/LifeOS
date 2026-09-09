import express, { Request, Response } from 'express';
import { GoogleGenerativeAI } from '@google/generative-ai';

const router = express.Router();

// Initialize Gemini API
const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
if (!apiKey) {
  console.error('GOOGLE_GENERATIVE_AI_API_KEY environment variable not set');
}

const genAI = new GoogleGenerativeAI(apiKey || '');

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

interface ChatRequest {
  messages: ChatMessage[];
  userMessage: string;
}

router.post('/chat', async (req: Request, res: Response) => {
  try {
    const { messages, userMessage } = req.body as ChatRequest;

    if (!apiKey) {
      return res.status(500).json({ error: 'API key not configured' });
    }

    if (!userMessage || !userMessage.trim()) {
      return res.status(400).json({ error: 'Message content is required' });
    }

    // Initialize the Gemini model
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

    // Build conversation history for context
    const conversationHistory = messages
      .map((msg) => ({
        role: msg.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: msg.content }],
      }))
      .slice(-10); // Keep last 10 messages for context

    // Start a chat session with history
    const chat = model.startChat({
      history: conversationHistory,
      generationConfig: {
        maxOutputTokens: 1024,
        temperature: 0.7,
      },
    });

    // Send the user message and get response
    const result = await chat.sendMessage(userMessage);
    const response = result.response;
    const text = response.text();

    return res.json({ content: text });
  } catch (error) {
    console.error('Chat API error:', error);

    if (error instanceof Error) {
      if (error.message.includes('API key')) {
        return res.status(500).json({
          error: 'API key configuration error',
          details: 'GOOGLE_GENERATIVE_AI_API_KEY is not properly set',
        });
      }

      return res.status(500).json({
        error: 'Failed to get AI response',
        details: error.message,
      });
    }

    return res.status(500).json({
      error: 'An unexpected error occurred',
    });
  }
});

export default router;
